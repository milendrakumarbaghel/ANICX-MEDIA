import type { RefObject } from 'react'
import { MEDIA, gsap, useGSAP } from './gsapConfig'

interface ParallaxOptions {
  selector?: string
  /** Travel in percent of the element's height, in each direction. */
  amount?: number
}

/**
 * Gentle scroll-linked parallax for selected images. Desktop only and
 * disabled for reduced motion. Only `transform` is animated, so it stays
 * on the compositor. A per-element `data-parallax="10"` overrides `amount`.
 */
export function useParallax(
  scope: RefObject<HTMLElement | null>,
  { selector = '[data-parallax]', amount = 6 }: ParallaxOptions = {},
) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MEDIA.desktopMotion, () => {
        gsap.utils.toArray<HTMLElement>(selector, root).forEach((el) => {
          const travel = Number(el.dataset.parallax) || amount
          gsap.fromTo(
            el,
            { yPercent: -travel },
            {
              yPercent: travel,
              ease: 'none',
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            },
          )
        })
      })
    },
    { scope },
  )
}
