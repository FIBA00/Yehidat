// [Competitor Pattern: The Knot Objection-Handling FAQ Accordion]
// High-conversion expandable FAQ accordion systematically resolving customer doubts
// regarding surprise confidentiality, delivery zones, custom cakes/florals, and advance booking deposits.
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ShieldCheck, MapPin, Sparkles, CreditCard } from "lucide-react";
import Reveal from "../ui/Reveal";

const FAQ_ITEMS = [
  {
    key: "q1",
    icon: ShieldCheck,
  },
  {
    key: "q2",
    icon: MapPin,
  },
  {
    key: "q3",
    icon: Sparkles,
  },
  {
    key: "q4",
    icon: CreditCard,
  },
];

export default function HomeFAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((curr) => (curr === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 bg-gold-pale/50">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <p className="eyebrow">{t("faq.eyebrow", "Common Questions")}</p>
          <h2 className="section-heading mb-3">
            {t("faq.title", "Everything You Need to Know")}
          </h2>
          <p className="text-base text-ink-soft max-w-lg mx-auto">
            {t(
              "faq.subtitle",
              "Direct answers to the most common questions about our secret coordination and deliveries.",
            )}
          </p>
        </Reveal>

        <div className="space-y-4">
          {FAQ_ITEMS.map(({ key, icon: Icon }, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={key} delay={index * 0.08}>
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-gold-cream/60 border-gold shadow-gold"
                      : "bg-parchment/80 border-gold-edge/25 hover:border-gold-edge/60"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? "bg-gold text-gold-pale"
                            : "bg-gold-pale text-gold-deep border border-gold-edge/20"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-display font-bold text-base sm:text-lg text-ink">
                        {t(`faq.${key}`)}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gold-deep shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-gold" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-ink-soft leading-relaxed border-t border-gold-edge/15 pl-14 sm:pl-16">
                          {t(`faq.a${index + 1}`)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
