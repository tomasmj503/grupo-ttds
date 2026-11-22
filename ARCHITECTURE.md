# GRUPO TTDS — Manual de Arquitectura & Guía de Configuración (Fase 1)

Este proyecto implementa la **Fase 1 (Arquitectura base + Home completo)** del sitio web oficial para **Grupo TTDS**, desarrollado bajo estándares de diseño editorial y hospitalidad nocturna de lujo inspirados en **Tao Group Hospitality** (`taogroup.com`).

---

## 1. Estándar de Diseño & Sistema Visual

El diseño sigue una estética nocturna, refinada y contemporánea:

- **Fondo Principal:** `#050505` (Negro profundo editorial).
- **Superficies & Modales:** `#0C0C0C` (Grafito oscuro con desenfoque de cristal).
- **Texto Principal:** `#F5F5F0` (Blanco marfil cálido).
- **Texto Secundario:** `#9A9A95` (Gris mineral sutil).
- **Acento Champagne:** `#C8A97E` (Dorado cálido tenue).
- **Geometría:** Esquinas rectas de revista (`rounded-none`), bordes ultra finos (`border-white/15`), cero sombras toscas.
- **Tipografías:**
  - `Cormorant Garamond` (pesos 400, 500, 600) para titulares editoriales de alta cocina.
  - `Montserrat` (pesos 300, 400, 500, 600) en mayúsculas (`uppercase`) con espaciado amplio (`tracking-[0.22em]`) para navegación, botones y etiquetas.
- **Transiciones:** Movimientos lentos y sedosos (`duration-700 ease-out`).
- **Mobile-First Estricto:** Optimizado para pantallas compactas (`375px` a `430px`) garantizando áreas táctiles mínimas de `44px` y legibilidad sin desbordamientos.

---

## 2. Centralización de Datos (`src/config/site.ts`)

Todo el contenido, teléfonos, enlaces de WhatsApp, menús en Canva y recursos multimedia se administran exclusivamente en:

📁 `src/config/site.ts`

### 2.1 Información del Grupo (`GROUP_INFO`)
Permite cambiar el nombre del grupo, el número telefónico de WhatsApp de reservas/atención y los mensajes predeterminados:

```typescript
export const GROUP_INFO: GroupInfo = {
  name: "GRUPO TTDS",
  whatsappNumber: "573115329393", // Formato internacional sin símbolos
  contactMessage: "Hola Grupo TTDS, quisiera solicitar información.",
  pqrsMessage: "Hola Grupo TTDS, deseo radicar una PQRS.",
};
```

### 2.2 Marcas del Portafolio (`BRANDS`)
Gestiona los datos de **Tío Toro** (`"tio-toro"`) y **Dragon Soul** (`"dragon-soul"`):
- `menuUrl`: Enlace directo al menú interactivo en Canva.
- `whatsappReserveText`: Mensaje prellenado para abrir WhatsApp al reservar en ese local.
- `googleMapsUrl` y `googleReviewsUrl`: Enlaces a la ficha de Google Maps y reseñas.
- `instagramUrl` y `tiktokUrl`: Enlaces a redes sociales oficiales.
- `story`: Título y párrafos editoriales que relatan el origen y espíritu de la marca.
- `cardImages` y `galleryImages`: Arrays de imágenes de alta resolución.

```typescript
export const BRANDS: Record<BrandKey, BrandConfig> = {
  "tio-toro": {
    name: "Tío Toro",
    tagline: "Hamburguesas Artesanales & Brasa · Normandía",
    menuUrl: "https://canva.link/0k5iu4p18di948h",
    whatsappReserveText: "Hola, deseo hacer una reservación para Tío Toro",
    // ...
  },
  "dragon-soul": {
    name: "Dragon Soul",
    tagline: "Cocina Asiática de Autor · Sushi Bar & Lounge",
    menuUrl: "https://canva.link/e2ccz4no41wols5",
    whatsappReserveText: "Hola, deseo hacer una reservación para Dragon Soul",
    // ...
  },
};
```

### 2.3 Video Principal del Home (`HOME_HERO_VIDEO`)
Permite cambiar el video de fondo en bucle y la imagen de precarga (poster):

```typescript
export const HOME_HERO_VIDEO: HeroVideoConfig = {
  videoUrl: "https://cdn.coverr.co/videos/.../1080p.mp4", // URL pública MP4 HD
  posterUrl: "https://images.unsplash.com/photo-...",     // Imagen estática HD
};
```

### 2.4 Galería Cinta Marquee (`HOME_MARQUEE_GALLERY`)
Un array de 10 fotografías en alta resolución configurado con alternancia estricta:
- **Índices 1, 3, 5, 7, 9:** `hasInstagram: true`. Al hacer clic abren la cuenta de Instagram del restaurante correspondiente.
- **Índices 0, 2, 4, 6, 8:** `hasInstagram: false`. Al hacer clic abren el **Visor Lightbox oscuro a pantalla completa**.

