# Specification Requirements & Authoritative System Mining

**Project Root**: `/home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat`  
**Mining Date**: 2026-10-22  
**Authoritative Sources**: `ORIGINAL_REQUEST.md`, `scripts/prerender.mjs`, `src/styles/index.css`, `src/i18n/routes.js`, `src/data/constants.js`, `src/store/useAppStore.js`, `src/components/sections/*`, `src/pages/*`, `package.json`.

---

## 1. Brand Tokens & Typography

All tokens are authoritatively declared in `src/styles/index.css` via the Tailwind v4 `@theme` block and verified against `ORIGINAL_REQUEST.md`. These hex values and font families must be strictly preserved without modification.

### 1.1 Color Tokens
| Token Variable | Hex / Value | Semantic Role | Tailwind Utility Equivalent | Authoritative Source |
|---|---|---|---|---|
| `--color-gold` | `#f5c518` | Primary brand gold (buttons, badges, highlights) | `bg-gold`, `text-gold`, `border-gold` | `src/styles/index.css:9`, `ORIGINAL_REQUEST.md:15` |
| `--color-gold-deep` | `#b8960c` | Deep gold (eyebrows, secondary headings, gradients) | `text-gold-deep`, `border-gold-deep` | `src/styles/index.css:10`, `ORIGINAL_REQUEST.md:16` |
| `--color-gold-edge` | `#d4a017` | Border / ribbon outline / card accent | `border-gold-edge` | `src/styles/index.css:11`, `ORIGINAL_REQUEST.md:17` |
| `--color-gold-pale` | `#0f0f13` | Dark background surface (near-black container fills) | `bg-gold-pale` | `src/styles/index.css:15`, `ORIGINAL_REQUEST.md:18` |
| `--color-gold-cream` | `#17181d` | Dark secondary surface color (section alternates) | `bg-gold-cream` | `src/styles/index.css:16`, `ORIGINAL_REQUEST.md:19` |
| `--color-ink` | `#ffffff` | Primary text (pure white contrast against dark surfaces) | `text-ink` | `src/styles/index.css:18`, `ORIGINAL_REQUEST.md:20` |
| `--color-ink-soft` | `#f5c518` | Soft / accented secondary text | `text-ink-soft` | `src/styles/index.css:19` |
| `--color-ink-muted` | `#7a6b2a` | Muted captions, metadata, tertiary copy | `text-ink-muted` | `src/styles/index.css:20` |
| `--color-parchment` | `#241f14` | Primary page background (dark warm luxury tone) | `bg-parchment` | `src/styles/index.css:23`, `ORIGINAL_REQUEST.md:21` |

### 1.2 Elevation & Shadow Tokens
| Token Variable | Value | Purpose | Authoritative Source |
|---|---|---|---|
| `--shadow-gold` | `0 0 0 1px rgba(184, 150, 12, 0.25), 0 4px 24px rgba(245, 197, 24, 0.15)` | Glowing gold outline and elevation for cards on hover | `src/styles/index.css:28-29` |
| `--shadow-gold-lg` | `0 0 0 4px #fff8dc, 0 0 0 5.5px rgba(184, 150, 12, 0.55)` | Large ring focus / luxury stepped borders | `src/styles/index.css:30` |
| `--shadow-card` | `0 2px 16px rgba(26, 20, 0, 0.08)` | Subtle card elevation on dark background | `src/styles/index.css:31` |

### 1.3 Typography Tokens
| Token Variable | Font Stack | Usage | Authoritative Source |
|---|---|---|---|
| `--font-display` | `"Playfair Display", Georgia, serif` | Hero titles, section headings, numbers, brand name | `src/styles/index.css:25`, `ORIGINAL_REQUEST.md:22` |
| `--font-body` | `"Inter", system-ui, sans-serif` | Body copy, navigation links, buttons, inputs, labels | `src/styles/index.css:26`, `ORIGINAL_REQUEST.md:23` |

**Google Font Import**:
`@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Inter:wght@300;400;500;600&display=swap");`

---

## 2. All 12 Prerendered Routes

Authoritatively verified from `scripts/prerender.mjs` and SSR entry `src/entry-server.jsx`. Prerendering builds each route into a static `index.html` file, injects localized `<head>` metadata, and generates `dist/404.html`.

