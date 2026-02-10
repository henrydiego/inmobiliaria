"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { submitContact } from "@/hooks/useProperties"
import { useSiteConfig } from "@/contexts/SiteConfigContext"
import Input, { Textarea } from "@/components/ui/Input"
import Button from "@/components/ui/Button"

const ContactMap = dynamic(() => import("@/components/properties/PropertyMap"), { ssr: false })

export default function ContactoPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const { config } = useSiteConfig()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await submitContact(form)
      setSent(true)
      setForm({ name: "", email: "", phone: "", message: "" })
    } catch {
      alert("Error al enviar. Intenta nuevamente.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-dark mb-4">Contacto</h1>
        <p className="text-lg text-gray-medium">Estamos aquí para ayudarte. Envíanos tu consulta.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {sent ? (
            <div className="text-center py-8">
              <div className="text-accent text-5xl mb-4">&#10003;</div>
              <h2 className="text-xl font-bold text-gray-dark mb-2">¡Mensaje enviado!</h2>
              <p className="text-gray-medium mb-4">Nos comunicaremos contigo a la brevedad.</p>
              <button onClick={() => setSent(false)} className="text-primary-light hover:underline">
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-dark mb-2">Envíanos un mensaje</h2>
              <Input
                label="Nombre completo"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                label="Teléfono"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Textarea
                label="Mensaje"
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Escribe tu consulta aquí..."
              />
              <Button type="submit" className="w-full" size="lg" disabled={sending}>
                {sending ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>
          )}
        </div>

        {/* Info + Map */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-dark">Información de contacto</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-light mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-dark">Dirección</p>
                  <p className="text-gray-medium text-sm">{config.address}, {config.country}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-light mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-dark">Teléfono</p>
                  <p className="text-gray-medium text-sm">{config.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-light mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-dark">WhatsApp</p>
                  <p className="text-gray-medium text-sm">{config.whatsapp}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-light mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-dark">Email</p>
                  <p className="text-gray-medium text-sm">{config.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-dark mb-3">Nuestra ubicación</h3>
            <ContactMap lat={config.mapLat} lng={config.mapLng} title={config.companyName} />
          </div>
        </div>
      </div>
    </div>
  )
}