---

## 3. Logotipos Vectoriales (`src/components/BrandLogos.tsx`)

Los tres logotipos vectoriales son componentes SVG creados con proporciones calibradas para garantizar uniformidad visual:

1. `LogoGrupoTTDS`: Monograma geométrico arquitectónico con corona fina y tipografía de hospitalidad de lujo.
2. `LogoTioToro`: Isotipo estilizado de cornamenta y brasa, con tipografía robusta y refinada de steakhouse/burger.
3. `LogoDragonSoul`: Sello circular Ensō con la silueta de un dragón místico y perla celestial.

Todos reciben la propiedad `className` para heredar colores (`currentColor`), efectos de escala y tamaños responsivos (`h-6`, `h-8`, `h-10`, etc.).

---

## 4. Componentes de la Fase 1

### `Navbar.tsx`
- Encabezado con posición fija (`fixed top-0 w-full z-40`).
- Transición automática al hacer scroll desde transparente a `bg-[#050505]/90 backdrop-blur-md border-b border-white/10`.
- Lado izquierdo: `LogoGrupoTTDS` con enlace a `/`.
- Lado derecho: Únicamente los 3 ítems en móvil y escritorio:
  1. `Tío Toro` (`/tio-toro`)
  2. `Dragon Soul` (`/dragon-soul`)
  3. Botón `Reservas` (desencadena `ReservationModal`).
- Calibrado meticulosamente para pantallas móviles de `375px` sin saltos de línea ni desbordamientos.

### `HeroVideo.tsx`
- Altura completa del viewport (`h-[100svh]`).
- Video HTML5 de fondo con `autoPlay loop muted playsInline` y degradado editorial oscuro (`from-black/70 via-black/30 to-[#050505]`).
- Zona inferior central flotante con cajas de cristal sutil (`bg-black/35 backdrop-blur-md border border-white/20 hover:border-[#C8A97E]`).
- **Regla Crítica:**
  - Clic en `LogoTioToro` abre inmediatamente su **menú en Canva** (`https://canva.link/0k5iu4p18di948h`).
  - Clic en `LogoDragonSoul` abre inmediatamente su **menú en Canva** (`https://canva.link/e2ccz4no41wols5`).
  - Ambos cuentan con el micro-subtítulo `VER MENÚ`.

### `MarqueeGallery.tsx`
- Cinta horizontal infinita que se desplaza **automática y suavemente hacia la derecha** utilizando `requestAnimationFrame` sin cortes perceptibles.
- Pausa interactiva al pasar el cursor (`onMouseEnter`/`onMouseLeave`) o al tocar en dispositivos táctiles (`onTouchStart`/`onTouchEnd`).
- Zoom suave en las imágenes (`group-hover:scale-[1.04] transition-transform duration-700`).
- **Visor Lightbox:**
  - Fondo oscuro inmersivo (`bg-black/95 backdrop-blur-xl`).
  - Navegación bidireccional con flechas táctiles/cursor y soporte de teclado (`←`, `→`, `Escape`).
  - Bloqueo de scroll en el fondo mientras esté activo.

### `ReservationModal.tsx`
- Modal oscuro (`#0C0C0C`) con borde sutil `border-white/15` y desenfoque `backdrop-blur-md`.
- Animaciones fluidas mediante **Framer Motion**.
- Permite seleccionar entre **Tío Toro** y **Dragon Soul**.
- Cada opción genera y abre un enlace de WhatsApp con el mensaje de reserva personalizado listo para enviar.

### `Footer.tsx`
- Pie de página inteligente y centrado.
- En el Home (sin `activeBrand`), presenta los 5 enlaces principales: `Tío Toro`, `Dragon Soul`, `Reservas`, `Contáctanos` y `PQRS`.
- Preparado para la **Fase 2**: Al recibir `activeBrand="tio-toro"` o `"dragon-soul"`, renderiza automáticamente los 8 enlaces específicos de ese concepto (`Menú`, `Galería`, `Reservas`, `Redes`, `Google Review`, `Contáctanos`, `Cómo llegar`, `PQRS`).
- Incluye el logotipo central de `LogoGrupoTTDS` y una fila inferior con ambos logos (`LogoTioToro` y `LogoDragonSoul`) sincronizados al mismo tamaño, cada uno con su botón de Instagram.

---

## 5. Verificación & Compilación

Para comprobar que el código no posee errores de tipado o compilación:

```bash
# Comprobación de tipos en TypeScript
npx tsc --noEmit

# Compilación de producción
npm run build
```