| # | Route URL | Page Component | Locale Code | HTML `lang` | Output File Path | Canonical URL |
|---|---|---|---|---|---|---|
| 1 | `/` | `Home.jsx` | `en` (English) | `en` | `dist/index.html` | `https://yehidat.vercel.app/` |
| 2 | `/am/` | `Home.jsx` | `am` (Amharic) | `am` | `dist/am/index.html` | `https://yehidat.vercel.app/am/` |
| 3 | `/om/` | `Home.jsx` | `oro` (Afaan Oromo) | `om` | `dist/om/index.html` | `https://yehidat.vercel.app/om/` |
| 4 | `/about-us/` | `AboutUs.jsx` | `en` (English) | `en` | `dist/about-us/index.html` | `https://yehidat.vercel.app/about-us/` |
| 5 | `/am/about-us/` | `AboutUs.jsx` | `am` (Amharic) | `am` | `dist/am/about-us/index.html` | `https://yehidat.vercel.app/am/about-us/` |
| 6 | `/om/about-us/` | `AboutUs.jsx` | `oro` (Afaan Oromo) | `om` | `dist/om/about-us/index.html` | `https://yehidat.vercel.app/om/about-us/` |
| 7 | `/gallery/` | `Gallery.jsx` | `en` (English) | `en` | `dist/gallery/index.html` | `https://yehidat.vercel.app/gallery/` |
| 8 | `/am/gallery/` | `Gallery.jsx` | `am` (Amharic) | `am` | `dist/am/gallery/index.html` | `https://yehidat.vercel.app/am/gallery/` |
| 9 | `/om/gallery/` | `Gallery.jsx` | `oro` (Afaan Oromo) | `om` | `dist/om/gallery/index.html` | `https://yehidat.vercel.app/om/gallery/` |
| 10 | `/team/` | `Team.jsx` | `en` (English) | `en` | `dist/team/index.html` | `https://yehidat.vercel.app/team/` |
| 11 | `/am/team/` | `Team.jsx` | `am` (Amharic) | `am` | `dist/am/team/index.html` | `https://yehidat.vercel.app/am/team/` |
| 12 | `/om/team/` | `Team.jsx` | `oro` (Afaan Oromo) | `om` | `dist/om/team/index.html` | `https://yehidat.vercel.app/om/team/` |

**Static Fallback**:
- `dist/404.html` is automatically copied from `dist/index.html` at the conclusion of prerendering to provide Single Page App (SPA) hydration on GitHub Pages or static web servers for arbitrary unknown paths.

---

## 3. Functional Invariants

The application has five core functional systems with strict behavioral requirements:

### 3.1 Contact Form Mailto Flow
- **Location**: `src/components/sections/HomeContact.jsx`
- **Trigger**: Submission of `#contact` form with fields: `name` (required), `phone` (required), `occasion` (required select), `date` (optional), `message` (optional).
- **Execution Flow**:
  1. `mutation.mutate(form)` invokes `submitCallback(payload)`.
  2. Async delay of 1400ms is simulated to display visual feedback (`Loader2` spinner with `t("contact.navigatingEmail")`).
  3. Prepares URI-encoded subject: `Surprise Request: ${payload.occasion || "Celebration"} - ${payload.name}`.
  4. Prepares URI-encoded body with Name, Phone, Occasion, Date, Message, and Website signature.
  5. SSR check: `if (typeof window !== "undefined") { window.location.href = mailto:${CONTACT.EMAIL}?subject=...&body=... }` where `CONTACT.EMAIL = "diboramarema@gmail.com"`.
  6. Renders Success view with WhatsApp direct contact button: `https://wa.me/251968034000?text=...`.
  7. Provides `handleReset()` to reset mutation state, clear Zustand selections, and clear form fields.

### 3.2 3 Locales & Internationalization (i18n) Architecture
- **Locales Supported**:
  - `en`: English (Default locale, URL prefix `""`)
  - `am`: Amharic (URL prefix `"/am"`, HTML `lang="am"`, OpenGraph `am_ET`)
  - `oro`: Afaan Oromo (URL prefix `"/om"`, HTML `lang="om"`, OpenGraph `om_ET`)
- **Key Invariant**: URL is the single source of truth for locale!
  - `localeFromPath(pathname)` extracts the locale key.
  - `localizedPath(locale, page)` builds canonical localized links.
  - `LanguageSwitcher` in `HomeNavbar` navigates to `localizedPath(selectedLocale, pagePath(currentPath))`.
  - `LocaleRoute` component wraps pages and triggers `i18n.changeLanguage(locale)` and updates `document.documentElement.lang`.
  - SEO head tags (`headTags.js`) inject hreflang links for `en`, `am`, `om`, and `x-default`.

