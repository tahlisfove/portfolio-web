import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// configuration de vite
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // redirige toutes les requêtes vers le backend
      "/api": "http://localhost:5000",
    },
  },
});
