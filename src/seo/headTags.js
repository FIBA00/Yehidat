import i18n from "../i18n";
import { LOCALES, ORIGIN, localizedPath } from "../i18n/routes";

const OG_IMAGE = `${ORIGIN}/images/socials/yehidat-og-1200x630.png`;

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

// Returns the <head> tags for one language, as an HTML string.
// Used at build time by scripts/prerender.mjs. Titles and descriptions come
// from the locale files, and fall back to English for any missing key.
export function headTags(locale) {
  const t = i18n.getFixedT(locale);
  const title = escapeAttr(t("seo.title"));
  const description = escapeAttr(t("seo.description"));
  const url = ORIGIN + localizedPath(locale);

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
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ...Object.entries(LOCALES).map(
      ([loc, cfg]) =>
        `<link rel="alternate" hreflang="${cfg.htmlLang}" href="${ORIGIN + localizedPath(loc)}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/" />`,
  ];

  return tags.join("\n    ");
}
