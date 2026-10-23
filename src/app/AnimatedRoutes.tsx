import { AnimatePresence, m } from 'motion/react'
import { Suspense, useCallback, useEffect, useRef } from 'react'
import { Route, Routes, useLocation, useNavigationType } from 'react-router'
import { scrollToElement, scrollToPosition, scrollToTop } from '../animations/smoothScroll'
import { routes } from './routes'

const ENTER = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
const EXIT = { duration: 0.2, ease: [0.4, 0, 1, 1] as const }

/** Remembers scroll positions per history entry for back/forward navigation. */
const savedPositions = new Map<string, number>()

/**
 * Route switcher with a brief fade/lift transition. Navigation is never
 * blocked: the exit is 0.2s, and pages are preloaded in the background.
 */
export function AnimatedRoutes() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const keyRef = useRef(location.key)

  // Track the scroll position of the current history entry.
  useEffect(() => {
    keyRef.current = location.key
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => savedPositions.set(keyRef.current, window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [location.key])

  // Runs after the old page has left and before the new one appears.
  const onExitComplete = useCallback(() => {
    const saved = savedPositions.get(location.key)
    if (navigationType === 'POP' && saved !== undefined) scrollToPosition(saved)
    else if (!location.hash) scrollToTop()
  }, [location.key, location.hash, navigationType])

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
      <m.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0, transition: ENTER }}
        exit={{ opacity: 0, y: -6, transition: EXIT }}
      >
        <RouteFocusAndHash />
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <Routes location={location}>
            {routes.map(({ path, page }) => (
              <Route key={path} path={path} element={<page.Component />} />
            ))}
          </Routes>
        </Suspense>
      </m.div>
    </AnimatePresence>
  )
}

/**
 * After each navigation: scroll to `#hash` targets, or move focus to <main>
 * so screen-reader users land at the start of the new page.
 */
function RouteFocusAndHash() {
  const { hash, key } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    const isFirstRender = first.current
    first.current = false

    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Wait a frame so the page (and any lazy content) has laid out.
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(id)
        if (target) scrollToElement(target)
      })
      return () => cancelAnimationFrame(frame)
    }
    if (!isFirstRender || key !== 'default') {
      document.getElementById('main')?.focus({ preventScroll: true })
    }
  }, [hash, key])

  return null
}
