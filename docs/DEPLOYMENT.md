# Deployment Guide

Yehidat is a Vite + React single-page app. It is deployed to two places from the
same code:

| Target          | URL                                   | Triggered by                 | Base path  |
| --------------- | ------------------------------------- | ---------------------------- | ---------- |
| Vercel          | https://yehidat.vercel.app/           | Git push (see Production Branch) | `/`        |
| GitHub Pages    | https://<github-user>.github.io/Yehidat/ | Push to `main` (workflow)    | `/Yehidat/`|

The only code difference between the two is the **base path**, which is set by the
`VITE_BASE` environment variable. Everything else is identical.

---

## 1. How the build works

```
pnpm install --frozen-lockfile     # install exactly what pnpm-lock.yaml says
pnpm run build                     # vite build && cp dist/index.html dist/404.html
```

Output goes to `dist/`:

- `dist/index.html` — entry page
- `dist/404.html` — a copy of `index.html`, used by GitHub Pages so that deep links
  (e.g. `/Yehidat/admin`) render the app instead of a blank error page
- `dist/assets/` — JS and CSS with content hashes in their filenames
- `dist/images/`, `dist/icons/`, `dist/occasions/`, `dist/banner/`, `dist/site.webmanifest`
  — copied from `public/`

### Base path

`vite.config.js` sets:

```js
base: process.env.VITE_BASE || "/",
```

- **Not set** → `/`. Asset URLs look like `/assets/index-xxxx.js`. Used by Vercel and local dev.
- **`VITE_BASE=/Yehidat/`** → asset URLs look like `/Yehidat/assets/index-xxxx.js`.
  Used only by the GitHub Pages workflow.

Never infer the base from CI or platform variables such as `GITHUB_ACTIONS` or
`VERCEL`. Setting it explicitly is what fixed the earlier 404s.

---

## 2. Versions

| Tool      | Where it is set                           | Value            |
| --------- | ----------------------------------------- | ---------------- |
| pnpm      | `package.json` → `packageManager`         | `pnpm@12.5.1`    |
| Node.js   | `.github/workflows/deploy.yml`            | `20`             |
| Node.js (Vercel) | Vercel project settings            | default (see §5) |
| Vite      | `package.json` → devDependencies          | locked in `pnpm-lock.yaml` |
| ESLint    | `package.json` → devDependencies          | `^9.39.5`        |

Rules that prevent most deployment failures:

1. **`packageManager` must match `pnpm -v` on your machine.** Run `pnpm -v`, then set the
   field to that exact version. Vercel reads this field to choose pnpm. If the field
   is missing or wrong, the install step fails.
2. **`pnpm-lock.yaml` must be committed and up to date.** Run `pnpm install` after any
   `package.json` change and commit the lockfile in the same commit.
3. **Do not commit `package-lock.json` or `yarn.lock`.** Two lockfiles make the
   installer guess.
4. **ESLint stays on 9.x** while `eslint-plugin-react` supports only ESLint up to 9.7.
   ESLint 10 causes a peer dependency conflict. pnpm warns about it; npm stops the
   install.

---

## 3. Local verification (do this before every push)

```bash
pnpm install --frozen-lockfile     # must succeed with no lockfile changes
pnpm run build                     # must pass; dist/ must contain assets/
pnpm run preview                   # open the printed URL; the page must render

VITE_BASE=/Yehidat/ pnpm run build # GitHub Pages build check
```

After the GitHub Pages build, check that every asset path begins with `/Yehidat/`.
After the default build, check that paths begin with `/assets/`:

```bash
grep -oE '(src|href)="/[^"]+"' dist/index.html
```

If you see `/Yehidat/` in the default build, `VITE_BASE` is set in your shell. Run
`unset VITE_BASE` and build again.

---

## 4. GitHub Pages

### 4.1 One-time repository setup

1. Open the repository on GitHub → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
   Do not choose "Deploy from a branch". The workflow uploads the built site
   directly, so a branch source would publish the repo's source files instead.
