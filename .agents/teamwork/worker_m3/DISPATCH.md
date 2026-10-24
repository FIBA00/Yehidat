## 2026-10-24T09:20:29Z
You are Worker 3 (teamwork_preview_worker).
Your identity:
- Archetype: teamwork_preview_worker
- Role: Home Page UX Redesign Worker
- Working directory: /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/.agents/teamwork/worker_m3
- Project root: /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat
- Caller / Parent conversation ID: 86025b17-4b19-4b7e-9de3-8f074e784432

MANDATORY FIRST STEP: Read the user request at:
/home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/.agents/teamwork/ORIGINAL_REQUEST.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your inputs:
- Master Project Specification: /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/PROJECT.md
- Competitor Research: /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/DESIGN_RESEARCH.md
- Scoped source files:
  - src/pages/Home.jsx
  - src/components/sections/HomeHero.jsx
  - src/components/sections/HomeOccasions.jsx
  - src/components/sections/HomeHowItWorks.jsx
  - src/components/sections/HomePackages.jsx
  - src/components/sections/HomeGallery.jsx
  - src/components/sections/HomeContact.jsx
  - src/i18n/locales/{en.json, am.json, oro.json}

Your exclusive write ownership:
- src/pages/Home.jsx
- src/components/sections/HomeHero.jsx
- src/components/sections/HomeOccasions.jsx
- src/components/sections/HomeHowItWorks.jsx
- src/components/sections/HomePackages.jsx
- src/components/sections/HomeGallery.jsx
- src/components/sections/HomeContact.jsx
- Any auxiliary Home section (e.g. src/components/sections/HomeFAQ.jsx)
- src/i18n/locales/{en.json, am.json, oro.json} (sync all new strings)
- .agents/teamwork/worker_m3/handoff.md, progress.md

Your mission:
Execute the full UX redesign of Home.jsx and all its sections based on DESIGN_RESEARCH.md:
1. Strict Brand Constraints:
   - Preserve all brand color tokens (--color-gold: #f5c518, --color-gold-deep: #b8960c, --color-gold-edge: #d4a017, --color-gold-pale: #0f0f13, --color-gold-cream: #17181d, --color-ink: #ffffff, --color-parchment: #241f14).
   - Preserve typography: Playfair Display for headers/brand, Inter for body/controls.
2. Invariants to preserve:
   - Zustand store actions (setSelectedOccasion, setSelectedPackageId, clearSelection).
   - HomeOccasions selection scrolls to #contact and sets selectedOccasion in store.
   - HomePackages selection scrolls to #contact and sets selectedPackageId in store.
   - HomeContact pre-fills occasion from store; also incorporate selectedPackageId if present; mailto mutation flow with 1400ms delay and WhatsApp fallback must be preserved.
   - Trilingual i18n support across en, am, and oro/om.
3. Critical Bug Fixes & Competitor Upgrades:
   - HomePackages:
     - FIX the inverted white featured card bug (`bg-ink text-parchment`). Replace with unified luxury dark card (`bg-gold-pale` / `bg-gold-cream` with glowing gold edge border and subtle shadow).
     - FIX centered bullet items (`place-items-center`). Left-align inclusions with structured categories (Cake, Flowers, Atmosphere, Memories) and checkmark icons.
     - Replace the flashing red discount badge with an elegant gold badge.
     - Add competitor reference comments (// [Competitor Pattern: Tinggly / BoxFox Tiered Package Architecture]).
   - HomeHowItWorks:
     - FIX hardcoded #FFF8DC shadow in box-shadow.
     - Elevate 3-step surprise choreography with gold progression line and emotional copy.
     - Add competitor reference comments (// [Competitor Pattern: Bloom & Wild / BoxFox 3-Step Choreography]).
   - HomeContact:
     - FIX hardcoded #FFF8DC shadows in inputs.
     - Luxury concierge booking form with discretion guarantee notice.
     - Add competitor reference comments (// [Competitor Pattern: PartySlate Concierge Inquiry Flow]).
   - HomeHero:
     - High-impact emotional headline, dual CTAs ("Explore Experiences" -> #occasions, "Plan a Surprise" -> #contact), discretion guarantee pill, and social proof rating.
     - Preserve carousel with reduced motion support.
     - Add competitor reference comments (// [Competitor Pattern: Bloom & Wild / Virgin Experience Gifts Emotional Hero]).
   - HomeOccasions:
     - Luxury card grid with hover lift micro-interactions, category badges, smooth scroll to #contact on click.
     - Add competitor reference comments (// [Competitor Pattern: Virgin Experience Gifts Curated Category Grid]).
   - HomeGallery:
     - Editorial preview grid with hover overlays, photo captions, and CTA link to full /gallery/.
     - Add competitor reference comments (// [Competitor Pattern: PartySlate Editorial Showcase]).
   - HomeFAQ (New module):
     - Add elegant collapsible FAQ accordion answering key user questions (secrecy guarantee, delivery areas Bishoftu/Dukem, customization, payment).
     - Add competitor reference comments (// [Competitor Pattern: The Knot Objection-Handling FAQ Accordion]).
4. Verification:
   - Run `pnpm build` — must pass with code 0 and all 12 prerendered routes intact.
   - Run `npx oxlint` — must pass with 0 warnings/errors.
5. Record handoff.md in your working directory and notify the orchestrator when done.
