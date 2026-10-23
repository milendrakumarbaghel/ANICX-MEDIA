import Lenis from 'lenis'
import { useEffect, useSyncExternalStore } from 'react'
import { ScrollTrigger, gsap } from './gsapConfig'
import { useReducedMotion } from './useReducedMotion'

/**
 * One Lenis instance for the whole app, driven by the GSAP ticker so Lenis and
 * ScrollTrigger share a single animation frame loop.
 *
 * - Wheel scrolling is smoothed; touch, keyboard and assistive tech keep
 *   native scrolling (Lenis scrolls the real window, never a transform).
 * - Disabled entirely when the visitor prefers reduced motion.
 * - Elements with `data-lenis-prevent` (modals, menus) scroll natively.
 */

let instance: Lenis | null = null
const listeners = new Set<() => void>()

function setInstance(next: Lenis | null) {
  instance = next
  listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useLenis(): Lenis | null {
  return useSyncExternalStore(
    subscribe,
    () => instance,
    () => null,
  )
}

export function useSmoothScroll() {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      syncTouch: false,
      prevent: (node) => node.closest?.('[data-lenis-prevent]') != null,
    })
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setInstance(lenis)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      setInstance(null)
    }
  }, [reducedMotion])

  // Keep ScrollTrigger positions correct when the page height changes
  // (late-loading fonts, opened accordions, filtered grids).
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const refresh = () => {
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 150)
    }
    const observer = new ResizeObserver(refresh)
    observer.observe(document.body)
    document.fonts?.ready.then(refresh).catch(() => {})
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])
}

/** Scroll helpers that use Lenis when active and native scrolling otherwise. */
export function scrollToTop(immediate = true) {
  if (instance) instance.scrollTo(0, { immediate, force: true })
  else window.scrollTo({ top: 0, behavior: 'instant' })
}

export function scrollToPosition(top: number) {
  if (instance) instance.scrollTo(top, { immediate: true, force: true })
  else window.scrollTo({ top, behavior: 'instant' })
}

/** Scrolls to an element. The fixed header offset comes from CSS `scroll-margin-top`. */
export function scrollToElement(target: HTMLElement) {
  if (instance) {
    instance.scrollTo(target, { force: true })
  } else {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'start' })
  }
}

/** Pauses smooth scrolling while overlays are open. */
export function setScrollLocked(locked: boolean) {
  if (locked) instance?.stop()
  else instance?.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
