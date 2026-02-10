import Link from "next/link"
import { Property, PROPERTY_TYPES } from "@/types"
import { formatPrice, formatArea } from "@/lib/utils"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.imageUrls?.[0] || "/images/placeholder.jpg"

  return (
    <Link href={`/propiedades/${property.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-primary-light text-white text-xs font-semibold px-3 py-1 rounded-full">
              {PROPERTY_TYPES[property.type]}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 text-primary font-bold px-3 py-1 rounded-full text-sm">
              {formatPrice(property.price, property.currency)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-dark text-lg mb-1 line-clamp-1 group-hover:text-primary-light transition-colors">
            {property.title}
          </h3>
          <p className="text-gray-medium text-sm mb-3 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.location.zone}, {property.location.city}
          </p>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-gray-medium border-t pt-3">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {formatArea(property.area)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
