import { AnimatePresence, m } from 'motion/react'
import { useRef } from 'react'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { useStaggerReveal } from '../../animations/useStaggerReveal'
import { featuredWork } from '../../lib/content'
import { cn } from '../../lib/cn'
import { CategoryFilter } from '../portfolio/CategoryFilter'
import { WorkCard } from '../portfolio/WorkCard'
import { useCategoryFilter } from '../portfolio/useCategoryFilter'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

/** Asymmetric editorial rhythm: wide/narrow pairs with the second item dropped. */
const spans = ['md:col-span-7', 'md:col-span-5 md:mt-28', 'md:col-span-5', 'md:col-span-7 md:mt-28']

export function SelectedWork() {
  const ref = useRef<HTMLElement>(null)
  const { category, setCategory, options, filtered } = useCategoryFilter(featuredWork)
  useScrollReveal(ref)
  useStaggerReveal(ref)

  if (!featuredWork.length) return null

  return (
    <section ref={ref} aria-labelledby="work-title" className="section-y">
      <div className="shell">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title={['Stories We’ve', 'Brought to Life']}
          intro="A selection from our animated series and promotional work: 2D horror stories, 3D desi comedy and trailers."
          actions={
            <ButtonLink to="/portfolio" variant="secondary">
              View all work
            </ButtonLink>
          }
        />

        {options.length > 2 && (
          <div data-reveal className="mt-12">
            <CategoryFilter options={options} value={category} onChange={setCategory} label="Filter selected work" />
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <m.ul
            key={category}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            className="mt-10 grid gap-x-8 gap-y-14 md:mt-14 md:grid-cols-12 md:gap-y-20 lg:gap-x-12"
          >
            {filtered.map((item, index) => (
              <li key={item.id} className={cn('self-start', spans[index % spans.length])}>
                <div data-stagger>
                  <WorkCard
                    item={item}
                    sizes={index % 4 === 0 || index % 4 === 3 ? '(min-width: 768px) 58vw, 100vw' : '(min-width: 768px) 42vw, 100vw'}
                  />
                </div>
              </li>
            ))}
          </m.ul>
        </AnimatePresence>
      </div>
    </section>
  )
}
