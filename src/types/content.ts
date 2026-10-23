/**
 * Content model for ANICX MEDIA.
 *
 * Every editorial item carries a `status`:
 * - `approved`: confirmed by the client and shown everywhere, including production.
 * - `draft`: development content that still needs client confirmation. Drafts are
 *   visible in `npm run dev` and on Netlify deploy previews (VITE_SHOW_DRAFTS=true),
 *   always with a visible "Draft" badge, and are never rendered in production.
 */
export type ContentStatus = 'approved' | 'draft'

export interface Publishable {
  status: ContentStatus
}

/** A YouTube video reference. Only the ID is required, e.g. "6REn-I_gkRY". */
export interface VideoRef {
  youtubeId: string
  title: string
}

/** Optional custom image. Paths are relative to /public, e.g. "/media/work/poster.webp". */
export interface ImageAsset {
  src: string
  /** Optional 2x/large version for responsive srcset. */
  srcLarge?: string
  alt: string
  width?: number
  height?: number
}

export type WorkCategory =
  | '2d-animation'
  | '3d-animation'
  | 'product-animation'
  | 'video-editing'
  | 'promotional'

export interface WorkItem extends Publishable {
  id: string
  title: string
  category: WorkCategory
  description: string
  /** YouTube video ID. A thumbnail is derived from it automatically. */
  youtubeId?: string
  /** Optional non-YouTube link (e.g. an Instagram reel). */
  externalUrl?: string
  /** Optional custom thumbnail. Overrides the YouTube thumbnail. */
  image?: ImageAsset
  /** Slug of a related original project, links to /projects/:slug. */
  projectSlug?: string
  /** Which channel or client the work was published on. */
  source?: string
  /** Show in the homepage "Selected Work" grid. */
  featured?: boolean
  /** Audience advisory label, e.g. "18+". */
  advisory?: string
}

export type ServiceIcon =
  | 'brush'
  | 'box'
  | 'package'
  | 'clapperboard'
  | 'megaphone'
  | 'users'
  | 'pen-tool'
  | 'monitor-play'

export interface Service extends Publishable {
  slug: string
  title: string
  icon: ServiceIcon
  summary: string
  description: string
  /** Typical scope. Keep factual: describe what the service covers, not results. */
  includes: string[]
}

export interface SyllabusModule {
  title: string
  topics: string[]
}

export interface FaqItem extends Publishable {
  question: string
  answer: string
}

export interface Course extends Publishable {
  slug: string
  title: string
  category: string
  /** One-line summary used on cards. */
  summary: string
  overview: string
  image?: ImageAsset
  skills: string[]
  objectives: string[]
  syllabus: SyllabusModule[]
  /**
   * Course facts. Leave a field undefined until the client confirms it:
   * undefined fields are simply not rendered. Never guess fees or durations.
   */
  format?: {
    mode?: string
    duration?: string
    schedule?: string
    language?: string
    fee?: string
    level?: string
  }
  sampleLessons: VideoRef[]
  faq: FaqItem[]
}

export interface ReferenceVideo extends Publishable, VideoRef {
  /** Third-party creator credit. These are style references, not ANICX MEDIA work. */
  creator: string
  creatorUrl: string
  note?: string
}

export interface Character {
  name: string
  description?: string
  image?: ImageAsset
}

export interface OriginalProject extends Publishable {
  slug: string
  title: string
  tagline: string
  format: string
  overview: string[]
  poster?: ImageAsset
  /** Video used for the poster if no custom poster is supplied. */
  posterVideoId?: string
  trailer?: VideoRef
  /** Highlighted video when there is no trailer. */
  featuredVideo?: VideoRef
  channelUrl?: string
  facts: { label: string; value: string }[]
  characters: Character[]
  episodes: VideoRef[]
  gallery: ImageAsset[]
  advisory?: string
}

export interface Testimonial extends Publishable {
  name: string
  company?: string
  role?: string
  quote: string
  photo?: ImageAsset
  youtubeId?: string
}
