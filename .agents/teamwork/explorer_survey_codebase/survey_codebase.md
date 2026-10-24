# Comprehensive Codebase Survey: Yehidat Surprise Planning Website

**Author**: Codebase Survey Explorer  
**Date**: October 2026  
**Project Root**: `/home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat`  
**Target Scope**: Full codebase survey covering project structure, dependencies, all scoped pages & sections, state invariants, i18n, prerendering, and styling architecture.

---

## 1. Executive Summary & Architecture Overview

Yehidat is a specialized surprise planning and gift delivery service in Ethiopia (specifically Dukem/Bishoftu and Addis Ababa). The web application is built with a modern, high-performance static marketing stack that combines client-side interactivity with full SSG prerendering:

- **Core Framework**: React 19 (`react: ^19.2.8`, `react-dom: ^19.2.8`)
- **Build Tool**: Vite 8 (`vite: ^8.2.0`, `@vitejs/plugin-react: ^6.0.4`)
- **Styling**: Tailwind CSS v4 (`tailwindcss: ^4.3.3`, `@tailwindcss/vite: ^4.3.3`) using CSS-first `@theme` configuration in `src/styles/index.css`
- **Routing**: React Router v7 (`react-router-dom: ^7.18.2`) with path-based language prefixing (`/`, `/am/`, `/om/`)
- **Prerendering**: Custom post-build SSR prerendering pipeline (`scripts/prerender.mjs` + `src/entry-server.jsx`) generating static HTML for all 12 localized routes
- **Internationalization**: `react-i18next` + `i18next` (`^17.0.11` / `^26.3.6`) with three supported locales: English (`en`), Amharic (`am`), and Afaan Oromo (`oro` / ISO code `om`)
- **Client State**: Zustand 5 (`zustand: ^5.0.14`) for transient UI interaction state (selected occasion and package)
- **Data & Queries**: TanStack React Query (`@tanstack/react-query: ^5.101.4`) for asynchronous mutation handling (contact submission flow)
- **Animation**: Motion for React (`motion: ^12.43.0` / Framer Motion) for scroll reveals, mobile menu transitions, and carousel animation
- **Icons**: Lucide React (`lucide-react: ^1.59.0`)

---

## 2. Project Structure, Packages & Dependencies

### 2.1 File Directory Structure

