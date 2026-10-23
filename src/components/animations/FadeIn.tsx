import { useRef, type ReactNode } from 'react'
import { useScrollReveal } from '../../animations/useScrollReveal'

interface FadeInProps {
  children: ReactNode
  className?: string
  y?: number
  delay?: number
}

/** Fades and lifts its content in once it scrolls into view. */
export function FadeIn({ children, className, y, delay }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  useScrollReveal(ref, { selector: '[data-fade]', y, delay })
  return (
    <div ref={ref} className={className}>
      <div data-fade>{children}</div>
    </div>
  )
}
