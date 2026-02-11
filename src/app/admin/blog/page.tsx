"use client"

import { useState, useEffect } from "react"
import { getAllPosts, deletePost, updatePost } from "@/hooks/useBlog"
import { Post } from "@/types"
import Button from "@/components/ui/Button"
import BlogForm from "@/components/admin/BlogForm"

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const load = async () => {
    setLoading(true)
    const data = await getAllPosts()
    setPosts(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar "${title}"?`)) return
    await deletePost(id)
    load()
  }

  const togglePublished = async (id: string, published: boolean) => {
    await updatePost(id, { published: !published })
    load()
  }

  if (showForm || editingId) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-dark">
            {editingId ? "Editar Artículo" : "Nuevo Artículo"}
          </h1>
          <Button variant="outline" onClick={() => { setShowForm(false); setEditingId(null) }}>
            Volver
          </Button>
        </div>
        <BlogForm
          postId={editingId || undefined}
          onSaved={() => { setShowForm(false); setEditingId(null); load() }}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-dark">Blog</h1>
        <Button onClick={() => setShowForm(true)}>+ Nuevo artículo</Button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-medium">Cargando...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <p className="text-gray-medium mb-4">No hay artículos publicados</p>
          <Button onClick={() => setShowForm(true)}>Crear primer artículo</Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="divide-y">
            {posts.map((post) => (
              <div key={post.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {post.imageUrl && (
                    <img src={post.imageUrl} alt="" className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-gray-dark truncate">{post.title}</p>
                    <p className="text-xs text-gray-medium truncate">{post.excerpt}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {post.published ? "Publicado" : "Borrador"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {post.createdAt?.toDate?.()?.toLocaleDateString("es")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setEditingId(post.id)} className="text-primary-light hover:underline text-xs">
                    Editar
                  </button>
                  <button onClick={() => togglePublished(post.id, post.published)} className="text-gray-medium hover:underline text-xs">
                    {post.published ? "Ocultar" : "Publicar"}
                  </button>
                  <button onClick={() => handleDelete(post.id, post.title)} className="text-danger hover:underline text-xs">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
