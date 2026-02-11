"use client"

import Link from "next/link"
import { useSiteConfig } from "@/contexts/SiteConfigContext"

export default function Footer() {
  const { config } = useSiteConfig()

  return (
    <footer className="bg-gray-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              <span className="text-primary-light">{config.companyShort}</span> {config.companyName.replace(config.companyShort, "").trim()}
            </h3>
            <p className="text-sm leading-relaxed">
              {config.slogan}. Encontramos la propiedad perfecta para ti en {config.city}.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/propiedades" className="hover:text-white transition-colors">Propiedades</Link></li>
              <li><Link href="/nosotros" className="hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
              <li><Link href="/simulador" className="hover:text-white transition-colors">Simulador de Crédito</Link></li>
              <li><Link href="/favoritos" className="hover:text-white transition-colors">Mis Favoritos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>{config.address}</li>
              <li>Tel: {config.phone}</li>
              <li>WhatsApp: {config.whatsapp}</li>
              <li>{config.email}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {config.companyName}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