3. Save. Pages stays empty until the first workflow run succeeds.

### 4.2 The workflow

File: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Github Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"
      - run: pnpm install --frozen-lockfile
      - run: pnpm run build
        env:
          VITE_BASE: /Yehidat/
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- `pnpm/action-setup@v4` with no `version:` reads `packageManager` from `package.json`.
  Adding `version:` creates a second source of truth and can disagree with it.
- The workflow runs **only on pushes to `main`** and on manual runs
  (**Actions → Deploy to Github Pages → Run workflow**).

### 4.3 Releasing to GitHub Pages

```bash
git checkout main
git merge development      # or open a pull request from development into main
git push origin main       # triggers the workflow
```

Watch the run in the **Actions** tab. Two jobs run in order: `build`, then `deploy`.
When `deploy` is green, the page URL is shown on the run summary.

---

## 5. Vercel

### 5.1 One-time project setup

1. Vercel dashboard → **Add New → Project** → import `FIBA00/Yehidat`.
2. Framework Preset: **Vite**.
3. Set the values in §5.2. Leave everything else at its default.
4. Deploy.

### 5.2 Build settings

Open **Project → Settings → Build and Deployment**. The following must match.

| Setting           | Value                           | Notes |
| ----------------- | ------------------------------- | ----- |
| Framework Preset  | Vite                            | |
| Root Directory    | *(empty)*                       | The repo root is the project. |
| Install Command   | `pnpm install --frozen-lockfile` | **Must not be `npm install`.** See §8. |
| Build Command     | `pnpm run build`                | Or leave the preset default. |
| Output Directory  | `dist`                          | Vite's default output folder. |
| Node.js Version   | Default (or 20.x)               | |

Any override switch that is turned on overrides what the repo says. If the log shows
an install command you did not expect, check this page first.

### 5.3 Environment variables

Go to **Settings → Environment Variables**.

- **Do not set** `VITE_BASE`. Vercel must build with the default `/`.
- **Do not set** `GITHUB_ACTIONS`. It is no longer used, but it caused the old
  base-path bug, so do not add it.
- No secrets are required for the current site.

### 5.4 Production Branch

**Settings → Git → Production Branch.** This decides which branch updates
`yehidat.vercel.app`.

- If it is `main`, merge to `main` to release.
- If it is `development`, pushes to `development` release.

Make sure it matches the branch you intend to release from.

### 5.5 Routing: `vercel.json`

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

Why it exists: React Router handles pages like `/admin` in the browser. Without this
rewrite, refreshing `/admin` returns Vercel's 404 page.

How it works:

1. Vercel checks whether a real file exists at the requested path.
2. If it does (`/assets/...js`, `/images/...`, `/icons/...`), Vercel serves that file.
3. If it does not, Vercel serves the homepage, and React Router renders the right page.

The destination `/` also works. The more common convention is `/index.html`; change it
if you want to match that.

### 5.6 Deployment Protection

**Settings → Deployment Protection.** By default, preview deployments can require a
Vercel login. A visitor without a Vercel account sees a login page instead of the site.

- For a public link, disable protection for the production deployment, or use the
  production domain (`yehidat.vercel.app`).
- Protection settings depend on your Vercel plan. Check the current options in the
  dashboard.

### 5.7 Releasing to Vercel

Push to the Production Branch. Vercel builds automatically, and every push to any
other branch gets its own preview URL (`yehidat-<hash>-<team>.vercel.app`).

To redeploy without a new commit: **Deployments → ⋯ → Redeploy**. Turn off
**Use existing build cache** when you change install or build settings, so the old
install result is not reused.

---

## 6. Caching

| Content | Cache behavior |
| ------- | -------------- |
| `dist/assets/*` (JS, CSS) | Filenames include a content hash. A new build creates new filenames, so browsers can cache these safely. |
| `dist/index.html` | Revalidated by the browser on each visit. It points to the current hashed assets. |
| `public/images/*`, `public/icons/*` | No hash in the filename. A changed file keeps its old name, so browsers may show the old version. Rename the file to force a refresh. |

