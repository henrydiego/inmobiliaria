"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getAllProperties, deleteProperty, updateProperty } from "@/hooks/useProperties"
import { Property, PROPERTY_TYPES } from "@/types"
import { formatPrice } from "@/lib/utils"
import Button from "@/components/ui/Button"
import PropertyForm from "@/components/admin/PropertyForm"

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const load = async () => {
    setLoading(true)
    const props = await getAllProperties()
    setProperties(props)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar "${title}"?`)) return
    await deleteProperty(id)
    load()
  }

  const toggleActive = async (id: string, active: boolean) => {
    await updateProperty(id, { active: !active })
    load()
  }

  if (showForm) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Nueva Propiedad</h1>
        </div>
        <PropertyForm />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Propiedades</h1>
        <Button onClick={() => setShowForm(true)}>+ Nueva propiedad</Button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted">Cargando...</div>
      ) : properties.length === 0 ? (
        <div className="text-center py-16 bg-surface border border-border rounded-2xl">
          <p className="text-muted mb-4">No hay propiedades registradas</p>
          <Button onClick={() => setShowForm(true)}>Crear primera propiedad</Button>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-muted">Propiedad</th>
                <th className="text-left p-4 font-medium text-muted">Tipo</th>
                <th className="text-left p-4 font-medium text-muted">Precio</th>
                <th className="text-left p-4 font-medium text-muted">Estado</th>
                <th className="text-right p-4 font-medium text-muted">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-surface-2">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {p.imageUrls?.[0] && (
                        <img src={p.imageUrls[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      )}
                      <div>
                        <p className="font-medium text-foreground">{p.title}</p>
                        <p className="text-xs text-muted">{p.location.zone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted">{PROPERTY_TYPES[p.type]}</td>
                  <td className="p-4 font-medium">{formatPrice(p.price, p.currency)}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      p.active ? "bg-success/15 text-success" : "bg-surface-2 text-muted"
                    }`}>
                      {p.active ? "Activa" : "Inactiva"}
                    </span>
                    {p.featured && (
                      <span className="ml-1 text-xs px-2 py-1 rounded-full bg-warning/15 text-warning font-medium">
                        Destacada
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/propiedades/${p.id}`}
                        className="text-accent hover:underline text-xs"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => toggleActive(p.id, p.active)}
                        className="text-muted hover:underline text-xs"
                      >
                        {p.active ? "Desactivar" : "Activar"}
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="text-danger hover:underline text-xs"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
