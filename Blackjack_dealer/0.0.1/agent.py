import json
import os
from nearai.agents.environment import Environment
from gamestate import BlackjackGameState
from nearai.shared.models import ThreadMode, RunMode

def get_state_file_path(env):
    # Use the temporary agent runner directory
    base_path = "/home/prakhar/Desktop/me/active-projects/CasinoNet"
    return os.path.join(base_path, "game_state.txt")

def load_game_state(env):
    state_file = get_state_file_path(env)
    if os.path.exists(state_file):
        try:
            with open(state_file, 'r', encoding='utf-8') as f:
                game_state = json.load(f)
                game = BlackjackGameState()
                game.deck = game_state.get("deck", game.deck)
                game.player['hand'] = game_state.get("player_hand", [])
                game.dealer_hand = game_state.get("dealer_hand", [])
                game.player['status'] = game_state.get("player_status", 'active')
                return {
                    "game": game,
                    "active": game_state.get("active", False)
                }
        except Exception as e:
            print(f"[DEBUG] Error loading game state: {str(e)}")
    return None

def save_game_state(env, state):

    state_file = get_state_file_path(env)
    # Ensure directory exists
    os.makedirs(os.path.dirname(state_file), exist_ok=True)
    
    serializable_state = {
        "active": state["active"],
        "player_hand": state["game"].player['hand'],
        "dealer_hand": state["game"].dealer_hand,
        "deck": state["game"].deck,
        "player_status": state["game"].player['status']
    }
    
    try:
        with open(state_file, 'w', encoding='utf-8') as f:
            json.dump(serializable_state, f, indent=2)
    except Exception as e:
        print(f"[DEBUG] Error saving game state: {str(e)}")

