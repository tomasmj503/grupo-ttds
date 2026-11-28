import React from "react";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

/**
 * Logo oficial de GRUPO TTDS
 * Estética editorial de lujo. Blanco puro (#FFFFFF), sin dorados.
 * TTDS arriba en Cormorant Garamond, GRUPO debajo en espaciado sutil.
 */
export function LogoGrupoTTDS({
  className = "h-10 w-auto shrink-0",
}: LogoProps) {
  return (
    <span
      className={`inline-flex flex-col items-center leading-none select-none ${className}`}
      aria-label="Grupo TTDS"
    >
      {/* TTDS — tipografía editorial Cormorant */}
      <span
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
          fontWeight: 500,
          fontSize: "1.35rem",
          letterSpacing: "0.14em",
          color: "#FFFFFF",
          lineHeight: 1,
        }}
      >
        TTDS
      </span>
      {/* GRUPO — subtítulo muy sutil */}
      <span
        style={{
          fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: "10px",
          letterSpacing: "0.28em",
          color: "#FFFFFF",
          lineHeight: 1,
          marginTop: "3px",
        }}
      >
        GRUPO
      </span>
    </span>
  );
}

/**
 * Ícono vectorial minimalista de Instagram con trazo fino editorial
 */
export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/**
 * Ícono vectorial de TikTok con el mismo trazo fino que InstagramIcon
 */
export function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

/**
 * Ícono de Waze (burbuja con ojos, sonrisa y ruedas) con el mismo trazo fino que InstagramIcon.
 * Es un dibujo estilizado, no el logo oficial.
 */
export function WazeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3C7.6 3 4 6.3 4 10.5c0 1.7.6 3.3 1.6 4.5-.2 1.3-.8 2.2-1.6 2.9 1.7 0 3.1-.5 4.1-1.3 1.2.5 2.6.8 3.9.8 4.4 0 8-3.3 8-7.5S16.4 3 12 3z" />
      <path d="M9.3 9.6h.01M14.7 9.6h.01" strokeWidth="2.4" />
      <path d="M9.2 12.6c.8.9 1.7 1.3 2.8 1.3s2-.4 2.8-1.3" />
      <circle cx="9" cy="19.4" r="1.3" />
      <circle cx="15" cy="19.4" r="1.3" />
    </svg>
  );
}

/**
 * Ícono vectorial de Facebook con el mismo trazo fino que InstagramIcon
 */
export function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
