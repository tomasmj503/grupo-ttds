import { SiteShell } from "@/components/SiteShell";
import { HeroVideo } from "@/components/HeroVideo";
import { MarqueeGallery } from "@/components/MarqueeGallery";
import { SpecialEventsSection } from "@/components/SpecialEventsSection";

export default function HomePage() {
  return (
    <SiteShell>
      {/* 1. Hero a pantalla completa con los logos que abren cada menú */}
      <HeroVideo />

      {/* 2. Anclas de navegación por restaurante */}
      <div id="tio-toro" />

      {/* 3. Galería Marquee infinita con visor */}
      <MarqueeGallery />

      <div id="dragon-soul" />

      {/* 4. Bloque de Eventos Especiales */}
      <SpecialEventsSection />
    </SiteShell>
  );
}
