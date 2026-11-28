"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { LogoGrupoTTDS } from "./BrandLogos";
import { BrandNavCard } from "./BrandNavCard";
import { HomeLink } from "./HomeLink";
import { BRANDS, GROUP_INFO, getWhatsAppUrl, type BrandKey } from "@/config/site";

interface NavbarProps {
  onOpenReservation?: () => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuChange?: (open: boolean) => void;
}

// Orden en que aparecen los restaurantes en el menú
const BRAND_ORDER: BrandKey[] = ["tio-toro", "dragon-soul"];

// Los disparadores y paneles de los menús llevan este atributo para el cierre al hacer clic fuera
const BRAND_MENU_ATTR = "data-brand-menu";

export function Navbar({
  onOpenReservation,
  isMobileMenuOpen: controlledMobileMenuOpen,
  onMobileMenuChange,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
  // Restaurante cuyo menú está desplegado (solo uno a la vez)
  const [openBrand, setOpenBrand] = useState<BrandKey | null>(null);
  const brandScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isMobileMenuOpen = controlledMobileMenuOpen ?? internalMobileMenuOpen;
  const setIsMobileMenuOpen = useCallback(
    (open: boolean) => {
      if (onMobileMenuChange) {
        onMobileMenuChange(open);
      } else {
        setInternalMobileMenuOpen(open);
      }
    },
    [onMobileMenuChange]
  );

  const reservationDropdownRef = useRef<HTMLDivElement>(null);

  // Avanza/retrocede el panel una tarjeta a la vez, alineado a las tarjetas, y llega siempre
  // hasta el borde (posición absoluta, no relativa: así los clics rápidos no se quedan a medias)
  const scrollBrandPanel = (direction: 1 | -1) => {
    const el = brandScrollRef.current;
    const firstCard = el?.firstElementChild as HTMLElement | null | undefined;
    if (!el || !firstCard) return;

    const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
    const step = firstCard.offsetWidth + gap;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const currentIndex = Math.round(el.scrollLeft / step);
    const target = Math.min(Math.max((currentIndex + direction) * step, 0), maxScroll);

    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const toggleBrand = (brandKey: BrandKey) =>
    setOpenBrand((prev) => (prev === brandKey ? null : brandKey));

  const closeAllMenus = () => {
    setOpenBrand(null);
    setIsMobileMenuOpen(false);
  };

  // Manejo de scroll para el fondo de la barra de navegación
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cierre del dropdown de Reservations al hacer clic fuera o pulsar Escape
  useEffect(() => {
    if (!isReservationOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        reservationDropdownRef.current &&
        !reservationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsReservationOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsReservationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReservationOpen]);

  // Cierre del menú de un restaurante al hacer clic fuera o pulsar Escape
  useEffect(() => {
    if (!openBrand) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // No cerrar si el clic está dentro de un disparador o de un panel de restaurante
      if (event.target instanceof Element && event.target.closest(`[${BRAND_MENU_ATTR}]`)) {
        return;
      }
      setOpenBrand(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenBrand(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openBrand]);

  // Manejo de tecla Escape y bloqueo de scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  // Sincroniza el estado de los botones de scroll horizontal del panel de escritorio
  useEffect(() => {
    const el = brandScrollRef.current;
    if (!el) return;

    const updateScrollState = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [openBrand]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${isScrolled
          ? "bg-[#050505]/95 backdrop-blur-md border-white/10"
          : "bg-transparent border-transparent"
          }`}
      >

        <div className="px-5 sm:px-8 py-2.5 sm:py-3 max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Izquierda: Logo Grupo TTDS */}
          <HomeLink
            className="flex items-center shrink-0 focus:outline-none"
            ariaLabel="Ir a página de inicio Grupo TTDS"
          >
            <LogoGrupoTTDS className="h-9 w-auto shrink-0" />
          </HomeLink>

          {/* Derecha: Enlaces de escritorio, botón píldora Reservations con dropdown y botón hamburguesa en móvil */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
            {/* Menús de restaurantes en escritorio (hidden md:flex) */}
            <nav className="hidden md:flex items-center gap-7">
              {BRAND_ORDER.map((brandKey) => {
                const brand = BRANDS[brandKey];
                const isOpen = openBrand === brandKey;

                return (
                  <div key={brandKey} className="relative" {...{ [BRAND_MENU_ATTR]: "" }}>
                    <button
                      type="button"
                      onClick={() => toggleBrand(brandKey)}
                      aria-expanded={isOpen}
                      className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-neutral-300 hover:text-white transition-colors cursor-pointer focus:outline-none"
                    >
                      {brand.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="fixed inset-x-0 top-16 z-50 bg-neutral-950 border-t border-white/10 px-8 py-6">
                        <div className="relative max-w-7xl mx-auto">
                          {/* Botón anterior (oculto cuando no hay desplazamiento a la izquierda) */}
                          <button
                            type="button"
                            onClick={() => scrollBrandPanel(-1)}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition-all ${
                              canScrollLeft
                                ? "opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none"
                            }`}
                            aria-label="Anterior"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>

                          {/* Contenedor con scroll horizontal */}
                          <div
                            ref={brandScrollRef}
                            className="flex overflow-x-auto scroll-smooth gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                          >
                            {brand.navCards.map((card) => (
                              <BrandNavCard
                                key={card.id}
                                brand={brand}
                                card={card}
                                variant="desktop"
                                onNavigate={() => setOpenBrand(null)}
                              />
                            ))}
                          </div>

                          {/* Botón siguiente (oculto cuando no hay desplazamiento a la derecha) */}
                          <button
                            type="button"
                            onClick={() => scrollBrandPanel(1)}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition-all ${
                              canScrollRight
                                ? "opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none"
                            }`}
                            aria-label="Siguiente"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="relative" ref={reservationDropdownRef}>
              <button
                type="button"
                onClick={() => setIsReservationOpen((prev) => !prev)}
                aria-expanded={isReservationOpen}
                aria-haspopup="true"
                className="bg-white text-[#0A0A0A] rounded-full px-6 sm:px-7 py-3 text-xs sm:text-sm font-normal tracking-wide whitespace-nowrap shadow-sm hover:bg-neutral-100 transition-colors cursor-pointer focus:outline-none"
              >
                Reservaciones
              </button>

              {/* Menú desplegable de Reservations: compacto, sobrio y elegante */}
              {isReservationOpen && (
                <div
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute right-0 top-full mt-2 bg-[#141414] border border-white/15 rounded-xl shadow-2xl py-2 min-w-[180px] z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="flex flex-col">
                    {BRAND_ORDER.map((brandKey) => (
                      <a
                        key={brandKey}
                        href={getWhatsAppUrl(
                          GROUP_INFO.whatsappNumber,
                          BRANDS[brandKey].whatsappReserveText
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        onClick={() => setIsReservationOpen(false)}
                        className="px-4 py-2.5 text-sm font-medium text-[#F5F5F0] hover:text-white hover:bg-white/5 transition-colors text-left"
                      >
                        {BRANDS[brandKey].name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Botón hamburguesa (≡): Visible solo en móvil (flex md:hidden) y oculto en escritorio */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú de navegación"
              className="flex md:hidden p-2 -mr-2 flex-col justify-center gap-1.5 cursor-pointer focus:outline-none"
            >
              <span className="h-[2px] w-6 bg-white block" />
              <span className="h-[2px] w-6 bg-white block" />
              <span className="h-[2px] w-6 bg-white block" />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil de tres líneas */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col md:hidden animate-in fade-in duration-200 overflow-y-auto overscroll-contain"
        >
          {/* Cabecera: nombre del grupo a la izquierda, X a la derecha */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <HomeLink
              onNavigate={() => setIsMobileMenuOpen(false)}
              className="focus:outline-none"
              ariaLabel="Ir a página de inicio Grupo TTDS"
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                  fontWeight: 500,
                  fontSize: "1.1rem",
                  letterSpacing: "0.18em",
                }}
                className="text-white uppercase select-none"
              >
                GRUPO TTDS
              </span>
            </HomeLink>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 text-white/80 hover:text-white transition-colors focus:outline-none cursor-pointer rounded-lg flex items-center justify-center"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Filas de navegación + botón Reservaciones en flujo normal */}
          <nav className="flex flex-col px-6 pt-2 pb-8">
            {/* Restaurantes en móvil: botón con ChevronDown y tarjetas apiladas */}
            {BRAND_ORDER.map((brandKey) => {
              const brand = BRANDS[brandKey];
              const isOpen = openBrand === brandKey;

              return (
                <div key={brandKey} {...{ [BRAND_MENU_ATTR]: "" }}>
                  <button
                    type="button"
                    onClick={() => toggleBrand(brandKey)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between py-4 text-base font-normal text-white/90 hover:text-white transition-colors border-b border-white/10 focus:outline-none cursor-pointer"
                    style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
                  >
                    {brand.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="flex flex-col gap-3 px-3 pt-2 pb-4 border-b border-white/10">
                      {brand.navCards.map((card) => (
                        <BrandNavCard
                          key={card.id}
                          brand={brand}
                          card={card}
                          variant="mobile"
                          onNavigate={closeAllMenus}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Botón píldora Reservaciones — abre el modal para elegir restaurante */}
            <div className="pt-6">
              <button
                type="button"
                onClick={() => {
                  closeAllMenus();
                  onOpenReservation?.();
                }}
                className="w-full block rounded-full px-5 py-3 text-sm font-medium bg-white text-[#0A0A0A] hover:bg-neutral-100 transition-colors text-center cursor-pointer"
                style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
              >
                Reservaciones
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
