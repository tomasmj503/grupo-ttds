import { defineBrand } from "../define-brand";

/**
 * Dragon Soul.
 * Fotos: public/images/dragon-soul/dragon-soul-NN.jpg · Logo: public/logos/dragon-soul.svg
 */
export const dragonSoul = defineBrand({
  id: "dragon-soul",
  name: "Dragon Soul",
  shortDescription: "Sushi y comida asiática",
  locationLabel: "Normandía, Bogotá",
  logo: { src: "/logos/dragon-soul.svg", width: 344, height: 165 },
  // Enlace de VISTA de Canva (los canva.link cortos redirigen al editor)
  menuUrl: "https://www.canva.com/design/DAGsIjI-nY8/zWSS-138yvWEIDUidsKRUA/view#2",
  whatsappReserveText: "Hola, deseo hacer una reservación para Dragon Soul",
  googlePlaceId: "ChIJPZgtQgCbP44RbTocJKH2akk",
  coordinates: { latitude: 4.6694404, longitude: -74.104773 },
  instagramUrl: "https://www.instagram.com/dragonsoulco/",
  tiktokUrl: "https://www.tiktok.com/@dragonsoulco",
  // Sin Facebook: el botón no aparece. Para agregarlo: facebookUrl: "https://..."
  history: { tagline: "El alma del dragón" },

  navCardPhotos: {
    menu: { file: 4, position: "center 60%" },
    galeria: { file: 3, position: "center 30%" },
    reserva: { file: 17, position: "center 15%" },
    redes: { file: 15, position: "center 40%" },
    historia: { file: 18, position: "center 55%" },
    ubicacion: { file: 13, position: "center 50%" },
  },

  // Todas las fotos, en el orden de su galería.
  // carousel: false = solo en las galerías (la 09 es horizontal; la 13 es de la barra).
  photos: [
    { file: 4, alt: "Rolls de sushi con topping dorado y ajonjolí negro - Dragon Soul", focus: "center 60%" },
    { file: 3, alt: "Letrero de neón del dragón - Dragon Soul", focus: "center 35%" },
    { file: 2, alt: "Bowl de ramen en tazón oscuro - Dragon Soul", focus: "center 75%" },
    { file: 12, alt: "Rolls fritos sobre plato alargado - Dragon Soul", focus: "center 50%" },
    { file: 16, alt: "Letrero de neón Spicy Ramen - Dragon Soul", focus: "center 55%" },
    { file: 7, alt: "Rolls con aguacate y topping cremoso - Dragon Soul", focus: "center 90%", size: [1012, 1800] },
    { file: 1, alt: "Chef cortando un roll de sushi - Dragon Soul", focus: "center 40%" },
    { file: 17, alt: "Lámparas colgantes en el ambiente de Dragon Soul", focus: "center 20%" },
    { file: 13, alt: "Barra de Dragon Soul con copas y utensilios - Dragon Soul", focus: "center 40%", carousel: false },
    { file: 8, alt: "Ramen con carne, huevo y cebollín - Dragon Soul", focus: "center 55%", size: [1012, 1800] },
    { file: 15, alt: "Chef sosteniendo un roll con palillos - Dragon Soul", focus: "center 62%" },
    { file: 14, alt: "Chef con delantal naranja sirviendo sushi - Dragon Soul", focus: "center 45%" },
    { file: 18, alt: "Estatua de Buda en la decoración de Dragon Soul", focus: "center 60%" },
    { file: 10, alt: "Rolls y fritos sobre pizarra - Dragon Soul", focus: "center 85%", size: [1012, 1800] },
    { file: 9, alt: "Rolls y fritos sobre pizarra frente a un mural de pagoda - Dragon Soul", size: [1800, 1013], carousel: false },
    { file: 11, alt: "Rolls dorados sobre plato blanco - Dragon Soul", focus: "center 85%", size: [1012, 1800] },
    { file: 5, alt: "Preparación de rolls fritos con palillos - Dragon Soul", focus: "center 60%" },
    { file: 6, alt: "Corte de un roll frito - Dragon Soul", focus: "center 55%" },
  ],
});
