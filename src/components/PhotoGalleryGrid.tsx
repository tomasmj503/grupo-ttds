"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { GalleryPhoto, GalleryVideo } from "@/config/site";
import { PhotoLightbox } from "./PhotoLightbox";

interface PhotoGalleryGridProps {
  photos: GalleryPhoto[];
  /** Videos opcionales: aparecen de primeros en la galería */
  videos?: GalleryVideo[];
  /** Título accesible de la página (no se muestra en pantalla, como en Tao) */
  heading: string;
}

type GalleryEntry =
  | { kind: "video"; video: GalleryVideo }
  /** photoIndex: posición entre las fotos (el video no cuenta), para abrir el visor en la foto correcta */
  | { kind: "photo"; photo: GalleryPhoto; photoIndex: number };

/** Altura relativa al ancho de la columna que ocupa cada elemento (las fotos verticales se ven en 4:5) */
function relativeHeight(entry: GalleryEntry): number {
  if (entry.kind === "video") return entry.video.height / entry.video.width;
  const { width, height } = entry.photo;
  return height > width ? 5 / 4 : height / width;
}

/**
 * Reparte los elementos entre columnas en el orden de la lista, poniendo cada uno en la columna
 * MÁS CORTA en ese momento. Así las columnas terminan casi a la misma altura (sin huecos al final,
 * aunque haya un video muy alto) y las dos marcas quedan mezcladas en todas las columnas.
 */
function distribute(entries: GalleryEntry[], columnCount: number): GalleryEntry[][] {
  const columns: GalleryEntry[][] = Array.from({ length: columnCount }, () => []);
  const heights: number[] = Array.from({ length: columnCount }, () => 0);
  const GAP = 0.06; // separación entre elementos, relativa al ancho de la columna

  entries.forEach((entry) => {
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push(entry);
    heights[shortest] += relativeHeight(entry) + GAP;
  });
  return columns;
}

const TILE_CLASSES = "w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#0C0C0C]";
const TILE_SIZES = "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 400px";

/** Video con portada: no se descarga hasta que se pulsa play */
function GalleryVideoTile({ video }: { video: GalleryVideo }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={`relative ${TILE_CLASSES}`}
      style={{ aspectRatio: `${video.width} / ${video.height}` }}
    >
      {isPlaying ? (
        <video
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          aria-label={video.alt}
          className="absolute inset-0 w-full h-full object-cover bg-black"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label={`Reproducir: ${video.alt}`}
        >
          <Image
            src={video.poster}
            alt={video.alt}
            fill
            sizes={TILE_SIZES}
            className="object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/80 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
              <Play className="w-6 h-6 fill-current ml-1" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

/**
 * Galería estilo TAO, sin textos y con esquinas redondeadas:
 * - móvil (< 768 px): UNA foto por fila en 4:5, con el aire de Tao (10 % de margen, 28 px entre fotos)
 * - tablet: 2 columnas · escritorio (≥ 1024 px): 3 columnas en mosaico
 * Cada foto abre el visor a pantalla completa; el video (si hay) va de primero.
 */
export function PhotoGalleryGrid({ photos, videos = [], heading }: PhotoGalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const entries: GalleryEntry[] = [
    ...videos.map((video) => ({ kind: "video", video }) as const),
    ...photos.map((photo, photoIndex) => ({ kind: "photo", photo, photoIndex }) as const),
  ];

  const renderEntry = (entry: GalleryEntry) => {
    if (entry.kind === "video") {
      return <GalleryVideoTile key={entry.video.src} video={entry.video} />;
    }

    const { photo, photoIndex } = entry;
    return (
      <button
        key={photo.id}
        type="button"
        onClick={() => setLightboxIndex(photoIndex)}
        className={`group block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${TILE_CLASSES}`}
        aria-label={`${photo.alt} - Ver en pantalla completa`}
      >
        {photo.height > photo.width ? (
          // Foto vertical: se muestra en 4:5 (como Tao), no en 2:3
          <span className="relative block w-full aspect-[4/5]">
            <Image
              src={photo.imageUrl}
              alt={photo.alt}
              fill
              sizes={TILE_SIZES}
              style={{ objectPosition: photo.focus }}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </span>
        ) : (
          // Foto horizontal: conserva su proporción
          <Image
            src={photo.imageUrl}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={TILE_SIZES}
            className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
      </button>
    );
  };

  const renderColumns = (columnCount: number) =>
    distribute(entries, columnCount).map((column, columnIndex) => (
      <div key={columnIndex} className="flex-1 min-w-0 flex flex-col gap-6">
        {column.map(renderEntry)}
      </div>
    ));

  return (
    <section className="w-full bg-[#050505] pt-24 sm:pt-28 pb-14 sm:pb-20">
      <h1 className="sr-only">{heading}</h1>

      <div className="max-w-[1375px] mx-auto px-[10%] md:px-8">
        {/* Móvil: un elemento por fila */}
        <div className="md:hidden flex flex-col gap-7">{entries.map(renderEntry)}</div>

        {/* Tablet: 2 columnas */}
        <div className="hidden md:flex lg:hidden gap-6 items-start">{renderColumns(2)}</div>

        {/* Escritorio: 3 columnas */}
        <div className="hidden lg:flex gap-6 items-start">{renderColumns(3)}</div>
      </div>

      <PhotoLightbox photos={photos} index={lightboxIndex} onIndexChange={setLightboxIndex} />
    </section>
  );
}
