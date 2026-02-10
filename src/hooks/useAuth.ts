"use client"

import { useState, useEffect } from "react"
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        const roleDoc = await getDoc(doc(db, "roles", firebaseUser.uid))
        setIsAdmin(roleDoc.exists() && roleDoc.data()?.isAdmin === true)
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    const roleDoc = await getDoc(doc(db, "roles", cred.user.uid))
    if (!roleDoc.exists() || !roleDoc.data()?.isAdmin) {
      await signOut(auth)
      throw new Error("No tienes permisos de administrador")
    }
    return cred.user
  }

  const logout = () => signOut(auth)

  return { user, isAdmin, loading, login, logout }
}
