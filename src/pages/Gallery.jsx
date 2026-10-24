// [Competitor Pattern: PartySlate Editorial Gallery & Inquiry Flow]
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronRight,
  ChevronLeft,
  X,
  ArrowRight,
  MapPin,
  Sparkles,
  Eye,
  MessageCircle,
} from "lucide-react";

// ! internal imports
import { GALLERY_PHOTOS } from "../data/gallery.js";
import { CONTACT } from "../data/constants.js";
import { localeFromPath, localizedPath } from "../i18n/routes.js";
import ImagePlaceholder from "../components/ui/ImagePlaceholder.jsx";
import ResponsiveImage from "../components/ui/Image.jsx";

const CATEGORIES = [
  { key: "all", labelKey: "gallery.filterAll" },
  { key: "surprises", labelKey: "gallery.filterSurprises" },
  { key: "cakes", labelKey: "gallery.filterCakes" },
  { key: "outdoor", labelKey: "gallery.filterOutdoor" },
];

const LOCATION_TAGS = [
  "Bishoftu Lakeside",
  "Dukem Celebration",
  "East Shewa Resort",
  "Bishoftu Garden Villa",
  "Dukem Residence",
  "Bishoftu Pavilion",
  "East Shewa Lakeside",
  "Dukem Terrace",
];

function getLocationTag(photo, index) {
  if (photo.category === "outdoor") return "Bishoftu Lakeside Pavilion";
  if (photo.category === "cakes") return "Artisan Bakery Studio • Dukem";
  return LOCATION_TAGS[index % LOCATION_TAGS.length];
}

