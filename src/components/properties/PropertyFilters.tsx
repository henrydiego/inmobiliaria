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
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
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
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Precio máx. (USD)</label>
          <input
            type="number"
            placeholder="Sin límite"
            value={filters.maxPrice || ""}
            onChange={(e) => update({ maxPrice: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition"
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
