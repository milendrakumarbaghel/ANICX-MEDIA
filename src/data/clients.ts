import type { ClientChannel } from '../types/content'

/**
 * Owner-provided client relationships under Selected Clients & Collaborations.
 *
 * Per brief instructions:
 * - These are business inputs supplied by the owner, not independent claims of endorsement or measured results.
 * - Show client names in a clean responsive grid with a View Channel action.
 * - Retain the exact supplied link destinations.
 * - Do not imply ANICX owns these channels or produced every video.
 * - Do not fabricate subscriber counts, revenue claims, or total client counts.
 */
export const clientChannels: ClientChannel[] = [
  {
    name: 'Abhishek Animations',
    url: 'https://www.youtube.com/@AbhishekAnimations8888',
    role: 'Animation Production Support',
    description: 'Animation and asset support for 2D/3D cartoon content.',
  },
  {
    name: 'Chintu Pintu Toons',
    url: 'https://www.youtube.com/@chintupintutoons/videos',
    role: '3D Cartoon Animation',
    description: 'Character animation and episode contributions.',
  },
  {
    name: 'Vishal Animation',
    url: 'https://www.youtube.com/@Vishalanimation_1/videos',
    role: 'Animation Contributions',
    description: 'Story-driven animation and visual support.',
  },
  {
    name: 'Zack D. Films',
    url: 'https://www.youtube.com/@zackdfilms',
    role: 'Creative Production Support',
    description: 'Character-led storytelling and scene contributions.',
  },
  {
    name: 'Chintu Chinki Ki Comedy',
    url: 'https://www.youtube.com/@chintuchinkikicomedy3214',
    role: 'Desi Comedy Animation',
    description: 'Humorous cartoon animation and episodic scenes.',
  },
]

