import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import aboutData from "../data/about.json";
import { toSrcSet } from "../data/gallery";
import { localeFromPath, localizedPath } from "../i18n/routes";
import ResponsiveImage from "../components/ui/Image";
import Reveal from "../components/ui/Reveal";

// The team photo comes from src/assets/about, converted by `npm run about-image`.
// Until a photo exists, the header shows a brand gradient in the same layout.
const team = aboutData.items?.[0] ?? null;
const teamPath = team ? { avif: toSrcSet(team.avif), webp: toSrcSet(team.webp) } : null;

const STEPS = [1, 2, 3];

export default function AboutUs() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const contactHref = `${localizedPath(locale)}#contact`;

  return (
    <>
      {/* Header: big text over the team photo */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink pt-32">
        {teamPath ? (
          <ResponsiveImage
            path={teamPath}
            alt={team.alt}
            width={team.width}
            height={team.height}
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink-soft to-gold-deep" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {t("about.eyebrow")}
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.95] text-parchment sm:text-7xl lg:text-8xl">
            {t("about.title")}
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-lg leading-relaxed text-ink-soft">{t("about.intro")}</p>
        </Reveal>
      </section>

      {/* How we work */}
      <section className="bg-gold-pale py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12 text-center">
            <h2 className="section-heading">{t("about.howTitle")}</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step} delay={i * 0.1} className="text-center">
                <div
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold font-display text-xl font-bold text-ink"
                  style={{ boxShadow: "0 0 0 6px #FFF8DC, 0 0 0 7.5px rgba(184,150,12,0.55)" }}
                >
                  {step}
                </div>
                <h3 className="mb-2.5 font-display text-lg font-bold">{t(`how.step${step}Title`)}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{t(`how.step${step}Body`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 text-center">
        <Reveal className="mx-auto max-w-xl px-6">
          <h2 className="section-heading mb-6">{t("about.ctaTitle")}</h2>
          <a href={contactHref} className="btn-gold">
            {t("about.ctaButton")} →
          </a>
        </Reveal>
      </section>
    </>
  );
}
