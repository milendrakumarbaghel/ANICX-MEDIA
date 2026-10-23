# Content guide

All website content lives in **`src/data/`**. You don't need to touch any design or animation code to update it.

You can edit these files:

- directly on GitHub (open the file, click the pencil icon, then **Commit changes**). Netlify rebuilds and publishes automatically in about a minute.
- or locally with `npm run dev` to preview first.

> **The golden rule:** only publish real, approved information. Every item has a `status`.
> - `status: 'approved'`: shown on the live site.
> - `status: 'draft'`: shown only in development and deploy previews, with a yellow "Draft" badge. **Never shown on the live site.**

After any edit, run `npm run check`, or open a pull request and check the Netlify deploy preview.

---

## 1. Business details: `src/data/siteConfig.ts`

| Field | What to enter | Effect |
| --- | --- | --- |
| `contact.email` | e.g. `'hello@anicxmedia.com'` | Shows in the footer, contact page and form error messages |
| `contact.phone` | e.g. `'+91 98765 43210'` | Clickable phone link |
| `contact.whatsapp` | Digits with country code, e.g. `'919876543210'` | Turns on the floating WhatsApp button and WhatsApp links |
| `address.street`, `address.postalCode` | Only if you want them public | Added to Google structured data |
| `logo.src` | Path of the logo in `public/`, e.g. `'/brand/anicx-logo.svg'` | Replaces the text wordmark |
| `social` | Instagram and YouTube links | Footer, menu and structured data |
| `brand.colors.accent` | Hex colour, e.g. `'#C7A15A'` | Gold accent dots and lines across the site. Pick `accentInk` as a darker shade that is readable on white. |
| `forms.budgetRanges`, `forms.timelines` | Dropdown options for the project form | Project enquiry form |

Leave a field as `null` until you have the real value. Empty fields are simply hidden; nothing fake is shown.

**Logo:** put the file (SVG preferred, or a transparent PNG/WebP) in `public/brand/`, set `logo.src`, and adjust `logo.width`/`logo.height` to its proportions. Also replace `public/favicon.svg`.

**Social sharing image:** replace `public/media/og-default.jpg` with a 1200×630 JPG.

---

## 2. Portfolio videos: `src/data/projects.ts` → `workItems`

Add a block like this to the list:

```ts
{
  id: 'unique-short-name',          // lowercase, no spaces
  status: 'approved',
  title: 'Video title',
  category: '3d-animation',         // '2d-animation' | '3d-animation' | 'product-animation' | 'video-editing' | 'promotional'
  description: 'One factual sentence about the video.',
  youtubeId: 'abc123XYZ',           // from https://www.youtube.com/watch?v=abc123XYZ
  projectSlug: 'panga-toonz',       // optional: links to an original project page
  source: 'Panga Toonz',            // optional: channel or client name
  featured: true,                   // optional: show on the homepage (about 6 works best)
  advisory: '18+',                  // optional: audience label
},
```

- **Thumbnails are automatic.** The site uses YouTube's thumbnail.
- **For sharper, faster thumbnails,** run `sh scripts/fetch-thumbnails.sh abc123XYZ` (needs `cwebp`: `brew install webp`) and add the ID to `src/data/localThumbnails.ts`.
- **For a non-YouTube item** (e.g. an Instagram reel), use `externalUrl` instead of `youtubeId` and add a custom `image`.
- **Filter tabs appear automatically** once a category has at least one item. "Product Animation" and "Video Editing" stay hidden until you add work in them.

---

## 3. Original projects: `src/data/projects.ts` → `originalProjects`

Each project gets its own page at `/projects/<slug>`.

| Field | Notes |
| --- | --- |
| `slug` | URL name, e.g. `'dhamal-nagar'` |
| `tagline`, `format`, `overview` | `overview` is a list of paragraphs |
| `poster` | Custom key art `{ src: '/media/projects/name.webp', alt: '…' }`. Otherwise `posterVideoId` uses a video still. |
| `trailer` / `featuredVideo` | `{ youtubeId, title }` |
| `characters` | `{ name, description?, image? }`. Only add approved character info. |
| `episodes` | List of `{ youtubeId, title }` |
| `facts` | Label/value pairs shown in the overview (format, language, audience…) |
| `gallery` | Optional extra images |

**Dhamal Nagar** is set up as a draft with no content. Fill in the approved details and change `status` to `'approved'` to publish it.

---

## 4. Courses: `src/data/courses.ts`

Each course gets a page at `/academy/<slug>` and appears on the homepage, the Academy page, the footer and the course enquiry dropdown.

The three courses in the file are **draft outlines** for layout review. To publish one:

1. Replace `title`, `summary`, `overview`, `skills`, `objectives` and `syllabus` with the approved content. Delete any line starting with "DRAFT".
2. In `format`, fill only confirmed facts. Delete unknown fields; they won't show.
   ```ts
   format: { mode: 'Online', duration: '8 weeks', language: 'Hindi & English', level: 'Beginner', fee: '₹…', schedule: 'Weekends' },
   ```
3. Add sample lessons: `sampleLessons: [{ youtubeId: '…', title: 'Lesson 1: …' }]`
4. Add course-specific FAQ items with `status: 'approved'`.
5. Set `status: 'approved'`.

**Never publish fees, durations, schedules or outcomes the studio hasn't confirmed.**

**Academy FAQ:** `academyFaq` in the same file. Two answers are approved; two are drafts waiting for the studio's answers.

**Style reference videos:** `referenceVideos` has two empty slots for the videos chosen from Professor Of How, Zack D. Films or Zeck Felms. Paste the `youtubeId` and real title, then set `status: 'approved'`. They're always labelled as third-party references with a credit link, never as ANICX MEDIA work.

---

## 5. Testimonials: `src/data/testimonials.ts`

The list is empty, so the homepage testimonials section is hidden and `/testimonials` shows a polite "coming soon" message (excluded from search engines).

Add only genuine testimonials, with the person's permission:

```ts
{
  status: 'approved',
  name: 'Full Name',
  company: 'Company',               // optional
  role: 'Founder',                  // optional
  quote: 'Their exact words.',
  photo: { src: '/media/testimonials/full-name.webp', alt: 'Full Name' },   // optional
  youtubeId: 'abc123XYZ',           // optional video testimonial
},
```

- **1–2 testimonials** show as cards.
- **3 or more** turn into a carousel automatically.

---

## 6. Services: `src/data/services.ts`

Edit titles, summaries, descriptions and the `includes` lists. Available icons: `brush`, `box`, `package`, `clapperboard`, `megaphone`, `users`, `pen-tool`, `monitor-play`.

To hide a service, set `status: 'draft'`.

## 7. About / studio copy: `src/data/studio.ts`

Studio introduction, capabilities list and the four-step workflow. Add a founding year, team details or client numbers here **only once confirmed**.

## 8. Privacy policy: `src/pages/PrivacyPolicyPage.tsx`

The policy describes what the site actually does: Netlify Forms, YouTube embeds loaded on demand, no analytics. Update `LAST_UPDATED` and the text if you add analytics, cookies or other services.
