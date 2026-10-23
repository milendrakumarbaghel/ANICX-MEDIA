import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Netlify exposes the site's primary URL as `URL` during builds. Use it as the
// canonical site URL unless VITE_SITE_URL is set explicitly (e.g. a custom domain).
process.env.VITE_SITE_URL ??= process.env.URL ?? ''

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  ssr: {
    // Bundle every dependency into the prerender bundle so Node never has to
    // resolve browser-oriented ESM packages (gsap, lenis, motion) on its own.
    noExternal: true,
  },
  build: isSsrBuild
    ? {
        outDir: 'dist-ssr',
        copyPublicDir: false,
        emptyOutDir: true,
      }
    : {
        outDir: 'dist',
        manifest: true,
        emptyOutDir: true,
        rolldownOptions: {
          output: {
            codeSplitting: {
              groups: [
                // Form libraries load only on pages that contain a form.
                { name: 'forms', test: /node_modules[\\/](react-hook-form|zod)[\\/]/, includeDependenciesRecursively: false },
              ],
            },
          },
        },
      },
}))
