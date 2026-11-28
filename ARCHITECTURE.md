# Arquitectura y guía de la plantilla

Cómo está construido el sitio, dónde vive cada cosa, cómo agregar un restaurante y cómo reutilizarlo para otro grupo. Actualizado el 27 de noviembre de 2026.

---

## 1. Resumen

Sitio de **Grupo TTDS** (Tío Toro y Dragon Soul, en Normandía, Bogotá) construido como **plantilla** para grupos de restaurantes.

- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 (vía `postcss.config.mjs`) · TypeScript · Framer Motion (solo en el modal de reservas) · Lucide.
- **Despliegue:** GitHub (`main`) → Vercel, automático en cada `push`.
- **Principio central:** *los datos viven en `src/config/`; los componentes solo los muestran.* Ningún componente tiene escrito el nombre de un restaurante: recorren la lista `BRAND_ORDER`. Por eso un restaurante nuevo es un archivo de datos, no cambios de código.

### Rutas

| Ruta | Qué muestra |
|---|---|
| `/` | Hero, carrusel, eventos y footer |
| `/galeria` | Galería de todos los restaurantes mezclados (con sus videos de primeros) |
| `/<restaurante>/galeria` | Galería de un restaurante (una sola ruta dinámica, `src/app/[brand]/galeria`) |
| cualquier otra | 404 |

Todas las páginas comparten Navbar, Footer y modal de reservas a través de `SiteShell`.

---

## 2. Sistema visual

- **Paleta (blanco y negro, sin dorados):** fondo `#050505`, superficies `#0C0C0C`, texto `#F5F5F0`, texto secundario `#9A9A95`. Los botones principales son blancos; el color lo ponen las fotos y los logos.
- **Tipografías** (cargadas con `next/font` en `src/app/layout.tsx`): **Plus Jakarta Sans** (`font-sans`, todo el sitio) y **Cormorant Garamond** (`font-serif`: título del modal de reservas, nombre del grupo en el menú móvil y logo del grupo).
- **Formas:** esquinas redondeadas en tarjetas y fotos (12 a 16 px).
- **Sin textos sobre las fotos:** ni pies de foto ni rótulos en el carrusel, las galerías o el visor (solo el contador `03 / 22`). El `alt` de cada foto existe solo para accesibilidad.
- **Animaciones de entrada** (`animate-in`, `fade-in`, `zoom-in-95`): definidas a mano en `src/app/globals.css`; se desactivan si el sistema pide menos movimiento.

---

## 3. Estructura de archivos

```
src/
├─ app/
│  ├─ layout.tsx                 Fuentes y metadatos (salen de config/site.ts)
│  ├─ globals.css                Tailwind, colores, animaciones
│  ├─ page.tsx                   Home (server component)
│  ├─ galeria/page.tsx           Galería mezclada
│  └─ [brand]/galeria/page.tsx   Galería de cada restaurante (ruta dinámica)
├─ components/
│  ├─ SiteShell.tsx              Marco común: Navbar + Footer + modal de reservas
│  ├─ Navbar.tsx                 Barra superior y menús de cada restaurante
│  ├─ BrandNavCard.tsx           Tarjeta del menú desplegable (una sola para todos)
│  ├─ Hero.tsx                   Portada: foto o video + un botón de logo por restaurante
│  ├─ MarqueeGallery.tsx         Carrusel del home
│  ├─ PhotoGalleryGrid.tsx       Mosaico de las páginas de galería
│  ├─ PhotoLightbox.tsx          Visor a pantalla completa
│  ├─ SpecialEventsSection.tsx   Eventos privados
│  ├─ ReservationModal.tsx       Modal para elegir restaurante y reservar
│  ├─ Footer.tsx                 Pie de página
│  ├─ HomeLink.tsx               Enlace al inicio que sube hasta arriba
│  ├─ BrandWordmark.tsx          Logo de un restaurante
│  └─ BrandLogos.tsx             Logo del grupo (de texto) e íconos de redes
└─ config/                       TODOS los datos (ver sección 4)
   ├─ site.ts                    Punto de entrada: datos del grupo + re-exporta todo
   ├─ types.ts                   Tipos
   ├─ helpers.ts                 Rutas y enlaces (WhatsApp, Maps, Waze…)
   ├─ define-brand.ts            Convierte la definición de un restaurante en datos listos para usar
   ├─ gallery.ts                 Calcula carrusel y galerías a partir de las fotos
   └─ brands/
      ├─ index.ts                Lista y orden de los restaurantes
      ├─ tio-toro.ts             Un archivo por restaurante
      └─ dragon-soul.ts
public/
├─ images/<id>/                  Fotos: <id>-01.jpg, <id>-02.jpg…
├─ images/eventos/               Foto de la sección de eventos
├─ logos/<id>.svg                Logo de cada restaurante
└─ videos/                       Videos y portadas
scripts/
├─ prepare-photos.py             Prepara las fotos de un restaurante
└─ compress-video.sh             Comprime un video y saca su portada
```

