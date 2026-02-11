"use client"

import { useState, useEffect, useCallback } from "react"
import {
  collection, query, where, orderBy, limit, startAfter,
  getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc,
  Timestamp, QueryConstraint, DocumentSnapshot,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Property, Contact } from "@/types"

const PROPERTIES_PER_PAGE = 9

export interface PropertyFilters {
  type?: Property["type"]
  zone?: string
  minPrice?: number
  maxPrice?: number
  minBedrooms?: number
  minArea?: number
  sortBy?: "price_asc" | "price_desc" | "newest"
  search?: string
}

export function useProperties(filters?: PropertyFilters) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const buildQuery = useCallback((lastDocument?: DocumentSnapshot | null) => {
    const constraints: QueryConstraint[] = [
      where("active", "==", true),
    ]

    if (filters?.type) constraints.push(where("type", "==", filters.type))
    if (filters?.zone) constraints.push(where("location.zone", "==", filters.zone))
    if (filters?.minBedrooms) constraints.push(where("bedrooms", ">=", filters.minBedrooms))

    // Sort
    if (filters?.sortBy === "price_asc") {
      constraints.push(orderBy("price", "asc"))
    } else if (filters?.sortBy === "price_desc") {
      constraints.push(orderBy("price", "desc"))
    } else {
      constraints.push(orderBy("createdAt", "desc"))
    }

    constraints.push(limit(PROPERTIES_PER_PAGE))

    if (lastDocument) constraints.push(startAfter(lastDocument))

    return query(collection(db, "properties"), ...constraints)
  }, [filters])

  const fetchProperties = useCallback(async () => {
    setLoading(true)
    try {
      const q = buildQuery()
      const snapshot = await getDocs(q)
      const props = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Property))

      // Client-side filtering (Firestore can't combine range on different fields)
      let filtered = props
      if (filters?.minPrice) filtered = filtered.filter((p) => p.price >= filters.minPrice!)
      if (filters?.maxPrice) filtered = filtered.filter((p) => p.price <= filters.maxPrice!)
      if (filters?.minArea) filtered = filtered.filter((p) => p.area >= filters.minArea!)
      if (filters?.search) {
        const term = filters.search.toLowerCase()
        filtered = filtered.filter((p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.location.zone.toLowerCase().includes(term) ||
          p.location.address.toLowerCase().includes(term) ||
          p.location.city.toLowerCase().includes(term)
        )
      }

      setProperties(filtered)
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null)
      setHasMore(snapshot.docs.length === PROPERTIES_PER_PAGE)
    } catch (error) {
      console.error("Error fetching properties:", error)
    } finally {
      setLoading(false)
    }
  }, [buildQuery, filters])

  const loadMore = async () => {
    if (!lastDoc || !hasMore) return
    try {
      const q = buildQuery(lastDoc)
      const snapshot = await getDocs(q)
      const newProps = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Property))
      setProperties((prev) => [...prev, ...newProps])
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null)
      setHasMore(snapshot.docs.length === PROPERTIES_PER_PAGE)
    } catch (error) {
      console.error("Error loading more:", error)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  return { properties, loading, hasMore, loadMore, refetch: fetchProperties }
}

export function useFeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const q = query(
          collection(db, "properties"),
          where("active", "==", true),
          where("featured", "==", true),
          orderBy("createdAt", "desc"),
          limit(6)
        )
        const snapshot = await getDocs(q)
        setProperties(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Property)))
      } catch (error) {
        console.error("Error fetching featured:", error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { properties, loading }
}

export async function getProperty(id: string): Promise<Property | null> {
  const docRef = doc(db, "properties", id)
  const snapshot = await getDoc(docRef)
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() } as Property
}

export async function getAllProperties(): Promise<Property[]> {
  const q = query(collection(db, "properties"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Property))
}

export async function createProperty(data: Omit<Property, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const docRef = await addDoc(collection(db, "properties"), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
  return docRef.id
}

export async function updateProperty(id: string, data: Partial<Property>): Promise<void> {
  await updateDoc(doc(db, "properties", id), {
    ...data,
    updatedAt: Timestamp.now(),
  })
}

export async function deleteProperty(id: string): Promise<void> {
  await deleteDoc(doc(db, "properties", id))
}

export async function submitContact(data: Omit<Contact, "id" | "createdAt" | "read">): Promise<string> {
  const docRef = await addDoc(collection(db, "contacts"), {
    ...data,
    createdAt: Timestamp.now(),
    read: false,
  })
  return docRef.id
}

export async function getContacts(): Promise<Contact[]> {
  const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Contact))
}

export async function markContactRead(id: string): Promise<void> {
  await updateDoc(doc(db, "contacts", id), { read: true })
}
