# Milestone 3 (Home Page Redesign) Handoff Report

**Agent**: Worker 3 (`teamwork_preview_worker`)  
**Role**: Home Page UX Redesign Worker  
**Date**: 2026-10-24T09:36:00Z  
**Target Milestone**: M3 (Home Page Redesign)  
**Parent / Caller**: `86025b17-4b19-4b7e-9de3-8f074e784432`

---

## 1. Observation

Direct observations from the initial codebase survey, bug analysis, and scoped components:

1. **Inverted White Featured Card Bug in `HomePackages.jsx`**:
   - `src/components/sections/HomePackages.jsx:36` originally had:
     ```javascript
     pkg.featured ? "bg-ink text-parchment border border-gold-edge/55" : "bg-parchment ribbon-border"
     ```
     Because `--color-ink` is `#ffffff` and `--color-parchment` is `#241f14`, the featured card rendered as a stark white container within a dark luxury theme, and lines 70, 78, 85, and 105 used `text-parchment/...` to compensate for the white background.
   - Package inclusions were centered via `<div className="flex-col place-items-center">` and had fixed height `sm:h-160`.
   - Discount tag used a flashing red banner with `bg-red-600 text-white` and `animate-ping bg-white`.
2. **Hardcoded `#FFF8DC` Shadows**:
   - `src/components/sections/HomeHowItWorks.jsx:32` hardcoded:
     ```javascript
     boxShadow: "0 0 0 6px #FFF8DC, 0 0 0 7.5px rgba(184,150,12,0.55)"
     ```
   - `src/components/sections/HomeContact.jsx:43, 209, 223, 237, 259, 273` hardcoded `focus:shadow-[0_0_0_3px_#FFF8DC]` and `hover:shadow-[0_0_0_3px_#FFF8DC]`.
3. **Absence of FAQ Module**:
   - Neither `Home.jsx` nor any component answered buyer logistical or secrecy anxieties (confidentiality, delivery areas Bishoftu/Dukem, customization, advance booking/payment deposits).
4. **Hero & Occasions Opportunities**:
   - `HomeHero.jsx` lacked a dedicated discretion guarantee notice, had dual CTAs pointing to `#contact` and `#how` instead of browsing occasions, and lacked 5.0 star quantitative rating proof.
   - `HomeOccasions.jsx` used uneven flex wrap width calculations (`w-[calc(12.5%-0.5rem)]` for 7 items) and lacked category tags.
   - `HomeGallery.jsx` overlay had white background gradient `from-ink/70` and dark text `text-parchment`.
5. **Contact Flow & Zustand Integration**:
   - Zustand store already provided `selectedPackageId` and `setSelectedPackageId`, but `HomeContact.jsx` only checked `selectedOccasion`.

---

## 2. Logic Chain

1. **Brand Aesthetic & Dark-Mode Luxury Cohesion**:
   - Based on Rule 3 of `DESIGN_RESEARCH.md` ("Visual Restraint & Cohesive Luxury"), a luxury aesthetic using `#0f0f13`, `#17181d`, and `#241f14` must never be disrupted by stark white cards.
   - Replacing `bg-ink text-parchment` with `bg-gold-cream text-ink border-2 border-gold shadow-[0_0_28px_rgba(245,197,24,0.22)] ring-1 ring-gold/40 scale-[1.02] z-10` unifies the cards while making the featured tier stand out gracefully.
   - Replacing red flashing discount tags with refined gold pill badges (`bg-gold/15 text-gold border border-gold-edge/50`) preserves the prestige of the gifting service.
2. **Left-Aligned Categorized Package Inclusions**:
   - Following Tinggly and BoxFox architecture, centered text makes list comparisons difficult. Left-aligning items with gold `Check` icons and structured category badges (Cake, Flowers, Atmosphere, Memories) allows users to immediately scan tier upgrades.
3. **Elimination of `#FFF8DC` Light Shadows**:
   - All light cornsilk shadows were replaced with dark luxury tokens (`var(--color-gold-pale)`, gold edge borders, and gold focus rings `focus:ring-gold/40 focus:shadow-[0_0_16px_rgba(245,197,24,0.15)]`).
