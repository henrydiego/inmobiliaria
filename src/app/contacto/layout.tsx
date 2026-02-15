import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos para encontrar tu propiedad ideal. Estamos disponibles por teléfono, WhatsApp y email.",
  openGraph: {
    title: "Contacto | Inmobiliaria 21",
    description: "Contáctanos para encontrar tu propiedad ideal. Estamos disponibles por teléfono, WhatsApp y email.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contacto | Inmobiliaria 21",
    description: "Contáctanos para encontrar tu propiedad ideal. Estamos disponibles por teléfono, WhatsApp y email.",
  },
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children
}
