"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

export default function AdminLoginPage() {
  const { user, isAdmin, loading, login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.replace("/admin")
    }
  }, [user, isAdmin, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      await login(email, password)
      router.replace("/admin")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al iniciar sesión"
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Cargando...</p></div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-dark">Panel Administrativo</h1>
          <p className="text-gray-medium text-sm">Inmobiliaria 21</p>
        </div>

        {error && (
          <div className="bg-red-50 text-danger text-sm p-3 rounded-lg mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Contraseña"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Ingresando..." : "Iniciar sesión"}
          </Button>
        </form>
      </div>
    </div>
  )
}
