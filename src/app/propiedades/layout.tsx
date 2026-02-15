import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Propiedades en Venta",
  description: "Explora nuestra selección de casas, departamentos, terrenos y más en La Paz. Filtros por zona, precio y tipo.",
}

export default function PropiedadesLayout({ children }: { children: React.ReactNode }) {
  return children
}
