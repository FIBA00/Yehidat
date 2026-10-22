import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { localeFromPath, localizedPath } from "../../i18n/routes";
import { CONTACT, SOCIAL } from "../../data/constants";
import SectionBackground from "../ui/SectionBackground";

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function TelegramIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

const QUICK_LINK_KEYS = [
  { key: "occasions", href: "#occasions" },
  { key: "how", href: "#how" },
  { key: "packages", href: "#packages" },
  { key: "gallery", href: "#gallery" },
  { key: "about", href: "/about-us" },
  { key: "team", href: "/team" },
];

import SectionBackground from "../ui/SectionBackground";

export default function HomeFooter() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const { t } = useTranslation();

  return (
    <footer className="relative isolate overflow-hidden bg-ink-muted text-shadow-gold-deep">
      <SectionBackground name="footer" overlay="light" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-display font-bold text-xl text-gold mb-3">
              Yehidat
            </p>
            <p className="text-sm leading-relaxed max-w-xs mb-4">
              {t("footer.brandDesc")}
            </p>
            <p className="text-xs font-bold tracking-wider uppercase text-gold mb-2">
              Follow our social media
            </p>
            <div className="flex gap-2 items-center">
              {[
                { href: SOCIAL.INSTAGRAM, label: "Instagram", icon: InstagramIcon },
                { href: SOCIAL.TIKTOK, label: "TikTok", icon: TikTokIcon },
                { href: SOCIAL.TELEGRAM, label: "Telegram", icon: TelegramIcon },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-parchment/15 rounded-lg flex items-center justify-center text-sm hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase text-gold mb-4">
              {t("footer.quickLinks")}
            </p>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINK_KEYS.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={
                      href.startsWith("/") ? localizedPath(locale, href) : href
                    }
                    className="text-sm hover:text-gold transition-colors duration-150"
                  >
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-widest uppercase text-gold mb-4">
              {t("footer.contact")}
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={`https://wa.me/${CONTACT.WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-gold" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.PHONE_RAW}`}
                  className="text-sm hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  {CONTACT.PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.EMAIL}`}
                  className="text-sm hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-gold" />
                  {CONTACT.EMAIL}
                </a>
              </li>
              <li className="text-sm mt-1 inline-flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span>{CONTACT.LOCATION}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-parchment/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>
            © {new Date().getFullYear()} Yehidat. {t("footer.rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
