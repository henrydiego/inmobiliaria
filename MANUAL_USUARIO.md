# Manual de Usuario - Inmobiliaria 21

**Sitio web:** https://inmobiliaria-rho-liard.vercel.app
**Panel de administración:** https://inmobiliaria-rho-liard.vercel.app/admin

---

## PARTE 1: SITIO WEB PÚBLICO

El sitio web es la cara visible de tu negocio. Los visitantes pueden explorar propiedades, contactarte, simular créditos y más.

---

### 1.1 Página de Inicio

La página principal muestra:

- **Hero:** Sección principal con título, subtítulo e imagen de fondo (configurables desde el admin)
- **Propiedades Destacadas:** Las propiedades marcadas como "destacadas" aparecen aquí automáticamente
- **Estadísticas:** Número de propiedades, zonas cubiertas, años de experiencia, clientes satisfechos
- **Por qué elegirnos:** Sección de ventajas (configurable desde admin)
- **Testimonios:** Opiniones de clientes (se gestionan desde admin)
- **CTA:** Botón para contacto

---

### 1.2 Propiedades

**URL:** `/propiedades`

Los visitantes pueden:

- **Ver todas las propiedades** activas en formato tarjeta
- **Filtrar** por:
  - Tipo (Casa, Departamento, Terreno, Oficina, Local Comercial)
  - Zona (las zonas que configures en admin)
  - Precio mínimo y máximo
- **Cambiar vista** entre grilla y mapa
- **Cargar más** propiedades (paginación)
- **Agregar a favoritos** haciendo clic en el corazón
- **Comparar** hasta 3 propiedades seleccionando el ícono de comparar
- **Compartir** por WhatsApp directamente desde la tarjeta

---

### 1.3 Detalle de Propiedad

**URL:** `/propiedades/{id}`

Al hacer clic en una propiedad, el visitante ve:

- **Galería de imágenes** con navegación (flechas, miniaturas)
- **Precio** con enlace al simulador de crédito
- **Ubicación** (dirección, zona, ciudad)
- **Botones de compartir** (WhatsApp, Facebook, Twitter, copiar enlace)
- **Información rápida:** tipo, área, terreno, habitaciones, baños, estacionamientos, año
- **Descripción** completa
- **Características** (etiquetas como "Piscina", "Garaje", etc.)
- **Planos** con visor ampliable (lightbox)
- **Mapa** con la ubicación exacta
- **Botón WhatsApp** con mensaje pre-armado con el nombre y precio de la propiedad
- **Formulario de contacto** para enviar consulta sobre esa propiedad
- **Información de contacto** (teléfono, email)
- **Propiedades similares** (mismo tipo y zona)

---

### 1.4 Simulador de Crédito

**URL:** `/simulador`

Herramienta para que los visitantes calculen su cuota mensual estimada:

1. Ingresan el **precio del inmueble**
2. Seleccionan el **enganche/inicial** (10%, 15%, 20% o monto personalizado)
3. Eligen el **plazo** (5, 10, 15, 20 o 25 años)
4. Ajustan la **tasa de interés** anual
5. Hacen clic en **"Calcular cuota"**

El resultado muestra:
- Cuota mensual estimada
- Capital financiado
- Total de intereses
- Costo total
- Gráfico visual capital vs intereses
- Botón para consultar por WhatsApp con los datos de la simulación

**Nota:** Desde el detalle de una propiedad, hay un enlace "Simular crédito" que lleva al simulador con el precio ya cargado.

---

### 1.5 Contacto

**URL:** `/contacto`

- Formulario con: nombre, email, teléfono y mensaje
- Validación automática de email y teléfono
- Al enviar, se guarda en la base de datos y se envía notificación por email al administrador
- Muestra información de contacto: dirección, teléfono, WhatsApp, email
- Mapa con la ubicación de la oficina

---

### 1.6 Nosotros

**URL:** `/nosotros`

Muestra la información de la empresa:
- Misión y Visión
- Valores (todo configurable desde el admin)

---

### 1.7 Blog

**URL:** `/blog`

Sección de artículos sobre bienes raíces. Los artículos se crean desde el panel de administración. Cada artículo tiene:
- Título y slug (URL amigable)
- Imagen de portada
- Extracto (resumen)
- Contenido completo
- Autor y fecha

