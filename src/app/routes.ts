import { matchPath } from 'react-router'
import { visibleCourses, visibleProjects, visibleTestimonials } from '../lib/content'
import { lazyPage, type LazyPage } from './lazyPage'

export interface AppRoute {
  path: string
  page: LazyPage
  /** Source module, used by the prerenderer to add <link rel="modulepreload">. */
  module: string
}

export const routes: AppRoute[] = [
  { path: '/', module: 'src/pages/HomePage.tsx', page: lazyPage(() => import('../pages/HomePage')) },
  { path: '/services', module: 'src/pages/ServicesPage.tsx', page: lazyPage(() => import('../pages/ServicesPage')) },
  { path: '/portfolio', module: 'src/pages/PortfolioPage.tsx', page: lazyPage(() => import('../pages/PortfolioPage')) },
  { path: '/projects', module: 'src/pages/ProjectsPage.tsx', page: lazyPage(() => import('../pages/ProjectsPage')) },
  { path: '/projects/:slug', module: 'src/pages/ProjectDetailPage.tsx', page: lazyPage(() => import('../pages/ProjectDetailPage')) },
  { path: '/academy', module: 'src/pages/AcademyPage.tsx', page: lazyPage(() => import('../pages/AcademyPage')) },
  { path: '/academy/:slug', module: 'src/pages/CourseDetailPage.tsx', page: lazyPage(() => import('../pages/CourseDetailPage')) },
  { path: '/testimonials', module: 'src/pages/TestimonialsPage.tsx', page: lazyPage(() => import('../pages/TestimonialsPage')) },
  { path: '/about', module: 'src/pages/AboutPage.tsx', page: lazyPage(() => import('../pages/AboutPage')) },
  { path: '/contact', module: 'src/pages/ContactPage.tsx', page: lazyPage(() => import('../pages/ContactPage')) },
  { path: '/privacy-policy', module: 'src/pages/PrivacyPolicyPage.tsx', page: lazyPage(() => import('../pages/PrivacyPolicyPage')) },
  { path: '*', module: 'src/pages/NotFoundPage.tsx', page: lazyPage(() => import('../pages/NotFoundPage')) },
]

export function matchRoute(pathname: string): AppRoute {
  return routes.find((route) => route.path !== '*' && matchPath(route.path, pathname)) ?? routes[routes.length - 1]
}

export const preloadRoute = (pathname: string) => matchRoute(pathname).page.preload()

export const preloadAllRoutes = () => Promise.all(routes.map((route) => route.page.preload()))

/** Path used to prerender dist/404.html. */
export const NOT_FOUND_PATH = '/404'

export interface PrerenderEntry {
  path: string
  /** Include in sitemap.xml. */
  sitemap: boolean
}

/** Every public URL that gets its own static HTML file. */
export function getPrerenderEntries(): PrerenderEntry[] {
  const pages = ['/', '/portfolio', '/services', '/projects', '/academy', '/about', '/contact', '/privacy-policy']
  return [
    ...pages.map((path) => ({ path, sitemap: true })),
    ...visibleProjects.map((project) => ({ path: `/projects/${project.slug}`, sitemap: true })),
    ...visibleCourses.map((course) => ({ path: `/academy/${course.slug}`, sitemap: true })),
    // Testimonials page is noindex until approved testimonials exist.
    { path: '/testimonials', sitemap: visibleTestimonials.length > 0 },
  ]
}
