import React from "react"
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { GALLERY_ITEMS } from "../../data/constants";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import Reveal from "../ui/Reveal";
import ResponsiveImage from "../ui/Image";

// ── GALLERY IMAGE INSERTION ───────────────────────────────────
// In data/constants.js, update GALLERY_ITEMS[n].src with imported paths:
//   import g1 from '../assets/images/gallery-1.jpg'  then  src: g1
// For video (item 0 only, recommended): set type: 'video'
// Sizes: item 0 (large) 800×600px min, items 1–4: 400×300px min
// ─────────────────────────────────────────────────────────────

const HINTS = {
  0: "Photo or video\n800 × 600 px",
  1: "400 × 300 px",
  2: "400 × 300 px",
  3: "400 × 300 px",
  4: "400 × 300 px",
};

export default function Gallery() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRefs = useRef([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || GALLERY_ITEMS.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % GALLERY_ITEMS.length);
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion]);

  // useEffect(() => {
  //   const activeCard = cardRefs.current[activeIndex];
  //   activeCard?.scrollIntoView({
  //     behavior: prefersReducedMotion ? "auto" : "smooth",
  //     inline: "center",
  //     block: "nearest",
  //   });
  // }, [activeIndex, prefersReducedMotion]);

  return (
    <section id="gallery" className="py-20 bg-gold-cream/30">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <p className="eyebrow">{t("gallery.eyebrow")}</p>
          <h2 className="section-heading">{t("gallery.title")}</h2>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="overflow-x-auto snap-x snap-mandatory pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-h-[300px] w-max items-center justify-start gap-0 px-4 py-6 [perspective:1600px]">
              {GALLERY_ITEMS.map((item, i) => {
                const relativePosition = ((i - activeIndex + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
                const wrappedPosition = relativePosition > GALLERY_ITEMS.length / 2 ? relativePosition - GALLERY_ITEMS.length : relativePosition;
                const absDistance = Math.abs(wrappedPosition);
                const isVisible = absDistance <= 2;

                return (
                  <motion.div
                    key={item.id}
                    ref={(node) => {
                      cardRefs.current[i] = node;
                    }}
                    animate={{
                      x: wrappedPosition * 62,
                      y: absDistance * 10,
                      rotateY: wrappedPosition * -16,
                      scale: 1 - absDistance * 0.08,
                      opacity: isVisible ? 1 : 0.55,
                    }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="group relative h-[260px] w-[78vw] max-w-[200px] shrink-0 snap-center first:ml-5"
                    style={{
                      marginLeft: i === 0 ? 0 : "-1rem",
                      zIndex: GALLERY_ITEMS.length - absDistance,
                    }}
                  >
                    <div
                      className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-gold-edge/60 bg-parchment shadow-[0_20px_45px_rgba(0,0,0,0.24)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_25px_55px_rgba(0,0,0,0.40)]"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {item.src ? (
                        <ResponsiveImage
                          path={item.src}
                          alt={item.alt}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImagePlaceholder
                          src={null}
                          alt={item.alt}
                          type={item.type}
                          hint={HINTS[i]}
                          className="h-full w-full"
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
