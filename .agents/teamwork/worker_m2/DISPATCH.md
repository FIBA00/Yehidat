## 2026-10-24T08:24:40Z

You are Worker 2 (teamwork_preview_worker).
Your identity:
- Archetype: teamwork_preview_worker
- Role: Navigation & Footer Redesign Worker
- Working directory: /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/.agents/teamwork/worker_m2
- Project root: /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat
- Caller / Parent conversation ID: 86025b17-4b19-4b7e-9de3-8f074e784432

MANDATORY FIRST STEP: Read the user request at:
/home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/.agents/teamwork/ORIGINAL_REQUEST.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your inputs:
- Master Specifications: /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/PROJECT.md
- Competitor Research: /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/DESIGN_RESEARCH.md
- Current components:
  - /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/src/components/sections/HomeNavbar.jsx
  - /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/src/components/sections/HomeFooter.jsx
  - /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/src/i18n/routes.js
  - /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/src/i18n/locales/*.json

Your exclusive write ownership:
- /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/src/components/sections/HomeNavbar.jsx
- /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/src/components/sections/HomeFooter.jsx
- /home/fraold/Develop_and_Code/StandardProjects/websites/Yehidat/Yehidat/src/i18n/locales/en.json (and am.json, oro.json if adding new footer/nav strings)
- Your working directory files: .agents/teamwork/worker_m2/handoff.md, progress.md

Your mission:
Redesign HomeNavbar.jsx and HomeFooter.jsx to elevate Yehidat's luxury surprise planning presence using patterns from DESIGN_RESEARCH.md:
1. Strict Brand Constraints:
   - Preserve all brand color tokens (--color-gold: #f5c518, --color-gold-deep: #b8960c, --color-gold-edge: #d4a017, --color-gold-pale: #0f0f13, --color-gold-cream: #17181d, --color-ink: #ffffff, --color-parchment: #241f14).
   - Preserve typography: Playfair Display for headings/brand, Inter for body/navigation.
2. Invariants to preserve:
   - In-page smooth scrolling to anchor tags (#occasions, #how, #packages, #gallery, #contact) when on home route.
   - Dual-mode routing: cross-page navigation to ${homePath}${href} when on subpages (/gallery/, /about-us/, /team/).
   - Language switcher supporting en, am, and oro/om with localizedPath() and proper URL synchronization.
   - Mobile navigation drawer with smooth toggle and proper backdrop click/accessibility.
3. Competitor-informed Redesign Enhancements:
   - HomeNavbar:
     - Refined luxury sticky bar with backdrop blur (backdrop-blur-md bg-gold-pale/85), subtle gold border (border-b border-gold-edge/20).
     - Discretion trust pill or subtle top notification badge ("100% Secret & Discreet Delivery • Dukem, Bishoftu & Surrounds").
     - Sleek language selector pill.
     - Quick "Contact Concierge" / WhatsApp button.
     - Include competitor reference comments (e.g., // [Competitor Pattern: Bloom & Wild / PartySlate Sticky Luxury Header]).
   - HomeFooter:
     - Modern 4-column luxury layout: Brand story with Playfair logo, Occasions & Services links, Company & Subpage navigation, Concierge & Direct Contact (Phone, WhatsApp, Email, operating hours).
     - Trust Pillars ribbon (100% Discretion Guarantee, Fresh Cake Guarantee, Punctual Arrival, Custom Calligraphy).
     - Bottom bar with copyright and locale navigation.
     - Include competitor reference comments (e.g., // [Competitor Pattern: PartySlate / Virgin Experience Gifts Luxury Footer]).
4. Verification:
   - Run `pnpm build` — must pass with code 0 and all 12 prerendered routes cleanly generated.
   - Run `npx oxlint` — must pass with 0 errors/warnings and no duplicate/unused imports.
5. Record handoff.md in your working directory and notify the orchestrator when done.
