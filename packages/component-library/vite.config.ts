import { resolve } from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import dts from "vite-plugin-dts"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ["src"] })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "component-library",
      fileName: "component-library"
    },
    rollupOptions: {
      external: ["react", "react-dom"]
    },
    copyPublicDir: false
  }
})