```
Yehidat/
├── .agents/                      # Teamwork multi-agent coordination metadata
├── dist/                         # Generated client build output
├── public/                       # Static public assets
│   ├── banner/
│   ├── icons/
│   │   └── assets_icon_navbar1.png  # Brand navbar & tab icon
│   ├── images/
│   │   ├── backgrounds/blur/     # Pre-blurred AVIF/WebP background textures
│   │   ├── gallery/avif|webp/    # Multi-resolution gallery photos (480w, 800w, full)
│   │   ├── socials/              # Open Graph banner assets
│   │   └── team/avif|webp/       # Team showcase photos
│   ├── occasions/                # Occasion card images (.png)
│   ├── robots.txt
│   ├── site.webmanifest
│   └── sitemap.xml
├── scripts/
│   ├── convert_images.py         # Pillow image optimizer generating AVIF/WebP sets
│   ├── make-backgrounds.py       # Background blur generator
│   ├── make-social-images.py     # Social share banner generator
│   └── prerender.mjs             # Multi-locale route prerendering generator
├── src/
│   ├── assets/
│   │   └── backgrounds/          # Source raw background images
│   ├── components/
│   │   ├── LocaleRoute.jsx       # Route wrapper synchronizing HTML lang & i18n
│   │   ├── sections/             # Primary layout sections
│   │   │   ├── HomeContact.jsx
│   │   │   ├── HomeFooter.jsx
│   │   │   ├── HomeGallery.jsx
│   │   │   ├── HomeHero.jsx
│   │   │   ├── HomeHowItWorks.jsx
│   │   │   ├── HomeNavbar.jsx
│   │   │   ├── HomeOccasions.jsx
│   │   │   └── HomePackages.jsx
│   │   └── ui/                   # Reusable UI primitives
│   │       ├── Image.jsx         # Responsive <picture> (AVIF/WebP/PNG)
│   │       ├── ImagePlaceholder.jsx
│   │       ├── Reveal.jsx        # Motion-based viewport scroll reveal
│   │       ├── SectionBackground.jsx # Blurred photo background veil
│   │       └── Seo.jsx           # Client-side dynamic <head> updater
│   ├── data/
│   │   ├── about.json            # About team photo manifest
│   │   ├── backgrounds.json      # Background images manifest
│   │   ├── constants.js          # Non-translated constants (phone, email, packages)
│   │   ├── gallery.js            # Gallery photo helpers & hero photo slice
│   │   ├── gallery.json          # Complete gallery asset manifest
│   │   ├── team.js               # Team photo mapping
│   │   └── team.json             # Team members manifest
│   ├── i18n/
│   │   ├── index.js              # i18next configuration
│   │   ├── routes.js             # URL ↔ locale mapping logic
│   │   └── locales/
│   │       ├── am.json           # Amharic translations
│   │       ├── en.json           # English translations (base source)
│   │       └── oro.json          # Afaan Oromo translations
│   ├── lib/
│   │   └── queryClient.js        # TanStack QueryClient instance
│   ├── pages/
│   │   ├── AboutUs.jsx           # Dedicated /about-us page
│   │   ├── Gallery.jsx           # Dedicated /gallery page with lightbox
│   │   ├── Home.jsx              # Landing page composing all home sections
│   │   └── Team.jsx              # Dedicated /team page
│   ├── seo/
│   │   ├── headTags.js           # Server-side HTML head tags generator
│   │   └── pages.js              # Page-to-SEO translation keys lookup
│   ├── store/
│   │   └── useAppStore.js        # Zustand client UI store
│   ├── styles/
│   │   └── index.css             # Tailwind v4 configuration, theme, base & utilities
│   ├── App.jsx                   # Application route definitions
│   ├── entry-server.jsx          # SSR entry point for prerendering
│   └── main.jsx                  # Client entry point with hydration support
├── index.html                    # Root HTML template
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```

### 2.2 Dependencies Analysis (`package.json`)

```json
"dependencies": {
  "@tailwindcss/vite": "^4.3.3",
  "@tanstack/react-query": "^5.101.4",
  "i18next": "^26.3.6",
  "i18next-browser-languagedetector": "^8.2.1",
  "lucide-react": "^1.59.0",
  "motion": "^12.43.0",
  "prettier": "^3.9.10",
  "react": "^19.2.8",
  "react-dom": "^19.2.8",
  "react-i18next": "^17.0.11",
  "react-router-dom": "^7.18.2",
  "tailwindcss": "^4.3.3",
  "zustand": "^5.0.14"
}
```

Key characteristics:
1. **Zero unnecessary enterprise abstractions**: Direct imports of standard modern libraries.
2. **Motion for React**: Imported via `import { ... } from "motion/react"` (the current React 19-compatible entry point for Framer Motion v12).
3. **Tailwind v4 CSS-First Setup**: Handled via `@tailwindcss/vite` plugin without any legacy `tailwind.config.js`.

