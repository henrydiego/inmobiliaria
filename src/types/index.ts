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
