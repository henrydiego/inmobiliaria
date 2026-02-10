import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { SiteConfigProvider } from "@/contexts/SiteConfigContext"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Inmobiliaria 21 | Bienes Raíces en La Paz",
  description: "Encuentra tu propiedad ideal en La Paz. Casas, departamentos, terrenos y más.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SiteConfigProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SiteConfigProvider>
      </body>
    </html>
  )
}
