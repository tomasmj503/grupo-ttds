# GRUPO TTDS

Sitio web de **Grupo TTDS**, que reúne a dos restaurantes en Normandía, Bogotá:

- **Tío Toro** — hamburguesas artesanales.
- **Dragon Soul** — sushi y comida asiática.

El diseño toma como referencia el estilo editorial y nocturno de [Tao Group](https://taogroup.com): fondo negro, mucha fotografía y casi ningún texto sobre las imágenes.

## Qué tiene

- **Home** (`/`): hero con los logos que abren cada menú (Canva), carrusel de fotos que se mueve solo, sección de eventos privados y footer.
- **Galerías**: `/tio-toro/galeria`, `/dragon-soul/galeria` y `/galeria` (las dos mezcladas). La de Tío Toro y la mezclada incluyen un video.
- **Menú desplegable** de cada restaurante: Menú, Galería, Reserva (WhatsApp), Redes sociales, Historia y Ubicación (Google Maps, Waze y reseñas).
- **Reservas** por WhatsApp con el mensaje ya escrito para cada restaurante.

## Tecnología

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · Framer Motion · Lucide.

> Esta versión de Next.js tiene cambios respecto a lo que suele conocerse. Antes de programar, consultar la documentación incluida en `node_modules/next/dist/docs/` (ver `AGENTS.md`).

## Cómo correrlo

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run lint     # revisión de código
npm run build    # compilación de producción (la misma que hace el despliegue)
npm run start    # sirve la compilación de producción
```

Antes de subir cambios conviene correr `npx tsc --noEmit`, `npm run lint` y `npm run build`: los tres deben terminar sin errores.

## Despliegue

El repositorio está conectado a **Vercel** a través de GitHub. Cada `git push` a `main` despliega el sitio automáticamente; no hace falta hacer nada más.

## Dónde cambiar las cosas

Casi todo el contenido (textos, enlaces, redes, fotos, orden de las galerías, video, número de WhatsApp) está en un solo archivo: [`src/config/site.ts`](src/config/site.ts).

La guía completa de cómo está hecho el sitio y de cómo cambiar cada cosa está en [`ARCHITECTURE.md`](ARCHITECTURE.md).
