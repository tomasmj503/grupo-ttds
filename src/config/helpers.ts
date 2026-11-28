/**
 * Funciones auxiliares para armar rutas y enlaces. No dependen de los datos de ningún restaurante.
 */

/** Ruta de una foto local: /images/<restaurante>/<restaurante>-NN.jpg */
export function getBrandPhoto(brandId: string, file: number): string {
  return `/images/${brandId}/${brandId}-${String(file).padStart(2, "0")}.jpg`;
}

/** Ruta de la galería propia de un restaurante */
export function getBrandGalleryPath(brandId: string): string {
  return `/${brandId}/galeria`;
}

/** Abre la ficha exacta del local en Google Maps */
export function googleMapsPlaceUrl(placeId: string): string {
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}

/** Abre directamente la lista de opiniones de Google del local */
export function googleReviewsPageUrl(placeId: string): string {
  return `https://search.google.com/local/reviews?placeid=${placeId}`;
}

/** Inicia la navegación en Waze hacia unas coordenadas */
export function wazeNavigateUrl(latitude: number, longitude: number): string {
  return `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes&zoom=17`;
}

/** URL de WhatsApp con mensaje prellenado */
export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
