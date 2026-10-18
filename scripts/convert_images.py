#!/usr/bin/env python3
"""
convert_images.py
-----------------
Builds responsive WebP and AVIF variants from source photos.

Default (site images, e.g. hero):
  python3 convert_images.py
  Input:  src/assets/            Output: public/images/{webp,avif}/

Gallery (drop photos in a folder, run one command):
  python3 convert_images.py --gallery
  Input:  src/assets/gallery/    Output: public/images/gallery/{webp,avif}/
          Manifest: src/data/gallery.json (read by the Gallery component)

For every source image it writes these variants:

  webp/<stem>-480w.webp   webp/<stem>-800w.webp   webp/<stem>-1200w.webp
  avif/<stem>-480w.avif   avif/<stem>-800w.avif   avif/<stem>-1200w.avif

  webp/<stem>.webp        avif/<stem>.avif        (= largest width, so plain
                                                  references keep working)

Gallery alt text:
  - Optional sidecar file with the same name: birthday.jpg + birthday.txt
    The first line of the .txt is used as alt text.
  - Otherwise the alt text is built from the filename:
      "01-birthday-rooftop.jpg" -> "Birthday rooftop"
  - Leading numbers are used for ordering only. Zero-pad them (01, 02, ..., 40)
    so they sort correctly.

Pipeline per image:
  1. Pillow decodes the source once, applies EXIF rotation (phone photos), and
     downscales to each target width with LANCZOS. Each resized frame is written
     to a temp PNG. The full-size decode is released before the next image.
  2. cwebp and avifenc encode the temp PNGs.
  3. Targets wider than the source are skipped (never upscale). If the source is
     narrower than every target, only the source width is produced.
  4. Outputs newer than the source are skipped, so re-running is cheap.

Requirements:
  pip install pillow
  sudo apt-get install -y webp libavif-bin     (provides cwebp, avifenc)
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageOps

# ── config ────────────────────────────────────────────────────────────────────
PUBLIC_DIR   = Path("public")
SITE_INPUT   = Path("src/assets")
SITE_OUTPUT  = Path("public/images")

GALLERY_INPUT    = Path("src/assets/gallery")
GALLERY_OUTPUT   = Path("public/images/gallery")
GALLERY_MANIFEST = Path("src/data/gallery.json")

WIDTHS       = [480, 800, 1200]   # target widths in px; match the sizes you render at
WEBP_QUALITY = 82                 # 0-100
AVIF_QUALITY = 60                 # avifenc quality 0-100 (60 is fine for photos)
AVIF_JOBS    = "1"                # avifenc threads; keep 1 to limit RAM

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
    # Always include the largest size the source can give.
    widths.add(min(max(WIDTHS), source_width))
    return sorted(widths)


def is_fresh(out: Path, src: Path) -> bool:
    return out.exists() and out.stat().st_mtime >= src.stat().st_mtime


def build_outputs(src: Path, tmp: Path):
    """Decode once, write one temp PNG per target width.
    Returns (source_width, source_height, frames) where frames is [(w, png)]."""
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

    return src_w, src_h, frames


def alt_from_filename(stem: str) -> str:
    """'01-birthday-rooftop' -> 'Birthday rooftop'"""
    name = re.sub(r"^\d+[-_ ]*", "", stem)          # drop ordering prefix
    name = re.sub(r"[-_]+", " ", name).strip()
    return name[:1].upper() + name[1:] if name else stem


def read_alt(src: Path) -> str:
    sidecar = src.with_suffix(".txt")
    if sidecar.exists():
        lines = [l.strip() for l in sidecar.read_text(encoding="utf-8").splitlines() if l.strip()]
        if lines:
            return lines[0]
    return alt_from_filename(src.stem)


def public_path(p: Path) -> str:
    """Path relative to public/, for use as a URL segment (no leading slash)."""
    return p.relative_to(PUBLIC_DIR).as_posix()


def convert(src: Path, index: int, total: int, tmp: Path, webp_dir: Path, avif_dir: Path):
    """Converts one source image. Returns a manifest entry, or None on failure."""
    print(f"\n── Image {index}/{total} ──────────────────────────────────────")
    print(f"[{src.name}]  ({src.stat().st_size / 1024:.0f} KB original)")

    try:
        src_w, src_h, frames = build_outputs(src, tmp)
    except Exception as e:
        print(f"  ✗ ERROR: {e}")
        return None

    largest = max(w for w, _ in frames)
    entry = {"id": src.stem, "alt": read_alt(src), "webp": [], "avif": []}

    for w, png in frames:
        suffix = "" if w == largest else f"-{w}w"   # largest also gets the plain name
        webp_out = webp_dir / f"{src.stem}{suffix}.webp"
        avif_out = avif_dir / f"{src.stem}{suffix}.avif"

        if is_fresh(webp_out, src):
            print(f"  · skip  {webp_out.name} (up to date)")
        elif run(["cwebp", "-q", str(WEBP_QUALITY), str(png), "-o", str(webp_out)], "cwebp"):
            print(f"  ✓ webp  {webp_out.name}  {webp_out.stat().st_size / 1024:.0f} KB")

        if is_fresh(avif_out, src):
            print(f"  · skip  {avif_out.name} (up to date)")
        elif run(["avifenc", "--jobs", AVIF_JOBS, "-q", str(AVIF_QUALITY), str(png), str(avif_out)], "avifenc"):
            print(f"  ✓ avif  {avif_out.name}  {avif_out.stat().st_size / 1024:.0f} KB")

        entry["webp"].append({"w": w, "src": public_path(webp_out)})
        entry["avif"].append({"w": w, "src": public_path(avif_out)})

    entry["width"] = largest
    entry["height"] = round(src_h * largest / src_w)
    return entry


def prune_orphans(out_dirs: list[Path], keep: set[str]):
    """Delete converted files whose source image was removed."""
    removed = 0
    for d in out_dirs:
        if not d.exists():
            continue
        for f in d.iterdir():
            if f.is_file() and f.name not in keep:
                f.unlink()
                removed += 1
    if removed:
        print(f"Removed {removed} orphaned file(s).")


def write_manifest(path: Path, entries: list[dict]):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps({"items": entries}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote manifest: {path} ({len(entries)} item(s))")


def parse_args():
    p = argparse.ArgumentParser(description="Build responsive WebP/AVIF images.")
    p.add_argument("--gallery", action="store_true",
                   help="Gallery mode: src/assets/gallery -> public/images/gallery + src/data/gallery.json")
    p.add_argument("--input", type=Path, help="Source folder (overrides the default for the mode)")
    p.add_argument("--output", type=Path, help="Output folder (overrides the default for the mode)")
    p.add_argument("--manifest", type=Path, help="Write a JSON manifest to this path")
    p.add_argument("--prune", action="store_true",
                   help="Delete converted files whose source image no longer exists")
    return p.parse_args()


def main():
    args = parse_args()
    check_tools()

    if args.gallery:
        input_dir = args.input or GALLERY_INPUT
        output_dir = args.output or GALLERY_OUTPUT
        manifest = args.manifest or GALLERY_MANIFEST
    else:
        input_dir = args.input or SITE_INPUT
        output_dir = args.output or SITE_OUTPUT
        manifest = args.manifest

    if output_dir.resolve().is_relative_to(PUBLIC_DIR.resolve()) is False:
        raise SystemExit(f"Output must be inside public/: {output_dir}")

    if not input_dir.exists():
        input_dir.mkdir(parents=True)
        print(f"Created '{input_dir}/'. Add images there and re-run.")
        return

    webp_dir = output_dir / "webp"
    avif_dir = output_dir / "avif"
    webp_dir.mkdir(parents=True, exist_ok=True)
    avif_dir.mkdir(parents=True, exist_ok=True)

    images = sorted(f for f in input_dir.iterdir() if f.is_file() and f.suffix.lower() in SUPPORTED)
    if not images:
        print(f"No images found in '{input_dir}/'.")
        if manifest:
            write_manifest(manifest, [])
        return

    print(f"Found {len(images)} image(s) in '{input_dir}/'")
    print(f"Widths: {WIDTHS}  |  WebP q={WEBP_QUALITY}  |  AVIF q={AVIF_QUALITY}")

    entries, failed = [], []
    with tempfile.TemporaryDirectory() as tmp_name:
        tmp = Path(tmp_name)
        for i, img in enumerate(images, 1):
            entry = convert(img, i, len(images), tmp, webp_dir, avif_dir)
            if entry is None:
                failed.append(img.name)
            else:
                entries.append(entry)
            for leftover in tmp.glob("*.png"):
                leftover.unlink()   # free disk before the next image

    if manifest:
        write_manifest(manifest, entries)

    if args.prune:
        keep = {Path(f).name for e in entries for key in ("webp", "avif") for f in (x["src"] for x in e[key])}
        prune_orphans([webp_dir, avif_dir], keep)

    print(f"\n{'=' * 60}")
    print(f"Finished: {len(entries)}/{len(images)} converted.")
    if failed:
        print(f"Failed ({len(failed)}): {', '.join(failed)}")


if __name__ == "__main__":
    main()
