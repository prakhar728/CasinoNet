import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/50 hover:border-amber-500/50 transition-all duration-300 hover:bg-zinc-800/80 group">
      <div className="mb-4 p-3 inline-block rounded-full bg-zinc-700/50 group-hover:bg-zinc-700 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  )
}

