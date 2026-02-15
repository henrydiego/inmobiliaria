"use client"

import { PropertyFilters as Filters } from "@/hooks/useProperties"
import { PROPERTY_TYPES, ZONES } from "@/types"
import { useSiteConfig } from "@/contexts/SiteConfigContext"
import { Select } from "@/components/ui/Input"

interface PropertyFiltersProps {
  filters: Filters
  onChange: (filters: Filters) => void
}

export default function PropertyFilters({ filters, onChange }: PropertyFiltersProps) {
  const { config } = useSiteConfig()
  const zones = config.zones.length > 0 ? config.zones : ZONES
  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch })

  return (
    <div className="bg-surface border border-border rounded-2xl p-5 mb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Buscar por título, zona, dirección..."
          value={filters.search || ""}
          onChange={(e) => update({ search: e.target.value || undefined })}
          className="w-full pl-11 pr-4 py-2.5 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all duration-200 text-foreground placeholder:text-muted-2"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select
          label="Tipo"
          value={filters.type || ""}
          onChange={(e) => update({ type: (e.target.value || undefined) as Filters["type"] })}
          options={[
            { value: "", label: "Todos los tipos" },
            ...Object.entries(PROPERTY_TYPES).map(([v, l]) => ({ value: v, label: l })),
          ]}
        />
        <Select
          label="Zona"
          value={filters.zone || ""}
          onChange={(e) => update({ zone: e.target.value || undefined })}
          options={[
            { value: "", label: "Todas las zonas" },
            ...zones.map((z) => ({ value: z, label: z })),
          ]}
        />
        <Select
          label="Habitaciones"
          value={filters.minBedrooms?.toString() || ""}
          onChange={(e) => update({ minBedrooms: e.target.value ? parseInt(e.target.value) : undefined })}
          options={[
            { value: "", label: "Cualquier" },
            { value: "1", label: "1+" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
            { value: "4", label: "4+" },
          ]}
        />
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Precio máx. (USD)</label>
          <input
            type="number"
            placeholder="Sin límite"
            value={filters.maxPrice || ""}
            onChange={(e) => update({ maxPrice: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all duration-200 text-foreground placeholder:text-muted-2"
          />
        </div>
        <Select
          label="Ordenar por"
          value={filters.sortBy || "newest"}
          onChange={(e) => update({ sortBy: e.target.value as Filters["sortBy"] })}
          options={[
            { value: "newest", label: "Más recientes" },
            { value: "price_asc", label: "Precio: menor a mayor" },
            { value: "price_desc", label: "Precio: mayor a menor" },
          ]}
        />
      </div>
    </div>
  )
}
