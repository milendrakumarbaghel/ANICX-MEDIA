import { useRef, type ReactNode } from 'react'
import { MEDIA, gsap, useGSAP } from '../../animations/gsapConfig'
import { cn } from '../../lib/cn'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  /** How far the button follows the pointer (0–1 of the pointer offset). */
  strength?: number
}

/**
 * Subtle magnetic pull toward the pointer on desktop. Wraps a button or link;
 * it only moves the wrapper, so the child's own hover styles still apply.
 */
export function MagneticButton({ children, className, strength = 0.25 }: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(MEDIA.finePointer, () => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect()
          xTo((event.clientX - (rect.left + rect.width / 2)) * strength)
          yTo((event.clientY - (rect.top + rect.height / 2)) * strength)
        }
        const onLeave = () => {
          xTo(0)
          yTo(0)
        }
        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        return () => {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
        }
      })
    },
    { scope: ref },
  )

  return (
    <span ref={ref} className={cn('inline-flex will-change-transform', className)}>
      {children}
    </span>
  )
}
