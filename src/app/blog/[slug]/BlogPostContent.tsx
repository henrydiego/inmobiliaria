"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getPostBySlug } from "@/hooks/useBlog"
import { Post } from "@/types"

export default function BlogPostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const p = await getPostBySlug(slug)
      setPost(p)
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-64 bg-surface-2 rounded-3xl" />
          <div className="h-8 bg-surface-2 rounded w-3/4" />
          <div className="h-4 bg-surface-2 rounded w-1/4" />
          <div className="space-y-3">
            <div className="h-4 bg-surface-2 rounded" />
            <div className="h-4 bg-surface-2 rounded" />
            <div className="h-4 bg-surface-2 rounded w-5/6" />
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Artículo no encontrado</h1>
        <p className="text-muted mb-4">El artículo que buscas no existe o fue removido.</p>
        <Link href="/blog" className="text-accent hover:underline">Volver al blog</Link>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Back link */}
      <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-accent hover:underline mb-6">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver al blog
      </Link>

      {/* Cover image */}
      {post.imageUrl && (
        <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-8">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted">
          <span className="font-medium text-foreground">{post.author}</span>
          <span>·</span>
          <span>{post.createdAt?.toDate?.()?.toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>
      </header>

      {/* Content */}
      <div className="text-foreground leading-relaxed whitespace-pre-line text-base">
        {post.content}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-border">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-accent hover:underline font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Ver más artículos
        </Link>
      </div>
    </article>
  )
}
