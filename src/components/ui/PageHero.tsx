import { useRef, type ReactNode } from 'react'
import { useIntro } from '../../animations/useIntro'
import { cn } from '../../lib/cn'

interface PageHeroProps {
  eyebrow: string
  title: string[]
  intro?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
  className?: string
  children?: ReactNode
}

/** Header for inner pages, with the shared entrance timeline. */
export function PageHero({ eyebrow, title, intro, actions, aside, className, children }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  useIntro(ref)

  return (
    <section ref={ref} className={cn('shell pb-14 pt-12 md:pb-20 md:pt-20', className)}>
      <p className="eyebrow flex items-center gap-2.5" data-intro>
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        {eyebrow}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-end">
        <h1 className={cn('text-display', aside ? 'lg:col-span-8' : 'lg:col-span-10')} data-intro>
          {title.map((line, index) => (
            <span key={index} className="line-mask">
              {index > 0 && ' '}
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>
        {aside && (
          <div className="lg:col-span-4 lg:pb-2" data-intro>
            {aside}
          </div>
        )}
      </div>
      {(intro || actions) && (
        <div className="mt-8 flex flex-col gap-8 md:mt-10 lg:flex-row lg:items-end lg:justify-between">
          {intro && (
            <div className="max-w-2xl text-lead text-muted" data-intro>
              {intro}
            </div>
          )}
          {actions && (
            <div className="flex flex-wrap gap-3" data-intro>
              {actions}
            </div>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
