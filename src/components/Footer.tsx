"use client";

import React from "react";
import Link from "next/link";
import {
  BRAND_ORDER,
  BRANDS,
  GROUP_INFO,
  getWhatsAppUrl,
} from "@/config/site";
import { GroupLogo } from "./BrandLogos";
import { BrandWordmark } from "./BrandWordmark";
import { HomeLink } from "./HomeLink";

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
        {/* Logo del grupo - arriba del todo */}
        <HomeLink
          className="group focus:outline-none mb-11"
          ariaLabel={`Ir al inicio de ${GROUP_INFO.displayName}`}
        >
          <GroupLogo className="h-8 sm:h-10 w-auto text-white group-hover:text-white/75 transition-colors duration-300" />
        </HomeLink>

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
            href="/galeria"
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

        {/* Logos de los restaurantes - mismo ancho, centrados */}
        <div className="w-full flex items-center justify-center gap-8 sm:gap-12 mt-5">
          {BRAND_ORDER.map((brandId) => (
            <a
              key={brandId}
              href={BRANDS[brandId].instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram de ${BRANDS[brandId].name}`}
              className="transition-opacity duration-300 hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
            >
              <BrandWordmark brandId={brandId} size="footer" />
            </a>
          ))}
        </div>

        {/* Cierre inferior: solo copyright */}
        <p className="text-[9px] sm:text-[10px] text-white/70 mt-6">
          © {currentYear} {GROUP_INFO.displayName}. Todos los derechos reservados · {GROUP_INFO.location}
        </p>
      </div>
    </footer>
  );
}
