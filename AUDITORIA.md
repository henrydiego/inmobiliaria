# Auditoría del Sitio Web - Inmobiliaria 21

**URL:** https://inmobiliaria-rho-liard.vercel.app
**Fecha:** 15 de febrero de 2026

---

## Resumen General

| Categoría | Estado | Nota |
|-----------|--------|------|
| Funcionalidad | Bueno | Todas las páginas cargan correctamente |
| SEO | Aceptable | Títulos y descripciones únicos, falta OG por página |
| Rendimiento | Excelente | Carga en ~0.3s, HTML ~32KB |
| Seguridad | Bueno | Auth con Firebase, Firestore rules, admin protegido |
| Accesibilidad | Aceptable | ARIA labels básicos, falta mejorar |
| PWA | Bueno | Manifest, Service Worker, iconos configurados |
| Responsive | Excelente | Mobile-first, todas las vistas adaptadas |

---

## 1. Páginas del Sitio

### Inicio (`/`) - OK
- Título: "Inmobiliaria 21 | Bienes Raíces en La Paz"
- Meta description presente y descriptiva
- Hero con imagen configurable, propiedades destacadas, estadísticas animadas, testimonios, CTA
- Estructura de headings correcta (H1 > H2 > H3)

### Propiedades (`/propiedades`) - OK
- Título: "Propiedades en Venta | Inmobiliaria 21"
- Filtros por tipo, zona, precio mínimo/máximo
- Vista grilla y vista mapa (Leaflet)
- Paginación con "Cargar más"

### Detalle de propiedad (`/propiedades/[id]`) - OK
- Galería de imágenes con navegación
- Información completa (precio, área, habitaciones, etc.)
- Formulario de contacto integrado
- Botón de WhatsApp con mensaje pre-armado
- Mapa de ubicación
- Planos con lightbox
- Propiedades similares
- Enlace al simulador de crédito
- Botones de compartir (WhatsApp, Facebook, Twitter, copiar enlace)

### Contacto (`/contacto`) - OK
- Título: "Contacto | Inmobiliaria 21"
- Formulario con validación (nombre, email, teléfono, mensaje)
- Info de contacto (teléfono, WhatsApp, email, dirección)
- Mapa de ubicación
- Notificación por email al recibir consulta (EmailJS)

### Nosotros (`/nosotros`) - OK
- Título: "Nosotros | Inmobiliaria 21"
- Misión, Visión, Valores (editables desde admin)
- CTA a contacto

### Blog (`/blog`) - PENDIENTE
- Sin contenido publicado
- La página existe pero muestra "Próximamente"
- Funcionalidad completa (crear, editar, publicar/ocultar, eliminar desde admin)

### Simulador de Crédito (`/simulador`) - OK
- Título: "Simulador de Crédito Hipotecario | Inmobiliaria 21"
- Calcula cuota mensual, intereses, costo total
- Presets de enganche (10%, 15%, 20%)
- Gráfico visual capital vs intereses
- Botón WhatsApp con resultados

### Favoritos (`/favoritos`) - OK
- Guardado en localStorage (no requiere login)
- Muestra propiedades guardadas con PropertyCard

---

## 2. Panel de Administración (`/admin`)

### Login - OK
- Autenticación con Firebase Auth (Google)
- Verificación de rol admin en Firestore (`roles/{uid}.isAdmin`)
- Redirección automática si no es admin

### Dashboard - OK
- Estadísticas: propiedades activas, consultas no leídas, testimonios
- Acceso rápido a secciones

### Gestión de Propiedades - OK
- CRUD completo (crear, editar, eliminar)
- Activar/desactivar propiedades
- Marcar como destacada
- Upload múltiple de imágenes (Cloudinary)
- Upload de planos
- Campos: título, descripción, precio, moneda, tipo, operación, área, terreno, habitaciones, baños, estacionamientos, año, características, ubicación (lat/lng), contacto

### Gestión de Testimonios - OK
- CRUD completo
- Rating con estrellas (1-5)
- Foto opcional
- Activar/ocultar

### Gestión de Blog - OK
- CRUD completo
- Título, slug, extracto, contenido, imagen
- Publicar/ocultar (borradores)

### Configuración del Sitio - OK
- General: nombre empresa, slogan, meta descripción
- Contacto: teléfono, WhatsApp, email, dirección
- Ubicación: ciudad, país, coordenadas del mapa
- Hero: título, texto resaltado, subtítulo, imagen de fondo
- Nosotros: misión, visión
- Valores: lista editable
- "Por qué elegirnos": lista editable
- Zonas: lista editable

