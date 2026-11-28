import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { getBrandGallery, getBrandGalleryVideo } from "@/config/site";

export const metadata: Metadata = {
  title: "Galería Tío Toro | GRUPO TTDS",
  description: "Fotografías de Tío Toro: hamburguesas artesanales en Normandía, Bogotá.",
};

export default function TioToroGalleryPage() {
  return (
    <SiteShell>
      <PhotoGalleryGrid
        photos={getBrandGallery("tio-toro")}
        video={getBrandGalleryVideo("tio-toro")}
        heading="Galería de Tío Toro"
      />
    </SiteShell>
  );
}
