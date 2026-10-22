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
  EMAIL: "diboramarema@gmail.com",
  LOCATION: "Dukem/Bishoftu, Ethiopia · Serving Dukem and Bishoftu areas",
};

export const SOCIAL = {
  INSTAGRAM: "instagram.com/yehidat",
  TIKTOK: "tiktok.com/@yehidat",
  TELEGRAM: "t.me/yehidat",
};

export const withBase = (path) => {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.replace(/^\//, "");
  return `${cleanBase}${cleanPath}`;
};

// Packages: set `discount` (% off) and optional `originalPrice` to show the animated discount badge, or 0 to disable.
export const PACKAGES = [
  { id: "basic", price: 3999, originalPrice: 4500, discount: 11, deposit: 2000, featured: false },
  { id: "standard", price: 5999, originalPrice: 7000, discount: 15, deposit: 2500, featured: true },
  { id: "premium", price: 9999, originalPrice: 12000, discount: 17, deposit: 4500, featured: false },
];

// TODO: convert the images to webp and avif from png later.
export const OCCASIONS = [
  {
    id: "birthday",
    emoji: "🎂",
    src: withBase("occasions/birthday.png"),
    alt: "Birthday Occasion",
  },
  {
    id: "anniversary",
    emoji: "💍",
    src: withBase("occasions/anniversary.png"),
    alt: "Anniversary Occasion",
  },
  {
    id: "graduation",
    emoji: "🎓",
    src: withBase("occasions/graduation.png"),
    alt: "Graduation",
  },
  {
    id: "fathersDay",
    emoji: "👨‍👩‍👧",
    src: withBase("occasions/fathersDay.png"),
    alt: "Fathers Day",
  },

  {
    id: "mothersDay",
    emoji: "💐",
    src: withBase("occasions/mothersDay.png"),
    alt: "Mothers day",
  },

  {
    id: "promotion",
    emoji: "🎉",
    src: withBase("occasions/promotion.png"),
    alt: "Promotion",
  },
  {
    id: "justBecause",
    emoji: "✨",
    src: withBase("occasions/justBecause.png"),
    alt: "Be happy just because",
  },
];

export const yehidatIcon = withBase("icons/assets_icon_navbar1.png");


// TODO: add images of the owners here
export const TRUST_FACES = [null, null, null];
