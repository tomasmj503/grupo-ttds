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

export interface BrandConfig {
  id: BrandKey;
  name: string;
  tagline: string;
  menuUrl: string;
  whatsappReserveText: string;
  googleMapsUrl: string;
  googleReviewsUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  story: BrandStory;
  cardImages: string[];
  galleryImages: string[];
}

export interface MarqueeGalleryItem {
  id: string;
  imageUrl: string;
  alt: string;
  hasInstagram: boolean;
  instagramUrl?: string;
  caption: string;
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
}

export const GROUP_INFO: GroupInfo = {
  name: "GRUPO TTDS",
  whatsappNumber: "573115329393",
  contactMessage: "Hola Grupo TTDS, quisiera solicitar información.",
  pqrsMessage: "Hola Grupo TTDS, deseo radicar una PQRS.",
};

export const BRANDS: Record<BrandKey, BrandConfig> = {
  "tio-toro": {
    id: "tio-toro",
    name: "Tío Toro",
    tagline: "Hamburguesas Artesanales & Brasa · Normandía",
    menuUrl: "https://canva.link/0k5iu4p18di948h",
    whatsappReserveText: "Hola, deseo hacer una reservación para Tío Toro",
    googleMapsUrl: "https://maps.google.com/?q=Tio+Toro+Burger+Normandia+Bogota",
    googleReviewsUrl: "https://maps.google.com/?q=Tio+Toro+Burger+Normandia+Bogota",
    instagramUrl: "https://instagram.com",
    tiktokUrl: "https://tiktok.com",
    story: {
      title: "El Origen de Tío Toro",
      paragraphs: [
        "Nacido en el corazón de Normandía, Tío Toro redefine la hamburguesa artesanal bajo el calor de la brasa y cortes seleccionados.",
        "Un espacio pensado para los amantes del fuego lento, recetas de autor y una atmósfera nocturna con carácter propio.",
      ],
    },
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
    menuUrl: "https://canva.link/e2ccz4no41wols5",
    whatsappReserveText: "Hola, deseo hacer una reservación para Dragon Soul",
    googleMapsUrl: "https://maps.google.com/?q=Dragon+Soul+Restaurante",
    googleReviewsUrl: "https://maps.google.com/?q=Dragon+Soul+Restaurante",
    instagramUrl: "https://instagram.com",
    tiktokUrl: "https://tiktok.com",
    story: {
      title: "El Espíritu de Dragon Soul",
      paragraphs: [
        "Dragon Soul fusiona la precisión milenaria del sushi bar con la energía vibrante de un lounge nocturno contemporáneo.",
        "Sabores asiáticos de autor, mixología exótica y una atmósfera envolvente diseñada para despertar los sentidos.",
      ],
    },
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

/**
 * Array de 10 fotografías HD con regla estricta:
 * Índices 1, 3, 5, 7, 9 tienen hasInstagram: true
 * Índices 0, 2, 4, 6, 8 tienen hasInstagram: false (abren Lightbox)
 */
export const HOME_MARQUEE_GALLERY: MarqueeGalleryItem[] = [
  {
    id: "mg-0",
    imageUrl:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=85",
    alt: "Hamburguesa Gourmet a la Brasa - Tío Toro",
    hasInstagram: false,
    caption: "Cortes seleccionados a la brasa con queso fundido y pan brioche artesanal.",
    brandId: "tio-toro",
  },
  {
    id: "mg-1",
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=85",
    alt: "Especialidad de la Casa - Tío Toro",
    hasInstagram: true,
    instagramUrl: BRANDS["tio-toro"].instagramUrl,
    caption: "Nuestra creación insigne en Normandía. Síguenos en @TioToro",
    brandId: "tio-toro",
  },
  {
    id: "mg-2",
    imageUrl:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=85",
    alt: "Omakase Nigiri Selection - Dragon Soul",
    hasInstagram: false,
    caption: "Selección Omakase con pesca fresca y trufa negra curada.",
    brandId: "dragon-soul",
  },
  {
    id: "mg-3",
    imageUrl:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1000&q=85",
    alt: "Rolls de Autor y Presentación Oriental - Dragon Soul",
    hasInstagram: true,
    instagramUrl: BRANDS["dragon-soul"].instagramUrl,
    caption: "Experiencia visual y sensorial milenaria en @DragonSoul",
    brandId: "dragon-soul",
  },
  {
    id: "mg-4",
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=85",
    alt: "Mixología de Autor Ahumada - Grupo TTDS",
    hasInstagram: false,
    caption: "Coctelería de autor con notas cítricas, ahumadas y especias exóticas.",
  },
  {
    id: "mg-5",
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85",
    alt: "Doble Carne Brasa Angus - Tío Toro",
    hasInstagram: true,
    instagramUrl: BRANDS["tio-toro"].instagramUrl,
    caption: "Carne Angus madurada y ahumada al quebracho blanco en @TioToro",
    brandId: "tio-toro",
  },
  {
    id: "mg-6",
    imageUrl:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=85",
    alt: "Gyozas de Wagyu y Trufa - Dragon Soul",
    hasInstagram: false,
    caption: "Gyozas artesanales selladas en wok con salsa ponzu de la casa.",
    brandId: "dragon-soul",
  },
  {
    id: "mg-7",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
    alt: "Ambiente Nocturno y Luz Íntima - Dragon Soul",
    hasInstagram: true,
    instagramUrl: BRANDS["dragon-soul"].instagramUrl,
    caption: "Atmósfera envolvente, beats nocturnos y mixología en @DragonSoul",
    brandId: "dragon-soul",
  },
  {
    id: "mg-8",
    imageUrl:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=85",
    alt: "Coctel Champagne & Esencias - Grupo TTDS",
    hasInstagram: false,
    caption: "Cócteles de autor diseñados para elevar la experiencia nocturna.",
  },
  {
    id: "mg-9",
    imageUrl:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=85",
    alt: "Sashimi Deluxe y Cítricos Asiáticos - Dragon Soul",
    hasInstagram: true,
    instagramUrl: BRANDS["dragon-soul"].instagramUrl,
    caption: "Cortes de precisión y armonía estética en @DragonSoul",
    brandId: "dragon-soul",
  },
];

/**
 * Generador estándar de URLs de WhatsApp con mensaje prellenado
 */
export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

