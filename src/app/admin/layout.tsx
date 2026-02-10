"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import AdminSidebar from "@/components/admin/AdminSidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (!loading && !isLoginPage) {
      if (!user || !isAdmin) {
        router.replace("/admin/login")
      }
    }
  }, [user, isAdmin, loading, isLoginPage, router])

  if (isLoginPage) {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-medium">Cargando...</p>
      </div>
    )
  }

  if (!user || !isAdmin) return null

  return (
    <div className="flex min-h-screen bg-gray-light">
      <AdminSidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}