export default function Gallery() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const homeHref = localizedPath(locale, "/");
  const contactHref = `${homeHref}#contact`;

  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categoryCounts = useMemo(() => {
    const counts = { all: GALLERY_PHOTOS.length, surprises: 0, cakes: 0, outdoor: 0 };
    for (const photo of GALLERY_PHOTOS) {
      if (counts[photo.category] !== undefined) {
        counts[photo.category] += 1;
      }
    }
    return counts;
  }, []);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((photo) => photo.category === activeCategory);
  }, [activeCategory]);

  const activePhoto =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  const handleKeyDown = useCallback(
    (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((i) => (i + 1) % filteredPhotos.length);
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex(
          (i) => (i - 1 + filteredPhotos.length) % filteredPhotos.length,
        );
      }
    },
    [lightboxIndex, filteredPhotos.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="pt-28 pb-20 bg-parchment min-h-screen text-ink">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-ink-muted mb-6"
        >
          <Link
            to={homeHref}
            className="hover:text-gold transition-colors"
          >
            {t("gallery.breadcrumbHome")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold-deep/60" />
          <span className="text-gold">
            {t("gallery.breadcrumbGallery")}
          </span>
        </nav>

        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-edge/40 bg-gold-pale/80 text-gold text-xs font-semibold tracking-wide uppercase mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{t("gallery.eyebrow")}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-4">
            {t("gallery.pageTitle")}
          </h1>
          <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
            {t("gallery.pageSubtitle")}
          </p>
        </div>

        {/* Category Filters (Sleek pills with counts) */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-2 border-b border-gold-edge/20">
          {CATEGORIES.map(({ key, labelKey }) => {
            const count = categoryCounts[key] ?? 0;
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveCategory(key);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-gold text-parchment shadow-gold border border-gold"
                    : "bg-gold-pale/80 text-ink-soft border border-gold-edge/30 hover:border-gold hover:text-ink hover:bg-gold-cream/60"
                }`}
              >
                <span>{t(labelKey)}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? "bg-parchment/20 text-parchment"
                      : "bg-gold-cream text-ink-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Photos Grid - Editorial Layout */}
        {filteredPhotos.length === 0 ? (
          <ImagePlaceholder
            src={null}
            hint="No photos found in this category."
            className="mx-auto h-64 max-w-md my-12"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mb-16">
            {filteredPhotos.map((item, index) => {
              const locationTag = getLocationTag(item, index);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold-edge/30 bg-gold-pale shadow-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-gold cursor-pointer"
                >
                  <ResponsiveImage
                    path={{ avif: item.avif, webp: item.webp }}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 1280px) 280px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    loading={index < 8 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-parchment/80 backdrop-blur-xs border border-gold-edge/30 text-gold text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase">
                      {item.category === "cakes"
                        ? t("gallery.filterCakes")
                        : item.category === "outdoor"
                          ? t("gallery.filterOutdoor")
                          : t("gallery.filterSurprises")}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-gold-pale/80 backdrop-blur-xs border border-gold-edge/30 flex items-center justify-center text-gold-deep group-hover:text-gold group-hover:scale-110 transition-all">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom Gradient Scrim & Location Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gold-pale via-gold-pale/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex items-center gap-1.5 text-gold-deep text-xs font-medium mb-1">
                      <MapPin className="w-3 h-3 text-gold shrink-0" />
                      <span className="truncate">{locationTag}</span>
                    </div>
                    <p className="font-display text-sm font-bold text-ink leading-tight line-clamp-1 group-hover:text-gold-light transition-colors">
                      {item.alt}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Lightbox Modal - PartySlate Pattern */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 rounded-full bg-gold-pale/80 border border-gold-edge/40 text-ink hover:text-gold hover:border-gold flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Chevrons */}
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(
                        (i) =>
                          (i - 1 + filteredPhotos.length) %
                          filteredPhotos.length,
                      );
                    }}
                    aria-label="Previous photo"
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-gold-pale/80 border border-gold-edge/40 text-ink hover:text-gold hover:border-gold flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(
                        (i) => (i + 1) % filteredPhotos.length,
                      );
                    }}
                    aria-label="Next photo"
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-gold-pale/80 border border-gold-edge/40 text-ink hover:text-gold hover:border-gold flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Lightbox Dialog Container */}
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Photo Lightbox"
                className="relative max-h-[92vh] max-w-4xl w-full overflow-hidden rounded-2xl border border-gold-edge/40 bg-gold-pale shadow-2xl p-4 sm:p-5 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header Bar */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-gold-edge/20 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold-edge/30 font-semibold uppercase tracking-wider text-[10px]">
                      {activePhoto.category === "cakes"
                        ? t("gallery.filterCakes")
                        : activePhoto.category === "outdoor"
                          ? t("gallery.filterOutdoor")
                          : t("gallery.filterSurprises")}
                    </span>
                    <span className="text-ink-muted hidden sm:inline">•</span>
                    <span className="text-ink-soft hidden sm:inline flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold" />
                      {getLocationTag(activePhoto, lightboxIndex)}
                    </span>
                  </div>
                  <span className="text-gold font-mono font-semibold">
                    {lightboxIndex + 1} / {filteredPhotos.length}
                  </span>
                </div>

                {/* Modal Image Area */}
                <div className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden rounded-xl bg-black/50">
                  <ResponsiveImage
                    path={{ avif: activePhoto.avif, webp: activePhoto.webp }}
                    alt={activePhoto.alt}
                    width={activePhoto.width}
                    height={activePhoto.height}
                    sizes="(max-width: 1024px) 95vw, 900px"
                    loading="eager"
                    className="max-h-[66vh] w-auto max-w-full object-contain rounded-xl"
                  />
                </div>

                {/* Modal Footer Strip with Direct Inquiry Action */}
                <div className="pt-3 px-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <p className="font-display font-bold text-sm text-ink mb-0.5">
                      {activePhoto.alt}
                    </p>
                    <p className="text-ink-muted text-[11px] sm:hidden flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold" />
                      {getLocationTag(activePhoto, lightboxIndex)}
                    </p>
                  </div>
                  <a
                    href={contactHref}
                    onClick={() => setLightboxIndex(null)}
                    className="btn-gold text-xs py-2 px-4 shadow-sm inline-flex items-center gap-2 font-semibold shrink-0"
                  >
                    <span>{t("gallery.bookSetup", "Book this setup")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editorial Luxury Call to Action Banner */}
        <div className="rounded-3xl border border-gold-edge/40 bg-gradient-to-br from-gold-pale via-parchment to-gold-pale p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-card">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gold/10 border border-gold-edge/30 text-gold mb-4 mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
            {t("gallery.ctaTitle")}
          </h2>
          <p className="text-sm sm:text-base text-ink-soft mb-6 max-w-lg mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={contactHref}
              className="btn-gold inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span>{t("gallery.ctaButton")}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${CONTACT.WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-4 h-4 text-gold" />
              <span>{t("gallery.ctaWhatsapp", "Direct WhatsApp Inquiry")}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

