"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <video ref={videoRef} autoPlay muted loop playsInline className="absolute w-full h-full object-cover">
          <source src="/Roulette.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Roulette table"
            className="absolute w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            <span className="bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              CasinoNet
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
            Experience the future of casino gaming with AI-powered agents that learn, adapt, and interact in real-time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-lg hover:from-red-700 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-red-600/20"
            >
              Get Started
            </Link>
            <Link
              href="/games"
              className="px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Explore Games
            </Link>
          </div>
        </div>
      </div>

      {/* Animated Chips */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-10 overflow-hidden">
        <div className="chip-animation">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="chip"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                backgroundColor: ["#e11d48", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"][Math.floor(Math.random() * 5)],
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scrollDown"></div>
        </div>
      </div>
    </section>
  )
}

