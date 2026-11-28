/**
 * Configuración centralizada del sitio Grupo TTDS
 * Todos los textos, enlaces, números de WhatsApp y recursos multimedia
 * se gestionan en este archivo para garantizar una arquitectura ultra limpia y reutilizable.
 */

export interface BrandStory {
  title: string;
  paragraphs: string[];
}

export type BrandKey = "tio-toro" | "dragon-soul";

/** Tarjetas del menú desplegable de cada restaurante en la Navbar */
export type BrandNavCardId = "menu" | "galeria" | "reserva" | "redes" | "historia" | "ubicacion";

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

export interface BrandConfig {
  id: BrandKey;
  name: string;
  tagline: string;
  menuUrl: string;
  whatsappReserveText: string;
  googleMapsUrl: string;
  googleReviewsUrl: string;
  /** Inicia la navegación en Waze hacia las coordenadas del local */
  wazeUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  /** Opcional: si no existe, el botón de Facebook no se muestra */
  facebookUrl?: string;
  story: BrandStory;
  navCards: BrandNavCard[];
  cardImages: string[];
  galleryImages: string[];
}

export interface MarqueeGalleryItem {
  id: string;
  imageUrl: string;
  alt: string;
  hasInstagram: boolean;
  instagramUrl?: string;
  brandId?: BrandKey;
}

export interface HeroVideoConfig {
  videoUrl: string;
  posterUrl: string;
}