---

## 4. Configuración: `src/config/`

Los componentes importan siempre desde `@/config/site`.

### Datos del grupo (`site.ts`)

| Dato | Para qué sirve |
|---|---|
| `SITE` | Título, descripción, palabras clave, dirección web y vista previa al compartir el enlace |
| `GROUP_INFO` | Nombre del grupo, ciudad, número de WhatsApp, mensajes de Contáctanos y PQRS, y texto del logo |
| `HERO` | Foto de la portada y, opcionalmente, `videoUrl` para usar un video en su lugar |
| `SPECIAL_EVENTS` | Textos, foto y mensaje de WhatsApp de la sección de eventos |
| `getBrandNavCardAction()` | A dónde lleva cada tarjeta del menú desplegable |

### Un restaurante (`brands/<id>.ts`)

Se escribe con `defineBrand({ ... })`. Campos:

| Campo | Qué es |
|---|---|
| `id` | Minúsculas y guiones (`la-pizzeria`). Es la carpeta de fotos y la ruta de su galería |
| `name`, `shortDescription`, `locationLabel` | Nombre; una línea para el carrusel y el modal; zona y ciudad |
| `logo` | `src` del SVG y sus proporciones (`width` y `height` del viewBox) |
| `menuUrl` | Enlace de **vista** del menú en Canva (no el de edición) |
| `whatsappReserveText` | Mensaje que llega prellenado al reservar |
| `googlePlaceId`, `coordinates` | Con ellos se calculan solos los enlaces de Google Maps, reseñas y Waze |
| `instagramUrl`, `tiktokUrl`, `facebookUrl?` | Redes. `facebookUrl` es opcional: sin él, ese botón no aparece |
| `history?` | `tagline` (frase corta en móvil) y `text` (texto de la tarjeta Historia). Sin `text`, se muestra uno provisional |
| `navCardPhotos` | Foto (y encuadre) de cada una de las 6 tarjetas del menú desplegable |
| `photos` | Todas las fotos, **en el orden de su galería**: número de archivo, descripción, encuadre, tamaño y si van en el carrusel |
| `video?` | Video que va de primero en su galería y en la galería mezclada |

### Lo que se calcula solo

- **Enlaces** de Maps, reseñas y Waze (a partir de `googlePlaceId` y `coordinates`).
- **Textos de las 6 tarjetas** del menú desplegable (iguales para todos, salvo los que llevan el nombre del restaurante).
- **Carrusel del home:** mezcla las fotos de todos los restaurantes repartiéndolas de forma pareja (el que tiene menos fotos se coloca primero, a intervalos regulares; el que más tiene rellena el resto), sin juntar dos del mismo restaurante cuando es posible. El orden dentro de cada restaurante se respeta. Las posiciones impares muestran el ícono de Instagram y abren el Instagram del restaurante de esa foto; las pares abren el visor. Las fotos con `carousel: false` no entran.
- **Galería mezclada:** las fotos del carrusel y, al final, las que tienen `carousel: false`.
- **Título y subtítulo del carrusel, opciones del modal y logos del footer:** salen de la lista de restaurantes.

