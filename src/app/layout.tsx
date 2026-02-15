import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import WhatsAppFloat from "@/components/ui/WhatsAppFloat"
import { SiteConfigProvider } from "@/contexts/SiteConfigContext"
import { CompareProvider } from "@/contexts/CompareContext"
import CompareBar from "@/components/properties/CompareBar"
import { Toaster } from "react-hot-toast"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const viewport: Viewport = {
  themeColor: "#2563eb",
}

const SITE_URL = "https://inmobiliaria-rho-liard.vercel.app"

export const metadata: Metadata = {
  title: {
    default: "Inmobiliaria 21 | Bienes Raíces en La Paz",
    template: "%s | Inmobiliaria 21",
  },
  description: "Encuentra tu propiedad ideal en La Paz. Casas, departamentos, terrenos y más.",
  manifest: "/manifest.json",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "es_BO",
    url: SITE_URL,
    siteName: "Inmobiliaria 21",
    title: "Inmobiliaria 21 | Bienes Raíces en La Paz",
    description: "Encuentra tu propiedad ideal en La Paz. Casas, departamentos, terrenos y más.",
    images: [{ url: "/icons/icon-512.png", width: 512, height: 512, alt: "Inmobiliaria 21" }],
  },
  twitter: {
    card: "summary",
    title: "Inmobiliaria 21 | Bienes Raíces en La Paz",
    description: "Encuentra tu propiedad ideal en La Paz. Casas, departamentos, terrenos y más.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Inmobiliaria 21",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-512.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Inmobiliaria 21",
              "description": "Encuentra tu propiedad ideal en La Paz. Casas, departamentos, terrenos y más.",
              "url": "https://inmobiliaria-rho-liard.vercel.app",
              "logo": "https://inmobiliaria-rho-liard.vercel.app/icons/icon-512.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "La Paz",
                "addressCountry": "BO"
              },
              "areaServed": "La Paz, Bolivia",
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <SiteConfigProvider>
          <CompareProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppFloat />
            <CompareBar />
            <Toaster position="bottom-center" toastOptions={{ style: { borderRadius: "12px", padding: "12px 16px", fontSize: "14px" } }} />
            <Analytics />
          </CompareProvider>
        </SiteConfigProvider>
      </body>
    </html>
  )
}
