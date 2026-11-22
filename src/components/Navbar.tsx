"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LogoGrupoTTDS } from "./BrandLogos";

interface NavbarProps {
  onOpenReservation: () => void;
}

export function Navbar({ onOpenReservation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ease-out ${
        isScrolled
          ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3 sm:py-4 shadow-2xl"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-transparent py-4 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Izquierda: Logo Grupo TTDS */}
        <Link
          href="/"
          className="flex items-center shrink-0 group focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
          aria-label="Ir a página de inicio Grupo TTDS"
        >
          <LogoGrupoTTDS className="h-6 sm:h-8 w-auto text-[#F5F5F0] group-hover:text-[#C8A97E] transition-colors duration-500" />
        </Link>

        {/* Derecha: Únicamente los 3 ítems tanto en desktop como en móvil */}
        <nav
          className="flex items-center gap-2 sm:gap-6 md:gap-8 shrink-0"
          aria-label="Navegación principal"
        >
          {/* 1. Tío Toro */}
          <Link
            href="/tio-toro"
            className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#F5F5F0] hover:text-[#C8A97E] transition-colors duration-500 py-2 px-1 sm:px-2 min-h-[44px] flex items-center whitespace-nowrap"
          >
            Tío Toro
          </Link>

          {/* 2. Dragon Soul */}
          <Link
            href="/dragon-soul"
            className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#F5F5F0] hover:text-[#C8A97E] transition-colors duration-500 py-2 px-1 sm:px-2 min-h-[44px] flex items-center whitespace-nowrap"
          >
            Dragon Soul
          </Link>

          {/* 3. Botón Elegante Reservas */}
          <button
            type="button"
            onClick={onOpenReservation}
            className="text-[10px] sm:text-xs font-sans font-medium uppercase tracking-[0.16em] sm:tracking-[0.22em] px-2.5 sm:px-4 py-1.5 sm:py-2 border border-[#C8A97E] text-[#C8A97E] hover:bg-[#C8A97E] hover:text-[#050505] transition-all duration-500 rounded-none whitespace-nowrap min-h-[38px] sm:min-h-[44px] flex items-center justify-center cursor-pointer shadow-sm"
          >
            Reservas
          </button>
        </nav>
      </div>
    </header>
  );
}