export interface GroupInfo {
  name: string;
  whatsappNumber: string;
  contactMessage: string;
  pqrsMessage: string;
  termsUrl: string;
  privacyUrl: string;
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

export const GROUP_INFO: GroupInfo = {
  name: "GRUPO TTDS",
  whatsappNumber: "573115329393",
  contactMessage: "Hola Grupo TTDS, quisiera solicitar información.",
  pqrsMessage: "Hola Grupo TTDS, deseo radicar una PQRS.",
  termsUrl: "#terminos-y-condiciones",
  privacyUrl: "#politica-de-privacidad",
};

export const SPECIAL_EVENTS: SpecialEventsConfig = {
  eyebrow: "Eventos Privados · Grupos",
  title: "Eventos Especiales",
  description:
    "Celebraciones privadas, cenas corporativas y noches a la medida en Tío Toro y Dragon Soul.",
  ctaLabel: "Cotizar evento",
  // Foto propia: lámparas de fibra del salón de Dragon Soul. Ideal: reemplazar por una de un evento real.
  imageUrl: "/images/eventos/eventos-lamparas.jpg",
  imageAlt: "Lámparas de fibra colgando en el salón de Dragon Soul",
  imagePosition: "center 0%",
  whatsappMessage:
    "Hola Grupo TTDS, quisiera cotizar y consultar disponibilidad para un evento especial en Tío Toro / Dragon Soul.",
};

/**
 * Enlaces de ubicación a partir del Place ID de Google y las coordenadas del local.
 * - Maps: abre la ficha exacta del local
 * - Reseñas: abre directamente la lista de opiniones de Google
 * - Waze: inicia la navegación a las coordenadas
 */
function googleMapsPlaceUrl(placeId: string): string {
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}

function googleReviewsPageUrl(placeId: string): string {
  return `https://search.google.com/local/reviews?placeid=${placeId}`;
}

function wazeNavigateUrl(latitude: number, longitude: number): string {
  return `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes&zoom=17`;
}

const TIO_TORO_PLACE_ID = "ChIJDSp8XjqbP44RBXHQ7XVjoSQ";
const DRAGON_SOUL_PLACE_ID = "ChIJPZgtQgCbP44RbTocJKH2akk";

export const BRANDS: Record<BrandKey, BrandConfig> = {
  "tio-toro": {
    id: "tio-toro",
    name: "Tío Toro",
    tagline: "Hamburguesas Artesanales & Brasa · Normandía",
    // Enlace de VISTA de Canva (los canva.link cortos redirigen al editor)
    menuUrl: "https://www.canva.com/design/DAETKN_Z2zg/oi4-ki_Y7c_P4qmPUksl0A/view",
    whatsappReserveText: "Hola, deseo hacer una reservación para Tío Toro",
    googleMapsUrl: googleMapsPlaceUrl(TIO_TORO_PLACE_ID),
    googleReviewsUrl: googleReviewsPageUrl(TIO_TORO_PLACE_ID),
    wazeUrl: wazeNavigateUrl(4.6696475, -74.1049872),
    instagramUrl: "https://www.instagram.com/tiotoroburger/",
    tiktokUrl: "https://www.tiktok.com/@tiotoroburger",
    facebookUrl: "https://www.facebook.com/profile.php?id=100063583748803",
    story: {
      title: "El Origen de Tío Toro",
      paragraphs: [
        "Nacido en el corazón de Normandía, Tío Toro redefine la hamburguesa artesanal bajo el calor de la brasa y cortes seleccionados.",
        "Un espacio pensado para los amantes del fuego lento, recetas de autor y una atmósfera nocturna con carácter propio.",
      ],
    },
    navCards: [
      {
        id: "menu",
        title: "Menú",
        imageUrl: getBrandPhoto("tio-toro", 2),
        imagePosition: "center 100%",
        desktop: { subtitle: "Explora nuestra carta", cta: "Ver más" },
        mobile: { subtitle: "Explora nuestra carta", cta: "Ver menú" },
      },
      {
        id: "galeria",
        title: "Galería",
        imageUrl: getBrandPhoto("tio-toro", 6),
        imagePosition: "center 100%",
        desktop: { subtitle: "Mira el ambiente", cta: "Ver más" },
        mobile: { subtitle: "El sabor en imágenes", cta: "Explorar" },
      },
      {
        id: "reserva",
        title: "Reserva",
        imageUrl: getBrandPhoto("tio-toro", 4),
        imagePosition: "center 100%",
        desktop: { subtitle: "Asegura tu lugar", cta: "Reservar" },
        mobile: { subtitle: "Tu mesa, sin esperas", cta: "Reservar" },
      },
      {
        id: "redes",
        title: "Redes sociales",
        imageUrl: getBrandPhoto("tio-toro", 5),
        imagePosition: "center 100%",
        desktop: { subtitle: "Conéctate con nosotros", cta: "Seguir" },
        mobile: { subtitle: "Lo que pasa en Tío Toro", cta: "Descubrir" },
      },
      {
        id: "historia",
        title: "Historia",
        imageUrl: getBrandPhoto("tio-toro", 3),
        imagePosition: "center 100%",
        desktop: { subtitle: "Conoce nuestro origen", cta: "Descubrir" },
        mobile: { subtitle: "Nacimos para la brasa", cta: "Nuestra historia" },
      },
      {
        id: "ubicacion",
        title: "Ubicación",
        imageUrl: getBrandPhoto("tio-toro", 1),
        imagePosition: "center 100%",
        desktop: { subtitle: "Cómo llegar", cta: "Ver mapa" },
        mobile: { subtitle: "Llega fácil, sin perderte", cta: "Cómo llegar" },
      },
    ],
    cardImages: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1200&q=80",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1400&q=85",
    ],
  },
  "dragon-soul": {
    id: "dragon-soul",
    name: "Dragon Soul",
    tagline: "Cocina Asiática de Autor · Sushi Bar & Lounge",
    // Enlace de VISTA de Canva (los canva.link cortos redirigen al editor)
    menuUrl: "https://www.canva.com/design/DAGsIjI-nY8/zWSS-138yvWEIDUidsKRUA/view#2",
    whatsappReserveText: "Hola, deseo hacer una reservación para Dragon Soul",
    googleMapsUrl: googleMapsPlaceUrl(DRAGON_SOUL_PLACE_ID),
    googleReviewsUrl: googleReviewsPageUrl(DRAGON_SOUL_PLACE_ID),
    wazeUrl: wazeNavigateUrl(4.6694404, -74.104773),
    instagramUrl: "https://www.instagram.com/dragonsoulco/",
    tiktokUrl: "https://www.tiktok.com/@dragonsoulco",
    // facebookUrl: pendiente. Al agregarlo aparece automáticamente en la tarjeta de Redes sociales.
    story: {
      title: "El Espíritu de Dragon Soul",
      paragraphs: [
        "Dragon Soul fusiona la precisión milenaria del sushi bar con la energía vibrante de un lounge nocturno contemporáneo.",
        "Sabores asiáticos de autor, mixología exótica y una atmósfera envolvente diseñada para despertar los sentidos.",
      ],
    },
    navCards: [
      {
        id: "menu",
        title: "Menú",
        imageUrl: getBrandPhoto("dragon-soul", 4),
        imagePosition: "center 60%",
        desktop: { subtitle: "Explora nuestra carta", cta: "Ver más" },
        mobile: { subtitle: "Explora nuestra carta", cta: "Ver menú" },
      },
      {
        id: "galeria",
        title: "Galería",
        imageUrl: getBrandPhoto("dragon-soul", 3),
        imagePosition: "center 30%",
        desktop: { subtitle: "Mira el ambiente", cta: "Ver más" },
        mobile: { subtitle: "El sabor en imágenes", cta: "Explorar" },
      },
      {
        id: "reserva",
        title: "Reserva",
        imageUrl: getBrandPhoto("dragon-soul", 17),
        imagePosition: "center 15%",
        desktop: { subtitle: "Asegura tu lugar", cta: "Reservar" },
        mobile: { subtitle: "Tu mesa, sin esperas", cta: "Reservar" },
      },
      {
        id: "redes",
        title: "Redes sociales",
        imageUrl: getBrandPhoto("dragon-soul", 15),
        imagePosition: "center 40%",
        desktop: { subtitle: "Conéctate con nosotros", cta: "Seguir" },
        mobile: { subtitle: "Lo que pasa en Dragon Soul", cta: "Descubrir" },
      },
      {
        id: "historia",
        title: "Historia",
        imageUrl: getBrandPhoto("dragon-soul", 18),
        imagePosition: "center 55%",
        desktop: { subtitle: "Conoce nuestro origen", cta: "Descubrir" },
        mobile: { subtitle: "El alma del dragón", cta: "Nuestra historia" },
      },
      {
        id: "ubicacion",
        title: "Ubicación",
        imageUrl: getBrandPhoto("dragon-soul", 13),
        imagePosition: "center 50%",
        desktop: { subtitle: "Cómo llegar", cta: "Ver mapa" },
        mobile: { subtitle: "Llega fácil, sin perderte", cta: "Cómo llegar" },
      },
    ],
    cardImages: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1400&q=85",
    ],
  },
};

