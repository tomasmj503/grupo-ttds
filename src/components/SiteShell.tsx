"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ReservationModal } from "./ReservationModal";

/**
 * Marco común de todas las páginas: barra de navegación, pie de página y modal de reservas.
 * Mantiene el estado del menú móvil y del modal para que Navbar y Footer se comuniquen.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F0] flex flex-col selection:bg-[#F5F5F0] selection:text-[#050505]">
      <Navbar
        onOpenReservation={() => setIsReservationOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuChange={setIsMobileMenuOpen}
      />

      <main className="flex-1 flex flex-col">{children}</main>

      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}
