"use client"

import { useSiteConfig } from "@/contexts/SiteConfigContext"

export default function NosotrosPage() {
  const { config } = useSiteConfig()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-dark mb-4">Sobre Nosotros</h1>
        <p className="text-lg text-gray-medium max-w-2xl mx-auto">
          Somos una empresa inmobiliaria comprometida con encontrar la propiedad ideal para cada cliente en {config.city}.
        </p>
      </div>

      {/* Mission/Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="w-12 h-12 bg-primary-light/10 text-primary-light rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-dark mb-3">Nuestra Misión</h2>
          <p className="text-gray-medium leading-relaxed">{config.mission}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="w-12 h-12 bg-primary-light/10 text-primary-light rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-dark mb-3">Nuestra Visión</h2>
          <p className="text-gray-medium leading-relaxed">{config.vision}</p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-dark text-center mb-8">Nuestros Valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.values.map((v, i) => (
            <div key={i} className="bg-gray-light rounded-xl p-6 text-center">
              <h3 className="font-semibold text-gray-dark mb-2">{v.title}</h3>
              <p className="text-sm text-gray-medium">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-primary rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">¿Tienes preguntas?</h2>
        <p className="text-gray-300 mb-6">Estamos aquí para ayudarte. Contáctanos hoy mismo.</p>
        <a
          href="/contacto"
          className="inline-block bg-primary-light hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Ir a contacto
        </a>
      </div>
    </div>
  )
}
