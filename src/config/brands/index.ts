import type { BrandConfig } from "../types";
import { tioToro } from "./tio-toro";
import { dragonSoul } from "./dragon-soul";

/**
 * Lista de restaurantes del grupo, en el orden en que aparecen en el sitio
 * (barra de navegación, hero, footer y reservas).
 * Para agregar uno: crear su archivo en esta carpeta y añadirlo aquí.
 */
export const BRAND_LIST = [tioToro, dragonSoul] as const;

/** Identificadores válidos de restaurante (se calculan solos a partir de BRAND_LIST) */
export type BrandKey = (typeof BRAND_LIST)[number]["id"];

export const BRAND_ORDER: BrandKey[] = BRAND_LIST.map((brand) => brand.id);

export const BRANDS = Object.fromEntries(
  BRAND_LIST.map((brand) => [brand.id, brand])
) as Record<BrandKey, BrandConfig>;

/** Busca un restaurante por su id (por ejemplo, el de la URL); undefined si no existe */
export function findBrand(id: string): BrandConfig | undefined {
  return (BRANDS as Record<string, BrandConfig | undefined>)[id];
}
