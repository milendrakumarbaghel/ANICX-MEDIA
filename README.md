# ANICX MEDIA: Studio & Academy Website

Website for **ANICX MEDIA**, an animation studio and creative academy in Seoni, Madhya Pradesh, India.

It's a clean, white, editorial site that showcases the studio's work, explains its services, promotes the Animation Academy and turns visitors into project and course enquiries.

- **Stack:** React 19, TypeScript (strict), Vite 8, Tailwind CSS 4, React Router 8
- **Motion:** GSAP + ScrollTrigger (`@gsap/react`), Lenis smooth scroll, Motion for React
- **Forms:** React Hook Form + Zod (`zod/mini`), submitted to Netlify Forms
- **Hosting:** Netlify. Every public page is prerendered to static HTML at build time.

> **Content owners:** see [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) for how to update videos, courses, testimonials, contact details and the logo.
> **Launch checklist and missing content:** see [docs/HANDOVER.md](docs/HANDOVER.md).

---

## Quick start

Requires **Node.js 20.19+** (Node 22 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:5173 (shows draft content with "Draft" badges)
```

| Command             | What it does                                                                  |
| ------------------- | ----------------------------------------------------------------------------- |
| `npm run dev`       | Development server with hot reload. Drafts visible.                           |
| `npm run build`     | Type-check, client build, prerender every route into `dist/`.                 |
| `npm run preview`   | Serves `dist/` the way Netlify does (pretty URLs, real 404, compression).     |
| `npm run typecheck` | TypeScript only.                                                              |
| `npm run lint`      | ESLint.                                                                       |
| `npm run check`     | Typecheck + lint + full build. Run this before every deploy.                  |

Form submissions are **simulated in `npm run dev`** (logged to the browser console), because Netlify Forms only exists on Netlify. Test real submissions on a deploy preview.

---

## Project structure

```
public/
  __forms.html          Netlify Forms blueprint (must match the React forms)
  media/work/           Optimised WebP thumbnails (640/960/1280w)
  media/og-default.jpg  Social sharing image (1200×630)
scripts/
  prerender.mjs         Renders each route to static HTML + sitemap.xml + robots.txt
  serve.mjs             Local Netlify-like preview server
  fetch-thumbnails.sh   Downloads + converts YouTube thumbnails to WebP
src/
  app/                  App shell, route table, animated route transitions
  animations/           GSAP config, Lenis, reveal/stagger/parallax/intro hooks
  components/
    animations/         RevealText, FadeIn, StaggerContainer, ParallaxImage, MagneticButton
    layout/             Navbar, MobileMenu, Footer, WhatsAppButton, SiteLayout
    home/               Homepage sections
    portfolio/          WorkCard, CategoryFilter
    academy/            CourseCard, SyllabusAccordion, EnquirySection, VideoGrid
    projects/           FilmShowcase
    forms/              Project & course enquiry forms
    ui/                 Buttons, headings, accordion, video lightbox, thumbnails, CTA
  data/                 ALL editable content (see docs/CONTENT_GUIDE.md)
  hooks/                useFocusTrap, useHydrated
  lib/                  Content visibility, media helpers, SEO head, form logic
  pages/                One file per route
  styles/index.css      Design tokens (Tailwind @theme), components, motion rules
  types/content.ts      Typed content model
  entry-server.tsx      Prerender entry (build time only)
  main.tsx              Browser entry (hydrates prerendered HTML)
```

### Routes

`/`, `/services`, `/portfolio`, `/projects`, `/projects/:slug`, `/academy`, `/academy/:slug`, `/testimonials`, `/about`, `/contact`, `/privacy-policy`, plus a 404 page for anything else.

---

## How it works

### Prerendering (SEO)

`npm run build` runs three steps:

1. `vite build` builds the browser bundle.
2. `vite build --ssr src/entry-server.tsx` builds a Node render bundle.
3. `scripts/prerender.mjs` renders every public route (including each project and course slug) to `dist/<route>/index.html`. Each file has its own `<title>`, meta description, Open Graph/Twitter tags, canonical URL and JSON-LD. The script also writes `404.html`, `sitemap.xml` and `robots.txt`.

The browser then **hydrates** the static HTML. Pages are readable and indexable without JavaScript, and links still work if JS fails.

Limitations, documented honestly:

- **The page list comes from the data files at build time.** Adding a project or course needs a rebuild, which Netlify does on every push.
- **Canonical URLs and the sitemap need the site URL.** On Netlify it comes from the build's `URL` variable automatically. Set `VITE_SITE_URL` once a custom domain is live so canonicals use it. Local builds without a URL skip `sitemap.xml` and print a warning.
- **The `<head>` updates during client-side navigation (no reload).** That's for the browser tab and share sheets. Crawlers get the prerendered HTML.

### Content visibility (no fabricated content in production)

Every item in `src/data/*` has `status: 'approved' | 'draft'`:

| Environment                              | Drafts shown? |
| ---------------------------------------- | ------------- |
| `npm run dev`                            | Yes, with a visible "Draft" badge |
| Netlify deploy previews / branch deploys | Yes (`VITE_SHOW_DRAFTS=true` in `netlify.toml`) |
| Production                               | **Never**: drafts aren't rendered, prerendered or listed in the sitemap |

This lets the client review layouts with placeholder outlines without risking misleading content going live.

### Animation system

| Layer | Used for |
| --- | --- |
| **GSAP + ScrollTrigger** (`src/animations/`) | Homepage hero timeline (`useIntro`), headline line masks (`RevealText`), scroll reveals (`useScrollReveal`), staggered grids (`useStaggerReveal`, `ScrollTrigger.batch`), parallax (`useParallax`), magnetic buttons, contact CTA scale |
| **Lenis** (`smoothScroll.ts`) | One instance, driven by the GSAP ticker and synced with ScrollTrigger. Smooths the mouse wheel only; touch, keyboard and screen readers keep native scrolling. Off for reduced motion. Overlays use `data-lenis-prevent`. |
| **Motion** (`m` components + `LazyMotion`) | Route transitions, mobile menu, video modal, accordions, portfolio filter layout, active filter pill |
| **CSS** | Button fills and arrows, underline links, card image zoom, marquee |

Rules followed:

- **Each element is animated by one library only.**
- **Only transform and opacity are animated**, plus a one-off clip-path for image reveals.
- **`gsap.matchMedia()` gates all GSAP motion.** Nothing runs under `prefers-reduced-motion: reduce`, and parallax is desktop only.
- **`useGSAP` scopes and reverts every animation on unmount.**
- **Content is never stuck hidden.** It's visible in the HTML, and JS applies the "from" state only when motion is allowed. Reveals use `opacity` (not `visibility`), so not-yet-revealed content stays focusable and readable by screen readers. A focus listener reveals anything keyboard focus lands in. `index.html` has a 3.5 s fallback in case the app fails to boot.
- **Homepage hero intro:** text is pre-hidden by CSS, and the image stays visible but masked so the LCP isn't delayed. Other page headers render instantly on a cold load and animate during client-side navigation.

### Performance

- **Code-splitting:** routes are code-split, and the current route's chunks get `modulepreload` hints.
- **Lazy-loaded heavy code:** form libraries load only on pages with forms, and Motion's feature bundle loads asynchronously.
- **Video:** YouTube players are never loaded until a visitor presses play (`youtube-nocookie.com` embed in an accessible modal).
- **Images:** local WebP thumbnails in 640/960/1280 widths with `srcset`/`sizes`, explicit dimensions (no layout shift), and lazy loading below the fold.
- **Fonts:** self-hosted, variable weight axis only, Latin subset loaded on demand.

Lighthouse, measured locally on the production build (`npm run preview`, Chrome 2026-10):

| Page | Mobile (simulated slow 4G) | Desktop |
| --- | --- | --- |
| Home | Perf 83–88, A11y 100, BP 100, SEO 100. LCP 3.3–4.0 s, CLS 0 | Perf 100, LCP 0.6 s |
| Portfolio | Perf 91–97, A11y 100, LCP 2.3–3.4 s | Perf 100 |
| Inner pages | Perf 93–98, A11y 100 | Perf 100 |

These are local measurements over HTTP/1.1. Re-measure on the live Netlify URL (HTTP/2 + CDN) with PageSpeed Insights. The homepage's mobile LCP is still above the 2.5 s target under Lighthouse's slow-4G profile. The bottleneck is bandwidth: hero image plus about 150 KB of JS plus fonts.

### Accessibility

- **Structure:** semantic landmarks, one `h1` per page, sequential headings, and a skip link.
- **Keyboard:** visible focus styles throughout. The mobile menu traps focus within the header, closes on Escape and closes on route change. The video modal is a real dialog that traps focus, closes on Escape and returns focus to its trigger.
- **Accordions, tabs and filters:** the accordion uses `aria-expanded`/`aria-controls`. Contact tabs follow the ARIA tabs pattern with arrow keys. Filters use `aria-pressed` with a live result count.
- **Forms:** labelled fields, `aria-invalid`, errors linked with `aria-describedby`, focus moves to the first error, and success/error states are announced.
- **Motion:** reduced motion is respected by GSAP, Lenis, Motion and CSS.
- **After navigation**, focus moves to `<main>`.

---

## Deployment (Netlify)

1. **Repository:** push this folder to a GitHub repository **owned by ANICX MEDIA**.
2. **Create the site:** in Netlify, go to **Add new site → Import an existing project** and pick the repo. The build settings come from `netlify.toml` (`npm run build`, publish `dist`, Node 22).
3. **Enable forms:** go to **Site configuration → Forms → Enable form detection**. It's off by default on new sites. Then trigger a new deploy so Netlify reads `public/__forms.html`. See [docs/HANDOVER.md](docs/HANDOVER.md#netlify-forms).
4. **Domain:** go to **Domain management** to add the custom domain. HTTPS is issued automatically.
5. **Canonical URL:** once the domain works, set the environment variable `VITE_SITE_URL=https://your-domain` and redeploy.
6. **Search Console:** submit `https://your-domain/sitemap.xml` to Google Search Console.

Routing needs no rewrite rules: each route has its own `index.html`, and Netlify serves `404.html` (with a real 404 status) for unknown URLs. Deep links and refreshes work on every page.

---

## Development notes

- **Strict TypeScript, no global state library.** Data is plain typed modules.
- **Brand colours** live in `src/data/siteConfig.ts` and are applied as CSS variables at runtime. Design tokens live in `src/styles/index.css` (`@theme`).
- **When you change form fields,** update `public/__forms.html` too, or Netlify will drop the new fields.
- **`@hookform/resolvers` isn't used.** Its current release has a broken optional-peer dependency graph on npm, so `src/lib/forms.ts` includes a 15-line typed Zod resolver instead.
