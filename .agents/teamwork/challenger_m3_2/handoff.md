# Milestone 3 Challenger 2 Adversarial Report

**Agent**: Challenger 2 (`teamwork_preview_challenger`)  
**Role**: M3 Adversarial Challenger 2  
**Milestone**: M3 (Home Page Redesign)  
**Parent / Caller**: `86025b17-4b19-4b7e-9de3-8f074e784432`  
**Verdict**: **APPROVE**  

---

## 1. Observation

Direct empirical observations obtained from executing build commands and automated test harnesses against the repository:

1. **Build & Prerender Verification (`pnpm build`)**:
   - `pnpm build` exited with code 0.
   - Vite 8 built client production bundle (`dist/assets/index-BHAt4JA9.js` 584.78 kB, `dist/assets/index-BDCMKU4x.css` 57.39 kB) and SSR bundle (`dist-ssr/entry-server.js` 162.64 kB).
   - `scripts/prerender.mjs` successfully prerendered all 12 localized routes plus `dist/404.html`:
     - `dist/index.html` (109,040 bytes, lang="en")
     - `dist/am/index.html` (113,057 bytes, lang="am")
     - `dist/om/index.html` (104,063 bytes, lang="om")
     - And inner routes (`/about-us/`, `/gallery/`, `/team/`) across all 3 locales.

2. **Inverted White Card Elimination (`HomePackages.jsx`)**:
   - `src/components/sections/HomePackages.jsx` lines 67–71 define:
     ```javascript
     className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
       pkg.featured
         ? "bg-gold-cream text-ink border-2 border-gold shadow-[0_0_28px_rgba(245,197,24,0.22)] ring-1 ring-gold/40 scale-[1.02] z-10"
         : "bg-parchment/90 text-ink border border-gold-edge/30 hover:border-gold-edge/70 hover:shadow-card"
     }`}
     ```
   - Automated grep and substring checks for `bg-ink text-parchment` and `text-parchment bg-ink` returned 0 matches in `src/components/sections/` and 0 matches across `dist/index.html`, `dist/am/index.html`, `dist/om/index.html`.
   - Inspection of rendered package cards in `dist/index.html`:
     - Standard card: `bg-parchment/90 text-ink border border-gold-edge/30 hover:border-gold-edge/70 hover:shadow-card`
     - Featured card: `bg-gold-cream text-ink border-2 border-gold shadow-[0_0_28px_rgba(245,197,24,0.22)] ring-1 ring-gold/40 scale-[1.02] z-10`
     - Premium card: `bg-parchment/90 text-ink border border-gold-edge/30 hover:border-gold-edge/70 hover:shadow-card`

3. **Hardcoded `#FFF8DC` Light Shadow Verification**:
   - In all M3 home page components (`HomeHero.jsx`, `HomeOccasions.jsx`, `HomeHowItWorks.jsx`, `HomePackages.jsx`, `HomeGallery.jsx`, `HomeFAQ.jsx`, `HomeContact.jsx`, `HomeNavbar.jsx`, `HomeFooter.jsx`, `Home.jsx`), `#FFF8DC` returned 0 matches.
   - In `dist/index.html`, `dist/am/index.html`, and `dist/om/index.html`, `#FFF8DC` returned 0 matches.
   - In `HomeHowItWorks.jsx:48–50`, the step circles now use dark token variables:
     ```javascript
     boxShadow: "0 0 0 5px var(--color-gold-pale), 0 0 0 7px rgba(245,197,24,0.4), 0 8px 20px rgba(245,197,24,0.15)"
     ```
   - In `HomeContact.jsx:265, 279`, input focus rings now use:
     ```javascript
     focus:ring-gold/40 focus:shadow-[0_0_16px_rgba(245,197,24,0.15)]
     ```
   - Note on other files: An occurrence was detected in `src/pages/AboutUs.jsx:70` (`boxShadow: "0 0 0 6px #FFF8DC..."`) and an unused CSS variable in `src/styles/index.css:30` (`--shadow-gold-lg`). `AboutUs.jsx` is explicitly scheduled for Phase 4 (Milestone 4: Inner Pages Redesign).

4. **FAQ Accordion & Trilingual Localized Strings**:
   - `src/components/sections/HomeFAQ.jsx` is mounted on `src/pages/Home.jsx:22` with `id="faq"`.
   - `initialState` for accordion is `useState(0)` (item 0 initially open during SSR).
   - In all 3 locales (`en.json`, `am.json`, `oro.json`), keys `eyebrow`, `title`, `subtitle`, `q1`–`q4`, `a1`–`a4` exist and are fully translated.
   - In `dist/index.html` (en), `dist/am/index.html` (am), and `dist/om/index.html` (om):
     - Section `<section id="faq"` is present in all 3 prerendered pages.
     - Questions Q1, Q2, Q3, Q4 render with correct localized text.
     - Answer A1 renders open with localized text in all 3 languages.
     - Zero raw keys (e.g. `faq.q1` or `faq.title`) appear in any rendered HTML file.
     - Zero instances of `undefined`, `null`, `NaN`, or `[object Object]` exist in text nodes.

