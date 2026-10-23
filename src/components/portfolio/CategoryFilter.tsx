import { m } from 'motion/react'
import { useId } from 'react'
import { cn } from '../../lib/cn'

export interface FilterOption {
  id: string
  label: string
  count: number
}

interface CategoryFilterProps {
  options: FilterOption[]
  value: string
  onChange: (id: string) => void
  label?: string
  className?: string
}

/** Pill filter group. Buttons with aria-pressed; the active pill slides between options. */
export function CategoryFilter({ options, value, onChange, label = 'Filter projects by category', className }: CategoryFilterProps) {
  const layoutId = useId()
  return (
    <div role="group" aria-label={label} className={cn('-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]', className)}>
      {options.map((option) => {
        const active = option.id === value
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={cn(
              'relative isolate flex-none whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300',
              active ? 'border-ink text-paper' : 'border-line text-ink/80 hover:border-ink/40 hover:text-ink',
            )}
          >
            {active && (
              <m.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 rounded-full bg-ink"
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
            )}
            {option.label}
            <span className={cn('ml-2 text-xs tabular-nums', active ? 'text-paper/70' : 'text-muted')}>{option.count}</span>
          </button>
        )
      })}
    </div>
  )
}
