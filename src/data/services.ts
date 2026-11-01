import type { Service } from '../types/content'
import { WHATSAPP_TEMPLATES } from './siteConfig'

/**
 * Services offered by ANICX MEDIA.
 *
 * Grounded in the Developer Brief:
 * - Three main service groups: Animation Studio, Websites & Content, ANICX Academy.
 * - Dedicated service pages for Animation, Web Development, and Video Editing.
 * - Social media management and paid ads use an "Enquire About Availability" action.
 * - Factual scope without exaggerated claims (no unlimited revisions, no lifetime free support, no guaranteed sales).
 */

export const services: Service[] = [
  {
    slug: 'animation',
    title: 'Animation Studio',
    group: 'animation',
    icon: 'box',
    status: 'approved',
    pageRoute: '/services/animation',
    summary: '3D character/cartoon animation, 2D animation, explainers, promotional animation and production support.',
    description:
      'From episodic YouTube cartoon series and horror stories to business explainers and promotional animations. We handle character design, rigging, keyframe animation, lighting and rendering with clear stage sign-offs.',
    includes: [
      '3D character & cartoon animation',
      '2D narrative animation & horror stories',
      'Explainer & promotional animations',
      'Character modeling, rigging & background art',
      'Production support & episodic asset reuse',
    ],
    detail: {
      audience: [
        'Content creators and YouTube channels running recurring animated series',
        'Brands and businesses needing engaging 2D or 3D explainer videos',
        'Agencies and production houses seeking reliable animation production support',
      ],
      deliverables: [
        'Finished high-definition animation videos (MP4 / ProRes, 1080p / 4K)',
        'Original character designs and background artwork (as scoped)',
        'Character rigs and 3D scene files (where production agreement specifies)',
        'Export formats tailored for YouTube, Instagram, or broadcast',
      ],
      requiredInputs: [
        'Animation style preference: 2D or 3D cartoon style',
        'Target duration and episode count',
        'Character count and key location requirements',
        'Script, synopsis, or voice-over audio (if already recorded)',
        'Visual reference links or previous episode assets',
      ],
      process: [
        {
          step: '1. Style & Scope Clarification',
          details: 'We review script/synopsis, character count, duration and 2D/3D visual benchmark before fixing quotation.',
        },
        {
          step: '2. Asset & Storyboard Stage',
          details: 'Design characters, backgrounds and key story beats. Client signs off on character look and storyboard.',
        },
        {
          step: '3. Animation Blocking',
          details: 'Key poses, timing and motion blocking aligned to audio / voice-over track.',
        },
        {
          step: '4. Final Render & Polish',
          details: 'Lighting, rendering, visual effects, and composite polishing.',
        },
        {
          step: '5. Review & Delivery',
          details: 'Included revision round to polish details, followed by final master delivery.',
        },
      ],
      revisionApproach:
        'Every project includes agreed revision checkpoints at storyboard and blocking stages before final render. Substantial script rewrites or character redesigns after final render are separately scoped.',
      faqs: [
        {
          question: 'What information do you need before quoting an animation project?',
          answer:
            'We need the animation style (2D or 3D), estimated duration, number of characters, background locations, whether you supply voice-over/script, and your delivery timeline.',
        },
        {
          question: 'Do you create the characters or do we need to supply 3D models?',
          answer:
            'We can model, texture and rig custom characters from scratch, or work with your existing character models and assets.',
        },
        {
          question: 'How are revisions handled in animation?',
          answer:
            'Revisions are built into the workflow at defined checkpoints: script/storyboard, character design, and motion blocking. Once final 3D lighting and rendering is complete, changes to motion or camera are limited to agreed polish.',
        },
        {
          question: 'Who owns the final delivered animation?',
          answer:
            'Upon project completion and settlement, full rights to the delivered video files belong to the client for their intended distribution.',
        },
      ],
      whatsappMessage: WHATSAPP_TEMPLATES.animation,
    },
  },
  {
    slug: 'web-development',
    title: 'Websites & Web Development',
    group: 'websites',
    icon: 'globe',
    status: 'approved',
    pageRoute: '/services/web-development',
    summary: 'Business and hotel/restaurant websites, landing pages, mobile layouts, enquiry forms and Maps integration.',
    description:
      'Fast, modern websites engineered to showcase your business cleanly and convert visitor interest into WhatsApp and direct phone enquiries. Responsive on mobile, tablet, and desktop.',
    includes: [
      'Business websites & landing pages',
      'Hotel & restaurant websites with room/menu showcases',
      'Mobile-first responsive layouts',
      'Direct WhatsApp enquiry integration',
      'Google Maps location and office embed/directions',
      'Speed optimization & search engine readiness',
      'Ongoing maintenance & content update options',
    ],
    detail: {
      audience: [
        'Hotels, resorts, lodges and restaurants wanting direct bookings without heavy commission platforms',
        'Local businesses and studios needing a fast, credible digital presence',
        'Brands launching new products, services or promotional landing pages',
      ],
      deliverables: [
        'Production-ready, responsive website published to fast global hosting',
        'Mobile-friendly layout with instant-touch call and WhatsApp buttons',
        'Photo gallery, room/service cards, and contact information',
        'Verified Google Maps integration and business location pin',
        'Structured metadata for search engine indexing and social sharing',
      ],
      requiredInputs: [
        'Business name, confirmed phone number and WhatsApp number',
        'Office or property Google Maps location link',
        'Service / room descriptions, pricing policies and photo assets',
        'Existing domain name access (or domain preference for setup)',
      ],
      process: [
        {
          step: '1. Discovery & Structure',
          details: 'We identify your core services, target audience, and preferred contact actions (WhatsApp / call).',
        },
        {
          step: '2. Wireframe & Visual Draft',
          details: 'Creating a clean layout tailored to your brand colors, mobile responsiveness, and clear typography.',
        },
        {
          step: '3. Build & Integration',
          details: 'Developing the fast frontend, connecting WhatsApp prefilled templates, Maps, and media galleries.',
        },
        {
          step: '4. Testing & Verification',
          details: 'Testing across mobile viewports, tablet, desktop, Safari, Chrome and verifying direct route refreshes.',
        },
        {
          step: '5. Launch & Handover',
          details: 'Connecting your domain name with HTTPS, generating sitemap, and handing over simple update steps.',
        },
      ],
      revisionApproach:
        'Includes layout review and content adjustment cycles during staging. Booking engines, payment gateways, custom admin dashboards, and custom web software are separately scoped features.',
      faqs: [
        {
          question: 'Can visitors book or contact us directly on WhatsApp?',
          answer:
            'Yes. We configure dedicated WhatsApp click-to-chat links with prefilled messages so you immediately see the context of the enquiry (room type, service, or dates).',
        },
        {
          question: 'Do you provide hosting and domain connection?',
          answer:
            'We deploy to fast, secure commercial hosting with free SSL (HTTPS) and configure your custom domain name under your direct ownership.',
        },
        {
          question: 'What is excluded from standard website development?',
          answer:
            'Complex payment gateways, real-time multi-calendar reservation engines, and custom user portals are scoped separately. Standard packages focus on high-converting presentation, galleries, WhatsApp, and location maps.',
        },
      ],
      whatsappMessage: WHATSAPP_TEMPLATES.website,
    },
  },
  {
    slug: 'video-editing',
    title: 'Video Editing & Reels',
    group: 'websites',
    icon: 'clapperboard',
    status: 'approved',
    pageRoute: '/services/video-editing',
    summary: 'Professional editing for YouTube videos, Instagram reels, trailers and short-form content.',
    description:
      'Engaging, well-paced video editing with clear narrative structure, synced sound effects, modern captions, color grading, and aspect ratio formatting for all platforms.',
    includes: [
      'YouTube long-form video editing',
      'Instagram Reels & YouTube Shorts',
      'Promotional teasers & trailer cuts',
      'Pacing, jump cuts & comedic/suspense timing',
      'Animated subtitles & captions',
      'Sound design, music syncing & audio leveling',
    ],
    detail: {
      audience: [
        'YouTube creators needing consistent, on-time weekly editing',
        'Businesses needing social media reels and promotional campaign videos',
        'Film, series, or game developers wanting sharp teaser trailers',
      ],
      deliverables: [
        'Finished video files in 16:9 (YouTube) and 9:16 (Reels/Shorts)',
        'Burnt-in or .SRT subtitle files upon request',
        'Custom thumbnail still selections or motion graphics openers',
      ],
      requiredInputs: [
        'Raw footage uploaded via Google Drive / Dropbox / OneDrive',
        'Target video length, aspect ratios and platform destination',
        'Preferred pacing style, reference channels, and brand guidelines',
        'Voice-over, music track, or background sound preferences',
      ],
      process: [
        {
          step: '1. Footage Ingestion & Cut',
          details: 'Organizing clips, assembly cut, and pacing selection aligned to your brief.',
        },
        {
          step: '2. Pacing, B-Roll & Graphics',
          details: 'Adding b-roll, text callouts, sound effects, and motion captions.',
        },
        {
          step: '3. Audio Mastering & Color',
          details: 'Balancing dialogue, background music ducking, and color enhancement.',
        },
        {
          step: '4. Review & Export',
          details: 'One structured revision round for timing and text corrections, followed by final export.',
        },
      ],
      revisionApproach:
        'Standard editing includes one round of timestamped minor adjustments (text fixes, music volume, trim adjustments). Raw footage re-shoots, script rewrites, or entirely new narrative cuts are scoped separately. Filming and travel are separate scope.',
      faqs: [
        {
          question: 'How do I share large footage files with you?',
          answer:
            'You can share footage via Google Drive, Dropbox, WeTransfer, or a shared cloud folder link.',
        },
        {
          question: 'Do you provide filming or camera work?',
          answer:
            'Our standard service is post-production and editing. On-site filming and travel require separate scheduling and geographical scoping.',
        },
        {
          question: 'What is the usual turnaround time?',
          answer:
            'Typical turnaround for short-form reels is 2–3 business days, and 4–7 business days for long-form YouTube episodes depending on footage volume and editing complexity.',
        },
      ],
      whatsappMessage: WHATSAPP_TEMPLATES.videoEditing,
    },
  },
  {
    slug: 'social-media-ads',
    title: 'Social Media Management & Paid Ads',
    group: 'websites',
    icon: 'megaphone',
    status: 'approved',
    availabilityOnly: true,
    summary: 'Social media management and targeted advertising campaigns.',
    description:
      'We run selective social media campaigns and ad creatives. To maintain delivery quality, bookings are accepted strictly based on current studio bandwidth.',
    includes: [
      'Campaign creative strategy',
      'Targeted ad setup & creatives',
      'Content calendar planning',
      'Enquiry-first onboarding',
    ],
    detail: {
      audience: ['Brands looking for planned campaign rollouts with verified availability'],
      deliverables: ['Creative ad assets', 'Campaign setup guidance'],
      requiredInputs: ['Brand background', 'Campaign goal', 'Budget and target timeline'],
      process: [
        {
          step: '1. Bandwidth & Scope Check',
          details: 'Confirming studio capacity and alignment before taking on ad management.',
        },
        {
          step: '2. Agreement & Setup',
          details: 'Confirming realistic scope without fabricated outcome promises.',
        },
      ],
      revisionApproach: 'Managed per campaign scope agreement.',
      faqs: [
        {
          question: 'Why is this service listed as Enquire About Availability?',
          answer:
            'We prioritize dedicated focus for each client. When our capacity is committed to active animation and web projects, new ad management packages are scheduled only when delivery slots open.',
        },
      ],
      whatsappMessage:
        'Hello ANICX Media! I would like to enquire about availability for social media management and ads.',
    },
  },
]

export const visibleServices = services.filter((s) => s.status === 'approved')
