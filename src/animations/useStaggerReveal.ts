import type { RefObject } from 'react'
import { DURATION, EASE, MEDIA, REVEAL_START, STAGGER, ScrollTrigger, gsap, useGSAP } from './gsapConfig'

interface StaggerRevealOptions {
  selector?: string
  y?: number
  stagger?: number
}

/**
 * Reveals groups of items (cards, list rows) with a light stagger. Uses
 * ScrollTrigger.batch so items entering together animate together, which is
 * cheaper than one trigger per item and looks right on every grid layout.
 */
export function useStaggerReveal(
  scope: RefObject<HTMLElement | null>,
  { selector = '[data-stagger]', y = 40, stagger = STAGGER.base }: StaggerRevealOptions = {},
) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motionOk, () => {
        const items = gsap.utils.toArray<HTMLElement>(selector, root)
        if (!items.length) return
        gsap.set(items, { opacity: 0, y })
        ScrollTrigger.batch(items, {
          start: REVEAL_START,
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: DURATION.card,
              ease: EASE.strong,
              stagger,
              overwrite: true,
            }),
        })
      })
    },
    { scope },
  )
}
