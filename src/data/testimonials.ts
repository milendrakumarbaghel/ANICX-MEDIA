import type { Testimonial } from '../types/content'

/**
 * Client and student testimonials.
 *
 * Only add genuine, approved testimonials with the person's permission.
 * The homepage section stays hidden until at least one approved testimonial
 * exists, and the carousel turns on automatically from three testimonials up.
 *
 * Example:
 * {
 *   status: 'approved',
 *   name: 'Full Name',
 *   company: 'Company',
 *   role: 'Founder',
 *   quote: 'Their exact words…',
 *   photo: { src: '/media/testimonials/full-name.webp', alt: 'Full Name' },
 *   youtubeId: 'optional video testimonial ID',
 * },
 */
export const testimonials: Testimonial[] = []
