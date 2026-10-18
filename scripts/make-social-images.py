#!/usr/bin/env python3
"""
Generates social sharing images from the master banner.

Input:  public/images/socials/yehidat-banner-social-1500x500.png
Output: public/images/socials/<name>-<w>x<h>.png

The banner is wide (3:1). Each target keeps the whole banner, scaled to the
target width, and fills the empty space above and below with the banner's own
background colour. Nothing is cropped, so the logo and tagline stay intact.

Usage:
  pip install pillow
  python3 scripts/make-social-images.py
"""
from pathlib import Path
from PIL import Image

SRC = Path("public/images/socials/yehidat-banner-social-1500x500.png")
OUT = SRC.parent

# name: (width, height, purpose)
TARGETS = {
    "og":     (1200, 630,  "link previews: WhatsApp, Telegram, Facebook, LinkedIn, X"),
    "square": (1080, 1080, "feed posts: Instagram, Facebook"),
    "story":  (1080, 1920, "vertical stories: Instagram, WhatsApp status, Telegram"),
}


def background_color(img: Image.Image) -> tuple:
    """Median colour of a small patch inside the banner's background.
    Corner pixels are skipped because they are often anti-aliased edges."""
    patch = img.crop((10, 10, 30, 30))
    get = getattr(patch, "get_flattened_data", patch.getdata)
    pixels = sorted(get(), key=sum)
    return pixels[len(pixels) // 2]


def make(name: str, w: int, h: int, src: Image.Image) -> Path:
    bg = background_color(src)
    canvas = Image.new("RGB", (w, h), bg)
    scaled_h = round(src.height * w / src.width)
    if scaled_h > h:
        raise ValueError(f"{name}: banner would be taller than the canvas")
    banner = src.resize((w, scaled_h), Image.LANCZOS)
    canvas.paste(banner, (0, (h - scaled_h) // 2))
    out = OUT / f"yehidat-{name}-{w}x{h}.png"
    canvas.save(out, optimize=True)
    return out


def main():
    if not SRC.exists():
        raise SystemExit(f"Banner not found: {SRC}")
    src = Image.open(SRC).convert("RGB")
    print(f"Source {src.size}, background {background_color(src)}")
    for name, (w, h, purpose) in TARGETS.items():
        out = make(name, w, h, src)
        print(f"  {out.name:32} {w}x{h}  ({purpose})")


if __name__ == "__main__":
    main()
