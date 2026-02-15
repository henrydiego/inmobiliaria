import { Property } from "@/types"
import PropertyCard from "./PropertyCard"

interface PropertyGridProps {
  properties: Property[]
  loading?: boolean
}

export default function PropertyGrid({ properties, loading }: PropertyGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl overflow-hidden animate-pulse">
            <div className="h-56 bg-surface-2" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-surface-2 rounded-full w-3/4" />
              <div className="h-4 bg-surface-2 rounded-full w-1/2" />
              <div className="border-t border-divider pt-4 flex gap-4">
                <div className="h-4 bg-surface-2 rounded-full w-16" />
                <div className="h-4 bg-surface-2 rounded-full w-16" />
                <div className="h-4 bg-surface-2 rounded-full w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <svg className="w-16 h-16 mx-auto text-border mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <h3 className="text-lg font-medium text-foreground mb-1 tracking-tight">No se encontraron propiedades</h3>
        <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
