import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { BRAND_ORDER, SITE, findBrand, getBrandGallery, type BrandKey } from "@/config/site";

type GalleryPageProps = { params: Promise<{ brand: string }> };

// Solo existen las galerías de los restaurantes configurados; cualquier otra ruta da 404
export const dynamicParams = false;

export function generateStaticParams() {
  return BRAND_ORDER.map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: GalleryPageProps): Promise<Metadata> {
  const { brand: brandId } = await params;
  const brand = findBrand(brandId);
  if (!brand) return {};

  return {
    title: `Galería ${brand.name} | ${SITE.name}`,
    description: `Fotografías de ${brand.name}: ${brand.shortDescription.toLowerCase()} en ${brand.locationLabel}.`,
  };
}

export default async function BrandGalleryPage({ params }: GalleryPageProps) {
  const { brand: brandId } = await params;
  const brand = findBrand(brandId);
  if (!brand) notFound();

  return (
    <SiteShell>
      <PhotoGalleryGrid
        photos={getBrandGallery(brand.id as BrandKey)}
        videos={brand.video ? [brand.video] : []}
        heading={`Galería de ${brand.name}`}
      />
    </SiteShell>
  );
}
