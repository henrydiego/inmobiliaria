"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Contact } from "@/types"
import { markContactRead } from "@/hooks/useProperties"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, active: 0, featured: 0 })
  const [contacts, setContacts] = useState<Contact[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    async function loadData() {
      // Stats
      const allProps = await getDocs(collection(db, "properties"))
      let active = 0, featured = 0
      allProps.forEach((doc) => {
        const d = doc.data()
        if (d.active) active++
        if (d.featured) featured++
      })
      setStats({ total: allProps.size, active, featured })

      // Recent contacts
      const contactsQ = query(collection(db, "contacts"), orderBy("createdAt", "desc"), limit(10))
      const contactsSnap = await getDocs(contactsQ)
      const contactsList = contactsSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Contact))
      setContacts(contactsList)

      // Unread count
      const unreadQ = query(collection(db, "contacts"), where("read", "==", false))
      const unreadSnap = await getDocs(unreadQ)
      setUnreadCount(unreadSnap.size)
    }
    loadData()
  }, [])

  const handleMarkRead = async (id: string) => {
    await markContactRead(id)
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, read: true } : c))
    setUnreadCount((p) => Math.max(0, p - 1))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-dark mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Propiedades", value: stats.total, color: "bg-primary-light" },
          { label: "Propiedades Activas", value: stats.active, color: "bg-accent" },
          { label: "Consultas sin leer", value: unreadCount, color: "bg-warning" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-medium mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-gray-dark">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-8">
        <Link
          href="/admin/propiedades"
          className="bg-primary-light hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Gestionar propiedades
        </Link>
      </div>

      {/* Recent Contacts */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-dark">Consultas recientes</h2>
        </div>
        {contacts.length === 0 ? (
          <div className="p-8 text-center text-gray-medium">No hay consultas aún</div>
        ) : (
          <div className="divide-y">
            {contacts.map((c) => (
              <div key={c.id} className={`p-4 ${!c.read ? "bg-blue-50" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-dark">{c.name}</span>
                      {!c.read && (
                        <span className="text-xs bg-primary-light text-white px-2 py-0.5 rounded-full">Nuevo</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-medium mb-1">{c.email} | {c.phone}</p>
                    {c.propertyTitle && (
                      <p className="text-sm text-primary-light mb-1">Propiedad: {c.propertyTitle}</p>
                    )}
                    <p className="text-sm text-gray-dark line-clamp-2">{c.message}</p>
                  </div>
                  {!c.read && (
                    <button
                      onClick={() => handleMarkRead(c.id)}
                      className="text-xs text-primary-light hover:underline whitespace-nowrap"
                    >
                      Marcar leído
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
