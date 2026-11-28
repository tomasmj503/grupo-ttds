/**
 * Tipos de la configuración del sitio.
 * No contienen datos: los datos de cada restaurante viven en src/config/brands/.
 */

/** Tarjetas del menú desplegable de cada restaurante en la Navbar */
export type BrandNavCardId = "menu" | "galeria" | "reserva" | "redes" | "historia" | "ubicacion";

/** Tarjeta ya resuelta (con sus textos) que muestra el menú desplegable */
export interface BrandNavCard {
  id: BrandNavCardId;
  title: string;
  imageUrl: string;
  /** Encuadre de la foto dentro de la tarjeta (CSS object-position), p. ej. "center 85%" */
  imagePosition?: string;
  /** Encuadre distinto para la versión móvil (si no se indica, usa imagePosition) */
  imagePositionMobile?: string;
  /** Textos de la versión de escritorio (panel horizontal) */
  desktop: { subtitle: string; cta: string };
  /** Textos de la versión móvil (acordeón vertical) */
  mobile: { subtitle: string; cta: string };
}

/** Qué hace cada tarjeta al hacer clic */
export type BrandNavCardAction =
  | { type: "external"; href: string }
  | { type: "internal"; href: string }
  | { type: "overlay"; overlay: "social" | "history" | "location" };

/** Foto que ilustra una tarjeta del menú desplegable */
export interface NavCardPhoto {
  /** Número del archivo: public/images/<restaurante>/<restaurante>-NN.jpg */
  file: number;
  /** Encuadre en la tarjeta (CSS object-position). Las fotos suelen tener el plato en la parte baja */
  position?: string;
  /** Encuadre distinto en móvil */
  positionMobile?: string;
}

/** Una foto de la galería de un restaurante */
export interface BrandPhoto {
  /** Número del archivo: public/images/<restaurante>/<restaurante>-NN.jpg */
  file: number;
  /** Descripción para accesibilidad (no se muestra sobre la foto) */
  alt: string;
  /** Encuadre al mostrarla recortada en 4:5 en las galerías (CSS object-position). Por defecto "center 60%" */
  focus?: string;
  /** Dimensiones en píxeles, si no mide 1200x1800 */
  size?: [width: number, height: number];
  /** false = no sale en el carrusel del home, solo en las galerías */
  carousel?: boolean;
}

export interface BrandLogo {
  /** Ruta del SVG en public/ (recortado al contorno del logo) */
  src: string;
  /** Proporciones del SVG (las del viewBox) */
  width: number;
  height: number;
}

export interface GalleryVideo {
  src: string;
  /** Imagen que se muestra antes de reproducir (el video solo se descarga al pulsar play) */
  poster: string;
  width: number;
  height: number;
  alt: string;
}

/** Lo que se escribe para dar de alta un restaurante (ver src/config/brands/) */
export interface BrandDefinition {
  /** Identificador: minúsculas y guiones. Es la carpeta de fotos y la ruta de su galería */
  id: string;
  name: string;
  /** Una línea para el carrusel del home y el modal de reservas, p. ej. "Hamburguesas artesanales" */
  shortDescription: string;
  /** Zona y ciudad, p. ej. "Normandía, Bogotá" */
  locationLabel: string;
  logo: BrandLogo;
  /** Enlace de VISTA del menú en Canva (no el de edición) */
  menuUrl: string;
  /** Mensaje que llega prellenado a WhatsApp al reservar */
  whatsappReserveText: string;
  /** Place ID de Google del local (de la herramienta "Place ID Finder") */
  googlePlaceId: string;
  coordinates: { latitude: number; longitude: number };
  instagramUrl: string;
  tiktokUrl: string;
  /** Opcional: si no existe, el botón de Facebook no se muestra */
  facebookUrl?: string;
  /** Opcional: historia del restaurante. Sin ella, la tarjeta Historia muestra un texto provisional */
  history?: {
    /** Frase corta que acompaña a la tarjeta Historia en móvil */
    tagline?: string;
    /** Texto que se muestra al abrir la tarjeta */
    text?: string;
  };
  /** Foto de cada tarjeta del menú desplegable */
  navCardPhotos: Record<BrandNavCardId, NavCardPhoto>;
  /** Todas las fotos del restaurante, en el orden en que salen en su galería */
  photos: BrandPhoto[];
  /** Opcional: video que va de primero en su galería y en la galería mezclada */
  video?: GalleryVideo;
}

/** Datos que se calculan solos a partir de la definición */
export interface DerivedBrandFields {
  googleMapsUrl: string;
  googleReviewsUrl: string;
  wazeUrl: string;
  navCards: BrandNavCard[];
}

/** Restaurante listo para usar en los componentes */
export type BrandConfig = BrandDefinition & DerivedBrandFields;

export interface GalleryPhoto {
  id: string;
  brandId: string;
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
  /** Encuadre del recorte 4:5 (solo fotos verticales) */
  focus: string;
}

export interface MarqueeGalleryItem {
  id: string;
  imageUrl: string;
  alt: string;
  hasInstagram: boolean;
  instagramUrl?: string;
  brandId: string;
}

/** Datos generales del sitio (metadatos y SEO) */
export interface SiteInfo {
  name: string;
  /** Dirección pública del sitio, sin barra final */
  url: string;
  title: string;
  description: string;
  keywords: string[];
  ogDescription: string;
  locale: string;
  themeColor: string;
}

export interface GroupInfo {
  /** Nombre en mayúsculas, p. ej. "GRUPO TTDS" */
  name: string;
  /** Nombre para textos corridos, p. ej. "Grupo TTDS" */
  displayName: string;
  /** Ciudad y país, para el pie de página */
  location: string;
  whatsappNumber: string;
  contactMessage: string;
  pqrsMessage: string;
  /** Logo del grupo: dos líneas de texto (palabra grande y subtítulo) */
  logo: { mark: string; subtitle: string };
}

export interface HeroConfig {
  /** Foto de fondo (siempre necesaria: es la imagen de respaldo y la portada del video) */
  imageUrl: string;
  imageAlt: string;
  /** Opcional: si se indica, el hero reproduce este video en bucle, sin sonido */
  videoUrl?: string;
}

export interface SpecialEventsConfig {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  imageUrl: string;
  imageAlt: string;
  /** Encuadre de la foto dentro del banner (CSS object-position) */
  imagePosition: string;
  whatsappMessage: string;
}