Image pipeline: `convert_images.py` writes responsive WebP and AVIF variants to
`public/images/{webp,avif}/`. The `Image.jsx` component serves them with `srcset`,
so phones download the smallest file that is still sharp.

---

## 7. Release checklist

Before merging to `main` or pushing to the Production Branch:

- [ ] `pnpm install --frozen-lockfile` succeeds locally
- [ ] `pnpm run build` succeeds locally
- [ ] `pnpm run preview` renders the page, and the console has no errors
- [ ] `VITE_BASE=/Yehidat/ pnpm run build` succeeds (GitHub Pages)
- [ ] `pnpm-lock.yaml` is committed and matches `package.json`
- [ ] `packageManager` in `package.json` matches `pnpm -v`
- [ ] No `package-lock.json` or `yarn.lock` in the repo
- [ ] Vercel Install Command is `pnpm install --frozen-lockfile`
- [ ] Vercel Output Directory is `dist`
- [ ] Vercel has no `VITE_BASE` or `GITHUB_ACTIONS` variables
- [ ] Vercel Deployment Protection is set the way you want
- [ ] Amharic copy (`src/i18n/locales/am.json`) has had a native-speaker review

---

## 8. Troubleshooting

| Symptom | Cause | Fix |
| ------- | ----- | --- |
| Vercel log: `Running "install" command: npm install` | Install Command override in Vercel settings | Set Install Command to `pnpm install --frozen-lockfile` (§5.2) |
| `npm error code ERESOLVE` on eslint peers | npm enforcing a peer conflict (ESLint 10 vs eslint-plugin-react) | Install pnpm (§5.2). Keep ESLint on 9.x. |
| `No pnpm version specified` in GitHub Actions | `packageManager` missing from `package.json` | Add `packageManager` with your `pnpm -v` value |
| Two different pnpm versions in GitHub Actions | `version:` set on `pnpm/action-setup` disagrees with `packageManager` | Remove `version:` from the action |
| `/Yehidat/assets/...` requests return 404 on Vercel | Build made with the GitHub Pages base path | Make sure `VITE_BASE` is not set on Vercel; redeploy with cache off |
| `/assets/...` requests return 404 on GitHub Pages | Build made with base `/` | Confirm the workflow sets `VITE_BASE: /Yehidat/` |
| Page loads, then blank; console says `Expected a JavaScript module script ... text/html` | Stale tab references an old hashed filename that no longer exists | Reload the tab. The rewrite returns `index.html` for missing files, which the browser then tries to run as JS. |
| Refreshing a sub-route on Vercel gives 404 | `vercel.json` rewrite missing or changed | Restore the rewrite in §5.5 |
| Refreshing a sub-route on GitHub Pages gives 404 status but still renders | Expected: `404.html` is a copy of `index.html` | No action needed. The app renders normally. |
| Vercel login page instead of the site | Deployment Protection | Disable it for the production deployment (§5.6) |
| Pages shows the repo's files, or a blank page | Pages source is "Deploy from a branch" | Change the source to **GitHub Actions** (§4.1) |
| Images still large after a rebuild | Source not converted | Run `python3 convert_images.py` and commit `public/images/` |
| `Chunks are larger than 500 kB` warning | Single JS bundle | Harmless for now. Route-level code splitting is the fix if load time matters. |

---

## 9. Known gaps

- **No `favicon.ico`.** Browsers request it by default and get a 404. Add a file at
  `public/favicon.ico` to stop the request.
- **Amharic translations are machine-drafted.** Review `am.json` with a native speaker
  before launch.
- **Phone and WhatsApp numbers are placeholders** in `src/data/constants.js`.
  Replace them before launch.
- **GitHub Pages deep links return HTTP 404.** The app still renders correctly, but
  search engines may treat those pages as missing. Vercel does not have this problem.