### 3.3 Gallery Lightbox Navigation
- **Location**: `src/pages/Gallery.jsx`
- **State**: `activeCategory` (default `"all"`), `lightboxIndex` (index in `filteredPhotos` or `null`).
- **Interaction Behaviors**:
  1. **Open**: Clicking any photo card sets `lightboxIndex` to that card's index.
  2. **Close**: Pressing `Escape`, clicking the backdrop, or clicking the `X` button sets `lightboxIndex = null`.
  3. **Next**: Pressing `ArrowRight` or clicking next chevron advances to `(i + 1) % filteredPhotos.length`.
  4. **Previous**: Pressing `ArrowLeft` or clicking prev chevron wraps to `(i - 1 + filteredPhotos.length) % filteredPhotos.length`.
  5. **Category Switch**: Clicking category filter buttons (`all`, `surprises`, `cakes`, `outdoor`) sets `activeCategory` and resets `lightboxIndex = null`.
  6. **Modal Stop Propagation**: Clicking on the modal card itself stops propagation to prevent closing the lightbox.

### 3.4 Package Selection & Occasion Picking Scroll to `#contact`
- **Location**: `src/components/sections/HomePackages.jsx` & `HomeOccasions.jsx`
- **Store Sync**:
  1. Clicking "Get started" on any package card (`basic`, `standard`, `premium`) calls `setSelectedPackageId(pkg.id)` in Zustand store and triggers `document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })`.
  2. Clicking any occasion card (`birthday`, `anniversary`, `graduation`, `fathersDay`, `mothersDay`, `promotion`, `justBecause`) calls `setSelectedOccasion(id)` in Zustand store and triggers `document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })`.
  3. Clicking Hero primary CTA ("Plan a Surprise") calls `clearSelection()` and smoothly scrolls to `#contact`.
  4. `HomeContact` observes `selectedOccasion` and dynamically pre-fills the form's `occasion` field with the localized occasion label.

### 3.5 Routing and Zustand Client State
- **Store Location**: `src/store/useAppStore.js`
- **Actions & State**:
  - `selectedOccasion`: string or `null`
  - `setSelectedOccasion(occasion)`
  - `selectedPackageId`: string or `null`
  - `setSelectedPackageId(id)`
  - `clearSelection()`: resets both `selectedOccasion` and `selectedPackageId` to `null`.
- **Router Configuration**: React Router v7 `Routes` in `src/App.jsx` handling all 12 localized paths and wildcards.
- **In-page Anchor Handling**: `HomeNavbar` handles hash links (`#occasions`, `#how`, `#packages`, `#gallery`, `#contact`) by checking if the element exists in the current DOM (scrolling smoothly), or navigating to `${homePath}${href}` if currently on another route (e.g., `/gallery` or `/about-us`).

---

