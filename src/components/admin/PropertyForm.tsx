"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Property, PROPERTY_TYPES, ZONES } from "@/types"
import { useSiteConfig } from "@/contexts/SiteConfigContext"
import { createProperty, updateProperty, getProperty } from "@/hooks/useProperties"
import Input, { Textarea, Select } from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import ImageUploader from "./ImageUploader"

interface PropertyFormProps {
  propertyId?: string
}

const EMPTY: Omit<Property, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  description: "",
  price: 0,
  currency: "USD",
  type: "casa",
  operation: "venta",
  area: 0,
  landArea: 0,
  bedrooms: 0,
  bathrooms: 0,
  parkingSpots: 0,
  features: [],
  imageUrls: [],
  location: { address: "", zone: "Zona Norte", city: "Cochabamba", lat: -17.3895, lng: -66.1568 },
  contact: { phone: "", whatsapp: "", email: "" },
  featured: false,
  active: true,
}

export default function PropertyForm({ propertyId }: PropertyFormProps) {
  const router = useRouter()
  const { config } = useSiteConfig()
  const zones = config.zones.length > 0 ? config.zones : ZONES
  const [form, setForm] = useState({
    ...EMPTY,
    location: { ...EMPTY.location, zone: zones[0] || "Zona Norte", city: config.city, lat: config.mapLat, lng: config.mapLng },
  })
  const [featureInput, setFeatureInput] = useState("")
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!!propertyId)

  useEffect(() => {
    if (propertyId) {
      getProperty(propertyId).then((p) => {
        if (p) {
          const { id, createdAt, updatedAt, ...rest } = p
          setForm(rest)
        }
        setLoading(false)
      })
    }
  }, [propertyId])

  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }))
  const updateLocation = (patch: Partial<typeof form.location>) =>
    setForm((f) => ({ ...f, location: { ...f.location, ...patch } }))
  const updateContact = (patch: Partial<typeof form.contact>) =>
    setForm((f) => ({ ...f, contact: { ...f.contact, ...patch } }))

  const addFeature = () => {
    const trimmed = featureInput.trim()
    if (trimmed && !form.features.includes(trimmed)) {
      update({ features: [...form.features, trimmed] })
      setFeatureInput("")
    }
  }

  const removeFeature = (f: string) => update({ features: form.features.filter((x) => x !== f) })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (propertyId) {
        await updateProperty(propertyId, form)
      } else {
        await createProperty(form)
      }
      router.push("/admin/propiedades")
    } catch {
      alert("Error al guardar la propiedad")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-gray-medium">Cargando...</p>

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-dark">Información básica</h2>
        <Input label="Título" required value={form.title} onChange={(e) => update({ title: e.target.value })} />
        <Textarea label="Descripción" rows={4} required value={form.description} onChange={(e) => update({ description: e.target.value })} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Precio" type="number" required min={0} value={form.price || ""} onChange={(e) => update({ price: Number(e.target.value) })} />
          <Select label="Moneda" value={form.currency} onChange={(e) => update({ currency: e.target.value as "USD" | "BOB" })} options={[{ value: "USD", label: "USD ($)" }, { value: "BOB", label: "BOB (Bs.)" }]} />
          <Select label="Tipo" value={form.type} onChange={(e) => update({ type: e.target.value as Property["type"] })} options={Object.entries(PROPERTY_TYPES).map(([v, l]) => ({ value: v, label: l }))} />
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-dark">Detalles</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Input label="Área construida (m²)" type="number" min={0} value={form.area || ""} onChange={(e) => update({ area: Number(e.target.value) })} />
          <Input label="Área terreno (m²)" type="number" min={0} value={form.landArea || ""} onChange={(e) => update({ landArea: Number(e.target.value) })} />
          <Input label="Habitaciones" type="number" min={0} value={form.bedrooms || ""} onChange={(e) => update({ bedrooms: Number(e.target.value) })} />
          <Input label="Baños" type="number" min={0} value={form.bathrooms || ""} onChange={(e) => update({ bathrooms: Number(e.target.value) })} />
          <Input label="Estacionamientos" type="number" min={0} value={form.parkingSpots || ""} onChange={(e) => update({ parkingSpots: Number(e.target.value) })} />
          <Input label="Año construcción" type="number" value={form.yearBuilt || ""} onChange={(e) => update({ yearBuilt: e.target.value ? Number(e.target.value) : undefined })} />
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-dark">Características</h2>
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none"
            placeholder="Ej: Piscina, Jardín, Seguridad 24h..."
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature() } }}
          />
          <Button type="button" onClick={addFeature}>Agregar</Button>
        </div>
        {form.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.features.map((f) => (
              <span key={f} className="bg-primary-light/10 text-primary-light px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {f}
                <button type="button" onClick={() => removeFeature(f)} className="hover:text-red-500">&#10005;</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-dark">Ubicación</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Dirección" required value={form.location.address} onChange={(e) => updateLocation({ address: e.target.value })} />
          <Select label="Zona" value={form.location.zone} onChange={(e) => updateLocation({ zone: e.target.value })} options={zones.map((z) => ({ value: z, label: z }))} />
          <Input label="Ciudad" required value={form.location.city} onChange={(e) => updateLocation({ city: e.target.value })} />
          <div className="grid grid-cols-2 gap-2">
            <Input label="Latitud" type="number" step="any" value={form.location.lat} onChange={(e) => updateLocation({ lat: Number(e.target.value) })} />
            <Input label="Longitud" type="number" step="any" value={form.location.lng} onChange={(e) => updateLocation({ lng: Number(e.target.value) })} />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-dark">Contacto</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Teléfono" required value={form.contact.phone} onChange={(e) => updateContact({ phone: e.target.value })} />
          <Input label="WhatsApp" required value={form.contact.whatsapp} onChange={(e) => updateContact({ whatsapp: e.target.value })} />
          <Input label="Email" type="email" required value={form.contact.email} onChange={(e) => updateContact({ email: e.target.value })} />
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <ImageUploader images={form.imageUrls} onChange={(urls) => update({ imageUrls: urls })} />
      </div>

      {/* Options */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-dark">Opciones</h2>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => update({ active: e.target.checked })} className="w-4 h-4 rounded accent-primary-light" />
            <span className="text-sm">Activa (visible en el sitio)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => update({ featured: e.target.checked })} className="w-4 h-4 rounded accent-primary-light" />
            <span className="text-sm">Destacada (aparece en inicio)</span>
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? "Guardando..." : propertyId ? "Actualizar propiedad" : "Crear propiedad"}
        </Button>
        <Button type="button" variant="secondary" size="lg" onClick={() => router.push("/admin/propiedades")}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
