import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { getBrandGallery } from "@/config/site";

export const metadata: Metadata = {
  title: "Galería Dragon Soul | GRUPO TTDS",
  description: "Fotografías de Dragon Soul: sushi y comida asiática en Normandía, Bogotá.",
};

export default function DragonSoulGalleryPage() {
  return (
    <SiteShell>
      <PhotoGalleryGrid photos={getBrandGallery("dragon-soul")} heading="Galería de Dragon Soul" />
    </SiteShell>
  );
}
