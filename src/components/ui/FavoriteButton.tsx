"use client"

import { useState } from "react"
import { useFavorites } from "@/hooks/useFavorites"

interface FavoriteButtonProps {
  propertyId: string
}

export default function FavoriteButton({ propertyId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(propertyId)
  const [animating, setAnimating] = useState(false)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!active) {
          setAnimating(true)
          setTimeout(() => setAnimating(false), 400)
        }
        toggleFavorite(propertyId)
      }}
      className="p-2 rounded-full bg-surface/80 backdrop-blur-md border border-white/20 hover:bg-surface transition-all duration-200"
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <svg
        className={`w-4 h-4 transition-colors duration-200 ${active ? "text-red-500 fill-red-500" : "text-muted"} ${animating ? "animate-pop-in" : ""}`}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  )
}
