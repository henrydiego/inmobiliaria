import { MetadataRoute } from "next"
import { getAllActiveProperties } from "@/lib/properties"

const BASE_URL = "https://inmobiliaria-rho-liard.vercel.app"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/propiedades`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/simulador`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ]

  try {
    const properties = await getAllActiveProperties()
    const propertyPages: MetadataRoute.Sitemap = properties.map((p) => ({
      url: `${BASE_URL}/propiedades/${p.id}`,
      lastModified: p.updatedAt?.toDate?.() || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))

    return [...staticPages, ...propertyPages]
  } catch {
    return staticPages
  }
}
