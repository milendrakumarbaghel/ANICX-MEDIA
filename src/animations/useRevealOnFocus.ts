import { useEffect } from 'react'
import { gsap } from './gsapConfig'

const REVEALABLE = '[data-reveal], [data-stagger], [data-fade], [data-intro]'

/**
 * Accessibility safety net for scroll reveals: if keyboard focus lands inside
 * content that has not been revealed yet, reveal it immediately so the focused
 * element is never invisible.
 */
export function useRevealOnFocus() {
  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      let el = (event.target as Element | null)?.closest(REVEALABLE)
      while (el) {
        if (Number(getComputedStyle(el).opacity) < 1) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.25, overwrite: true })
        }
        el = el.parentElement?.closest(REVEALABLE) ?? null
      }
    }
    document.addEventListener('focusin', onFocusIn)
    return () => document.removeEventListener('focusin', onFocusIn)
  }, [])
}
