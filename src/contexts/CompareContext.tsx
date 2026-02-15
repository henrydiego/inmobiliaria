"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { Property } from "@/types"

const MAX_COMPARE = 3

interface CompareContextType {
  items: Property[]
  add: (p: Property) => void
  remove: (id: string) => void
  clear: () => void
  has: (id: string) => boolean
  isFull: boolean
}

const CompareContext = createContext<CompareContextType>({
  items: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  has: () => false,
  isFull: false,
})

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Property[]>([])

  const add = useCallback((p: Property) => {
    setItems((prev) => {
      if (prev.length >= MAX_COMPARE || prev.some((x) => x.id === p.id)) return prev
      return [...prev, p]
    })
  }, [])

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const has = useCallback((id: string) => items.some((x) => x.id === id), [items])

  return (
    <CompareContext.Provider value={{ items, add, remove, clear, has, isFull: items.length >= MAX_COMPARE }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  return useContext(CompareContext)
}
