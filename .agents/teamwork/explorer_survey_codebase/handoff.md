# Handoff Report: Codebase Survey Explorer

**Date**: 2026-10-22T20:07:00Z  
**Agent Role**: Codebase Survey Explorer  
**Working Directory**: `/home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/.agents/teamwork/explorer_survey_codebase`  
**Recipient / Parent Agent**: `86025b17-4b19-4b7e-9de3-8f074e784432`  
**Status**: Hard Handoff (Investigation & Survey Complete)

---

## 1. Observation

### 1.1 Project Configuration & Dependencies
- **Package definition** (`package.json:1-45`):
  - React 19: `"react": "^19.2.8"`, `"react-dom": "^19.2.8"`
  - Vite 8: `"vite": "^8.2.0"`, `"@vitejs/plugin-react": "^6.0.4"`
  - Tailwind v4: `"tailwindcss": "^4.3.3"`, `"@tailwindcss/vite": "^4.3.3"`
  - Motion: `"motion": "^12.43.0"`
  - Routing: `"react-router-dom": "^7.18.2"`
  - State & Data: `"zustand": "^5.0.14"`, `"@tanstack/react-query": "^5.101.4"`
  - i18n: `"i18next": "^26.3.6"`, `"react-i18next": "^17.0.11"`
  - Icons: `"lucide-react": "^1.59.0"`
  - Build script (`package.json:9`):
    `"build": "vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr && node scripts/prerender.mjs"`
- **Vite Configuration** (`vite.config.js:8-11`):
  ```javascript
  export default defineConfig({
    base: process.env.VITE_BASE || "/",
    plugins: [react(), tailwindcss()],
  });
  ```
- **Build Execution & Results**:
  Command executed: `pnpm build`
  Tool output:
  ```
  vite v8.3.4 building client environment for production...
  ✓ 2439 modules transformed.
  dist/assets/assets_icon_navbar1-DLg7CuP7.png    1.57 kB
  dist/index.html                                 3.49 kB │ gzip:   1.28 kB
  dist/assets/index-CVtRT_IZ.css                 40.38 kB │ gzip:   7.68 kB
  dist/assets/index-CJapnljV.js                 552.70 kB │ gzip: 169.96 kB
  ✓ built in 10.20s
  vite v8.3.4 building ssr environment for production...
  ✓ 37 modules transformed.
  dist-ssr/entry-server.js  122.59 kB │ gzip: 26.76 kB
  ✓ built in 1.76s
  prerendered /      -> dist/index.html (en)
  prerendered /am/   -> dist/am/index.html (am)
  prerendered /om/   -> dist/om/index.html (oro)
  prerendered /about-us/ -> dist/about-us/index.html (en)
  prerendered /am/about-us/ -> dist/am/about-us/index.html (am)
  prerendered /om/about-us/ -> dist/om/about-us/index.html (oro)
  prerendered /gallery/ -> dist/gallery/index.html (en)
  prerendered /am/gallery/ -> dist/am/gallery/index.html (am)
  prerendered /om/gallery/ -> dist/om/gallery/index.html (oro)
  prerendered /team/ -> dist/team/index.html (en)
  prerendered /am/team/ -> dist/am/team/index.html (am)
  prerendered /om/team/ -> dist/om/team/index.html (oro)
  wrote dist/404.html and removed dist-ssr/
  ```
  Exit code: `0`.
- **Lint Check Execution**:
  Command executed: `npx oxlint`
  Tool output: `Found 0 warnings and 0 errors. Finished in 52ms on 33 files with 96 rules using 4 threads.`

### 1.2 Brand Design Tokens & Typography
- **Google Fonts Import** (`src/styles/index.css:1`):
  `@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Inter:wght@300;400;500;600&display=swap");`
- **Tailwind `@theme` block** (`src/styles/index.css:8-32`):
  - `--color-gold: #f5c518;`
  - `--color-gold-deep: #b8960c;`
  - `--color-gold-edge: #d4a017;`
  - `--color-gold-pale: #0f0f13;`
  - `--color-gold-cream: #17181d;`
  - `--color-ink: #ffffff;`
  - `--color-ink-soft: #f5c518;`
  - `--color-ink-muted: #7a6b2a;`
  - `--color-parchment: #241f14;`
  - `--font-display: "Playfair Display", Georgia, serif;`
  - `--font-body: "Inter", system-ui, sans-serif;`