### Qué hace cada tarjeta del menú

| Tarjeta | Acción |
|---|---|
| Menú | Abre el menú de Canva en otra pestaña |
| Galería | Va a `/<restaurante>/galeria` |
| Reserva | Abre WhatsApp con el mensaje del restaurante |
| Redes sociales | La misma tarjeta muestra Instagram, TikTok y Facebook (si existe) |
| Historia | Muestra `history.text` o un texto provisional |
| Ubicación | La misma tarjeta muestra Google Maps, Waze y Reseñas |

---

## 5. Agregar un restaurante

Ejemplo con un restaurante de id `la-pizzeria`.

1. **Fotos.** Reunirlas en una carpeta y ejecutar:
   ```bash
   python3 scripts/prepare-photos.py ~/Desktop/fotos-pizzeria la-pizzeria --darken
   ```
   Convierte HEIC a JPG, reduce a 1800 px, quita los metadatos, oscurece las fotos muy claras (`--darken`) y las deja en `public/images/la-pizzeria/`. Al final imprime las líneas para pegar en `photos`.
2. **Logo.** Guardar el SVG en `public/logos/la-pizzeria.svg`. Si tiene mucho margen vacío, recortar su `viewBox` al contorno del logo. Anotar `width` y `height` del viewBox.
3. **Archivo del restaurante.** Copiar `src/config/brands/tio-toro.ts` como `la-pizzeria.ts`, cambiar el nombre de la constante y completar todos los campos de la sección 4.
   - `googlePlaceId`: se obtiene con la herramienta «Place ID Finder» de Google Maps Platform. Las coordenadas aparecen en la URL de Maps (`@latitud,longitud`).
   - `photos`: pegar las líneas del paso 1 y escribir la descripción de cada foto; reordenar para decidir el orden de la galería; ajustar `focus` si una foto se recorta mal; poner `carousel: false` a las horizontales o las que no deban salir en el carrusel.
   - `navCardPhotos`: escoger qué foto va en cada tarjeta del menú (el número de archivo) y su encuadre.
4. **Registrarlo.** En `src/config/brands/index.ts`, importarlo y añadirlo a `BRAND_LIST` (el orden de la lista es el orden en el sitio).
5. **Video (opcional).** `scripts/compress-video.sh video.mp4 la-pizzeria-video 9` comprime el video, saca la portada del segundo 9 e imprime el bloque `video` para pegar en el archivo.
6. **Verificar.** Reiniciar `npm run dev` (el servidor de desarrollo guarda en caché la lista de rutas y no ve el restaurante nuevo hasta reiniciarlo) y revisar `npx tsc --noEmit`, `npm run lint` y `npm run build`.

Con eso el restaurante aparece solo en la barra de navegación, el hero, el carrusel, el footer, el modal de reservas, su galería (`/la-pizzeria/galeria`) y la galería mezclada. Esto se probó añadiendo un tercer restaurante: todo lo recorrió sin tocar un componente.

> TypeScript ayuda: si falta algún dato obligatorio, marca el error en el archivo del restaurante.

---

## 6. Usar la plantilla para otro grupo

