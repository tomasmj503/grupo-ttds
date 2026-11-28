"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, X } from "lucide-react";
import {
  getBrandNavCardAction,
  type BrandConfig,
  type BrandNavCard as BrandNavCardData,
} from "@/config/site";
import { InstagramIcon, TikTokIcon, FacebookIcon, WazeIcon } from "./BrandLogos";

export type BrandNavCardVariant = "desktop" | "mobile";

interface BrandNavCardProps {
  brand: BrandConfig;
  card: BrandNavCardData;
  variant: BrandNavCardVariant;
  /** Se llama al hacer clic en una tarjeta que navega (para cerrar los menús) */
  onNavigate?: () => void;
}

// Tamaño y forma de la tarjeta según el contexto (panel horizontal vs. acordeón vertical)
const WRAPPER_CLASSES: Record<BrandNavCardVariant, string> = {
  desktop:
    "w-[420px] h-[316px] shrink-0 rounded-2xl overflow-hidden relative group cursor-pointer block",
  mobile: "relative h-[293px] rounded-2xl overflow-hidden group cursor-pointer block",
};

function CardFace({
  brand,
  card,
  variant,
}: Pick<BrandNavCardProps, "brand" | "card" | "variant">) {
  const copy = card[variant];

  return (
    <>
      <Image
        src={card.imageUrl}
        alt={`${card.title} ${brand.name}`}
        fill
        sizes={variant === "desktop" ? "420px" : "(max-width: 768px) 100vw, 420px"}
        style={{
          objectPosition:
            (variant === "mobile" && card.imagePositionMobile) || card.imagePosition || "center",
        }}
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {variant === "desktop" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:opacity-75 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col justify-end h-full p-4">
            <h3 className="text-white font-semibold text-sm tracking-wide">{card.title}</h3>
            <p className="text-white/70 text-xs mt-0.5 leading-tight">{copy.subtitle}</p>
            <span className="mt-2 inline-block text-[11px] font-medium text-white/90 border border-white/30 rounded-full px-3 py-1 w-fit group-hover:bg-white/10 transition-colors">
              {copy.cta}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full p-5">
            <h3 className="text-2xl font-normal text-white">{card.title}</h3>
            <p className="text-sm text-white/90 mt-1 mb-4">{copy.subtitle}</p>
            <span className="w-full rounded-full bg-white text-black py-1.5 text-xs font-medium text-center">
              {copy.cta}
            </span>
          </div>
        </>
      )}
    </>
  );
}

const SOCIAL_LINK_CLASSES =
  "w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors";

function SocialOverlay({ brand, onClose }: { brand: BrandConfig; onClose: () => void }) {
  const networks = [
    { label: "Instagram", href: brand.instagramUrl, Icon: InstagramIcon },
    { label: "TikTok", href: brand.tiktokUrl, Icon: TikTokIcon },
    { label: "Facebook", href: brand.facebookUrl, Icon: FacebookIcon },
  ].filter((network): network is { label: string; href: string; Icon: typeof InstagramIcon } =>
    Boolean(network.href)
  );

  return (
    <div className="absolute inset-0 z-30 bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-center gap-5 p-5 text-center cursor-default">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 p-2 text-white/70 hover:text-white transition-colors cursor-pointer focus:outline-none"
        aria-label="Cerrar redes sociales"
      >
        <X className="w-5 h-5" />
      </button>

      <p className="text-white font-semibold text-sm tracking-wide">Síguenos en redes</p>

      <div className="flex items-start justify-center gap-5">
        {networks.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} de ${brand.name}`}
            className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <span className={SOCIAL_LINK_CLASSES}>
              <Icon className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-medium">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function LocationOverlay({ brand, onClose }: { brand: BrandConfig; onClose: () => void }) {
  const options = [
    { label: "Google Maps", href: brand.googleMapsUrl, Icon: MapPin },
    { label: "Waze", href: brand.wazeUrl, Icon: WazeIcon },
    { label: "Reseñas", href: brand.googleReviewsUrl, Icon: Star },
  ];

  return (
    <div className="absolute inset-0 z-30 bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-center gap-5 p-5 text-center cursor-default">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 p-2 text-white/70 hover:text-white transition-colors cursor-pointer focus:outline-none"
        aria-label="Cerrar ubicación"
      >
        <X className="w-5 h-5" />
      </button>

      <p className="text-white font-semibold text-sm tracking-wide">Cómo llegar</p>

      <div className="flex items-start justify-center gap-5">
        {options.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} de ${brand.name}`}
            className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <span className={SOCIAL_LINK_CLASSES}>
              <Icon className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-medium">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function HistoryOverlay({ brand, onClose }: { brand: BrandConfig; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-30 bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-center gap-3 p-6 text-center cursor-default">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 p-2 text-white/70 hover:text-white transition-colors cursor-pointer focus:outline-none"
        aria-label="Cerrar historia"
      >
        <X className="w-5 h-5" />
      </button>

      <p className="text-white font-semibold text-sm tracking-wide">Historia</p>
      {/* Si el restaurante no tiene historia (brand.history.text), se muestra un texto provisional */}
      <p className="text-white/70 text-xs leading-relaxed max-w-[260px]">
        {brand.history?.text ?? `Muy pronto compartiremos aquí la historia de ${brand.name}.`}
      </p>
    </div>
  );
}

export function BrandNavCard({ brand, card, variant, onNavigate }: BrandNavCardProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const action = getBrandNavCardAction(brand, card.id);
  const face = <CardFace brand={brand} card={card} variant={variant} />;

  if (action.type === "internal") {
    return (
      <Link href={action.href} onClick={onNavigate} className={WRAPPER_CLASSES[variant]}>
        {face}
      </Link>
    );
  }

  if (action.type === "external") {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={WRAPPER_CLASSES[variant]}
      >
        {face}
      </a>
    );
  }

  // Tarjetas que muestran contenido sobre sí mismas (Redes sociales, Historia)
  const closeOverlay = () => setOverlayOpen(false);

  return (
    <div className={WRAPPER_CLASSES[variant]}>
      {face}
      <button
        type="button"
        onClick={() => setOverlayOpen(true)}
        className="absolute inset-0 z-20 cursor-pointer focus:outline-none"
        aria-label={`${card.title} ${brand.name}`}
        aria-expanded={overlayOpen}
      />
      {overlayOpen &&
        (action.overlay === "social" ? (
          <SocialOverlay brand={brand} onClose={closeOverlay} />
        ) : action.overlay === "location" ? (
          <LocationOverlay brand={brand} onClose={closeOverlay} />
        ) : (
          <HistoryOverlay brand={brand} onClose={closeOverlay} />
        ))}
    </div>
  );
}
