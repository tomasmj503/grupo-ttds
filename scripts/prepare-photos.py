#!/usr/bin/env python3
"""
Prepara las fotos de un restaurante para el sitio.

Uso:
    python3 scripts/prepare-photos.py <carpeta-con-fotos> <id-del-restaurante> [opciones]

Ejemplo:
    python3 scripts/prepare-photos.py ~/Desktop/fotos-pizzeria la-pizzeria --darken

Qué hace con cada foto (JPG, PNG o HEIC de iPhone):
  - La gira según su orientación real y la reduce a 1800 px por el lado largo.
  - La guarda como public/images/<id>/<id>-NN.jpg (calidad 82, progresiva).
  - Elimina los metadatos de cámara (los HEIC pueden traer ubicación GPS).
  - Con --darken, oscurece las fotos muy claras (exposición, curva y viñeteado suave) para que
    combinen con un sitio de fondo negro.
Al final imprime las líneas listas para pegar en `photos:` del archivo del restaurante.

Opciones:
    --start N    número con el que empieza la numeración (por defecto: el siguiente libre)
    --darken     oscurece las fotos claras
    --out DIR    carpeta de salida (por defecto: public/images/<id>)

Requisitos: Python 3 con Pillow (pip3 install pillow). Para HEIC hace falta macOS (usa `sips`).
"""
import argparse
import os
import re
import subprocess
import sys
import tempfile

try:
    from PIL import Image, ImageChops, ImageOps, ImageStat
except ImportError:
    sys.exit("Falta Pillow. Instalar con: pip3 install pillow")

MAX_SIDE = 1800
QUALITY = 82
BRIGHT_THRESHOLD = 85   # brillo medio (0-255) a partir del cual una foto se considera clara
TARGET_BRIGHTNESS = 66  # brillo medio al que se lleva una foto clara con --darken
EXTENSIONS = (".jpg", ".jpeg", ".png", ".heic")


def mean_brightness(image):
    thumb = image.copy()
    thumb.thumbnail((400, 400))
    return ImageStat.Stat(thumb.convert("L")).mean[0]


def vignette(size, strength):
    gradient = Image.radial_gradient("L").resize(size, Image.BILINEAR)
    mask = gradient.point(lambda v: int(255 * (1 - strength * ((v / 255) ** 1.6))))
    return mask.convert("RGB")


def apply_grade(image, exposure, gamma, strength):
    table = [min(255, int(255 * (((i / 255) * exposure) ** gamma) + 0.5)) for i in range(256)]
    return ImageChops.multiply(image.point(table * 3), vignette(image.size, strength))


def darken(image, current):
    """Baja la exposición y busca la curva que deja la foto en el brillo objetivo."""
    exposure = 0.72 if current > 120 else 0.85 if current > 95 else 0.92
    strength = 0.30 if current > 95 else 0.24
    preview = image.copy()
    preview.thumbnail((400, 400))
    low, high = 1.0, 3.0
    for _ in range(18):
        gamma = (low + high) / 2
        if mean_brightness(apply_grade(preview, exposure, gamma, strength)) > TARGET_BRIGHTNESS:
            low = gamma
        else:
            high = gamma
    return apply_grade(image, exposure, (low + high) / 2, strength)


def load(path, workdir):
    if path.lower().endswith(".heic"):
        converted = os.path.join(workdir, os.path.basename(path) + ".jpg")
        subprocess.run(["sips", "-s", "format", "jpeg", path, "--out", converted],
                       check=True, capture_output=True)
        path = converted
    return ImageOps.exif_transpose(Image.open(path)).convert("RGB")


def main():
    parser = argparse.ArgumentParser(description="Prepara las fotos de un restaurante para el sitio.")
    parser.add_argument("source", help="carpeta con las fotos originales")
    parser.add_argument("brand_id", help="id del restaurante (minúsculas y guiones), p. ej. la-pizzeria")
    parser.add_argument("--start", type=int, help="número inicial de la numeración")
    parser.add_argument("--darken", action="store_true", help="oscurece las fotos claras")
    parser.add_argument("--out", help="carpeta de salida (por defecto public/images/<id>)")
    args = parser.parse_args()

    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", args.brand_id):
        sys.exit("El id debe tener solo minúsculas, números y guiones (p. ej. la-pizzeria).")

    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_dir = args.out or os.path.join(root, "public", "images", args.brand_id)
    os.makedirs(out_dir, exist_ok=True)

    files = sorted(
        f for f in os.listdir(args.source)
        if f.lower().endswith(EXTENSIONS) and not f.startswith(".")
    )
    if not files:
        sys.exit(f"No encontré fotos (jpg, png o heic) en {args.source}")

    if args.start is not None:
        number = args.start
    else:
        taken = [int(m.group(1)) for f in os.listdir(out_dir)
                 if (m := re.fullmatch(rf"{re.escape(args.brand_id)}-(\d+)\.jpg", f))]
        number = max(taken, default=0) + 1

    lines = []
    print(f"{'archivo nuevo':<28}{'original':<42}{'brillo':>7}")
    with tempfile.TemporaryDirectory() as workdir:
        for name in files:
            image = load(os.path.join(args.source, name), workdir)
            brightness = mean_brightness(image)
            note = ""
            if brightness >= BRIGHT_THRESHOLD:
                if args.darken:
                    image = darken(image, brightness)
                    note = f"  oscurecida → {mean_brightness(image):.0f}"
                else:
                    note = "  CLARA (usar --darken)"
            image.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
            target = f"{args.brand_id}-{number:02d}.jpg"
            image.save(os.path.join(out_dir, target), "JPEG", quality=QUALITY,
                       optimize=True, progressive=True)  # sin metadatos
            width, height = image.size
            print(f"{target:<28}{name[:40]:<42}{brightness:>7.0f}{note}")
            size_part = "" if (width, height) == (1200, 1800) else f", size: [{width}, {height}]"
            lines.append(f'    {{ file: {number}, alt: "DESCRIBIR FOTO {number}"{size_part} }},')
            number += 1

    print(f"\nListo: {len(files)} fotos en {out_dir}")
    print("\nPega esto dentro de `photos: [ ... ]` del archivo del restaurante y escribe cada descripción:\n")
    print("\n".join(lines))


if __name__ == "__main__":
    main()