export const HOME_HERO_VIDEO: HeroVideoConfig = {
  // Video HD de ambiente nocturno, mixología y hospitalidad de lujo
  videoUrl:
    "https://cdn.coverr.co/videos/coverr-bartender-pouring-a-drink-5129/1080p.mp4",
  posterUrl:
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=80",
};

/** Ruta de una foto local: /images/<restaurante>/<restaurante>-NN.jpg */
export function getBrandPhoto(brandId: BrandKey, photo: number): string {
  return `/images/${brandId}/${brandId}-${String(photo).padStart(2, "0")}.jpg`;
}

/** Descripción (alt) de cada foto: public/images/<restaurante>/<restaurante>-NN.jpg */
const PHOTO_ALTS: Record<BrandKey, Record<number, string>> = {
  "tio-toro": {
    1: "Hamburguesa doble con tocineta y queso - Tío Toro",
    2: "Hamburguesa doble con queso cheddar fundido - Tío Toro",
    3: "Hamburguesa con queso en ambiente nocturno - Tío Toro",
    4: "Armando una hamburguesa con tocineta y queso - Tío Toro",
    5: "Hamburguesa con huevo y queso - Tío Toro",
    6: "Hamburguesa con huevo servida en plato esmaltado - Tío Toro",
  },
  "dragon-soul": {
    1: "Chef cortando un roll de sushi - Dragon Soul",
    2: "Bowl de ramen en tazón oscuro - Dragon Soul",
    3: "Letrero de neón del dragón - Dragon Soul",
    4: "Rolls de sushi con topping dorado y ajonjolí negro - Dragon Soul",
    5: "Preparación de rolls fritos con palillos - Dragon Soul",
    6: "Corte de un roll frito - Dragon Soul",
    7: "Rolls con aguacate y topping cremoso - Dragon Soul",
    8: "Ramen con carne, huevo y cebollín - Dragon Soul",
    9: "Rolls y fritos sobre pizarra frente a un mural de pagoda - Dragon Soul",
    10: "Rolls y fritos sobre pizarra - Dragon Soul",
    11: "Rolls dorados sobre plato blanco - Dragon Soul",
    12: "Rolls fritos sobre plato alargado - Dragon Soul",
    13: "Barra de Dragon Soul con copas y utensilios - Dragon Soul",
    14: "Chef con delantal naranja sirviendo sushi - Dragon Soul",
    15: "Chef sosteniendo un roll con palillos - Dragon Soul",
    16: "Letrero de neón Spicy Ramen - Dragon Soul",
    17: "Lámparas colgantes en el ambiente de Dragon Soul",
    18: "Estatua de Buda en la decoración de Dragon Soul",
  },
};

