import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // allowedHosts: ["6v5jwk-5173.csb.app", "cpljxg-5173.csb.app"],
    allowedHosts: true,
  },
});
