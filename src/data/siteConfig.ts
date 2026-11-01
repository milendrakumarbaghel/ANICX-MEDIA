/**
 * Central business configuration for ANICX MEDIA.
 *
 * Grounded strictly in owner-confirmed business inputs:
 * - Brand: ANICX MEDIA
 * - Phone / WhatsApp: +91 87703 38294
 * - WhatsApp URL: https://wa.me/918770338294
 * - Location: Seoni, Madhya Pradesh - 480661
 * - Google Maps: https://maps.app.goo.gl/Y4XvpPPn2MGJbhAeA
 *
 * Optional unsupplied fields (street address, email, hours) are omitted.
 */

export interface SocialLink {
  label: string
  url: string
  handle?: string
}

export const WHATSAPP_TEMPLATES = {
  general: 'Hello ANICX Media! I found your website and would like to know more about your services.',
  animation: 'Hello ANICX Media! I would like to discuss a 2D/3D animation project. Please share your process and quotation details.',
  website: 'Hello ANICX Media! I need a professional website for my business. Please share your packages and process.',
  videoEditing: 'Hello ANICX Media! I need video editing/reels services. Please share the details.',
  training: 'Hello ANICX Academy! I would like information about courses, fees, timings and laptop/PC requirements.',
  portfolio: (projectName: string) =>
    `Hello ANICX Media! I saw ${projectName} on your website and would like to discuss a similar project.`,
} as const

export const siteConfig = {
  name: 'ANICX MEDIA',
  shortName: 'ANICX',
  tagline: 'Stories in Motion. Businesses Online.',
  description:
    'ANICX Media creates 2D and 3D animation, business websites and engaging video content. Based in Seoni, collaborating with clients online.',

  /**
   * Canonical site URL without trailing slash.
   */
  url: (import.meta.env.VITE_SITE_URL ?? 'https://anicx-media.vercel.app').replace(/\/$/, ''),

  logo: {
    src: null as string | null,
    alt: 'ANICX MEDIA',
    width: 140,
    height: 32,
  },

  contact: {
    email: null as string | null,
    phone: '+91 87703 38294',
    whatsapp: '918770338294',
    whatsappRaw: '+91 87703 38294',
    whatsappMessage: WHATSAPP_TEMPLATES.general,
    mapsUrl: 'https://maps.app.goo.gl/Y4XvpPPn2MGJbhAeA',
    tel: 'tel:+918770338294',
  },

  address: {
    street: null as string | null,
    postalCode: '480661',
    locality: 'Seoni',
    region: 'Madhya Pradesh',
    country: 'India',
    countryCode: 'IN',
    display: 'Seoni, Madhya Pradesh - 480661',
  },

  social: {
    instagram: {
      label: 'Instagram',
      url: 'https://www.instagram.com/anicx_media/',
      handle: '@anicx_media',
    } satisfies SocialLink,
    youtube: [
      { label: 'Raaz Wali Raat', url: 'https://www.youtube.com/@Raazwaliraat', handle: '@Raazwaliraat' },
      { label: 'Panga Toonz', url: 'https://www.youtube.com/@Pangatoonz', handle: '@Pangatoonz' },
    ] satisfies SocialLink[],
  },

  brand: {
    colors: {
      paper: '#FFFFFF',
      mist: '#F7F7F5',
      ink: '#161616',
      muted: '#666666',
      line: '#E9E9E7',
      accent: '#C7A15A',
      accentInk: '#84642A',
    },
  },

  ogImage: '/media/og-default.jpg',

  forms: {
    services: [
      '3D Animation',
      '2D Animation',
      'Website Development',
      'Video Editing / Reels',
      'Social Media / Ads Availability',
      'Other / Need Guidance',
    ] as const,
    budgetRanges: [
      'Under ₹25,000',
      '₹25,000 – ₹75,000',
      '₹75,000 – ₹2,00,000',
      'Above ₹2,00,000',
      'Need Guidance',
    ],
    timelines: [
      'As soon as possible',
      'Within 1 month',
      '1 – 3 months',
      'More than 3 months',
      'Flexible',
    ],
    skillLevels: ['Beginner (Zero experience)', 'Intermediate (Some experience)', 'Advanced'],
    learningModes: ['Online', 'Offline (Seoni)', 'Either is fine'],
  },
}

export type SiteConfig = typeof siteConfig

/**
 * Builds a direct WhatsApp link to 918770338294 with encoded prefilled message.
 */
export function whatsappHref(message: string = siteConfig.contact.whatsappMessage): string {
  const digits = siteConfig.contact.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function phoneHref(): string {
  return siteConfig.contact.tel
}

export const locationLabel = siteConfig.address.display
