import type { Metadata } from "next"
import { getPostBySlug } from "@/lib/blog"
import BlogPostContent from "./BlogPostContent"

const SITE_URL = "https://inmobiliaria-rho-liard.vercel.app"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    if (!post) {
      return { title: "Artículo no encontrado" }
    }

    return {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      openGraph: {
        title: post.title,
        description: post.excerpt || post.content.substring(0, 160),
        type: "article",
        url: `${SITE_URL}/blog/${post.slug}`,
        images: post.imageUrl ? [{ url: post.imageUrl, width: 1200, height: 630 }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt || post.content.substring(0, 160),
        images: post.imageUrl ? [post.imageUrl] : [],
      },
    }
  } catch {
    return { title: "Blog | Inmobiliaria 21" }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  return <BlogPostContent slug={slug} />
}
