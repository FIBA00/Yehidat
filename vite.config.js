import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Base path is set explicitly, never inferred from CI/platform env vars.
// - Vercel / local dev: "/"  (default)
// - GitHub Pages: the workflow sets VITE_BASE=/Yehidat/
export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react(), tailwindcss()],
});
