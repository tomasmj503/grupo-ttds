"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Eye, Pause, Play } from "lucide-react";
import { BRAND_LIST, HOME_MARQUEE_GALLERY } from "@/config/site";
import { InstagramIcon } from "./BrandLogos";
import { PhotoLightbox } from "./PhotoLightbox";

export function MarqueeGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);
  const halfWidthRef = useRef<number>(0);
  const stepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Estado de arrastre táctil para swipe en móvil
  const touchStateRef = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    isDragging: false,
    hasMoved: false,
  });

  // Duplicamos la galería para el bucle infinito sin cortes
  const duplicatedItems = [...HOME_MARQUEE_GALLERY, ...HOME_MARQUEE_GALLERY];

  const wrapPosition = useCallback((pos: number) => {
    const half = halfWidthRef.current;
    if (!half) return pos;
    let wrapped = pos;
    while (wrapped >= 0) wrapped -= half;
    while (wrapped < -half) wrapped += half;
    return wrapped;
  }, []);

  // Sincronizar referencia de pausa
  useEffect(() => {
    isPausedRef.current = isHovered || isUserPaused || lightboxIndex !== null;
  }, [isHovered, isUserPaused, lightboxIndex]);

  // Movimiento automático y fluido hacia la DERECHA usando requestAnimationFrame
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateHalfWidth = () => {
      if (track) {
        halfWidthRef.current = track.scrollWidth / 2;
      }
    };

    updateHalfWidth();
    window.addEventListener("resize", updateHalfWidth);

    // Comenzar en el límite izquierdo para desplazarse hacia la derecha
    if (positionRef.current === 0 && halfWidthRef.current > 0) {
      positionRef.current = -halfWidthRef.current;
    }

    const speed = 0.55; // Velocidad pausada, sedosa y editorial

    const animate = () => {
      if (!isPausedRef.current && track && !touchStateRef.current.isDragging) {
        positionRef.current = wrapPosition(positionRef.current + speed);
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
      if (stepTimeoutRef.current) {
        clearTimeout(stepTimeoutRef.current);
      }
    };
  }, [wrapPosition]);

  // Avance/retroceso manual por tarjeta (estilo controles TAO Downtown)
  const stepCarousel = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    setIsUserPaused(true);

    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth : 220;
    const gap = window.innerWidth < 640 ? 20 : 24;
    const step = cardWidth + gap;

    const delta = direction === "prev" ? step : -step;
    positionRef.current = wrapPosition(positionRef.current + delta);

    if (stepTimeoutRef.current) {
      clearTimeout(stepTimeoutRef.current);
    }

    track.style.transition = "transform 380ms cubic-bezier(0.22, 1, 0.36, 1)";
    track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;

    stepTimeoutRef.current = setTimeout(() => {
      if (track) {
        track.style.transition = "";
      }
    }, 390);
  };

  // Manejadores táctiles para swipe horizontal fluido en móvil
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    const track = trackRef.current;
    if (track) {
      track.style.transition = "";
    }
    touchStateRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      lastX: touch.clientX,
      isDragging: true,
      hasMoved: false,
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStateRef.current.isDragging) return;
    const touch = e.touches[0];
    if (!touch) return;

    const totalDx = Math.abs(touch.clientX - touchStateRef.current.startX);
    const totalDy = Math.abs(touch.clientY - touchStateRef.current.startY);

    // Solo interceptar si el gesto es claramente horizontal
    if (totalDx > 6 && totalDx > totalDy) {
      touchStateRef.current.hasMoved = true;
      const deltaX = touch.clientX - touchStateRef.current.lastX;
      touchStateRef.current.lastX = touch.clientX;
      positionRef.current = wrapPosition(positionRef.current + deltaX);
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }
    }
  };

  const handleTouchEnd = () => {
    touchStateRef.current.isDragging = false;
  };

  // Arrastre con el mouse en escritorio (equivalente al swipe táctil)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    if (trackRef.current) {
      trackRef.current.style.transition = "";
    }
    touchStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      isDragging: true,
      hasMoved: false,
    };

    const handleMouseMove = (event: MouseEvent) => {
      const state = touchStateRef.current;
      if (!state.isDragging) return;
      // Pequeño umbral para no confundir un clic con un arrastre
      if (!state.hasMoved && Math.abs(event.clientX - state.startX) < 4) return;

      state.hasMoved = true;
      const deltaX = event.clientX - state.lastX;
      state.lastX = event.clientX;
      positionRef.current = wrapPosition(positionRef.current + deltaX);
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }
    };

    const handleMouseUp = () => {
      touchStateRef.current.isDragging = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <section
      id="galeria-editorial"
      className="relative w-full bg-[#232222] py-12 sm:py-20 md:py-24 overflow-hidden border-t border-white/10"
      aria-label="Galería fotográfica nocturna"
    >
      {/* Cabecera Editorial */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-5 sm:mb-8 text-center space-y-1.5 sm:space-y-2.5">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-light sm:font-normal tracking-tight text-white">
          {BRAND_LIST.map((brand) => brand.name).join(" · ")}
        </h2>
        <p className="text-xs sm:text-sm font-sans font-normal tracking-wide text-white/80">
          {BRAND_LIST.map((brand) => brand.shortDescription).join(" · ")}
        </p>
      </div>

      {/* Controles superiores derechos estilo TAO Downtown (<, >, Pausa/Play) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => stepCarousel("prev")}
          className="w-8 h-8 flex items-center justify-center text-white/75 hover:text-white transition-colors cursor-pointer"
          aria-label="Tarjeta anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => stepCarousel("next")}
          className="w-8 h-8 flex items-center justify-center text-white/75 hover:text-white transition-colors cursor-pointer"
          aria-label="Tarjeta siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setIsUserPaused((prev) => !prev)}
          className="w-8 h-8 rounded-full border border-white/30 hover:border-white/70 flex items-center justify-center text-white/85 hover:text-white transition-colors cursor-pointer"
          aria-label={isUserPaused ? "Reanudar galería" : "Pausar galería"}
        >
          {isUserPaused ? (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          ) : (
            <Pause className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Contenedor de la Cinta Horizontal Marquee */}
      <div
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onDragStart={(e) => e.preventDefault()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sombras de desvanecimiento lateral editorial (solo sm+ para bleed limpio en móvil) */}
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 sm:w-20 md:w-28 bg-gradient-to-r from-[#232222] to-transparent z-10 pointer-events-none" />
        <div className="hidden sm:block absolute right-0 top-0 bottom-0 sm:w-20 md:w-28 bg-gradient-to-l from-[#232222] to-transparent z-10 pointer-events-none" />

        {/* Pista de imágenes en movimiento hacia la derecha */}
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 will-change-transform"
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
                  onClick={(e) => {
                    if (touchStateRef.current.hasMoved) e.preventDefault();
                  }}
                  className="group relative w-[220px] h-[445px] sm:w-[300px] sm:h-[475px] md:w-[384px] md:h-[606px] shrink-0 bg-[#0C0C0C] sm:border sm:border-white/15 rounded-[10px] sm:rounded-2xl overflow-hidden block select-none"
                  aria-label={`${item.alt} - Abrir Instagram`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 220px, (max-width: 768px) 300px, 384px"
                    className="object-cover scale-100 group-hover:scale-[1.04] transition-transform duration-700 ease-out filter brightness-[0.95] contrast-[1.03]"
                  />

                  {/* Ícono de Instagram solo, en blanco, sobre la foto */}
                  <InstagramIcon className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-6 h-6 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]" />
                </a>
              );
            }

            return (
              <button
                type="button"
                key={`${item.id}-${index}`}
                onClick={() => {
                  if (!touchStateRef.current.hasMoved) {
                    setLightboxIndex(originalIndex);
                  }
                }}
                className="group relative w-[220px] h-[445px] sm:w-[300px] sm:h-[475px] md:w-[384px] md:h-[606px] shrink-0 bg-[#0C0C0C] sm:border sm:border-white/15 rounded-[10px] sm:rounded-2xl overflow-hidden text-left cursor-pointer select-none"
                aria-label={`${item.alt} - Ver en visor pantalla completa`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 300px, 384px"
                  className="object-cover scale-100 group-hover:scale-[1.04] transition-transform duration-700 ease-out filter brightness-[0.95] contrast-[1.03]"
                />

                {/* Ícono de ampliar, solo en blanco, al pasar el cursor */}
                <Eye className="hidden sm:block absolute top-4 right-4 z-10 w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Visor a pantalla completa (compartido con las galerías) */}
      <PhotoLightbox
        photos={HOME_MARQUEE_GALLERY}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
