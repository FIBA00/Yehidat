# SEO and Static Pre-rendering Guide

This guide explains how Yehidat's search and link-preview setup works, why it's
built this way, and how to maintain it. It covers the React app specifically,
because a React single-page app needs extra work to be found by search engines
and AI tools.

---

## 1. The problem

A normal React app ships an almost empty HTML file:

```html
<body>
  <div id="root"></div>
  <script type="module" src="/assets/index-xyz.js"></script>
</body>
```

All the text, prices, and headings are created by JavaScript after the page loads.
That causes three problems:

1. **Crawlers that don't run JavaScript see nothing.** Many AI crawlers (GPTBot,
   ClaudeBot, PerplexityBot) fetch the raw HTML and don't run scripts. They read an
   empty `<div>`.
2. **Google runs JavaScript, but later.** Google renders pages in a second pass, so
   new or updated content can take much longer to appear in search.
3. **Link previews have no content.** WhatsApp, Telegram, and Facebook read only the
   raw HTML. They see the same empty page with the same generic title for every
   URL.

Search and link previews both depend on the HTML the server sends, before any
JavaScript runs. The fix is to make the build produce real HTML for each page.

---

## 2. Concepts

| Term | Meaning |
| ---- | ------- |
| **SPA** (single-page app) | A site where the browser builds every page with JavaScript. Fast after the first load, but the first HTML is empty. |
| **Pre-rendering** | Running the app at build time, then saving the HTML it produces as static files. |
| **SSR** (server-side rendering) | Like pre-rendering, but done on each request. Not used here, because the site is static. |
| **Hydration** | When the browser attaches React to HTML that already exists, instead of building it again. |
| **Title / meta description** | The page title and summary shown in search results. |
| **Canonical URL** | `<link rel="canonical">`. The address search engines should treat as the main version of a page. |
| **Open Graph (`og:`) tags** | Title, description, and image that link previews use (WhatsApp, Telegram, Facebook, LinkedIn). |
| **Twitter card (`twitter:`) tags** | Same idea for X (Twitter). |
| **`hreflang`** | Tells search engines which language version of a page to show to which users. |
| **JSON-LD** | Structured data in a `<script type="application/ld+json">` block. Describes the business (name, phone, prices) in a form search engines can read. |
| **`robots.txt`** | Tells crawlers which paths they may visit. |
| **`sitemap.xml`** | Lists the URLs you want indexed, and their language alternates. |

---

## 3. How Yehidat's setup works

### 3.1 The build pipeline

`pnpm run build` runs three steps, defined in `package.json`:

```
vite build
  -> builds the browser app into dist/

vite build --ssr src/entry-server.jsx --outDir dist-ssr
  -> builds a server bundle that can render the app to HTML

node scripts/prerender.mjs
  -> renders each page in ROUTES to static HTML files in dist/
  -> writes dist/404.html
  -> deletes dist-ssr/
```

Output:

```
dist/index.html          English homepage (/)
dist/am/index.html       Amharic homepage (/am/)
dist/om/index.html       Afaan Oromo homepage (/om/)
dist/404.html            English fallback for unknown paths on GitHub Pages
dist/assets/...          JavaScript and CSS (hashed filenames)
```

### 3.2 The files and what each one does

| File | Role |
| ---- | ---- |
| `src/entry-server.jsx` | Renders the app for one URL. Sets the language from the URL first. Exports `render(url)` and `headTags`. |
| `src/seo/headTags.js` | Generates the `<head>` tags for one language: title, description, canonical, Open Graph, Twitter, image, and `hreflang`. |
| `scripts/prerender.mjs` | Loops over `ROUTES`, renders each page, and writes the HTML files. Removes old SEO tags from the template before inserting the new ones. |
| `src/main.jsx` | Reads the language from the URL, then hydrates the prerendered HTML instead of replacing it. |
| `src/components/LocaleRoute.jsx` | Wraps each page with its language. Sets `<html lang>` and renders `Seo`. |
| `src/components/ui/Seo.jsx` | Keeps the `<head>` in sync when the user switches language in the browser. Updates existing tags in place, so no duplicates appear. |
| `src/i18n/routes.js` | Maps URLs to languages (`/` → en, `/am/` → am, `/om/` → oro) and builds the URL for each page. |
| `src/i18n/index.js` | Initializes translations. Browser-language detection is off, so the URL decides the language. |
| `index.html` | The template. Its `<head>` holds the static fallback tags and the JSON-LD block. |
| `public/robots.txt` | Allows all crawlers, including AI training bots, and points to the sitemap. |
| `public/sitemap.xml` | Lists the three URLs with their `hreflang` alternates. |
| `public/images/socials/` | Social images. Generated from the master banner by `scripts/make-social-images.py`. |
| `scripts/make-social-images.py` | Generates the 1200×630, 1080×1080, and 1080×1920 social images from the master banner. |

