import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { LOCALES } from "../i18n/routes";
import Seo from "./ui/Seo";

// Wraps a page so its language comes from the URL, not from user state.
// `page` is the page path without the language prefix, e.g. "/about-us".
export default function LocaleRoute({ locale, page = "/", children }) {
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
    document.documentElement.lang = LOCALES[locale].htmlLang;
  }, [locale, i18n]);

  return (
    <>
      <Seo locale={locale} page={page} />
      {children}
    </>
  );
}
