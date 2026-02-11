"use client"

import { useState, useEffect } from "react"
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Property } from "@/types"
import PropertyCard from "./PropertyCard"

interface SimilarPropertiesProps {
  currentId: string
  type: Property["type"]
  zone: string
}

export default function SimilarProperties({ currentId, type, zone }: SimilarPropertiesProps) {
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    async function fetch() {
      try {
        // Try same zone first
        const qZone = query(
          collection(db, "properties"),
          where("active", "==", true),
          where("location.zone", "==", zone),
          orderBy("createdAt", "desc"),
          limit(4)
        )
        const snapZone = await getDocs(qZone)
        let results = snapZone.docs
          .map((d) => ({ id: d.id, ...d.data() } as Property))
          .filter((p) => p.id !== currentId)

        // If not enough, try same type
        if (results.length < 3) {
          const qType = query(
            collection(db, "properties"),
            where("active", "==", true),
            where("type", "==", type),
            orderBy("createdAt", "desc"),
            limit(4)
          )
          const snapType = await getDocs(qType)
          const typeResults = snapType.docs
            .map((d) => ({ id: d.id, ...d.data() } as Property))
            .filter((p) => p.id !== currentId && !results.find((r) => r.id === p.id))
          results = [...results, ...typeResults].slice(0, 3)
        } else {
          results = results.slice(0, 3)
        }

        setProperties(results)
      } catch (error) {
        console.error("Error fetching similar properties:", error)
      }
    }
    fetch()
  }, [currentId, type, zone])

  if (properties.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-dark mb-6">Propiedades similares</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}
