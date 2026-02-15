import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Propiedades en Venta",
  description: "Explora nuestra selección de casas, departamentos, terrenos y más en La Paz. Filtros por zona, precio y tipo.",
  openGraph: {
    title: "Propiedades en Venta | Inmobiliaria 21",
    description: "Explora nuestra selección de casas, departamentos, terrenos y más en La Paz.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Propiedades en Venta | Inmobiliaria 21",
    description: "Explora nuestra selección de casas, departamentos, terrenos y más en La Paz.",
  },
}

export default function PropiedadesLayout({ children }: { children: React.ReactNode }) {
  return children
}
