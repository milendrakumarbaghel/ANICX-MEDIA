import type { SyllabusModule } from '../../types/content'
import { Accordion } from '../ui/Accordion'

interface SyllabusAccordionProps {
  modules: SyllabusModule[]
  defaultOpenFirst?: boolean
  className?: string
}

export function SyllabusAccordion({ modules, defaultOpenFirst = true, className }: SyllabusAccordionProps) {
  if (!modules.length) return null
  return (
    <Accordion
      className={className}
      multiple
      defaultOpen={defaultOpenFirst ? ['module-0'] : []}
      items={modules.map((module, index) => ({
        id: `module-${index}`,
        kicker: `Module ${String(index + 1).padStart(2, '0')}`,
        title: module.title,
        content: (
          <ul className="flex flex-col gap-2">
            {module.topics.map((topic) => (
              <li key={topic} className="flex gap-3">
                <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-accent" aria-hidden="true" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        ),
      }))}
    />
  )
}
