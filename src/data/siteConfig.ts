/**
 * Central business configuration for ANICX MEDIA.
 *
 * Only verified details belong here. Fields set to `null` are MISSING and are
 * hidden across the site until the client supplies them. See README.md →
 * "Content still needed from the client".
 */

export interface SocialLink {
  label: string
  url: string
  handle?: string
}

export const siteConfig = {
  name: 'ANICX MEDIA',
  shortName: 'ANICX',
  tagline: 'Animation Studio & Creative Academy',
  description:
    'ANICX MEDIA is an animation studio and creative academy in Seoni, Madhya Pradesh. We create 2D and 3D animation, videos and brand content, and teach animation online.',

  /**
   * Canonical site URL, without a trailing slash. Filled automatically on
   * Netlify from the build's `URL` variable, or set VITE_SITE_URL explicitly
   * once the custom domain is live.
   */
  url: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, ''),

  /**
   * MISSING: approved logo. Place it in /public (SVG preferred), e.g.
   * src: '/brand/anicx-logo.svg'. While null, a typographic wordmark is used.
   */
  logo: {
    src: null as string | null,
    alt: 'ANICX MEDIA',
    width: 140,
    height: 32,
  },

  contact: {
    /** MISSING: business email, e.g. 'hello@anicxmedia.com'. */
    email: null as string | null,
    /** MISSING: phone number in international format, e.g. '+91 98765 43210'. */
    phone: null as string | null,
    /**
     * MISSING: WhatsApp number, digits only with country code, e.g. '919876543210'.
     * The floating WhatsApp button stays hidden until this is set.
     */
    whatsapp: null as string | null,
    whatsappMessage: 'Hello ANICX MEDIA, I would like to know more about',
  },

  address: {
    /** MISSING: street address and postal code (optional, only if public). */
    street: null as string | null,
    postalCode: null as string | null,
    locality: 'Seoni',
    region: 'Madhya Pradesh',
    country: 'India',
    countryCode: 'IN',
  },

  social: {
    instagram: {
      label: 'Instagram',
      url: 'https://www.instagram.com/anicx_media/',
      handle: '@anicx_media',
    } satisfies SocialLink,
    /** YouTube channels for the studio's original series. */
    youtube: [
      { label: 'Raaz Wali Raat', url: 'https://www.youtube.com/@Raazwaliraat', handle: '@Raazwaliraat' },
      { label: 'Panga Toonz', url: 'https://www.youtube.com/@Pangatoonz', handle: '@Pangatoonz' },
    ] satisfies SocialLink[],
  },

  /**
   * Brand colours. Applied as CSS variables on the root layout, so changing a
   * value here restyles the whole site. Update `accent` once the logo is final.
   */
  brand: {
    colors: {
      paper: '#FFFFFF',
      mist: '#F7F7F5',
      ink: '#161616',
      muted: '#666666',
      line: '#E9E9E7',
      accent: '#C7A15A',
      /** Darker accent used for small text on white (keeps AA contrast). */
      accentInk: '#84642A',
    },
  },

  /** Default social sharing image (1200×630). */
  ogImage: '/media/og-default.jpg',

  forms: {
    budgetRanges: [
      'Under ₹25,000',
      '₹25,000 – ₹75,000',
      '₹75,000 – ₹2,00,000',
      'Above ₹2,00,000',
      'Not sure yet',
    ],
    timelines: ['As soon as possible', 'Within 1 month', '1 – 3 months', 'More than 3 months', 'Flexible'],
  },
}

export type SiteConfig = typeof siteConfig

export function whatsappHref(message = siteConfig.contact.whatsappMessage): string | null {
  const number = siteConfig.contact.whatsapp?.replace(/\D/g, '')
  if (!number) return null
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function phoneHref(): string | null {
  const phone = siteConfig.contact.phone?.replace(/[^\d+]/g, '')
  return phone ? `tel:${phone}` : null
}

export const locationLabel = `${siteConfig.address.locality}, ${siteConfig.address.region}, ${siteConfig.address.country}`
