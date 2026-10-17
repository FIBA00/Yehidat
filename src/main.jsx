import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

// ! internal imports
import { queryClient } from "./lib/queryClient.js";
import "./i18n";
import "./styles/index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter basename={import.meta.env.BASE_URL || "/Yehidat/"}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
