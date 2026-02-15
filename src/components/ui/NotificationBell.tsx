"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useNewProperties } from "@/hooks/useNewProperties"
import { formatPrice } from "@/lib/utils"

export default function NotificationBell() {
  const { newProperties, count, markAllSeen } = useNewProperties()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => {
          setOpen(!open)
          if (!open && count > 0) markAllSeen()
        }}
        className="relative p-2 text-muted hover:text-foreground transition-colors"
        aria-label="Notificaciones"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-3 border-b border-divider">
            <h3 className="font-semibold text-foreground text-sm">Nuevas propiedades</h3>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {newProperties.length === 0 ? (
              <p className="text-muted text-sm p-4 text-center">No hay propiedades nuevas</p>
            ) : (
              newProperties.map((p) => (
                <Link
                  key={p.id}
                  href={`/propiedades/${p.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-surface-2 transition-colors border-b border-divider last:border-0"
                >
                  {p.imageUrls?.[0] && (
                    <img src={p.imageUrls[0]} alt={p.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.title}</p>
                    <p className="text-xs text-accent font-semibold">{formatPrice(p.price, p.currency)}</p>
                    <p className="text-xs text-muted">{p.location.zone}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
