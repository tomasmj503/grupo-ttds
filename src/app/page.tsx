import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/Hero";
import { MarqueeGallery } from "@/components/MarqueeGallery";
import { SpecialEventsSection } from "@/components/SpecialEventsSection";

export default function HomePage() {
  return (
    <SiteShell>
      {/* 1. Hero a pantalla completa con los logos que abren cada menú */}
      <Hero />

      {/* 2. Galería Marquee infinita con visor */}
      <MarqueeGallery />

      {/* 3. Bloque de Eventos Especiales */}
      <SpecialEventsSection />
    </SiteShell>
  );
}
