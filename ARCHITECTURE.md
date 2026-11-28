# GRUPO TTDS — Arquitectura y guía de mantenimiento

Cómo está construido el sitio, dónde vive cada cosa y cómo cambiarla. Actualizado el 27 de noviembre de 2026.

---

## 1. Resumen

Sitio de **Grupo TTDS** con dos restaurantes en Normandía (Bogotá): **Tío Toro** y **Dragon Soul**. Inspirado en el estilo de Tao Group: negro profundo, fotografía grande y casi nada de texto sobre las fotos.

- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 (vía `postcss.config.mjs`) · TypeScript · Framer Motion (solo en el modal de reservas) · Lucide (íconos).
- **Despliegue:** GitHub (`main`) → Vercel, automático en cada `push`.
- **Principio de diseño:** el contenido vive en datos (`src/config/site.ts`) y los componentes solo lo muestran. Para cambiar un enlace, una foto o un orden casi nunca hay que tocar un componente.

### Rutas

| Ruta | Qué muestra |
|---|---|
| `/` | Hero, carrusel de fotos, eventos y footer |
| `/galeria` | Galería de los dos restaurantes mezclados (con el video de Tío Toro de primero) |
| `/tio-toro/galeria` | Galería de Tío Toro (con el video de primero) |
| `/dragon-soul/galeria` | Galería de Dragon Soul |

Todas las páginas comparten Navbar, Footer y modal de reservas a través de `SiteShell`.

---

## 2. Sistema visual

- **Paleta (blanco y negro, sin dorados):** fondo `#050505`, superficies `#0C0C0C`, texto `#F5F5F0`, texto secundario `#9A9A95`. Los botones principales son blancos; el color lo ponen las fotos y los logos.
- **Tipografías** (cargadas con `next/font` en `src/app/layout.tsx`):
  - **Plus Jakarta Sans** → `font-sans`, todo el sitio.
  - **Cormorant Garamond** → `font-serif`: título del modal de reservas, nombre del grupo en el menú móvil y el logo TTDS provisional.
- **Formas:** esquinas redondeadas en tarjetas y fotos (12 a 16 px).
- **Sin textos sobre las fotos:** ni pies de foto ni rótulos en el carrusel, las galerías o el visor. Lo único que muestra el visor es el contador (`03 / 22`). El texto alternativo (`alt`) de cada foto existe solo para accesibilidad.
- **Animaciones de entrada** (`animate-in`, `fade-in`, `zoom-in-95`): definidas a mano en `src/app/globals.css`; se desactivan si el sistema pide menos movimiento.

---

## 3. Estructura de archivos

```
src/
├─ app/
│  ├─ layout.tsx               Fuentes, metadatos y estructura base
│  ├─ globals.css              Tailwind, colores, animaciones
│  ├─ page.tsx                 Home (server component)
│  ├─ galeria/page.tsx         Galería mezclada
│  ├─ tio-toro/galeria/        Galería de Tío Toro
│  └─ dragon-soul/galeria/     Galería de Dragon Soul
├─ components/
│  ├─ SiteShell.tsx            Marco común: Navbar + Footer + modal de reservas
│  ├─ Navbar.tsx               Barra superior y menús de cada restaurante
│  ├─ BrandNavCard.tsx         Tarjeta del menú desplegable (una sola para los dos restaurantes)
│  ├─ HeroVideo.tsx            Hero con los dos logos (ver nota de nombre más abajo)
│  ├─ MarqueeGallery.tsx       Carrusel del home
│  ├─ PhotoGalleryGrid.tsx     Mosaico de las páginas de galería
│  ├─ PhotoLightbox.tsx        Visor a pantalla completa (carrusel y galerías)
│  ├─ SpecialEventsSection.tsx Eventos privados
│  ├─ ReservationModal.tsx     Modal para elegir restaurante y reservar
│  ├─ Footer.tsx               Pie de página
│  ├─ HomeLink.tsx             Enlace al inicio que sube hasta arriba
│  ├─ BrandWordmark.tsx        Logo real de cada restaurante
│  └─ BrandLogos.tsx           Logo del grupo (provisional) e íconos de redes
└─ config/site.ts              TODOS los datos del sitio
public/
├─ images/tio-toro/            tio-toro-01.jpg … 06
├─ images/dragon-soul/         dragon-soul-01.jpg … 18
├─ images/eventos/             Foto de la sección de eventos
├─ logos/                      tio-toro.svg, dragon-soul.svg
└─ videos/                     Video de Tío Toro y su portada
```

