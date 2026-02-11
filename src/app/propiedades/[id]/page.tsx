"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import dynamic from "next/dynamic"
import { getProperty, submitContact } from "@/hooks/useProperties"
import { Property, PROPERTY_TYPES } from "@/types"
import Link from "next/link"
import { formatPrice, formatArea, getWhatsAppUrl } from "@/lib/utils"
import PropertyGallery from "@/components/properties/PropertyGallery"
import Button from "@/components/ui/Button"
import Input, { Textarea } from "@/components/ui/Input"

const PropertyMap = dynamic(() => import("@/components/properties/PropertyMap"), { ssr: false })

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)
  const closeLightbox = useCallback(() => setLightboxImg(null), [])

  useEffect(() => {
    async function load() {
      const p = await getProperty(id)
      setProperty(p)
      setLoading(false)
    }
    load()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!property) return
    setSending(true)
    try {
      await submitContact({
        ...formData,
        propertyId: property.id,
        propertyTitle: property.title,
      })
      setSent(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch {
      alert("Error al enviar. Intenta nuevamente.")
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-96 bg-gray-200 rounded-xl" />
          <div className="h-8 bg-gray-200 rounded w-2/3" />
          <div className="h-6 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-dark mb-4">Propiedad no encontrada</h1>
        <p className="text-gray-medium">La propiedad que buscas no existe o fue removida.</p>
      </div>
    )
  }

  const planImages = property.planImageUrls || []

  const whatsappMsg = `Hola, me interesa la propiedad: ${property.title} (${formatPrice(property.price, property.currency)})`

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <PropertyGallery images={property.imageUrls} title={property.title} />

          {/* Title & Price */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-dark">{property.title}</h1>
              <div className="text-right">
                <span className="text-2xl md:text-3xl font-bold text-primary-light block">
                  {formatPrice(property.price, property.currency)}
                </span>
                <Link
                  href={`/simulador?precio=${property.price}`}
                  className="inline-flex items-center gap-1 text-sm text-primary-light hover:underline mt-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Simular crédito
                </Link>
              </div>
            </div>
            <p className="text-gray-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.location.address}, {property.location.zone}, {property.location.city}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Tipo", value: PROPERTY_TYPES[property.type] },
              { label: "Área construida", value: formatArea(property.area) },
              { label: "Terreno", value: formatArea(property.landArea) },
              { label: "Habitaciones", value: property.bedrooms.toString() },
              { label: "Baños", value: property.bathrooms.toString() },
              { label: "Estacionamientos", value: property.parkingSpots.toString() },
              ...(property.yearBuilt ? [{ label: "Año", value: property.yearBuilt.toString() }] : []),
            ].map((item, i) => (
              <div key={i} className="bg-gray-light rounded-lg p-3 text-center">
                <p className="text-xs text-gray-medium mb-1">{item.label}</p>
                <p className="font-semibold text-gray-dark">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-dark mb-3">Descripción</h2>
            <p className="text-gray-medium whitespace-pre-line leading-relaxed">{property.description}</p>
          </div>

          {/* Features */}
          {property.features.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-dark mb-3">Características</h2>
              <div className="flex flex-wrap gap-2">
                {property.features.map((f, i) => (
                  <span key={i} className="bg-primary-light/10 text-primary-light px-3 py-1 rounded-full text-sm font-medium">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Plan Images */}
          {planImages.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-dark mb-3">Plano</h2>
              <div className={`grid gap-4 ${planImages.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
                {planImages.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightboxImg(url)}
                    className="relative group rounded-xl overflow-hidden border border-gray-200 cursor-pointer"
                  >
                    <img
                      src={url}
                      alt={`Plano ${i + 1}`}
                      className="w-full h-auto object-contain bg-white"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-dark px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        Ver plano
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Map */}
          {property.location.lat && property.location.lng && (
            <div>
              <h2 className="text-xl font-semibold text-gray-dark mb-3">Ubicación</h2>
              <PropertyMap lat={property.location.lat} lng={property.location.lng} title={property.title} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* WhatsApp */}
          <a
            href={getWhatsAppUrl(property.contact.whatsapp, whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar por WhatsApp
          </a>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-dark mb-4">Enviar consulta</h3>
            {sent ? (
              <div className="text-center py-4">
                <div className="text-accent text-4xl mb-2">&#10003;</div>
                <p className="font-medium text-gray-dark">¡Consulta enviada!</p>
                <p className="text-sm text-gray-medium">Te contactaremos pronto.</p>
                <button onClick={() => setSent(false)} className="text-primary-light text-sm mt-2 hover:underline">
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nombre"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  label="Teléfono"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Textarea
                  label="Mensaje"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={`Me interesa esta propiedad: ${property.title}`}
                />
                <Button type="submit" className="w-full" disabled={sending}>
                  {sending ? "Enviando..." : "Enviar consulta"}
                </Button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="bg-gray-light rounded-xl p-6 space-y-3 text-sm">
            <h3 className="font-semibold text-gray-dark">Información de contacto</h3>
            <p className="flex items-center gap-2 text-gray-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {property.contact.phone}
            </p>
            <p className="flex items-center gap-2 text-gray-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {property.contact.email}
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Cerrar"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {planImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {planImages.map((url, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxImg(url) }}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    lightboxImg === url ? "border-white" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={url} alt={`Plano ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <img
            src={lightboxImg}
            alt="Plano"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
