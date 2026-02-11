"use client"

import { useState, useEffect } from "react"
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "@/hooks/useTestimonials"
import { uploadImage } from "@/lib/cloudinary"
import { Testimonial } from "@/types"
import Input, { Textarea } from "@/components/ui/Input"
import Button from "@/components/ui/Button"

export default function AdminTestimoniosPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", text: "", imageUrl: "", rating: 5, active: true })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const load = async () => {
    setLoading(true)
    const data = await getAllTestimonials()
    setTestimonials(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const resetForm = () => {
    setForm({ name: "", text: "", imageUrl: "", rating: 5, active: true })
    setShowForm(false)
    setEditingId(null)
  }

  const startEdit = (t: Testimonial) => {
    setForm({ name: t.name, text: t.text, imageUrl: t.imageUrl || "", rating: t.rating, active: t.active })
    setEditingId(t.id)
    setShowForm(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      setForm((f) => ({ ...f, imageUrl: url }))
    } catch {
      alert("Error al subir imagen")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editingId) {
        await updateTestimonial(editingId, form)
      } else {
        await createTestimonial(form)
      }
      resetForm()
      load()
    } catch {
      alert("Error al guardar")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar testimonio de "${name}"?`)) return
    await deleteTestimonial(id)
    load()
  }

  const toggleActive = async (id: string, active: boolean) => {
    await updateTestimonial(id, { active: !active })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-dark">Testimonios</h1>
        {!showForm && <Button onClick={() => setShowForm(true)}>+ Nuevo testimonio</Button>}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-dark">
            {editingId ? "Editar Testimonio" : "Nuevo Testimonio"}
          </h2>
          <Input
            label="Nombre"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Textarea
            label="Testimonio"
            rows={3}
            required
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
          />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Calificación</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm({ ...form, rating: star })}
                  className={`text-2xl ${star <= form.rating ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Foto (opcional)</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" disabled={uploading} />
            {uploading && <p className="text-sm text-gray-medium">Subiendo...</p>}
            {form.imageUrl && <img src={form.imageUrl} alt="" className="w-16 h-16 rounded-full object-cover" />}
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">Visible en el sitio</span>
          </label>
          <div className="flex gap-3">
            <Button type="submit" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</Button>
            <Button variant="outline" type="button" onClick={resetForm}>Cancelar</Button>
          </div>
        </form>
      )}

      {/* List */}
      {loading ? (
        <div className="text-center py-8 text-gray-medium">Cargando...</div>
      ) : testimonials.length === 0 && !showForm ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <p className="text-gray-medium mb-4">No hay testimonios</p>
          <Button onClick={() => setShowForm(true)}>Crear primer testimonio</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {t.imageUrl ? (
                  <img src={t.imageUrl} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-light/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-light font-bold text-lg">{t.name[0]}</span>
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-dark">{t.name}</p>
                    <span className="text-yellow-400 text-sm">{"★".repeat(t.rating)}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${t.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {t.active ? "Visible" : "Oculto"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-medium truncate">{t.text}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(t)} className="text-primary-light hover:underline text-xs">Editar</button>
                <button onClick={() => toggleActive(t.id, t.active)} className="text-gray-medium hover:underline text-xs">
                  {t.active ? "Ocultar" : "Mostrar"}
                </button>
                <button onClick={() => handleDelete(t.id, t.name)} className="text-danger hover:underline text-xs">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