### 3.3 Why the language comes from the URL

Search engines find a language version by its URL. If Amharic and English share
the same URL and only the browser's language changes, search engines can't tell
them apart. So:

- `/` is English.
- `/am/` is Amharic.
- `/om/` is Afaan Oromo.

The Oromo URL uses `om`, the standard code for `hreflang`. Internally, the
translation file is still named `oro`. Those two names are mapped in
`src/i18n/routes.js`.

The browser language is never used to pick a language. That keeps every URL
consistent for search engines.

### 3.4 What is in the head of each page

Each prerendered page gets one copy of each of these tags, all in its own language:

- `<html lang="en|am|om">`
- `<title>` and `<meta name="description">`
- `<meta name="robots" content="index, follow">`
- `<link rel="canonical">` pointing at the page's own URL
- Open Graph: type, site name, title, description, URL, locale, image (1200×630), image size
- Twitter: card (`summary_large_image`), title, description, image
- `<link rel="alternate" hreflang="…">` for en, am, om, and x-default

The JSON-LD block (`LocalBusiness`, with contact details and package prices) is in
`index.html` and is shared by all three pages.

---

## 4. Maintaining the content

### 4.1 Changing a title or description

Edit the `seo` block in the locale file:

```json
// src/i18n/locales/en.json
"seo": {
  "title": "Yehidat — Surprise Planning in Addis Ababa",
  "description": "Yehidat plans surprise birthdays, anniversaries, graduations and more in Addis Ababa and surrounding areas. Packages from 4,000 ETB. We handle every detail."
}
```

Then run `pnpm run build` and check the output (section 6).

### 4.2 Adding Amharic or Oromo titles

The `am.json` and `oro.json` files need the same `seo` block. Until you add it,
those pages fall back to English for titles and descriptions. The page text is
translated separately, from the other keys in those files.

Keep titles under about 60 characters and descriptions under about 160, so
search results don't cut them off.

### 4.3 Changing the contact details or prices

- Phone, WhatsApp, and email: `src/data/constants.js`, plus the `telephone` and
  `email` fields in the JSON-LD block in `index.html`.
- Prices: the JSON-LD `makesOffer` list in `index.html` and the package
  copy in the locale files.

Keep these in sync. Search engines use the structured data, so a wrong number
there spreads.

### 4.4 Adding a new page

1. Add the route to `src/App.jsx`. Wrap it in `LocaleRoute`.
2. Add its path to `ROUTES` in `scripts/prerender.mjs`, using the trailing slash
   convention (`"/blog/"`).
3. Give it its own `seo` keys, and make `headTags.js` read them for that page.
   Right now `headTags` only builds homepage tags, so this step is needed before
   a second page has its own title.
4. Add the URL to `public/sitemap.xml`.

### 4.5 Adding a new language

1. Add `src/i18n/locales/<code>.json`, with the same keys as `en.json`.
2. Register it in `src/i18n/index.js` (`resources` and `supportedLngs`).
3. Add the URL mapping in `src/i18n/routes.js`: `LOCALES`, `SEGMENT_TO_LOCALE`.
4. Add a route in `src/App.jsx`, and a prerender entry in `ROUTES`.
5. Add the language to the switcher in `src/components/ui/Navbar.jsx`.
6. Add the `<url>` and alternates to `public/sitemap.xml`.

### 4.6 Changing social images

1. Replace `public/images/socials/yehidat-banner-social-1500x500.png` with the new
   master banner (1500×500 or wider).
2. Run `python3 scripts/make-social-images.py`.
3. Commit the banner and all generated images.

The 1200×630 file keeps the same name, so the meta tags need no change. To add a
size, add it to `TARGETS` in the script.

---

## 5. Robots and AI crawlers

`public/robots.txt` currently allows:

