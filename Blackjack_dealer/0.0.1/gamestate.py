import random

class BlackjackGameState:
    def __init__(self):
        self.player = {'name': '', 'hand': [], 'status': 'active'}  # Single player information
        self.dealer_hand = []  # List to store dealer's hand
        self.deck = self._create_deck()  # Create and shuffle a deck of cards

    def _create_deck(self):
        """Create a standard deck of 52 cards and shuffle it."""
        suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
        deck = [{'rank': rank, 'suit': suit} for suit in suits for rank in ranks]
        random.shuffle(deck)
        return deck

    def add_player(self, player_name):
        """Add a single player to the game."""
        self.player['name'] = player_name

    def deal_initial_cards(self):
        """Deal two cards to the player and the dealer."""
        for _ in range(2):
            self.player['hand'].append(self.deck.pop())  # Deal a card to the player
            self.dealer_hand.append(self.deck.pop())  # Deal a card to the dealer

    def player_hit(self):
        """Player draws an additional card."""
        card = self.deck.pop()
        self.player['hand'].append(card)
        # print(f"{self.player['name']} drew: {self._format_hand([card])}")
        # if self.calculate_hand_value(self.player['hand']) > 21:
        #     self.player['status'] = 'bust'
            # print(f"{self.player['name']} busts!")

    def calculate_hand_value(self, hand):
        """Calculate the value of a hand."""
        value = 0
        aces = 0
        for card in hand:
            rank = card['rank']
            if rank in ['Jack', 'Queen', 'King']:
                value += 10
            elif rank == 'Ace':
                value += 11
                aces += 1
            else:
                value += int(rank)
        while value > 21 and aces:
            value -= 10
            aces -= 1
        return value

    def dealer_turn(self):
        """Dealer's turn: reveal hidden card and hit/stand based on rules."""
        # print("\n--- Dealer's Turn ---")
        self.display_hands(hide_dealer_card=False)  # Reveal dealer's full hand

        while self.calculate_hand_value(self.dealer_hand) < 17:
            card = self.deck.pop()
            self.dealer_hand.append(card)
            # print(f"Dealer drew: {self._format_hand([card])}")
            self.display_hands(hide_dealer_card=False)  # Show updated dealer's hand

        dealer_value = self.calculate_hand_value(self.dealer_hand)
        if dealer_value > 21:
            print("Dealer busts!")
        else:
            print(f"Dealer stands with {dealer_value}.")

    def determine_winner(self):
        """Compare player's and dealer's hands to determine the winner."""
        player_value = self.calculate_hand_value(self.player['hand'])
        dealer_value = self.calculate_hand_value(self.dealer_hand)

        # print("\n--- Final Results ---")
        # print(f"{self.player['name']}'s hand: {self._format_hand(self.player['hand'])} (Value: {player_value})")
        # print(f"Dealer's hand: {self._format_hand(self.dealer_hand)} (Value: {dealer_value})")

        if self.player['status'] == 'bust':
            outcome = f"{self.player['name']} busts! Dealer wins."
        elif dealer_value > 21:
            outcome = "Dealer busts! You win!"
        elif player_value > dealer_value:
            outcome = f"{self.player['name']} wins!"
        elif player_value == dealer_value:
            outcome = "It's a push (tie)!"
        else:
            outcome = "Dealer wins."
        # print(outcome)
        return outcome
    
    def display_hands(self, hide_dealer_card=True):
        """
        Display the hands of the player and the dealer.
        If hide_dealer_card is True, the dealer's second card is hidden.
        """
        # print("\n--- Current Hands ---")
        # print(f"{self.player['name']}'s hand: {self._format_hand(self.player['hand'])}")
        
        if hide_dealer_card:
            # Show only the dealer's first card and hide the second card
            visible_card = self.dealer_hand[0]
            # print(f"Dealer's hand: {self._format_hand([visible_card])}, [Hidden Card]")
        # else:
        #     # Show the dealer's full hand (e.g., at the end of the round)
        #     # print(f"Dealer's hand: {self._format_hand(self.dealer_hand)}")


    def return_hands(self, hide_dealer_card=True):
        """Return the player's and dealer's hands for external use."""
        player_hand = self._format_hand(self.player['hand'])

        if hide_dealer_card:
            # Show only the dealer's first card and hide the second card
            visible_card = self.dealer_hand[0]
            dealer_hand= self._format_hand([visible_card])+ "Hidden Card"
        else:
            # Show the dealer's full hand (e.g., at the end of the round)
            dealer_hand= self._format_hand(self.dealer_hand)
            
        return player_hand, dealer_hand
        
    def _format_hand(self, hand):
        """Format a hand of cards into a readable string."""
        return ', '.join([f"{card['rank']} of {card['suit']}" for card in hand])

# Main game loop
def play_game():
    while True:
        game = BlackjackGameState()

        # Add a single player
        player_name = input("Enter your name: ")
        game.add_player(player_name)

        # Deal initial cards
        game.deal_initial_cards()

        # Display hands (dealer's second card is hidden)
        game.display_hands(hide_dealer_card=True)

        # Player's turn
        while game.player['status'] == 'active':
            action = input("Do you want to hit or stand? ").strip().lower()
            if action == 'hit':
                game.player_hit()
                game.display_hands(hide_dealer_card=True)  # Show updated hands
            elif action == 'stand':
                print(f"{game.player['name']} stands.")
                break
            else:
                print("Invalid action. Please choose 'hit' or 'stand'.")

        # Check if player busted
        if game.player['status'] == 'bust':
            print(f"{game.player['name']} busts! Game over.")
        else:
            # Dealer's turn
            game.dealer_turn()

        # Determine the winner
        game.determine_winner()

        # Ask if the player wants to play again
        play_again = input("Do you want to play again? (yes/no): ").strip().lower()
        if play_again != 'yes':
            print("Thanks for playing! Goodbye!")
            break

# Start the game
if __name__ == "__main__":
    play_game()