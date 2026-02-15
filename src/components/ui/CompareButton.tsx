"use client"

import { useCompare } from "@/contexts/CompareContext"
import { Property } from "@/types"
import toast from "react-hot-toast"

interface CompareButtonProps {
  property: Property
}

export default function CompareButton({ property }: CompareButtonProps) {
  const { add, remove, has, isFull } = useCompare()
  const active = has(property.id)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (active) {
          remove(property.id)
        } else if (isFull) {
          toast.error("Máximo 3 propiedades para comparar")
        } else {
          add(property)
          toast.success("Agregada al comparador")
        }
      }}
      className={`p-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all duration-200 ${
        active
          ? "bg-accent text-white"
          : "bg-surface/80 text-muted hover:text-accent"
      }`}
      aria-label={active ? "Quitar del comparador" : "Agregar al comparador"}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    </button>
  )
}
