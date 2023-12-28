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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          reactRouter: ["react-router-dom"],
          axios: ["axios"],
          moment: ["moment"],
          redux: ["redux", "react-redux", "redux-thunk"],
          nivo: ["@nivo/calendar", "@nivo/core", "@nivo/line"],
          quill: [
            "quill-image-resize",
            "quill-image-resize-module-ts",
            "react-quill",
          ],
          fontAwesome: [
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/free-regular-svg-icons",
            "@fortawesome/free-solid-svg-icons",
            "@fortawesome/react-fontawesome",
          ],
          bootstrap: ["bootstrap"],
          styledComponents: ["styled-components"],
        },
      },
    },
  },
});
