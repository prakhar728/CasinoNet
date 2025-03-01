"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQProps {
  question: string
  answer: string
}

export default function FAQ({ question, answer }: FAQProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4 border-b border-zinc-800 pb-4">
      <button className="flex justify-between items-center w-full text-left py-4" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-xl font-medium text-white">{question}</h3>
        <ChevronDown
          className={`h-5 w-5 text-amber-500 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="py-4 text-zinc-300">{answer}</p>
      </div>
    </div>
  )
}

