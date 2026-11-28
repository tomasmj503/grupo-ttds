import React from "react";
import Image from "next/image";
import { BRANDS, type BrandKey } from "@/config/site";

/**
 * Logos oficiales de cada restaurante (public/logos/<restaurante>.svg).
 * Los SVG ya vienen recortados al contorno del logo.
 */
const LOGO_RATIO: Record<BrandKey, { width: number; height: number }> = {
  "tio-toro": { width: 1265, height: 394 },
  "dragon-soul": { width: 344, height: 165 },
};

// Cada contexto define el tamaño de cada logo. En el hero ambos tienen el mismo ancho.
const LOGO_SIZES = {
  hero: {
    "tio-toro": "w-[clamp(96px,31vw,116px)] sm:w-[184px] h-auto",
    "dragon-soul": "w-[clamp(96px,31vw,116px)] sm:w-[184px] h-auto",
  },
  footer: {
    "tio-toro": "w-[104px] sm:w-[132px] h-auto",
    "dragon-soul": "w-[104px] sm:w-[132px] h-auto",
  },
  modal: {
    "tio-toro": "w-[120px] sm:w-[150px] h-auto",
    "dragon-soul": "h-11 sm:h-12 w-auto",
  },
} satisfies Record<string, Record<BrandKey, string>>;

interface BrandWordmarkProps {
  brandId: BrandKey;
  size: keyof typeof LOGO_SIZES;
  className?: string;
}

export function BrandWordmark({ brandId, size, className = "" }: BrandWordmarkProps) {
  const ratio = LOGO_RATIO[brandId];

  return (
    <Image
      src={`/logos/${brandId}.svg`}
      alt={BRANDS[brandId].name}
      width={ratio.width}
      height={ratio.height}
      unoptimized
      className={`${LOGO_SIZES[size][brandId]} ${className}`}
    />
  );
}
