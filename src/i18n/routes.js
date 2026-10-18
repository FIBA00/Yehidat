// URL <-> language mapping.
// The URL uses ISO codes (om = Afaan Oromo, the hreflang code).
// The i18n resources keep the internal key "oro" to match the existing locale file.

export const ORIGIN = "https://yehidat.vercel.app";
export const DEFAULT_LOCALE = "en";

export const LOCALES = {
  en: { prefix: "", htmlLang: "en", ogLocale: "en_US" },
  am: { prefix: "/am", htmlLang: "am", ogLocale: "am_ET" },
  oro: { prefix: "/om", htmlLang: "om", ogLocale: "om_ET" },
};

const SEGMENT_TO_LOCALE = { am: "am", om: "oro" };

// "/am/how" -> "oro" for "/om/how"; anything else -> English.
export function localeFromPath(pathname = "/") {
  const seg = pathname.split("/")[1];
  return SEGMENT_TO_LOCALE[seg] ?? DEFAULT_LOCALE;
}

// Strips the language prefix: "/am/how" -> "/how", "/am" -> "/", "/" -> "/".
export function pagePath(pathname = "/") {
  const seg = pathname.split("/")[1];
  if (SEGMENT_TO_LOCALE[seg]) {
    const rest = pathname.slice(seg.length + 1);
    return rest || "/";
  }
  return pathname || "/";
}

// Builds the URL for a page in a language: localizedPath("am", "/") -> "/am/".
export function localizedPath(locale, page = "/") {
  const prefix = LOCALES[locale]?.prefix ?? "";
  const clean = normalizePage(page);
  return clean === "/" ? `${prefix}/` : `${prefix}${clean}/`;
}

// "/about-us", "/about-us/" -> "/about-us". "/" stays "/".
export function normalizePage(page = "/") {
  const trimmed = page.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}
