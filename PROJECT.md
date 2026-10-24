# PROJECT SPECIFICATION & ARCHITECTURE MASTERPLAN

**Project Name**: Yehidat Surprise Planning & Delivery Web Platform  
**Target Market**: Dukem, Bishoftu, East Shewa Zone, and Addis Ababa, Ethiopia  
**Repository Root**: `/home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat`  
**Authoritative Documents**: `DESIGN_RESEARCH.md`, `ORIGINAL_REQUEST.md`, `scripts/prerender.mjs`, `src/styles/index.css`  
**Current Milestone**: M1 (Research & Project Specification Docs)

---

## 1. Project Vision & Architecture Overview

Yehidat is Ethiopia’s premier boutique surprise planning, gift packaging, and celebration delivery service. Operating in Dukem, Bishoftu, and adjacent East Shewa regions (with custom coordination for Addis Ababa), Yehidat curates turn-key milestone experiences: bespoke artisanal cakes, fresh floral arrangements, personalized handwritten calligraphy postcards, custom balloons, fireworks displays, and high-definition video keepsakes.

The digital web application is architected as a high-performance, statically generated (SSG) marketing platform with full client hydration, trilingual internationalization, dynamic SEO metadata, and fluid micro-interactions:

- **Core Engine**: React 19 (`react: ^19.2.8`, `react-dom: ^19.2.8`)
- **Build System**: Vite 8 (`vite: ^8.2.0`, `@vitejs/plugin-react: ^6.0.4`)
- **Styling Architecture**: Tailwind CSS v4 (`tailwindcss: ^4.3.3`, `@tailwindcss/vite: ^4.3.3`) utilizing a modern CSS-first `@theme` token structure in `src/styles/index.css`
- **Routing & Navigation**: React Router v7 (`react-router-dom: ^7.18.2`) with path-based language prefixing (`/`, `/am/`, `/om/`)
- **Static Site Generation & Prerendering**: Custom post-build SSR prerendering pipeline (`scripts/prerender.mjs` + `src/entry-server.jsx`) generating 12 static HTML routes plus `dist/404.html`
- **Internationalization (i18n)**: `react-i18next` + `i18next` (`^17.0.11` / `^26.3.6`) supporting English (`en`), Amharic (`am`), and Afaan Oromoo (`oro` mapped to `/om/`)
- **Client State**: Zustand 5 (`zustand: ^5.0.14`) for persistent UI selection flows (occasions and packages)
- **Data & Mutation Pipeline**: TanStack React Query (`@tanstack/react-query: ^5.101.4`) managing asynchronous contact form submission
- **Animation & Transitions**: Motion for React (`motion: ^12.43.0` / Framer Motion v12) for scroll reveals, mobile drawer physics, and carousel transitions
- **Iconography**: Lucide React (`lucide-react: ^1.59.0`)

---

## 2. Brand Identity & Design Tokens

All brand tokens are declared in `src/styles/index.css` inside the Tailwind v4 `@theme` block. These values represent the immutable visual signature of Yehidat and **must remain strictly unchanged**:

### 2.1 Color Tokens
| CSS Token Variable | Hex / Value | Semantic Role | Tailwind Utility Class |
|---|---|---|---|
| `--color-gold` | `#f5c518` | Primary brand accent gold (buttons, badges, active states) | `bg-gold`, `text-gold`, `border-gold` |
| `--color-gold-deep` | `#b8960c` | Deep gold (eyebrows, secondary headings, icons, gradient stops) | `text-gold-deep`, `border-gold-deep` |
| `--color-gold-edge` | `#d4a017` | Border / ribbon outline / card perimeter accent | `border-gold-edge` |
| `--color-gold-pale` | `#0f0f13` | Dark background surface (near-black container fills) | `bg-gold-pale` |
| `--color-gold-cream`| `#17181d` | Secondary dark surface color (section alternates, card fills) | `bg-gold-cream` |
| `--color-ink` | `#ffffff` | Primary text (pure white contrast against dark surfaces) | `text-ink` |
| `--color-ink-soft` | `#f5c518` | Soft / accented secondary text | `text-ink-soft` |
| `--color-ink-muted`| `#7a6b2a` | Muted captions, metadata, tertiary copy | `text-ink-muted` |
| `--color-parchment`| `#241f14` | Primary page background (dark warm luxury tone) | `bg-parchment` |

