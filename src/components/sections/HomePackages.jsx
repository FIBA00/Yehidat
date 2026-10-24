// [Competitor Pattern: Tinggly / BoxFox Tiered Package Architecture]
// Clean tiered packages with transparent pricing, left-aligned categorized inclusions,
// gold checkmarks, and elevated dark-mode luxury card styling.
import React from "react";
import { useTranslation } from "react-i18next";
import { Check, Sparkles } from "lucide-react";
import { PACKAGES } from "../../data/constants";
import { useAppStore } from "../../store/useAppStore";
import Reveal from "../ui/Reveal";

function getItemCategory(item) {
  const lower = item.toLowerCase();
  if (lower.includes("cake") || lower.includes("ኬክ") || lower.includes("keek")) return "cake";
  if (lower.includes("flower") || lower.includes("አበባ") || lower.includes("ababo")) return "flowers";
  if (
    lower.includes("fire") ||
    lower.includes("spray") ||
    lower.includes("balloon") ||
    lower.includes("ስፕሬይ") ||
    lower.includes("ባልዋን") ||
    lower.includes("ፊኛ") ||
    lower.includes("decoration") ||
    lower.includes("qophii")
  ) {
    return "atmosphere";
  }
  if (
    lower.includes("card") ||
    lower.includes("video") ||
    lower.includes("ካርድ") ||
    lower.includes("ቪዲዮ") ||
    lower.includes("photo") ||
    lower.includes("message") ||
    lower.includes("yaadannoo")
  ) {
    return "memories";
  }
  return null;
}

function PackageCard({ pkg, delay }) {
  const { t } = useTranslation();
  const setSelectedPackageId = useAppStore((s) => s.setSelectedPackageId);

  const handleSelect = () => {
    setSelectedPackageId(pkg.id);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const discountPercent =
    pkg.discount ??
    (pkg.originalPrice
      ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
      : 0);

  const originalPrice =
    pkg.originalPrice ??
    (discountPercent > 0
      ? Math.round(pkg.price / (1 - discountPercent / 100))
      : null);

  const items = t(`packages.${pkg.id}.items`, { returnObjects: true });

  return (
    <Reveal
      delay={delay}
      className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
        pkg.featured
          ? "bg-gold-cream text-ink border-2 border-gold shadow-[0_0_28px_rgba(245,197,24,0.22)] ring-1 ring-gold/40 scale-[1.02] z-10"
          : "bg-parchment/90 text-ink border border-gold-edge/30 hover:border-gold-edge/70 hover:shadow-card"
      }`}
    >
      {pkg.featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1.5 bg-gold text-gold-pale text-[11px] font-bold tracking-wider uppercase px-4 py-1 rounded-full shadow-md shadow-gold/30 whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("packages.mostPopular")}</span>
        </div>
      )}

      {discountPercent > 0 && (
        <div className="absolute -top-3.5 right-4 z-10 inline-flex items-center gap-1.5 bg-gold/15 text-gold border border-gold-edge/50 text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-xs shadow-xs">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
          </span>
          <span>{t("packages.discountOff", { percent: discountPercent })}</span>
        </div>
      )}

      <div>
        <div className="text-left mb-5">
          <p className="font-display font-bold text-xl text-ink mb-1">
            {t(`packages.${pkg.id}.name`)}
          </p>
          <div className="flex flex-wrap items-baseline gap-1.5 my-2">
            <span className="text-xs font-semibold text-gold-deep tracking-wider uppercase">
              ETB
            </span>
            <span className="font-display font-bold leading-none text-3xl sm:text-4xl text-ink">
              {pkg.price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-xs sm:text-sm line-through font-medium ml-1.5 text-ink-muted">
                ETB {originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed min-h-[2.5rem]">
            {t(`packages.${pkg.id}.description`)}
          </p>
        </div>

        <div className="h-px w-full bg-gold-edge/20 my-4" />

        <ul className="flex flex-col gap-3 mb-6 w-full">
          {Array.isArray(items) &&
            items.map((item, idx) => {
              const cat = getItemCategory(item);
              return (
                <li
                  key={idx}
                  className="flex items-start text-left gap-3 text-sm text-ink-soft leading-snug"
                >
                  <Check className="mt-0.5 w-4 h-4 shrink-0 text-gold" />
                  <div className="flex-1 flex flex-wrap items-center justify-between gap-1">
                    <span>{item}</span>
                    {cat && (
                      <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-gold-pale text-gold-deep border border-gold-edge/30">
                        {t(`packages.categories.${cat}`, cat)}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={handleSelect}
          className={`w-full justify-center ${pkg.featured ? "btn-gold" : "btn-outline"}`}
        >
          {t("packages.getStarted")}
        </button>

        <p className="text-center text-[11px] mt-3 text-ink-muted">
          {t("packages.depositNote", { amount: pkg.deposit.toLocaleString() })}
        </p>
      </div>
    </Reveal>
  );
}

export default function HomePackages() {
  const { t } = useTranslation();

  return (
    <section id="packages" className="py-20 bg-gold-pale">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <p className="eyebrow">{t("packages.eyebrow")}</p>
          <h2 className="section-heading mb-3">{t("packages.title")}</h2>
          <p className="text-base text-ink-soft max-w-md mx-auto">
            {t("packages.subtitle")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
