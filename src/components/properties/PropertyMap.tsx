"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface PropertyMapProps {
  lat: number
  lng: number
  title?: string
}

export default function PropertyMap({ lat, lng, title }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current).setView([lat, lng], 15)
    mapInstanceRef.current = map

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    const icon = L.divIcon({
      html: `<div style="background:#3B82F6;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      className: "",
    })

    L.marker([lat, lng], { icon }).addTo(map)
      .bindPopup(title || "Ubicación")

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [lat, lng, title])

  return <div ref={mapRef} className="w-full h-80 rounded-xl z-0" />
}
