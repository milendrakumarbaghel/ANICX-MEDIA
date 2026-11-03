# Developer Handover: ANICX MEDIA Website

## 1. Confirmed Business Details & Shared Configuration

All business facts are centralized in [`src/data/siteConfig.ts`](file:///Users/milendrakumarbaghel/Documents/projects/anicx-media/src/data/siteConfig.ts):

| Item | Value |
| --- | --- |
| **Brand** | ANICX MEDIA |
| **Phone** | `+91 87703 38294` (`tel:+918770338294`) |
| **WhatsApp Number** | `918770338294` (`https://wa.me/918770338294`) |
| **Location** | Seoni, Madhya Pradesh - 480661 |
| **Google Maps Location** | `https://maps.app.goo.gl/Y4XvpPPn2MGJbhAeA` |
| **Instagram** | `https://www.instagram.com/anicx_media/` (`@anicx_media`) |
| **Live Domain / Target** | `https://anicx-media.vercel.app/` |

*Note: Unsupplied optional fields (street address text, business email, and office hours) are omitted across the site without placeholders per owner instructions.*

---

## 2. Information Architecture & Navigation

Primary Header Action: **Start a Project** (`/contact?enquiry=project#enquiry`).

Top Navigation items:
1. **Home** (`/`)
2. **Services** (`/services` with dedicated pages at `/services/animation`, `/services/web-development`, `/services/video-editing`)
3. **Our Work** (`/portfolio` - Original Series are included inside Our Work with dedicated category filter; legacy `/projects` redirects to `/portfolio`)
4. **Academy** (`/academy` and `/academy/:slug`)
5. **About** (`/about`)
6. **Contact** (`/contact`)

---

## 3. Homepage Section Order (Verified)

1. **Hero:** "Stories in Motion. Businesses Online." with actions "Discuss Your Project", "Explore Our Work", and "Want to learn? Explore ANICX Academy."
2. **Three Service Cards:** Animation Studio, Websites & Content, ANICX Academy, plus capacity notice for Social Media & Paid Ads ("Enquire About Availability").
3. **Selected Client Work:** Hotel website (`hotelshantione.in`) with "Visit Website" & "Enquire About a Similar Website", representative animation contributions, and responsive grid of 5 animation client channels with "View Channel".
4. **Original Series:** Panga Toonz (family comedy) and Raaz Wali Raat (2D Hindi horror with 18+ advisory), separate from client work.
5. **How We Work:** 5 steps (Discuss → Plan & Quote → Create → Review → Deliver).
6. **Academy Preview:** Course cards and upcoming-batch interest form.
7. **Final Contact Section:** "Have a project in mind? Let’s discuss it." with direct WhatsApp, Direct Call, and Google Maps location actions.

The brief's showreel (a Makdaman poster directly under the hero) was removed at the owner's request; that work still appears under Selected Client Work.

---

## 4. WhatsApp Enquiry Implementation

- Centralized templates in `src/data/siteConfig.ts` (`WHATSAPP_TEMPLATES`):
  - General
  - Animation
  - Website
  - Video editing
  - Training
  - Portfolio-specific contextual enquiry
- **Floating WhatsApp button** on all public pages with accessible label `Chat with ANICX Media on WhatsApp`.
- **Project Enquiry Form:**
  - Required: Full name, service, project details.
  - Optional: Business/channel name, budget range (incl. Need Guidance), preferred deadline (incl. Flexible), reference link.
  - Button: "Continue on WhatsApp".
  - Omits empty optional fields, ends with `"Enquiry from ANICX website"`.
  - Helper text: *"Your enquiry will open in WhatsApp. Please send the message there to complete it."*
  - Form preserves user inputs when returning to the tab.
- **Student Enquiry Form:**
  - Fields: name, interested course, skill level, laptop/PC availability, preferred online/offline mode, preferred timing.
  - Route to WhatsApp with training template.
  - Transparency disclosure: *"Training does not guarantee employment. Candidates may be considered for available internships or jobs after skill assessment."*

---

## 5. Routing Defect Fix & Deployment

- **Defect fixed:** direct request to `/academy` (and all subroutes) returned 404 on static hosts without trailing slash or SSR mapping.
- **Fix:**
  - `scripts/prerender.mjs` generates both `dist/<path>/index.html` AND `dist/<path>.html`.
  - Added `vercel.json` with `"cleanUrls": true`, `"trailingSlash": false`, and permanent redirect from `/projects` to `/portfolio`.
  - Updated `netlify.toml` with redirect from `/projects` to `/portfolio`.
  - Configured client-side redirect in `src/pages/ProjectsRedirect.tsx` with `<meta http-equiv="refresh">` fallback.
  - Generates `dist/404.html` for unknown paths.
  - Automatically generates `sitemap.xml` and `robots.txt`.

---

## 6. How to Update Portfolio & Courses

### Adding / Editing Portfolio Items
Edit [`src/data/projects.ts`](file:///Users/milendrakumarbaghel/Documents/projects/anicx-media/src/data/projects.ts):
- Add an entry to `workItems`:
  - `id`: unique string
  - `title`: display title
  - `category`: `'website-development'` | `'3d-animation'` | `'2d-animation'` | `'video-editing'` | `'original-series'`
  - `kind`: `'client-work'` | `'original-series'`
  - `youtubeId`: YouTube video ID (or `externalUrl` + `image`)
  - `brief`, `actualRole`, `deliverables`, `enquiryMessage`
  - `status`: `'approved'`

### Updating Animation Client Channels
Edit [`src/data/clients.ts`](file:///Users/milendrakumarbaghel/Documents/projects/anicx-media/src/data/clients.ts):
- Add/update entry in `clientChannels` array with `name`, `url`, `role`, and `description`.

### Updating Academy Courses
Edit [`src/data/courses.ts`](file:///Users/milendrakumarbaghel/Documents/projects/anicx-media/src/data/courses.ts):
- Update course details, syllabus modules, teaching hours, schedule, requirements, and fees in `courses`.

---

## 7. Build & Quality Verification

Run verification command:
```bash
npm run check
```
This runs:
1. `npm run typecheck` (`tsc -b`) - verifies TypeScript types.
2. `npm run lint` (`eslint .`) - verifies code standards.
3. `npm run build` (`vite build`, SSR build, and `node scripts/prerender.mjs`) - builds production assets and prerenders all static HTML pages.