---

### 1.8 Favoritos

**URL:** `/favoritos`

Los visitantes pueden guardar propiedades como favoritas haciendo clic en el ícono de corazón. Los favoritos se almacenan en el navegador del visitante (no requieren cuenta).

---

### 1.9 Comparar Propiedades

Los visitantes pueden seleccionar hasta 3 propiedades para comparar lado a lado. Al seleccionar propiedades:
- Aparece una barra inferior con las propiedades seleccionadas
- Pueden ver la comparación detallada (precio, área, habitaciones, baños, etc.)
- Pueden remover propiedades de la comparación

---

### 1.10 Funciones Adicionales

- **Modo oscuro/claro:** Botón de sol/luna en la barra de navegación. Se guarda la preferencia
- **Botón de WhatsApp flotante:** Siempre visible en esquina inferior derecha
- **Notificaciones:** Campanita en la barra de navegación que avisa cuando hay nuevas propiedades
- **Instalable como app (PWA):** Los visitantes pueden instalar el sitio como aplicación en su celular

---

## PARTE 2: PANEL DE ADMINISTRACIÓN

### 2.1 Acceso al Panel

1. Ir a https://inmobiliaria-rho-liard.vercel.app/admin
2. Iniciar sesión con la cuenta de Google autorizada
3. Solo los usuarios con rol de administrador pueden acceder

**Cuenta admin actual:** henrydiegolizarropuma@gmail.com

---

### 2.2 Dashboard

El dashboard muestra un resumen:
- Número de propiedades activas
- Consultas no leídas
- Testimonios activos
- Accesos rápidos a cada sección

---

### 2.3 Gestión de Propiedades

**Ruta:** Admin > Propiedades

#### Crear una propiedad nueva
1. Clic en **"+ Nueva propiedad"**
2. Completar los campos:
   - **Título:** Nombre descriptivo (ej: "Casa Moderna en Zona Norte")
   - **Descripción:** Texto detallado de la propiedad
   - **Precio:** Valor numérico
   - **Moneda:** USD o BOB
   - **Tipo:** Casa, Departamento, Terreno, Oficina o Local Comercial
   - **Área construida:** En metros cuadrados
   - **Terreno:** En metros cuadrados
   - **Habitaciones, Baños, Estacionamientos:** Números
   - **Año de construcción:** Opcional
   - **Características:** Agregar etiquetas (ej: "Piscina", "Jardín", "Garaje")
   - **Imágenes:** Subir fotos de la propiedad (la primera será la imagen principal)
   - **Planos:** Subir imágenes de los planos (opcional)
   - **Ubicación:** Dirección, zona, ciudad, coordenadas (latitud/longitud)
   - **Contacto:** Teléfono, WhatsApp, email de contacto para esa propiedad
   - **Destacada:** Marcar si quieres que aparezca en la página principal
   - **Activa:** Marcar para que sea visible en el sitio
3. Clic en **"Guardar"**

#### Editar una propiedad
1. En la lista de propiedades, clic en **"Editar"**
2. Modificar los campos necesarios
3. Clic en **"Guardar"**

#### Activar/Desactivar
- Clic en **"Desactivar"** para ocultar la propiedad del sitio sin eliminarla
- Clic en **"Activar"** para volver a mostrarla

#### Eliminar
- Clic en **"Eliminar"** y confirmar
- Esta acción es permanente

---

### 2.4 Gestión de Testimonios

**Ruta:** Admin > Testimonios

#### Crear testimonio
1. Clic en **"+ Nuevo testimonio"**
2. Completar:
   - **Nombre:** Nombre del cliente
   - **Testimonio:** Texto de la opinión
   - **Calificación:** De 1 a 5 estrellas (clic en las estrellas)
   - **Foto:** Opcional, subir foto del cliente
   - **Visible en el sitio:** Marcar/desmarcar
3. Clic en **"Guardar"**

#### Editar testimonio
1. Clic en **"Editar"** junto al testimonio
2. Modificar campos
3. Clic en **"Guardar"**

#### Ocultar/Mostrar
- Clic en **"Ocultar"** para que no aparezca en la web
- Clic en **"Mostrar"** para hacerlo visible

