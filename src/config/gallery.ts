import type {
  BrandConfig,
  BrandPhoto,
  GalleryPhoto,
  GalleryVideo,
  MarqueeGalleryItem,
} from "./types";
import { BRAND_LIST, BRANDS, type BrandKey } from "./brands";
import { getBrandPhoto } from "./helpers";

const DEFAULT_PHOTO_FOCUS = "center 60%";
const DEFAULT_PHOTO_SIZE: [number, number] = [1200, 1800];

function toGalleryPhoto(brand: BrandConfig, photo: BrandPhoto): GalleryPhoto {
  const [width, height] = photo.size ?? DEFAULT_PHOTO_SIZE;
  return {
    id: `${brand.id}-${photo.file}`,
    brandId: brand.id,
    imageUrl: getBrandPhoto(brand.id, photo.file),
    alt: photo.alt,
    width,
    height,
    focus: photo.focus ?? DEFAULT_PHOTO_FOCUS,
  };
}

/** Galería completa de un restaurante (página /<restaurante>/galeria) */
export function getBrandGallery(brandId: BrandKey): GalleryPhoto[] {
  const brand = BRANDS[brandId];
  return brand.photos.map((photo) => toGalleryPhoto(brand, photo));
}

/**
 * Mezcla varias listas repartiendo de forma pareja los elementos de cada una:
 * la lista más corta se coloca primero, a intervalos regulares; la siguiente ocupa los
 * huecos que queden, también espaciada, y la más larga rellena el resto.
 * Con dos restaurantes, los de uno quedan repartidos entre los del otro sin juntarse.
 * El orden dentro de cada lista se conserva.
 */
function interleave<T>(groups: T[][]): T[] {
  const total = groups.reduce((sum, group) => sum + group.length, 0);
  const slots: (T | undefined)[] = new Array(total).fill(undefined);
  const freeSlots = Array.from({ length: total }, (_, index) => index);

  const bySize = groups.filter((group) => group.length > 0).sort((a, b) => a.length - b.length);

  bySize.forEach((group, position) => {
    if (position === bySize.length - 1) {
      // La lista más larga rellena lo que quede, en orden
      group.forEach((item, index) => {
        slots[freeSlots[index]] = item;
      });
      return;
    }

    const used = new Set<number>();
    group.forEach((item, index) => {
      const freeIndex = Math.round((index * freeSlots.length) / group.length);
      slots[freeSlots[freeIndex]] = item;
      used.add(freeIndex);
    });
    // Quitar de la lista de huecos los que se acaban de ocupar
    for (let i = freeSlots.length - 1; i >= 0; i--) {
      if (used.has(i)) freeSlots.splice(i, 1);
    }
  });

  return slots as T[];
}

/** Fotos del carrusel del home: mezcla de todos los restaurantes (sin las marcadas carousel: false) */
const marqueePhotos: GalleryPhoto[] = interleave(
  BRAND_LIST.map((brand) =>
    brand.photos
      .filter((photo) => photo.carousel !== false)
      .map((photo) => toGalleryPhoto(brand, photo))
  )
);

/**
 * Galería del carrusel del home.
 * Regla: las posiciones impares muestran el ícono de Instagram y abren el
 * Instagram del restaurante de esa foto; las pares abren el visor.
 */
export const HOME_MARQUEE_GALLERY: MarqueeGalleryItem[] = marqueePhotos.map((photo, index) => {
  const hasInstagram = index % 2 === 1;
  return {
    id: `mg-${index}`,
    imageUrl: photo.imageUrl,
    alt: photo.alt,
    hasInstagram,
    instagramUrl: hasInstagram ? BRANDS[photo.brandId as BrandKey].instagramUrl : undefined,
    brandId: photo.brandId,
  };
});

/**
 * Galería que mezcla todos los restaurantes (página /galeria): las fotos del carrusel
 * y, al final, las que no van en el carrusel.
 */
export const MIXED_GALLERY: GalleryPhoto[] = [
  ...marqueePhotos,
  ...BRAND_LIST.flatMap((brand) =>
    brand.photos.filter((photo) => photo.carousel === false).map((photo) => toGalleryPhoto(brand, photo))
  ),
];

/** Videos de los restaurantes, en el orden del sitio: van de primeros en la galería mezclada */
export const MIXED_GALLERY_VIDEOS: GalleryVideo[] = BRAND_LIST.flatMap((brand) =>
  brand.video ? [brand.video] : []
);