### 2.2 Elevation & Shadow Tokens
| Token Variable | Definition | Semantic Role |
|---|---|---|
| `--shadow-gold` | `0 0 0 1px rgba(184, 150, 12, 0.25), 0 4px 24px rgba(245, 197, 24, 0.15)` | Glowing gold outline and elevation for cards on hover |
| `--shadow-gold-lg` | `0 0 0 4px #fff8dc, 0 0 0 5.5px rgba(184, 150, 12, 0.55)` | Large ring focus / luxury stepped borders |
| `--shadow-card` | `0 2px 16px rgba(26, 20, 0, 0.08)` | Subtle card elevation on dark background |

### 2.3 Typography Tokens
| Token Variable | Font Stack | Application |
|---|---|---|
| `--font-display` | `"Playfair Display", Georgia, serif` | Hero headlines, section titles, card headers, numbers, brand name |
| `--font-body` | `"Inter", system-ui, sans-serif` | Body paragraphs, navigation links, buttons, form inputs, labels |

**Google Font Import**:
```css
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Inter:wght@300;400;500;600&display=swap");
```

---

## 3. Feature Inventory & Milestone Allocation

Every feature across the Yehidat web application is itemized below and mapped to its respective delivery milestone:

| # | Feature | Subsystem | Description | Inputs / Triggers | Outputs / Result | Assigned Milestone |
|---|---|---|---|---|---|---|
| 1 | Research Synthesis & Project Docs | Documentation | Authoritative competitive analysis (`DESIGN_RESEARCH.md`) and project blueprint (`PROJECT.md`) | Survey reports, spec requirements, original user request | Authoritative markdown specifications at project root | **M1** (Current) |
| 2 | Glassmorphic Navigation Header | Navigation | Sticky top navbar with brand mark, anchor handling, active indicator, language dropdown | Scroll offset, route path, anchor clicks | Smooth scroll or localized subpage transition | **M2** |
| 3 | Mobile Navigation Drawer | Navigation | Slide-down hamburger drawer powered by Framer Motion physics with auto-collapse | Hamburger click, route transition | Animated mobile menu overlay | **M2** |
| 4 | Trilingual Language Switcher | i18n / Nav | Header dropdown switching between English (`en`), Amharic (`am`), and Afaan Oromo (`oro` / `/om/`) | Select change event | Path update preserving current page (`/am/gallery/`, etc.) | **M2** |
| 5 | Luxury Dark Footer | Layout | 3-column dark luxury footer (`bg-gold-pale`) with brand narrative, social links, quick links, contact info | Route context, social links | Accessible navigational footer | **M2** |
| 6 | Emotional Hero with Dual CTA | Home / Hero | 50/50 split hero with Playfair hook, dual action buttons, 5.0 star trust proof bar, and photo carousel | Page load, autoplay timer, user hover | High-converting hero showcase | **M3** |
| 7 | Curated Occasion Grid & 1-Click Select | Home / Occasions | Interactive 7-card occasion grid with gold hover elevation and instant pre-fill to contact form | Occasion card click | Sets `selectedOccasion`, scrolls to `#contact` | **M3** |
| 8 | 3-Step Surprise Coordination Timeline | Home / HowItWorks | Step-by-step narrative with gold connector line and dark luxury ring shadows (fixing `#FFF8DC`) | Scroll reveal | Clear visual roadmap of secret delivery | **M3** |
| 9 | Dark Luxury Tiered Package Cards | Home / Packages | 3-tier pricing cards with left-aligned inclusions, gold checkmarks, glowing featured card, transparent deposit | Package card click | Sets `selectedPackageId`, scrolls to `#contact` | **M3** |
| 10 | Editorial Home Gallery Preview | Home / Gallery | 6-item photo grid with 4:5 aspect ratio, hover zooms, occasion/location tags, and link to full gallery | Mouse hover | Engaging visual proof | **M3** |
| 11 | 4 Trust Pillars Module | Home / Trust | 4 luxury guarantee cards: 100% Secret & Discreet, Punctual Arrival, Artisan Cakes, Video Recording | Viewport entry | High-stakes objection handling | **M3** |
| 12 | Interactive FAQ Accordion | Home / FAQ | Accessible expandable 4-item Q&A addressing timing, secrecy, customization, and coverage | Accordion toggle | Proactive objection resolution | **M3** |
| 13 | Concierge Contact Form & Mailto Flow | Home / Contact | Direct channel cards (WhatsApp, Phone), high-contrast form, auto-fill from Zustand, mailto dispatch | Form submission | Dispatches mailto URI, displays success card | **M3** |
| 14 | Editorial Categorized Gallery Page | Inner / Gallery | `/gallery/` page with category filter tabs (All, Surprises, Cakes, Outdoor), 3/4-col grid, and CTA | Category click | Filtered photo grid with empty state fallback | **M4** |
| 15 | Touch & Keyboard Lightbox Carousel | Inner / Lightbox | Fullscreen modal overlay with photo counter, escape/arrow key support, backdrop click, and "Book Look" CTA | Photo card click, keyboard events | Touch & keyboard navigable lightbox modal | **M4** |
| 16 | The Yehidat Story & Visual Pillars | Inner / AboutUs | Editorial narrative of founding mission, 3 core pillars (Discretion, Craftsmanship, Joy), and reveal anatomy | Viewport entry | Storytelling-driven brand authority | **M4** |
| 17 | Team Roles & Credential Showcase | Inner / Team | 4 distinct role cards with real team photos, 3 core values, and direct consultation banner | Viewport entry | Human connection and trust building | **M4** |
| 18 | 12-Route Prerendering & Build Pipeline | Prerender / SSG | Node.js script generating static HTML for all 12 localized routes + `dist/404.html` | `pnpm build` | Static HTML files with localized SEO tags | **M5** |
| 19 | Dynamic SEO Head Metadata | SEO | Injects title, description, canonical link, OpenGraph tags, and hreflang alternates per language | Route & locale | Clean head tags for search crawlers | **M5** |
| 20 | JSON-LD Structured Data Schema | SEO | Embedded LocalBusiness rich snippet with price range, geo-coordinates, and service catalog | Static crawl | Enhanced search engine presentation | **M5** |

