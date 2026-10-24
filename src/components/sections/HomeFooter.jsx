import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Cake,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";
import { localeFromPath, localizedPath, pagePath } from "../../i18n/routes";
import { CONTACT, SOCIAL, yehidatIcon } from "../../data/constants";
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

// [Competitor Pattern: Virgin Experience Gifts / The Knot Trust Pillars Ribbon]
const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    titleKey: "discretionTitle",
    descKey: "discretionDesc",
    defaultTitle: "100% Secret & Discreet",
    defaultDesc: "Uncompromising confidentiality from planning to the reveal moment.",
  },
  {
    icon: Cake,
    titleKey: "cakeTitle",
    descKey: "cakeDesc",
    defaultTitle: "Fresh Artisan Cakes",
    defaultDesc: "Bespoke bakery creations delivered bakery-fresh on your celebration day.",
  },
  {
    icon: Clock,
    titleKey: "punctualTitle",
    descKey: "punctualDesc",
    defaultTitle: "Punctual Delivery",
    defaultDesc: "Exact-hour coordination to guarantee the perfect surprise timing.",
  },
  {
    icon: HeartHandshake,
    titleKey: "calligraphyTitle",
    descKey: "calligraphyDesc",
    defaultTitle: "Custom Calligraphy",
    defaultDesc: "Handwritten bespoke message card included with every package.",
  },
];

// Occasions and services anchor navigation
const OCCASION_LINKS = [
  { key: "occasions", href: "#occasions" },
  { key: "how", href: "#how" },
  { key: "packages", href: "#packages" },
  { key: "gallery", href: "#gallery" },
];

// Subpage company navigation
const COMPANY_LINKS = [
  { key: "about", href: "/about-us" },
  { key: "team", href: "/team" },
  { key: "gallery", href: "/gallery" },
  { key: "cta", href: "#contact" },
];

