import Link from "next/link"
import Image from "next/image"
import { Property, PROPERTY_TYPES } from "@/types"
import { formatPrice, formatArea } from "@/lib/utils"
import FavoriteButton from "@/components/ui/FavoriteButton"
import CompareButton from "@/components/ui/CompareButton"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.imageUrls?.[0] || "/images/placeholder.jpg"

  return (
    <Link href={`/propiedades/${property.id}`} className="group">
      <div className="bg-surface border border-border rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={mainImage}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-surface/80 backdrop-blur-md text-foreground text-xs font-medium px-3 py-1 rounded-full border border-white/20">
              {PROPERTY_TYPES[property.type]}
            </span>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${property.title} - ${formatPrice(property.price, property.currency)}\nhttps://inmobiliaria-rho-liard.vercel.app/propiedades/${property.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-surface/80 backdrop-blur-md text-green-500 p-1.5 rounded-full border border-white/20 hover:bg-green-500 hover:text-white transition-colors duration-200"
              aria-label="Compartir en WhatsApp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <CompareButton property={property} />
            <FavoriteButton propertyId={property.id} />
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="bg-accent/90 backdrop-blur-md text-white font-semibold px-3 py-1.5 rounded-full text-sm">
              {formatPrice(property.price, property.currency)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1 group-hover:text-accent transition-colors duration-200 tracking-tight">
            {property.title}
          </h3>
          <p className="text-muted text-sm mb-4 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.location.zone}, {property.location.city}
          </p>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-muted border-t border-divider pt-4">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                </svg>
                {property.bedrooms} hab.
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v1h14V4a2 2 0 00-2-2H5zM3 7v7a2 2 0 002 2h10a2 2 0 002-2V7H3z" clipRule="evenodd" />
                </svg>
                {property.bathrooms} baños
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {formatArea(property.area)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
