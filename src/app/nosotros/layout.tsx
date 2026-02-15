import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce nuestra misión, visión y valores. Somos tu socio de confianza en bienes raíces en La Paz.",
  openGraph: {
    title: "Nosotros | Inmobiliaria 21",
    description: "Conoce nuestra misión, visión y valores. Somos tu socio de confianza en bienes raíces en La Paz.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Nosotros | Inmobiliaria 21",
    description: "Conoce nuestra misión, visión y valores. Somos tu socio de confianza en bienes raíces en La Paz.",
  },
}

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return children
}