- all crawlers (`User-agent: *`)
- GPTBot, ClaudeBot, Google-Extended, PerplexityBot, Applebot-Extended

To stop a bot from using your content for AI training, add a block like this:

```
User-agent: GPTBot
Disallow: /
```

Blocking a bot can also stop your site from appearing in that tool's answers, so
it's a tradeoff.

---

## 6. Checking the result

### 6.1 After every build

```bash
pnpm run build
```

The log should contain:

```
prerendered /      -> dist/index.html (en)
prerendered /am/   -> dist/am/index.html (am)
prerendered /om/   -> dist/om/index.html (oro)
```

### 6.2 Checking the raw HTML

Look at the HTML the server sends, before any JavaScript runs:

```bash
curl -s https://yehidat.vercel.app/am/ | head -c 2000
```

You should see:

- `<html lang="am">`
- one `<title>`, one `<meta name="description">`, one `<link rel="canonical">`
- real text in `<div id="root">`, not an empty div

### 6.3 Checking the tags

Use these tools after deploying:

- Google Rich Results Test: checks the JSON-LD block.
- Facebook Sharing Debugger (developers.facebook.com/tools/debug): shows the
  card a link preview produces, and can clear Facebook's cache.
- The WhatsApp and Telegram preview: paste the link into a private chat.
- Google Search Console: submit `sitemap.xml` and watch index coverage.

### 6.4 Local testing in a browser

Run `pnpm run preview`, then open the printed URL. Check the page source and the
browser console. A React hydration error (“Minified React error #418” or
“Hydration failed”) means the server HTML and the browser's first render don't
match. See section 7.

---

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
| ------- | ------------ | --- |
| `/am/` shows English text | The prerendered page wasn't written, or the language wasn't set from the URL | Check the build log for `prerendered /am/`. Confirm `LocaleRoute` wraps the route. |
| Console: “Minified React error #418” or “Hydration failed” | Browser output differs from server output. Often caused by reading `window`, `localStorage`, or the browser language during render | Move that code into `useEffect`, or into the `i18n` setup in `main.jsx`. |
| Two titles or two descriptions in the page source | An SEO tag was added but the old one wasn't removed | Add the tag to the removal list in `prerender.mjs` (`OWNED_HEAD`). |
| Link preview shows the old image | Platform cache | Use the Facebook Sharing Debugger to scrape again. WhatsApp caches for a while. |
| Link preview has no image | Wrong `og:image` URL, or the file is missing from `public/` | Open the image URL directly in a browser. It must return the picture. |
| `/Yehidat/…` URLs 404 on Vercel | A build was made with the GitHub Pages base path | See `.docs/deployment.md`, section 8. |
| Prerender fails with `Template is missing <div id="root"></div>` | The template changed, or Vite output changed format | Check `index.html` still has `<div id="root"></div>`. |
| `Cannot find module …/dist-ssr/entry-server.js` | The SSR build step was skipped | Run `pnpm run build` (not `vite build`), which runs all three steps. |
| Amharic or Oromo page has an English title | `seo` keys missing from `am.json` or `oro.json` | Add the keys (section 4.2). |

---

## 8. Things to know

- **The page text is pre-rendered, but the animations run in the browser.** Sections
  start invisible and fade in when scrolled into view. Search engines still read
  the text, since it's in the HTML.
- **The JSON-LD block is English only.** It's shared across languages. It's
  correct, but not localized.
- **The React app still runs in the browser.** Forms, the language switcher, and
  navigation all need JavaScript. Pre-rendering improves what crawlers see. It
  doesn't remove JavaScript from the site.
- **Search results take time to update.** After a deploy, Google can take days to
  weeks to show changes. Submitting the sitemap in Search Console speeds up
  discovery.
- **Trailing slashes matter.** Use `/am/`, not `/am`, in links and in the sitemap.
  The prerender writes `am/index.html`, so `/am/` is the canonical form.

---

## 9. Glossary of the build output

- `dist/index.html`: what Google and AI crawlers read for the English homepage.
- `dist/am/index.html`, `dist/om/index.html`: the same for the other two languages.
- `dist/404.html`: served by GitHub Pages for unknown paths. Contains the English
  homepage, so the app still renders.
- `dist/assets/*.js`: the React app. Loaded by every page. Hydrates the prerendered
  HTML.
