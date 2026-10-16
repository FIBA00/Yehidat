// ─────────────────────────────────────────────────────────────
// SITE CONSTANTS (non-translated data)
// Copy/labels live in src/i18n/locales/{en,am}.json — this file
// only holds values that don't change per-language: numbers,
// phone/links, image paths, and IDs used to look up translations.
// Replace PHONE and WHATSAPP_NUMBER before going live.
// ─────────────────────────────────────────────────────────────

export const CONTACT = {
  PHONE_RAW: "+251968034000",
  PHONE_DISPLAY: "+251 96 80 34 000",
  WHATSAPP_NUMBER: "251968034000",
  EMAIL: "hawig74@gmail.com",
  LOCATION: "Dukem/Bishoftu, Addis Ababa, Ethiopia",
};

export const SOCIAL = {
  INSTAGRAM: "#",
  TIKTOK: "#",
  TELEGRAM: "#",
};

export const PACKAGES = [
  { id: "basic", price: 4000, deposit: 1000, featured: false },
  { id: "standard", price: 6000, deposit: 1500, featured: true },
  { id: "premium", price: 10000, deposit: 2500, featured: false },
];

export const OCCASIONS = [
  { id: "birthday", emoji: "🎂" },
  { id: "anniversary", emoji: "💍" },
  { id: "graduation", emoji: "🎓" },
  { id: "valentines", emoji: "💝" },
  { id: "fathersDay", emoji: "👨‍👩‍👧" },
  { id: "mothersDay", emoji: "💐" },
  { id: "promotion", emoji: "🎉" },
  { id: "justBecause", emoji: "✨" },
];

export const yehidatIcon = "/icons/icon_navbar1.png";

export const GALLERY_ITEMS = [
  {
    id: 1,
    name: "hbd",
    type: "image",
    src: {
      avif: "/images/avif/assets_hero_banner.avif",
      webp: "/images/webp/assets_hero_banner.webp",
    },
    alt: "Birthday surprise setup",
    large: true,
  },
  {
    id: 2,
    name: "suprise",
    type: "image",
    src: {
      avif: "/images/avif/assets_suprise_2.avif",
      webp: "/images/webp/assets_suprise_2.webp",
    },
    alt: "Flower arrangement",
    large: true,
  },
  {
    id: 3,
    name: "cake",
    type: "image",
    src: {
      avif: "/images/avif/assets_hero_cake.avif",
      webp: "/images/webp/assets_hero_cake.webp",
    },
    alt: "Cake decoration",
    large: true,
  },
  {
    id: 4,
    name: "banner",
    type: "image",
    src: {
      avif: "/images/avif/assets_banner_with_candles.avif",
      webp: "/images/webp/assets_banner_with_candles.webp",
    },
    alt: "Anniversary decoration",
    large: true,
  },
  {
    id: 5,
    name: "balloons",
    type: "image",
    src: {
      avif: "/images/avif/assets_hero_cake.avif",
      webp: "/images/webp/assets_hero_cake.webp",
    },
    alt: "Balloon setup",
    large: true,
  },
];

// TODO: add images of the owners here
export const TRUST_FACES = [null, null, null];
