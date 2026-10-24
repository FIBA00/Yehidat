// [Competitor Pattern: PartySlate Editorial Showcase]
// Editorial photography preview featuring 4:5 aspect ratio cards, smooth hover zooms,
// luxury dark gradient scrims, and contextual occasion captions linking to the full gallery.
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { GALLERY_PHOTOS } from "../../data/gallery";
import { localeFromPath, localizedPath } from "../../i18n/routes";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import Reveal from "../ui/Reveal";
import ResponsiveImage from "../ui/Image";
import SectionBackground from "../ui/SectionBackground";

const FEATURED_ITEMS = GALLERY_PHOTOS.slice(0, 6);

export default function HomeGallery() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const galleryPath = localizedPath(locale, "/gallery");

  return (
    <section id="gallery" className="relative isolate py-20 overflow-hidden">
      <SectionBackground name="gallery" overlay="light" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <p className="eyebrow">{t("gallery.eyebrow")}</p>
          <h2 className="section-heading mb-3">{t("gallery.title")}</h2>
          <p className="text-base text-ink-soft max-w-xl mx-auto">
            {t("gallery.subtitle")}
          </p>
        </Reveal>

        {FEATURED_ITEMS.length === 0 ? (
          <ImagePlaceholder
            src={null}
            hint="No gallery photos yet."
            className="mx-auto h-64 max-w-md"
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {FEATURED_ITEMS.map((item, index) => (
              <Reveal
                key={item.id}
                delay={index * 0.08}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold-edge/30 bg-parchment/90 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-gold"
              >
                <div className="absolute inset-0">
                  <ResponsiveImage
                    path={{ avif: item.avif, webp: item.webp }}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 50vw"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gold-pale/95 via-gold-pale/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4 sm:p-5">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-gold mb-1 inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold" />
                    <span>{t("gallery.momentTag", "Yehidat Moment")}</span>
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-ink leading-snug">
                    {item.alt}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.2} className="text-center">
          <Link
            to={galleryPath}
            className="btn-gold inline-flex items-center gap-2"
          >
            <span>{t("gallery.viewAll")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
