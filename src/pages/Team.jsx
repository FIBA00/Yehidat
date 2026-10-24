// [Competitor Pattern: The Knot / Virgin Experience Gifts Concierge Team]
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock,
  MessageCircle,
  Users,
} from "lucide-react";

// ! internal imports
import { TEAM_MEMBERS } from "../data/team.js";
import { CONTACT } from "../data/constants.js";
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
    <div className="pt-28 pb-20 bg-parchment min-h-screen text-ink">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-ink-muted mb-6"
        >
          <Link
            to={homeHref}
            className="hover:text-gold transition-colors"
          >
            {t("team.breadcrumbHome")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold-deep/60" />
          <span className="text-gold">{t("team.breadcrumbTeam")}</span>
        </nav>

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-edge/40 bg-gold-pale/80 text-gold text-xs font-semibold tracking-wide uppercase mb-3.5">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span>{t("team.eyebrow")}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-4">
            {t("team.title")}
          </h1>
          <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
            {t("team.subtitle")}
          </p>
        </div>

        {/* Story / Info Block */}
        <Reveal className="ribbon-border bg-gold-cream/40 p-8 sm:p-10 mb-14">
          <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Yehidat Concierge Story</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-4">
            {t("team.storyTitle")}
          </h2>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed max-w-3xl">
            {t("team.storyText")}
          </p>
        </Reveal>

        {/* Team Photos Showcase - Luxury Card Containers */}
        <div className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <Reveal
                key={member.id}
                delay={index * 0.1}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gold-edge/30 bg-gold-pale/80 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-gold"
              >
                <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-gold-cream/40">
                  <ResponsiveImage
                    path={{ avif: member.avif, webp: member.webp }}
                    alt={member.alt}
                    width={member.width}
                    height={member.height}
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                    loading={index < 2 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-parchment/85 backdrop-blur-xs border border-gold-edge/40 text-gold text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase">
                      {t(`team.member${index + 1}Specialty`, "East Shewa")}
                    </span>
                  </div>
                </div>
                <div className="p-5 bg-parchment/95 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-gold-deep uppercase tracking-wider mb-1">
                      {t(member.labelKey)}
                    </p>
                    <h3 className="font-display font-bold text-base text-ink mb-2">
                      {t(`team.member${index + 1}Role`, member.alt)}
                    </h3>
                    <p className="text-xs italic text-ink-soft leading-relaxed mb-3">
                      {t(`team.member${index + 1}Passion`)}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gold-edge/15 flex items-center justify-between text-[11px] text-ink-muted">
                    <span>Yehidat Specialist</span>
                    <span className="text-gold font-medium">★★★★★</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Values / Why Choose Us */}
        <div className="mb-20">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow">{t("team.eyebrow")}</p>
            <h2 className="section-heading mb-3">
              {t("team.valuesTitle")}
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              {t("about.pillarsSubtitle", "Every celebration we create is grounded in three uncompromising standards of excellence.")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((num, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <Reveal
                  key={num}
                  delay={i * 0.1}
                  className="rounded-2xl border border-gold-edge/30 bg-gold-pale/70 p-7 text-center shadow-card hover:border-gold hover:shadow-gold transition-all duration-300 flex flex-col items-center"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 border border-gold-edge/30 text-gold">
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

        {/* Concierge Inquiry Call to Action */}
        <Reveal delay={0.2} className="rounded-3xl border border-gold-edge/40 bg-gradient-to-br from-gold-pale via-parchment to-gold-pale p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-card">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gold/10 border border-gold-edge/30 text-gold mb-4 mx-auto">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
            {t("team.conciergeTitle", "Speak With Our Surprise Planners")}
          </h2>
          <p className="text-sm sm:text-base text-ink-soft mb-6 max-w-lg mx-auto leading-relaxed">
            {t("team.conciergeSubtitle", "Have a unique idea, custom venue, or strict timing requirement? Our team is on standby to coordinate your bespoke celebration across Bishoftu, Dukem, and East Shewa.")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={contactHref}
              className="btn-gold inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span>{t("team.conciergeButton", "Request a Consultation")}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${CONTACT.WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-4 h-4 text-gold" />
              <span>{t("about.chatWhatsapp", "Chat on WhatsApp")}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

