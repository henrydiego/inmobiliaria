"use client"

import { useState } from "react"
import { useProperties, PropertyFilters as Filters } from "@/hooks/useProperties"
import { useSiteConfig } from "@/contexts/SiteConfigContext"
import PropertyGrid from "@/components/properties/PropertyGrid"
import PropertyFilters from "@/components/properties/PropertyFilters"
import Button from "@/components/ui/Button"

export default function PropiedadesPage() {
  const [filters, setFilters] = useState<Filters>({})
  const { properties, loading, hasMore, loadMore } = useProperties(filters)
  const { config } = useSiteConfig()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">Propiedades en Venta</h1>
        <p className="text-muted font-light text-lg">Encuentra tu próxima propiedad en {config.city}</p>
      </div>

      <PropertyFilters filters={filters} onChange={setFilters} />

      <PropertyGrid properties={properties} loading={loading} />

      {hasMore && !loading && (
        <div className="text-center mt-10">
          <Button variant="ghost" onClick={loadMore}>Cargar más propiedades</Button>
        </div>
      )}
    </div>
  )
}
