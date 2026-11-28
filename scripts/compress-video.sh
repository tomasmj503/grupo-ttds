#!/usr/bin/env bash
# Comprime un video para la galería y saca su portada.
#
# Uso:
#   scripts/compress-video.sh <video-original> <nombre-sin-extension> [segundo-de-la-portada]
#
# Ejemplo:
#   scripts/compress-video.sh ~/Desktop/video.mp4 la-pizzeria-video 9
#
# Genera public/videos/<nombre>.mp4 (720 px de ancho, H.264, sin metadatos, listo para
# reproducirse mientras carga) y public/videos/<nombre>-poster.jpg (la portada).
# Al final imprime el bloque `video: { ... }` para pegar en el archivo del restaurante.
# Requisito: ffmpeg (brew install ffmpeg). Variable opcional OUT_DIR para cambiar la carpeta de salida.
set -euo pipefail

if [ "$#" -lt 2 ]; then
  sed -n '2,12p' "$0"
  exit 1
fi
command -v ffmpeg >/dev/null || { echo "Falta ffmpeg. Instalar con: brew install ffmpeg"; exit 1; }

INPUT="$1"
NAME="$2"
POSTER_SECOND="${3:-3}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="${OUT_DIR:-$ROOT/public/videos}"
mkdir -p "$OUT_DIR"

ffmpeg -hide_banner -loglevel error -y -i "$INPUT" -map_metadata -1 -vf "scale=720:-2" \
  -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 96k "$OUT_DIR/$NAME.mp4"

ffmpeg -hide_banner -loglevel error -y -ss "$POSTER_SECOND" -i "$INPUT" -frames:v 1 \
  -vf "scale=720:-2" -q:v 3 -map_metadata -1 "$OUT_DIR/$NAME-poster.jpg"

# (ffmpeg -i sin archivo de salida termina con error a propósito: solo se lee su descripción)
SIZE=$(ffmpeg -hide_banner -i "$OUT_DIR/$NAME.mp4" 2>&1 | grep -oE ' [0-9]{3,4}x[0-9]{3,4}' | head -1 | tr -d ' ' || true)
WIDTH="${SIZE%x*}"
HEIGHT="${SIZE#*x}"
MB=$(du -k "$OUT_DIR/$NAME.mp4" | cut -f1)

echo "Listo: $OUT_DIR/$NAME.mp4 ($((MB / 1024)),$((MB % 1024 * 10 / 1024)) MB) y $NAME-poster.jpg"
echo
echo "Pega esto en el archivo del restaurante:"
echo
echo "  video: {"
echo "    src: \"/videos/$NAME.mp4\","
echo "    poster: \"/videos/$NAME-poster.jpg\","
echo "    width: $WIDTH,"
echo "    height: $HEIGHT,"
echo "    alt: \"DESCRIBIR EL VIDEO\","
echo "  },"