> **Nota:** `HeroVideo.tsx` conserva ese nombre aunque hoy no tiene video: muestra una foto de fondo y los dos logos. Cuando llegue el video, se cambia la `<img>` de fondo por un `<video>` en ese mismo archivo.

---

## 4. Datos del sitio: `src/config/site.ts`

| Dato | Para qué sirve |
|---|---|
| `GROUP_INFO` | Nombre del grupo, número de WhatsApp y mensajes de Contáctanos y PQRS |
| `BRANDS` | Todo lo de cada restaurante (ver abajo) |
| `SPECIAL_EVENTS` | Textos, foto y mensaje de WhatsApp de la sección de eventos |
| `MARQUEE_PHOTOS` | Orden de las fotos del carrusel del home |
| `PHOTO_ALTS`, `PHOTO_SIZES`, `PHOTO_FOCUS` | Descripción, dimensiones y encuadre de cada foto |
| `BRAND_GALLERY_ORDER` | Orden de las fotos en la galería de cada restaurante |
| `TIO_TORO_VIDEO` | Video de la galería (archivo, portada y proporciones) |
| `getBrandNavCardAction()` | A dónde lleva cada tarjeta del menú desplegable |

### Lo que contiene cada restaurante (`BRANDS`)

- `menuUrl`: enlace de **vista** del menú en Canva (se abre en otra pestaña). Usar el enlace `/view`, no el de edición.
- `whatsappReserveText`: mensaje que llega prellenado al reservar.
- `instagramUrl`, `tiktokUrl`, `facebookUrl`: redes. **`facebookUrl` es opcional**: si no existe, ese botón no aparece (Dragon Soul no tiene).
- `googleMapsUrl`, `googleReviewsUrl`, `wazeUrl`: ubicación y reseñas, construidos a partir del *Place ID* de Google y de las coordenadas del local.
- `navCards`: las 6 tarjetas del menú desplegable (título, foto, encuadre y textos de escritorio y móvil).

### Qué hace cada tarjeta del menú

| Tarjeta | Acción |
|---|---|
| Menú | Abre el menú de Canva en otra pestaña |
| Galería | Va a `/<restaurante>/galeria` |
| Reserva | Abre WhatsApp con el mensaje del restaurante |
| Redes sociales | La misma tarjeta muestra Instagram, TikTok y Facebook (si existe) |
| Historia | Muestra un texto provisional |
| Ubicación | La misma tarjeta muestra Google Maps, Waze y Reseñas |

---

## 5. Cómo hacer los cambios más comunes

**Cambiar un enlace, una red social o el WhatsApp** → editar `BRANDS` o `GROUP_INFO` en `site.ts`.

**Añadir un Facebook a un restaurante** → agregar `facebookUrl: "…"` en su bloque de `BRANDS`. El botón aparece solo.

**Agregar una foto nueva a un restaurante**
1. Prepararla (ver sección 6) y guardarla como `public/images/<restaurante>/<restaurante>-NN.jpg`, con el siguiente número libre.
2. En `site.ts`: añadir su descripción en `PHOTO_ALTS`, su encuadre en `PHOTO_FOCUS`, y su número en `BRAND_GALLERY_ORDER`. Si no es 2:3, añadir sus dimensiones en `PHOTO_SIZES`.
3. Para que salga también en el carrusel, añadirla en `MARQUEE_PHOTOS`.

