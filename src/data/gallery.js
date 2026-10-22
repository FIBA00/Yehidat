import galleryData from "./gallery.json";
import { withBase } from "./constants";

// Shared by the gallery and the hero, so both always show the same photos.
// The list comes from src/data/gallery.json, built by `npm run gallery`.

// Manifest entries -> srcset strings, with the base path applied.
export function toSrcSet(files) {
  return files.map((f) => `${withBase(f.src)} ${f.w}w`).join(", ");
}

export function getCategory(id = "") {
  const lower = id.toLowerCase();
  if (lower.includes("cake")) return "cakes";
  if (lower.includes("outdoor")) return "outdoor";
  return "surprises";
}

export const GALLERY_PHOTOS = galleryData.items.map((item) => ({
  id: item.id,
  alt: item.alt,
  category: getCategory(item.id),
  width: item.width,
  height: item.height,
  avif: toSrcSet(item.avif),
  webp: toSrcSet(item.webp),
}));

// The hero rotates through the first few photos only. Photos are ordered by
// filename, so 01-, 02-, ... decide which ones appear there.
export const HERO_LIMIT = 6;
export const HERO_PHOTOS = GALLERY_PHOTOS.slice(0, HERO_LIMIT);
