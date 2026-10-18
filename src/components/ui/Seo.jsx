import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LOCALES, ORIGIN, localizedPath } from "../../i18n/routes";

// Keeps <head> in sync with the current language.
// It updates existing tags in place, so no duplicates are created.
// Browsers and Google render this. AI crawlers that skip JavaScript see the
// English tags in index.html until build-time pre-rendering lands.

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

function setAlternates() {
  document.head
    .querySelectorAll('link[rel="alternate"][data-seo="alternate"]')
    .forEach((n) => n.remove());

  const add = (hreflang, href) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = hreflang;
    link.href = href;
    link.dataset.seo = "alternate";
    document.head.appendChild(link);
  };

  for (const [locale, cfg] of Object.entries(LOCALES)) {
    add(cfg.htmlLang, ORIGIN + localizedPath(locale));
  }
  add("x-default", ORIGIN + "/");
}

export default function Seo({ locale }) {
  const { t } = useTranslation();

  useEffect(() => {
    // Explicit lng keeps this correct even before i18n finishes switching.
    const title = t("seo.title", { lng: locale });
    const description = t("seo.description", { lng: locale });
    const url = ORIGIN + localizedPath(locale);

    document.title = title;
    setMeta("name", "description", description);
    setCanonical(url);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:locale", LOCALES[locale].ogLocale);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setAlternates();
  }, [locale, t]);

  return null;
}
