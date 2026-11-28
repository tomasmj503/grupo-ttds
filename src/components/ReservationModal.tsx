"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { BRANDS, GROUP_INFO, getWhatsAppUrl } from "@/config/site";
import { BrandWordmark } from "./BrandWordmark";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  // Manejo de tecla Escape y bloqueo de scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onClose]);

  const tioToroUrl = getWhatsAppUrl(
    GROUP_INFO.whatsappNumber,
    BRANDS["tio-toro"].whatsappReserveText
  );

  const dragonSoulUrl = getWhatsAppUrl(
    GROUP_INFO.whatsappNumber,
    BRANDS["dragon-soul"].whatsappReserveText
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop con desenfoque de lujo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Caja del Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#0C0C0C] border border-white/15 p-6 sm:p-10 rounded-none shadow-2xl z-10 text-center"
          >
            {/* Botón de cierre minimalista */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#9A9A95] hover:text-[#F5F5F0] p-2 border border-transparent hover:border-white/15 transition-all duration-300"
              aria-label="Cerrar modal de reservación"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Encabezado Editorial */}
            <div className="mb-8">
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.28em] text-white/70 font-medium block mb-2">
                RESERVACIONES EXCLUSIVAS
              </span>
              <h2
                id="modal-title"
                className="font-serif text-3xl sm:text-4xl text-[#F5F5F0] font-normal tracking-wide"
              >
                Selecciona tu Experiencia
              </h2>
              <div className="w-10 h-[1px] bg-white/30 mx-auto my-3" />
              <p className="text-[#9A9A95] text-xs sm:text-sm font-sans tracking-wide leading-relaxed max-w-sm mx-auto">
                Atención directa y personalizada vía WhatsApp oficial para coordinar tu mesa y ocasión especial.
              </p>
            </div>

            {/* Opciones de Restaurantes */}
            <div className="space-y-4 text-left">
              {/* Opción Tío Toro */}
              <a
                href={tioToroUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group relative block p-5 sm:p-6 bg-white/[0.02] border border-white/10 hover:border-white/70 transition-all duration-500 rounded-none overflow-hidden"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <BrandWordmark brandId="tio-toro" size="modal" />
                    <p className="text-[11px] text-[#9A9A95] tracking-[0.14em] font-sans mt-2">
                      Hamburguesas artesanales
                    </p>
                  </div>
                  <div className="w-10 h-10 border border-white/10 group-hover:border-white group-hover:bg-white text-[#9A9A95] group-hover:text-[#050505] flex items-center justify-center transition-all duration-500 shrink-0">
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </a>

              {/* Opción Dragon Soul */}
              <a
                href={dragonSoulUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group relative block p-5 sm:p-6 bg-white/[0.02] border border-white/10 hover:border-white/70 transition-all duration-500 rounded-none overflow-hidden"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <BrandWordmark brandId="dragon-soul" size="modal" />
                    <p className="text-[11px] text-[#9A9A95] tracking-[0.14em] font-sans mt-2">
                      Sushi y comida asiática
                    </p>
                  </div>
                  <div className="w-10 h-10 border border-white/10 group-hover:border-white group-hover:bg-white text-[#9A9A95] group-hover:text-[#050505] flex items-center justify-center transition-all duration-500 shrink-0">
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

