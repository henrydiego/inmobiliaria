"use client"

import { useState, useEffect } from "react"
import {
  collection, query, where, orderBy, getDocs,
  getDoc, doc, addDoc, updateDoc, deleteDoc, Timestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Testimonial } from "@/types"

export function useActiveTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const q = query(
          collection(db, "testimonials"),
          where("active", "==", true),
          orderBy("createdAt", "desc")
        )
        const snap = await getDocs(q)
        setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial)))
      } catch (error) {
        console.error("Error fetching testimonials:", error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { testimonials, loading }
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial))
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const snap = await getDoc(doc(db, "testimonials", id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Testimonial
}

export async function createTestimonial(data: {
  name: string; text: string; imageUrl?: string; rating: number; active: boolean
}): Promise<string> {
  const docRef = await addDoc(collection(db, "testimonials"), {
    ...data,
    createdAt: Timestamp.now(),
  })
  return docRef.id
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>): Promise<void> {
  await updateDoc(doc(db, "testimonials", id), data)
}

export async function deleteTestimonial(id: string): Promise<void> {
  await deleteDoc(doc(db, "testimonials", id))
}
