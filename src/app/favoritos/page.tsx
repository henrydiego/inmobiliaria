"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { collection, query, where, getDocs, documentId } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Property } from "@/types"
import { useFavorites } from "@/hooks/useFavorites"
import PropertyCard from "@/components/properties/PropertyCard"

export default function FavoritosPage() {
  const { favorites } = useFavorites()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFavorites() {
      if (favorites.length === 0) {
        setProperties([])
        setLoading(false)
        return
      }

      try {
        const batches = []
        for (let i = 0; i < favorites.length; i += 30) {
          const batch = favorites.slice(i, i + 30)
          const q = query(
            collection(db, "properties"),
            where(documentId(), "in", batch)
          )
          batches.push(getDocs(q))
        }
        const snapshots = await Promise.all(batches)
        const props = snapshots.flatMap((snap) =>
          snap.docs.map((d) => ({ id: d.id, ...d.data() } as Property))
        )
        setProperties(props)
      } catch (error) {
        console.error("Error fetching favorites:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchFavorites()
  }, [favorites])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">Mis Favoritos</h1>
        <p className="text-muted font-light text-lg">Propiedades que has guardado</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-surface border border-border rounded-2xl overflow-hidden animate-pulse">
              <div className="h-56 bg-surface-2" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-surface-2 rounded-full w-3/4" />
                <div className="h-4 bg-surface-2 rounded-full w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto text-border mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 className="text-lg font-medium text-foreground mb-2 tracking-tight">No tienes favoritos aún</h3>
          <p className="text-muted mb-6">Explora propiedades y guarda las que más te gusten</p>
          <Link
            href="/propiedades"
            className="inline-block bg-accent hover:bg-accent-light text-white font-medium px-7 py-3 rounded-full transition-colors duration-200"
          >
            Ver propiedades
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