### 2.3 Vite Configuration (`vite.config.js`)
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react(), tailwindcss()],
});
```
- Supports custom base paths (e.g. for GitHub Pages via `VITE_BASE`), defaulting to `/` on Vercel and local dev.
- Client build command: `vite build`
- SSR entry build command: `vite build --ssr src/entry-server.jsx --outDir dist-ssr`
- Prerender execution: `node scripts/prerender.mjs`

---

## 3. Styling Architecture, Brand Colors & Fonts

### 3.1 Brand Design Tokens (`src/styles/index.css`)

Yehidat uses a warm, dark, luxurious gold-and-parchment color palette declared in the Tailwind v4 `@theme` block. These values **must remain completely unchanged**:

| CSS Variable | Hex / Value | Semantic Role & Utility Class |
|---|---|---|
| `--color-gold` | `#f5c518` | Primary brand accent gold (`bg-gold`, `text-gold`, `border-gold`) |
| `--color-gold-deep` | `#b8960c` | Deep gold accent for icons, emphasis text, and gradients (`text-gold-deep`) |
| `--color-gold-edge` | `#d4a017` | Border and separator gold (`border-gold-edge`) |
| `--color-gold-pale` | `#0f0f13` | Dark surface background (near black) (`bg-gold-pale`) |
| `--color-gold-cream`| `#17181d` | Secondary dark surface background for cards & sections (`bg-gold-cream`) |
| `--color-ink` | `#ffffff` | Primary text color (white/bright) (`text-ink`) |
| `--color-ink-soft` | `#f5c518` | Warm gold secondary text (`text-ink-soft`) |
| `--color-ink-muted`| `#7a6b2a` | Subdued gold/olive caption text (`text-ink-muted`) |
| `--color-parchment`| `#241f14` | Primary page background (warm dark brown-black) (`bg-parchment`) |
| `--font-display` | `"Playfair Display", Georgia, serif` | Editorial serif heading typeface (`font-display`) |
| `--font-body` | `"Inter", system-ui, sans-serif` | Clean geometric sans-serif body typeface (`font-body`) |

### 3.2 Shadows & Custom Component Classes
In `src/styles/index.css`:
- `--shadow-gold`: `0 0 0 1px rgba(184, 150, 12, 0.25), 0 4px 24px rgba(245, 197, 24, 0.15)`
- `--shadow-gold-lg`: `0 0 0 4px #fff8dc, 0 0 0 5.5px rgba(184, 150, 12, 0.55)`
- `--shadow-card`: `0 2px 16px rgba(26, 20, 0, 0.08)`

Declared utility classes in `@layer components`:
- `.ribbon-border`: Adds rounded-2xl border with a dual-ring gold glow and card shadow.
- `.btn-gold`: Primary rounded gold button with hover elevation and golden drop shadow.
- `.btn-outline`: Pill-shaped bordered button with `border-gold-edge` and hover background.
- `.btn-whatsapp`: Rounded pill button with WhatsApp brand green `#25d366` and hover `#20bc5a`.
- `.eyebrow`: Uppercase tracking header (`font-size: 11px`, `letter-spacing: 0.18em`, `color: var(--color-gold-deep)`).
- `.section-heading`: Playfair Display bold heading scaled with `clamp(1.7rem, 3.5vw, 2.6rem)`.
- `.display-heading`: Playfair Display hero title scaled with `clamp(2.2rem, 5vw, 3.8rem)`.
- `.img-placeholder`: Dashed gold placeholder container for missing images.

---

## 4. In-Depth Analysis of Pages & Scoped Components

### 4.1 Navigation Header (`src/components/sections/HomeNavbar.jsx`)
- **Positioning**: Fixed top bar (`fixed top-0 inset-x-0 z-50 bg-parchment/90 backdrop-blur-md border-b border-gold-edge/25`).
- **Scroll Behavior**: `scrolled` state sets `shadow-card` when `window.scrollY > 20`.
- **Brand Identity**:
  - Logo link to localized home: `<Link to={localizedPath(localeFromPath(pathname))}>`.
  - Icon: `yehidatIcon` (`public/icons/assets_icon_navbar1.png`) in 40x40 container + "Yehidat" brand text.
- **Desktop Navigation Links** (`NAV_KEYS`):
  - `occasions` (`#occasions`) → `t("nav.occasions")`
  - `how` (`#how`) → `t("nav.how")`
  - `packages` (`#packages`) → `t("nav.packages")`
  - `gallery` (`#gallery`) → `t("nav.gallery")`
  - Action button: `t("nav.cta")` ("Plan a Surprise"), targets `#contact`.
