"use client"

import Link from "next/link"
import Image from "next/image"
import { usePublishedPosts } from "@/hooks/useBlog"

export default function BlogPage() {
  const { posts, loading } = usePublishedPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <p className="text-accent text-sm font-medium tracking-widest uppercase mb-2">Artículos</p>
        <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Blog</h1>
        <p className="text-muted text-lg font-light">Consejos, noticias y guías sobre bienes raíces</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-surface border border-border rounded-3xl overflow-hidden animate-pulse">
              <div className="h-48 bg-surface-2" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-surface-2 rounded w-3/4" />
                <div className="h-4 bg-surface-2 rounded w-full" />
                <div className="h-4 bg-surface-2 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto text-border mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 className="text-lg font-medium text-foreground mb-2">Próximamente</h3>
          <p className="text-muted">Estamos preparando contenido para ti.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="bg-surface border border-border rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
                {post.imageUrl ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-surface-2 flex items-center justify-center">
                    <svg className="w-12 h-12 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted mb-2">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.createdAt?.toDate?.()?.toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted line-clamp-3 font-light">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