1. **Copiar el proyecto** (plantilla de GitHub o clonar y apuntar a un repositorio nuevo).
2. **Datos del grupo** en `src/config/site.ts`: `SITE`, `GROUP_INFO` (incluido el texto del logo), `HERO` y `SPECIAL_EVENTS`. Ahí están el WhatsApp y los textos de contacto.
3. **Restaurantes:** borrar `src/config/brands/tio-toro.ts` y `dragon-soul.ts` (y sus carpetas en `public/images/`, `public/logos/` y `public/videos/`), crear los nuevos como en la sección 5 y dejar `brands/index.ts` con la lista nueva.
4. **Imágenes del grupo:** foto de eventos en `public/images/eventos/` (y su referencia en `SPECIAL_EVENTS`), y el ícono del sitio en `src/app/favicon.ico`.
5. **Hero:** una foto propia en `public/` (o `videoUrl`). Si ya no se usa la de stock, quitar el host `images.unsplash.com` de `next.config.ts`.
6. **Logo del grupo:** hoy es de texto (`GROUP_INFO.logo`). Si el grupo tiene un logo oficial, se reemplaza el componente `GroupLogo` en `BrandLogos.tsx` por una imagen.
7. **Dominio y despliegue:** crear el proyecto en Vercel conectado al repositorio nuevo y poner la dirección real en `SITE.url`.
8. **Identidad visual (opcional):** la paleta y las fuentes están escritas directamente en las clases de Tailwind y en `layout.tsx`; para cambiarlas hay que buscar y reemplazar (`#050505`, `#0C0C0C`, `#F5F5F0`, `#9A9A95`).
9. **Revisar los textos fijos en español** de los componentes («Ver menú», «Reservaciones», «Pqrs»…), y los textos de las tarjetas del menú en `define-brand.ts`, si el nuevo sitio va en otro idioma o necesita otro tono.

**Pensado para 1 a 4 restaurantes.** Con más, la barra superior de escritorio podría no caber.

---

## 7. Cambios comunes

**Enlace, red social o WhatsApp** → el archivo del restaurante, o `GROUP_INFO`.

**Agregar Facebook a un restaurante** → `facebookUrl: "…"` en su archivo. El botón aparece solo.

**Agregar una foto** → prepararla (o copiarla ya procesada) como `public/images/<id>/<id>-NN.jpg` con el siguiente número libre, y añadir su línea en `photos` del restaurante, en la posición donde debe salir en la galería.

**Reordenar una galería** → mover las líneas de `photos`. El carrusel conserva ese mismo orden dentro de cada restaurante.

**Cambiar la foto de una tarjeta del menú** → `navCardPhotos` del restaurante (número de archivo y `position`; `positionMobile` si en móvil debe encuadrarse distinto).

**Cambiar el video** → comprimir el nuevo, guardarlo con nombre nuevo y actualizar `video`.

**Foto de la sección de eventos o del hero** → `SPECIAL_EVENTS` o `HERO` en `site.ts`. **Usar siempre un nombre de archivo nuevo** al reemplazar una imagen (sección 8).

**Usar un video en el hero** → `videoUrl` en `HERO`: se reproduce en bucle y sin sonido, con la foto como portada.

**Textos de la tarjeta Historia** → `history.text` y `history.tagline` del restaurante.

---

## 8. Fotos, logos y video

**Fotos.** Se reducen a **1800 px por el lado largo**, calidad 82, progresivas y **sin metadatos de cámara** (los HEIC de iPhone pueden traer la ubicación GPS). `scripts/prepare-photos.py` hace todo esto. Las verticales miden 2:3; en las galerías se muestran recortadas en **4:5** como en Tao (`focus` decide qué parte se ve); el visor las muestra enteras. Las horizontales conservan su proporción (hay que indicar su `size`).

**Tono.** El sitio es de fondo negro, y las fotos muy claras rompen la armonía. `--darken` lleva las fotos con brillo medio alto (más de 85 sobre 255) a un tono oscuro parejo, con exposición, curva de contraste y viñeteado suave. El script avisa de cuáles son claras.

**Reemplazar un archivo.** Next.js guarda las imágenes procesadas. Si se sustituye un archivo conservando su nombre, puede seguir viéndose la versión anterior. **Guardar siempre la nueva con un nombre distinto** y actualizar la referencia.

**Logos.** SVG recortados al contorno del logo. Todos los restaurantes se muestran con el mismo ancho en cada lugar (hero, footer, modal), aunque sus logos tengan proporciones distintas; en el modal además se limita la altura.

