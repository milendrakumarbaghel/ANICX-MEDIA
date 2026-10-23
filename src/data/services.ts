import type { Service } from '../types/content'

/**
 * Services offered by ANICX MEDIA.
 *
 * Copy describes what each service covers. It deliberately avoids results,
 * client counts or guarantees. Review wording with the client before launch.
 * Available icons: see `ServiceIcon` in src/types/content.ts.
 */
export const services: Service[] = [
  {
    slug: '2d-animation',
    status: 'approved',
    title: '2D Animation',
    icon: 'brush',
    summary: 'Hand-crafted 2D stories, characters and animated series.',
    description:
      'Story-driven 2D animation for channels, brands and campaigns, from character design and backgrounds to full animated episodes.',
    includes: ['Animated stories & episodes', 'Character & background design', 'Explainer animation', 'Animated social content'],
  },
  {
    slug: '3d-animation',
    status: 'approved',
    title: '3D Animation',
    icon: 'box',
    summary: '3D character and cartoon animation with personality.',
    description:
      '3D character and cartoon animation for series, kids’ content and brand mascots: modelling, rigging, animation, lighting and rendering.',
    includes: ['3D character animation', 'Cartoon series production', 'Mascot animation', 'Lighting & rendering'],
  },
  {
    slug: 'product-animation',
    status: 'approved',
    title: 'Product Animation',
    icon: 'package',
    summary: 'Show how your product looks, works and feels.',
    description:
      'Clean 3D and motion-graphic product visuals for launches, e-commerce listings and ads, showing features that are hard to film.',
    includes: ['3D product visualisation', 'Feature & how-it-works animation', 'Launch videos', 'E-commerce visuals'],
  },
  {
    slug: 'video-editing-reels',
    status: 'approved',
    title: 'Video Editing & Reels',
    icon: 'clapperboard',
    summary: 'Sharp edits and scroll-stopping reels.',
    description:
      'Editing for YouTube, Instagram and short-form platforms, including pacing, captions, motion graphics, sound design and colour.',
    includes: ['YouTube video editing', 'Instagram reels & shorts', 'Captions & motion graphics', 'Sound & colour'],
  },
  {
    slug: 'promotional-videos',
    status: 'approved',
    title: 'Promotional Videos',
    icon: 'monitor-play',
    summary: 'Trailers, promos and launch films that get attention.',
    description:
      'Promotional videos, trailers and teasers for shows, products, events and businesses, in animated or live-action edits.',
    includes: ['Trailers & teasers', 'Business promos', 'Event & launch videos', 'Ad creatives'],
  },
  {
    slug: 'branding-graphic-design',
    status: 'approved',
    title: 'Branding & Graphic Design',
    icon: 'pen-tool',
    summary: 'Identity and design that looks consistent everywhere.',
    description:
      'Visual identity and graphic design that keeps a brand consistent across social media, print and video.',
    includes: ['Logo & identity design', 'Social media creatives', 'Thumbnails & posters', 'Print & marketing collateral'],
  },
  {
    slug: 'digital-marketing',
    status: 'approved',
    title: 'Digital Marketing',
    icon: 'megaphone',
    summary: 'Campaigns that put your story in front of the right people.',
    description:
      'Digital campaigns planned around strong creative, combining content, paid promotion and channel strategy.',
    includes: ['Campaign planning', 'Paid social promotion', 'Content strategy', 'YouTube channel growth support'],
  },
  {
    slug: 'social-media-management',
    status: 'approved',
    title: 'Social Media Management',
    icon: 'users',
    summary: 'Consistent, on-brand social presence, handled for you.',
    description:
      'Day-to-day management of your social channels: content calendars, design, publishing and community replies.',
    includes: ['Content calendars', 'Post & reel production', 'Publishing & scheduling', 'Community management'],
  },
]
