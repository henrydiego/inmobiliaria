"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { createPost, updatePost, getPostById } from "@/hooks/useBlog"
import { uploadImage } from "@/lib/cloudinary"
import Input, { Textarea } from "@/components/ui/Input"
import Button from "@/components/ui/Button"

interface BlogFormProps {
  postId?: string
  onSaved: () => void
}

export default function BlogForm({ postId, onSaved }: BlogFormProps) {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    author: "",
    published: false,
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!!postId)

  useEffect(() => {
    if (!postId) return
    async function load() {
      const post = await getPostById(postId!)
      if (post) {
        setForm({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          imageUrl: post.imageUrl,
          author: post.author,
          published: post.published,
        })
      }
      setLoading(false)
    }
    load()
  }, [postId])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      setForm((f) => ({ ...f, imageUrl: url }))
    } catch {
      toast.error("Error al subir imagen")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (postId) {
        await updatePost(postId, form)
      } else {
        await createPost(form)
      }
      onSaved()
    } catch {
      toast.error("Error al guardar")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-8 text-muted">Cargando...</div>

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-2xl p-6 space-y-5">
      <Input
        label="Título"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Ej: 5 tips para comprar tu primera casa"
      />

      <Input
        label="Autor"
        required
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
        placeholder="Nombre del autor"
      />

      <Textarea
        label="Extracto"
        rows={2}
        required
        value={form.excerpt}
        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        placeholder="Breve resumen del artículo (se muestra en la lista)"
      />

      <Textarea
        label="Contenido"
        rows={12}
        required
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        placeholder="Escribe el contenido del artículo aquí..."
      />

      {/* Image */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Imagen de portada</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-sm text-foreground"
          disabled={uploading}
        />
        {uploading && <p className="text-sm text-muted">Subiendo imagen...</p>}
        {form.imageUrl && (
          <img src={form.imageUrl} alt="Preview" className="w-full max-w-md h-48 object-cover rounded-xl mt-2" />
        )}
      </div>

      {/* Published toggle */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.checked })}
          className="w-4 h-4 rounded border-border accent-accent"
        />
        <span className="text-sm font-medium text-foreground">Publicar artículo</span>
      </label>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Guardando..." : postId ? "Actualizar" : "Crear artículo"}
        </Button>
      </div>
    </form>
  )
}
