import { defineBrand } from "../define-brand";

/**
 * Tío Toro. Para dar de alta un restaurante nuevo, copiar este archivo (ver ARCHITECTURE.md).
 * Fotos: public/images/tio-toro/tio-toro-NN.jpg · Logo: public/logos/tio-toro.svg
 */
export const tioToro = defineBrand({
  id: "tio-toro",
  name: "Tío Toro",
  shortDescription: "Hamburguesas artesanales",
  locationLabel: "Normandía, Bogotá",
  logo: { src: "/logos/tio-toro.svg", width: 1265, height: 394 },
  // Enlace de VISTA de Canva (los canva.link cortos redirigen al editor)
  menuUrl: "https://www.canva.com/design/DAETKN_Z2zg/oi4-ki_Y7c_P4qmPUksl0A/view",
  whatsappReserveText: "Hola, deseo hacer una reservación para Tío Toro",
  googlePlaceId: "ChIJDSp8XjqbP44RBXHQ7XVjoSQ",
  coordinates: { latitude: 4.6696475, longitude: -74.1049872 },
  instagramUrl: "https://www.instagram.com/tiotoroburger/",
  tiktokUrl: "https://www.tiktok.com/@tiotoroburger",
  facebookUrl: "https://www.facebook.com/profile.php?id=100063583748803",
  history: { tagline: "Nacimos para la brasa" },

  // Foto de cada tarjeta del menú desplegable (todas con la hamburguesa a la vista)
  navCardPhotos: {
    menu: { file: 2, position: "center 100%" },
    galeria: { file: 6, position: "center 100%" },
    reserva: { file: 4, position: "center 100%" },
    redes: { file: 5, position: "center 100%" },
    historia: { file: 3, position: "center 100%" },
    ubicacion: { file: 1, position: "center 100%" },
  },

  // Todas las fotos, en el orden de su galería
  photos: [
    { file: 1, alt: "Hamburguesa doble con tocineta y queso - Tío Toro", focus: "center 90%" },
    { file: 2, alt: "Hamburguesa doble con queso cheddar fundido - Tío Toro", focus: "center 90%" },
    { file: 3, alt: "Hamburguesa con queso en ambiente nocturno - Tío Toro", focus: "center 90%" },
    { file: 4, alt: "Armando una hamburguesa con tocineta y queso - Tío Toro", focus: "center 90%" },
    { file: 5, alt: "Hamburguesa con huevo y queso - Tío Toro", focus: "center 90%" },
    { file: 6, alt: "Hamburguesa con huevo servida en plato esmaltado - Tío Toro", focus: "center 90%" },
  ],

  // Video de la galería: así se arma una hamburguesa
  video: {
    src: "/videos/tio-toro-video.mp4",
    poster: "/videos/tio-toro-video-poster.jpg",
    width: 720,
    height: 1280,
    alt: "Video: así se arma una hamburguesa en Tío Toro",
  },
});
