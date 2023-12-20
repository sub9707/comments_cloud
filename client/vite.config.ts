import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api":
        "https://port-0-trouble-shooter-71t02clq3dokrn.sel4.cloudtype.app",
    },
  },
});
