import React from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { PACKAGES } from "../../data/constants";
import { useAppStore } from "../../store/useAppStore";
import Reveal from "../ui/Reveal";

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
      className={`relative rounded-2xl p-6  sm:h-160 sm:w-auto transition-transform duration-200 hover:-translate-y-1 ${
        pkg.featured
          ? "bg-ink text-parchment border border-gold-edge/55"
          : "bg-parchment ribbon-border"
      }`}
    >
      {pkg.featured && (
        <div
          className={`absolute -top-3 ${
            discountPercent > 0 ? "left-4" : "left-1/2 -translate-x-1/2"
          } bg-gold text-ink text-[11px] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full whitespace-nowrap`}
        >
          {t("packages.mostPopular")}
        </div>
      )}

      {discountPercent > 0 && (
        <div className="absolute -top-3 right-4 z-10 inline-flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md shadow-red-600/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span>{t("packages.discountOff", { percent: discountPercent })}</span>
        </div>
      )}

    <div className="flex-col place-items-center">
      <p className={`font-display font-bold text-lg mb-1 ${pkg.featured ? "text-gold" : "text-ink"}`}> {t(`packages.${pkg.id}.name`)} </p>
      <div className="flex flex-wrap items-baseline justify-center gap-1.5 mb-2">
        <span
          className={`text-sm font-semibold ${pkg.featured ? "text-gold" : "text-gold-deep"}`} > ETB </span>
        <span
          className={`font-display font-bold leading-none text-4xl ${pkg.featured ? "text-gold" : "text-ink"}`}
        >{pkg.price.toLocaleString()}</span>
        {originalPrice && (
          <span
            className={`text-xs sm:text-sm line-through font-medium ml-1 ${pkg.featured ? "text-parchment/50" : "text-ink-muted/80"}`}
          >
            ETB {originalPrice.toLocaleString()}
          </span>
        )}
      </div>

      <p
        className={`text-sm mb-7 leading-relaxed ${pkg.featured ? "text-parchment/70" : "text-ink-muted"}`}
      >{t(`packages.${pkg.id}.description`)}</p>

      <ul className="flex flex-col gap-2.5 mb-7">
        {items.map((item) => (
          <li
            key={item}
            className={`flex items-start gap-2.5 text-sm ${pkg.featured ? "text-parchment/75" : "text-ink-soft"}`}
          >
            <Check
              className={`mt-0.5 w-4 h-4 shrink-0 ${pkg.featured ? "text-gold" : "text-gold-deep"}`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

      <div className="flex-col">
        <button
          onClick={handleSelect}
          className={`w-full justify-center ${pkg.featured ? "btn-gold" : "btn-outline"}`}
        >
          {t("packages.getStarted")}
        </button>

        <p
          className={`text-center text-[11px] mt-3 ${pkg.featured ? "text-parchment/40" : "text-ink-muted"}`}
        >
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-4xl mx-auto">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