## 4. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Prerendering | 12-Route Static HTML Generation | Node script runs after `vite build` & `vite build --ssr` to output prerendered HTML | Route list array (`ROUTES`), `dist/index.html`, `dist-ssr/entry-server.js` | 12 static HTML files + `dist/404.html` | Exits with error code 1 if template lacks `#root` or SSR fails | `scripts/prerender.mjs:10-23`, `package.json:9` |
| 2 | SEO & Metadata | Automated Localized Head Generation | Injects title, description, canonical link, OpenGraph tags, and hreflang tags per page and language | `locale`, `pagePath` | Rendered `<head>` tags string | Falls back to default OG image and default English keys if missing | `src/seo/headTags.js:27-61`, `src/seo/pages.js:5-22` |
| 3 | Brand Design | CSS Theme Variable Tokens | Tailwind v4 `@theme` configuration exposing brand colors, fonts, and box shadows | CSS variables defined in `@theme` | Utility classes (`bg-gold`, `text-ink`, `font-display`, etc.) | None (browser-native CSS properties) | `src/styles/index.css:8-32` |
| 4 | State Management | Zustand Client UI Store | Global store managing current occasion/package picks across sections | Action calls (`setSelectedOccasion`, `setSelectedPackageId`, `clearSelection`) | Updated Zustand state object | In-memory only; non-persistent across page reload | `src/store/useAppStore.js:17-26` |
| 5 | Contact & Lead Gen | Mailto Form Dispatch | TanStack Query mutation formatting user contact info into `mailto:` URI | Name, phone, occasion, date, message form fields | Triggers default email client; renders success card with WhatsApp CTA | Shows error message if mutation fails; guards SSR with `window` check | `src/components/sections/HomeContact.jsx:18-39` |
| 6 | Navigation | Localized Path Routing | Normalizes and constructs language-prefixed URLs with ISO `om` mapping for `oro` | `locale`, `pathname` | Normalized string path (e.g. `/am/about-us/`) | Falls back to default locale `en` if segment unknown | `src/i18n/routes.js:8-44` |
| 7 | Navigation | Dual-mode Anchor Navigation | In-page smooth scroll if target anchor exists; route transition to `${homePath}#anchor` if on subpage | Anchor href string (`#contact`, `#how`, etc.) | DOM `scrollIntoView` or `navigate(path)` | Silently ignored if element not found | `src/components/sections/HomeNavbar.jsx:57-71` |
| 8 | Gallery | Categorized Lightbox Carousel | Modal overlay displaying high-resolution responsive images with keyboard & button navigation | Photo index, category selection, Arrow keys, Escape key | Fullscreen lightbox modal with active photo and counter | Loops circularly using modulo arithmetic; closes on escape | `src/pages/Gallery.jsx:38-57,145-220` |
| 9 | Hero Presentation | Auto-rotating Hero Carousel | Rotating showcase of top gallery projects with pause-on-hover and reduced-motion detection | 3000ms timer, hover/focus events, reduced-motion media query | Slide transition via `motion/react` `AnimatePresence` | Auto-rotation disables if reduced motion preferred or paused | `src/components/sections/HomeHero.jsx:29-62` |
| 10 | Packages | Dynamic Discount & Pricing Badges | Computes discount percent and original strike-through price if not hardcoded | `price`, `originalPrice`, `discount` in `PACKAGES` | Animated ping badge + discount tag, deposit note | Omitted if discount is 0 or undefined | `src/components/sections/HomePackages.jsx:17-58` |
| 11 | Internationalization | Multi-language Translation | react-i18next setup supporting English, Amharic, and Afaan Oromo | Translation key strings in JSON files | Localized UI strings | Missing key falls back to English key/default | `src/i18n/index.js`, `src/i18n/locales/*` |
| 12 | Visual Feedback | Scroll Reveal Animations | Reusable Framer Motion wrapper revealing sections on viewport entry | Children JSX, delay number | Opacity and translation transitions | Falls back cleanly if reduced motion requested | `src/components/ui/Reveal.jsx` |
| 13 | Responsive Images | Avif/Webp Multi-format Picture | Responsive picture element generating `<source>` tags for avif and webp | Responsive image object with srcset strings, sizes, alt | Native `<picture>` tag with optimized asset URLs | Gracefully renders empty placeholder if path missing | `src/components/ui/Image.jsx` |
| 14 | Structured Data | JSON-LD LocalBusiness Schema | Embedded Schema.org script providing pricing range, offers, address, and geo coordinates | Static data in `index.html` | Search engine rich snippet metadata | None (ignored by non-crawlers) | `index.html:45-71` |

---

## 5. Edge Cases & Observed Behaviors

| # | Feature | Input / Condition | Observed Behavior |
|---|---------|-------------------|-------------------|
| 1 | Prerendering SSR Cleanup | Running `pnpm build` followed immediately by `pnpm lint` | `prerender.mjs` executes `rm("dist-ssr")` upon completion. Because `eslint.config.js` only specifies `globalIgnores(["dist"])` and not `dist-ssr`, ESLint crashes with `ENOENT: no such file or directory, scandir '.../dist-ssr'` if directory deletion coincides with ESLint scanning. |
| 2 | Afaan Oromo URL vs i18n Key | Route segment `/om/...` | URL path uses ISO standard `/om/` (e.g. `/om/about-us/`), whereas internal i18next translation catalog uses key `"oro"`. Mapped via `SEGMENT_TO_LOCALE = { am: "am", om: "oro" }`. |
| 3 | Mailto in Headless/SSR | Executing form submission during SSR | `typeof window !== "undefined"` guards against crash; `window.location.href` only executes in browser context. |
| 4 | Gallery Lightbox Category Switching | Switching category while lightbox is open | `setActiveCategory(key)` explicitly calls `setLightboxIndex(null)` to prevent array out-of-bounds indexing in the new filtered array. |
| 5 | Lightbox Index Boundary Wrapping | Pressing ArrowRight at the last photo or ArrowLeft at the first photo | Modulo logic `(i + 1) % len` and `(i - 1 + len) % len` ensures infinite wrap-around without errors. |
| 6 | Deep-linked Hash on Page Load | Visiting `/am/#contact` from cold start | `Home.jsx` inspects `location.hash` and executes a 100ms delayed `scrollIntoView` to allow DOM layout to stabilize before scrolling. |
| 7 | Reduced Motion Accessibility | System has `prefers-reduced-motion: reduce` enabled | Hero auto-rotation halts, slide transition animations disable instant opacity toggle, and smooth scrolling degrades safely. |
| 8 | Empty Gallery Category Filter | If filtered category has 0 photos | Displays fallback `ImagePlaceholder` with hint text "No photos found in this category." rather than crashing grid. |
| 9 | About Page Missing Image | `about.json` item array is empty or undefined | `AboutUs.jsx` conditionally renders a luxury brand gradient banner (`bg-gradient-to-br from-ink via-ink-soft to-gold-deep`) if `teamPath` is null. |
| 10 | Package Deposit Note Display | Calling `t("packages.depositNote", { amount })` with localized number | Uses `pkg.deposit.toLocaleString()` to format Ethiopian Birr values with thousand separators. |