**Reordenar el carrusel** → mover líneas en `MARQUEE_PHOTOS`. Regla: las posiciones impares muestran el ícono de Instagram y abren el Instagram de su restaurante; las pares abren el visor. Conviene que nunca queden dos fotos de Tío Toro seguidas, tampoco al dar la vuelta.

**Reordenar una galería** → cambiar el orden en `BRAND_GALLERY_ORDER`. La galería mezclada usa el orden del carrusel más dos fotos extra.

**Cambiar la foto de una tarjeta del menú** → en `navCards` del restaurante, cambiar `getBrandPhoto("<restaurante>", N)`. Si la foto queda mal encuadrada, ajustar `imagePosition` (y `imagePositionMobile` si en móvil debe ser distinto).

**Cambiar la foto de eventos** → ver `SPECIAL_EVENTS` en `site.ts`. **Usar un nombre de archivo nuevo** al reemplazarla (ver sección 6).

**Cambiar la foto de fondo del hero** → está fija en `src/components/HeroVideo.tsx` (constante `HERO_PHOTO_URL`).

**Cambiar el video** → comprimir el nuevo (sección 6), guardarlo en `public/videos/` con nombre nuevo y actualizar `TIO_TORO_VIDEO`.

**Agregar un restaurante nuevo** → ampliar `BrandKey`, crear su bloque en `BRANDS`, sus fotos, su logo en `public/logos/` (con sus proporciones en `BrandWordmark.tsx`) y su carpeta de galería en `src/app/`.

**Datos de ubicación de un local nuevo** → abrir su ficha en Google Maps; las coordenadas aparecen en la URL (`@latitud,longitud`) y el *Place ID* se obtiene con la herramienta «Place ID Finder» de Google Maps Platform. Con él, `site.ts` arma los enlaces de Maps y de reseñas.

---

## 6. Fotos, logos y video

**Fotos.** Las originales (algunas en HEIC de iPhone) se convirtieron a JPG, se redujeron a **1800 px por el lado largo**, calidad 82, progresivas y **sin metadatos de cámara** (los HEIC pueden traer ubicación GPS). Las fotos verticales miden 2:3; en las galerías se muestran recortadas en **4:5** como en Tao (`PHOTO_FOCUS` decide qué parte se ve). El visor las muestra enteras.

**Tono.** Las fotos de Dragon Soul que salían muy claras se oscurecieron para que combinen con el resto (bajar exposición, curva de contraste y viñeteado suave). Si se agregan fotos nuevas muy claras, conviene tratarlas igual para no romper la armonía visual.

**Reemplazar una foto o logo.** Next.js guarda las imágenes procesadas. Si se sustituye un archivo conservando su nombre, puede seguir viéndose la versión anterior. **Guardar siempre la nueva con un nombre distinto** y actualizar la referencia.

**Logos.** Son SVG de los clientes, recortados al contorno para que no tengan margen vacío. Los dos tienen proporciones muy distintas, por eso `BrandWordmark.tsx` define el tamaño de cada uno según el lugar (hero, footer o modal).

**Video.** Se comprimió de 25 MB a 2,7 MB. Comando usado:

```bash
ffmpeg -i original.mp4 -map_metadata -1 -vf "scale=720:-2" -c:v libx264 -crf 27 \
  -preset slow -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k salida.mp4
```

En la galería se muestra la portada con un botón de play; el archivo solo se descarga cuando alguien lo reproduce.

---

## 7. Cómo se comportan las partes principales

**Navbar.** Muestra Tío Toro y Dragon Soul como desplegables (solo uno abierto a la vez) y el botón Reservaciones. En escritorio el panel de tarjetas se desplaza de una tarjeta a la vez y siempre llega hasta el final. En móvil es un acordeón con las tarjetas apiladas. Se cierra al hacer clic fuera o con Escape.

