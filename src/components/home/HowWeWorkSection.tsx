import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { useStaggerReveal } from '../../animations/useStaggerReveal'
import { workflow } from '../../data/studio'
import { SectionHeading } from '../ui/SectionHeading'

export function HowWeWorkSection() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref, { y: 24, stagger: 0.08 })

  return (
    <section ref={ref} aria-labelledby="workflow-title" className="section-y">
      <div className="shell">
        <SectionHeading
          id="workflow-title"
          eyebrow="Workflow"
          title={['How We Work', 'From First Call to Delivery']}
          intro="A systematic, five-step collaborative workflow so you always know milestones, review stages and delivery timelines."
        />

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {workflow.map((step, index) => (
            <li
              key={step.title}
              data-stagger
              className="relative flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-mist p-6 transition-all hover:border-ink hover:bg-paper"
            >
              <div>
                <span className="font-display text-sm font-semibold text-accent-ink">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </div>

              {index < workflow.length - 1 && (
                <div aria-hidden="true" className="hidden pt-6 text-muted/40 lg:block">
                  <ArrowRight size={18} />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

