"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useSiteConfig } from "@/contexts/SiteConfigContext"
import ThemeToggle from "@/components/ui/ThemeToggle"
import NotificationBell from "@/components/ui/NotificationBell"

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/simulador", label: "Simulador" },
  { href: "/blog", label: "Blog" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { config } = useSiteConfig()
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-1.5 font-semibold text-lg tracking-tight">
            <span className="text-accent">{config.companyShort}</span>
            <span className="text-foreground">{config.companyName.replace(config.companyShort, "").trim()}</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm tracking-wide transition-colors duration-200 rounded-lg hover:bg-surface-2 ${isActive ? "text-accent nav-link-active" : "text-muted hover:text-foreground"}`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="ml-2 flex items-center gap-2">
              <NotificationBell />
              <ThemeToggle />
              <Link
                href="/contacto"
                className="bg-accent hover:bg-accent-light text-white px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200"
              >
                Contáctanos
              </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <NotificationBell />
            <ThemeToggle />
            <button
              className="p-2 text-muted hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2.5 px-4 hover:bg-surface-2 rounded-xl transition-colors duration-200 animate-fade-in menu-stagger ${isActive ? "text-accent font-medium" : "text-muted hover:text-foreground"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/contacto"
              className="block text-center bg-accent hover:bg-accent-light text-white py-2.5 px-4 rounded-full font-medium transition-colors duration-200 mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Contáctanos
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
