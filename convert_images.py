#!/usr/bin/env python3
"""
convert_images.py
-----------------
Compresses and converts images to WebP and AVIF using native CLI tools.
No image pixels are loaded into Python memory — each tool runs as its
own subprocess and exits, keeping RAM usage minimal.

Required tools (install once):
  sudo apt-get install -y webp libavif-bin

Outputs:
  output_webp/  → compressed .webp files
  output_avif/  → compressed .avif files
"""

import subprocess
import sys
from pathlib import Path

# ── config ────────────────────────────────────────────────────────────────────
INPUT_DIR    = Path("src/assets")
WEBP_DIR     = Path("output_webp")
AVIF_DIR     = Path("output_avif")

WEBP_QUALITY = 82   # 0-100
AVIF_QUALITY = 60   # 0-63 for avifenc (lower = smaller file)

SUPPORTED = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".webp"}
# ─────────────────────────────────────────────────────────────────────────────


def check_tools():
    missing = []
    for tool in ("cwebp", "avifenc"):
        result = subprocess.run(["which", tool], capture_output=True)
        if result.returncode != 0:
            missing.append(tool)
    if missing:
        print(f"ERROR: missing tools: {', '.join(missing)}")
        print("Install with:  sudo apt-get install -y webp libavif-bin")
        sys.exit(1)


def run(cmd: list, label: str) -> bool:
    """Run a CLI command, print output, return True on success."""
    print(f"  → running    {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ✗ {label} failed:\n{result.stderr.strip()}")
        return False
    if result.stderr.strip():
        # cwebp/avifenc print stats to stderr even on success
        for line in result.stderr.strip().splitlines():
            print(f"             {line}")
    return True


def convert(src: Path, index: int, total: int):
    orig_kb = src.stat().st_size / 1024
    print(f"\n── Image {index}/{total} ──────────────────────────────────────")
    print(f"[{src.name}]  ({orig_kb:.1f} KB)")

    stem = src.stem

    # --- WebP via cwebp ---
    webp_path = WEBP_DIR / f"{stem}.webp"
    print(f"  → encoding   WebP (quality={WEBP_QUALITY}) ...")
    ok = run(
        ["cwebp", "-q", str(WEBP_QUALITY), str(src), "-o", str(webp_path)],
        "cwebp"
    )
    if ok:
        webp_kb = webp_path.stat().st_size / 1024
        print(f"  ✓ webp saved {webp_path.name}  ({webp_kb:.1f} KB, {webp_kb/orig_kb*100:.0f}% of original)")
    else:
        webp_kb = 0

    # --- AVIF via avifenc ---
    avif_path = AVIF_DIR / f"{stem}.avif"
    print(f"  → encoding   AVIF (quality={AVIF_QUALITY}) ...")
    ok = run(
        ["avifenc", "--jobs", "1", "-q", str(AVIF_QUALITY), str(src), str(avif_path)],
        "avifenc"
    )
    if ok:
        avif_kb = avif_path.stat().st_size / 1024
        print(f"  ✓ avif saved {avif_path.name}  ({avif_kb:.1f} KB, {avif_kb/orig_kb*100:.0f}% of original)")
    else:
        avif_kb = 0

    if webp_kb and avif_kb:
        print(f"  ✓ done       original={orig_kb:.1f} KB → webp={webp_kb:.1f} KB | avif={avif_kb:.1f} KB")


def main():
    check_tools()

    if not INPUT_DIR.exists():
        INPUT_DIR.mkdir()
        print(f"Created '{INPUT_DIR}/' — drop your images there and re-run.")
        return

    WEBP_DIR.mkdir(exist_ok=True)
    AVIF_DIR.mkdir(exist_ok=True)

    images = sorted(f for f in INPUT_DIR.iterdir() if f.suffix.lower() in SUPPORTED)
    if not images:
        print(f"No images found in '{INPUT_DIR}/'. Add some and re-run.")
        return

    print(f"Found {len(images)} image(s) in '{INPUT_DIR}/'")
    print(f"Output → WebP: '{WEBP_DIR}/'  |  AVIF: '{AVIF_DIR}/'")
    print(f"Tools  → cwebp (quality={WEBP_QUALITY})  |  avifenc (quality={AVIF_QUALITY})")

    errors = []
    for i, img_path in enumerate(images, 1):
        try:
            convert(img_path, i, len(images))
        except Exception as e:
            print(f"  ✗ ERROR: {e}")
            errors.append(img_path.name)

    print(f"\n{'='*60}")
    print(f"Finished: {len(images) - len(errors)}/{len(images)} converted.")
    if errors:
        print(f"Failed ({len(errors)}): {', '.join(errors)}")


if __name__ == "__main__":
    main()
