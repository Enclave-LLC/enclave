import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/backend/": {
        target: "http://localhost:9000",
        changeOrigin: true,
        secure: true,
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes, req) => {
            const exchange = `[${req.method}] [${proxyRes.statusCode}] -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`
            console.log(exchange)
          })
        },
        rewrite: (path) => path.replace(/^\/backend/, "")
      }
    }
  }
})
