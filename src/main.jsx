import React from "react";

import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import "./i18n";
import "./styles/index.css";
import { queryClient } from "./lib/queryClient";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
