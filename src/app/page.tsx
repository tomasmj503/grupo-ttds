"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroVideo } from "@/components/HeroVideo";
import { MarqueeGallery } from "@/components/MarqueeGallery";
import { Footer } from "@/components/Footer";
import { ReservationModal } from "@/components/ReservationModal";

export default function HomePage() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F0] flex flex-col selection:bg-[#C8A97E] selection:text-[#050505]">
      {/* 1. Barra de Navegación Fija Editorial */}
      <Navbar onOpenReservation={() => setIsReservationOpen(true)} />

      {/* 2. Hero Video a Pantalla Completa con Logos a Menú Canva */}
      <main className="flex-1 flex flex-col">
        <HeroVideo />

        {/* 3. Galería Marquee Infinita hacia la Derecha con Lightbox */}
        <MarqueeGallery />
      </main>

      {/* 4. Pie de Página Inteligente */}
      <Footer onOpenReservation={() => setIsReservationOpen(true)} />

      {/* 5. Modal de Reservaciones para Tío Toro & Dragon Soul */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}
