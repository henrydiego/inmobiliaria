"use client"

import { useEffect, useRef } from "react"
import { Property } from "@/types"
import { formatPrice } from "@/lib/utils"

interface PropertiesMapViewProps {
  properties: Property[]
}

export default function PropertiesMapView({ properties }: PropertiesMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  // Filter properties with valid coordinates
  const mapped = properties.filter(
    (p) => p.location?.lat && p.location?.lng && p.location.lat !== 0 && p.location.lng !== 0
  )

  useEffect(() => {
    // Ensure the container div exists and we have properties to show
    if (!mapRef.current || mapped.length === 0) return

    // If a map instance already exists, remove it before creating a new one
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    // Initialize map
    const center: L.LatLngTuple = [mapped[0].location.lat, mapped[0].location.lng]
    const map = L.map(mapRef.current).setView(center, 13)
    mapInstanceRef.current = map

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    const icon = L.divIcon({
      html: `<div style="background:#2563eb;width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
      </div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
      className: "", // Important for Leaflet not to add its own class
    })

    const bounds = L.latLngBounds([])

    mapped.forEach((property) => {
      const latlng: L.LatLngTuple = [property.location.lat, property.location.lng]
      bounds.extend(latlng)

      const imgHtml = property.imageUrls[0]
        ? `<img src="${property.imageUrls[0]}" alt="" style="width:100%;height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;" />`
        : ""

      const popup = L.popup({ maxWidth: 240 }).setContent(`
        <div style="font-family:system-ui,sans-serif;">
          ${imgHtml}
          <div style="font-weight:700;font-size:13px;margin-bottom:4px;">${property.title}</div>
          <div style="color:#2563eb;font-weight:700;font-size:14px;margin-bottom:4px;">${formatPrice(property.price, property.currency)}</div>
          <div style="color:#64748b;font-size:12px;margin-bottom:8px;">${property.location.zone} · ${property.area}m²</div>
          <a href="/propiedades/${property.id}" style="color:#2563eb;font-size:12px;font-weight:600;text-decoration:none;">Ver detalle →</a>
        </div>
      `)

      L.marker(latlng, { icon }).addTo(map).bindPopup(popup)
    })
    
    // This is the key fix. We use a small timeout to ensure the browser has painted
    // the container's dimensions before we ask the map to resize and fit bounds.
    // This is a robust way to avoid race conditions in production environments.
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize(true) // Pass true for a smoother animation
        if (mapped.length > 1) {
          mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] })
        }
      }
    }, 150) // A 150ms delay is imperceptible but very safe for rendering.

    // Cleanup function to run when the component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [properties])

  if (mapped.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-2xl h-[500px] flex items-center justify-center">
        <div className="text-center text-muted">
          <svg className="w-12 h-12 mx-auto mb-3 text-muted-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="font-medium">No hay propiedades con ubicación en el mapa</p>
          <p className="text-sm mt-1">Las propiedades necesitan coordenadas para mostrarse aquí</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div ref={mapRef} className="w-full h-[500px] rounded-2xl border border-border z-0" />
      <p className="text-muted text-xs mt-2">{mapped.length} propiedad{mapped.length !== 1 ? "es" : ""} con ubicación</p>
    </div>
  )
}
