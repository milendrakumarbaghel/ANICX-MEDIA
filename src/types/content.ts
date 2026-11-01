/**
 * Content model for ANICX MEDIA.
 *
 * Every editorial item carries a `status`:
 * - `approved`: confirmed by the client and shown everywhere, including production.
 * - `draft`: development content that still needs client confirmation.
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
  srcLarge?: string
  alt: string
  width?: number
  height?: number
}

export type WorkCategory =
  | 'website-development'
  | '3d-animation'
  | '2d-animation'
  | 'video-editing'
  | 'original-series'
  | 'promotional'

export type WorkKind = 'client-work' | 'original-series'

export interface WorkItem extends Publishable {
  id: string
  title: string
  category: WorkCategory
  kind: WorkKind
  description: string
  /** Brief / scope details for case studies. */
  brief?: string
  actualRole?: string
  deliverables?: string[]
  /** YouTube video ID. A thumbnail is derived from it automatically. */
  youtubeId?: string
  /** Optional external website or channel link. */
  externalUrl?: string
  externalUrlLabel?: string
  /** Optional custom thumbnail. Overrides the YouTube thumbnail. */
  image?: ImageAsset
  mobileImage?: ImageAsset
  /** Slug of a related original project, links to /projects/:slug. */
  projectSlug?: string
  /** Which channel or client the work was published on. */
  source?: string
  /** Show in the homepage "Selected Work" grid. */
  featured?: boolean
  /** Audience advisory label, e.g. "18+". */
  advisory?: string
  /** Custom WhatsApp enquiry action message */
  enquiryMessage?: string
}

export interface ClientChannel {
  name: string
  url: string
  role: string
  description?: string
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
  | 'globe'
  | 'graduation-cap'

export interface ServiceDetail {
  audience: string[]
  deliverables: string[]
  requiredInputs: string[]
  process: { step: string; details: string }[]
  revisionApproach: string
  faqs: { question: string; answer: string }[]
  whatsappMessage: string
}

export interface Service extends Publishable {
  slug: string
  title: string
  group: 'animation' | 'websites' | 'academy'
  icon: ServiceIcon
  summary: string
  description: string
  includes: string[]
  pageRoute?: string
  availabilityOnly?: boolean
  detail?: ServiceDetail
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
  summary: string
  overview: string
  image?: ImageAsset
  skills: string[]
  objectives: string[]
  syllabus: SyllabusModule[]
  format?: {
    mode?: string
    duration?: string
    teachingHours?: string
    schedule?: string
    language?: string
    fee?: string
    level?: string
    requiredDevice?: string
    assignments?: string
    feedback?: string
    portfolioOutcome?: string
    cancellationRefund?: string
  }
  isFinalized?: boolean
  sampleLessons: VideoRef[]
  faq: FaqItem[]
}

export interface ReferenceVideo extends Publishable, VideoRef {
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
  posterVideoId?: string
  trailer?: VideoRef
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
