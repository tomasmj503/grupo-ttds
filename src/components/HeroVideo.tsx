"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { BRANDS } from "@/config/site";
import { BrandWordmark } from "./BrandWordmark";

// Fotografía gastronómica oscura/nocturna — bowl de sopa de fideos (ramen) en ambiente íntimo, alto impacto editorial
const HERO_PHOTO_URL =
  "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1920&q=85";

// Botón de vidrio con el logo del restaurante y la etiqueta "Ver menú"
const BUTTON_CLASSES =
  "group relative z-30 pointer-events-auto w-[clamp(130px,42vw,152px)] h-[112px] sm:w-[240px] sm:h-[152px] shrink-0 justify-center rounded-2xl bg-black/45 hover:bg-black/60 border border-white/70 hover:border-white backdrop-blur-sm transition-all duration-300 flex flex-col items-center gap-2 cursor-pointer";

const BUTTON_LABEL_CLASSES =
  "text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] text-white/80 group-hover:text-white transition-colors";

export function HeroVideo() {
  const scrollToGallery = () => {
    const gallerySection = document.getElementById("galeria-editorial");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Fotografía oscura de fondo gastronómico (sin video) */}
      <img
        src={HERO_PHOTO_URL}
        alt="Gastronomía asiática nocturna — bowl de sopa de fideos (ramen) en ambiente íntimo"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-105"
        aria-hidden="true"
      />

      {/* Overlay de gradiente suave para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/65 pointer-events-none z-10" />

      {/* Logos de los menús al borde inferior, lado a lado: dejan libre el centro para el video */}
      <div
        className="absolute inset-x-0 bottom-[124px] sm:bottom-[140px] z-30 pointer-events-auto flex flex-row items-center justify-center gap-3 sm:gap-4 px-5"
      >
        {(["tio-toro", "dragon-soul"] as const).map((brandId) => (
          <a
            key={brandId}
            href={BRANDS[brandId].menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={BUTTON_CLASSES}
            aria-label={`Abrir Menú de ${BRANDS[brandId].name}`}
          >
            <span className="h-14 sm:h-[88px] flex items-center justify-center">
              <BrandWordmark brandId={brandId} size="hero" />
            </span>
            <span className={BUTTON_LABEL_CLASSES}>Ver menú</span>
          </a>
        ))}
      </div>

      {/* Botón discreto con ChevronDown centrado abajo */}
      <div className="absolute inset-x-0 bottom-7 z-30 pointer-events-auto flex justify-center">
        <button
          onClick={scrollToGallery}
          className="cursor-pointer"
          aria-label="Desplazarse a la galería editorial"
        >
          <ChevronDown className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
        </button>
      </div>
    </section>
  );
}

