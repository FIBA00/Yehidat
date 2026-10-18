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
  LOCATION: "Dukem/Bishoftu, Ethiopia · Serving Addis Ababa & surroundings",
};

export const SOCIAL = {
  INSTAGRAM: "#",
  TIKTOK: "#",
  TELEGRAM: "#",
};

export const withBase = (path) => {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.replace(/^\//, "");
  return `${cleanBase}${cleanPath}`;
};

export const PACKAGES = [
  { id: "basic", price: 3999, deposit: 2000, featured: false },
  { id: "standard", price: 5999, deposit: 2500, featured: true },
  { id: "premium", price: 9999, deposit: 4500, featured: false },
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

export const GALLERY_ITEMS = [
  {
    id: 1,
    type: "image",
    src: {
      avif: withBase("images/avif/image_1.avif"),
      webp: withBase("images/webp/image_1.webp"),
    },
    alt: "Previous Suprise 1",
    large: true,
  },
  {
    id: 2,

    type: "image",
    src: {
      avif: withBase("images/avif/image_2.avif"),
      webp: withBase("images/webp/image_2.webp"),
    },
    alt: "Previous Suprise 2",
    large: true,
  },
  {
    id: 3,

    type: "image",
    src: {
      avif: withBase("images/avif/image_3.avif"),
      webp: withBase("images/webp/image_3.webp"),
    },
    alt: "Previous Suprise 3",
    large: true,
  },
  {
    id: 4,

    type: "image",
    src: {
      avif: withBase("images/avif/image_4.avif"),
      webp: withBase("images/webp/image_4.webp"),
    },
    alt: "Previous Suprise 4",
    large: true,
  },
  {
    id: 5,
    type: "image",
    src: {
      avif: withBase("images/avif/image_5.avif"),
      webp: withBase("images/webp/image_5.webp"),
    },
    alt: "Previous Suprise 5",
    large: true,
  },

  // {
  //   id: 7,
  //   ",
  //   type: "image",
  //   src: {
  //     avif: "/images/avif/IMG_6343.avif",
  //     webp: "/images/webp/IMG_6343.webp",
  //   },
  //   alt: "Previous suprise",
  //   large: true,
  // },
  // {
  //   id: 8,
  //
  //   type: "image",
  //   src: {
  //     avif: "/images/avif/IMG_6344.avif",
  //     webp: "/images/webp/IMG_6344.webp",
  //   },
  //   alt: "Previous suprise",
  //   large: true,
  // },

  // {
  //   id: 9,
  //
  //   type: "image",
  //   src: {
  //     avif: "/images/avif/IMG_6345.avif",
  //     webp: "/images/webp/IMG_6345.webp",
  //   },
  //   alt: "Previous suprise",
  //   large: true,
  // },
  // {
  //   id: 10,
  //
  //   type: "image",
  //   src: {
  //     avif: "/images/avif/IMG_6346.avif",
  //     webp: "/images/webp/IMG_6346.webp",
  //   },
  //   alt: "Previous suprise",
  //   large: true,
  // },
  // {
  //   id: 11,
  //
  //   type: "image",
  //   src: {
  //     avif: "/images/avif/IMG_6341.avif",
  //     webp: "/images/webp/IMG_6341.webp",
  //   },
  //   alt: "Previous suprise",
  //   large: true,
  // },
];

// TODO: add images of the owners here
export const TRUST_FACES = [null, null, null];
