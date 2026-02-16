# Plan: Redes sociales configurables + iconos en footer

## Contexto
Agregar iconos de Facebook, Instagram, TikTok y YouTube al sitio que lleven a las redes sociales de la inmobiliaria. Los links deben ser configurables desde el panel admin.

---

## Archivos a modificar

### 1. `src/types/index.ts` — Agregar campos al tipo SiteConfig
Agregar 4 campos al interface `SiteConfig` y valores vacíos en `DEFAULT_SITE_CONFIG`:
```ts
socialFacebook: string   // ""
socialInstagram: string  // ""
socialTiktok: string     // ""
socialYoutube: string    // ""
```

### 2. `src/app/admin/configuracion/page.tsx` — Sección "Redes Sociales" en admin
Agregar nueva sección después de "Contacto" con 4 inputs para las URLs.
Cada input con placeholder ejemplo:
- Facebook: https://facebook.com/tu-pagina
- Instagram: https://instagram.com/tu-cuenta
- TikTok: https://tiktok.com/@tu-cuenta
- YouTube: https://youtube.com/@tu-canal

### 3. `src/components/layout/Footer.tsx` — Iconos en el footer
Agregar fila de iconos SVG debajo del texto de marca (columna Brand).
- Solo mostrar iconos cuya URL no esté vacía
- Cada icono abre en nueva pestaña (`target="_blank" rel="noopener noreferrer"`)
- Iconos inline SVG: Facebook, Instagram, TikTok, YouTube
- Estilo: text-muted hover:text-accent transition, tamaño w-5 h-5

---

## Verificación
1. `npx next build` — sin errores
2. En admin/configuracion verificar que aparece sección Redes Sociales
3. Iconos en footer solo visibles si tienen URL configurada
4. Deploy a Vercel
