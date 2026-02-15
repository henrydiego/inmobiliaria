import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos y consejos sobre bienes raíces, inversión inmobiliaria y el mercado en La Paz.",
  openGraph: {
    title: "Blog | Inmobiliaria 21",
    description: "Artículos y consejos sobre bienes raíces, inversión inmobiliaria y el mercado en La Paz.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog | Inmobiliaria 21",
    description: "Artículos y consejos sobre bienes raíces, inversión inmobiliaria y el mercado en La Paz.",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
