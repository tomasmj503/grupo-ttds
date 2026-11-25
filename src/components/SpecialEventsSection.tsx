import React from "react";
import Image from "next/image";
import { GROUP_INFO, SPECIAL_EVENTS, getWhatsAppUrl } from "@/config/site";

export function SpecialEventsSection() {
  const whatsappUrl = getWhatsAppUrl(
    GROUP_INFO.whatsappNumber,
    SPECIAL_EVENTS.whatsappMessage
  );

  return (
    <section
      id="eventos-especiales"
      className="w-full bg-[#232222] pt-4 sm:pt-6 pb-14 sm:pb-20 md:pb-24"
      aria-labelledby="eventos-especiales-heading"
    >
      <div className="relative w-full h-[400px] sm:h-[420px] md:h-[440px] lg:h-[460px] overflow-hidden bg-[#0C0C0C]">
        <Image
          src={SPECIAL_EVENTS.imageUrl}
          alt={SPECIAL_EVENTS.imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.9] contrast-[1.04]"
        />

        {/* Gradiente sutil orientado abajo-izquierda para lectura limpia */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15 md:bg-gradient-to-tr md:from-black/85 md:via-black/45 md:to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Contenido abajo a la izquierda alineado al contenedor editorial */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 pb-8 sm:pb-10 md:pb-12">
            <div className="max-w-xl">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#C8A97E] font-medium font-sans mb-2">
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
                className="inline-flex items-center justify-center min-h-[44px] px-7 py-3 rounded-full bg-white text-[#0A0A0A] hover:bg-[#C8A97E] hover:text-[#050505] text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 w-fit"
              >
                {SPECIAL_EVENTS.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