- **Anchor Navigation Invariant (`handleAnchor`)**:
  - If current page has the anchor element (`document.querySelector(href)`): scrolls smoothly into view.
  - If user is on a separate page (`/about-us`, `/gallery`, `/team`): navigates to `${homePath}${href}`.
- **Language Switcher (`LanguageSwitcher`)**:
  - Dropdown selector with options `en` ("EN"), `am` ("አማ"), `oro` ("OR").
  - On change: Navigates to `localizedPath(e.target.value, pagePath(pathname))`.
  - The URL is the single source of truth for language!
- **Mobile Menu Drawer**:
  - Hamburger toggle (`Menu` / `X` from `lucide-react`).
  - Animated slide-down via `AnimatePresence` and `motion.div`.
  - Automatically collapses whenever the route changes or an anchor link is selected.

### 4.2 Home Page (`src/pages/Home.jsx`)
Composes 6 sections in linear sequence:
1. `<Hero />`
2. `<Occasions />`
3. `<HowItWorks />`
4. `<Packages />`
5. `<Gallery />`
6. `<Contact />`

**Hash Scroll Invariant (`Home.jsx:15-24`)**:
```javascript
const { hash } = useLocation();
useEffect(() => {
  if (hash) {
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
}, [hash]);
```
This guarantees that deep-linking or navigating from subpages to `#packages`, `#contact`, etc., reliably scrolls into view.

---

### 4.3 Section: Home Hero (`src/components/sections/HomeHero.jsx`)
- **Layout**: 2-column grid (`lg:grid-cols-2`) with `pt-32 pb-20`.
- **Background**: `<SectionBackground name="hero" overlay="light" />`.
- **Left Column (Value Proposition & Trust)**:
  - Header: `t("hero.titleLine1")` + italic serif `t("hero.titleEmphasis")`.
  - Tag pill: `t("hero.tag")` ("Surprise Planning Team" / "Addis Ababa's Surprise Specialists").
  - Subtitle: `t("hero.subtitle")`.
  - Primary CTA: "Plan a Surprise" (`t("hero.ctaPrimary")`), calls `clearSelection()` and scrolls to `#contact`.
  - Secondary CTA: "See how it works" (`t("hero.ctaSecondary")`), scrolls to `#how`.
  - Social Proof / Trust Faces:
    - Displays avatar stack from `TRUST_FACES` in `constants.js` with `+` circle.
    - Statistics: `t("hero.trustCount")` ("200+") + `t("hero.trustLabel")` ("surprises planned this year").
- **Right Column (Hero Image Carousel)**:
  - Displays `HERO_SLIDES` (derived from `HERO_PHOTOS` in `src/data/gallery.js`).
  - Auto-rotates every 3000ms (`ROTATION_INTERVAL`).
  - Pauses on hover (`onMouseEnter`/`onMouseLeave`) or focus.
  - Reduced motion check: disables autoplay if `prefers-reduced-motion` is enabled.
  - Manual navigation: Left/right chevron buttons (`ChevronLeft`, `ChevronRight`) and indicator dots.
  - Floating badge: Cake icon (`Cake`) + `t("hero.badgeLabel")` ("Next surprise in") + `t("hero.badgeValue")` ("2 days").

---

### 4.4 Section: Home Occasions (`src/components/sections/HomeOccasions.jsx`)
- **Purpose**: Showcases the 7 occasions planned by Yehidat.
- **Occasion Data (`src/data/constants.js`)**:
  1. `birthday`: `public/occasions/birthday.png`, icon `Cake`
  2. `anniversary`: `public/occasions/anniversary.png`, icon `Heart`
  3. `graduation`: `public/occasions/graduation.png`, icon `GraduationCap`
  4. `fathersDay`: `public/occasions/fathersDay.png`, icon `Users`
  5. `mothersDay`: `public/occasions/mothersDay.png`, icon `Flower2`
  6. `promotion`: `public/occasions/promotion.png`, icon `Trophy`
  7. `justBecause`: `public/occasions/justBecause.png`, icon `Sparkles`