---

## 4. Project Milestones & Delivery Roadmap

The redesign project is organized into 5 disciplined, sequential milestones:

```
┌────────────────────────────────────────────────────────────────────────┐
│  M1: Research & Project Docs  ──▶  M2: Navigation & Footer             │
│  (Authoritative Specifications)    (Glassmorphic Header & Dark Footer) │
└─────────────────────────────────┬──────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│  M3: Home Page Redesign       ──▶  M4: Inner Pages Redesign            │
│  (Hero, Occasions, Packages,       (Gallery + Lightbox, AboutUs,       │
│   Timeline, Trust, FAQ, Form)       Team Showcase)                     │
└─────────────────────────────────┬──────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│  M5: Build & Prerender E2E Verification                                │
│  (12 Static Routes, Mailto Flow, State Sync, Linter Clean)             │
└────────────────────────────────────────────────────────────────────────┘
```

### Milestone Summary Table

| Milestone | Title | Scope & Key Deliverables | Success Criteria & Gate | Status |
|---|---|---|---|---|
| **M1** | Research & Project Docs | Write authoritative `DESIGN_RESEARCH.md` and `PROJECT.md` at project root synthesizing 8 competitors, adoption rationale, codebase bug audit, and full milestone plan. | Both files written completely, formatted accurately, containing all required sections and specifications. | **In Progress (Current)** |
| **M2** | Navigation & Footer | Redesign `HomeNavbar.jsx` (glassmorphic blur, active link styles, language selector, animated mobile drawer) and `HomeFooter.jsx` (dark luxury background `bg-gold-pale`, 3 columns, social links, contact info). | Clean responsive navigation across mobile/desktop, language switching without route breakdown, no console warnings. | Next |
| **M3** | Home Page Redesign | Overhaul all 6 existing home sections + add Trust Pillars & FAQ accordion. Fix stark white package card bug, fix `#FFF8DC` shadows, add 5.0 rating bar, auto-fill contact form. | Cohesive dark luxury aesthetic, no white cards, interactive FAQ working, 1-click package/occasion select to contact scroll functioning. | Pending |
| **M4** | Inner Pages Redesign | Redesign `Gallery.jsx` (editorial grid, category tabs, upgraded lightbox with "Book This Look"), `AboutUs.jsx` (editorial story, 3 pillars, reveal anatomy), and `Team.jsx` (role cards, core values). | Visual transformation matching competitor benchmarks, full keyboard & touch lightbox navigation, accurate translations in 3 locales. | Pending |
| **M5** | Build & Prerender E2E Verification | Execute full build (`pnpm build`), verify all 12 localized static routes generate cleanly, verify `dist/404.html`, verify mailto contact dispatch, verify zero linter defects (`npx oxlint`). | `pnpm build` exits with code 0, 12 HTML files verified, all interactive invariants passing, 0 linter errors. | Pending |

