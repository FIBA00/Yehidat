// [Competitor Pattern: Bloom & Wild / BoxFox 3-Step Choreography]
// Clear, anxiety-reducing 3-step emotional journey illustrating the secret coordination,
// artisan staging, and effortless reveal moment.
import React from "react";
import { useTranslation } from "react-i18next";
import { MessageSquareHeart, Sparkles, Heart } from "lucide-react";
import Reveal from "../ui/Reveal";

const STEP_ICONS = [MessageSquareHeart, Sparkles, Heart];

export default function HomeHowItWorks() {
  const { t } = useTranslation();

  return (
    <section id="how" className="py-20 bg-parchment/60">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <p className="eyebrow">{t("how.eyebrow")}</p>
          <h2 className="section-heading mb-3">{t("how.title")}</h2>
          <p className="text-base text-ink-soft max-w-lg mx-auto">
            {t(
              "how.subtitle",
              "Three effortless steps from your vision to an unforgettable emotional reveal.",
            )}
          </p>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="hidden md:block absolute top-12 left-[18%] right-[18%] h-0.5 z-0"
            style={{
              background:
                "linear-gradient(90deg, #b8960c 0%, rgba(245,197,24,0.7) 50%, #b8960c 100%)",
            }}
          />

          {[1, 2, 3].map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <Reveal
                key={step}
                delay={i * 0.12}
                className="relative z-10 bg-gold-cream/40 border border-gold-edge/25 rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:border-gold hover:shadow-gold hover:-translate-y-1.5 flex flex-col items-center"
              >
                <div
                  className="w-14 h-14 rounded-full bg-linear-to-br from-gold to-gold-deep mb-5 flex items-center justify-center font-display font-bold text-xl text-gold-pale"
                  style={{
                    boxShadow:
                      "0 0 0 5px var(--color-gold-pale), 0 0 0 7px rgba(245,197,24,0.4), 0 8px 20px rgba(245,197,24,0.15)",
                  }}
                >
                  {step}
                </div>
                <div className="mb-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-gold-pale text-gold-deep border border-gold-edge/30">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-lg text-ink mb-2.5">
                  {t(`how.step${step}Title`)}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {t(`how.step${step}Body`)}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.35} className="mt-12 text-center">
          <p className="text-xs text-ink-muted inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-pale border border-gold-edge/30">
            <span className="text-gold">✦</span>
            <span>
              {t(
                "how.secrecyFootnote",
                "100% Secret & Discreet: They will never suspect a thing until the reveal moment.",
              )}
            </span>
            <span className="text-gold">✦</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
