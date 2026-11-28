import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { BRAND_LIST, MIXED_GALLERY, MIXED_GALLERY_VIDEOS, SITE } from "@/config/site";

const brandNames = BRAND_LIST.map((brand) => brand.name);

export const metadata: Metadata = {
  title: `Galería | ${SITE.name}`,
  description: `Fotografías de ${brandNames.join(" y ")}.`,
};

export default function GalleryPage() {
  return (
    <SiteShell>
      <PhotoGalleryGrid
        photos={MIXED_GALLERY}
        videos={MIXED_GALLERY_VIDEOS}
        heading={`Galería de ${brandNames.join(" y ")}`}
      />
    </SiteShell>
  );
}