---

## 5. Interface Contracts & Interactivity Invariants

To guarantee that the application functions flawlessly across all platforms and locales, the following technical invariants must be maintained by all workers:

### 5.1 Zustand Client UI Store (`src/store/useAppStore.js`)
```javascript
export const useAppStore = create((set) => ({
  selectedOccasion: null,
  setSelectedOccasion: (occasion) => set({ selectedOccasion: occasion }),

  selectedPackageId: null,
  setSelectedPackageId: (id) => set({ selectedPackageId: id }),

  clearSelection: () =>
    set({ selectedOccasion: null, selectedPackageId: null }),
}));
```
**Invariants**:
1. When user clicks an occasion card in `HomeOccasions`, `setSelectedOccasion(occasionId)` is called.
2. In `HomeContact`, `useEffect` listens to `selectedOccasion` and auto-populates the form dropdown:
   ```javascript
   useEffect(() => {
     if (selectedOccasion) {
       setForm((f) => ({ ...f, occasion: t(`occasions.${selectedOccasion}`) }));
     }
   }, [selectedOccasion, t]);
   ```
3. When user clicks "Get started" on a package card in `HomePackages`, `setSelectedPackageId(pkg.id)` is called and the page smoothly scrolls to `#contact`.
4. When user clicks "Plan a Surprise" in Hero, `clearSelection()` is executed so the contact form opens fresh.
5. When user resets the form after submission ("Submit another"), `clearSelection()` is executed.

---

### 5.2 Contact Form & Mailto Mutation Flow (`src/components/sections/HomeContact.jsx`)
- **Recipient Email**: `diboramarema@gmail.com` (from `CONTACT.EMAIL`).
- **Submission Hook**: TanStack `useMutation` executing `submitCallback(payload)`.
- **Feedback Delay**: 1400ms simulated async delay displaying `Loader2` spinner and `t("contact.navigatingEmail")`.
- **Subject Formatting**: `Surprise Request: ${payload.occasion || "Celebration"} - ${payload.name}`.
- **Body Formatting**:
  ```
  Hello Yehidat Team,

  I would like to request a surprise package.

  Name: [name]
  Phone: [phone]
  Occasion: [occasion]
  Date: [date]
  Message: [message]

  Sent via Yehidat website
  ```
- **SSR Guard**: `if (typeof window !== "undefined") { window.location.href = mailto:... }`.
- **Success State**: Renders celebratory confirmation with direct WhatsApp confirmation button:
  `https://wa.me/251968034000?text=...`

---

### 5.3 Trilingual Routing & Internationalization (i18n)
- **Supported Locales**:
  - English (`en`): URL prefix `""` (e.g., `/`, `/about-us/`, `/gallery/`, `/team/`)
  - Amharic (`am`): URL prefix `"/am"` (e.g., `/am/`, `/am/about-us/`, `/am/gallery/`, `/am/team/`)
  - Afaan Oromoo (`oro`): Internal catalog key `"oro"`, URL prefix `"/om"` (e.g., `/om/`, `/om/about-us/`, `/om/gallery/`, `/om/team/`)
- **URL as Single Source of Truth**:
  - `localeFromPath(pathname)` parses URL segment (`/am/...` $\rightarrow$ `am`, `/om/...` $\rightarrow$ `oro`, else `en`).
  - Browser auto-detection is deliberately disabled to guarantee deterministic prerendering.
  - `LanguageSwitcher` updates browser URL using `localizedPath(newLocale, pagePath(currentPath))`.
  - `LocaleRoute` synchronizes `i18n.changeLanguage(locale)` and updates `document.documentElement.lang`.
- **Catalog Synchronization**: Any new translation key introduced in `src/i18n/locales/en.json` must be mirrored in `am.json` and `oro.json`.