---

## 6. Acceptance Criteria Checklist

Authoritatively extracted from `ORIGINAL_REQUEST.md` to serve as the immutable verification gates for all subsequent development milestones:

### 6.1 Competitor Research Gate (R1)
- [ ] `DESIGN_RESEARCH.md` exists in the project root directory (`/home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/DESIGN_RESEARCH.md`).
- [ ] Documents at least 5 competitor/inspiration websites in the event planning, surprise delivery, or gift experience domain (e.g., The Knot, Surprise.com, Bloom & Wild, Postmates Gifts, GiftHero, Edible Arrangements).
- [ ] For each competitor, documents:
  - [ ] Layout patterns (hero structure, section flow, CTAs)
  - [ ] Visual hierarchy techniques (typography scale, spacing, card styles)
  - [ ] UX conventions (navigation, mobile patterns, trust signals, social proof)
  - [ ] Copy and messaging patterns (value prop, emotional hooks, CTAs)
- [ ] Identifies specific patterns adopted into the Yehidat redesign and explains the rationale for adoption.

### 6.2 Visual Design & Brand Gate (R2)
- [ ] All brand color tokens are strictly preserved with identical hex values:
  - `--color-gold: #f5c518`
  - `--color-gold-deep: #b8960c`
  - `--color-gold-edge: #d4a017`
  - `--color-gold-pale: #0f0f13`
  - `--color-gold-cream: #17181d`
  - `--color-ink: #ffffff`
  - `--color-parchment: #241f14`
- [ ] Both typefaces remain in active use across all pages:
  - `--font-display: "Playfair Display", Georgia, serif`
  - `--font-body: "Inter", system-ui, sans-serif`
- [ ] Redesigned Home page demonstrates a meaningfully improved layout compared to the original (new section composition, hero structure, card designs — not mere padding/margin tweaks).
- [ ] Gallery page (`/gallery/`) exhibits visible layout and UX improvements informed by competitor patterns.
- [ ] About Us page (`/about-us/`) exhibits visible layout and storytelling improvements informed by competitor patterns.
- [ ] Team page (`/team/`) exhibits visible layout, trust signal, and credential improvements informed by competitor patterns.

### 6.3 Functionality & Build Gate (R3)
- [ ] `pnpm build` exits with code 0 and zero compilation or prerendering errors.
- [ ] All 12 prerendered routes compile and generate static HTML:
  - [ ] `/`
  - [ ] `/am/`
  - [ ] `/om/`
  - [ ] `/about-us/`
  - [ ] `/am/about-us/`
  - [ ] `/om/about-us/`
  - [ ] `/gallery/`
  - [ ] `/am/gallery/`
  - [ ] `/om/gallery/`
  - [ ] `/team/`
  - [ ] `/am/team/`
  - [ ] `/om/team/`
- [ ] Contact form mailto flow executes properly (pre-fills subject and body, triggers mailto URI, displays success state and WhatsApp option).
- [ ] Language switching across all 3 locales (English, Amharic, Afaan Oromo) functions smoothly across all pages.
- [ ] Gallery lightbox on `/gallery/` opens, closes, and navigates correctly via keyboard arrows and on-screen controls.
- [ ] Package selection buttons ("Get started") scroll to `#contact` and persist selection state in Zustand.
- [ ] Occasion cards click-to-select scrolls to `#contact` and pre-populates form occasion.

### 6.4 Code Quality & Repository Hygiene Gate
- [ ] No duplicate import statements in any modified or created component file.
- [ ] No unused imports or variables introduced during the redesign.
- [ ] Any newly introduced packages are installed via `pnpm add` and recorded in `package.json`.
- [ ] No regressions in client console output or React hydration warnings.