### Consultas/Contactos - OK
- Lista de consultas recibidas
- Marcar como leídas
- Detalle de propiedad asociada

---

## 3. Hallazgos de SEO

### Bien
- Títulos únicos por página
- Meta descriptions descriptivas
- robots.txt correctamente configurado (bloquea /admin)
- sitemap.xml con todas las propiedades y páginas principales
- Etiqueta `lang="es"` en HTML
- Open Graph y Twitter Cards en layout

### Por mejorar

| # | Problema | Prioridad |
|---|----------|-----------|
| 1 | **OG/Twitter tags no son específicos por página** - Todas las subpáginas muestran los mismos og:title y og:url del homepage al compartir en redes | Alta |
| 2 | **Blog sin metadata propia** - Usa título y descripción del homepage | Alta |
| 3 | **No hay etiqueta canonical** en ninguna página | Media |
| 4 | **No hay datos estructurados (JSON-LD)** - Falta schema.org para RealEstateAgent y Property | Media |
| 5 | **Blog no está en el sitemap** | Media |
| 6 | **OG image es SVG** - Muchas redes sociales no soportan SVG; usar PNG/JPG 1200x630px | Media |
| 7 | **URLs de propiedades usan IDs de Firebase** en vez de slugs legibles | Baja |

---

## 4. Rendimiento

### Bien
- Tiempo de respuesta del servidor: ~0.3s
- HTML principal: ~32KB (ligero)
- Imágenes con Next.js Image (optimización automática, lazy loading, sizes)
- Dynamic imports para componentes pesados (Leaflet maps)
- Font Inter cargada con next/font (sin FOUT)
- Vercel Analytics integrado

### Por mejorar
- Las propiedades se renderizan 100% client-side (no hay SSR de datos)
- Considerar ISR o SSG para mejorar tiempo al primer contenido visible

---

## 5. Seguridad

### Bien
- Autenticación con Firebase Auth
- Roles de admin verificados en Firestore Rules
- Firestore rules: lectura pública, escritura solo admin autenticado
- Variables de entorno en Vercel (no expuestas en código)
- `rel="noopener noreferrer"` en links externos
- Validación de email y teléfono en formularios
- `.gitignore` incluye `.env.local`
- Admin protegido con redirect a login

### Por mejorar
- No hay headers de seguridad (CSP, X-Frame-Options, X-Content-Type-Options)
- No hay rate limiting en formularios de contacto
- Cloudinary upload preset es "unsigned" (cualquiera podría subir imágenes conociendo el cloud name)

---

## 6. Accesibilidad

### Bien
- `aria-label` en botones de menú, WhatsApp, notificaciones
- Texto alternativo en imágenes (alt)
- Contraste adecuado con modo claro/oscuro
- Botones con estados hover visibles
- Formularios con labels

### Por mejorar
- ARIA labels limitados (solo 4 en homepage)
- Falta `aria-label` en botones de favoritos, comparar, filtros
- No hay skip-to-content link
- Focus styles podrían ser más visibles

---

## 7. Funcionalidades Implementadas

| Funcionalidad | Estado |
|--------------|--------|
| Listado de propiedades con filtros | Implementado |
| Vista de mapa (Leaflet) | Implementado |
| Detalle de propiedad | Implementado |
| Galería de imágenes | Implementado |
| Formulario de contacto | Implementado |
| Notificación por email (EmailJS) | Implementado |
| Botón WhatsApp flotante | Implementado |
| Simulador de crédito | Implementado |
| Favoritos (localStorage) | Implementado |
| Comparar propiedades (hasta 3) | Implementado |
| Notificaciones de nuevas propiedades | Implementado |
| Blog | Implementado (sin contenido) |
| Testimonios | Implementado |
| Modo oscuro/claro | Implementado |
| PWA (instalable) | Implementado |
| Panel de administración completo | Implementado |
| Animaciones scroll | Implementado |
| Estadísticas animadas | Implementado |
| Compartir en redes sociales | Implementado |
| SEO (sitemap, robots, meta tags) | Implementado |
| Vercel Analytics | Implementado |

---

## 8. Tecnologías

- **Framework:** Next.js 15 (App Router)
- **UI:** Tailwind CSS 4
- **Base de datos:** Firebase Firestore
- **Auth:** Firebase Authentication (Google)
- **Imágenes:** Cloudinary
- **Mapas:** Leaflet / React-Leaflet
- **Email:** EmailJS
- **Hosting:** Vercel
- **Analytics:** Vercel Analytics
- **Notificaciones:** react-hot-toast
