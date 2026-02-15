"use client"

import { useState, lazy, Suspense } from "react"
import { useProperties, PropertyFilters as Filters } from "@/hooks/useProperties"
import { useSiteConfig } from "@/contexts/SiteConfigContext"
import PropertyGrid from "@/components/properties/PropertyGrid"
import PropertyFilters from "@/components/properties/PropertyFilters"
import Button from "@/components/ui/Button"

const PropertiesMapView = lazy(() => import("@/components/properties/PropertiesMapView"))

type ViewMode = "grid" | "map"

export default function PropiedadesPage() {
  const [filters, setFilters] = useState<Filters>({})
  const [view, setView] = useState<ViewMode>("grid")
  const { properties, loading, hasMore, loadMore } = useProperties(filters)
  const { config } = useSiteConfig()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">Propiedades en Venta</h1>
          <p className="text-muted font-light text-lg">Encuentra tu próxima propiedad en {config.city}</p>
        </div>
        {/* View Toggle */}
        <div className="flex bg-surface border border-border rounded-xl p-1 gap-1">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-accent text-white shadow-sm" : "text-muted hover:text-foreground"}`}
            title="Vista en grilla"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </button>
          <button
            onClick={() => setView("map")}
            className={`p-2 rounded-lg transition-all ${view === "map" ? "bg-accent text-white shadow-sm" : "text-muted hover:text-foreground"}`}
            title="Vista en mapa"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
          </button>
        </div>
      </div>

      <PropertyFilters filters={filters} onChange={setFilters} />

      {view === "grid" ? (
        <>
          <PropertyGrid properties={properties} loading={loading} />
          {hasMore && !loading && (
            <div className="text-center mt-10">
              <Button variant="ghost" onClick={loadMore}>Cargar más propiedades</Button>
            </div>
          )}
        </>
      ) : (
        <Suspense fallback={
          <div className="bg-surface border border-border rounded-2xl h-[500px] flex items-center justify-center">
            <div className="text-muted">Cargando mapa...</div>
          </div>
        }>
          <PropertiesMapView properties={properties} />
        </Suspense>
      )}
    </div>
  )
}
