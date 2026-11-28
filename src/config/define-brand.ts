import type {
  BrandConfig,
  BrandDefinition,
  BrandNavCard,
  BrandNavCardId,
} from "./types";
import {
  getBrandPhoto,
  googleMapsPlaceUrl,
  googleReviewsPageUrl,
  wazeNavigateUrl,
} from "./helpers";

/** Orden en que aparecen las tarjetas en el menú desplegable */
const NAV_CARD_ORDER: BrandNavCardId[] = [
  "menu",
  "galeria",
  "reserva",
  "redes",
  "historia",
  "ubicacion",
];

const NAV_CARD_TITLES: Record<BrandNavCardId, string> = {
  menu: "Menú",
  galeria: "Galería",
  reserva: "Reserva",
  redes: "Redes sociales",
  historia: "Historia",
  ubicacion: "Ubicación",
};

/** Textos de cada tarjeta (iguales para todos los restaurantes salvo los que mencionan su nombre) */
function navCardCopy(id: BrandNavCardId, def: BrandDefinition) {
  switch (id) {
    case "menu":
      return {
        desktop: { subtitle: "Explora nuestra carta", cta: "Ver más" },
        mobile: { subtitle: "Explora nuestra carta", cta: "Ver menú" },
      };
    case "galeria":
      return {
        desktop: { subtitle: "Mira el ambiente", cta: "Ver más" },
        mobile: { subtitle: "El sabor en imágenes", cta: "Explorar" },
      };
    case "reserva":
      return {
        desktop: { subtitle: "Asegura tu lugar", cta: "Reservar" },
        mobile: { subtitle: "Tu mesa, sin esperas", cta: "Reservar" },
      };
    case "redes":
      return {
        desktop: { subtitle: "Conéctate con nosotros", cta: "Seguir" },
        mobile: { subtitle: `Lo que pasa en ${def.name}`, cta: "Descubrir" },
      };
    case "historia":
      return {
        desktop: { subtitle: "Conoce nuestro origen", cta: "Descubrir" },
        mobile: {
          subtitle: def.history?.tagline ?? "Conoce nuestro origen",
          cta: "Nuestra historia",
        },
      };
    case "ubicacion":
      return {
        desktop: { subtitle: "Cómo llegar", cta: "Ver mapa" },
        mobile: { subtitle: "Llega fácil, sin perderte", cta: "Cómo llegar" },
      };
  }
}

function buildNavCards(def: BrandDefinition): BrandNavCard[] {
  return NAV_CARD_ORDER.map((id) => {
    const photo = def.navCardPhotos[id];
    return {
      id,
      title: NAV_CARD_TITLES[id],
      imageUrl: getBrandPhoto(def.id, photo.file),
      imagePosition: photo.position,
      imagePositionMobile: photo.positionMobile,
      ...navCardCopy(id, def),
    };
  });
}

/**
 * Convierte la definición de un restaurante en el objeto que usan los componentes:
 * calcula los enlaces de Maps, reseñas y Waze y arma las tarjetas del menú desplegable.
 * Conserva el `id` literal para que TypeScript conozca la lista de restaurantes.
 */
export function defineBrand<const Id extends string>(
  def: BrandDefinition & { id: Id }
): BrandConfig & { id: Id } {
  return {
    ...def,
    googleMapsUrl: googleMapsPlaceUrl(def.googlePlaceId),
    googleReviewsUrl: googleReviewsPageUrl(def.googlePlaceId),
    wazeUrl: wazeNavigateUrl(def.coordinates.latitude, def.coordinates.longitude),
    navCards: buildNavCards(def),
  };
}
