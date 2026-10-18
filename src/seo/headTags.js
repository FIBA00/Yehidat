import i18n from "../i18n";
import { LOCALES, ORIGIN, localizedPath, normalizePage } from "../i18n/routes";
import { pageSeo } from "./pages";
import aboutData from "../data/about.json";

const DEFAULT_OG_IMAGE = `${ORIGIN}/images/socials/yehidat-og-1200x630.png`;

// Pages can use their own image. The About page uses the team photo once it exists.
function pageImage(page) {
  if (normalizePage(page) === "/about-us") {
    const team = aboutData.items?.[0];
    const largest = team?.webp?.at(-1);
    if (largest) return `${ORIGIN}/${largest.src}`;
  }
  return DEFAULT_OG_IMAGE;
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

// Returns the <head> tags for one language and one page, as an HTML string.
// Used at build time by scripts/prerender.mjs.
export function headTags(locale, page = "/") {
  const keys = pageSeo(page);
  const t = i18n.getFixedT(locale);
  const title = escapeAttr(t(keys.titleKey));
  const description = escapeAttr(t(keys.descriptionKey));
  const url = ORIGIN + localizedPath(locale, page);
  const image = pageImage(page);

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Yehidat" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="${LOCALES[locale].ogLocale}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...Object.entries(LOCALES).map(
      ([loc, cfg]) =>
        `<link rel="alternate" hreflang="${cfg.htmlLang}" href="${ORIGIN + localizedPath(loc, page)}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN + localizedPath("en", page)}" />`,
  ];

  return tags.join("\n    ");
}
