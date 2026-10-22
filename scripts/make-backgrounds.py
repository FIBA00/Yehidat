#!/usr/bin/env python3
"""
Blurs converted photos into section backgrounds.

Input:  public/images/backgrounds/webp/<name>.webp
        (the largest version, written by convert_images.py)
Output: public/images/backgrounds/blur/<name>-<w>w.{webp,avif}
Manifest: src/data/backgrounds.json

The file name is the section name: hero, occasions, gallery, contact, footer.
A section shows a background only when its file exists.

Blur is baked in here, so the browser never blurs anything at runtime.
Light blur: BLUR_AT_1280 controls strength (higher = softer).

Usage (after putting photos in src/assets/backgrounds):
  npm run backgrounds
"""
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageFilter

PUBLIC = Path("public")
SRC = PUBLIC / "images/backgrounds/webp"
OUT = PUBLIC / "images/backgrounds/blur"
MANIFEST = Path("src/data/backgrounds.json")

WIDTHS = [640, 1280]
BLUR_AT_1280 = 10      # light blur. Try 6 (subtle) to 16 (strong).
WEBP_QUALITY = 70
AVIF_QUALITY = 50


def check_tools():
    missing = [t for t in ("cwebp", "avifenc") if shutil.which(t) is None]
    if missing:
        sys.exit(f"Missing tools: {', '.join(missing)}. Install: sudo apt-get install -y webp libavif-bin")


def is_main_variant(path: Path) -> bool:
    """'hero.webp' yes; 'hero-480w.webp' no (those are the size variants)."""
    return not re.search(r"-\d+w$", path.stem)


def public_path(p: Path) -> str:
    return p.relative_to(PUBLIC).as_posix()


def blur_one(src: Path, tmp: Path) -> list[dict]:
    """Writes blurred WebP and AVIF at each width. Returns manifest file lists."""
    name = src.stem
    files = {"webp": [], "avif": []}
    with Image.open(src) as im:
        im = im.convert("RGB")
        src_w, src_h = im.size
        for w in sorted({min(w, src_w) for w in WIDTHS}):
            h = round(src_h * w / src_w)
            radius = max(2, BLUR_AT_1280 * w / 1280)
            frame = im.resize((w, h), Image.LANCZOS).filter(ImageFilter.GaussianBlur(radius))
            png = tmp / f"{name}-{w}.png"
            frame.save(png, format="PNG")

            webp_out = OUT / f"{name}-{w}w.webp"
            avif_out = OUT / f"{name}-{w}w.avif"
            subprocess.run(["cwebp", "-q", str(WEBP_QUALITY), str(png), "-o", str(webp_out)],
                           check=True, capture_output=True)
            subprocess.run(["avifenc", "--jobs", "1", "-q", str(AVIF_QUALITY), str(png), str(avif_out)],
                           check=True, capture_output=True)
            files["webp"].append({"w": w, "src": public_path(webp_out)})
            files["avif"].append({"w": w, "src": public_path(avif_out)})
            print(f"  ✓ {name}  {w}px  webp {webp_out.stat().st_size // 1024} KB  avif {avif_out.stat().st_size // 1024} KB")
            png.unlink()
    return files


def main():
    check_tools()
    if not SRC.exists():
        sys.exit(f"Nothing to blur: {SRC} does not exist. Run `npm run backgrounds` after adding photos.")
    OUT.mkdir(parents=True, exist_ok=True)
    sources = sorted(p for p in SRC.glob("*.webp") if is_main_variant(p))
    if not sources:
        print(f"No background photos in {SRC}. Manifest left empty.")
    items = []
    with tempfile.TemporaryDirectory() as tmp_name:
        tmp = Path(tmp_name)
        for src in sources:
            print(f"[{src.name}]")
            files = blur_one(src, tmp)
            items.append({"name": src.stem, "webp": files["webp"], "avif": files["avif"]})

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps({"items": items}, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {MANIFEST} ({len(items)} background(s))")

    # remove blurred files for photos that no longer exist
    keep = {Path(x["src"]).name for it in items for k in ("webp", "avif") for x in it[k]}
    for f in OUT.iterdir():
        if f.is_file() and f.name not in keep:
            f.unlink()
            print(f"Removed orphan {f.name}")


if __name__ == "__main__":
    main()
