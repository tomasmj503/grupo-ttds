import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { MIXED_GALLERY, TIO_TORO_VIDEO } from "@/config/site";

export const metadata: Metadata = {
  title: "Galería | GRUPO TTDS",
  description: "Fotografías de Tío Toro y Dragon Soul: hamburguesas artesanales, sushi y comida asiática.",
};

export default function GalleryPage() {
  return (
    <SiteShell>
      <PhotoGalleryGrid
        photos={MIXED_GALLERY}
        video={TIO_TORO_VIDEO}
        heading="Galería de Tío Toro y Dragon Soul"
      />
    </SiteShell>
  );
}