- **Interactivity Invariant (`handlePick`)**:
  ```javascript
  const handlePick = (occasionId) => {
    setSelectedOccasion(occasionId);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  ```
  Clicking an occasion updates `useAppStore` and immediately scrolls to `#contact`, which auto-populates the occasion dropdown in the form!

---

### 4.5 Section: Home How It Works (`src/components/sections/HomeHowItWorks.jsx`)
- **Structure**: Section `#how` featuring 3 sequential steps (`STEPS = [1, 2, 3]`):
  - Step 1: `how.step1Title` ("You tell us") / `how.step1Body`
  - Step 2: `how.step2Title` ("We prepare everything") / `how.step2Body`
  - Step 3: `how.step3Title` ("They're surprised") / `how.step3Body`
- **Visuals**:
  - Horizontal connector line on `md` screens (`linear-gradient(90deg, #B8960C, rgba(184,150,12,0.25), #B8960C)`).
  - Number circles: `w-14 h-14 bg-gold font-display text-xl font-bold text-ink` with decorative double ring box-shadow (`0 0 0 6px #FFF8DC, 0 0 0 7.5px rgba(184,150,12,0.55)`).

---

### 4.6 Section: Home Packages (`src/components/sections/HomePackages.jsx`)
- **Package Data (`src/data/constants.js`)**:
  - `basic`:
    - Price: 3,999 ETB (original: 4,500 ETB, discount: 11%, deposit: 2,000 ETB)
    - Featured: `false`
    - Items: 1 Kg Cake, Flowers, Post Card with your message, Fire works, Spray, Video Recording
  - `standard`:
    - Price: 5,999 ETB (original: 7,000 ETB, discount: 15%, deposit: 2,500 ETB)
    - Featured: `true` (Most Popular)
    - Items: Everything in Basic, 1 Kg Cake, Flowers, Post Card with your message, Shape or letter balloons, Fire works, Spray, Video Recording
  - `premium`:
    - Price: 9,999 ETB (original: 12,000 ETB, discount: 17%, deposit: 4,500 ETB)
    - Featured: `false`
    - Items: Everything in Standard, 1 Kg Cake, Flowers in a box, Post Card with your message, Shape or letter balloons, Fire works, Spray, Video Recording
- **Card Styling & Badges**:
  - Featured card: Inverted background (`bg-ink text-parchment border border-gold-edge/55`).
  - "Most Popular" top pill badge (`t("packages.mostPopular")`).
  - Animated discount badge: Red pill with pinging white dot (`t("packages.discountOff", { percent })`).
- **Interactivity Invariant (`handleSelect`)**:
  ```javascript
  const handleSelect = () => {
    setSelectedPackageId(pkg.id);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  ```
  Clicking "Get started" records the selected package in the Zustand store and scrolls to `#contact`.

---

### 4.7 Section: Home Gallery Preview (`src/components/sections/HomeGallery.jsx`)
- **Featured Items**: First 6 items from `GALLERY_PHOTOS` in `src/data/gallery.js`.
- **Layout**: 2-column mobile / 3-column desktop grid with aspect-[4/5] photos.
- **Hover Micro-interaction**: `group-hover:scale-105` image zoom, gradient overlay fading in with `item.alt`.
- **Action**: "View Full Gallery" (`t("gallery.viewAll")`) linking to `localizedPath(locale, "/gallery")`.

---

### 4.8 Section: Home Contact (`src/components/sections/HomeContact.jsx`)
- **Layout**: 2 columns (Direct contact channels on the left, interactive form card on the right).
- **Direct Channels**:
  - WhatsApp: `https://wa.me/251968034000`
  - Direct Phone: `tel:+251968034000` (`+251 96 80 34 000`)
  - Working Hours: `t("contact.hoursValue")` ("Mon–Sun, 9am–5pm")
