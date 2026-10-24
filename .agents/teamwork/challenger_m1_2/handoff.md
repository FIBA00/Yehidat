# Adversarial Verification & Challenge Report (Milestone M1)

**Agent**: Challenger 2 (`teamwork_preview_challenger`)  
**Role**: M1 Adversarial Challenger (critic, specialist)  
**Target Milestone**: M1 (Research Synthesis & Project Specifications)  
**Target Artifacts**: `PROJECT.md`, `DESIGN_RESEARCH.md`, `src/store/useAppStore.js`, `scripts/prerender.mjs`, `src/i18n/routes.js`, `src/components/sections/HomeContact.jsx`  
**Verdict**: **APPROVE** (with adversarial recommendations for M3 and M5)

---

## 1. Observation

Direct empirical evidence obtained through code inspection, automated script execution, build execution, and stress testing:

1. **Zustand Store (`src/store/useAppStore.js`)**:
   - The store defines `selectedOccasion` (default `null`), `setSelectedOccasion`, `selectedPackageId` (default `null`), `setSelectedPackageId`, and `clearSelection` (`src/store/useAppStore.js:17-26`).
   - `PROJECT.md` Section 5.1 documents this exact code signature verbatim.
   - `HomeOccasions.jsx:30-35` correctly calls `setSelectedOccasion(occasionId)`.
   - `HomePackages.jsx:10-15` correctly calls `setSelectedPackageId(pkg.id)`.
   - `HomeHero.jsx:24,93-96` correctly calls `clearSelection()`.
   - `HomeContact.jsx:67-84,97-101` correctly calls `clearSelection()` and observes `selectedOccasion`.
   - **Contract Disconnect**: `HomeContact.jsx` does *not* read or handle `selectedPackageId`. When a user clicks "Get started" on a package card, `selectedPackageId` is set in the Zustand store, but `HomeContact.jsx` has neither a package input nor logic to populate the message body with the package name.

2. **Routing & 12 Prerendered Routes (`scripts/prerender.mjs`, `src/i18n/routes.js`, `src/App.jsx`)**:
   - `scripts/prerender.mjs:10-23` lists all 12 routes: `/`, `/am/`, `/om/`, `/about-us/`, `/am/about-us/`, `/om/about-us/`, `/gallery/`, `/am/gallery/`, `/om/gallery/`, `/team/`, `/am/team/`, `/om/team/`.
   - All 12 routes tested against `localeFromPath()`, `pagePath()`, and `localizedPath()`. Every route satisfies bidirectional mapping: `localizedPath(localeFromPath(r), pagePath(r)) === r`.
   - React Router v7 `matchRoutes()` matches both trailing slash (`/about-us/`) and non-trailing slash (`/about-us`) variants to their respective components.
   - `scripts/prerender.mjs` successfully generates all 12 static HTML files plus `dist/404.html`.
   - Inspection of output HTML files confirmed correct `<html lang="...">` (`en`, `am`, `om`), canonical links, and hreflang alternate links.
   - **Anomalies in `index.html`**:
     - `index.html:39-41` specifies favicon paths as `href="public/icons/assets_icon_navbar1.png"`, which breaks in production because Vite serves `public/` assets from root (`/icons/...`).
     - `index.html:45-71` JSON-LD schema hardcodes `"email": "hawig74@gmail.com"` and package prices (`4000`, `6000`, `10000`), conflicting with `src/data/constants.js` (`diboramarema@gmail.com` and `3999`, `5999`, `9999`).

3. **Mailto Submission Contract (`src/components/sections/HomeContact.jsx`)**:
   - `submitCallback` implements the mailto contract: recipient `diboramarema@gmail.com` (from `CONTACT.EMAIL`), subject formatting `Surprise Request: ${payload.occasion || "Celebration"} - ${payload.name}`, and body formatting containing Name, Phone, Occasion, Date, Message (`HomeContact.jsx:18-39`).
   - Guarded against SSR (`if (typeof window !== "undefined")`).
   - Uses TanStack `useMutation` with a 1400ms delay for visual transition.
   - Success view renders celebratory confirmation with direct WhatsApp link: `https://wa.me/251968034000?text=...` and reset button calling `clearSelection()`.
   - Stress-tested with Ge'ez/Amharic characters (`ልደት`, `አመታዊ በዓል`), Afaan Oromo strings, special URI characters (`&`, `=`, `?`, `#`), and multiline strings: all correctly percent-encoded.
   - **Contract Disconnect**: `<textarea name="message">` has no `maxLength` constraint. A payload exceeding ~1500 characters produces a mailto URI exceeding 2048 characters, which risks truncation in standard OS mail handlers.

4. **Build and Verification Commands**:
   - `pnpm build` (`vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr && node scripts/prerender.mjs`): Exited with code 0.
   - Output inspection: 12 static HTML routes + `dist/404.html` verified in `dist/`.
   - `npx oxlint`: Exited with code 0 (0 warnings, 0 errors across 33 files).
   - Note: `pnpm lint` (`eslint .`) fails with code 2 due to upstream ESLint 10 vs `eslint-plugin-react@7.37.5` incompatibility (`contextOrFilename.getFilename is not a function`).

---

## 2. Logic Chain

