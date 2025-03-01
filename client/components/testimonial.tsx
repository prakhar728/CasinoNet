interface TestimonialProps {
  quote: string
  author: string
  role: string
}

export default function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 relative">
      <div className="absolute -top-4 left-6 text-amber-500 text-6xl">"</div>
      <div className="pt-4">
        <p className="text-zinc-300 mb-6 relative z-10">{quote}</p>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center text-white font-bold">
            {author.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="font-semibold text-white">{author}</p>
            <p className="text-sm text-zinc-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