**Video.** `scripts/compress-video.sh` lo deja en 720 px de ancho, H.264, sin metadatos y listo para reproducirse mientras carga (un video de 25 MB quedó en 2,7 MB). En la galería se muestra la portada con un botón de play y el archivo solo se descarga cuando alguien lo reproduce. Requiere `ffmpeg`.

---

## 9. Cómo se comportan las partes principales

**Navbar.** Un desplegable por restaurante (solo uno abierto a la vez) y el botón Reservaciones. En escritorio el panel de tarjetas avanza de una tarjeta a la vez y siempre llega al final; en móvil es un acordeón con las tarjetas apiladas. Se cierra al hacer clic fuera o con Escape.

**Reservaciones.** En escritorio es un menú con cada restaurante; en móvil (y desde el footer) abre el modal para elegir. Ambos terminan en WhatsApp con el mensaje del restaurante.

**Hero.** Un botón de vidrio por restaurante, todos del mismo ancho y alto, con su logo; abren el menú de Canva. Van al borde inferior para dejar libre el centro (por ejemplo, para un video). Con más de dos restaurantes pasan a una segunda fila.

**Carrusel del home.** Se mueve solo hacia la derecha; se pausa al pasar el mouse; se arrastra con mouse o dedo; tiene flechas y pausa.

**Galerías.** Móvil (menos de 768 px): una foto por fila en 4:5, con el aire de Tao (10 % de margen, 28 px entre fotos). Tablet: 2 columnas. Escritorio (1024 px o más): 3 columnas, con cada elemento puesto en la columna más corta para que terminen casi a la misma altura. Los videos van de primeros.

**Footer.** Restaurantes, Galería (la mezclada), Reservas, Contáctanos y PQRS. Los logos de los restaurantes llevan a su Instagram. El logo del grupo lleva al inicio y sube hasta arriba, igual que el de la barra superior.

**Eventos.** Texto sobre fondo negro y, a su lado, la foto (en móvil, la foto va arriba). El botón abre WhatsApp con el mensaje de cotización.

---

## 10. Verificación

```bash
npx tsc --noEmit    # tipos
npm run lint        # código (hoy: 0 errores y 2 avisos conocidos)
npm run build       # compilación de producción, la misma del despliegue
```

---

## 11. Pendientes y deuda conocida

**Contenido provisional del sitio de Grupo TTDS**
- La **foto de fondo del hero** (`HERO`) es de stock (Unsplash), no de los restaurantes. Es la única imagen ajena que queda. Reemplazar por una propia o por un video.
- La **foto de eventos** son las lámparas del salón de Dragon Soul; se cambiará cuando haya una foto de un evento real.
- El **logo del grupo** es de texto provisional (`GROUP_INFO.logo`); no hay logo oficial.
- La tarjeta **Historia** muestra un texto provisional (falta `history.text`).
- **Dragon Soul no tiene Facebook**; el botón no aparece, y así debe quedar.
- La galería de **Tío Toro en escritorio** deja un hueco del alto de una foto al final de una columna: con 6 fotos y un video en 3 columnas no se puede cuadrar exacto. Decidido dejarlo así por ahora.

**Limpieza posible**
- El hero usa una etiqueta `<img>` normal (uno de los 2 avisos de lint); pasarlo a `next/image` mejora la carga. El otro aviso es del botón «Restaurantes» del footer, que navega con `window.location` en vez del router de Next.
- Faltan: `not-found` personalizada, `sitemap`, `robots` e imagen para compartir en redes (Open Graph).

**Para quien programe**
- Next.js 16 cambia APIs y convenciones: leer `node_modules/next/dist/docs/` antes de escribir código (ver `AGENTS.md`).
- Si Next avisa de un `package-lock.json` fuera del proyecto, es de la máquina local; no afecta el despliegue.
