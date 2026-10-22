import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, ArrowRight, ShieldCheck, Sparkles, Clock } from "lucide-react";

// ! internal imports
import { TEAM_MEMBERS } from "../data/team.js";
import { localeFromPath, localizedPath } from "../i18n/routes.js";
import ResponsiveImage from "../components/ui/Image.jsx";
import Reveal from "../components/ui/Reveal.jsx";

const VALUE_ICONS = [ShieldCheck, Sparkles, Clock];

export default function Team() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const homeHref = localizedPath(locale, "/");
  const contactHref = `${homeHref}#contact`;

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
            {t("team.breadcrumbHome")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold-deep/60" />
          <span className="text-gold-deep">{t("team.breadcrumbTeam")}</span>
        </nav>

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">{t("team.eyebrow")}</p>
          <h1 className="section-heading mb-4">{t("team.title")}</h1>
          <p className="text-base text-ink-soft leading-relaxed">
            {t("team.subtitle")}
          </p>
        </div>

        {/* Story / Info Block */}
        <Reveal className="ribbon-border bg-gold-cream/40 p-8 sm:p-10 mb-14">
          <h2 className="font-display font-bold text-2xl text-ink mb-3">
            {t("team.storyTitle")}
          </h2>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed max-w-3xl">
            {t("team.storyText")}
          </p>
        </Reveal>

        {/* Team Photos Showcase */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <Reveal
                key={member.id}
                delay={index * 0.1}
                className="group overflow-hidden rounded-2xl border border-gold-edge/30 bg-gold-cream/20 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-gold"
              >
                <div className="aspect-3/2 w-full overflow-hidden bg-gold-pale">
                  <ResponsiveImage
                    path={{ avif: member.avif, webp: member.webp }}
                    alt={member.alt}
                    width={member.width}
                    height={member.height}
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                    loading={index < 2 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-4 bg-parchment">
                  <p className="font-display font-bold text-sm text-ink mb-0.5">
                    {t(member.labelKey)}
                  </p>
                  <p className="text-xs text-gold-deep font-semibold">
                    Yehidat Team
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Values / Why Choose Us */}
        <div className="mb-16">
          <Reveal className="text-center mb-10">
            <h2 className="section-heading mb-2">
              {t("team.valuesTitle")}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <Reveal
                  key={num}
                  delay={i * 0.1}
                  className="rounded-2xl border border-gold-edge/25 bg-parchment p-6 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-pale text-gold-deep">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-2">
                    {t(`team.val${num}Title`)}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {t(`team.val${num}Desc`)}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <Reveal delay={0.2} className="rounded-3xl border border-gold-edge/40 bg-gold-pale/50 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-sm">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
            {t("team.ctaTitle")}
          </h2>
          <p className="text-sm text-ink-muted mb-6 max-w-md mx-auto">
            {t("team.subtitle")}
          </p>
          <a
            href={contactHref}
            className="btn-gold inline-flex items-center gap-2"
          >
            <span>{t("team.ctaButton")}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </Reveal>
      </div>
    </div>
  );
}