### 1.3 State Management & Invariants
- **Zustand Store** (`src/store/useAppStore.js:17-26`):
  - State: `selectedOccasion` (`null`), `selectedPackageId` (`null`).
  - Actions: `setSelectedOccasion(occasion)`, `setSelectedPackageId(id)`, `clearSelection()`.
- **Occasions Selection** (`src/components/sections/HomeOccasions.jsx:32-35`):
  ```javascript
  const handlePick = (occasionId) => {
    setSelectedOccasion(occasionId);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  ```
- **Package Selection** (`src/components/sections/HomePackages.jsx:12-15`):
  ```javascript
  const handleSelect = () => {
    setSelectedPackageId(pkg.id);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  ```
- **Contact Form Pre-fill & Mailto Trigger** (`src/components/sections/HomeContact.jsx:18-39, 79-83`):
  - Pre-fill:
    ```javascript
    useEffect(() => {
      if (selectedOccasion) {
        setForm((f) => ({ ...f, occasion: t(`occasions.${selectedOccasion}`) }));
      }
    }, [selectedOccasion, t]);
    ```
  - Mailto trigger:
    ```javascript
    window.location.href = `mailto:${CONTACT.EMAIL}?subject=${subject}&body=${body}`;
    ```
    Where `CONTACT.EMAIL = "diboramarema@gmail.com"`.
- **Navigation & Language Switcher** (`src/components/sections/HomeNavbar.jsx:23-25, 57-71`):
  - `onChange = (e) => navigate(localizedPath(e.target.value, pagePath(pathname)))`
  - Anchor click scrolls to element if present, or navigates to `${homePath}${href}`.
- **Gallery Lightbox** (`src/pages/Gallery.jsx:38-57, 145-220`):
  - Keyboard listener handles `Escape` (close), `ArrowLeft` (previous), `ArrowRight` (next).
  - Modal overlay with photo counter (`${lightboxIndex + 1} / ${filteredPhotos.length}`).

### 1.4 Routing & i18n Mapping
- **Locale definitions** (`src/i18n/routes.js:8-12`):
  - `en`: `{ prefix: "", htmlLang: "en", ogLocale: "en_US" }`
  - `am`: `{ prefix: "/am", htmlLang: "am", ogLocale: "am_ET" }`
  - `oro`: `{ prefix: "/om", htmlLang: "om", ogLocale: "om_ET" }`
- **Routes registered** (`src/App.jsx:17-31`):
  - `/`, `/about-us`, `/gallery`, `/team`, `*` (English)
  - `/am/*`, `/am/about-us`, `/am/gallery`, `/am/team` (Amharic)
  - `/om/*`, `/om/about-us`, `/om/gallery`, `/om/team` (Afaan Oromo)

---

## 2. Logic Chain

1. **Build & Route Integrity**:
   - `scripts/prerender.mjs` hardcodes `ROUTES` (12 paths across 4 pages: Home `/`, `/about-us/`, `/gallery/`, `/team/` in 3 languages).
   - `entry-server.jsx` takes the requested URL, parses locale with `localeFromPath(url)`, sets i18n language, and renders the route tree.
   - Any redesigned page structure must retain these route paths, or `scripts/prerender.mjs` will fail.
2. **State & Form Coupling**:
   - `HomeOccasions` writes to `useAppStore.selectedOccasion`.
   - `HomeContact` observes `selectedOccasion` and auto-populates `form.occasion` with the localized string.
   - `HomePackages` writes to `useAppStore.selectedPackageId` and scrolls to `#contact`.
   - `HomeHero` invokes `clearSelection()` when clicking primary CTA.
   - Any layout changes to these sections must preserve the store bindings and smooth scroll triggers to prevent breaking user expectation and lead capture.