#### Eliminar
- Clic en **"Eliminar"** y confirmar

---

### 2.5 Gestión de Blog

**Ruta:** Admin > Blog

#### Crear artículo
1. Clic en **"+ Nuevo artículo"**
2. Completar:
   - **Título:** Título del artículo
   - **Slug:** URL amigable (se genera automáticamente del título)
   - **Extracto:** Resumen corto que aparece en la lista del blog
   - **Contenido:** Texto completo del artículo
   - **Imagen:** Imagen de portada
   - **Autor:** Nombre del autor
3. Clic en **"Guardar"**

#### Publicar/Ocultar
- Los artículos se crean como **borradores** por defecto
- Clic en **"Publicar"** para hacerlo visible
- Clic en **"Ocultar"** para volver a borrador

#### Editar
1. Clic en **"Editar"**
2. Modificar campos
3. Clic en **"Guardar"**

---

### 2.6 Consultas Recibidas

**Ruta:** Admin > Dashboard (consultas)

- Muestra las consultas enviadas por visitantes desde los formularios de contacto
- Indica la propiedad asociada (si corresponde)
- Se pueden marcar como leídas
- Incluye nombre, email, teléfono y mensaje del visitante

---

### 2.7 Configuración del Sitio

**Ruta:** Admin > Configuración

Permite editar toda la información visible del sitio web:

#### General
- **Nombre de la empresa:** Se muestra en la barra de navegación y footer
- **Nombre corto:** El número/texto que aparece resaltado (ej: "21")
- **Slogan:** Texto del footer
- **Meta descripción:** Descripción para motores de búsqueda

#### Contacto
- **Teléfono:** Número de teléfono principal
- **WhatsApp:** Número para el botón flotante y enlaces de WhatsApp
- **Email:** Email de contacto
- **Dirección:** Dirección física

#### Ubicación
- **Ciudad y País**
- **Latitud y Longitud:** Coordenadas para el mapa de la página de contacto

#### Hero (Página principal)
- **Título:** Texto principal del hero (ej: "Encuentra tu hogar")
- **Texto resaltado:** Texto en color destacado (ej: "ideal en La Paz")
- **Subtítulo:** Texto secundario
- **Imagen de fondo:** Subir imagen para el fondo del hero (recomendado: 1920x800px o mayor)

#### Nosotros
- **Misión:** Texto de la misión
- **Visión:** Texto de la visión

#### Valores
- Lista editable de valores con título y descripción
- Agregar o eliminar valores

#### Por qué elegirnos
- Lista editable de ventajas con título y descripción
- Agregar o eliminar elementos

#### Zonas
- Lista de zonas disponibles para filtrar propiedades
- Agregar o eliminar zonas

**Importante:** Después de hacer cambios, clic en **"Guardar configuración"** para que se apliquen.

---

## PARTE 3: GUÍA RÁPIDA

### ¿Cómo publicar una nueva propiedad?
1. Ir a Admin > Propiedades > "+ Nueva propiedad"
2. Llenar todos los campos y subir fotos
3. Marcar como "Activa" y opcionalmente "Destacada"
4. Guardar

### ¿Cómo cambiar la imagen del hero?
1. Ir a Admin > Configuración > Hero
2. Subir nueva imagen
3. Guardar configuración

### ¿Cómo ver las consultas de clientes?
1. Ir a Admin > Dashboard
2. Ver la lista de consultas
3. También recibes notificación por email automáticamente

### ¿Cómo cambiar el número de WhatsApp?
1. Ir a Admin > Configuración > Contacto
2. Cambiar el campo "WhatsApp"
3. Guardar configuración

### ¿Cómo agregar un testimonio?
1. Ir a Admin > Testimonios > "+ Nuevo testimonio"
2. Escribir nombre, texto, calificación
3. Opcionalmente subir foto
4. Guardar

### ¿Cómo agregar una zona nueva?
1. Ir a Admin > Configuración > Zonas
2. Escribir el nombre de la zona
3. Clic en "Agregar"
4. Guardar configuración

### ¿Cómo ocultar una propiedad sin eliminarla?
1. Ir a Admin > Propiedades
2. Clic en "Desactivar" junto a la propiedad
3. La propiedad dejará de ser visible pero los datos se conservan