def run(env: Environment):

    # Load existing state or create new
    stored_state = load_game_state(env)
    if (stored_state):
        env.game_state = stored_state
    else:
        # Initialize new state if none exists
        game = BlackjackGameState()
        env.game_state = {
            "game": game,
            "active": False
        }

    if len(env.list_messages()) == 1:
        print("****first time****")
        # Create initial state
        game = BlackjackGameState()
        env.game_state = {
            "game": game,
            "active": False
        }
        save_game_state(env, env.game_state)
        
        # Initial welcome message
        intro_prompt = {
            "role": "system",
            "content": """You are BlackjackMaster, an experienced and entertaining casino dealer. 
            
            Important information:
            - Always wait for the player to type 'start' to begin a new game.
            - Respond to user input 

            Your personality:
            - Professional but friendly
            - Explains rules clearly
            - Encourages fair play
            - Uses casino lingo appropriately
            
            Start by:
            1. Introducing yourself
            2. Welcoming players to the table
            3. Briefly explaining Blackjack rules
            4. Ask the player to type 'start' to begin"""
        }
        welcome = env.completion([intro_prompt] + env.list_messages())
        env.add_reply(welcome)
        env.request_user_input()
        result = env.run_agent("travel.primitives.near/trip-organizer/latest", query="Plan a two-day trip to Buenos Aires", thread_mode=ThreadMode.CHILD)
        return

    # Replace save_current_state() with direct file save
    def save_current_state():
        save_game_state(env, env.game_state)

    # Get most recent user input
    user_input = env.get_last_message()["content"].lower()

    prompt = {"role": "system", 
             "content": """You are a bot that replies with one of 3 words: 'hit', 'stand', or 'start' ONLY.
             You will receive a message from the user, and you MUST reply with one of the 3 words ONLY.
             Read user input and understandn what they are asking. 
             -If they wish to start a game, reutrn 'start'.
             -If they wish to hit, return 'hit'.
             -If they wish to stand, return 'stand'.
             -If they are not asking for any of these, return 'invalid'.
             
             You must not reply with anything else, including emojis, punctuation, or any other words.
             You must not reply with any other words, even if the user is asking for something else.
             """}
    
    # Get the last user message and process it
    llm_output = env.completion([prompt]+ env.list_messages()).lower()

    print(f"[DEBUG] LLM output: {llm_output}")
    print(f"[DEBUG] Game active: {env.game_state['active']}")
    
    if llm_output.strip()== "start" and not env.game_state["active"]:
        print("[DEBUG] Starting new game")
        env.game_state["active"] = True
        env.game_state["game"].deal_initial_cards()
        print(env.game_state["active"])
        prompt = {
            "role": "system",
            "content": f"""You are the BlackjackMaster dealer. Present the game state professionally:

            Current Hand:
            Your cards: {env.game_state['game'].return_hands()[0]}
            Dealer shows: {env.game_state['game'].return_hands()[1]}
            
            What's your move?
            - Type 'hit' for another card
            - Type 'stand' to hold"""
        }

        save_game_state(env, env.game_state)


    elif llm_output.strip() == "hit" and env.game_state["active"]:
        # print("[DEBUG] Player Hits")
        # # Debug current state
        # print("****************")
        # print(env.game_state['game'].deck)
        # print(env.game_state['game'].player['hand'])
        # print(env.game_state['game'].dealer_hand)
        # print("****************")
        

        env.game_state["game"].player_hit()
        print(env.game_state["game"].player['hand'])
            
        # if env.game_state["game"].player['status'] == 'bust':
        #     prompt = {
        #         "role": "system",
        #         "content": f"""You are the BlackjackMaster dealer.Relay the following information to the user:
                
        #         💥 BUST! 
        #         Your final hand: {env.game_state['game'].return_hands()[0]}
        #         Dealer's hand: {env.game_state['game'].return_hands(hide_dealer_card=False)[1]}
                
        #         Type 'start' to try again."""
        #     }
        #     # Reset game state on bust
        #     new_game = BlackjackGameState()
        #     env.game_state = {
        #         "game": new_game,
        #         "active": False
        #     }
        #     save_game_state(env, env.game_state)
            
        # else:
        #     prompt = {
        #         "role": "system",
        #         "content": f"""You are the BlackjackMaster dealer. Relay the following information to the user:
                
        #         Current Hand:
        #         Your cards: {env.game_state['game'].return_hands()[0]}
        #         Dealer shows: {env.game_state['game'].return_hands(hide_dealer_card=False)[1]}
                
        #         What's your move?
        #         - Type 'hit' for another card
        #         - Type 'stand' to hold"""
        #     }
        #     save_game_state(env, env.game_state)

        prompt_temp = {
            "role": "system",
            "content": f"""You are a bot that can respond with only 1 word from the following list for words: ['bust','continue'].
            Read the Player Cards.
            
            Here are the Player's hands:
            Player cards: {env.game_state['game'].player['hand']}

            Rules:
            - If hand value > 21: respond 'bust'
            - If hand value ≤ 21: respond 'continue'

            Respond ONLY with 'bust' or 'continue'.
            """
        }

        llm_output_temp = env.completion([prompt_temp]).lower()
        print(f"[DEBUG] LLM output [hit]: {llm_output_temp}")
        
        if llm_output_temp.strip() == "bust":
            print("[DEBUG] Player Busts")
            prompt = {
                "role": "system",
                "content": f"""You are the BlackjackMaster dealer. Present the game state professionally.
                Relay the following information to the user:
                
                💥 BUST! 
                Your final hand: {env.game_state['game'].player['hand']}
                Dealer's hand: {env.game_state['game'].dealer_hand}
                
                Type 'start' to try again."""
            }

            #reset game
            new_game = BlackjackGameState()
            env.game_state = {
                "game": new_game,
                "active": False
            }

        else:
            print("[DEBUG] Player Cunts")
            prompt = {
                "role": "system",
                "content": f"""You are the BlackjackMaster dealer. Present the game state professionally.
                Relay the following information to the user:
                
                Current Hand:
                Your cards: {env.game_state['game'].return_hands()[0]}
                Dealer shows: {env.game_state['game'].return_hands(hide_dealer_card=False)[1]}
                
                What's your move?
                - Type 'hit' for another card
                - Type 'stand' to hold"""
            }

        save_game_state(env, env.game_state)

    elif user_input.strip() == "stand" and env.game_state["active"]:
        # print("[DEBUG] Player stands")
        # print("****************")
        # print(env.game_state['game'].deck)
        # print(env.game_state['game'].player['hand'])
        # print(env.game_state['game'].dealer_hand)
        # print("****************")
        env.game_state["game"].dealer_turn()
        outcome = env.game_state["game"].determine_winner()
    
        prompt = {
            "role": "system",
            "content": f"""Dealer speaking:
            
            🃏 Final Hands 🃏
            Your cards: {env.game_state['game'].return_hands(hide_dealer_card=False)[0]}
            Dealer's cards: {env.game_state['game'].return_hands(hide_dealer_card=False)[1]}
            
            {outcome}
            
            Type 'start' to play again."""
        }
        # Reset game state after round ends
        new_game = BlackjackGameState()
        env.game_state = {
            "game": new_game,
            "active": False
        }

        save_game_state(env, env.game_state)
        
    else:
        print("[DEBUG] Invalid")
        prompt = {
            "role": "system",
            "content": """You are the BlackjackMaster dealer.:
            Tell the user they made an invalid move. Ask them to type one of the following things:
            - Type 'hit' to get another card
            - Type 'stand' to hold your cards
            - Type 'start' to begin a new game"""
        }


    result = env.completion([prompt]+ env.list_messages())
    env.add_reply(result)
    env.request_user_input()

run(env)
