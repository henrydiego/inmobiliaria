"use client";

import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // CSS de Leaflet importado para que el componente sea autocontenido.
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";

// Componente auxiliar para ajustar los límites del mapa.
// 'useMap' es un hook de react-leaflet que permite acceder a la instancia del mapa.
function ChangeView({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  map.fitBounds(bounds, { padding: [50, 50] }); // Ajusta la vista del mapa para que todos los marcadores sean visibles.
  return null;
}

interface PropertiesMapViewProps {
  properties: Property[];
}

export default function PropertiesMapView({ properties }: PropertiesMapViewProps) {
  // Filtra propiedades que tienen coordenadas válidas para mostrar en el mapa.
  const mapped = properties.filter(
    (p) => p.location?.lat && p.location?.lng && p.location.lat !== 0 && p.location.lng !== 0
  );

  // Muestra un mensaje si no hay propiedades con ubicación.
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
    );
  }

  // Calcula los límites para centrar el mapa.
  // Es importante que L se importe para poder usar L.LatLngBounds.
  const bounds = L.latLngBounds(mapped.map(p => [p.location.lat, p.location.lng]));

  // Icono personalizado para los marcadores.
  // L.divIcon permite usar HTML personalizado como icono.
  const customIcon = L.divIcon({
    html: `<div style="background:#2563eb;width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
    </div>`,
    className: "", // Evita estilos por defecto de Leaflet que puedan interferir.
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });

  return (
    <div className="relative">
      {/* MapContainer es el componente principal de react-leaflet para el mapa.
          Se le pasa la configuración inicial del mapa. */}
      <MapContainer
        center={[mapped[0].location.lat, mapped[0].location.lng]} // Centro inicial si no hay bounds
        zoom={13} // Zoom inicial
        scrollWheelZoom={false} // Deshabilita el zoom con la rueda del ratón
        className="w-full h-[500px] rounded-2xl border border-border z-0" // Estilos Tailwind para el contenedor del mapa
      >
        {/* TileLayer añade las capas de teselas (mapa base de OpenStreetMap). */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Renderiza un marcador y un popup para cada propiedad. */}
        {mapped.map((property) => {
          const imgHtml = property.imageUrls[0]
            ? `<img src="${property.imageUrls[0]}" alt="${property.title}" style="width:100%;height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;" />`
            : "";

          return (
            <Marker
              key={property.id}
              position={[property.location.lat, property.location.lng]}
              icon={customIcon}
            >
              {/* Popup muestra información detallada al hacer clic en el marcador. */}
              <Popup maxWidth={240}>
                <div style="font-family:system-ui,sans-serif;">
                  ${imgHtml}
                  <div style="font-weight:700;font-size:13px;margin-bottom:4px;">${property.title}</div>
                  <div style="color:#2563eb;font-weight:700;font-size:14px;margin-bottom:4px;">${formatPrice(property.price, property.currency)}</div>
                  <div style="color:#64748b;font-size:12px;margin-bottom:8px;">${property.location.zone} · ${property.area}m²</div>
                  <a href="/propiedades/${property.id}" style="color:#2563eb;font-size:12px;font-weight:600;text-decoration:none;">Ver detalle →</a>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* ChangeView es un componente personalizado que usa el hook useMap
            para ajustar la vista del mapa a los límites de todas las propiedades.
            Solo se renderiza si los límites son válidos (hay al menos una propiedad). */}
        {bounds.isValid() && <ChangeView bounds={bounds} />}
      </MapContainer>
      <p className="text-muted text-xs mt-2">{mapped.length} propiedad{mapped.length !== 1 ? "es" : ""} con ubicación</p>
    </div>
  );
}
