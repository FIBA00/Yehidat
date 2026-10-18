import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

// ! internal imports
import { queryClient } from "./lib/queryClient.js";
import i18n from "./i18n";
import { localeFromPath } from "./i18n/routes";
import "./styles/index.css";
import App from "./App.jsx";

const rawBase = import.meta.env.BASE_URL || "/";
const basename = rawBase.replace(/\/$/, "");

// The language is read from the URL before rendering. The prerendered HTML
// was built for that language, so the first client render must match it.
// The base path is removed first, so /Yehidat/am/ on GitHub Pages reads as /am/.
const pathWithoutBase = window.location.pathname.slice(basename.length) || "/";
const locale = localeFromPath(pathWithoutBase);
const container = document.getElementById("root");

i18n.changeLanguage(locale).then(() => {
  const app = (
    <BrowserRouter basename={basename || undefined}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  );

  // Prerendered pages hydrate their existing HTML. In dev there is no
  // prerendered HTML, so the app renders from scratch.
  if (container.hasChildNodes()) {
    ReactDOM.hydrateRoot(container, app);
  } else {
    ReactDOM.createRoot(container).render(app);
  }
});
