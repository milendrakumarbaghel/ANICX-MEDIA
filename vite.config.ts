import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Netlify exposes the site's primary URL as `URL` during builds. Use it as the
// canonical site URL unless VITE_SITE_URL is set explicitly (e.g. a custom domain).
process.env.VITE_SITE_URL ??= process.env.URL ?? ''

// Shared UI code is bundled into one "app" chunk. Anything that pulls in the
// form libraries stays separate so pages without forms never download them.
const SHARED_APP = /[\\/]src[\\/](components|animations|lib|data|hooks)[\\/]/
const FORM_MODULES = /[\\/]src[\\/](components[\\/]forms|lib[\\/]forms|components[\\/]academy[\\/]EnquirySection)/
const isSharedAppModule = (id: string) => SHARED_APP.test(id) && !FORM_MODULES.test(id)

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
                // Fewer, larger chunks: one request for icons and one for shared
                // UI code instead of ~20 tiny ones competing with the hero image.
                { name: 'icons', test: /node_modules[\\/]lucide-react[\\/]/, includeDependenciesRecursively: false },
                { name: 'app', test: isSharedAppModule, includeDependenciesRecursively: false },
              ],
            },
          },
        },
      },
}))