---

### 5.4 Gallery Lightbox Navigation (`src/pages/Gallery.jsx`)
- **State**: `activeCategory` (default `"all"`), `lightboxIndex` (integer or `null`).
- **Open**: Clicking any gallery card sets `lightboxIndex` to that card’s index in `filteredPhotos`.
- **Close**: Pressing `Escape`, clicking the dark backdrop, or clicking the `X` button sets `lightboxIndex(null)`.
- **Next**: Pressing `ArrowRight` or clicking the Next button cycles forward: `(i + 1) % filteredPhotos.length`.
- **Previous**: Pressing `ArrowLeft` or clicking the Prev button cycles backward: `(i - 1 + filteredPhotos.length) % filteredPhotos.length`.
- **Category Filter Switch**: Selecting a category filter tab resets `lightboxIndex = null` to avoid index bounds corruption.
- **Event Isolation**: `e.stopPropagation()` on the modal dialog card prevents accidental closing when clicking image or controls.

---

### 5.5 Prerendering Pipeline Invariants (`scripts/prerender.mjs`)
- Must generate all 12 localized routes:
  1. `/` $\rightarrow$ `dist/index.html` (en)
  2. `/am/` $\rightarrow$ `dist/am/index.html` (am)
  3. `/om/` $\rightarrow$ `dist/om/index.html` (oro)
  4. `/about-us/` $\rightarrow$ `dist/about-us/index.html` (en)
  5. `/am/about-us/` $\rightarrow$ `dist/am/about-us/index.html` (am)
  6. `/om/about-us/` $\rightarrow$ `dist/om/about-us/index.html` (oro)
  7. `/gallery/` $\rightarrow$ `dist/gallery/index.html` (en)
  8. `/am/gallery/` $\rightarrow$ `dist/am/gallery/index.html` (am)
  9. `/om/gallery/` $\rightarrow$ `dist/om/gallery/index.html` (oro)
  10. `/team/` $\rightarrow$ `dist/team/index.html` (en)
  11. `/am/team/` $\rightarrow$ `dist/am/team/index.html` (am)
  12. `/om/team/` $\rightarrow$ `dist/om/team/index.html` (oro)
- Copies `dist/index.html` to `dist/404.html` for SPA fallback.
- Injects canonical links, hreflang alternates (`en`, `am`, `om`, `x-default`), and Open Graph metadata.

---

## 6. Code Layout and File Boundaries

```
Yehidat/
├── DESIGN_RESEARCH.md            # Authoritative competitive benchmark and design research (M1)
├── PROJECT.md                    # Authoritative technical specification and milestone masterplan (M1)
├── README.md                     # Vite template overview
├── package.json                  # Dependencies and build scripts
├── vite.config.js                # Vite build and plugin configuration
├── index.html                    # Root HTML template with JSON-LD schema
├── scripts/
│   ├── prerender.mjs             # 12-route SSG HTML generator
│   └── convert_images.py         # Pillow image optimization script
├── src/
│   ├── App.jsx                   # React Router v7 route definitions
│   ├── entry-server.jsx          # SSR render entry point
│   ├── main.jsx                  # Client hydration entry point
│   ├── components/
│   │   ├── LocaleRoute.jsx       # Route wrapper handling i18n & SEO injection
│   │   ├── sections/
│   │   │   ├── HomeNavbar.jsx    # Top fixed navigation header (M2)
│   │   │   ├── HomeFooter.jsx    # 3-column dark luxury footer (M2)
│   │   │   ├── HomeHero.jsx      # 50/50 emotional hero with photo carousel (M3)
│   │   │   ├── HomeOccasions.jsx # 7-card occasion grid with 1-click select (M3)
│   │   │   ├── HomeHowItWorks.jsx# 3-step surprise coordination timeline (M3)
│   │   │   ├── HomePackages.jsx  # Dark luxury tiered packages (M3)
│   │   │   ├── HomeGallery.jsx   # Editorial 6-item photo preview (M3)
│   │   │   ├── HomeFaq.jsx       # Interactive 4-item FAQ accordion (M3)
│   │   │   └── HomeContact.jsx   # Concierge channels & callback form (M3)
│   │   └── ui/
│   │       ├── Image.jsx         # Responsive picture element (AVIF/WebP)
│   │       ├── Reveal.jsx        # Framer Motion scroll reveal wrapper
│   │       └── SectionBackground.jsx # Background veil image container
│   ├── data/
│   │   ├── constants.js          # Package specs, occasions, trust faces, contact constants
│   │   ├── gallery.js            # Gallery photo helpers & hero slice
│   │   ├── gallery.json          # Complete gallery asset catalog
│   │   └── team.json             # Team members asset catalog
│   ├── i18n/
│   │   ├── index.js              # i18next configuration
│   │   ├── routes.js             # Localized path mapping and normalization
│   │   └── locales/
│   │       ├── en.json           # English base translations
│   │       ├── am.json           # Amharic translations
│   │       └── oro.json          # Afaan Oromo translations
│   ├── pages/
│   │   ├── Home.jsx              # Main landing page composing home sections
│   │   ├── Gallery.jsx           # Categorized gallery with lightbox modal (M4)
│   │   ├── AboutUs.jsx           # Brand story, 3 pillars, reveal anatomy (M4)
│   │   └── Team.jsx              # Team role cards, core values, contact banner (M4)
│   ├── store/
│   │   └── useAppStore.js        # Zustand UI selection store
│   └── styles/
│       └── index.css             # Tailwind v4 theme, brand tokens, and utilities
```

