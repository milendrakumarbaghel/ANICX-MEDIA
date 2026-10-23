import { academyFaq, courses, referenceVideos } from '../data/courses'
import { originalProjects, workItems } from '../data/projects'
import { services } from '../data/services'
import { testimonials } from '../data/testimonials'
import type { Publishable } from '../types/content'

/**
 * Drafts are visible in development and when VITE_SHOW_DRAFTS=true (Netlify
 * deploy previews). Production builds only ever render approved content.
 */
export const SHOW_DRAFTS = import.meta.env.DEV || import.meta.env.VITE_SHOW_DRAFTS === 'true'

export const isVisible = (item: Publishable): boolean => item.status === 'approved' || SHOW_DRAFTS

export const onlyVisible = <T extends Publishable>(items: readonly T[]): T[] => items.filter(isVisible)

export const isDraft = (item: Publishable): boolean => item.status === 'draft'

// Pre-filtered collections used by pages and the prerender step.
export const visibleWork = onlyVisible(workItems)
export const featuredWork = visibleWork.filter((item) => item.featured)
export const visibleServices = onlyVisible(services)
export const visibleCourses = onlyVisible(courses)
export const visibleProjects = onlyVisible(originalProjects)
export const visibleTestimonials = onlyVisible(testimonials)
export const visibleReferenceVideos = onlyVisible(referenceVideos).filter((video) => video.youtubeId || SHOW_DRAFTS)
export const visibleAcademyFaq = onlyVisible(academyFaq)

export const getProject = (slug: string | undefined) => visibleProjects.find((project) => project.slug === slug)
export const getCourse = (slug: string | undefined) => visibleCourses.find((course) => course.slug === slug)
