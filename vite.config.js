import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/upload-image": {
        target: "https://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
      "/entity": {
        target: "https://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
      "/user-management": {
        target: "https://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
      "/users": {
        target: "https://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
      "/documents": {
        target: "https://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
