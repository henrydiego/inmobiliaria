"use client"

import Link from "next/link"
import { useFeaturedProperties } from "@/hooks/useProperties"
import { useSiteConfig } from "@/contexts/SiteConfigContext"
import PropertyGrid from "@/components/properties/PropertyGrid"
import Button from "@/components/ui/Button"

const ICONS = [
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
]

export default function HomePage() {
  const { properties, loading } = useFeaturedProperties()
  const { config } = useSiteConfig()

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/70" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {config.heroTitle}<br />
            <span className="text-primary-light">{config.heroHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            {config.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/propiedades">
              <Button size="lg">Ver propiedades</Button>
            </Link>
            <Link href="/contacto">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Contáctanos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-dark mb-2">Propiedades Destacadas</h2>
          <p className="text-gray-medium">Las mejores opciones seleccionadas para ti</p>
        </div>
        <PropertyGrid properties={properties} loading={loading} />
        <div className="text-center mt-10">
          <Link href="/propiedades">
            <Button variant="outline" size="lg">Ver todas las propiedades</Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-light py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-dark mb-2">¿Por qué elegirnos?</h2>
            <p className="text-gray-medium">Tu mejor aliado en bienes raíces</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.whyChooseUs.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light/10 text-primary-light rounded-full mb-4">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ICONS[i % ICONS.length]} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-dark mb-2">{item.title}</h3>
                <p className="text-gray-medium text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Buscas algo específico?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Cuéntanos qué tipo de propiedad necesitas y te ayudaremos a encontrarla.
          </p>
          <Link href="/contacto">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Enviar consulta
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
