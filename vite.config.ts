import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      // Enable fast refresh and automatic CSS import in production
      babel: {
        plugins: [],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./client/src"),
      "@shared": path.resolve("./shared"),
      "@assets": path.resolve("./attached_assets"),
    },
  },
  root: path.resolve("./client"),
  build: {
    outDir: path.resolve("./dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      // ensure CSS is included
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "assets/css/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    cssCodeSplit: true, // split CSS into separate files
  },
  css: {
    devSourcemap: false,  // optional: disable dev sourcemaps
    preprocessorOptions: {
      scss: {
        // include any global scss if needed
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});
