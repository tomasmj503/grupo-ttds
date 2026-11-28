"use client";

import React from "react";
import Link from "next/link";
import {
  GROUP_INFO,
  getWhatsAppUrl,
} from "@/config/site";
import {
  LogoGrupoTTDS,
  ToroIcon,
  DragonIcon,
} from "./BrandLogos";

interface FooterProps {
  onOpenReservation?: () => void;
  onOpenMobileMenu?: () => void;
}

export function Footer({
  onOpenReservation,
  onOpenMobileMenu,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleRestaurantsClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768 && onOpenMobileMenu) {
      onOpenMobileMenu();
      return;
    }

    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.location.href = "/#";
      }
    }
  };

  const contactUrl = getWhatsAppUrl(GROUP_INFO.whatsappNumber, GROUP_INFO.contactMessage);
  const pqrsUrl = getWhatsAppUrl(GROUP_INFO.whatsappNumber, GROUP_INFO.pqrsMessage);

  const linkClassName =
    "text-xs sm:text-[13px] text-white hover:text-white/75 transition-colors duration-300 flex items-center justify-center cursor-pointer focus:outline-none";

  return (
    <footer
      className="w-full bg-[#1E1D1C] pt-14 pb-12 sm:pb-16 text-[#F5F5F0]"
      style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full flex flex-col items-center text-center">
        {/* Logo Grupo TTDS - arriba del todo */}
        <Link
          href="/"
          className="group focus:outline-none mb-11"
          aria-label="Ir al inicio de Grupo TTDS"
        >
          <LogoGrupoTTDS className="h-8 sm:h-10 w-auto text-white group-hover:text-white/75 transition-colors duration-300" />
        </Link>

        {/* Pila vertical de enlaces centrados - muy juntos */}
        <nav className="w-full flex flex-col items-center gap-1.5 mb-6" aria-label="Enlaces principales de pie de página">
          {/* 1. Restaurantes */}
          <button
            type="button"
            onClick={handleRestaurantsClick}
            className={linkClassName}
          >
            Restaurantes
          </button>

          {/* 2. Galería */}
          <Link
            href="/#galeria-editorial"
            prefetch={false}
            className={linkClassName}
          >
            Galería
          </Link>

          {/* 3. Reservas */}
          <button
            type="button"
            onClick={onOpenReservation}
            className={linkClassName}
          >
            Reservas
          </button>

          {/* 4. Contáctanos */}
          <a
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Contáctanos
          </a>

          {/* 5. PQRS */}
          <a
            href={pqrsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Pqrs
          </a>
        </nav>

        {/* Línea elegante debajo de PQRS */}
        <div className="w-40 sm:w-56 h-[1px] bg-white/15 mx-auto mt-1.5 mb-4" aria-hidden="true" />

        {/* Bloques de iconos de marcas - compacto y simétrico */}
        <div className="w-full flex items-center justify-center gap-4 mt-2.5" aria-hidden="true">
          {/* Tío Toro - mitad izquierda */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-white/20 rounded-lg shrink-0">
            <ToroIcon className="w-9 h-9 sm:w-10 sm:h-10 text-white/80" />
          </div>

          {/* Dragon Soul - mitad derecha */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-white/20 rounded-lg shrink-0">
            <DragonIcon className="w-9 h-9 sm:w-10 sm:h-10 text-white/80" />
          </div>
        </div>

        {/* Cierre inferior: solo copyright */}
        <p className="text-[9px] sm:text-[10px] text-white/70 mt-6">
          © {currentYear} Grupo TTDS. Todos los derechos reservados · Bogotá, Colombia
        </p>
      </div>
    </footer>
  );
}