- **Form State**:
  - `name`: Text, required
  - `phone`: Tel, required
  - `occasion`: Select dropdown (auto-selected if `selectedOccasion` is in Zustand store)
  - `date`: Date picker (approx. surprise date)
  - `message`: Textarea (custom instructions)
- **Zustand Auto-fill Invariant**:
  ```javascript
  useEffect(() => {
    if (selectedOccasion) {
      setForm((f) => ({ ...f, occasion: t(`occasions.${selectedOccasion}`) }));
    }
  }, [selectedOccasion, t]);
  ```
- **Submission & Mailto Flow (`submitCallback`)**:
  - Triggered via TanStack `useMutation`.
  - Introduces a 1400ms delay for feedback (`setTimeout`).
  - Constructs URL-encoded `subject`:
    `Surprise Request: ${payload.occasion || "Celebration"} - ${payload.name}`
  - Constructs URL-encoded `body`:
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
  - Dispatches `window.location.href = mailto:diboramarema@gmail.com?subject=...&body=...`.
- **Pending & Success States**:
  - Pending: Button disabled, animated `Loader2` spinner, bouncing `Mail` banner (`t("contact.navigatingEmail")`).
  - Success: `AnimatePresence` switches to success view with `CheckCircle2`, `t("contact.successTitle")`, `t("contact.successBody")`, `t("contact.emailOpenedNote")`, a WhatsApp confirmation button pre-filled with the inquiry, and a "Submit another" reset button.

---

### 4.9 Dedicated Page: Gallery (`src/pages/Gallery.jsx`)
- **Route**: `/gallery/`, `/am/gallery/`, `/om/gallery/`.
- **Breadcrumbs**: Home → Gallery.
- **Category Filtering**:
  - Buttons: `all` ("All Moments"), `surprises` ("Surprises"), `cakes` ("Cakes & Details"), `outdoor` ("Outdoor Setups").
  - Filtering logic (`getCategory` in `src/data/gallery.js`): Matches substrings "cake" or "outdoor", else defaults to "surprises".
- **Lightbox Functionality**:
  - Clicking any grid card sets `lightboxIndex(index)`.
  - Fullscreen overlay with backdrop blur (`bg-ink/90 backdrop-blur-md`).
  - Navigation controls: Previous button, Next button, Close button (`X`).
  - Keyboard handlers:
    - `Escape`: closes lightbox
    - `ArrowLeft`: previous photo (wraps around)
    - `ArrowRight`: next photo (wraps around)
  - Caption: Displays photo `alt` and index counter (e.g. `1 / 15`).
- **Footer CTA Banner**:
  - Prompt: `t("gallery.ctaTitle")` + `t("hero.subtitle")`.
  - Button: Links to `${homeHref}#contact`.

---

### 4.10 Dedicated Page: About Us (`src/pages/AboutUs.jsx`)
- **Route**: `/about-us/`, `/am/about-us/`, `/om/about-us/`.
- **Hero Section**:
  - Min-height 70vh with dark overlay gradients.
  - Team image background loaded from `src/data/about.json` (or brand gradient fallback).
  - Editorial headline: `t("about.title")` ("The team behind every surprise") in `font-display text-5xl sm:text-7xl lg:text-8xl`.
- **Sections**:
  - Intro text: `t("about.intro")`.
  - "How we work": 3-step numbered cards reusing `how.step1Title`, `how.step2Title`, etc.
  - CTA section: `t("about.ctaTitle")` with button linking to `${contactHref}` (`${localizedPath(locale)}#contact`).

---

