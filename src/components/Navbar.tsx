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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#161616]/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4 max-w-7xl mx-auto">
        {/* Izquierda: Logo Grupo TTDS */}
        <Link
          href="/"
          className="flex items-center shrink-0 focus:outline-none"
          aria-label="Ir a página de inicio Grupo TTDS"
        >
          <LogoGrupoTTDS className="h-9 w-auto shrink-0 text-[#FFFFFF]" />
        </Link>

        {/* Derecha: Botón de reservaciones píldora y menú de 3 líneas horizontales */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={onOpenReservation}
            className="bg-white text-[#161616] rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap shadow-sm hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Reservations
          </button>

          <button
            type="button"
            onClick={onOpenReservation}
            aria-label="Menú de navegación"
            className="w-7 h-5 flex flex-col justify-between items-end cursor-pointer focus:outline-none"
          >
            <span className="h-[2px] w-full bg-white block" />
            <span className="h-[2px] w-full bg-white block" />
            <span className="h-[2px] w-full bg-white block" />
          </button>
        </div>
      </div>
    </header>
  );
}
