# Plantilla de sitio para grupos de restaurantes

Sitio web hecho para **Grupo TTDS** (Tío Toro y Dragon Soul, en Normandía, Bogotá) y diseñado como **plantilla**: sirve para cualquier grupo de 1 a 4 restaurantes. Agregar un restaurante nuevo es crear **un archivo de datos** y sumar sus fotos; no hace falta tocar ningún componente.

El estilo toma como referencia [Tao Group](https://taogroup.com): fondo negro, mucha fotografía y casi ningún texto sobre las imágenes.

## Qué incluye

- **Home** (`/`): portada con un botón de logo por restaurante que abre su menú (Canva), carrusel de fotos que se mueve solo, sección de eventos privados y footer.
- **Galerías**: una por restaurante (`/<restaurante>/galeria`) y una mezclada (`/galeria`). Aceptan fotos y video.
- **Menú desplegable** por restaurante: Menú, Galería, Reserva (WhatsApp), Redes sociales, Historia y Ubicación (Google Maps, Waze y reseñas).
- **Reservas** por WhatsApp con el mensaje ya escrito para cada restaurante.
- **Scripts** para preparar fotos y videos nuevos (`scripts/`).

## Tecnología

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · Framer Motion · Lucide.

> Esta versión de Next.js tiene cambios respecto a lo que suele conocerse. Antes de programar, consultar la documentación incluida en `node_modules/next/dist/docs/` (ver `AGENTS.md`).

## Cómo correrlo

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run lint     # revisión de código
npm run build    # compilación de producción (la misma que hace el despliegue)
```

Antes de subir cambios: `npx tsc --noEmit`, `npm run lint` y `npm run build` deben terminar sin errores.

## Agregar un restaurante

1. Preparar sus fotos: `python3 scripts/prepare-photos.py <carpeta-con-fotos> <id> --darken`
2. Guardar su logo (SVG) en `public/logos/<id>.svg`.
3. Copiar `src/config/brands/tio-toro.ts` como `src/config/brands/<id>.ts` y completar sus datos.
4. Añadirlo a la lista en `src/config/brands/index.ts`.
5. Reiniciar `npm run dev`.

Con eso aparece solo en la barra de navegación, el hero, el carrusel, el footer, el modal de reservas, su propia galería y la galería mezclada. Los pasos completos están en [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Usarla para otro grupo

Copiar el proyecto, cambiar los datos del grupo en `src/config/site.ts`, reemplazar los restaurantes en `src/config/brands/` y sustituir las imágenes de `public/`. La lista de pasos está en la sección «Usar la plantilla para otro grupo» de [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Despliegue

El repositorio está conectado a **Vercel** a través de GitHub: cada `git push` a `main` despliega el sitio automáticamente.
