import { ChevronRight, Dice1Icon as Dice, Coins, Users, Shield, Zap } from "lucide-react"
import Link from "next/link"
import GameCard from "@/components/game-card"
import VideoHero from "@/components/video-hero"
import FeatureCard from "@/components/feature-card"
import Testimonial from "@/components/testimonial"
import FAQ from "@/components/faq"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <VideoHero />

      {/* Platform Description */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              The Future of AI-Powered Gaming
            </h2>
            <p className="text-lg text-zinc-300 mb-8">
              CasinoNet is revolutionizing the online casino experience with advanced AI agents that interact with
              players and each other, creating a dynamic and immersive gaming environment unlike anything you've
              experienced before.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white font-medium hover:from-red-700 hover:to-amber-700 transition-all duration-300"
            >
              Learn More <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Dice className="h-10 w-10 text-red-500" />}
              title="Intelligent Gameplay"
              description="Our AI agents adapt to your playing style, creating a personalized gaming experience that evolves the more you play."
            />
            <FeatureCard
              icon={<Coins className="h-10 w-10 text-amber-500" />}
              title="Transparent Rewards"
              description="All transactions and rewards are recorded on-chain, ensuring complete transparency and fairness for all players."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-green-500" />}
              title="Social Gaming"
              description="Interact with other players and AI agents in real-time, creating a social casino experience from anywhere in the world."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-blue-500" />}
              title="Secure Platform"
              description="Advanced security measures protect your data and assets, giving you peace of mind while you play."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-yellow-500" />}
              title="Lightning Fast"
              description="Enjoy instant gameplay with no delays, powered by our cutting-edge infrastructure and optimized AI agents."
            />
            <FeatureCard
              icon={<Coins className="h-10 w-10 text-orange-500" />}
              title="Play to Earn"
              description="Earn real rewards as you play and level up, with multiple opportunities to increase your winnings."
            />
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Featured Games</h2>
            <p className="text-lg text-zinc-300">
              Explore our collection of AI-enhanced casino games, each offering a unique and immersive experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GameCard
              title="AI Poker"
              description="Test your skills against our adaptive AI poker players that learn and evolve with every hand."
              image="/placeholder.svg?height=300&width=500"
              link="/games/poker"
              bgColor="from-red-900 to-red-950"
            />
            <GameCard
              title="Quantum Roulette"
              description="Experience roulette like never before with quantum randomness and AI-driven gameplay dynamics."
              image="/placeholder.svg?height=300&width=500"
              link="/games/roulette"
              bgColor="from-green-900 to-green-950"
            />
            <GameCard
              title="Neural Blackjack"
              description="Play against AI dealers that adapt to your strategy in this next-generation blackjack experience."
              image="/placeholder.svg?height=300&width=500"
              link="/games/blackjack"
              bgColor="from-blue-900 to-blue-950"
            />
            <GameCard
              title="Crypto Slots"
              description="Spin to win with our blockchain-powered slot machines featuring dynamic odds and instant payouts."
              image="/placeholder.svg?height=300&width=500"
              link="/games/slots"
              bgColor="from-purple-900 to-purple-950"
            />
            <GameCard
              title="AI Baccarat"
              description="Experience the classic game of baccarat enhanced with AI opponents and real-time analytics."
              image="/placeholder.svg?height=300&width=500"
              link="/games/baccarat"
              bgColor="from-amber-900 to-amber-950"
            />
            <GameCard
              title="Virtual Craps"
              description="Roll the dice in our immersive virtual craps table with AI-powered gameplay assistance."
              image="/placeholder.svg?height=300&width=500"
              link="/games/craps"
              bgColor="from-orange-900 to-orange-950"
            />
          </div>

          <div className="text-center mt-12">
            <Link
              href="/games"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-red-600 text-white font-medium hover:from-amber-700 hover:to-red-700 transition-all duration-300"
            >
              View All Games <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">What Players Say</h2>
            <p className="text-lg text-zinc-300">
              Join thousands of satisfied players already enjoying the CasinoNet experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              quote="The AI opponents in Poker are incredibly realistic. I've improved my game significantly by playing against them."
              author="Michael T."
              role="Professional Poker Player"
            />
            <Testimonial
              quote="I love how the games adapt to my playing style. It feels like each session is tailored specifically for me."
              author="Sarah J."
              role="Regular Player"
            />
            <Testimonial
              quote="The transparency of CasinoNet is what keeps me coming back. I know the games are fair and my winnings are secure."
              author="David L."
              role="Crypto Enthusiast"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
            <p className="text-lg text-zinc-300">Find answers to common questions about CasinoNet.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FAQ
              question="How do AI agents work in CasinoNet?"
              answer="CasinoNet's AI agents use advanced machine learning algorithms to create realistic and adaptive opponents. They learn from player behavior and adjust their strategies in real-time, providing a dynamic and challenging gaming experience."
            />
            <FAQ
              question="Is CasinoNet secure and fair?"
              answer="Absolutely. All games on CasinoNet use provably fair algorithms, with results verified on the blockchain. Our platform employs bank-grade security measures to protect your data and assets."
            />
            <FAQ
              question="How do I get started with CasinoNet?"
              answer="Simply create an account, make your first deposit, and you're ready to play! New players receive a welcome bonus and access to tutorials for each game."
            />
            <FAQ
              question="Can I play with real money on CasinoNet?"
              answer="Yes, CasinoNet supports various cryptocurrencies and traditional payment methods for deposits and withdrawals."
            />
            <FAQ
              question="What makes CasinoNet different from other online casinos?"
              answer="CasinoNet's unique AI-driven gameplay, blockchain transparency, and social features create an immersive experience that goes beyond traditional online casinos. Our games adapt to your style, creating a personalized experience that evolves over time."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Ready to Experience the Future of Casino Gaming?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Join CasinoNet today and discover a new world of AI-powered casino games.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-lg hover:from-red-700 hover:to-amber-700 transition-all duration-300"
              >
                Sign Up Now
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 rounded-full bg-transparent border-2 border-amber-500 text-amber-500 font-bold text-lg hover:bg-amber-500/10 transition-all duration-300"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-zinc-800">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">CasinoNet</h3>
              <p className="text-zinc-400">The future of AI-powered casino gaming.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Games</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/games/poker" className="text-zinc-400 hover:text-amber-500 transition-colors">
                    AI Poker
                  </Link>
                </li>
                <li>
                  <Link href="/games/roulette" className="text-zinc-400 hover:text-amber-500 transition-colors">
                    Quantum Roulette
                  </Link>
                </li>
                <li>
                  <Link href="/games/blackjack" className="text-zinc-400 hover:text-amber-500 transition-colors">
                    Neural Blackjack
                  </Link>
                </li>
                <li>
                  <Link href="/games/slots" className="text-zinc-400 hover:text-amber-500 transition-colors">
                    Crypto Slots
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-zinc-400 hover:text-amber-500 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-zinc-400 hover:text-amber-500 transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-zinc-400 hover:text-amber-500 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-zinc-400 hover:text-amber-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-zinc-400 hover:text-amber-500 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-zinc-400 hover:text-amber-500 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/responsible-gaming" className="text-zinc-400 hover:text-amber-500 transition-colors">
                    Responsible Gaming
                  </Link>
                </li>
                <li>
                  <Link href="/licenses" className="text-zinc-400 hover:text-amber-500 transition-colors">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-500">
            <p>&copy; {new Date().getFullYear()} CasinoNet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

