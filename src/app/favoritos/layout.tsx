import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mis Favoritos",
  description: "Tus propiedades guardadas como favoritas.",
  openGraph: {
    title: "Mis Favoritos | Inmobiliaria 21",
    description: "Tus propiedades guardadas como favoritas.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mis Favoritos | Inmobiliaria 21",
    description: "Tus propiedades guardadas como favoritas.",
  },
}

export default function FavoritosLayout({ children }: { children: React.ReactNode }) {
  return children
}