**Reservaciones.** En escritorio es un menú con cada restaurante; en móvil (y desde el footer) abre el modal para elegir. Los dos terminan en WhatsApp con el mensaje del restaurante.

**Hero.** Dos botones de vidrio, del mismo ancho y alto, con el logo de cada restaurante; abren su menú de Canva. Van al borde inferior para dejar libre el centro cuando haya video.

**Carrusel del home.** Se mueve solo hacia la derecha; se pausa al pasar el mouse. Se puede arrastrar con el mouse o el dedo, y tiene flechas y pausa. Las fotos de las posiciones impares llevan al Instagram del restaurante.

**Galerías.** Móvil (menos de 768 px): una foto por fila, con el aire de Tao. Tablet: 2 columnas. Escritorio: 3 columnas, con cada foto puesta en la columna más corta para que terminen casi a la misma altura. El video, si lo hay, va de primero.

**Footer.** Enlaces: Restaurantes, Galería (la mezclada), Reservas, Contáctanos y PQRS. Los logos de los restaurantes llevan a su Instagram. El logo TTDS lleva al inicio y sube hasta arriba, igual que el de la barra superior.

**Sección de eventos.** Texto sobre fondo negro y, a su lado, la foto de las lámparas (en móvil, la foto va arriba). El botón abre WhatsApp con el mensaje de cotización.

---

## 8. Verificación

```bash
npx tsc --noEmit    # tipos
npm run lint        # código (hoy: 0 errores y 2 avisos conocidos)
npm run build       # compilación de producción, la misma del despliegue
```

---

## 9. Pendientes y deuda conocida

**Contenido provisional**
- La **foto de fondo del hero** es de stock (Unsplash), no de los restaurantes. Es el único lugar donde queda una imagen ajena. Reemplazar por una propia o por el video.
- La **foto de eventos** son las lámparas del salón de Dragon Soul; se cambiará cuando haya una foto de un evento real.
- El **logo del grupo (TTDS)** es un dibujo provisional (`LogoGrupoTTDS` en `BrandLogos.tsx`); no hay logo oficial.
- La tarjeta **Historia** muestra un texto provisional.
- **Dragon Soul no tiene Facebook** (el botón no aparece, y así debe quedar).

**Datos sin uso en `site.ts`** (quedaron de versiones anteriores y hoy no se muestran): `HOME_HERO_VIDEO`, y en cada restaurante `tagline`, `story`, `cardImages` y `galleryImages`; en `GROUP_INFO`, `termsUrl` y `privacyUrl`. Se pueden usar a futuro (por ejemplo para la página de Historia o los términos legales) o eliminarse.

**Limpieza posible**
- `next.config.ts` permite imágenes de `images.unsplash.com`, `assets.mixkit.co`, `images.pexels.com` y `cdn.coverr.co`. Solo se usa la primera (por la foto del hero); el resto sobra.
- El hero usa una etiqueta `<img>` normal (uno de los 2 avisos de lint); pasarlo a `next/image` mejora la carga. El otro aviso es del botón «Restaurantes» del footer, que navega con `window.location` en vez de usar el router de Next.
- La galería de Tío Toro en escritorio deja un hueco del alto de una foto al final de una columna: con 6 fotos y un video no se puede cuadrar exacto. Se cierra con más fotos de Tío Toro. Decidido dejarlo así por ahora.
- Páginas que faltan: `not-found` personalizada, `sitemap` y `robots`, e imagen para compartir en redes (Open Graph).

**Para quien programe**
- Next.js 16 cambia APIs y convenciones: leer `node_modules/next/dist/docs/` antes de escribir código (ver `AGENTS.md`).
- Si Next muestra un aviso sobre un `package-lock.json` fuera del proyecto, es de la máquina local (un archivo suelto en la carpeta de usuario); no afecta el despliegue.
