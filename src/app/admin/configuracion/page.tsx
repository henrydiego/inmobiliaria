"use client"

import { useState, useEffect } from "react"
import { useSiteConfig } from "@/contexts/SiteConfigContext"
import { SiteConfig } from "@/types"
import Input, { Textarea } from "@/components/ui/Input"
import Button from "@/components/ui/Button"

export default function ConfiguracionPage() {
  const { config, loading, saveConfig } = useSiteConfig()
  const [form, setForm] = useState<SiteConfig>(config)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!loading) setForm(config)
  }, [config, loading])

  const update = (patch: Partial<SiteConfig>) => {
    setForm((f) => ({ ...f, ...patch }))
    setSaved(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await saveConfig(form)
      setSaved(true)
    } catch {
      alert("Error al guardar la configuración")
    } finally {
      setSaving(false)
    }
  }

  // Editable list helpers
  const updateListItem = (
    key: "values" | "whyChooseUs",
    index: number,
    field: "title" | "desc",
    value: string
  ) => {
    const list = [...form[key]]
    list[index] = { ...list[index], [field]: value }
    update({ [key]: list })
  }

  const addListItem = (key: "values" | "whyChooseUs") => {
    update({ [key]: [...form[key], { title: "", desc: "" }] })
  }

  const removeListItem = (key: "values" | "whyChooseUs", index: number) => {
    update({ [key]: form[key].filter((_, i) => i !== index) })
  }

  // Zone helpers
  const [newZone, setNewZone] = useState("")
  const addZone = () => {
    const trimmed = newZone.trim()
    if (trimmed && !form.zones.includes(trimmed)) {
      update({ zones: [...form.zones, trimmed] })
      setNewZone("")
    }
  }
  const removeZone = (index: number) => {
    update({ zones: form.zones.filter((_, i) => i !== index) })
  }

  if (loading) return <p className="text-gray-medium">Cargando configuración...</p>

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-dark">Configuración del Sitio</h1>
        <p className="text-gray-medium">Edita la información que se muestra en el sitio web.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General */}
        <Section title="General">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Nombre de la empresa" required value={form.companyName} onChange={(e) => update({ companyName: e.target.value })} />
            <Input label="Nombre corto" required value={form.companyShort} onChange={(e) => update({ companyShort: e.target.value })} placeholder="Ej: 21" />
          </div>
          <Input label="Slogan" value={form.slogan} onChange={(e) => update({ slogan: e.target.value })} />
          <Textarea label="Meta descripción" rows={2} value={form.description} onChange={(e) => update({ description: e.target.value })} />
        </Section>

        {/* Contacto */}
        <Section title="Contacto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Teléfono" value={form.phone} onChange={(e) => update({ phone: e.target.value })} />
            <Input label="WhatsApp" value={form.whatsapp} onChange={(e) => update({ whatsapp: e.target.value })} />
            <Input label="Email" type="email" value={form.email} onChange={(e) => update({ email: e.target.value })} />
            <Input label="Dirección" value={form.address} onChange={(e) => update({ address: e.target.value })} />
          </div>
        </Section>

        {/* Ubicación */}
        <Section title="Ubicación">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Ciudad" value={form.city} onChange={(e) => update({ city: e.target.value })} />
            <Input label="País" value={form.country} onChange={(e) => update({ country: e.target.value })} />
            <Input label="Latitud" type="number" step="any" value={form.mapLat} onChange={(e) => update({ mapLat: Number(e.target.value) })} />
            <Input label="Longitud" type="number" step="any" value={form.mapLng} onChange={(e) => update({ mapLng: Number(e.target.value) })} />
          </div>
        </Section>

        {/* Hero */}
        <Section title="Hero (Página principal)">
          <Input label="Título" value={form.heroTitle} onChange={(e) => update({ heroTitle: e.target.value })} placeholder="Ej: Encuentra tu hogar" />
          <Input label="Texto resaltado" value={form.heroHighlight} onChange={(e) => update({ heroHighlight: e.target.value })} placeholder="Ej: ideal en La Paz" />
          <Textarea label="Subtítulo" rows={2} value={form.heroSubtitle} onChange={(e) => update({ heroSubtitle: e.target.value })} />
        </Section>

        {/* Nosotros */}
        <Section title="Nosotros">
          <Textarea label="Misión" rows={3} value={form.mission} onChange={(e) => update({ mission: e.target.value })} />
          <Textarea label="Visión" rows={3} value={form.vision} onChange={(e) => update({ vision: e.target.value })} />
        </Section>

        {/* Valores */}
        <Section title="Valores">
          {form.values.map((v, i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input label="Título" value={v.title} onChange={(e) => updateListItem("values", i, "title", e.target.value)} />
                <Input label="Descripción" value={v.desc} onChange={(e) => updateListItem("values", i, "desc", e.target.value)} />
              </div>
              <button type="button" onClick={() => removeListItem("values", i)} className="mt-7 text-red-500 hover:text-red-700 px-2">&#10005;</button>
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={() => addListItem("values")}>+ Agregar valor</Button>
        </Section>

        {/* Por qué elegirnos */}
        <Section title="Por qué elegirnos">
          {form.whyChooseUs.map((item, i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input label="Título" value={item.title} onChange={(e) => updateListItem("whyChooseUs", i, "title", e.target.value)} />
                <Input label="Descripción" value={item.desc} onChange={(e) => updateListItem("whyChooseUs", i, "desc", e.target.value)} />
              </div>
              <button type="button" onClick={() => removeListItem("whyChooseUs", i)} className="mt-7 text-red-500 hover:text-red-700 px-2">&#10005;</button>
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={() => addListItem("whyChooseUs")}>+ Agregar elemento</Button>
        </Section>

        {/* Zonas */}
        <Section title="Zonas">
          <div className="flex flex-wrap gap-2 mb-3">
            {form.zones.map((z, i) => (
              <span key={i} className="bg-primary-light/10 text-primary-light px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {z}
                <button type="button" onClick={() => removeZone(i)} className="hover:text-red-500">&#10005;</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none"
              placeholder="Nueva zona..."
              value={newZone}
              onChange={(e) => setNewZone(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addZone() } }}
            />
            <Button type="button" onClick={addZone}>Agregar</Button>
          </div>
        </Section>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <Button type="submit" size="lg" disabled={saving}>
            {saving ? "Guardando..." : "Guardar configuración"}
          </Button>
          {saved && <span className="text-accent font-medium">Configuración guardada correctamente</span>}
        </div>
      </form>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-dark">{title}</h2>
      {children}
    </div>
  )
}
