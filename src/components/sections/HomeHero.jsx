// [Competitor Pattern: Bloom & Wild / Virgin Experience Gifts Emotional Hero]
// High-impact emotional headline with Playfair typography, dual CTAs for immediate inquiry
// or exploratory browsing, 5.0 star rating social proof bar, discretion guarantee pill,
// and accessible reduced-motion photo carousel.
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Cake,
  ShieldCheck,
  Compass,
} from "lucide-react";

// ! internal imports
import { TRUST_FACES } from "../../data/constants.js";
import { HERO_PHOTOS } from "../../data/gallery.js";
import { useAppStore } from "../../store/useAppStore.js";
import ResponsiveImage from "../ui/Image.jsx";
import SectionBackground from "../ui/SectionBackground.jsx";

const ROTATION_INTERVAL = 3000;

const HERO_SLIDES = HERO_PHOTOS.map((photo) => ({
  id: photo.id,
  alt: photo.alt,
  src: { avif: photo.avif, webp: photo.webp },
}));

export default function HomeHero() {
  const { t } = useTranslation();
  const clearSelection = useAppStore((s) => s.clearSelection);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || HERO_SLIDES.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % HERO_SLIDES.length);
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [isPaused, prefersReducedMotion]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  function showPreviousSlide() {
    setActiveIndex(
      (index) => (index - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  }

  function showNextSlide() {
    setActiveIndex((index) => (index + 1) % HERO_SLIDES.length);
  }

  const activeSlide = HERO_SLIDES[activeIndex];

  return (
    <section className="relative isolate pt-32 pb-20 overflow-hidden">
      <SectionBackground name="hero" overlay="light" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Discretion Guarantee Notice Pill */}
            <div className="inline-flex items-center gap-2 bg-gold-pale border border-gold-edge/40 rounded-full px-4 py-1.5 mb-5 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[11px] font-semibold text-gold-deep tracking-wide uppercase">
                {t(
                  "hero.discretionPill",
                  "100% Secret & Discreet Surprise Delivery",
                )}
              </span>
            </div>

            <h1 className="display-heading mb-4 text-ink">
              {t("hero.titleLine1")}{" "}
              <span className="italic font-display text-gold-deep">
                {t("hero.titleEmphasis")}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-ink-soft leading-relaxed mb-8 max-w-lg">
              {t("hero.subtitle")}
            </p>

            {/* Dual Conversion CTAs */}
            <div className="flex flex-wrap gap-3.5 items-center">
              <button
                type="button"
                onClick={() => {
                  clearSelection();
                  scrollTo("contact");
                }}
                className="btn-gold inline-flex items-center gap-2 text-xs font-semibold px-5 py-3"
              >
                <span>{t("hero.ctaPrimary", "Plan a Surprise")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo("occasions")}
                className="btn-outline inline-flex items-center gap-2 text-xs font-semibold px-5 py-3 hover:border-gold hover:text-gold"
              >
                <Compass className="w-4 h-4 text-gold-deep" />
                <span>{t("hero.ctaSecondary", "Explore Experiences")}</span>
              </button>
            </div>

            {/* Social Proof Rating Bar */}
            <div className="flex items-center gap-4 mt-9 pt-6 border-t border-gold-edge/20">
              <div className="flex">
                {TRUST_FACES.map((src, index) => (
                  <div
                    key={index}
                    className="w-9 h-9 rounded-full border-2 border-parchment overflow-hidden -ml-2.5 first:ml-0 bg-linear-to-br from-gold to-gold-deep flex items-center justify-center text-xs font-semibold text-gold-pale shadow-xs"
                  >
                    {src ? (
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "✦"
                    )}
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-parchment -ml-2.5 bg-gold flex items-center justify-center text-[11px] font-bold text-gold-pale shadow-xs">
                  +
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-gold text-xs leading-none mb-1">
                  {"★★★★★"}
                  <span className="font-bold ml-1 text-ink text-xs">5.0</span>
                </div>
                <p className="text-xs text-ink-muted">
                  <strong className="text-ink font-semibold">
                    {t("hero.trustCount")}
                  </strong>{" "}
                  {t("hero.trustLabel")}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative order-first lg:order-last"
          >
            <div
              className="relative"
              role="region"
              aria-roledescription="carousel"
              aria-label="Previous Yehidat projects"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocusCapture={() => setIsPaused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsPaused(false);
                }
              }}
            >
              <div className="relative aspect-3/2 overflow-hidden ribbon-border bg-gold-pale shadow-gold">
                <AnimatePresence mode="wait">
                  {activeSlide && (
                    <motion.div
                      key={activeSlide.id}
                      className="absolute inset-0"
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.55, ease: "easeInOut" }}
                    >
                      <ResponsiveImage
                        path={activeSlide.src}
                        alt={activeSlide.alt}
                        className="w-full h-full object-cover"
                        loading={activeIndex === 0 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gold-pale/80 via-transparent to-transparent flex items-end p-5">
                        <span className="text-xs font-medium text-ink/90 bg-gold-pale/80 backdrop-blur-xs px-3 py-1 rounded-full border border-gold-edge/30">
                          {activeSlide.alt}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {HERO_SLIDES.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousSlide}
                    aria-label="Show previous project"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-parchment/90 text-ink shadow-card flex items-center justify-center hover:bg-parchment hover:border-gold border border-gold-edge/30 focus-visible:outline-2 focus-visible:outline-gold transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextSlide}
                    aria-label="Show next project"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-parchment/90 text-ink shadow-card flex items-center justify-center hover:bg-parchment hover:border-gold border border-gold-edge/30 focus-visible:outline-2 focus-visible:outline-gold transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-2">
                    {HERO_SLIDES.map((slide, index) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Show project ${index + 1}`}
                        aria-current={
                          index === activeIndex ? "true" : undefined
                        }
                        className={`h-2.5 rounded-full border border-white/80 transition-all focus-visible:outline-2 focus-visible:outline-gold ${
                          index === activeIndex
                            ? "w-7 bg-gold"
                            : "w-2.5 bg-white/55 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="absolute -bottom-4 -left-4 sm:-left-5 bg-parchment border border-gold-edge/55 rounded-xl px-4 py-3 shadow-gold flex items-center gap-3 backdrop-blur-xs">
              <div className="w-10 h-10 bg-gold-pale rounded-lg flex items-center justify-center text-gold-deep border border-gold-edge/20">
                <Cake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-ink-muted leading-none mb-0.5">
                  {t("hero.badgeLabel")}
                </p>
                <p className="text-sm font-semibold text-ink">
                  {t("hero.badgeValue")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
