import { useRef, type ElementType, type ReactNode } from 'react'
import { useStaggerReveal } from '../../animations/useStaggerReveal'

interface StaggerContainerProps {
  children: ReactNode
  as?: 'div' | 'ul' | 'ol' | 'section'
  className?: string
  /** Children marked with this attribute selector are revealed in sequence. */
  selector?: string
  y?: number
}

/**
 * Wraps a group of items and reveals the ones marked `data-stagger` in a
 * light sequence as they scroll into view.
 */
export function StaggerContainer({ children, as = 'div', className, selector, y }: StaggerContainerProps) {
  const ref = useRef<HTMLElement>(null)
  const Tag = as as ElementType
  useStaggerReveal(ref, { selector, y })
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
