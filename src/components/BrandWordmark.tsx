import React from "react";
import Image from "next/image";
import { BRANDS, type BrandKey } from "@/config/site";

/**
 * Tamaño del logo según el lugar donde se muestra. Todos los restaurantes usan el mismo ancho
 * (así se ven parejos aunque sus logos tengan proporciones distintas); en el modal, además, se
 * limita la altura para que un logo muy alto no desequilibre la fila.
 */
const LOGO_SIZES = {
  hero: "w-[clamp(96px,31vw,116px)] sm:w-[184px] h-auto",
  footer: "w-[104px] sm:w-[132px] h-auto",
  modal: "w-[120px] sm:w-[150px] h-auto max-h-11 sm:max-h-12 object-contain object-left",
} satisfies Record<string, string>;

interface BrandWordmarkProps {
  brandId: BrandKey;
  size: keyof typeof LOGO_SIZES;
  className?: string;
}

/** Logo de un restaurante (SVG de public/logos, con las proporciones indicadas en su configuración) */
export function BrandWordmark({ brandId, size, className = "" }: BrandWordmarkProps) {
  const { name, logo } = BRANDS[brandId];

  return (
    <Image
      src={logo.src}
      alt={name}
      width={logo.width}
      height={logo.height}
      unoptimized
      className={`${LOGO_SIZES[size]} ${className}`}
    />
  );
}
