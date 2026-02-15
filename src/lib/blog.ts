import { collection, query, where, orderBy, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Post } from "@/types"

export async function getPublishedPosts(): Promise<Post[]> {
  const q = query(
    collection(db, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc")
  )
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
