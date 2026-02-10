"use client"

import { useState } from "react"
import { useProperties, PropertyFilters as Filters } from "@/hooks/useProperties"
import PropertyGrid from "@/components/properties/PropertyGrid"
import PropertyFilters from "@/components/properties/PropertyFilters"
import Button from "@/components/ui/Button"

export default function PropiedadesPage() {
  const [filters, setFilters] = useState<Filters>({})
  const { properties, loading, hasMore, loadMore } = useProperties(filters)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-dark mb-2">Propiedades en Venta</h1>
        <p className="text-gray-medium">Encuentra tu próxima propiedad en Cochabamba</p>
      </div>

      <PropertyFilters filters={filters} onChange={setFilters} />

      <PropertyGrid properties={properties} loading={loading} />

      {hasMore && !loading && (
        <div className="text-center mt-8">
          <Button variant="outline" onClick={loadMore}>Cargar más propiedades</Button>
        </div>
      )}
    </div>
  )
}
