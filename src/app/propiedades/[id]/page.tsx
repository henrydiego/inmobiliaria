import type { Metadata } from "next"
import { getPropertyById } from "@/lib/properties"
import { formatPrice } from "@/lib/utils"
import { PROPERTY_TYPES } from "@/types"
import PropertyDetail from "./PropertyDetail"

const SITE_URL = "https://inmobiliaria-rho-liard.vercel.app"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  try {
    const property = await getPropertyById(id)
    if (!property) {
      return { title: "Propiedad no encontrada | Inmobiliaria 21" }
    }

    const title = `${property.title} - ${PROPERTY_TYPES[property.type]} en ${property.location.zone} | Inmobiliaria 21`
    const description = `${PROPERTY_TYPES[property.type]} en ${property.location.zone}, ${property.location.city}. ${property.bedrooms} hab, ${property.bathrooms} baños, ${property.area} m². ${formatPrice(property.price, property.currency)}. ${property.description.substring(0, 120)}`

    return {
      title,
      description,
      openGraph: {
        title: `${property.title} - ${formatPrice(property.price, property.currency)}`,
        description,
        images: property.imageUrls[0] ? [{ url: property.imageUrls[0], width: 1200, height: 630 }] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${property.title} - ${formatPrice(property.price, property.currency)}`,
        description,
        images: property.imageUrls[0] ? [property.imageUrls[0]] : [],
      },
    }
  } catch {
    return { title: "Propiedad | Inmobiliaria 21" }
  }
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params

  let jsonLd = null
  try {
    const property = await getPropertyById(id)
    if (property) {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": property.title,
        "description": `${PROPERTY_TYPES[property.type]} en ${property.location.zone}, ${property.location.city}`,
        "url": `${SITE_URL}/propiedades/${id}`,
        "image": property.imageUrls[0] || "",
        "offers": {
          "@type": "Offer",
          "price": property.price,
          "priceCurrency": property.currency,
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": property.location.address,
          "addressLocality": property.location.city,
          "addressRegion": property.location.zone,
          "addressCountry": "BO",
        },
      }
    }
  } catch {}

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PropertyDetail id={id} />
    </>
  )
}
