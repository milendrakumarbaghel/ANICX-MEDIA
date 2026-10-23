import type { RefObject } from 'react'
import { DURATION, EASE, MEDIA, gsap, useGSAP } from './gsapConfig'

/**
 * Page entrance timeline (hero and page headers).
 *
 * Elements marked `data-intro` are revealed in DOM order:
 * - containing `[data-line]` children → lines rise through overflow masks
 * - `data-intro="image"`              → soft clip-path mask reveal
 * - anything else                     → fade and lift
 *
 * First page load: only sections marked `data-intro-root` (the homepage hero)
 * animate. CSS hides their text before JS runs (styles/index.css) and keeps
 * images visible-but-masked so LCP is not delayed. Other page headers render
 * immediately on a cold load, which keeps their LCP fast.
 *
 * Client-side navigation: every header animates. The hidden "from" state is
 * applied in a layout effect, before the browser paints, so nothing flashes.
 *
 * If the app booted late (`js-fallback`), content is already visible and the
 * intro is skipped instead of hiding it again.
 */
let firstLoadComplete = false

/** Called once the app has hydrated; later page mounts are client-side navigations. */
export function markFirstLoadComplete() {
  firstLoadComplete = true
}

export function useIntro(scope: RefObject<HTMLElement | null>, { delay = 0.05 }: { delay?: number } = {}) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const elements = gsap.utils.toArray<HTMLElement>('[data-intro]', root)
      const animateOnFirstLoad = root.hasAttribute('data-intro-root')
      const skip =
        document.documentElement.classList.contains('js-fallback') || (!firstLoadComplete && !animateOnFirstLoad)

      const mm = gsap.matchMedia()
      mm.add({ motion: MEDIA.motionOk, reduce: '(prefers-reduced-motion: reduce)' }, (context) => {
        if (!context.conditions?.motion || skip) {
          if (animateOnFirstLoad) gsap.set(elements, { opacity: 1 })
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
            // Matches the CSS pre-state, so there is no jump when JS takes over.
            // End states stay inline (no clearProps): they override the CSS pre-state.
            const media = el.querySelector('img')
            tl.fromTo(
              el,
              { clipPath: 'inset(10% 6% 10% 6% round 32px)' },
              { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: DURATION.image, ease: EASE.expo },
              position,
            )
            if (media) {
              tl.fromTo(media, { scale: 1.16 }, { scale: 1, duration: 1.4, ease: EASE.expo }, position)
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
