import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    // Provide a browser-friendly global for modules that expect Node's `global`
    global: 'globalThis',
  },
  plugins: [react()],
})
