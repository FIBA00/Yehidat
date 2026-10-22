import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { GALLERY_PHOTOS } from "../../data/gallery";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import Reveal from "../ui/Reveal";
import ResponsiveImage from "../ui/Image";
import { Link } from "react-router-dom";

// Photos are not listed in code. They come from src/data/gallery.json, which
// `npm run gallery` builds from the photos in src/assets/gallery.
// To add photos: drop them in that folder, run `npm run gallery`, commit.

const ITEMS = GALLERY_PHOTOS;

import SectionBackground from "../ui/SectionBackground";

export default function HomeGallery() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const count = ITEMS.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || count < 2) return undefined;
    const id = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % count);
    }, 2600);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, count]);

  return (
    <section id="gallery" className="relative isolate py-20 bg-gold-cream/30">
      <SectionBackground name="gallery" overlay="light" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <p className="eyebrow">{t("gallery.eyebrow")}</p>
          <h2 className="section-heading">{t("gallery.title")}</h2>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          {count === 0 ? (
            <ImagePlaceholder
              src={null}
              hint={"No gallery photos yet.\nAdd them to src/assets/gallery, then run npm run gallery."}
              className="mx-auto h-65 max-w-md"
            />
          ) : (
            <div className="overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-h-75 w-max items-center justify-start gap-0 px-4 py-6 perspective:[1600px]">
                {ITEMS.map((item, i) => {
                  const relative = (i - activeIndex + count) % count;
                  const wrapped = relative > count / 2 ? relative - count : relative;
                  const absDistance = Math.abs(wrapped);
                  const isVisible = absDistance <= 2;

                  return (
                    <motion.div
                      key={item.id}
                      animate={{
                        x: wrapped * 62,
                        y: absDistance * 10,
                        rotateY: wrapped * -16,
                        scale: 1 - absDistance * 0.08,
                        opacity: isVisible ? 1 : 0.55,
                      }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className="group relative h-65 w-[78vw] max-w-50 shrink-0 snap-center first:ml-5"
                      style={{
                        marginLeft: i === 0 ? 0 : "-1rem",
                        zIndex: count - absDistance,
                      }}
                    >
                      <div
                        className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-gold-edge/60 bg-parchment shadow-[0_20px_45px_rgba(0,0,0,0.24)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_25px_55px_rgba(0,0,0,0.40)]"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <ResponsiveImage
                          path={{ avif: item.avif, webp: item.webp }}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                          sizes="(min-width: 640px) 200px, 78vw"
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
          <Link to="/gallery" className="btn-gold">
            Watch More
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
