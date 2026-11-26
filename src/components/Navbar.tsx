"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { LogoGrupoTTDS } from "./BrandLogos";
import { BRANDS, GROUP_INFO, getWhatsAppUrl } from "@/config/site";

interface NavbarProps {
  onOpenReservation?: () => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuChange?: (open: boolean) => void;
}

export function Navbar({
  onOpenReservation,
  isMobileMenuOpen: controlledMobileMenuOpen,
  onMobileMenuChange,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
  const [isTioToroOpen, setIsTioToroOpen] = useState(false);
  const tioToroPanelRef = useRef<HTMLDivElement>(null);
  const tioToroMobilePanelRef = useRef<HTMLDivElement>(null);
  const tioToroScrollRef = useRef<HTMLDivElement>(null);
  const tioToroDesktopTriggerRef = useRef<HTMLDivElement>(null);
  const tioToroMobileTriggerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isMobileMenuOpen = controlledMobileMenuOpen ?? internalMobileMenuOpen;
  const setIsMobileMenuOpen = (open: boolean) => {
    if (onMobileMenuChange) {
      onMobileMenuChange(open);
    } else {
      setInternalMobileMenuOpen(open);
    }
  };

  const reservationDropdownRef = useRef<HTMLDivElement>(null);

  // URLs contextuales para WhatsApp
  const tioToroUrl = getWhatsAppUrl(
    GROUP_INFO.whatsappNumber,
    BRANDS["tio-toro"].whatsappReserveText
  );

  const dragonSoulUrl = getWhatsAppUrl(
    GROUP_INFO.whatsappNumber,
    BRANDS["dragon-soul"].whatsappReserveText
  );

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

  // Cierre del panel de Tío Toro al hacer clic fuera o pulsar Escape
  useEffect(() => {
    if (!isTioToroOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const insideDesktop =
        tioToroPanelRef.current && tioToroPanelRef.current.contains(target);
      const insideDesktopTrigger =
        tioToroDesktopTriggerRef.current &&
        tioToroDesktopTriggerRef.current.contains(target);
      const insideMobile =
        tioToroMobilePanelRef.current &&
        tioToroMobilePanelRef.current.contains(target);
      const insideMobileTrigger =
        tioToroMobileTriggerRef.current &&
        tioToroMobileTriggerRef.current.contains(target);

      // No cerrar si el clic está dentro de cualquiera de los paneles
      // o dentro de cualquiera de los botones que abren/cierran Tío Toro
      if (insideDesktop || insideDesktopTrigger || insideMobile || insideMobileTrigger) {
        return;
      }

      setIsTioToroOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTioToroOpen(false);
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
  }, [isTioToroOpen]);

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
  }, [isMobileMenuOpen]);


  // Sincroniza el estado de los botones de scroll horizontal del panel Tío Toro
  useEffect(() => {
    const el = tioToroScrollRef.current;
    if (!el) return;

    const updateScrollState = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [isTioToroOpen]);

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
          <Link
            href="/"
            className="flex items-center shrink-0 focus:outline-none"
            aria-label="Ir a página de inicio Grupo TTDS"
          >
            <LogoGrupoTTDS className="h-9 w-auto shrink-0" />
          </Link>

          {/* Derecha: Enlaces de escritorio, botón píldora Reservations con dropdown y botón hamburguesa en móvil */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
{/* Enlaces en escritorio (hidden md:flex): Dragon Soul y Tío Toro antes de Reservaciones */}
            <nav className="hidden md:flex items-center gap-7">
              {/* Tío Toro — botón con ChevronDown y panel expandible */}
              <div className="relative" ref={tioToroDesktopTriggerRef}>
                <button
                  type="button"
                  onClick={() => setIsTioToroOpen((prev) => !prev)}
                  aria-expanded={isTioToroOpen}
                  className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-neutral-300 hover:text-white transition-colors cursor-pointer focus:outline-none"
                >
                  Tío Toro
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isTioToroOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isTioToroOpen && (
                  <div
                    ref={tioToroPanelRef}
                    className="fixed inset-x-0 top-16 z-50 bg-neutral-950 border-t border-white/10 px-8 py-6"
                  >
                    <div className="relative max-w-7xl mx-auto">
                      {/* Botón anterior (oculto cuando no hay desplazamiento a la izquierda) */}
                      <button
                        type="button"
                        onClick={() =>
                          tioToroScrollRef.current?.scrollBy({
                            left: -400,
                            behavior: "smooth",
                          })
                        }
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
                        ref={tioToroScrollRef}
                        className="flex overflow-x-auto scroll-smooth gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                      >
                        {/* Menú */}
                        <Link
                          href="/#tio-toro"
                          onClick={() => setIsTioToroOpen(false)}
                          className="w-[420px] h-[316px] shrink-0 rounded-2xl overflow-hidden relative group cursor-pointer block"
                        >
                          <img
                            src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
                            alt="Menú Tío Toro"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors duration-300" />
                          <div className="relative z-10 flex flex-col justify-end h-full p-4">
                            <h3 className="text-white font-semibold text-sm tracking-wide">Menú</h3>
                            <p className="text-white/70 text-xs mt-0.5 leading-tight">Explora nuestra carta</p>
                            <span className="mt-2 inline-block text-[11px] font-medium text-white/90 border border-white/30 rounded-full px-3 py-1 w-fit group-hover:bg-white/10 transition-colors">Ver más</span>
                          </div>
                        </Link>
                        {/* Galería */}
                        <Link
                          href="/#tio-toro"
                          onClick={() => setIsTioToroOpen(false)}
                          className="w-[420px] h-[316px] shrink-0 rounded-2xl overflow-hidden relative group cursor-pointer block"
                        >
                          <img
                            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                            alt="Galería Tío Toro"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors duration-300" />
                          <div className="relative z-10 flex flex-col justify-end h-full p-4">
                            <h3 className="text-white font-semibold text-sm tracking-wide">Galería</h3>
                            <p className="text-white/70 text-xs mt-0.5 leading-tight">Mira el ambiente</p>
                            <span className="mt-2 inline-block text-[11px] font-medium text-white/90 border border-white/30 rounded-full px-3 py-1 w-fit group-hover:bg-white/10 transition-colors">Ver más</span>
                          </div>
                        </Link>
                      {/* Reserva */}
                        <a
                          href={tioToroUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsTioToroOpen(false)}
                          className="w-[420px] h-[316px] shrink-0 rounded-2xl overflow-hidden relative group cursor-pointer block"
                        >
                          <img
                            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80"
                            alt="Reserva Tío Toro"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors duration-300" />
                          <div className="relative z-10 flex flex-col justify-end h-full p-4">
                            <h3 className="text-white font-semibold text-sm tracking-wide">Reserva</h3>
                            <p className="text-white/70 text-xs mt-0.5 leading-tight">Asegura tu lugar</p>
                            <span className="mt-2 inline-block text-[11px] font-medium text-white/90 border border-white/30 rounded-full px-3 py-1 w-fit group-hover:bg-white/10 transition-colors">Reservar</span>
                          </div>
                        </a>
                        {/* Redes sociales */}
                        <Link
                          href="/#tio-toro"
                          onClick={() => setIsTioToroOpen(false)}
                          className="w-[420px] h-[316px] shrink-0 rounded-2xl overflow-hidden relative group cursor-pointer block"
                        >
                          <img
                            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80"
                            alt="Redes sociales Tío Toro"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors duration-300" />
                          <div className="relative z-10 flex flex-col justify-end h-full p-4">
                            <h3 className="text-white font-semibold text-sm tracking-wide">Redes sociales</h3>
                            <p className="text-white/70 text-xs mt-0.5 leading-tight">Conéctate con nosotros</p>
                            <span className="mt-2 inline-block text-[11px] font-medium text-white/90 border border-white/30 rounded-full px-3 py-1 w-fit group-hover:bg-white/10 transition-colors">Seguir</span>
                          </div>
                        </Link>
                        {/* Historia */}
                        <Link
                          href="/#tio-toro"
                          onClick={() => setIsTioToroOpen(false)}
                          className="w-[420px] h-[316px] shrink-0 rounded-2xl overflow-hidden relative group cursor-pointer block"
                        >
                          <img
                            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                            alt="Historia Tío Toro"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors duration-300" />
                          <div className="relative z-10 flex flex-col justify-end h-full p-4">
                            <h3 className="text-white font-semibold text-sm tracking-wide">Historia</h3>
                            <p className="text-white/70 text-xs mt-0.5 leading-tight">Conoce nuestro origen</p>
                            <span className="mt-2 inline-block text-[11px] font-medium text-white/90 border border-white/30 rounded-full px-3 py-1 w-fit group-hover:bg-white/10 transition-colors">Descubrir</span>
                          </div>
                        </Link>
                      </div>

                      {/* Botón siguiente (oculto cuando no hay desplazamiento a la derecha) */}
                      <button
                        type="button"
                        onClick={() =>
                          tioToroScrollRef.current?.scrollBy({
                            left: 400,
                            behavior: "smooth",
                          })
                        }
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
              <Link
                href="/#dragon-soul"
                prefetch={false}
                className="text-sm font-medium tracking-wide text-neutral-300 hover:text-white transition-colors"
              >
                Dragon Soul
              </Link>
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
                    {/* Tío Toro */}
                    <a
                      href="https://wa.me/573115329393"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setIsReservationOpen(false)}
                      className="px-4 py-2.5 text-sm font-medium text-[#F5F5F0] hover:text-white hover:bg-white/5 transition-colors text-left"
                    >
                      Tío Toro
                    </a>

                    {/* Dragon Soul */}
                    <a
                      href="https://wa.me/573115329393"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      onClick={() => setIsReservationOpen(false)}
                      className="px-4 py-2.5 text-sm font-medium text-[#F5F5F0] hover:text-white hover:bg-white/5 transition-colors text-left"
                    >
                      Dragon Soul
                    </a>
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
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="focus:outline-none"
              aria-label="Ir a página de inicio Grupo TTDS"
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
            </Link>

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
            {/* Tío Toro móvil — botón con ChevronDown y sub-elementos apilados */}
            <div ref={tioToroMobileTriggerRef}>
              <button
                type="button"
                onClick={() => setIsTioToroOpen((prev) => !prev)}
                aria-expanded={isTioToroOpen}
                className="w-full flex items-center justify-between py-4 text-base font-normal text-white/90 hover:text-white transition-colors border-b border-white/10 focus:outline-none cursor-pointer"
                style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
              >
                Tío Toro
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isTioToroOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isTioToroOpen && (
                <div
                  ref={tioToroMobilePanelRef}
                  className="flex flex-col gap-3 px-3 pt-2 pb-4 border-b border-white/10"
                >
                  {/* Menú */}
                  <Link
                    href="/#tio-toro"
                    onClick={() => { setIsTioToroOpen(false); setIsMobileMenuOpen(false); }}
                    className="relative h-[293px] rounded-2xl overflow-hidden group cursor-pointer block"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
                      alt="Menú Tío Toro"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="relative z-10 flex flex-col justify-end h-full p-5">
                      <h3 className="text-2xl font-normal text-white">Menú</h3>
                      <p className="text-sm text-white/90 mt-1 mb-4">Explora nuestra carta</p>
                      <span className="w-full rounded-full bg-white text-black py-1.5 text-xs font-medium text-center">Ver menú</span>
                    </div>
                  </Link>
                  {/* Galería */}
                  <Link
                    href="/#tio-toro"
                    onClick={() => { setIsTioToroOpen(false); setIsMobileMenuOpen(false); }}
                    className="relative h-[293px] rounded-2xl overflow-hidden group cursor-pointer block"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                      alt="Galería Tío Toro"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="relative z-10 flex flex-col justify-end h-full p-5">
                      <h3 className="text-2xl font-normal text-white">Galería</h3>
                      <p className="text-sm text-white/90 mt-1 mb-4">El sabor en imágenes</p>
                      <span className="w-full rounded-full bg-white text-black py-1.5 text-xs font-medium text-center">Explorar</span>
                    </div>
                  </Link>
                  {/* Reserva */}
                  <a
                    href={tioToroUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { setIsTioToroOpen(false); setIsMobileMenuOpen(false); }}
                    className="relative h-[293px] rounded-2xl overflow-hidden group cursor-pointer block"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80"
                      alt="Reserva Tío Toro"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="relative z-10 flex flex-col justify-end h-full p-5">
                      <h3 className="text-2xl font-normal text-white">Reserva</h3>
                      <p className="text-sm text-white/90 mt-1 mb-4">Tu mesa, sin esperas</p>
                      <span className="w-full rounded-full bg-white text-black py-1.5 text-xs font-medium text-center">Reservar</span>
                    </div>
                  </a>
                  {/* Redes sociales */}
                  <Link
                    href="/#tio-toro"
                    onClick={() => { setIsTioToroOpen(false); setIsMobileMenuOpen(false); }}
                    className="relative h-[293px] rounded-2xl overflow-hidden group cursor-pointer block"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80"
                      alt="Redes sociales Tío Toro"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="relative z-10 flex flex-col justify-end h-full p-5">
                      <h3 className="text-2xl font-normal text-white">Redes sociales</h3>
                      <p className="text-sm text-white/90 mt-1 mb-4">Lo que pasa en Tío Toro</p>
                      <span className="w-full rounded-full bg-white text-black py-1.5 text-xs font-medium text-center">Descubrir</span>
                    </div>
                  </Link>
                  {/* Historia */}
                  <Link
                    href="/#tio-toro"
                    onClick={() => { setIsTioToroOpen(false); setIsMobileMenuOpen(false); }}
                    className="relative h-[293px] rounded-2xl overflow-hidden group cursor-pointer block"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                      alt="Historia Tío Toro"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="relative z-10 flex flex-col justify-end h-full p-5">
                      <h3 className="text-2xl font-normal text-white">Historia</h3>
                      <p className="text-sm text-white/90 mt-1 mb-4">Nacimos para la brasa</p>
                      <span className="w-full rounded-full bg-white text-black py-1.5 text-xs font-medium text-center">Nuestra historia</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#dragon-soul"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-4 text-base font-normal text-white/90 hover:text-white transition-colors border-b border-white/10 focus:outline-none"
              style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
            >
              Dragon Soul
            </Link>

            {/* Botón píldora Reservaciones — flujo natural, justo debajo de Dragon Soul, ancho completo */}
            <div className="pt-6">
              <a
                href="https://wa.me/573115329393"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block rounded-full px-5 py-3 text-sm font-medium bg-white text-[#0A0A0A] hover:bg-neutral-100 transition-colors text-center"
                style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
              >
                Reservaciones
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
