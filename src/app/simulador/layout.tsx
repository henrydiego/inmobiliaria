import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Simulador de Crédito Hipotecario",
  description: "Calcula tu cuota mensual, intereses y costo total de tu crédito hipotecario. Simulador gratuito.",
}

export default function SimuladorLayout({ children }: { children: React.ReactNode }) {
  return children
}
