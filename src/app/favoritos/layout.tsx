import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mis Favoritos",
  description: "Tus propiedades guardadas como favoritas.",
}

export default function FavoritosLayout({ children }: { children: React.ReactNode }) {
  return children
}
