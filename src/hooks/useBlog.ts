"use client"

import { useState, useEffect } from "react"
import {
  collection, query, where, orderBy, getDocs,
  getDoc, doc, addDoc, updateDoc, deleteDoc, Timestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Post } from "@/types"
import { slugify } from "@/lib/utils"

export function usePublishedPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const q = query(
          collection(db, "posts"),
          where("published", "==", true),
          orderBy("createdAt", "desc")
        )
        const snap = await getDocs(q)
        setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Post)))
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { posts, loading }
}

export async function getAllPosts(): Promise<Post[]> {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Post))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q = query(
    collection(db, "posts"),
    where("slug", "==", slug),
    where("published", "==", true)
  )
  const snap = await getDocs(q)
  if (snap.empty) return null
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as Post
}

export async function getPostById(id: string): Promise<Post | null> {
  const snap = await getDoc(doc(db, "posts", id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Post
}

export async function createPost(data: {
  title: string; excerpt: string; content: string; imageUrl: string; author: string; published: boolean
}): Promise<string> {
  const docRef = await addDoc(collection(db, "posts"), {
    ...data,
    slug: slugify(data.title),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
  return docRef.id
}

export async function updatePost(id: string, data: Partial<Post>): Promise<void> {
  const update: Record<string, unknown> = { ...data, updatedAt: Timestamp.now() }
  if (data.title) update.slug = slugify(data.title)
  await updateDoc(doc(db, "posts", id), update)
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, "posts", id))
}
