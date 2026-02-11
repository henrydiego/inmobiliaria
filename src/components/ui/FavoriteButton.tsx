"use client"

import { useFavorites } from "@/hooks/useFavorites"

interface FavoriteButtonProps {
  propertyId: string
}

export default function FavoriteButton({ propertyId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(propertyId)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(propertyId)
      }}
      className="p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <svg
        className={`w-5 h-5 transition-colors ${active ? "text-red-500 fill-red-500" : "text-gray-400"}`}
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
