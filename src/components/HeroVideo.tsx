"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, ChevronDown } from "lucide-react";
import { BRANDS } from "@/config/site";
import { LogoTioToro, LogoDragonSoul } from "./BrandLogos";

// Fotografía gastronómica de ingredientes — estética limpia y clara/media
const HERO_PHOTO_URL =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=85";

export function HeroVideo() {
  const scrollToGallery = () => {
    const gallerySection = document.getElementById("galeria-editorial");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="h-[100svh] w-full relative overflow-hidden bg-[#050505] flex flex-col justify-between items-center select-none">
      {/* Fotografía gastronómica de fondo */}
      <Image
        src={HERO_PHOTO_URL}
        alt="Fotografía gastronómica — ingredientes frescos de alta cocina"
        fill
        priority
        sizes="100vw"
        className="object-cover scale-105 brightness-[0.82] contrast-[1.05]"
      />

      {/* Gradiente editorial de profundidad — sutil arriba para imagen limpia */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.6)_100%)] pointer-events-none" />

      {/* Cabecera / Espacio superior para balance */}
      <div className="pt-28 sm:pt-36 z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.3em] text-[#C8A97E] font-medium block mb-3 animate-fade-in">
          HOSPITALIDAD NOCTURNA & ALTA GASTRONOMÍA
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#F5F5F0] tracking-wide leading-[1.15] max-w-3xl mx-auto">
          Dos Conceptos de Autor. Una Misma Pasión.
        </h1>
        <div className="w-12 h-[1px] bg-white/20 mx-auto mt-4 sm:mt-6" />
      </div>

      {/* Zona inferior/central flotante: Los dos logos que abren sus cartas en Canva */}
      <div className="z-10 w-full max-w-4xl px-4 pb-10 sm:pb-14 flex flex-col items-center">
        <div className="mb-4 sm:mb-5">
          <p className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.26em] text-[#9A9A95] text-center">
            SELECCIONA PARA EXPLORAR LA CARTA
          </p>
        </div>

        {/* Fila de los dos logos flotantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full max-w-2xl">
          {/* 1. Tío Toro -> Canva Menu */}
          <a
            href={BRANDS["tio-toro"].menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-black/35 backdrop-blur-md border border-white/20 hover:border-[#C8A97E] transition-all duration-700 rounded-none shadow-lg hover:shadow-2xl hover:bg-black/55 text-center"
            aria-label="Abrir Menú de Tío Toro en Canva"
          >
            <LogoTioToro className="h-7 sm:h-9 w-auto text-[#F5F5F0] group-hover:text-[#C8A97E] transition-all duration-700 group-hover:scale-105" />
            <span className="mt-3 text-[9px] sm:text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#C8A97E] flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
              VER MENÚ
              <ExternalLink className="w-2.5 h-2.5 stroke-[2]" />
            </span>
          </a>

          {/* 2. Dragon Soul -> Canva Menu */}
          <a
            href={BRANDS["dragon-soul"].menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-black/35 backdrop-blur-md border border-white/20 hover:border-[#C8A97E] transition-all duration-700 rounded-none shadow-lg hover:shadow-2xl hover:bg-black/55 text-center"
            aria-label="Abrir Menú de Dragon Soul en Canva"
          >
            <LogoDragonSoul className="h-7 sm:h-9 w-auto text-[#F5F5F0] group-hover:text-[#C8A97E] transition-all duration-700 group-hover:scale-105" />
            <span className="mt-3 text-[9px] sm:text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-[#C8A97E] flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
              VER MENÚ
              <ExternalLink className="w-2.5 h-2.5 stroke-[2]" />
            </span>
          </a>
        </div>

        {/* Indicador de scroll editorial */}
        <button
          onClick={scrollToGallery}
          className="mt-6 sm:mt-8 flex flex-col items-center text-[#9A9A95] hover:text-[#C8A97E] transition-colors duration-500 cursor-pointer"
          aria-label="Desplazarse a la galería editorial"
        >
          <span className="text-[8px] sm:text-[9px] font-sans uppercase tracking-[0.3em] mb-1 opacity-70">
            DESCUBRIR
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce opacity-80" />
        </button>
      </div>
    </section>
  );
}

