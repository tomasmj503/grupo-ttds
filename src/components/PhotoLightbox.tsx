"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxPhoto {
  imageUrl: string;
  alt: string;
}

interface PhotoLightboxProps {
  photos: LightboxPhoto[];
  /** Foto abierta; null = visor cerrado */
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

/**
 * Visor de fotografías a pantalla completa, compartido por el carrusel del home
 * y las páginas de galería. Navegación con flechas, teclado (← → Esc) y bloqueo de scroll.
 */
export function PhotoLightbox({ photos, index, onIndexChange }: PhotoLightboxProps) {
  const total = photos.length;
  const isOpen = index !== null && total > 0;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onIndexChange(null);
      if (e.key === "ArrowLeft") onIndexChange(((index as number) - 1 + total) % total);
      if (e.key === "ArrowRight") onIndexChange(((index as number) + 1) % total);
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, index, total, onIndexChange]);

  if (!isOpen) return null;

  const current = photos[index as number];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotografía en pantalla completa"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-300 select-none"
    >
      {/* Barra superior: contador y cerrar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20">
        <div className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#9A9A95]">
          <span className="text-white font-medium">
            {String((index as number) + 1).padStart(2, "0")}
          </span>{" "}
          / {String(total).padStart(2, "0")}
        </div>

        <button
          onClick={() => onIndexChange(null)}
          className="p-2 sm:p-3 text-[#9A9A95] hover:text-[#F5F5F0] border border-white/10 hover:border-white/70 transition-all duration-300 rounded-none cursor-pointer"
          aria-label="Cerrar visor de fotografía"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Imagen principal */}
      <div className="relative flex-1 flex items-center justify-center my-4 w-full max-w-6xl mx-auto px-4 sm:px-12">
        <button
          onClick={() => onIndexChange(((index as number) - 1 + total) % total)}
          className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/70 text-[#9A9A95] hover:text-[#F5F5F0] transition-all duration-300 rounded-none cursor-pointer"
          aria-label="Fotografía anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative w-full h-[60vh] sm:h-[72vh] flex items-center justify-center">
          <Image
            src={current.imageUrl}
            alt={current.alt}
            fill
            priority
            sizes="(max-width: 1200px) 90vw, 1200px"
            className="object-contain filter contrast-[1.05]"
          />
        </div>

        <button
          onClick={() => onIndexChange(((index as number) + 1) % total)}
          className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/70 text-[#9A9A95] hover:text-[#F5F5F0] transition-all duration-300 rounded-none cursor-pointer"
          aria-label="Fotografía siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
