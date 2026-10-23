import { Plus } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { useId, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface AccordionItem {
  id: string
  title: ReactNode
  /** Small label shown before the title, e.g. "Module 01". */
  kicker?: string
  content: ReactNode
  badge?: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  /** Allow several panels open at once. */
  multiple?: boolean
  defaultOpen?: string[]
  className?: string
  headingLevel?: 'h3' | 'h4'
}

/** Accessible disclosure list with animated height (Motion). */
export function Accordion({ items, multiple = false, defaultOpen = [], className, headingLevel = 'h3' }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen)
  const baseId = useId()
  const Heading = headingLevel

  const toggle = (id: string) =>
    setOpen((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : multiple ? [...current, id] : [id],
    )

  return (
    <div className={cn('divide-y divide-line border-y border-line', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id)
        const buttonId = `${baseId}-${item.id}-button`
        const panelId = `${baseId}-${item.id}-panel`
        return (
          <div key={item.id}>
            <Heading className="m-0 font-sans text-base font-normal">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex w-full items-center gap-4 py-5 text-left transition-colors focus-visible:outline-offset-[-2px] sm:py-6"
              >
                {item.kicker && (
                  <span className="w-20 flex-none text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {item.kicker}
                  </span>
                )}
                <span className="flex flex-1 flex-wrap items-center gap-3 font-display text-lg font-medium tracking-tight sm:text-xl">
                  {item.title}
                  {item.badge}
                </span>
                <span
                  className={cn(
                    'grid h-10 w-10 flex-none place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-ink',
                    isOpen && 'border-ink bg-ink text-paper',
                  )}
                  aria-hidden="true"
                >
                  <Plus size={18} className={cn('transition-transform duration-300', isOpen && 'rotate-45')} />
                </span>
              </button>
            </Heading>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className={cn('pb-6 text-muted', item.kicker && 'sm:pl-24')}>{item.content}</div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
