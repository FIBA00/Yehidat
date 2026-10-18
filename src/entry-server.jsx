import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import i18n from "./i18n";
import { localeFromPath, pagePath } from "./i18n/routes";
import { queryClient } from "./lib/queryClient.js";
import App from "./App.jsx";
export { headTags } from "./seo/headTags.js";

// Renders one page for prerendering. Language comes from the URL, the same
// rule the browser uses, so the server HTML matches what hydration expects.
export async function render(url) {
  const locale = localeFromPath(url);
  await i18n.changeLanguage(locale);

  const html = renderToString(
    <MemoryRouter initialEntries={[url]}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MemoryRouter>,
  );

  return { html, locale, page: pagePath(url) };
}
