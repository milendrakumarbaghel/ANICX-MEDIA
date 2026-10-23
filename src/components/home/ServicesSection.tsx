import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { useStaggerReveal } from '../../animations/useStaggerReveal'
import { visibleServices } from '../../lib/content'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceIcon } from '../ui/ServiceIcon'

/**
 * Editorial service rows. Every row is readable without hover; hover only adds
 * a background wash, icon nudge and arrow movement.
 */
export function ServicesSection() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref, { y: 24, stagger: 0.07 })

  return (
    <section ref={ref} aria-labelledby="services-title" className="section-y bg-mist">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          {/* Sticky intro: a light, CSS-only "pinned" storytelling column. */}
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="services-title"
              eyebrow="Services"
              title={['Creative Solutions', 'for Every Vision']}
              intro="From a single reel to a full animated series: animation, video and brand work under one roof."
            />
            <div className="mt-8" data-reveal>
              <ButtonLink to="/services" variant="secondary">
                All services
              </ButtonLink>
            </div>
          </div>
        </div>

        <ol className="border-t border-line lg:col-span-8">
          {visibleServices.map((service, index) => (
            <li key={service.slug} data-stagger className="border-b border-line">
              <Link
                to={`/services#${service.slug}`}
                className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-2 px-1 py-7 sm:gap-x-8 sm:px-4 md:py-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-0 origin-bottom scale-y-0 rounded-2xl bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
                />
                <span className="relative pt-1.5 text-xs font-semibold tabular-nums text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="relative flex flex-col gap-2">
                  <span className="flex items-center gap-3">
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line bg-paper transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-6 group-hover:scale-110">
                      <ServiceIcon name={service.icon} size={18} />
                    </span>
                    <span className="font-display text-heading font-medium">{service.title}</span>
                  </span>
                  <span className="max-w-xl text-[0.95rem] leading-relaxed text-muted">{service.summary}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-1 grid h-10 w-10 place-items-center rounded-full border border-line transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
                >
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
