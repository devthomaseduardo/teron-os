import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3005,
    strictPort: false,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    // Gera .vercel/output (Build Output API). Sem isso o deploy sobe "Ready" mas vazio → 404 NOT_FOUND.
    nitro(),
    react(),
    tailwindcss(),
  ],
});
