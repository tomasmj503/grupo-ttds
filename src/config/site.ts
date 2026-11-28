/**
 * Configuración del sitio: punto de entrada de todos los datos.
 *
 * - Datos generales del grupo y de la página de inicio: este archivo.
 * - Cada restaurante (enlaces, redes, fotos, video): src/config/brands/<id>.ts
 * - Lista y orden de los restaurantes: src/config/brands/index.ts
 * - Galerías y carrusel (se calculan solos a partir de las fotos): src/config/gallery.ts
 *
 * Los componentes importan siempre desde "@/config/site".
 */

import type {
  BrandConfig,
  BrandNavCardAction,
  BrandNavCardId,
  GroupInfo,
  HeroConfig,
  SiteInfo,
  SpecialEventsConfig,
} from "./types";
import { getBrandGalleryPath, getWhatsAppUrl } from "./helpers";

export * from "./types";
export * from "./helpers";
export * from "./brands";
export * from "./gallery";

/** Metadatos del sitio (título, descripción y vista previa al compartir el enlace) */
export const SITE: SiteInfo = {
  name: "GRUPO TTDS",
  url: "https://grupottds.com",
  title: "GRUPO TTDS | Hospitalidad Nocturna & Alta Gastronomía",
  description:
    "Grupo TTDS reúne los conceptos gastronómicos y nocturnos más cautivadores: Tío Toro y Dragon Soul. Cocina de autor, mixología y atmósfera editorial en Bogotá.",
  keywords: [
    "Grupo TTDS",
    "Tío Toro",
    "Dragon Soul",
    "Normandía Bogotá",
    "Restaurantes de lujo Bogotá",
    "Hamburguesas Artesanales",
    "Sushi Bar",
    "Lounge Nocturno",
  ],
  ogDescription:
    "Tío Toro & Dragon Soul. Conceptos de alta cocina y vida nocturna con estética editorial.",
  locale: "es_CO",
  themeColor: "#050505",
};

export const GROUP_INFO: GroupInfo = {
  name: "GRUPO TTDS",
  displayName: "Grupo TTDS",
  location: "Bogotá, Colombia",
  whatsappNumber: "573115329393",
  contactMessage: "Hola Grupo TTDS, quisiera solicitar información.",
  pqrsMessage: "Hola Grupo TTDS, deseo radicar una PQRS.",
  logo: { mark: "TTDS", subtitle: "GRUPO" },
};

/** Fondo del hero del inicio. Con `videoUrl` reproduce un video en bucle en lugar de la foto. */
export const HERO: HeroConfig = {
  // Foto de stock provisional: reemplazar por una propia (en public/) o por un video
  imageUrl:
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1920&q=85",
  imageAlt:
    "Gastronomía asiática nocturna — bowl de sopa de fideos (ramen) en ambiente íntimo",
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
