// [Competitor Pattern: Bloom & Wild / BoxFox Brand Storytelling & Discretion Pillars]
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Clock,
  MapPin,
  ArrowRight,
  MessageCircle,
  Award,
} from "lucide-react";

// ! internal imports
import aboutData from "../data/about.json";
import { toSrcSet } from "../data/gallery";
import { CONTACT } from "../data/constants";
import { localeFromPath, localizedPath } from "../i18n/routes";
import ResponsiveImage from "../components/ui/Image";
import Reveal from "../components/ui/Reveal";

// The team photo comes from src/assets/about, converted by `npm run about-image`.
// Until a photo exists, the header shows a brand gradient in the same layout.
const team = aboutData.items?.[0] ?? null;
const teamPath = team ? { avif: toSrcSet(team.avif), webp: toSrcSet(team.webp) } : null;

const PILLAR_ICONS = [ShieldCheck, Sparkles, Clock];

export default function AboutUs() {
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
            {t("gallery.breadcrumbHome")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold-deep/60" />
          <span className="text-gold">
            {t("nav.about", "About Us")}
          </span>
        </nav>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-gold-edge/30 bg-gold-pale mb-16 shadow-card">
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
            <div className="absolute inset-0 bg-gradient-to-br from-gold-pale via-gold-cream to-parchment" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gold-pale via-gold-pale/85 to-transparent" />

          <div className="relative px-6 py-16 sm:px-12 sm:py-20 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-edge/40 bg-gold-pale/80 text-gold text-xs font-semibold tracking-wide uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{t("about.eyebrow")}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-ink mb-4 leading-tight">
              {t("about.title")}
            </h1>
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl mb-6">
              {t("about.heroSubtitle", t("about.intro"))}
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-gold-edge/30 bg-parchment/80 text-xs font-medium text-gold">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>{t("about.discretionBadge", "100% Discreet Coordination • East Shewa")}</span>
            </div>
          </div>
        </div>

        {/* Our Story Narrative Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gold mb-2">
                <Award className="w-4 h-4 text-gold" />
                <span>{t("about.storySectionTitle", "Our Story: The Art of the Unexpected")}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-6 leading-snug">
                {t("about.intro")}
              </h2>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed mb-4">
                {t("about.storyParagraph1", "Yehidat was born from a simple conviction: love and milestone celebrations deserve grand, breathtaking gestures that catch people completely off guard. Sourcing fresh flowers, custom confectionery, festive decor, and timing a surprise to the exact minute is stressful — especially when you're trying to keep it a secret from the person you live with or coordinating from abroad.")}
              </p>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                {t("about.storyParagraph2", "We stepped in to be your stealth celebration partner. From Lake Bishoftu garden villas to Dukem family homes, our local team orchestrates every single element in complete discretion. You tell us who and when; we handle every secret detail; you take all the heartfelt credit.")}
              </p>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="ribbon-border bg-gold-pale/80 p-7 sm:p-8 flex flex-col justify-between shadow-card">
                <div className="mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold-edge/30 flex items-center justify-center text-gold mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <blockquote className="font-display italic text-base sm:text-lg text-ink leading-relaxed">
                    {t("about.quoteText", "“You tell us who, where, and when. We handle every secret detail. You take all the credit.”")}
                  </blockquote>
                </div>
                <div className="pt-6 border-t border-gold-edge/20 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink-muted">{t("about.statSurprises", "200+ Surprises Planned")}</span>
                    <span className="text-gold font-bold">★★★★★ 5.0</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink-muted">{t("about.statDiscretion", "100% Confidentiality Record")}</span>
                    <span className="text-gold font-bold">100% Covert</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink-muted">{t("about.statHubs", "Dukem & Bishoftu Hubs")}</span>
                    <span className="text-gold font-bold">East Shewa</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3 Core Brand Pillars */}
        <section className="mb-20">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow">{t("about.pillarsTitle", "The 3 Pillars of Our Craft")}</p>
            <h2 className="section-heading mb-3">{t("about.howTitle")}</h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              {t("about.pillarsSubtitle", "Every celebration we create is grounded in three uncompromising standards of excellence.")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((step, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal
                  key={step}
                  delay={i * 0.1}
                  className="rounded-2xl border border-gold-edge/30 bg-gold-pale/70 p-7 text-center shadow-card hover:border-gold hover:shadow-gold transition-all duration-300 flex flex-col items-center"
                >
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold font-display text-xl font-bold text-parchment"
                    style={{
                      boxShadow:
                        "0 0 0 4px var(--color-gold-pale), 0 0 0 6px var(--color-gold-edge)",
                    }}
                  >
                    <Icon className="w-6 h-6 text-parchment" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-ink">
                    {t(`about.pillar${step}Title`, t(`how.step${step}Title`))}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                    {t(`about.pillar${step}Desc`, t(`how.step${step}Body`))}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Local Operational Presence Section */}
        <section className="mb-20">
          <div className="rounded-3xl border border-gold-edge/30 bg-gold-cream/40 p-8 sm:p-12 shadow-card">
            <Reveal className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{t("about.presenceTitle", "Local Operational Presence")}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-3">
                Dukem, Bishoftu & East Shewa Zone
              </h2>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                {t("about.presenceSubtitle", "Rooted in East Shewa with rapid on-the-ground execution and deep local vendor partnerships.")}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Reveal delay={0.1} className="rounded-2xl border border-gold-edge/20 bg-parchment/90 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-gold font-bold text-sm mb-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{t("about.locationBishoftuTitle", "Bishoftu Lake & Resort Staging")}</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t("about.locationBishoftuDesc", "Romantic lakeside dinner surprises, lakeside villa setups, and milestone anniversaries at Bishoftu's premier resorts.")}
                </p>
              </Reveal>

              <Reveal delay={0.2} className="rounded-2xl border border-gold-edge/20 bg-parchment/90 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-gold font-bold text-sm mb-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{t("about.locationDukemTitle", "Dukem Central Operations")}</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t("about.locationDukemDesc", "Home surprise transformations, family milestones, bakery dispatch, and rapid local delivery hub.")}
                </p>
              </Reveal>

              <Reveal delay={0.3} className="rounded-2xl border border-gold-edge/20 bg-parchment/90 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-gold font-bold text-sm mb-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{t("about.locationEastShewaTitle", "East Shewa & Addis Corridor")}</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t("about.locationEastShewaDesc", "Express delivery across the expressway corridor, specialized corporate milestones, and diaspora-funded surprises.")}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <Reveal delay={0.2} className="rounded-3xl border border-gold-edge/40 bg-gradient-to-br from-gold-pale via-parchment to-gold-pale p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-card">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gold/10 border border-gold-edge/30 text-gold mb-4 mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
            {t("about.ctaTitle")}
          </h2>
          <p className="text-sm sm:text-base text-ink-soft mb-6 max-w-lg mx-auto leading-relaxed">
            {t("team.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={contactHref}
              className="btn-gold inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span>{t("about.ctaButton")}</span>
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

