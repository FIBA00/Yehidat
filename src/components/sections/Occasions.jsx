import React from "react";
import { useTranslation } from "react-i18next";
import { OCCASIONS } from "../../data/constants.js";
import { useAppStore } from "../../store/useAppStore";
import Reveal from "../ui/Reveal";
import ResponsiveImage from "../ui/Image.jsx";

export default function Occasions() {
  const { t } = useTranslation();
  const setSelectedOccasion = useAppStore((s) => s.setSelectedOccasion);

  const handlePick = (occasionId) => {
    setSelectedOccasion(occasionId);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="occasions" className="py-20 bg-gold-cream">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <p className="eyebrow">{t("occasions.eyebrow")}</p>
          <h2 className="section-heading">{t("occasions.title")}</h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
        >
          {OCCASIONS.map(({ id, emoji, src, alt }) => (
            <button
              key={id}
              type="button"
              onClick={() => handlePick(id)}
              className="group bg-parchment border border-gold-edge/25 rounded-xl p-2 text-center
                        transition-all duration-200 hover:-translate-y-1 hover:bg-gold-cream
                        hover:text-ink hover:border-gold-edge hover:shadow-gold"
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
                 <div className="flex h-full items-center justify-center text-4xl text-gold-deep">
                   {emoji}
                 </div>
               )}
              </div>

              <div className="flex items-center justify-center gap-2">
               <span className="text-xl leading-none">{emoji}</span>
               <p className="text-xs font-semibold text-ink-soft leading-tight text-left">
                 {t(`occasions.${id}`)}
               </p>
              </div>
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
