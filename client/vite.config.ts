import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@api", replacement: "/src/api" },
      { find: "@/store", replacement: "/src/store" },
      { find: "@types", replacement: "/src/types" },
    ],
  },
});
