import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { RevealText } from '../animations/RevealText'

interface SectionHeadingProps {
  eyebrow?: string
  /** One string per line for the masked reveal. */
  title: string[]
  intro?: ReactNode
  as?: 'h1' | 'h2'
  size?: 'display' | 'title'
  align?: 'left' | 'center'
  actions?: ReactNode
  className?: string
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as = 'h2',
  size = 'title',
  align = 'left',
  actions,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <header className={cn('flex flex-col gap-6', align === 'center' && 'items-center text-center', className)}>
      {eyebrow && (
        <p className="eyebrow flex items-center gap-2.5" data-reveal>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <div id={id}>
        <RevealText as={as} lines={title} className={size === 'display' ? 'text-display' : 'text-title'} />
      </div>
      {(intro || actions) && (
        <div
          className={cn(
            'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
            align === 'center' && 'md:flex-col md:items-center',
          )}
        >
          {intro && (
            <div className="max-w-2xl text-lead text-muted" data-reveal>
              {intro}
            </div>
          )}
          {actions && <div className="flex flex-wrap gap-3" data-reveal>{actions}</div>}
        </div>
      )}
    </header>
  )
}
