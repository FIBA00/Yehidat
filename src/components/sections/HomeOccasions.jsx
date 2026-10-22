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

const OCCASION_ICONS = {
  birthday: Cake,
  anniversary: Heart,
  graduation: GraduationCap,
  fathersDay: Users,
  mothersDay: Flower2,
  promotion: Trophy,
  justBecause: Sparkles,
};

import SectionBackground from "../ui/SectionBackground";

export default function HomeOccasions() {
  const { t } = useTranslation();
  const setSelectedOccasion = useAppStore((s) => s.setSelectedOccasion);

  const handlePick = (occasionId) => {
    setSelectedOccasion(occasionId);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="occasions" className="relative isolate py-20 bg-gold-cream">
      <SectionBackground name="occasions" overlay="light" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <p className="eyebrow">{t("occasions.eyebrow")}</p>
          <h2 className="section-heading">{t("occasions.title")}</h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mx-auto flex w-full max-w-full flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {OCCASIONS.map(({ id, src, alt }) => {
            const Icon = OCCASION_ICONS[id] || Sparkles;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handlePick(id)}
                className="group w-[calc(50%-0.5rem)] bg-parchment border border-gold-edge/25 rounded-xl p-2 text-center
                          transition-all duration-200 hover:-translate-y-1 hover:bg-gold-cream
                          hover:text-ink hover:border-gold-edge hover:shadow-gold
                          sm:w-[calc(25%-0.75rem)] lg:w-[calc(12.5%-0.5rem)]"
              >
                <div className="relative overflow-hidden rounded-lg mb-3 aspect-[3/4] bg-gold-pale">
                  {src ? (
                    <ResponsiveImage
                      path={src}
                      alt={alt}
                      className="w-full h-full"
                      loading="eager"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gold-deep">
                      <Icon className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1.5">
                  <Icon className="w-4 h-4 text-gold-deep shrink-0" />
                  <p className="text-xs font-semibold text-ink-soft leading-tight text-left">
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
