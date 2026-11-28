import React from "react";
import Image from "next/image";
import { GROUP_INFO, SPECIAL_EVENTS, getWhatsAppUrl } from "@/config/site";

/**
 * Eventos privados: texto sobre fondo negro y, junto a él, la foto de las lámparas.
 * Escritorio: texto a la izquierda, foto a la derecha fundida hacia el negro.
 * Móvil: foto arriba (se funde hacia el negro) y el texto debajo.
 */
export function SpecialEventsSection() {
  const whatsappUrl = getWhatsAppUrl(
    GROUP_INFO.whatsappNumber,
    SPECIAL_EVENTS.whatsappMessage
  );

  return (
    <section
      id="eventos-especiales"
      className="w-full bg-[#050505] py-12 sm:py-16 md:py-20"
      aria-labelledby="eventos-especiales-heading"
    >
      <div className="relative w-full max-w-[1440px] mx-auto overflow-hidden md:min-h-[600px] md:flex md:items-center">
        {/* Foto: arriba en móvil, a la derecha en escritorio */}
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:absolute md:inset-y-0 md:right-0 md:w-[62%]">
          <Image
            src={SPECIAL_EVENTS.imageUrl}
            alt={SPECIAL_EVENTS.imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, 62vw"
            style={{ objectPosition: SPECIAL_EVENTS.imagePosition }}
            className="object-cover"
          />

          {/* Móvil: la foto se funde hacia el negro donde empieza el texto */}
          <div
            className="md:hidden absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent"
            aria-hidden="true"
          />

          {/* Escritorio: se funde hacia el negro por el lado del texto y por el borde derecho */}
          <div
            className="hidden md:block absolute inset-0 bg-[linear-gradient(to_right,#050505_0%,rgba(5,5,5,0.55)_28%,transparent_62%,transparent_93%,#050505_100%)]"
            aria-hidden="true"
          />
        </div>

        {/* Texto */}
        <div className="relative z-10 w-full px-6 sm:px-12 md:py-16">
          <div className="md:max-w-sm lg:max-w-md">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/80 font-medium font-sans mb-2">
              {SPECIAL_EVENTS.eyebrow}
            </p>
            <h2
              id="eventos-especiales-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-sans font-light sm:font-normal tracking-tight text-white mb-2.5"
            >
              {SPECIAL_EVENTS.title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed mb-6 max-w-md">
              {SPECIAL_EVENTS.description}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] px-7 py-3 rounded-full bg-white text-[#0A0A0A] hover:bg-neutral-200 text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 w-fit"
            >
              {SPECIAL_EVENTS.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
