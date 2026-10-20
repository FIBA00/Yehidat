import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";

// ! internal imports
import { TRUST_FACES } from "../../data/constants.js";
import { HERO_PHOTOS } from "../../data/gallery.js";
import { useAppStore } from "../../store/useAppStore.js";
import ResponsiveImage from "../ui/Image.jsx";

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
    <section className="pt-32 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="display-heading mb-5">
              {t("hero.titleLine1")}{" "}
              <span className="italic font-display text-gold-deep">
                {t("hero.titleEmphasis")}
              </span>
            </h1>
            <div className="inline-flex items-center gap-2 bg-gold-pale border border-gold-edge/55 rounded-full px-4 py-1.5 mb-5 ">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-[11px] font-semibold text-gold-deep tracking-wide uppercase">
                {t("hero.tag")}
              </span>
            </div>
            <p className="text-lg text-ink-soft leading-relaxed mb-9 max-w-md">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => {
                  clearSelection();
                  scrollTo("contact");
                }}
                className="btn-gold"
              >
                {t("hero.ctaPrimary")} <span>→</span>
              </button>
              <button onClick={() => scrollTo("how")} className="btn-outline">
                {t("hero.ctaSecondary")}
              </button>
            </div>

            <div className="flex items-center gap-3 mt-9">
              <div className="flex">
                {TRUST_FACES.map((src, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-parchment overflow-hidden -ml-2 first:ml-0 bg-linear-to-br from-gold to-gold-deep flex items-center justify-center text-xs font-semibold text-ink"
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
                <div className="w-8 h-8 rounded-full border-2 border-parchment -ml-2 bg-gold flex items-center justify-center text-[10px] font-bold text-ink">
                  +
                </div>
              </div>
              <p className="text-sm text-ink-muted">
                <strong className="text-ink font-semibold">
                  {t("hero.trustCount")}
                </strong>{" "}
                {t("hero.trustLabel")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative order-first lg:order-last "
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
              {/* horizontally long  */}
              <div className="relative aspect-3/2 overflow-hidden ribbon-border bg-gold-pale ">
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
                        className="w-full h-full"
                        loading={activeIndex === 0 ? "eager" : "lazy"}
                      />
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-parchment/90 text-ink shadow-card flex items-center justify-center hover:bg-parchment focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                  <button
                    type="button"
                    onClick={showNextSlide}
                    aria-label="Show next project"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-parchment/90 text-ink shadow-card flex items-center justify-center hover:bg-parchment focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <span aria-hidden="true">→</span>
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
                            ? "w-7 bg-white"
                            : "w-2.5 bg-white/55 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="absolute -bottom-4 -left-4 sm:-left-5 bg-parchment border border-gold-edge/55 rounded-xl px-4 py-3 shadow-card flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-pale rounded-lg flex items-center justify-center text-xl">
                🎂
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
