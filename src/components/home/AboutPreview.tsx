import { MapPin } from 'lucide-react'
import { useRef } from 'react'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { useStaggerReveal } from '../../animations/useStaggerReveal'
import { locationLabel } from '../../data/siteConfig'
import { capabilities, studioIntro, workflow } from '../../data/studio'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

export function AboutPreview() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref, { y: 30, stagger: 0.1 })

  return (
    <section ref={ref} aria-labelledby="about-title" className="section-y">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="about-title" eyebrow="About the studio" title={['Creativity', 'Meets Craft.']} />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-6 lg:pt-16">
            {studioIntro.map((paragraph) => (
              <p key={paragraph} className="text-lead text-ink/80" data-reveal>
                {paragraph}
              </p>
            ))}
            <p className="flex items-center gap-2 text-sm font-medium text-muted" data-reveal>
              <MapPin size={16} aria-hidden="true" /> {locationLabel}
            </p>
            <div data-reveal>
              <ButtonLink to="/about" variant="secondary">
                More about us
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-12 border-t border-line pt-12 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <h3 className="eyebrow mb-5">What we do</h3>
            <ul className="flex flex-wrap gap-2">
              {capabilities.map((capability) => (
                <li key={capability} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink/80">
                  {capability}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <h3 className="eyebrow mb-5" data-reveal>
              How a project comes together
            </h3>
            <ol className="grid gap-4 sm:grid-cols-2">
              {workflow.map((step, index) => (
                <li key={step.title} data-stagger className="flex flex-col gap-3 rounded-[var(--radius-card)] bg-mist p-6">
                  <span className="font-display text-sm font-medium text-accent-ink">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl font-medium tracking-tight">{step.title}</span>
                  <span className="text-[0.95rem] leading-relaxed text-muted">{step.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
