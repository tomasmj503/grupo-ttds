"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

// Fotografía gastronómica oscura/nocturna — bowl de sopa de fideos (ramen) en ambiente íntimo, alto impacto editorial
const HERO_PHOTO_URL =
  "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1920&q=85";

// URLs de menú directas (Canva)
const TIO_TORO_MENU_URL =
  "https://www.canva.com/design/DAETKN_Z2zg/oi4-ki_Y7c_P4qmPUksl0A/view?utm_content=DAETKN_Z2zg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h39e98f401b&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacD-lzfRFENzMmoAohQP5LOdg_H5l67Qc9rsKZCPWbbmwPiH5KZit7cBGuHPw_aem_93hiedP5fJYER0EejDywgQ";

const DRAGON_SOUL_MENU_URL =
  "https://www.canva.com/design/DAGsIjI-nY8/zWSS-138yvWEIDUidsKRUA/view?utm_content=DAGsIjI-nY8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd1c7feb66a&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAadkFF_LpUVn-YjQOULuVMKs95wLcxiOK76Lja2KSwtfm2qaEVyQmI5C7yNnFA_aem_Hc-2gVpgTkpaz-S6PcGG-A#2";

// Clases compartidas
const BUTTON_CLASSES =
  "relative z-30 pointer-events-auto min-w-[152px] sm:min-w-[180px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-black/45 hover:bg-white text-white hover:text-[#0A0A0A] border border-white/80 backdrop-blur-sm text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap text-center cursor-pointer";

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
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-105 brightness-[0.85] contrast-[1.08]"
        aria-hidden="true"
      />

      {/* Gradiente oscuro para hero nocturno: asegurar lectura y que botones resalten */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70 pointer-events-none z-10" />

      {/* Grupo de botones en la zona inferior-media con desplazamiento hacia abajo */}
      <div
        className="absolute inset-x-0 z-30 pointer-events-auto flex flex-row items-center justify-center gap-3 sm:gap-4 px-5"
        style={{ top: "calc(50% + 50px)", transform: "translateY(-50%)" }}
      >
        <a
          href={TIO_TORO_MENU_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={BUTTON_CLASSES}
          aria-label="Abrir Menú de Tío Toro"
        >
          Menú Tío Toro
        </a>
        <a
          href={DRAGON_SOUL_MENU_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={BUTTON_CLASSES}
          aria-label="Abrir Menú de Dragon Soul"
        >
          Menú Dragon Soul
        </a>
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