### 4.11 Dedicated Page: Team (`src/pages/Team.jsx`)
- **Route**: `/team/`, `/am/team/`, `/om/team/`.
- **Breadcrumbs**: Home → Meet the Team.
- **Story Card**: Ribbon-border container with `t("team.storyTitle")` ("Crafting Joy, One Moment at a Time") and `t("team.storyText")`.
- **Team Showcase Grid**:
  - 4 photos from `TEAM_MEMBERS` (`src/data/team.json`): `IMG_6508`, `IMG_6509`, `IMG_6512`, `IMG_6515`.
  - Multi-resolution AVIF and WebP images.
  - Photo titles: `team.photo1` through `team.photo4` with "Yehidat Team" subtitle.
- **Core Values (3 Cards)**:
  1. `team.val1Title` ("100% Secret & Discreet") with `ShieldCheck` icon.
  2. `team.val2Title` ("Curated Quality") with `Sparkles` icon.
  3. `team.val3Title` ("Punctual Delivery") with `Clock` icon.
- **CTA Banner**:
  - `t("team.ctaTitle")` with button linking to `${contactHref}` (`${homeHref}#contact`).

---

### 4.12 Footer (`src/components/sections/HomeFooter.jsx`)
- **Background**: `bg-ink-muted text-shadow-gold-deep` with `<SectionBackground name="footer" overlay="light" />`.
- **Column 1: Brand & Socials**:
  - Brand name "Yehidat" and description `t("footer.brandDesc")`.
  - Social media icon buttons (Instagram, TikTok, Telegram) linking to constants in `src/data/constants.js`.
- **Column 2: Quick Links (`QUICK_LINK_KEYS`)**:
  - `occasions` (`#occasions`)
  - `how` (`#how`)
  - `packages` (`#packages`)
  - `gallery` (`#gallery`)
  - `about` (`/about-us` -> localized)
  - `team` (`/team` -> localized)
- **Column 3: Direct Contact Information**:
  - WhatsApp link (`https://wa.me/251968034000`)
  - Phone link (`tel:+251968034000`)
  - Email link (`mailto:diboramarema@gmail.com`)
  - Physical location: `CONTACT.LOCATION` ("Dukem/Bishoftu, Ethiopia · Serving Dukem and Bishoftu areas")
- **Bottom Bar**: Copyright line with dynamic current year + `t("footer.rights")`.

---

## 5. State Management & Interactivity Invariants

### 5.1 Zustand Store Architecture (`src/store/useAppStore.js`)
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
**Invariants to Preserve**:
1. When user selects an occasion card in `HomeOccasions`, `setSelectedOccasion(occasionId)` is executed.
2. In `HomeContact`, `selectedOccasion` automatically populates the form dropdown.
3. When user clicks "Get started" on a package card in `HomePackages`, `setSelectedPackageId(pkg.id)` is executed.
4. When user clicks "Plan a Surprise" in Hero, `clearSelection()` is executed so the contact form opens empty.
5. When user resets the form via "Submit another", `clearSelection()` is executed.

---

### 5.2 Contact Form & Mailto Invariant
- **Target Recipient**: `diboramarema@gmail.com` (from `CONTACT.EMAIL`).
- **Subject**: `Surprise Request: ${payload.occasion || "Celebration"} - ${payload.name}`.
- **Body**: Structured multiline plaintext containing Name, Phone, Occasion, Date, Message, and footer attribution.
- **Transport**: `window.location.href = mailto:...`.
- **Fallback / Secondary Action**: Pre-filled WhatsApp link on the success card (`wa.me/251968034000?text=...`).

---

### 5.3 Internationalization (i18n) & Routing

#### Locale Configuration
- **Supported Locales**:
  - `en` (English): Default locale, URL prefix `""` (e.g. `/`, `/gallery/`, `/about-us/`, `/team/`).
  - `am` (Amharic): URL prefix `"/am"` (e.g. `/am/`, `/am/gallery/`, `/am/about-us/`, `/am/team/`).
  - `oro` (Afaan Oromo): Internal resource key `"oro"`, but **URL prefix is `"/om"`** and `htmlLang` is `"om"`.
