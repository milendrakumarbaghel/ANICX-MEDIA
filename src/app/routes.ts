import { matchPath } from 'react-router'
import { visibleCourses, visibleProjects } from '../lib/content'
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
  {
    path: '/services/animation',
    module: 'src/pages/services/AnimationPage.tsx',
    page: lazyPage(() => import('../pages/services/AnimationPage')),
  },
  {
    path: '/services/web-development',
    module: 'src/pages/services/WebDevPage.tsx',
    page: lazyPage(() => import('../pages/services/WebDevPage')),
  },
  {
    path: '/services/video-editing',
    module: 'src/pages/services/VideoEditingPage.tsx',
    page: lazyPage(() => import('../pages/services/VideoEditingPage')),
  },
  { path: '/portfolio', module: 'src/pages/PortfolioPage.tsx', page: lazyPage(() => import('../pages/PortfolioPage')) },
  { path: '/projects', module: 'src/pages/ProjectsRedirect.tsx', page: lazyPage(() => import('../pages/ProjectsRedirect')) },
  { path: '/projects/:slug', module: 'src/pages/ProjectDetailPage.tsx', page: lazyPage(() => import('../pages/ProjectDetailPage')) },
  { path: '/academy', module: 'src/pages/AcademyPage.tsx', page: lazyPage(() => import('../pages/AcademyPage')) },
  { path: '/academy/:slug', module: 'src/pages/CourseDetailPage.tsx', page: lazyPage(() => import('../pages/CourseDetailPage')) },
  { path: '/about', module: 'src/pages/AboutPage.tsx', page: lazyPage(() => import('../pages/AboutPage')) },
  { path: '/contact', module: 'src/pages/ContactPage.tsx', page: lazyPage(() => import('../pages/ContactPage')) },
  { path: '/privacy-policy', module: 'src/pages/PrivacyPolicyPage.tsx', page: lazyPage(() => import('../pages/PrivacyPolicyPage')) },
  { path: '*', module: 'src/pages/NotFoundPage.tsx', page: lazyPage(() => import('../pages/NotFoundPage')) },
]

export function matchRoute(pathname: string): AppRoute {
  return routes.find((route) => route.path !== '*' && matchPath(route.path, pathname)) ?? routes[routes.length - 1]
}

export const preloadRoute = (pathname: string) => {
  const route = matchRoute(pathname)
  if ('preload' in route.page && typeof route.page.preload === 'function') {
    return (route.page as LazyPage).preload()
  }
  return Promise.resolve()
}

export const preloadAllRoutes = () =>
  Promise.all(
    routes.map((route) => {
      if ('preload' in route.page && typeof route.page.preload === 'function') {
        return (route.page as LazyPage).preload()
      }
      return Promise.resolve()
    }),
  )

/** Path used to prerender dist/404.html. */
export const NOT_FOUND_PATH = '/404'

export interface PrerenderEntry {
  path: string
  /** Include in sitemap.xml. */
  sitemap: boolean
}

/** Every public URL that gets its own static HTML file. */
export function getPrerenderEntries(): PrerenderEntry[] {
  const pages = [
    { path: '/', sitemap: true },
    { path: '/services', sitemap: true },
    { path: '/services/animation', sitemap: true },
    { path: '/services/web-development', sitemap: true },
    { path: '/services/video-editing', sitemap: true },
    { path: '/portfolio', sitemap: true },
    { path: '/projects', sitemap: false },
    { path: '/academy', sitemap: true },
    { path: '/about', sitemap: true },
    { path: '/contact', sitemap: true },
    { path: '/privacy-policy', sitemap: true },
  ]

  return [
    ...pages,
    ...visibleProjects.map((project) => ({ path: `/projects/${project.slug}`, sitemap: true })),
    ...visibleCourses.map((course) => ({ path: `/academy/${course.slug}`, sitemap: true })),
  ]
}