/** Dimensiones de las fotos que no son 2:3 (el resto mide 1200x1800) */
const PHOTO_SIZES: Partial<Record<BrandKey, Record<number, [number, number]>>> = {
  "dragon-soul": {
    7: [1012, 1800],
    8: [1012, 1800],
    9: [1800, 1013],
    10: [1012, 1800],
    11: [1012, 1800],
  },
};

/**
 * Encuadre de cada foto al mostrarla recortada en 4:5 en las galerías (CSS object-position).
 * Las fotos verticales miden 2:3; Tao las muestra en 4:5, más cortas. El recorte es solo visual:
 * el visor a pantalla completa muestra la foto entera.
 */
const DEFAULT_PHOTO_FOCUS = "center 60%";
const PHOTO_FOCUS: Record<BrandKey, Record<number, string>> = {
  "tio-toro": { 1: "center 90%", 2: "center 90%", 3: "center 90%", 4: "center 90%", 5: "center 90%", 6: "center 90%" },
  "dragon-soul": {
    1: "center 40%",
    2: "center 75%",
    3: "center 35%",
    4: "center 60%",
    5: "center 60%",
    6: "center 55%",
    7: "center 90%",
    8: "center 55%",
    10: "center 85%",
    11: "center 85%",
    12: "center 50%",
    13: "center 40%",
    14: "center 45%",
    15: "center 62%",
    16: "center 55%",
    17: "center 20%",
    18: "center 60%",
  },
};

export interface GalleryPhoto {
  id: string;
  brandId: BrandKey;
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
  /** Encuadre del recorte 4:5 (solo fotos verticales) */
  focus: string;
}

function buildGalleryPhoto(brandId: BrandKey, photo: number): GalleryPhoto {
  const [width, height] = PHOTO_SIZES[brandId]?.[photo] ?? [1200, 1800];
  return {
    id: `${brandId}-${photo}`,
    brandId,
    imageUrl: getBrandPhoto(brandId, photo),
    alt: PHOTO_ALTS[brandId][photo],
    width,
    height,
    focus: PHOTO_FOCUS[brandId][photo] ?? DEFAULT_PHOTO_FOCUS,
  };
}

/**
 * Orden del carrusel del home: mezcla de los dos restaurantes, con Tío Toro
 * repartido entre las fotos de Dragon Soul (nunca dos de Tío Toro seguidas,
 * tampoco al dar la vuelta). Para reordenar, mover las líneas.
 * dragon-soul-09 (horizontal) y dragon-soul-13 (cocina) no van en el carrusel,
 * pero sí en las galerías.
 */
const MARQUEE_PHOTOS: { brandId: BrandKey; photo: number }[] = [
  { brandId: "tio-toro", photo: 1 },
  { brandId: "dragon-soul", photo: 4 },
  { brandId: "dragon-soul", photo: 3 },
  { brandId: "dragon-soul", photo: 2 },
  { brandId: "tio-toro", photo: 2 },
  { brandId: "dragon-soul", photo: 12 },
  { brandId: "dragon-soul", photo: 16 },
  { brandId: "tio-toro", photo: 3 },
  { brandId: "dragon-soul", photo: 7 },
  { brandId: "dragon-soul", photo: 1 },
  { brandId: "dragon-soul", photo: 17 },
  { brandId: "tio-toro", photo: 4 },
  { brandId: "dragon-soul", photo: 8 },
  { brandId: "dragon-soul", photo: 15 },
  { brandId: "dragon-soul", photo: 14 },
  { brandId: "tio-toro", photo: 5 },
  { brandId: "dragon-soul", photo: 18 },
  { brandId: "dragon-soul", photo: 10 },
  { brandId: "tio-toro", photo: 6 },
  { brandId: "dragon-soul", photo: 11 },
  { brandId: "dragon-soul", photo: 5 },
  { brandId: "dragon-soul", photo: 6 },
];

