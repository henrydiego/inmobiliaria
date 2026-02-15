import { MetadataRoute } from "next"
import { getAllActiveProperties } from "@/lib/properties"
import { getPublishedPosts } from "@/lib/blog"

const BASE_URL = "https://inmobiliaria-rho-liard.vercel.app"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/propiedades`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/simulador`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/favoritos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
  ]

  try {
    const [properties, posts] = await Promise.all([
      getAllActiveProperties(),
      getPublishedPosts(),
    ])

    const propertyPages: MetadataRoute.Sitemap = properties.map((p) => ({
      url: `${BASE_URL}/propiedades/${p.id}`,
      lastModified: p.updatedAt?.toDate?.() || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))

    const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: p.updatedAt?.toDate?.() || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

    return [...staticPages, ...propertyPages, ...blogPages]
  } catch {
    return staticPages
  }
}
