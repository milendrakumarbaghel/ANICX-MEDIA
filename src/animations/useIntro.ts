import type { RefObject } from 'react'
import { DURATION, EASE, MEDIA, gsap, useGSAP } from './gsapConfig'

/**
 * Page entrance timeline (hero and page headers).
 *
 * Elements marked `data-intro` are hidden by CSS before JS runs (only when
 * motion is allowed; see styles/index.css), then revealed in DOM order:
 * - containing `[data-line]` children → lines rise through overflow masks
 * - `data-intro="image"`              → soft clip-path mask reveal
 * - anything else                     → fade and lift
 *
 * If the app booted late (`js-fallback`), content is already visible and the
 * intro is skipped instead of hiding it again.
 */
export function useIntro(scope: RefObject<HTMLElement | null>, { delay = 0.05 }: { delay?: number } = {}) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const elements = gsap.utils.toArray<HTMLElement>('[data-intro]', root)
      const skip = document.documentElement.classList.contains('js-fallback')

      const mm = gsap.matchMedia()
      mm.add({ motion: MEDIA.motionOk, reduce: '(prefers-reduced-motion: reduce)' }, (context) => {
        if (!context.conditions?.motion || skip) {
          gsap.set(elements, { opacity: 1 })
          return
        }

        const tl = gsap.timeline({ delay, defaults: { ease: EASE.strong } })
        let position = 0

        elements.forEach((el) => {
          const lines = el.querySelectorAll('[data-line]')
          if (lines.length) {
            tl.set(el, { opacity: 1 }, position)
            tl.fromTo(
              lines,
              { yPercent: 115 },
              { yPercent: 0, duration: DURATION.text, ease: EASE.expo, stagger: 0.1 },
              position,
            )
            position += 0.12 + lines.length * 0.08
          } else if (el.dataset.intro === 'image') {
            const media = el.querySelector('img')
            tl.fromTo(
              el,
              { opacity: 1, clipPath: 'inset(10% 6% 10% 6% round 32px)' },
              { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: DURATION.image, ease: EASE.expo, clearProps: 'clipPath' },
              position,
            )
            if (media) {
              tl.fromTo(media, { scale: 1.16 }, { scale: 1, duration: 1.4, ease: EASE.expo, clearProps: 'transform' }, position)
            }
            position += 0.15
          } else {
            tl.fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, position)
            position += 0.1
          }
        })
      })
    },
    { scope },
  )
}
