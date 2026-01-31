import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/business-partner/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    allowedHosts: ["052d6beb1bf7.ngrok-free.app"],
  },
  build: {
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0];
          }
        },
      },
    },
  },
});
