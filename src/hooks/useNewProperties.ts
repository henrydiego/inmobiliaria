"use client"

import { useState, useEffect, useCallback } from "react"
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Property } from "@/types"

const STORAGE_KEY = "inmobiliaria_last_seen"

function getLastSeen(): number {
  if (typeof window === "undefined") return Date.now()
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? Number(stored) : Date.now()
}

function setLastSeen(ts: number) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, String(ts))
  }
}

export function useNewProperties() {
  const [newProperties, setNewProperties] = useState<Property[]>([])
  const [lastSeen, setLastSeenState] = useState<number>(Date.now)

  useEffect(() => {
    setLastSeenState(getLastSeen())
  }, [])

  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"), limit(10))
    const unsub = onSnapshot(q, (snap) => {
      const props: Property[] = []
      snap.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() } as Property
        if (data.active) {
          const createdMs = data.createdAt instanceof Timestamp
            ? data.createdAt.toMillis()
            : Date.now()
          if (createdMs > lastSeen) {
            props.push(data)
          }
        }
      })
      setNewProperties(props)
    })
    return unsub
  }, [lastSeen])

  const markAllSeen = useCallback(() => {
    const now = Date.now()
    setLastSeen(now)
    setLastSeenState(now)
    setNewProperties([])
  }, [])

  return { newProperties, count: newProperties.length, markAllSeen }
}