### Architectural Constraints & Prohibitions
1. **No Brand Hex Alterations**: Do NOT change `--color-gold`, `--color-gold-deep`, `--color-gold-edge`, `--color-gold-pale`, `--color-gold-cream`, `--color-ink`, or `--color-parchment`.
2. **No Stark White Cards**: In a dark-mode luxury theme, never use `bg-ink` or `bg-white` for cards or panels. Always use dark parchment or gold cream containers (`bg-parchment/90`, `bg-gold-cream/40`) with gold borders.
3. **No Hardcoded `#FFF8DC` Shadows**: Never introduce `#FFF8DC` light cream shadows; use dark tokens or subtle gold glows.
4. **No Broken Invariants**: Preserve the Zustand state sync, mailto flow, gallery lightbox keyboard handlers, and language routing.
5. **No Blind Full-File Overwrites**: Follow the minimal-change principle. Make precise, targeted edits.

---

## 7. Verification & Testing Protocol

Before any milestone is signed off, the following verification commands must be executed and documented:

### 7.1 Build & Prerender Verification
```bash
pnpm build
```
- **Exit Code**: Must be `0`.
- **Output Inspection**: Confirm that all 12 routes render into `dist/` and `dist/404.html` is created:
  - `dist/index.html`
  - `dist/am/index.html`
  - `dist/om/index.html`
  - `dist/about-us/index.html`
  - `dist/am/about-us/index.html`
  - `dist/om/about-us/index.html`
  - `dist/gallery/index.html`
  - `dist/am/gallery/index.html`
  - `dist/om/gallery/index.html`
  - `dist/team/index.html`
  - `dist/am/team/index.html`
  - `dist/om/team/index.html`
  - `dist/404.html`

### 7.2 Linter Cleanliness Verification
```bash
npx oxlint
```
- **Exit Code**: Must be `0`.
- **Output Inspection**: Zero errors and zero warnings across all project files.

### 7.3 Interactivity & Functional Checklist
- [ ] Occasion card click $\rightarrow$ updates `selectedOccasion` in Zustand $\rightarrow$ smoothly scrolls to `#contact` $\rightarrow$ form dropdown pre-selected.
- [ ] Package card click $\rightarrow$ updates `selectedPackageId` in Zustand $\rightarrow$ smoothly scrolls to `#contact`.
- [ ] Hero "Plan a Surprise" click $\rightarrow$ resets selection $\rightarrow$ smoothly scrolls to `#contact`.
- [ ] Contact form submission $\rightarrow$ formats and triggers `mailto:diboramarema@gmail.com` $\rightarrow$ shows success card with WhatsApp button.
- [ ] Language dropdown $\rightarrow$ switches locale prefix (`/`, `/am/`, `/om/`) while preserving active route.
- [ ] Gallery lightbox $\rightarrow$ opens on card click $\rightarrow$ navigates forward/backward via arrow keys and buttons $\rightarrow$ closes on Escape key or backdrop click.

---

*Authored and approved as the authoritative Project Specification & Milestone Masterplan for Yehidat.*
