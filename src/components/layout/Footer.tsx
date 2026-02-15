"use client"

import Link from "next/link"
import { useSiteConfig } from "@/contexts/SiteConfigContext"

export default function Footer() {
  const { config } = useSiteConfig()

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold tracking-tight mb-4">
              <span className="text-accent">{config.companyShort}</span>{" "}
              <span className="text-foreground">{config.companyName.replace(config.companyShort, "").trim()}</span>
            </h3>
            <p className="text-sm text-muted leading-relaxed font-light">
              {config.slogan}. Encontramos la propiedad perfecta para ti en {config.city}.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Enlaces</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/propiedades" className="text-muted hover:text-foreground transition-colors duration-200">Propiedades</Link></li>
              <li><Link href="/nosotros" className="text-muted hover:text-foreground transition-colors duration-200">Nosotros</Link></li>
              <li><Link href="/contacto" className="text-muted hover:text-foreground transition-colors duration-200">Contacto</Link></li>
              <li><Link href="/simulador" className="text-muted hover:text-foreground transition-colors duration-200">Simulador de Crédito</Link></li>
              <li><Link href="/blog" className="text-muted hover:text-foreground transition-colors duration-200">Blog</Link></li>
              <li><Link href="/favoritos" className="text-muted hover:text-foreground transition-colors duration-200">Mis Favoritos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>{config.address}</li>
              <li>Tel: {config.phone}</li>
              <li>WhatsApp: {config.whatsapp}</li>
              <li>{config.email}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-divider mt-12 pt-8 text-center text-sm text-muted-2">
          &copy; {new Date().getFullYear()} {config.companyName}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
