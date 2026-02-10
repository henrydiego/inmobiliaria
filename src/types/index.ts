import { Timestamp } from "firebase/firestore"

export interface Property {
  id: string
  title: string
  description: string
  price: number
  currency: "USD" | "BOB"
  type: "casa" | "departamento" | "terreno" | "oficina" | "local_comercial"
  operation: "venta"
  area: number
  landArea: number
  bedrooms: number
  bathrooms: number
  parkingSpots: number
  yearBuilt?: number
  features: string[]
  imageUrls: string[]
  planImageUrls?: string[]
  location: {
    address: string
    zone: string
    city: string
    lat: number
    lng: number
  }
  contact: {
    phone: string
    whatsapp: string
    email: string
  }
  featured: boolean
  active: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Contact {
  id: string
  propertyId?: string
  propertyTitle?: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: Timestamp
  read: boolean
}

export interface Role {
  isAdmin: boolean
}

export const PROPERTY_TYPES: Record<Property["type"], string> = {
  casa: "Casa",
  departamento: "Departamento",
  terreno: "Terreno",
  oficina: "Oficina",
  local_comercial: "Local Comercial",
}

export const ZONES = [
  "Zona Norte",
  "Zona Sur",
  "Zona Este",
  "Zona Oeste",
  "Centro",
  "Zona Sacaba",
  "Zona Tiquipaya",
  "Zona Quillacollo",
]

export interface SiteConfig {
  companyName: string
  companyShort: string
  slogan: string
  description: string
  phone: string
  whatsapp: string
  email: string
  address: string
  city: string
  country: string
  mapLat: number
  mapLng: number
  heroTitle: string
  heroHighlight: string
  heroSubtitle: string
  mission: string
  vision: string
  values: { title: string; desc: string }[]
  whyChooseUs: { title: string; desc: string }[]
  zones: string[]
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  companyName: "Inmobiliaria 21",
  companyShort: "21",
  slogan: "Tu socio de confianza en bienes raíces",
  description: "Encuentra tu propiedad ideal en La Paz. Casas, departamentos, terrenos y más.",
  phone: "+591 2 2123456",
  whatsapp: "+591 70012345",
  email: "info@inmobiliaria21.com",
  address: "Av. 16 de Julio #123, La Paz",
  city: "La Paz",
  country: "Bolivia",
  mapLat: -16.5000,
  mapLng: -68.1193,
  heroTitle: "Encuentra tu hogar",
  heroHighlight: "ideal en La Paz",
  heroSubtitle: "Casas, departamentos, terrenos y más. Te ayudamos a encontrar la propiedad perfecta para ti y tu familia.",
  mission: "Facilitar el proceso de compra de bienes raíces, brindando un servicio profesional, transparente y personalizado. Nos esforzamos por conectar a las personas con las propiedades que se ajusten a sus necesidades y sueños.",
  vision: "Ser la inmobiliaria de referencia en La Paz, reconocida por nuestra integridad, conocimiento del mercado local y compromiso con la satisfacción de nuestros clientes.",
  values: [
    { title: "Transparencia", desc: "Información clara y honesta en cada transacción." },
    { title: "Compromiso", desc: "Acompañamos a nuestros clientes en todo el proceso." },
    { title: "Profesionalismo", desc: "Equipo capacitado con conocimiento del mercado." },
    { title: "Confianza", desc: "Documentación verificada y procesos seguros." },
  ],
  whyChooseUs: [
    { title: "Confianza y Seguridad", desc: "Todas nuestras propiedades son verificadas y cuentan con documentación legal al día." },
    { title: "Atención Personalizada", desc: "Nuestro equipo te acompaña en todo el proceso, desde la búsqueda hasta la firma." },
    { title: "Amplia Cobertura", desc: "Propiedades en todas las zonas de La Paz y alrededores." },
  ],
  zones: ["Zona Sur", "Zona Norte", "Centro", "Sopocachi", "Miraflores", "Calacoto", "San Miguel", "Achumani", "Obrajes", "Mallasa"],
}
