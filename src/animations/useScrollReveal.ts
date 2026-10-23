import type { RefObject } from 'react'
import { DURATION, EASE, MEDIA, REVEAL_START, gsap, useGSAP } from './gsapConfig'

interface ScrollRevealOptions {
  /** Elements to reveal inside the scope. Each gets its own trigger. */
  selector?: string
  y?: number
  duration?: number
  delay?: number
}

/**
 * Fades and lifts elements into view as they enter the viewport.
 *
 * Content is fully visible in the HTML; the hidden "from" state is applied by
 * JavaScript only when motion is allowed, so nothing is lost if JS fails.
 * Elements matching `[data-reveal-lines]` get a line-mask headline reveal instead.
 */
export function useScrollReveal(
  scope: RefObject<HTMLElement | null>,
  { selector = '[data-reveal]', y = 28, duration = DURATION.section, delay = 0 }: ScrollRevealOptions = {},
) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motionOk, () => {
        gsap.utils.toArray<HTMLElement>(selector, root).forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y,
            duration,
            delay,
            ease: EASE.strong,
            scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
          })
        })

        gsap.utils.toArray<HTMLElement>('[data-reveal-lines]', root).forEach((el) => {
          gsap.from(el.querySelectorAll('[data-line]'), {
            yPercent: 115,
            duration: DURATION.text,
            ease: EASE.expo,
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
          })
        })
      })
    },
    { scope },
  )
}
