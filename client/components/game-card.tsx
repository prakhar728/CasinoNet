import Link from "next/link"
import Image from "next/image"

interface GameCardProps {
  title: string
  description: string
  image: string
  link: string
  bgColor: string
}

export default function GameCard({ title, description, image, link, bgColor }: GameCardProps) {
  return (
    <Link href={link} className="block group">
      <div
        className={`rounded-xl overflow-hidden shadow-xl transition-all duration-300 transform group-hover:scale-[1.02] bg-gradient-to-br ${bgColor}`}
      >
        <div className="relative h-48">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-zinc-300 mb-4">{description}</p>
          <div className="flex items-center text-amber-500 font-medium">
            <span>Play Now</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

