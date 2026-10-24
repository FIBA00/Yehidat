import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Globe, ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";
import { localeFromPath, localizedPath, pagePath } from "../../i18n/routes";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { yehidatIcon, CONTACT } from "../../data/constants";

// [Competitor Pattern: Bloom & Wild / PartySlate Dual-Mode Navigation]
// Supports smooth anchor jumps on home page and cross-page navigation when on inner pages.
const NAV_LINKS = [
  { key: "occasions", href: "#occasions" },
  { key: "how", href: "#how" },
  { key: "packages", href: "#packages" },
  { key: "gallery", href: "#gallery" },
  { key: "about", href: "/about-us", isPage: true },
  { key: "team", href: "/team", isPage: true },
];

// [Competitor Pattern: Luxury E-Commerce Sleek Language Pill with Direct Route Sync]
function LanguageSwitcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const current = localeFromPath(pathname);

  // The URL is the single source of truth: switching language updates the path while preserving the current page.
  const onChange = (e) => {
    navigate(localizedPath(e.target.value, pagePath(pathname)));
  };

  return (
    <div className="relative inline-flex items-center">
      <Globe className="w-3.5 h-3.5 text-gold absolute left-2.5 pointer-events-none" aria-hidden="true" />
      <select
        value={current}
        onChange={onChange}
        className="text-xs font-semibold text-ink-soft border border-gold-edge/40 hover:border-gold rounded-full pl-7 pr-6 py-1.5 bg-gold-pale/90 hover:bg-parchment transition-all duration-200 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold"
        aria-label="Change language"
      >
        <option value="en" className="bg-gold-pale text-ink">EN</option>
        <option value="am" className="bg-gold-pale text-ink">አማ</option>
        <option value="oro" className="bg-gold-pale text-ink">OR</option>
      </select>
      <ChevronDown className="w-3 h-3 text-gold/70 absolute right-2 pointer-events-none" aria-hidden="true" />
    </div>
  );
}

// [Competitor Pattern: Bloom & Wild / PartySlate Sticky Luxury Header with Frosted Glassmorphism]
export default function HomeNavbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-collapse mobile drawer on page transition
  useEffect(() => setMenuOpen(false), [pathname]);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [menuOpen]);

  // Dual-mode anchor click handler
  const handleNavClick = (href, isPage = false) => (e) => {
    setMenuOpen(false);
    if (isPage) {
      e.preventDefault();
      navigate(localizedPath(locale, href));
      return;
    }

    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 80);
      } else {
        const homePath = localizedPath(locale, "/");
        navigate(`${homePath}${href}`);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gold-pale/95 backdrop-blur-md border-b border-gold-edge/30 shadow-card"
          : "bg-gold-pale/85 backdrop-blur-md border-b border-gold-edge/20"
      }`}
    >
      {/* [Competitor Pattern: Bloom & Wild Discretion Trust Ribbon] */}
      <div className="bg-gold-pale/95 border-b border-gold-edge/15 py-1 px-4 sm:px-6 text-[11px] sm:text-xs text-ink/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gold/15 text-gold shrink-0">
              <ShieldCheck className="w-3 h-3" />
            </span>
            <span className="font-medium text-ink-soft">
              {t("nav.trustBadge", "100% Secret & Discreet Delivery • Dukem, Bishoftu & Surrounds")}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-ink-muted">
            <a
              href={`https://wa.me/${CONTACT.WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-gold" />
              <span>WhatsApp: {CONTACT.PHONE_DISPLAY}</span>
            </a>
            <span className="text-gold-edge/40">•</span>
            <span className="text-ink/60">{t("footer.hours", "Mon–Sun: 8:00 AM – 8:00 PM")}</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Name */}
          <Link
            to={localizedPath(locale, "/")}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-lg py-1 px-1.5 -ml-1.5"
            aria-label="Yehidat Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold-edge/30 flex items-center justify-center p-1.5 group-hover:border-gold group-hover:shadow-gold transition-all duration-300">
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
              <span className="hidden sm:block text-[9px] uppercase tracking-[0.2em] text-gold-deep -mt-1 font-medium">
                Surprise Concierge
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7" aria-label="Main Navigation">
            {NAV_LINKS.map(({ key, href, isPage }) => {
              const active = isPage && pathname.includes(href);
              const computedHref = isPage
                ? localizedPath(locale, href)
                : pathname === "/" || pathname === "/am/" || pathname === "/om/" || pathname === "/am" || pathname === "/om"
                ? href
                : `${localizedPath(locale, "/")}${href}`;

              return (
                <a
                  key={key}
                  href={computedHref}
                  onClick={handleNavClick(href, isPage)}
                  className={`text-xs xl:text-sm font-medium tracking-wide transition-all duration-150 py-1 relative group ${
                    active ? "text-gold font-semibold" : "text-ink/80 hover:text-gold"
                  }`}
                >
                  {t(`nav.${key}`)}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-gold to-gold-deep transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />

            {/* Quick WhatsApp Concierge link */}
            <a
              href={`https://wa.me/${CONTACT.WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-gold-edge/40 text-gold hover:text-ink hover:border-gold hover:bg-gold/10 transition-all duration-200"
              aria-label="Direct WhatsApp Concierge"
            >
              <MessageCircle className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>{t("nav.conciergeChat", "Concierge")}</span>
            </a>

            <a
              href="#contact"
              onClick={handleNavClick("#contact", false)}
              className="btn-gold text-xs sm:text-sm py-1.5 px-4 font-semibold shadow-sm hover:shadow-gold transition-all duration-200"
            >
              {t("nav.cta")}
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-2.5">
            <LanguageSwitcher />

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 rounded-lg text-ink hover:text-gold hover:bg-gold-pale transition-colors focus:outline-none focus:ring-1 focus:ring-gold"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer & Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 top-[105px] bg-black/60 backdrop-blur-xs -z-10 md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden border-t border-gold-edge/25 bg-gold-pale/95 backdrop-blur-xl overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-5 flex flex-col gap-4">
                {/* Mobile Discretion Trust Pill */}
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gold-cream/60 border border-gold-edge/20 text-xs text-ink-soft">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                  <span>{t("nav.trustBadge", "100% Secret & Discreet Delivery")}</span>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col divide-y divide-gold-edge/10">
                  {NAV_LINKS.map(({ key, href, isPage }) => {
                    const active = isPage && pathname.includes(href);
                    const computedHref = isPage
                      ? localizedPath(locale, href)
                      : pathname === "/" || pathname === "/am/" || pathname === "/om/" || pathname === "/am" || pathname === "/om"
                      ? href
                      : `${localizedPath(locale, "/")}${href}`;

                    return (
                      <a
                        key={key}
                        href={computedHref}
                        onClick={handleNavClick(href, isPage)}
                        className={`text-sm font-medium py-2.5 flex items-center justify-between transition-colors ${
                          active ? "text-gold font-semibold" : "text-ink/90 hover:text-gold"
                        }`}
                      >
                        <span>{t(`nav.${key}`)}</span>
                        <span className="text-gold-edge/40 text-xs">→</span>
                      </a>
                    );
                  })}
                </div>

                {/* Mobile CTAs */}
                <div className="pt-2 flex flex-col gap-2.5">
                  <a
                    href="#contact"
                    onClick={handleNavClick("#contact", false)}
                    className="btn-gold text-center text-sm py-2.5 font-semibold"
                  >
                    {t("nav.cta")}
                  </a>

                  <a
                    href={`https://wa.me/${CONTACT.WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold border border-gold-edge/40 text-gold hover:bg-gold/10 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-gold" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
