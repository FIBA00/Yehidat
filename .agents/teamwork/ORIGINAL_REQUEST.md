# Original User Request

## Initial Request — 2026-10-22T19:55:00Z

Scour the internet for leading event planning, surprise delivery, and gift experience websites. Extract design patterns, UX conventions, visual hierarchy techniques, and copy patterns from those competitors. Then redesign the Yehidat website — a surprise planning and delivery service based in Ethiopia — across all pages using those insights, while strictly preserving Yehidat's existing brand identity (gold/dark color palette, Playfair Display + Inter typefaces, overall brand name and voice).

Working directory: /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat
Integrity mode: demo

---

## Brand & Technical Context

**Brand colors (DO NOT change these values):**
- `--color-gold: #f5c518` — primary gold
- `--color-gold-deep: #b8960c` — deep gold
- `--color-gold-edge: #d4a017` — border/accent gold
- `--color-gold-pale: #0f0f13` — dark background surface (near-black)
- `--color-gold-cream: #17181d` — dark surface color
- `--color-ink: #ffffff` — primary text
- `--color-parchment: #241f14` — page background (dark warm)
- `--font-display: "Playfair Display", Georgia, serif`
- `--font-body: "Inter", system-ui, sans-serif`

**Stack:** React 19 + Vite 8 + Tailwind v4 + react-i18next (3 locales: en, am, oro) + react-router-dom v7 + motion/react (Framer Motion) + TanStack Query + Zustand + lucide-react

**Package manager:** pnpm. You MAY install new packages with `pnpm add` — only add packages that directly enable a better design (e.g., a carousel, lightbox, or animation lib). Avoid adding heavy or redundant dependencies.

**Pages in scope:**
- `src/pages/Home.jsx` (composed of: HomeHero, HomeOccasions, HomeHowItWorks, HomePackages, HomeGallery, HomeContact sections)
- `src/pages/Gallery.jsx`
- `src/pages/AboutUs.jsx`
- `src/pages/Team.jsx`
- `src/components/sections/HomeNavbar.jsx`
- `src/components/sections/HomeFooter.jsx`

**i18n:** All user-visible strings live in `src/i18n/locales/en.json` (+ am.json, oro.json). You MAY update English copy if it improves the UX. Mirror any copy changes into am.json and oro.json as best-effort translations.

**Build command:** `pnpm build` — must pass with zero errors before submitting.

---

## Requirements

### R1. Competitor Research
Scour the live web for 5–10 high-quality competitor or inspiration websites in the event planning, surprise delivery, and gift experience space (e.g., The Knot, Surprise.com, Bloom & Wild, Postmates Gifts, GiftHero, Edible Arrangements, etc.). For each site, extract and document:
- Layout patterns (hero structure, section flow, CTAs)
- Visual hierarchy techniques (typography scale, spacing, card styles)
- UX conventions (navigation, mobile patterns, trust signals, social proof)
- Copy and messaging patterns (value prop, emotional hooks, CTAs)

Produce a concise research summary (`DESIGN_RESEARCH.md`) in the working directory cataloging the key insights and which patterns are most applicable to Yehidat.

### R2. Full UX Redesign — All Pages
Using the research insights from R1, redesign the Yehidat website across all pages in scope. The redesign must:
- Preserve all existing brand color tokens and font families exactly as defined above
- Preserve all existing React functionality: forms, i18n (3 locales), routing, animations, contact flow (mailto), gallery lightbox, scroll behavior, Zustand state, package selection → contact scroll
- Improve: layout composition, visual hierarchy, section ordering or phrasing, card and grid designs, hero impact, CTAs, trust signals, mobile responsiveness, and micro-interactions where appropriate
- Be informed by concrete patterns found in the competitor research (referenced in code comments where applicable)

### R3. Build Integrity
The project must build and prerender cleanly:
- `pnpm build` exits with code 0 with no errors
- All prerendered routes render correctly: `/`, `/gallery/`, `/about-us/`, `/team/` and their `/am/` and `/om/` locale variants
- No new console errors or React warnings

---

## Acceptance Criteria

### Research
- [ ] `DESIGN_RESEARCH.md` exists and documents at least 5 competitor sites with layout, UX, and copy insights
- [ ] The document identifies which specific patterns were adopted into the Yehidat redesign and why

### Visual Design
- [ ] All brand color tokens (`--color-gold`, `--color-gold-deep`, `--color-gold-edge`, `--color-parchment`, `--color-ink`) are unchanged from their original hex values
- [ ] Both typefaces (Playfair Display, Inter) remain in use
- [ ] The redesigned home page has a meaningfully different and improved layout compared to the original (new section composition, hero structure, or card design — not just spacing tweaks)
- [ ] Each page (Gallery, About Us, Team) shows visible layout improvements informed by competitor research

### Functionality
- [ ] `pnpm build` exits 0 with all 12 prerendered routes passing
- [ ] The contact form still triggers the mailto flow correctly
- [ ] Language switching (EN / አማ / OR) still functions across all redesigned pages
- [ ] The gallery lightbox on `/gallery/` still opens and navigates photos
- [ ] The package cards still scroll to `#contact` on selection

### Code Quality
- [ ] No duplicate import statements in any component file
- [ ] No unused imports added during redesign
- [ ] Any new packages are installed via `pnpm add` and committed to `package.json`

## Follow-up — 2026-10-24T07:57:30Z

The server was restarted. Please resume orchestrating the Yehidat website redesign project from where you left off. Continue through Phase 2 (M2 Navigation & Footer Redesign), Phase 3 (M3 Home Page Redesign), Phase 4 (M4 Inner Pages Redesign), and Phase 5 (M5 Build Integrity & E2E Route Prerendering).

