"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { HOME_MARQUEE_GALLERY, MarqueeGalleryItem } from "@/config/site";
import { InstagramIcon } from "./BrandLogos";

export function MarqueeGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);

  // Duplicamos la galería para el bucle infinito sin cortes
  const duplicatedItems = [...HOME_MARQUEE_GALLERY, ...HOME_MARQUEE_GALLERY];

  // Sincronizar referencia de pausa
  useEffect(() => {
    isPausedRef.current = isPaused || lightboxIndex !== null;
  }, [isPaused, lightboxIndex]);

  // Movimiento automático y fluido hacia la DERECHA usando requestAnimationFrame
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let halfWidth = track.scrollWidth / 2;

    const updateHalfWidth = () => {
      if (track) halfWidth = track.scrollWidth / 2;
    };

    window.addEventListener("resize", updateHalfWidth);

    // Comenzar en el límite izquierdo para desplazarse hacia la derecha
    if (positionRef.current === 0) {
      positionRef.current = -halfWidth;
    }

    const speed = 0.55; // Velocidad pausada, sedosa y editorial

    const animate = () => {
      if (!isPausedRef.current && track) {
        positionRef.current += speed;

        // Cuando llega a 0 (desplazado completamente a la derecha), reinicia a -halfWidth
        if (positionRef.current >= 0) {
          positionRef.current = -halfWidth;
        }

        track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateHalfWidth);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Manejo de teclado para el visor Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex]);

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + HOME_MARQUEE_GALLERY.length) % HOME_MARQUEE_GALLERY.length
    );
  };

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % HOME_MARQUEE_GALLERY.length
    );
  };

  const currentLightboxItem: MarqueeGalleryItem | null =
    lightboxIndex !== null ? HOME_MARQUEE_GALLERY[lightboxIndex] : null;

  return (
    <section
      id="galeria-editorial"
      className="relative w-full bg-[#050505] py-16 sm:py-20 md:py-24 overflow-hidden border-t border-b border-white/10"
      aria-label="Galería fotográfica nocturna"
    >
      {/* Cabecera Editorial */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 sm:mb-12 text-center space-y-2 sm:space-y-2.5">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-normal tracking-tight text-white">
          Tío Toro · Dragon Soul
        </h2>
        <p className="text-xs sm:text-sm font-sans font-normal tracking-wide text-white/80">
          Hamburguesas Artesanales · Sushi y Comida Asiática
        </p>
      </div>

      {/* Contenedor de la Cinta Horizontal Marquee */}
      <div
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Sombras de desvanecimiento lateral editorial */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Pista de imágenes en movimiento hacia la derecha */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 will-change-transform"
          style={{ width: "max-content" }}
        >
          {duplicatedItems.map((item, index) => {
            const originalIndex = index % HOME_MARQUEE_GALLERY.length;

            if (item.hasInstagram) {
              return (
                <a
                  key={`${item.id}-${index}`}
                  href={item.instagramUrl || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-[325px] sm:w-[340px] md:w-[370px] lg:w-[400px] aspect-[4/5] shrink-0 bg-[#0C0C0C] border border-white/15 rounded-2xl overflow-hidden block select-none"
                  aria-label={`${item.alt} - Abrir Instagram`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 325px, (max-width: 768px) 340px, (max-width: 1024px) 370px, 400px"
                    className="object-cover scale-100 group-hover:scale-[1.04] transition-transform duration-700 ease-out filter brightness-[0.9] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Badge de Instagram en la esquina superior derecha */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-black/70 backdrop-blur-md border border-white/20 group-hover:border-[#C8A97E] text-white group-hover:text-[#C8A97E] p-2 transition-all duration-500 rounded-none shadow-md">
                    <InstagramIcon className="w-4 h-4" />
                  </div>

                  {/* Pie de foto editorial con indicación */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end">
                    <span className="text-[9px] uppercase tracking-[0.22em] text-[#C8A97E] font-medium font-sans mb-1 flex items-center gap-1.5">
                      <InstagramIcon className="w-3 h-3" /> VER EN INSTAGRAM
                    </span>
                    <p className="text-xs text-[#F5F5F0] font-serif line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </a>
              );
            }

            return (
              <button
                type="button"
                key={`${item.id}-${index}`}
                onClick={() => setLightboxIndex(originalIndex)}
                className="group relative w-[325px] sm:w-[340px] md:w-[370px] lg:w-[400px] aspect-[4/5] shrink-0 bg-[#0C0C0C] border border-white/15 rounded-2xl overflow-hidden text-left cursor-pointer select-none"
                aria-label={`${item.alt} - Ver en visor pantalla completa`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 325px, (max-width: 768px) 340px, (max-width: 1024px) 370px, 400px"
                  className="object-cover scale-100 group-hover:scale-[1.04] transition-transform duration-700 ease-out filter brightness-[0.9] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-60 group-hover:opacity-85 transition-opacity duration-500" />

                {/* Badge de Vista Previa / Lightbox en esquina superior derecha */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-black/70 backdrop-blur-md border border-white/20 group-hover:border-[#C8A97E] text-[#9A9A95] group-hover:text-[#F5F5F0] p-2 transition-all duration-500 rounded-none opacity-0 group-hover:opacity-100">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Pie de foto editorial */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#9A9A95] group-hover:text-[#C8A97E] font-medium font-sans mb-1 transition-colors">
                    EXPANDIR FOTOGRAFÍA
                  </span>
                  <p className="text-xs text-[#F5F5F0] font-serif line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visor Lightbox Oscuro a Pantalla Completa */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visor de fotografía en pantalla completa"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-300 select-none"
        >
          {/* Barra Superior del Lightbox */}
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20">
            <div className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#9A9A95]">
              <span className="text-[#C8A97E] font-medium">
                {String(lightboxIndex + 1).padStart(2, "0")}
              </span>{" "}
              / {String(HOME_MARQUEE_GALLERY.length).padStart(2, "0")}
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 sm:p-3 text-[#9A9A95] hover:text-[#F5F5F0] border border-white/10 hover:border-[#C8A97E] transition-all duration-300 rounded-none"
              aria-label="Cerrar visor de fotografía"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Área Principal de la Imagen */}
          <div className="relative flex-1 flex items-center justify-center my-4 w-full max-w-6xl mx-auto px-4 sm:px-12">
            {/* Flecha Anterior */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#C8A97E] text-[#9A9A95] hover:text-[#F5F5F0] transition-all duration-300 rounded-none cursor-pointer"
              aria-label="Fotografía anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Imagen Principal */}
            <div className="relative w-full h-[60vh] sm:h-[72vh] flex items-center justify-center">
              <Image
                src={currentLightboxItem.imageUrl}
                alt={currentLightboxItem.alt}
                fill
                priority
                sizes="(max-width: 1200px) 90vw, 1200px"
                className="object-contain filter contrast-[1.05]"
              />
            </div>

            {/* Flecha Siguiente */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#C8A97E] text-[#9A9A95] hover:text-[#F5F5F0] transition-all duration-300 rounded-none cursor-pointer"
              aria-label="Fotografía siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Barra Inferior con Título y Leyenda Editorial */}
          <div className="w-full max-w-3xl mx-auto text-center z-20 pb-2">
            <p className="font-serif text-lg sm:text-2xl text-[#F5F5F0] font-normal leading-relaxed">
              {currentLightboxItem.caption}
            </p>
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.26em] text-[#C8A97E] block mt-2">
              GRUPO TTDS · COLECCIÓN EXCLUSIVA
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
