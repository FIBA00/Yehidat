import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, ChevronLeft, X, ArrowRight } from "lucide-react";

// ! internal imports
import { GALLERY_PHOTOS } from "../data/gallery.js";
import { localeFromPath, localizedPath } from "../i18n/routes.js";
import ImagePlaceholder from "../components/ui/ImagePlaceholder.jsx";
import ResponsiveImage from "../components/ui/Image.jsx";

const CATEGORIES = [
  { key: "all", labelKey: "gallery.filterAll" },
  { key: "surprises", labelKey: "gallery.filterSurprises" },
  { key: "cakes", labelKey: "gallery.filterCakes" },
  { key: "outdoor", labelKey: "gallery.filterOutdoor" },
];

export default function Gallery() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const homeHref = localizedPath(locale, "/");
  const contactHref = `${homeHref}#contact`;

  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

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
    <div className="pt-28 pb-20 bg-parchment min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-ink-muted mb-6"
        >
          <Link
            to={homeHref}
            className="hover:text-gold-deep transition-colors"
          >
            {t("gallery.breadcrumbHome")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold-deep/60" />
          <span className="text-gold-deep">
            {t("gallery.breadcrumbGallery")}
          </span>
        </nav>

        {/* Page Header */}
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow">{t("gallery.eyebrow")}</p>
          <h1 className="section-heading mb-3">{t("gallery.pageTitle")}</h1>
          <p className="text-base text-ink-soft leading-relaxed">
            {t("gallery.pageSubtitle")}
          </p>
        </div>

        {/* Category Filters (Sectioned Gallery) */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {CATEGORIES.map(({ key, labelKey }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setActiveCategory(key);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 ${
                activeCategory === key
                  ? "bg-gold text-ink shadow-sm"
                  : "bg-parchment text-ink-soft border border-gold-edge/30 hover:border-gold hover:text-ink"
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        {filteredPhotos.length === 0 ? (
          <ImagePlaceholder
            src={null}
            hint="No photos found in this category."
            className="mx-auto h-64 max-w-md my-12"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {filteredPhotos.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold-edge/30 bg-parchment shadow-sm text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-gold cursor-pointer"
              >
                <ResponsiveImage
                  path={{ avif: item.avif, webp: item.webp }}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
                  loading={index < 8 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3.5">
                  <p className="text-xs font-semibold text-parchment leading-tight">
                    {item.alt}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              onClick={() => setLightboxIndex(null)}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close"
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-parchment/20 text-parchment hover:bg-parchment/40 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

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
                    aria-label="Previous"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-parchment/20 text-parchment hover:bg-parchment/40 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(
                        (i) => (i + 1) % filteredPhotos.length,
                      );
                    }}
                    aria-label="Next"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-parchment/20 text-parchment hover:bg-parchment/40 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div
                className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl bg-black/40 p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-h-[75vh] overflow-hidden rounded-xl flex items-center justify-center">
                  <ResponsiveImage
                    path={{ avif: activePhoto.avif, webp: activePhoto.webp }}
                    alt={activePhoto.alt}
                    width={activePhoto.width}
                    height={activePhoto.height}
                    sizes="90vw"
                    loading="eager"
                    className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl"
                  />
                </div>
                <div className="pt-3 px-2 flex items-center justify-between text-xs text-parchment/80">
                  <span>{activePhoto.alt}</span>
                  <span>
                    {lightboxIndex + 1} / {filteredPhotos.length}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to action section */}
        <div className="rounded-3xl border border-gold-edge/40 bg-gold-pale/50 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-sm">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
            {t("gallery.ctaTitle")}
          </h2>
          <p className="text-sm text-ink-muted mb-6 max-w-md mx-auto">
            {t("hero.subtitle")}
          </p>
          <a
            href={contactHref}
            className="btn-gold inline-flex items-center gap-2"
          >
            <span>{t("gallery.ctaButton")}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
