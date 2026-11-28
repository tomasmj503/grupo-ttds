"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HomeLinkProps {
  className?: string;
  ariaLabel: string;
  /** Se ejecuta al hacer clic (p. ej. para cerrar el menú móvil) */
  onNavigate?: () => void;
  children: React.ReactNode;
}

/**
 * Enlace al inicio. Desde otra página navega al home (que abre arriba del todo);
 * si ya se está en el home, sube suavemente hasta el principio.
 */
export function HomeLink({ className, ariaLabel, onNavigate, children }: HomeLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (pathname === "/") {
      event.preventDefault();
      // En el siguiente cuadro, para que ya se haya cerrado el menú móvil (que bloquea el scroll)
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
  };

  return (
    <Link href="/" onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