4. **3-Step Surprise Choreography**:
   - Elevated `HomeHowItWorks.jsx` with Bloom & Wild / BoxFox pattern: 3 step cards with distinct icons, progression connector line, step numbers with dark-gold rings, and a secrecy assurance footnote.
5. **Concierge Inquiry Flow & Discretion Guarantee**:
   - In accordance with PartySlate concierge practices, `HomeContact.jsx` was enhanced with a Discretion Guarantee Notice, active package badge (with change capability), package prefill in the mailto payload, and zero hardcoded light shadows.
6. **Hero Impact & Social Proof**:
   - Following Bloom & Wild and Virgin Experience Gifts, `HomeHero.jsx` now presents an emotional headline, dual conversion CTAs ("Plan a Surprise" -> `#contact`, "Explore Experiences" -> `#occasions`), a discretion guarantee pill, and a 5.0 star quantitative rating bar with avatar stack.
7. **Objection-Handling FAQ Accordion**:
   - Following The Knot benchmark, created `HomeFAQ.jsx` (and case-tolerant `HomeFaq.jsx`), featuring an accessible, animated accordion addressing the 4 primary objections: 100% secrecy guarantee, delivery coverage in Dukem/Bishoftu/East Shewa, custom cakes/florals, and advance booking deposits.
8. **Trilingual i18n Synchronization**:
   - All new strings across hero, occasions, how-it-works, packages, gallery, faq, and contact were translated and synced across `en.json`, `am.json`, and `oro.json`.

---

## 3. Caveats

- **Images**: Existing image paths and responsive picture logic (`ResponsiveImage` with AVIF/WebP) in `src/data/gallery.js` and `constants.js` were preserved without modification.
- **Email Client Variation**: `mailto:` dispatch behavior relies on the user's operating system default email handler; the simulated 1400ms loading feedback with direct WhatsApp follow-up link covers cases where the user does not have a default email client configured.
- No other caveats.

---

## 4. Conclusion

Milestone 3 (Home Page Redesign) is 100% complete and fully verified:
- All 6 existing home sections plus the new `HomeFAQ` accordion have been redesigned according to `DESIGN_RESEARCH.md`.
- All competitor reference comments are added.
- All brand tokens (`--color-gold`, `--color-gold-deep`, `--color-gold-edge`, `--color-gold-pale`, `--color-gold-cream`, `--color-ink`, `--color-parchment`) and typography (`Playfair Display`, `Inter`) are strictly respected.
- All store and routing invariants are preserved (`setSelectedOccasion`, `setSelectedPackageId`, `clearSelection`, mailto delay, WhatsApp fallback).
- Build and prerender tests pass with exit code 0 across all 12 routes.
- Linter (`oxlint`) passes with 0 warnings and 0 errors.

---

## 5. Verification Method

To independently verify the implementation:

1. **Build & Prerender Verification**:
   ```bash
   pnpm build
   ```
   *Expected output*: Exits with code 0. Verifies static generation of all 12 routes:
   - `dist/index.html` (en)
   - `dist/am/index.html` (am)
   - `dist/om/index.html` (oro)
   - `dist/about-us/index.html` (en)
   - `dist/am/about-us/index.html` (am)
   - `dist/om/about-us/index.html` (oro)
   - `dist/gallery/index.html` (en)
   - `dist/am/gallery/index.html` (am)
   - `dist/om/gallery/index.html` (oro)
   - `dist/team/index.html` (en)
   - `dist/am/team/index.html` (am)
   - `dist/om/team/index.html` (oro)
   - `dist/404.html`

2. **Linter Cleanliness Verification**:
   ```bash
   npx oxlint
   ```
   *Expected output*: `Found 0 warnings and 0 errors.`

3. **Check for Inverted White Cards or #FFF8DC**:
   ```bash
   rg -i "#fff8dc" src/components/sections/
   rg -i "bg-ink text-parchment" src/components/sections/
   ```
   *Expected output*: Zero matches in `src/components/sections/`.
