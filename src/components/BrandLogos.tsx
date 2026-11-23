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
      className={`inline-flex flex-col items-start leading-none select-none ${className}`}
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
 * Logo oficial provisional de TÍO TORO
 * Brasa viva, cortes artesanales y estética de steakhouse contemporáneo de lujo.
 */
export function LogoTioToro({ className = "h-8 w-auto text-[#F5F5F0]" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 260 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tío Toro Logo"
    >
      {/* Emblema Toro & Brasa */}
      <g stroke="#C8A97E" strokeWidth="1.2">
        {/* Cornamenta geométrica estilizada */}
        <path
          d="M14 20C18 32 30 42 34 46C38 42 50 32 54 20"
          strokeLinecap="square"
          fill="none"
        />
        <path
          d="M12 18C15 15 22 17 26 23"
          strokeLinecap="square"
        />
        <path
          d="M56 18C53 15 46 17 42 23"
          strokeLinecap="square"
        />
        {/* Fuego / Brasa central */}
        <path
          d="M34 26C31 31 32 35 34 37C36 35 37 31 34 26Z"
          fill="#C8A97E"
          stroke="none"
        />
        {/* Línea horizontal base */}
        <line x1="20" y1="52" x2="48" y2="52" strokeWidth="1" stroke="#9A9A95" opacity="0.6" />
      </g>

      {/* Tipografía Editorial Tío Toro */}
      <text
        x="72"
        y="37"
        fill="currentColor"
        fontSize="21"
        letterSpacing="0.18em"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontWeight="600"
      >
        TÍO TORO
      </text>

      <text
        x="74"
        y="51"
        fill="#C8A97E"
        fontSize="7"
        letterSpacing="0.28em"
        fontFamily="var(--font-jakarta), 'Plus Jakarta Sans', sans-serif"
        fontWeight="500"
      >
        BURGER & BRASA · NORMANDÍA
      </text>
    </svg>
  );
}

/**
 * Logo oficial provisional de DRAGON SOUL
 * Alta cocina asiática, sushi bar y lounge nocturno con estética de dragón zen contemporáneo.
 */
export function LogoDragonSoul({ className = "h-8 w-auto text-[#F5F5F0]" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 260 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Dragon Soul Logo"
    >
      {/* Emblema Dragón Ensō Zen */}
      <g>
        {/* Círculo Ensō parcial minimalista */}
        <path
          d="M34 10C21 10 11 20 11 32C11 44 21 54 34 54C42 54 50 49 54 42"
          stroke="#C8A97E"
          strokeWidth="1.3"
          strokeLinecap="square"
          fill="none"
        />
        {/* Cola / Columna del Dragón místico */}
        <path
          d="M26 38C26 27 34 22 41 22C46 22 49 25 49 28C49 33 42 35 34 35C29 35 24 37 24 43C24 47 28 50 33 50"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="square"
          fill="none"
        />
        {/* Esfera de perla / alma luminosa */}
        <circle cx="44" cy="18" r="2.5" fill="#C8A97E" />
      </g>

      {/* Tipografía Editorial Dragon Soul */}
      <text
        x="72"
        y="37"
        fill="currentColor"
        fontSize="20"
        letterSpacing="0.18em"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontWeight="600"
      >
        DRAGON SOUL
      </text>

      <text
        x="74"
        y="51"
        fill="#C8A97E"
        fontSize="7"
        letterSpacing="0.28em"
        fontFamily="var(--font-jakarta), 'Plus Jakarta Sans', sans-serif"
        fontWeight="500"
      >
        SUSHI BAR & LOUNGE
      </text>
    </svg>
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
