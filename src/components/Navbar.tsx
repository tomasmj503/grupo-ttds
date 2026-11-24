"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { LogoGrupoTTDS } from "./BrandLogos";
import { BRANDS, GROUP_INFO, getWhatsAppUrl } from "@/config/site";

interface NavbarProps {
  onOpenReservation?: () => void;
}

export function Navbar({ onOpenReservation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#050505] border-b transition-all duration-300 ${isScrolled
          ? "border-white/10"
          : "border-transparent"
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
              <Link
                href="/#tio-toro"
                prefetch={false}
                className="text-sm font-medium tracking-wide text-neutral-300 hover:text-white transition-colors"
              >
                Tío Toro
              </Link>
              <Link
                href="/#dragon-soul"
                prefetch={false}
                className="text-sm font-medium tracking-wide text-neutral-300 hover:text-white transition-colors"
              >
                Dragon Soul
              </Link>
            </nav>

            {/* Contenedor relativo del botón píldora blanco y menú desplegable */}
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
          className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col md:hidden animate-in fade-in duration-200"
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
            <Link
              href="/#tio-toro"
              prefetch={false}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-4 text-base font-normal text-white/90 hover:text-white transition-colors border-b border-white/10 focus:outline-none"
              style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
            >
              Tío Toro
            </Link>

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
