import { LazyMotion, MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { useSmoothScroll } from '../animations/smoothScroll'
import { useRevealOnFocus } from '../animations/useRevealOnFocus'
import { SiteLayout } from '../components/layout/SiteLayout'
import { AnimatedRoutes } from './AnimatedRoutes'
import { preloadAllRoutes } from './routes'

const loadMotionFeatures = () => import('./motionFeatures').then((module) => module.default)

export function App() {
  useSmoothScroll()
  useRevealOnFocus()

  // Warm the remaining page chunks while the browser is idle so later
  // navigations are instant. The site is small, so this costs little.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500))
    const cancel = window.cancelIdleCallback ?? window.clearTimeout
    const handle = idle(() => void preloadAllRoutes())
    return () => cancel(handle)
  }, [])

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <SiteLayout>
          <AnimatedRoutes />
        </SiteLayout>
      </MotionConfig>
    </LazyMotion>
  )
}