5. **Static Analysis & Linting**:
   - `npx oxlint src/` passed with 0 warnings and 0 errors across 32 files.

---

## 2. Logic Chain

1. **Brand Aesthetic Integrity**:
   - The user specification and `DESIGN_RESEARCH.md` require maintaining a dark luxury aesthetic without jarring inverted light surfaces.
   - By swapping `bg-ink text-parchment` for `bg-gold-cream text-ink` with a gold border and ambient glow (`shadow-[0_0_28px_rgba(245,197,24,0.22)]`), the featured tier is highlighted without destroying dark mode visual coherence.
   - The replacement of `#FFF8DC` cornsilk rings with `var(--color-gold-pale)` and subtle gold glows ensures consistent palette adherence across interactions.

2. **SSR Prerender Stability**:
   - Prerendered HTML files must serve readable content directly for SEO, crawler discovery, and instant paint.
   - Empirical inspection of `dist/index.html`, `dist/am/index.html`, and `dist/om/index.html` confirms that all 6 core sections plus the new FAQ section render complete DOM structures with localized headings, icons, and copy.

3. **Objection Handling via FAQ**:
   - The Knot competitor benchmark demonstrated that clear objection-handling (addressing confidentiality, delivery radius, custom requests, and deposit policies) significantly lowers conversion friction.
   - Integrating `HomeFAQ` directly into `Home.jsx` before `#contact` satisfies this architectural pattern.
   - The default state `openIndex = 0` guarantees that crawlers and SSR readers immediately see the primary reassurance (surprise confidentiality) without requiring JavaScript hydration.

---

## 3. Caveats

1. **Accessibility Enhancement Opportunity for `HomeFAQ.jsx`**:
   - The FAQ accordion buttons have `aria-expanded={isOpen}`, which announces state changes correctly.
   - However, for full WAI-ARIA disclosure compliance, the accordion buttons should ideally include `aria-controls={`faq-answer-${key}`}` and the expandable panel should carry `id={`faq-answer-${key}`}` and `role="region"`. This is non-blocking for M3 visual/SSR integrity but recommended for future refinement.
2. **Remaining `#FFF8DC` in M4 Scope**:
   - `src/pages/AboutUs.jsx:70` retains `#FFF8DC` in its step icon shadow. Because `AboutUs.jsx` is out of scope for Milestone 3 (scheduled for Milestone 4 Inner Pages Redesign), this does not block M3, but Worker 4 must be tasked to clean it up in M4.
   - `src/styles/index.css:30` defines an unused variable `--shadow-gold-lg` containing `#fff8dc`.
3. **Amharic Package Name Translation**:
   - An ad-hoc test file `scripts/test-home-interactions.mjs` expected the phonetic transliteration `"ስታንዳርድ"`, whereas `src/i18n/locales/am.json` and `dist/am/index.html` use the native Amharic translation `"መካከለኛ (Standard)"`. This was verified as linguistically correct in `am.json` and `dist/am/index.html`.

---

## 4. Conclusion

**Verdict: APPROVE**

Milestone 3 (Home Page Redesign) satisfies all adversarial requirements:
- Clean `pnpm build` output with all 12 routes prerendered.
- 0 occurrences of inverted white card styling (`bg-ink text-parchment`).
- 0 occurrences of hardcoded `#FFF8DC` light shadows across all M3 components and prerendered home pages.
- Complete, localized FAQ accordion rendering in English, Amharic, and Afaan Oromoo with zero key leaks.

The milestone is ready to proceed to Milestone 4.

---

## 5. Verification Method

To independently verify the adversarial findings:

1. **Run Build & SSR Generation**:
   ```bash
   pnpm build
   ```
   *Expected*: Exit code 0, all 12 routes prerendered without errors.

2. **Verify Inverted White Card Elimination**:
   ```bash
   rg -i "bg-ink text-parchment" src/components/sections/ dist/index.html dist/am/index.html dist/om/index.html
   ```
   *Expected*: 0 matches.

3. **Verify #FFF8DC Elimination in M3**:
   ```bash
   rg -i "#fff8dc" src/components/sections/ dist/index.html dist/am/index.html dist/om/index.html
   ```
   *Expected*: 0 matches.

4. **Verify FAQ Localization in SSR Output**:
   ```bash
   node -e '
   const fs = require("fs");
   const en = fs.readFileSync("dist/index.html", "utf8");
   const am = fs.readFileSync("dist/am/index.html", "utf8");
   const om = fs.readFileSync("dist/om/index.html", "utf8");
   console.log("EN FAQ Q1:", en.includes("How do you guarantee the surprise stays 100% secret?"));
   console.log("AM FAQ Q1:", am.includes("ሰርፕራይዙ 100% ሚስጥራዊ ሆኖ እንዲቆይ እንዴት ዋስትና ይሰጣሉ?"));
   console.log("OM FAQ Q1:", om.includes("Surprise %100 iccitii akka ta"));
   '
   ```
   *Expected*: All three print `true`.
