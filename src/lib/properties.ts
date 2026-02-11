import { collection, query, where, orderBy, getDocs, getDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Property } from "@/types"

export async function getPropertyById(id: string): Promise<Property | null> {
  const docRef = doc(db, "properties", id)
  const snapshot = await getDoc(docRef)
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() } as Property
}

export async function getAllActiveProperties(): Promise<Property[]> {
  const q = query(
    collection(db, "properties"),
    where("active", "==", true),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Property))
}
