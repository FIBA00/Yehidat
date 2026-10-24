// [Competitor Pattern: Virgin Experience Gifts Curated Category Grid]
// Curated occasion exploration grid with category hints, hover lift micro-interactions,
// smooth image zooms, and instant 1-click select flowing directly to the concierge form.
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Cake,
  Heart,
  GraduationCap,
  Users,
  Flower2,
  Trophy,
  Sparkles,
} from "lucide-react";
import { OCCASIONS } from "../../data/constants.js";
import { useAppStore } from "../../store/useAppStore.js";
import Reveal from "../ui/Reveal.jsx";
import ResponsiveImage from "../ui/Image.jsx";
import SectionBackground from "../ui/SectionBackground.jsx";

const OCCASION_ICONS = {
  birthday: Cake,
  anniversary: Heart,
  graduation: GraduationCap,
  fathersDay: Users,
  mothersDay: Flower2,
  promotion: Trophy,
  justBecause: Sparkles,
};

const OCCASION_BADGES = {
  birthday: "Cake & Spark",
  anniversary: "Romance",
  graduation: "Milestone",
  fathersDay: "Gratitude",
  mothersDay: "Florals",
  promotion: "Success",
  justBecause: "Pure Joy",
};

export default function HomeOccasions() {
  const { t } = useTranslation();
  const setSelectedOccasion = useAppStore((s) => s.setSelectedOccasion);

  const handlePick = (occasionId) => {
    setSelectedOccasion(occasionId);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="occasions" className="relative isolate py-20 bg-gold-cream/60">
      <SectionBackground name="occasions" overlay="light" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <p className="eyebrow">{t("occasions.eyebrow")}</p>
          <h2 className="section-heading mb-3">{t("occasions.title")}</h2>
          <p className="text-sm sm:text-base text-ink-soft max-w-lg mx-auto">
            {t(
              "occasions.subtitle",
              "Select a celebration to customize a turnkey surprise crafted in complete secrecy.",
            )}
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 max-w-6xl mx-auto"
        >
          {OCCASIONS.map(({ id, src, alt }) => {
            const Icon = OCCASION_ICONS[id] || Sparkles;
            const badge = OCCASION_BADGES[id] || "Celebration";
            return (
              <button
                key={id}
                type="button"
                onClick={() => handlePick(id)}
                className="group relative bg-parchment/90 border border-gold-edge/25 rounded-2xl p-2.5 sm:p-3 text-center
                          transition-all duration-300 hover:-translate-y-2 hover:bg-gold-cream
                          hover:text-ink hover:border-gold hover:shadow-gold flex flex-col justify-between"
              >
                <div className="relative overflow-hidden rounded-xl mb-3 aspect-[3/4] bg-gold-pale border border-gold-edge/20">
                  {src ? (
                    <ResponsiveImage
                      path={src}
                      alt={alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      loading="eager"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gold-deep">
                      <Icon className="w-8 h-8" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-gold-pale/85 text-gold border border-gold-edge/30 backdrop-blur-xs">
                      {t(`occasions.badges.${id}`, badge)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <Icon className="w-3.5 h-3.5 text-gold-deep shrink-0 group-hover:text-gold transition-colors" />
                  <p className="text-xs font-semibold text-ink-soft leading-tight text-center group-hover:text-ink transition-colors">
                    {t(`occasions.${id}`)}
                  </p>
                </div>
              </button>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
