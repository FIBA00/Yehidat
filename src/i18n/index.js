import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import am from "./locales/am.json";
import oro from "./locales/oro.json";

// The language comes from the URL (see LocaleRoute), not from the browser.
// Browser detection is intentionally off so "/" is always English.
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    am: { translation: am },
    oro: { translation: oro },
  },
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en", "am", "oro"],
  interpolation: { escapeValue: false },
});

export default i18n;
