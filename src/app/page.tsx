"use client"

import Link from "next/link"
import Image from "next/image"
import { useFeaturedProperties } from "@/hooks/useProperties"
import { useActiveTestimonials } from "@/hooks/useTestimonials"
import { useSiteConfig } from "@/contexts/SiteConfigContext"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useCountAnimation } from "@/hooks/useCountAnimation"
import PropertyGrid from "@/components/properties/PropertyGrid"
import Button from "@/components/ui/Button"

function StatCounter({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) {
  const { count, ref } = useCountAnimation(target)
  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-accent tracking-tight">
        {count}{suffix}
      </p>
      <p className="text-muted text-sm font-light mt-2">{label}</p>
    </div>
  )
}

const ICONS = [
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
]

export default function HomePage() {
  const { properties, loading } = useFeaturedProperties()
  const { testimonials } = useActiveTestimonials()
  const { config } = useSiteConfig()
  const scrollRef = useScrollAnimation()

  return (
    <div ref={scrollRef}>
      {/* Hero */}
      <section className={`relative min-h-[85vh] flex items-center overflow-hidden ${config.heroImage ? "" : "bg-background"}`}>
        {/* Background image */}
        {config.heroImage ? (
          <>
            <Image
              src={config.heroImage}
              alt="Hero"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        )}

        <div className="relative max-w-7xl mx-auto px-4 py-24 w-full">
          <div className="max-w-3xl">
            <p className={`font-medium text-sm tracking-widest uppercase mb-4 ${config.heroImage ? "text-white/80" : "text-accent"}`}>
              {config.companyName}
            </p>
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-[1.05] tracking-tight ${config.heroImage ? "text-white" : "text-foreground"}`}>
              {config.heroTitle}<br />
              <span className={config.heroImage ? "text-accent-light" : "text-accent"}>{config.heroHighlight}</span>
            </h1>
            <p className={`text-lg md:text-xl mb-10 max-w-xl font-light leading-relaxed ${config.heroImage ? "text-white/70" : "text-muted"}`}>
              {config.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/propiedades">
                <Button size="lg" className={config.heroImage ? "bg-white text-primary hover:bg-white/90" : ""}>
                  Ver propiedades
                </Button>
              </Link>
              <Link href="/contacto">
                <Button variant="ghost" size="lg" className={config.heroImage ? "border-white/30 text-white hover:bg-white/10" : ""}>
                  Contáctanos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 py-24 scroll-animate">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-2">Selección</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Propiedades Destacadas</h2>
          </div>
          <Link href="/propiedades" className="text-accent hover:text-accent-dark text-sm font-medium hidden md:block">
            Ver todas &rarr;
          </Link>
        </div>
        <PropertyGrid properties={properties} loading={loading} />
        <div className="text-center mt-12 md:hidden">
          <Link href="/propiedades">
            <Button variant="ghost">Ver todas las propiedades</Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 py-20 scroll-animate">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter target={properties.length || 10} label="Propiedades disponibles" suffix="+" />
          <StatCounter target={config.zones.length || 8} label="Zonas cubiertas" />
          <StatCounter target={12} label="Años de experiencia" />
          <StatCounter target={350} label="Clientes satisfechos" suffix="+" />
        </div>
      </section>

      {/* Why Choose Us - Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 py-24 scroll-animate">
        <div className="mb-12">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-2">Ventajas</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">¿Por qué elegirnos?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {config.whyChooseUs.map((item, i) => {
            const isLarge = i === 0
            return (
              <div
                key={i}
                className={`group relative bg-surface border border-border rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  isLarge ? "md:col-span-2 md:row-span-2 md:p-12" : ""
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className={`inline-flex items-center justify-center bg-accent/10 text-accent rounded-2xl mb-5 ${
                    isLarge ? "w-16 h-16" : "w-12 h-12"
                  }`}>
                    <svg className={isLarge ? "w-8 h-8" : "w-6 h-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={ICONS[i % ICONS.length]} />
                    </svg>
                  </div>
                  <h3 className={`font-bold text-foreground mb-3 tracking-tight ${
                    isLarge ? "text-2xl" : "text-lg"
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-muted font-light leading-relaxed ${
                    isLarge ? "text-base max-w-md" : "text-sm"
                  }`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-24 scroll-animate">
          <div className="mb-12">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-2">Testimonios</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Lo que dicen nuestros clientes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`bg-surface border border-border rounded-3xl p-7 ${
                  i === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  {t.imageUrl ? (
                    <img src={t.imageUrl} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-semibold">{t.name[0]}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground text-sm tracking-tight">{t.name}</p>
                    <div className="text-accent text-xs">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed font-light">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA - warm dark instead of blue */}
      <section className="max-w-7xl mx-auto px-4 pb-24 scroll-animate">
        <div className="bg-foreground rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-background tracking-tight">¿Buscas algo específico?</h2>
            <p className="text-background/50 mb-10 text-lg font-light max-w-xl mx-auto">
              Cuéntanos qué tipo de propiedad necesitas y te ayudaremos a encontrarla.
            </p>
            <Link href="/contacto">
              <Button size="lg" className="bg-accent hover:bg-accent-light text-white">
                Enviar consulta
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