1. **Zustand Contract Assessment**:
   - `PROJECT.md` Section 5.1 specifies the store contract accurately based on `src/store/useAppStore.js`.
   - However, in `PROJECT.md` Section 5.2, `payload` in the mailto contract omits `packageId` or `package`.
   - When a user clicks "Get started" in `HomePackages.jsx`, `selectedPackageId` is set, but neither the form nor the mailto dispatch uses this state.
   - `DESIGN_RESEARCH.md` line 363 states that the contact form will have "auto-filled occasion and package".
   - *Inference*: In Milestone M3 (Home Page Redesign), `HomeContact.jsx` should be updated to observe `selectedPackageId` and either add a package dropdown or append `Package: [selectedPackageId]` to the form message body, fulfilling the promise made in `DESIGN_RESEARCH.md`.

2. **Routing & Prerendering Contract Assessment**:
   - All 12 localized routes specified in `PROJECT.md` Section 5.5 and `scripts/prerender.mjs` map cleanly to the 3 supported languages (`en`, `am`, `oro` $\rightarrow$ `/om/`) and 4 page routes (`/`, `/about-us/`, `/gallery/`, `/team/`).
   - Prerendered HTML outputs verified on disk with valid SEO tags, OpenGraph tags, canonical links, and hreflang alternates.
   - The favicon path in `index.html` (`public/icons/...`) is a pre-existing asset path bug in the HTML template that should be corrected during M5 verification.

3. **Mailto Contract Assessment**:
   - The mailto flow functions reliably as a static-site form submission mechanism without requiring backend server infrastructure.
   - The dual-channel fallback to WhatsApp (`wa.me/251968034000`) on form completion provides essential resilience against unconfigured desktop/mobile mail clients.
   - Adding `maxLength={500}` to the message textarea in M3 will prevent mailto URL length overflow.

4. **Milestone M1 Acceptance Assessment**:
   - M1 deliverables (`DESIGN_RESEARCH.md` and `PROJECT.md`) fulfill all requirements (R1 and R2).
   - The specifications are comprehensive, technically rigorous, and accurately capture existing codebase defects (stark white card, `#FFF8DC` shadows, lack of FAQ) to be addressed in subsequent milestones.
   - `pnpm build` cleanly exits 0.

---

## 3. Caveats

1. **Review-Only Constraint**: In accordance with the system instructions, no source code or templates outside of `.agents/teamwork/challenger_m1_2/` were modified.
2. **ESLint 10 Plugin Bug**: `pnpm lint` failure is an upstream compatibility issue between ESLint v10 and `eslint-plugin-react`. Code quality verification was conducted using `npx oxlint`, which completed with 0 errors and 0 warnings.
3. **Mail Client Behavior**: Actual opening of a desktop/mobile email client depends on OS protocol handler registration and cannot be executed headless in a Linux terminal environment; however, URL structure, encoding, and parameters were empirically validated.

---

## 4. Conclusion

**Verdict**: **APPROVE**

Milestone M1 research and specification documents (`PROJECT.md` and `DESIGN_RESEARCH.md`) provide an authoritative, technically sound, and empirically verified architectural foundation. All 12 prerendered routes, Zustand store contracts, and mailto interfaces are verified. The project builds cleanly with exit code 0.

### Recommended Action Items for Downstream Milestones:
- **Milestone M3**: Update `HomeContact.jsx` to consume `selectedPackageId` from `useAppStore` (so package selections are reflected in the mailto payload and form), and add `maxLength` to inputs.
- **Milestone M5**: Correct `href="public/icons/..."` in `index.html` to `href="/icons/..."`, reconcile JSON-LD schema values with `src/data/constants.js`, and resolve the ESLint 10 plugin issue.

---

## 5. Verification Method

To independently reproduce the empirical findings in this report, run the following commands from the repository root:

1. **Verify Build & All 12 Prerendered Routes**:
   ```bash
   pnpm build
   ```
   *Expected*: Exit code 0, 12 localized routes + `dist/404.html` written to `dist/`.

2. **Verify Static HTML Files Integrity**:
   ```bash
   node -e '
   import("node:fs/promises").then(async ({ readFile }) => {
     const routes = ["index.html", "am/index.html", "om/index.html", "about-us/index.html", "am/about-us/index.html", "om/about-us/index.html", "gallery/index.html", "am/gallery/index.html", "om/gallery/index.html", "team/index.html", "am/team/index.html", "om/team/index.html", "404.html"];
     for (const r of routes) {
       const content = await readFile("dist/" + r, "utf8");
       console.log(r.padEnd(25), "bytes:", content.length, "validRoot:", content.includes("<div id=\"root\">"));
     }
   });'
   ```

3. **Verify Linter Cleanliness**:
   ```bash
   npx oxlint
   ```
   *Expected*: 0 errors, 0 warnings.

4. **Verify Routing Bidirectional Mapping**:
   ```bash
   node -e '
   import("./src/i18n/routes.js").then((r) => {
     const routes = ["/", "/am/", "/om/", "/about-us/", "/am/about-us/", "/om/about-us/", "/gallery/", "/am/gallery/", "/om/gallery/", "/team/", "/am/team/", "/om/team/"];
     const ok = routes.every(route => r.localizedPath(r.localeFromPath(route), r.pagePath(route)) === route);
     console.log("All 12 routes bidirectional roundtrip:", ok);
   });'
   ```