/** Orden de las fotos en la galería propia de cada restaurante (todas las que hay) */
const BRAND_GALLERY_ORDER: Record<BrandKey, number[]> = {
  "tio-toro": [1, 2, 3, 4, 5, 6],
  "dragon-soul": [4, 3, 2, 12, 16, 7, 1, 17, 13, 8, 15, 14, 18, 10, 9, 11, 5, 6],
};

/** Galería completa de un restaurante (página /<restaurante>/galeria) */
export function getBrandGallery(brandId: BrandKey): GalleryPhoto[] {
  return BRAND_GALLERY_ORDER[brandId].map((photo) => buildGalleryPhoto(brandId, photo));
}

/** Galería que mezcla los dos restaurantes (página /galeria): el orden del carrusel más las fotos extra */
export const MIXED_GALLERY: GalleryPhoto[] = [
  ...MARQUEE_PHOTOS.map(({ brandId, photo }) => buildGalleryPhoto(brandId, photo)),
  buildGalleryPhoto("dragon-soul", 13),
  buildGalleryPhoto("dragon-soul", 9),
];

export interface GalleryVideo {
  src: string;
  /** Imagen que se muestra antes de reproducir (el video solo se descarga al pulsar play) */
  poster: string;
  width: number;
  height: number;
  alt: string;
}

/** Video de Tío Toro: aparece de primero en su galería y en la galería mezclada */
export const TIO_TORO_VIDEO: GalleryVideo = {
  src: "/videos/tio-toro-video.mp4",
  poster: "/videos/tio-toro-video-poster.jpg",
  width: 720,
  height: 1280,
  alt: "Video: así se arma una hamburguesa en Tío Toro",
};

/** Video propio de la galería de cada restaurante (si lo tiene) */
export function getBrandGalleryVideo(brandId: BrandKey): GalleryVideo | undefined {
  return brandId === "tio-toro" ? TIO_TORO_VIDEO : undefined;
}

/** Ruta de la galería propia de un restaurante */
export function getBrandGalleryPath(brandId: BrandKey): string {
  return `/${brandId}/galeria`;
}

/**
 * Galería del carrusel del home.
 * Regla: las posiciones impares muestran el ícono de Instagram y abren el
 * Instagram del restaurante de esa foto; las pares abren el visor Lightbox.
 */
export const HOME_MARQUEE_GALLERY: MarqueeGalleryItem[] = MARQUEE_PHOTOS.map(
  ({ brandId, photo }, index) => {
    const hasInstagram = index % 2 === 1;
    return {
      id: `mg-${index}`,
      imageUrl: getBrandPhoto(brandId, photo),
      alt: PHOTO_ALTS[brandId][photo],
      hasInstagram,
      instagramUrl: hasInstagram ? BRANDS[brandId].instagramUrl : undefined,
      brandId,
    };
  }
);

/**
 * Generador estándar de URLs de WhatsApp con mensaje prellenado
 */
export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Decide a dónde lleva cada tarjeta del menú desplegable de un restaurante.
 * Para cambiar un destino, se edita aquí; Navbar no necesita tocarse.
 */
export function getBrandNavCardAction(
  brand: BrandConfig,
  cardId: BrandNavCardId
): BrandNavCardAction {
  switch (cardId) {
    case "menu":
      return { type: "external", href: brand.menuUrl };
    case "reserva":
      return {
        type: "external",
        href: getWhatsAppUrl(GROUP_INFO.whatsappNumber, brand.whatsappReserveText),
      };
    case "galeria":
      return { type: "internal", href: getBrandGalleryPath(brand.id) };
    case "redes":
      return { type: "overlay", overlay: "social" };
    case "historia":
      return { type: "overlay", overlay: "history" };
    case "ubicacion":
      return { type: "overlay", overlay: "location" };
  }
}

