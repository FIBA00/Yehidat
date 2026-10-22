// Runs after `vite build` and `vite build --ssr`.
// Writes one static HTML file per language, so crawlers that do not run
// JavaScript still get the page text and the correct <head> tags.
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const DIST = path.resolve("dist");
const SSR_ENTRY = path.resolve("dist-ssr/entry-server.js");
const ROUTES = [
  "/",
  "/am/",
  "/om/",
  "/about-us/",
  "/am/about-us/",
  "/om/about-us/",
  "/gallery/",
  "/am/gallery/",
  "/om/gallery/",
];

// Tags that headTags() owns. They are removed from the template first, so
// the output never has two titles, descriptions, or canonical links.
const OWNED_HEAD = [
  /<title>[\s\S]*?<\/title>\s*/g,
  /<meta\b[^>]*\b(?:name|property)="(?:description|robots|og:[^"]*|twitter:[^"]*)"[^>]*>\s*/g,
  /<link\b[^>]*\brel="(?:canonical|alternate)"[^>]*>\s*/g,
];

function buildPage(template, html, locale, headHtml) {
  let page = template;
  for (const re of OWNED_HEAD) page = page.replace(re, "");
  page = page.replace(/<html lang="[^"]*"/, `<html lang="${localeToHtmlLang(locale)}"`);
  page = page.replace("</head>", `    ${headHtml}\n  </head>`);
  if (!page.includes('<div id="root"></div>')) {
    throw new Error('Template is missing <div id="root"></div>');
  }
  return page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

function localeToHtmlLang(locale) {
  return { en: "en", am: "am", oro: "om" }[locale];
}

async function main() {
  const template = await readFile(path.join(DIST, "index.html"), "utf8");
  const { render, headTags } = await import(pathToFileURL(SSR_ENTRY).href);

  for (const url of ROUTES) {
    const { html, locale, page: pagePathname } = await render(url);
    const page = buildPage(template, html, locale, headTags(locale, pagePathname));
    const outDir = path.join(DIST, url);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), page);
    console.log(`prerendered ${url.padEnd(6)} -> ${path.relative(process.cwd(), path.join(outDir, "index.html"))} (${locale})`);
  }

  // GitHub Pages serves 404.html for unknown paths. The English page is the
  // safest fallback, so the app still renders and the URL keeps working.
  const en = await readFile(path.join(DIST, "index.html"), "utf8");
  await writeFile(path.join(DIST, "404.html"), en);
  await rm(path.resolve("dist-ssr"), { recursive: true, force: true });
  console.log("wrote dist/404.html and removed dist-ssr/");
}

main().catch((err) => {
  console.error("prerender failed:", err);
  process.exit(1);
});
