"use client"

import { useSiteConfig } from "@/contexts/SiteConfigContext"

export default function NosotrosPage() {
  const { config } = useSiteConfig()

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Sobre Nosotros</h1>
        <p className="text-lg text-muted max-w-2xl mx-auto font-light">
          Somos una empresa inmobiliaria comprometida con encontrar la propiedad ideal para cada cliente en {config.city}.
        </p>
      </div>

      {/* Mission/Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-surface border border-border rounded-2xl p-8">
          <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-5">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">Nuestra Misión</h2>
          <p className="text-muted leading-relaxed font-light">{config.mission}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-8">
          <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-5">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">Nuestra Visión</h2>
          <p className="text-muted leading-relaxed font-light">{config.vision}</p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 tracking-tight">Nuestros Valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.values.map((v, i) => (
            <div key={i} className="bg-surface-2 border border-border rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2 tracking-tight">{v.title}</h3>
              <p className="text-sm text-muted font-light">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-primary rounded-2xl p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white tracking-tight">¿Tienes preguntas?</h2>
        <p className="text-white/60 mb-8 font-light">Estamos aquí para ayudarte. Contáctanos hoy mismo.</p>
        <a
          href="/contacto"
          className="inline-block bg-accent hover:bg-accent-light text-white font-medium px-7 py-3 rounded-full transition-colors duration-200"
        >
          Ir a contacto
        </a>
      </div>
    </div>
  )
}