3. **Styling & Design Tokens**:
   - Tailwind v4 uses CSS `@theme` variables directly in `src/styles/index.css`.
   - The user explicitly requested preserving `--color-gold: #f5c518`, `--color-gold-deep: #b8960c`, `--color-gold-edge: #d4a017`, `--color-gold-pale: #0f0f13`, `--color-gold-cream: #17181d`, `--color-ink: #ffffff`, and `--color-parchment: #241f14`.
   - Because the site uses a dark theme where `--color-parchment` is `#241f14` (dark brown-black) and `--color-ink` is `#ffffff` (white), all redesign card backgrounds and text contrasts must follow this inverse luminance scheme.
4. **i18n Translation Sync**:
   - `src/i18n/locales/en.json` is the source of truth for all copy keys.
   - `am.json` and `oro.json` mirror the exact JSON structure.
   - When new copy or section titles are introduced during redesign, new keys must be appended to all three locale files to satisfy the acceptance criteria.

---

## 3. Caveats

1. **ESLint v10 Upstream Bug**:
   Running `pnpm lint` currently produces `TypeError: Error while loading rule 'react/display-name': contextOrFilename.getFilename is not a function`. This is a known incompatibility between ESLint 10 and `eslint-plugin-react`. However, `npx oxlint` runs cleanly with 0 errors.
2. **About Us Image Asset**:
   `src/data/about.json` currently has `"items": []`. `AboutUs.jsx` includes a built-in fallback dark gradient (`bg-gradient-to-br from-ink via-ink-soft to-gold-deep`) when no team photo is present.
3. **Trust Faces**:
   `src/data/constants.js` contains `TRUST_FACES = [null, null, null]`. `HomeHero.jsx` renders `✦` inside the avatar circles when null.

---

## 4. Conclusion

The codebase architecture of Yehidat is clean, modern, and robust. It uses an ultra-fast React 19 + Tailwind CSS v4 + Vite 8 stack with prerendering. All 12 localized routes build cleanly with zero build errors.

The redesign can proceed with high confidence by:
1. Maintaining the strict color tokens and typefaces in `src/styles/index.css`.
2. Preserving all Zustand store connections and the smooth-scroll-to-#contact behavior.
3. Maintaining the `mailto:` submission pipeline in `HomeContact.jsx`.
4. Updating `src/i18n/locales/{en,am,oro}.json` with any new section copy.
5. Keeping route paths identical to guarantee 100% prerender success in `pnpm build`.

Full detailed findings are documented in:
`/home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/.agents/teamwork/explorer_survey_codebase/survey_codebase.md`

---

## 5. Verification Method

To independently verify all findings and validate future changes:

1. **Run the Full Build and Prerendering Pipeline**:
   ```bash
   pnpm build
   ```
   **Expected result**: Exit code `0`, 12 routes prerendered (`/`, `/am/`, `/om/`, `/about-us/`, `/am/about-us/`, `/om/about-us/`, `/gallery/`, `/am/gallery/`, `/om/gallery/`, `/team/`, `/am/team/`, `/om/team/`), and `dist/404.html` written.
2. **Run Code Quality Lint**:
   ```bash
   npx oxlint
   ```
   **Expected result**: 0 warnings and 0 errors across all files.
3. **Verify State Invariants in Source Files**:
   - `src/store/useAppStore.js`: Verify `selectedOccasion` and `selectedPackageId` state exist.
   - `src/components/sections/HomeContact.jsx`: Inspect lines 18-39 (`submitCallback`) and lines 79-83 (`useEffect` for `selectedOccasion`).
   - `src/components/sections/HomePackages.jsx`: Inspect `handleSelect` (sets package and scrolls to `#contact`).
   - `src/components/sections/HomeOccasions.jsx`: Inspect `handlePick` (sets occasion and scrolls to `#contact`).
4. **Invalidation Conditions**:
   - `pnpm build` fails or any prerendered route throws an SSR hydration mismatch.
   - Contact form fails to construct the `mailto:` URI with user-input parameters.
   - Any brand color in `src/styles/index.css` is modified from its specified hex value.
