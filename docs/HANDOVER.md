# Handover: ANICX MEDIA website

## Content still needed from ANICX MEDIA

| # | Item | Where it goes | Current state |
| --- | --- | --- | --- |
| 1 | **Logo** (SVG preferred) + favicon | `siteConfig.logo.src`, `public/favicon.svg` | Typographic "ANICX MEDIA" wordmark placeholder |
| 2 | **Business email** | `siteConfig.contact.email` | Hidden |
| 3 | **Phone number** | `siteConfig.contact.phone` | Hidden |
| 4 | **WhatsApp business number** | `siteConfig.contact.whatsapp` | WhatsApp button disabled (no fake number) |
| 5 | **Course details**: names, overviews, syllabus, format, fees, durations, schedules | `src/data/courses.ts` | 3 draft outlines, **not shown in production**. Production Academy shows benefits, FAQ and the enquiry form. |
| 6 | **Academy FAQ answers** (experience needed, software/computer) | `academyFaq` | 2 approved, 2 drafts |
| 7 | **Sample lesson videos** | `courses[].sampleLessons` | Section hidden until added |
| 8 | **1–2 approved reference videos** (Professor Of How / Zack D. Films / Zeck Felms) | `referenceVideos` | 2 empty draft slots |
| 9 | **Dhamal Nagar**: synopsis, poster, trailer, characters, episode links | `originalProjects` | Draft; page not published |
| 10 | **Testimonials** (genuine, with permission) | `src/data/testimonials.ts` | Section hidden |
| 11 | **Confirmation of content ownership** (see below) | n/a | **Needs a decision before launch** |
| 12 | **Custom domain** | Netlify + `VITE_SITE_URL` | Not set |
| 13 | **Brand accent colour** matching the final logo | `siteConfig.brand.colors` | `#C7A15A` gold placeholder |
| 14 | **Review of written copy**: services descriptions, studio intro, workflow, budget ranges, privacy policy | `src/data/*`, privacy page | Written to be factual and non-specific. Please confirm wording. |
| 15 | Optional: approved photos (studio, team, classes), project posters, character art | `public/media/…` | Only video stills used today |

### ⚠ Content ownership: please confirm

The portfolio and "Original Projects" use the two YouTube channels supplied as ANICX MEDIA portfolio sources: **Raaz Wali Raat** and **Panga Toonz**. Titles and descriptions restate what the channels publish.

Please check two points before launch:

- **Panga Toonz credit:** the channel description states that its characters and content are owned by *"Abhishek Rai & Abhishek Animations PVT LIMITED"*. Confirm that ANICX MEDIA may present this as its own production or original series. If not, change the wording, or move it to portfolio-only with a credit line.
- **Raaz Wali Raat contact:** the channel lists a personal contact email that isn't used anywhere on this site.

A public video titled "PINKI CHIRKUT (dhamal nagar) | abhishek animations" exists on a third-party channel, which suggests Dhamal Nagar may be connected to the Panga Toonz world. Nothing about it was assumed; please supply the official details.

---

## Netlify Forms

The site has two forms:

- **`project-enquiry`:** name, email, phone, service, budget, timeline, message
- **`course-enquiry`:** name, email, phone, course, message

They're submitted from React with URL-encoded `fetch` POSTs (never JSON). Both have a hidden `form-name` field and a `bot-field` honeypot. Netlify discovers them through the static blueprint `public/__forms.html`.

### Setup (one time)

1. **Enable form detection:** in Netlify, go to **Site configuration → Forms → Enable form detection**. New sites have it switched off.
2. **Redeploy:** go to **Deploys → Trigger deploy → Deploy site**. After the deploy, **Forms** should list `project-enquiry` and `course-enquiry`.
3. **Test:** send one test enquiry from each form on the live site (or a deploy preview). Confirm both appear under **Forms → (form name) → Verified submissions**.

### Email notifications

1. Go to **Site configuration → Notifications → Emails and webhooks → Form submission notifications → Add notification → Email notification**.
2. Choose the event "New form submission", then select **one form** (or "Any form") and enter the studio's email.
3. Repeat for the second form if you want separate inboxes (e.g. projects vs academy).
4. Check the spam folder for the first notification and mark it "Not spam".

### Spam protection

- **Honeypot:** hidden `bot-field`, checked in the browser and by Netlify.
- **Netlify's built-in spam filtering:** suspected spam goes to **Forms → Spam submissions**. Check it occasionally.
- **More protection, if spam becomes a problem:** add `data-netlify-recaptcha="true"` to the forms. This needs a reCAPTCHA element added to both the blueprint and the React forms.

### Plan limits

- **Credit-based plans** (every Netlify account created since September 2025): as of **14 April 2026**, Netlify made **form submissions free and unlimited**, including the Free plan ([Netlify changelog](https://www.netlify.com/changelog/2026-04-14-pricing-updates-april-2026.md)). The Free plan still has a monthly credit allowance for bandwidth, compute and web requests. A small, static brochure site like this normally stays well within it, but check **Team → Billing → Usage** after launch.
- **Legacy plans** (older accounts on legacy Free/Starter): historically limited to **100 form submissions per site per month**. If the studio's account is on a legacy plan, consider moving to a credit-based plan.
- **Files:** submissions are stored in Netlify. Export them via **Forms → Download as CSV** and remove old ones you no longer need (privacy).

Pricing changes often, so confirm on <https://www.netlify.com/pricing/> before relying on these numbers.

### Local development

`npm run dev` does **not** send real submissions. It logs the payload in the browser console and shows the success message. Real submissions only work on a Netlify deploy.

---

## Ownership & accounts

- The **GitHub repository** and the **Netlify site/team** should be owned by ANICX MEDIA's own accounts. Add the developer as a collaborator, not the other way round.
- No paid services, API keys or databases are required. Recurring cost on the Netlify Free plan: ₹0, subject to the usage limits above.

---

## Final acceptance checklist

| Item | Status |
| --- | --- |
| All required pages and routes exist (incl. dynamic `/projects/:slug`, `/academy/:slug`, 404) | ✅ |
| Navigation links work; deep links and refreshes work (prerendered HTML) | ✅ verified locally with a Netlify-like server |
| Homepage hero timeline, reveals, parallax, marquee, CTA | ✅ |
| No animation-related console errors (dev and production, 2 viewports, 12 routes) | ✅ |
| Portfolio filtering (URL-shareable `?category=`) | ✅ |
| Video previews: lazy YouTube modal, Escape to close, focus returns, YouTube fallback link | ✅ |
| Academy and course pages (course pages are drafts until content is approved) | ✅ |
| Project detail pages | ✅ |
| Forms: validation, error states, URL-encoded submission, success state | ✅ locally. ⏳ **Verify real submissions in the Netlify dashboard after the first deploy** |
| Mobile navigation (focus trap, Escape, closes on navigation) | ✅ |
| Breakpoints: checked at 390px and 1440px automatically, no horizontal overflow | ✅ Also check 320px, tablet and 1920px+ on real devices before launch |
| Reduced motion (no Lenis, no GSAP motion, CSS transitions off) | ✅ |
| Keyboard navigation and visible focus | ✅ |
| Metadata, Open Graph, JSON-LD, sitemap, robots.txt | ✅ Sitemap/canonicals need the site URL (automatic on Netlify) |
| Images optimised (WebP, responsive, sized, lazy) | ✅ |
| No fabricated content in production (draft system) | ✅ Pending the ownership confirmation above |
| No placeholder production links (WhatsApp/email/phone hidden until real) | ✅ |
| Production build passes (`npm run check`) | ✅ |
| README and handover docs | ✅ |
