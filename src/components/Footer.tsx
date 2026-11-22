"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BRANDS,
  GROUP_INFO,
  getWhatsAppUrl,
  BrandKey,
} from "@/config/site";
import {
  LogoGrupoTTDS,
  LogoTioToro,
  LogoDragonSoul,
  InstagramIcon,
} from "./BrandLogos";

interface FooterProps {
  activeBrand?: BrandKey;
  onOpenReservation?: () => void;
}

export function Footer({ activeBrand, onOpenReservation }: FooterProps) {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Links para el Home (sin activeBrand)
  const homeLinks = [
    { label: "Tío Toro", href: "/tio-toro", isAction: false },
    { label: "Dragon Soul", href: "/dragon-soul", isAction: false },
    { label: "Reservas", href: "#reservas", isAction: true, onClick: onOpenReservation },
    {
      label: "Contáctanos",
      href: getWhatsAppUrl(GROUP_INFO.whatsappNumber, GROUP_INFO.contactMessage),
      isAction: false,
      isExternal: true,
    },
    {
      label: "PQRS",
      href: getWhatsAppUrl(GROUP_INFO.whatsappNumber, GROUP_INFO.pqrsMessage),
      isAction: false,
      isExternal: true,
    },
  ];

  // Links específicos para una marca individual (preparado para Fase 2)
  const brand = activeBrand ? BRANDS[activeBrand] : null;
  const brandLinks = brand
    ? [
        { label: "Menú", href: brand.menuUrl, isExternal: true },
        { label: "Galería", href: "#galeria", isExternal: false },
        { label: "Reservas", href: "#reservas", isAction: true, onClick: onOpenReservation },
        { label: "Redes", href: brand.instagramUrl, isExternal: true },
        { label: "Google Review", href: brand.googleReviewsUrl, isExternal: true },
        {
          label: "Contáctanos",
          href: getWhatsAppUrl(GROUP_INFO.whatsappNumber, GROUP_INFO.contactMessage),
          isExternal: true,
        },
        { label: "Cómo llegar", href: brand.googleMapsUrl, isExternal: true },
        {
          label: "PQRS",
          href: getWhatsAppUrl(GROUP_INFO.whatsappNumber, GROUP_INFO.pqrsMessage),
          isExternal: true,
        },
      ]
    : [];

  const activeLinks = activeBrand ? brandLinks : homeLinks;

  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 pt-16 sm:pt-24 pb-12 sm:pb-16 text-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        {/* Enlaces de Navegación Centrados con Espaciado de Lujo */}
        <nav
          className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-12 mb-12 sm:mb-16"
          aria-label="Enlaces de pie de página"
        >
          {activeLinks.map((link, idx) => {
            if ("isAction" in link && link.isAction) {
              return (
                <button
                  key={`${link.label}-${idx}`}
                  type="button"
                  onClick={link.onClick || onOpenReservation}
                  className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#9A9A95] hover:text-[#C8A97E] transition-colors duration-500 cursor-pointer min-h-[44px] flex items-center"
                >
                  {link.label}
                </button>
              );
            }

            if ("isExternal" in link && link.isExternal) {
              return (
                <a
                  key={`${link.label}-${idx}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#9A9A95] hover:text-[#C8A97E] transition-colors duration-500 min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              );
            }

            return (
              <Link
                key={`${link.label}-${idx}`}
                href={link.href}
                className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#9A9A95] hover:text-[#C8A97E] transition-colors duration-500 min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Separador fino de revista */}
        <div className="w-16 h-[1px] bg-white/10 mb-12 sm:mb-14" />

        {/* Logo Grupo TTDS Centrado */}
        <div className="mb-10 sm:mb-12">
          <Link
            href="/"
            className="inline-block group focus:outline-none"
            aria-label="Ir al inicio de Grupo TTDS"
          >
            <LogoGrupoTTDS className="h-9 sm:h-11 w-auto text-[#F5F5F0] group-hover:text-[#C8A97E] transition-colors duration-700" />
          </Link>
        </div>

        {/* Fila alineada con los dos logos del mismo tamaño acompañados de su ícono de Instagram */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 pb-12 sm:pb-16 w-full max-w-2xl border-b border-white/5">
          {/* Tío Toro + Instagram */}
          <div className="flex items-center gap-4">
            <Link
              href="/tio-toro"
              className="group focus:outline-none"
              aria-label="Ir a la página de Tío Toro"
            >
              <LogoTioToro className="h-7 sm:h-8 w-auto text-[#F5F5F0] group-hover:text-[#C8A97E] transition-colors duration-500" />
            </Link>
            <a
              href={BRANDS["tio-toro"].instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/10 hover:border-[#C8A97E] text-[#9A9A95] hover:text-[#C8A97E] transition-all duration-500 rounded-none bg-white/[0.02]"
              aria-label="Instagram oficial de Tío Toro"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="hidden sm:block w-[1px] h-6 bg-white/10" />

          {/* Dragon Soul + Instagram */}
          <div className="flex items-center gap-4">
            <Link
              href="/dragon-soul"
              className="group focus:outline-none"
              aria-label="Ir a la página de Dragon Soul"
            >
              <LogoDragonSoul className="h-7 sm:h-8 w-auto text-[#F5F5F0] group-hover:text-[#C8A97E] transition-colors duration-500" />
            </Link>
            <a
              href={BRANDS["dragon-soul"].instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/10 hover:border-[#C8A97E] text-[#9A9A95] hover:text-[#C8A97E] transition-all duration-500 rounded-none bg-white/[0.02]"
              aria-label="Instagram oficial de Dragon Soul"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Barra Legal y Créditos Inferiores */}
        <div className="pt-8 w-full flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#9A9A95]/60 tracking-[0.2em] uppercase font-sans gap-3">
          <p>© {currentYear} {GROUP_INFO.name}. TODOS LOS DERECHOS RESERVADOS.</p>
          <p>NORMANDÍA · BOGOTÁ, COLOMBIA</p>
        </div>
      </div>
    </footer>
  );
}
