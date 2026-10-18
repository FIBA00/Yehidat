import { normalizePage } from "../i18n/routes";

// Per-page SEO keys. Each page gets its own title and description.
// Keys are read from the locale files; missing translations fall back to English.
export const PAGES = {
  "/": {
    titleKey: "seo.title",
    descriptionKey: "seo.description",
  },
  "/about-us": {
    titleKey: "seo.about.title",
    descriptionKey: "seo.about.description",
  },
};

// Looks up a page by path, ignoring a trailing slash.
export function pageSeo(page) {
  return PAGES[normalizePage(page)] ?? PAGES["/"];
}
