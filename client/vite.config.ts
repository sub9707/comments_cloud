import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://port-0-trouble-shooter-71t02clq3dokrn.sel4.cloudtype.app",
        changeOrigin: true,
        rewrite: (path) => {
          console.log("Rewriting path:", path);
          const paths = path.replace(/^\/api/, "");
          console.log("Rewriting path:", paths);
          return paths;
        },
      },
    },
  },
});
