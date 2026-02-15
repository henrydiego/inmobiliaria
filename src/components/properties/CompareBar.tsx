"use client"

import { useState } from "react"
import Image from "next/image"
import { useCompare } from "@/contexts/CompareContext"
import { formatPrice, formatArea } from "@/lib/utils"
import { PROPERTY_TYPES } from "@/types"

export default function CompareBar() {
  const { items, remove, clear } = useCompare()
  const [open, setOpen] = useState(false)

  if (items.length === 0) return null

  return (
    <>
      {/* Floating bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-surface border border-border rounded-2xl shadow-xl px-5 py-3 flex items-center gap-4 animate-in">
        <div className="flex items-center gap-2">
          {items.map((p) => (
            <div key={p.id} className="relative w-10 h-10 rounded-lg overflow-hidden border border-border">
              <Image src={p.imageUrls?.[0] || "/images/placeholder.jpg"} alt={p.title} fill className="object-cover" sizes="40px" />
              <button
                onClick={() => remove(p.id)}
                className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white rounded-full text-[10px] flex items-center justify-center leading-none"
              >
                x
              </button>
            </div>
          ))}
        </div>
        <span className="text-sm text-muted">{items.length}/3</span>
        <button
          onClick={() => setOpen(true)}
          disabled={items.length < 2}
          className="bg-accent text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Comparar
        </button>
        <button onClick={clear} className="text-muted hover:text-danger text-xs">
          Limpiar
        </button>
      </div>

      {/* Compare Modal */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-surface border border-border rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground tracking-tight">Comparar propiedades</h2>
              <button onClick={() => setOpen(false)} className="text-muted hover:text-foreground p-1">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-3 text-muted font-medium w-36"></th>
                    {items.map((p) => (
                      <th key={p.id} className="p-3 text-center min-w-[200px]">
                        <div className="relative h-32 rounded-xl overflow-hidden mb-2">
                          <Image src={p.imageUrls?.[0] || "/images/placeholder.jpg"} alt={p.title} fill className="object-cover" sizes="200px" />
                        </div>
                        <p className="font-semibold text-foreground text-base">{p.title}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-divider">
                  <Row label="Precio" values={items.map((p) => formatPrice(p.price, p.currency))} />
                  <Row label="Tipo" values={items.map((p) => PROPERTY_TYPES[p.type])} />
                  <Row label="Ubicación" values={items.map((p) => `${p.location.zone}, ${p.location.city}`)} />
                  <Row label="Área construida" values={items.map((p) => formatArea(p.area))} />
                  <Row label="Área terreno" values={items.map((p) => p.landArea ? formatArea(p.landArea) : "—")} />
                  <Row label="Habitaciones" values={items.map((p) => p.bedrooms > 0 ? String(p.bedrooms) : "—")} />
                  <Row label="Baños" values={items.map((p) => p.bathrooms > 0 ? String(p.bathrooms) : "—")} />
                  <Row label="Estacionamiento" values={items.map((p) => p.parkingSpots > 0 ? String(p.parkingSpots) : "—")} />
                  <Row label="Año construcción" values={items.map((p) => p.yearBuilt ? String(p.yearBuilt) : "—")} />
                  <Row label="Características" values={items.map((p) => p.features.length > 0 ? p.features.join(", ") : "—")} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Row({ label, values }: { label: string; values: string[] }) {
  return (
    <tr className="hover:bg-surface-2">
      <td className="p-3 font-medium text-muted whitespace-nowrap">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="p-3 text-center text-foreground">{v}</td>
      ))}
    </tr>
  )
}
