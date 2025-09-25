import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    VitePWA({
      includeAssets: ["favicon-v4.ico"],
      manifest: {
        theme_color: "#2257C0",
        background_color: "#2257C0", // Used for splash screen
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "Fluento",
        description: "Language Learning App",
        name: "Fluento",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
