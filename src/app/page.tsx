"use client"

import Link from "next/link"
import { useFeaturedProperties } from "@/hooks/useProperties"
import { useActiveTestimonials } from "@/hooks/useTestimonials"
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
  const { testimonials } = useActiveTestimonials()
  const { config } = useSiteConfig()

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-white">
            {config.heroTitle}<br />
            <span className="text-accent-light">{config.heroHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl font-light">
            {config.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/propiedades">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Ver propiedades</Button>
            </Link>
            <Link href="/contacto">
              <Button variant="ghost" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Contáctanos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">Propiedades Destacadas</h2>
          <p className="text-muted font-light text-lg">Las mejores opciones seleccionadas para ti</p>
        </div>
        <PropertyGrid properties={properties} loading={loading} />
        <div className="text-center mt-12">
          <Link href="/propiedades">
            <Button variant="ghost" size="lg">Ver todas las propiedades</Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-surface-2 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">¿Por qué elegirnos?</h2>
            <p className="text-muted font-light text-lg">Tu mejor aliado en bienes raíces</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.whyChooseUs.map((item, i) => (
              <div key={i} className="bg-surface border border-border rounded-2xl p-8 text-center hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-2xl mb-5">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ICONS[i % ICONS.length]} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">{item.title}</h3>
                <p className="text-muted text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">Lo que dicen nuestros clientes</h2>
            <p className="text-muted font-light text-lg">Testimonios de quienes confiaron en nosotros</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-surface border border-border rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  {t.imageUrl ? (
                    <img src={t.imageUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-semibold text-lg">{t.name[0]}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground tracking-tight">{t.name}</p>
                    <div className="text-amber-400 text-sm">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed font-light">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">¿Buscas algo específico?</h2>
          <p className="text-white/60 mb-10 text-lg font-light">
            Cuéntanos qué tipo de propiedad necesitas y te ayudaremos a encontrarla.
          </p>
          <Link href="/contacto">
            <Button size="lg" className="bg-accent hover:bg-accent-light text-white">
              Enviar consulta
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