// [Competitor Pattern: PartySlate / Virgin Experience Gifts Luxury Footer]
export default function HomeFooter() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const locale = localeFromPath(pathname);
  const { t } = useTranslation();

  const handleAnchorClick = (href) => (e) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        const homePath = localizedPath(locale, "/");
        navigate(`${homePath}${href}`);
      }
    }
  };

  return (
    <footer className="relative isolate overflow-hidden bg-gold-pale text-ink border-t border-gold-edge/20">
      <SectionBackground name="footer" overlay="strong" />

      {/* [Competitor Pattern: The Knot Trust Ribbon & Reassurance Badges] */}
      <div className="relative z-10 border-b border-gold-edge/20 bg-gold-cream/40 backdrop-blur-xs py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_PILLARS.map(({ icon: Icon, titleKey, descKey, defaultTitle, defaultDesc }) => (
            <div key={titleKey} className="flex items-start gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold-edge/30 flex items-center justify-center text-gold shrink-0 group-hover:border-gold group-hover:bg-gold/25 transition-all duration-200">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm text-ink group-hover:text-gold transition-colors">
                  {t(`footer.trustPillars.${titleKey}`, defaultTitle)}
                </h4>
                <p className="text-xs text-ink/70 leading-relaxed mt-1">
                  {t(`footer.trustPillars.${descKey}`, defaultDesc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern 4-Column Luxury Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand Story & Socials */}
          <div className="flex flex-col">
            <Link
              to={localizedPath(locale, "/")}
              className="flex items-center gap-3 mb-4 inline-flex group focus:outline-none"
              aria-label="Yehidat Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold-edge/30 flex items-center justify-center p-1.5 group-hover:border-gold transition-colors">
                <img
                  src={yehidatIcon}
                  alt="Yehidat Logo"
                  className="w-full h-full object-contain"
                  width="40"
                  height="40"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-ink group-hover:text-gold transition-colors">
                  Yehidat
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-gold-deep -mt-0.5 font-medium">
                  Surprise Concierge
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-ink/75 leading-relaxed mb-4 max-w-xs">
              {t("footer.brandDesc")}
            </p>

            {/* Delivery Coverage Badge */}
            <div className="flex items-start gap-2.5 text-xs text-ink/75 mb-5 bg-gold-pale/60 border border-gold-edge/20 rounded-xl p-3 max-w-xs">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span className="leading-snug">{t("footer.coverageNotice")}</span>
            </div>

            <p className="text-[11px] font-bold tracking-widest uppercase text-gold mb-2.5">
              Follow Our Stories
            </p>
            <div className="flex gap-2 items-center">
              {[
                { href: `https://${SOCIAL.INSTAGRAM}`, label: "Instagram", icon: InstagramIcon },
                { href: `https://${SOCIAL.TIKTOK}`, label: "TikTok", icon: TikTokIcon },
                { href: `https://${SOCIAL.TELEGRAM}`, label: "Telegram", icon: TelegramIcon },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-gold-edge/30 rounded-lg flex items-center justify-center text-ink-soft hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Occasions & Services */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gold mb-4">
              {t("footer.occasionsTitle", "Occasions & Services")}
            </p>
            <ul className="flex flex-col gap-2.5">
              {OCCASION_LINKS.map(({ key, href }) => {
                const isAnchor = href.startsWith("#");
                const computedHref = isAnchor
                  ? pathname === "/" || pathname === "/am/" || pathname === "/om/" || pathname === "/am" || pathname === "/om"
                    ? href
                    : `${localizedPath(locale, "/")}${href}`
                  : localizedPath(locale, href);

                return (
                  <li key={key}>
                    <a
                      href={computedHref}
                      onClick={handleAnchorClick(href)}
                      className="text-xs sm:text-sm text-ink/80 hover:text-gold transition-colors duration-150 inline-flex items-center gap-1.5 group"
                    >
                      <span className="text-gold-edge/40 group-hover:text-gold group-hover:translate-x-0.5 transition-all text-xs">
                        ›
                      </span>
                      <span>{t(`nav.${key}`)}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Company & Subpages */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gold mb-4">
              {t("footer.companyTitle", "Company")}
            </p>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map(({ key, href }) => {
                const isAnchor = href.startsWith("#");
                const computedHref = isAnchor
                  ? pathname === "/" || pathname === "/am/" || pathname === "/om/" || pathname === "/am" || pathname === "/om"
                    ? href
                    : `${localizedPath(locale, "/")}${href}`
                  : localizedPath(locale, href);

                return (
                  <li key={key}>
                    <a
                      href={computedHref}
                      onClick={isAnchor ? handleAnchorClick(href) : undefined}
                      className="text-xs sm:text-sm text-ink/80 hover:text-gold transition-colors duration-150 inline-flex items-center gap-1.5 group"
                    >
                      <span className="text-gold-edge/40 group-hover:text-gold group-hover:translate-x-0.5 transition-all text-xs">
                        ›
                      </span>
                      <span>{t(`nav.${key}`)}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Concierge & Direct Contact */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gold mb-4">
              {t("footer.contact", "Concierge & Inquiries")}
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`https://wa.me/${CONTACT.WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-ink/85 hover:text-gold transition-colors inline-flex items-center gap-2.5 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-gold/15 border border-gold-edge/30 flex items-center justify-center text-gold group-hover:border-gold transition-colors shrink-0">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </span>
                  <span>WhatsApp Concierge</span>
                  <ArrowUpRight className="w-3 h-3 text-gold-edge/60 group-hover:text-gold transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.PHONE_RAW}`}
                  className="text-xs sm:text-sm text-ink/85 hover:text-gold transition-colors inline-flex items-center gap-2.5 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-gold/15 border border-gold-edge/30 flex items-center justify-center text-gold group-hover:border-gold transition-colors shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  <span>{CONTACT.PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.EMAIL}`}
                  className="text-xs sm:text-sm text-ink/85 hover:text-gold transition-colors inline-flex items-center gap-2.5 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-gold/15 border border-gold-edge/30 flex items-center justify-center text-gold group-hover:border-gold transition-colors shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  <span className="truncate max-w-[200px]">{CONTACT.EMAIL}</span>
                </a>
              </li>
              <li className="text-xs sm:text-sm text-ink/75 inline-flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-gold/15 border border-gold-edge/30 flex items-center justify-center text-gold shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </span>
                <span>{t("footer.hours", "Mon–Sun: 8:00 AM – 8:00 PM")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Language Selection */}
        <div className="border-t border-gold-edge/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink/65">
          <span>
            © {new Date().getFullYear()} Yehidat Surprise Planning. {t("footer.rights")}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-ink-muted">Language:</span>
            <Link
              to={localizedPath("en", pagePath(pathname))}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                locale === "en"
                  ? "bg-gold/20 text-gold border border-gold-edge/40"
                  : "text-ink/65 hover:text-gold hover:bg-gold/10"
              }`}
            >
              English
            </Link>
            <span className="text-gold-edge/30">•</span>
            <Link
              to={localizedPath("am", pagePath(pathname))}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                locale === "am"
                  ? "bg-gold/20 text-gold border border-gold-edge/40"
                  : "text-ink/65 hover:text-gold hover:bg-gold/10"
              }`}
            >
              አማርኛ
            </Link>
            <span className="text-gold-edge/30">•</span>
            <Link
              to={localizedPath("oro", pagePath(pathname))}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                locale === "oro"
                  ? "bg-gold/20 text-gold border border-gold-edge/40"
                  : "text-ink/65 hover:text-gold hover:bg-gold/10"
              }`}
            >
              Afaan Oromoo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
