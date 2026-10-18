#!/usr/bin/env python3
"""
convert_images.py
-----------------
Builds responsive WebP and AVIF variants from source photos.

For every source image in src/assets/ it writes, into public/images/:

  webp/<stem>-480w.webp   webp/<stem>-800w.webp   webp/<stem>-1200w.webp
  avif/<stem>-480w.avif   avif/<stem>-800w.avif   avif/<stem>-1200w.avif

  webp/<stem>.webp        avif/<stem>.avif        (= largest width, so
                                                  existing plain-URL
                                                  references keep working)

Pipeline per image:
  1. Pillow decodes the source once, applies EXIF rotation (phone photos),
     and downscales to each target width with LANCZOS. Each resized frame is
     written to a temp PNG; the full-size decode is released before the next
     image.
  2. cwebp and avifenc encode the temp PNGs.
  3. Targets wider than the source are skipped (never upscale). If the source
     is narrower than every target, only the source width is produced.
  4. Outputs newer than the source are skipped, so re-running is cheap.

Why resizing matters more than quality: a 4000px phone photo shown at ~600px
on screen wastes most of its bytes. Encoding at the target size is the
biggest single saving; quality settings only trim the rest.

Requirements:
  pip install pillow
  sudo apt-get install -y webp libavif-bin     (provides cwebp, avifenc)

Usage:
  python3 convert_images.py
"""

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageOps

# ── config ────────────────────────────────────────────────────────────────────
INPUT_DIR    = Path("src/assets")
OUT_ROOT     = Path("public/images")
WEBP_DIR     = OUT_ROOT / "webp"
AVIF_DIR     = OUT_ROOT / "avif"

WIDTHS       = [480, 800, 1200]   # target widths in px; match the sizes you render at
WEBP_QUALITY = 82                 # 0-100
AVIF_QUALITY = 60                 # avifenc quality 0-100 (higher = better; 60 is fine for photos)
AVIF_JOBS    = "1"                # avifenc threads; keep 1 to limit RAM on small machines

SUPPORTED = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp"}
# ──────────────────────────────────────────────────────────────────────────────


def check_tools():
    missing = [t for t in ("cwebp", "avifenc") if shutil.which(t) is None]
    if missing:
        print(f"ERROR: missing tools: {', '.join(missing)}")
        print("Install with:  sudo apt-get install -y webp libavif-bin")
        sys.exit(1)


def run(cmd: list, label: str) -> bool:
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ✗ {label} failed:\n{result.stderr.strip()}")
        return False
    return True


def target_widths(source_width: int) -> list[int]:
    """Widths to produce for this source. Never upscales."""
    widths = {w for w in WIDTHS if w < source_width}
    # Always include the largest size the source can give, so a 600px source
    # still produces one usable file.
    widths.add(min(max(WIDTHS), source_width))
    return sorted(widths)


def is_fresh(out: Path, src: Path) -> bool:
    return out.exists() and out.stat().st_mtime >= src.stat().st_mtime


def build_outputs(src: Path, tmp: Path):
    """Decode once, write one temp PNG per target width."""
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)   # honor phone rotation metadata
        mode = "RGBA" if "A" in im.getbands() else "RGB"
        im = im.convert(mode)
        src_w, src_h = im.size
        widths = target_widths(src_w)

        frames = []
        for w in widths:
            if w == src_w:
                frame = im
            else:
                h = round(src_h * w / src_w)
                frame = im.resize((w, h), Image.LANCZOS)
            png = tmp / f"{src.stem}-{w}.png"
            frame.save(png, format="PNG")
            frames.append((w, png))

    return src_w, frames


def convert(src: Path, index: int, total: int, tmp: Path):
    print(f"\n── Image {index}/{total} ──────────────────────────────────────")
    print(f"[{src.name}]  ({src.stat().st_size / 1024:.0f} KB original)")

    src_w, frames = build_outputs(src, tmp)
    largest = max(w for w, _ in frames)
    srcset_webp, srcset_avif = [], []

    for w, png in frames:
        suffix = "" if w == largest else f"-{w}w"   # largest also gets the plain name
        webp_out = WEBP_DIR / f"{src.stem}{suffix}.webp"
        avif_out = AVIF_DIR / f"{src.stem}{suffix}.avif"

        if is_fresh(webp_out, src):
            print(f"  · skip  {webp_out.name} (up to date)")
        elif run(["cwebp", "-q", str(WEBP_QUALITY), str(png), "-o", str(webp_out)], "cwebp"):
            print(f"  ✓ webp  {webp_out.name}  {webp_out.stat().st_size / 1024:.0f} KB")

        if is_fresh(avif_out, src):
            print(f"  · skip  {avif_out.name} (up to date)")
        elif run(["avifenc", "--jobs", AVIF_JOBS, "-q", str(AVIF_QUALITY), str(png), str(avif_out)], "avifenc"):
            print(f"  ✓ avif  {avif_out.name}  {avif_out.stat().st_size / 1024:.0f} KB")

        srcset_webp.append(f"/images/webp/{webp_out.name} {w}w")
        srcset_avif.append(f"/images/avif/{avif_out.name} {w}w")

    print(f"  srcset (webp): {', '.join(srcset_webp)}")
    print(f"  srcset (avif): {', '.join(srcset_avif)}")


def main():
    check_tools()

    if not INPUT_DIR.exists():
        INPUT_DIR.mkdir(parents=True)
        print(f"Created '{INPUT_DIR}/' — drop your images there and re-run.")
        return

    WEBP_DIR.mkdir(parents=True, exist_ok=True)
    AVIF_DIR.mkdir(parents=True, exist_ok=True)

    images = sorted(f for f in INPUT_DIR.iterdir() if f.suffix.lower() in SUPPORTED)
    if not images:
        print(f"No images found in '{INPUT_DIR}/'. Add some and re-run.")
        return

    print(f"Found {len(images)} image(s) in '{INPUT_DIR}/'")
    print(f"Widths: {WIDTHS}  |  WebP q={WEBP_QUALITY}  |  AVIF q={AVIF_QUALITY}")

    errors = []
    with tempfile.TemporaryDirectory() as tmp_name:
        tmp = Path(tmp_name)
        for i, img_path in enumerate(images, 1):
            try:
                convert(img_path, i, len(images), tmp)
            except Exception as e:
                print(f"  ✗ ERROR: {e}")
                errors.append(img_path.name)
            finally:
                for leftover in tmp.glob("*.png"):
                    leftover.unlink()   # free disk before the next image

    print(f"\n{'=' * 60}")
    print(f"Finished: {len(images) - len(errors)}/{len(images)} converted.")
    if errors:
        print(f"Failed ({len(errors)}): {', '.join(errors)}")


if __name__ == "__main__":
    main()
