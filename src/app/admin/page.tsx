"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Contact } from "@/types"
import { markContactRead } from "@/hooks/useProperties"

interface MonthData {
  label: string
  count: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, featured: 0 })
  const [contacts, setContacts] = useState<Contact[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [totalContacts, setTotalContacts] = useState(0)
  const [monthlyData, setMonthlyData] = useState<MonthData[]>([])

  useEffect(() => {
    async function loadData() {
      const allProps = await getDocs(collection(db, "properties"))
      let active = 0, featured = 0
      allProps.forEach((doc) => {
        const d = doc.data()
        if (d.active) active++
        if (d.featured) featured++
      })
      setStats({ total: allProps.size, active, inactive: allProps.size - active, featured })

      const allContactsQ = query(collection(db, "contacts"), orderBy("createdAt", "desc"))
      const allContactsSnap = await getDocs(allContactsQ)
      const allContacts = allContactsSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Contact))
      setTotalContacts(allContacts.length)
      setContacts(allContacts.slice(0, 10))

      const unread = allContacts.filter((c) => !c.read).length
      setUnreadCount(unread)

      const months: MonthData[] = []
      const now = new Date()
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const label = d.toLocaleDateString("es", { month: "short", year: "2-digit" })
        const monthStart = new Date(d.getFullYear(), d.getMonth(), 1)
        const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59)
        const count = allContacts.filter((c) => {
          const date = c.createdAt?.toDate?.()
          if (!date) return false
          return date >= monthStart && date <= monthEnd
        }).length
        months.push({ label, count })
      }
      setMonthlyData(months)
    }
    loadData()
  }, [])

  const handleMarkRead = async (id: string) => {
    await markContactRead(id)
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, read: true } : c))
    setUnreadCount((p) => Math.max(0, p - 1))
  }

  const maxCount = Math.max(...monthlyData.map((m) => m.count), 1)

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6 tracking-tight">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Propiedades Activas", value: stats.active, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", color: "text-green-600 bg-green-500/10" },
          { label: "Inactivas", value: stats.inactive, icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "text-muted bg-surface-2" },
          { label: "Destacadas", value: stats.featured, icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", color: "text-amber-500 bg-amber-500/10" },
          { label: "Consultas sin leer", value: unreadCount, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: unreadCount > 0 ? "text-danger bg-danger/10" : "text-accent bg-accent/10" },
        ].map((s, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl p-5">
            <div className={`inline-flex p-2 rounded-xl mb-3 ${s.color}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
              </svg>
            </div>
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 tracking-tight">Consultas por mes</h2>
          {monthlyData.length > 0 ? (
            <div className="flex items-end gap-3 h-48">
              {monthlyData.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-foreground">{m.count}</span>
                  <div className="w-full bg-surface-2 rounded-t-md relative" style={{ height: "100%" }}>
                    <div
                      className="absolute bottom-0 w-full bg-accent rounded-t-md transition-all duration-500"
                      style={{ height: `${maxCount > 0 ? (m.count / maxCount) * 100 : 0}%`, minHeight: m.count > 0 ? "8px" : "0px" }}
                    />
                  </div>
                  <span className="text-xs text-muted capitalize">{m.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-muted">Cargando...</div>
          )}
          <p className="text-xs text-muted mt-3">Total histórico: {totalContacts} consultas</p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 tracking-tight">Acciones rápidas</h2>
          <div className="space-y-3">
            <Link
              href="/admin/propiedades"
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 hover:bg-border/50 transition-colors duration-200"
            >
              <div className="p-2 bg-accent/10 text-accent rounded-xl">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Propiedades</p>
                <p className="text-xs text-muted">{stats.total} registradas</p>
              </div>
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 hover:bg-border/50 transition-colors duration-200"
            >
              <div className="p-2 bg-green-500/10 text-green-600 rounded-xl">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Blog</p>
                <p className="text-xs text-muted">Gestionar artículos</p>
              </div>
            </Link>
            <Link
              href="/admin/testimonios"
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 hover:bg-border/50 transition-colors duration-200"
            >
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Testimonios</p>
                <p className="text-xs text-muted">Gestionar reseñas</p>
              </div>
            </Link>
            <Link
              href="/admin/configuracion"
              className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 hover:bg-border/50 transition-colors duration-200"
            >
              <div className="p-2 bg-surface-2 text-muted rounded-xl">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Configuración</p>
                <p className="text-xs text-muted">Ajustes del sitio</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Contacts */}
      <div className="bg-surface border border-border rounded-2xl">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Consultas recientes</h2>
          <span className="text-sm text-muted">{unreadCount} sin leer</span>
        </div>
        {contacts.length === 0 ? (
          <div className="p-8 text-center text-muted">No hay consultas aún</div>
        ) : (
          <div className="divide-y divide-border">
            {contacts.map((c) => (
              <div key={c.id} className={`p-4 ${!c.read ? "bg-accent/5" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{c.name}</span>
                      {!c.read && (
                        <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">Nuevo</span>
                      )}
                      <span className="text-xs text-muted-2">
                        {c.createdAt?.toDate?.()?.toLocaleDateString("es", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <p className="text-sm text-muted mb-1">{c.email} | {c.phone}</p>
                    {c.propertyTitle && (
                      <p className="text-sm text-accent mb-1">Propiedad: {c.propertyTitle}</p>
                    )}
                    <p className="text-sm text-foreground line-clamp-2">{c.message}</p>
                  </div>
                  {!c.read && (
                    <button
                      onClick={() => handleMarkRead(c.id)}
                      className="text-xs text-accent hover:underline whitespace-nowrap"
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