- **URL as Single Source of Truth**:
  - `localeFromPath(pathname)` detects language from the first URL segment.
  - Browser language auto-detection is deliberately disabled to ensure deterministic rendering and clean SSR prerendering.
  - Navigating or switching language updates the browser URL via `localizedPath(newLocale, pagePath(pathname))`.
- **Locale Route Wrapper (`src/components/LocaleRoute.jsx`)**:
  - Syncs `i18n.language` and `document.documentElement.lang`.
  - Injects dynamic `<Seo locale={locale} page={page} />`.

#### Prerendering Pipeline (`scripts/prerender.mjs`)
- Runs automatically after `vite build` and `vite build --ssr`.
- Generates 12 static HTML files:
  - `/` → `dist/index.html` (en)
  - `/am/` → `dist/am/index.html` (am)
  - `/om/` → `dist/om/index.html` (oro)
  - `/about-us/` → `dist/about-us/index.html` (en)
  - `/am/about-us/` → `dist/am/about-us/index.html` (am)
  - `/om/about-us/` → `dist/om/about-us/index.html` (oro)
  - `/gallery/` → `dist/gallery/index.html` (en)
  - `/am/gallery/` → `dist/am/gallery/index.html` (am)
  - `/om/gallery/` → `dist/om/gallery/index.html` (oro)
  - `/team/` → `dist/team/index.html` (en)
  - `/am/team/` → `dist/am/team/index.html` (am)
  - `/om/team/` → `dist/om/team/index.html` (oro)
- Copies `dist/index.html` to `dist/404.html` for GitHub Pages fallback.
- Injects full SEO metadata (canonical, hreflang alternates for `en`, `am`, `om`, `x-default`, Open Graph, Twitter cards).

---

## 6. Build & Quality Verifications

During our survey, we executed the project's build and verification tools:

1. **`pnpm build`**:
   - Exit code: `0` (Success)
   - Prerendered all 12 routes cleanly with matching locale tags.
   - Generated `dist/404.html` and cleaned up `dist-ssr/`.
2. **Linter Check (`npx oxlint`)**:
   - Analyzed all 33 codebase files.
   - Result: `0 warnings and 0 errors`.
   - *Note on ESLint*: Running `pnpm lint` failed due to an upstream compatibility issue between ESLint v10 and `eslint-plugin-react@7.37.5` (`contextOrFilename.getFilename is not a function`). `oxlint` runs cleanly with 0 defects.

---

## 7. Key Findings & Guidelines for Redesign Team

1. **Brand Hex & Font Constancy**:
   Never alter `--color-gold`, `--color-gold-deep`, `--color-gold-edge`, `--color-gold-pale`, `--color-gold-cream`, `--color-ink`, or `--color-parchment`. Never change `Playfair Display` or `Inter`.
2. **Preserve Interactivity Invariants**:
   - Occasion click → `setSelectedOccasion` → scroll to `#contact` → auto-fills form occasion.
   - Package card click → `setSelectedPackageId` → scroll to `#contact`.
   - Contact submit → mailto trigger + visual delay + WhatsApp backup link.
   - Lightbox on `/gallery/` → keyboard navigation (Esc, Left, Right) + modal image viewer.
   - Language selector → updates route prefix (`/`, `/am/`, `/om/`) without breaking deep-linked subpages.
3. **i18n Translation Integrity**:
   - Any new or modified copy in `src/i18n/locales/en.json` must be reflected in `am.json` and `oro.json`.
   - Notice that Afaan Oromo uses resource key `"oro"` with route segment `"/om/"`.
4. **Build & Prerender Invariant**:
   - Any newly added page or route structure must maintain 100% prerendering compatibility in `scripts/prerender.mjs` and `src/entry-server.jsx`.
   - `pnpm build` must exit 0.
