import { Check } from 'lucide-react'
import { useRef } from 'react'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useStaggerReveal } from '../animations/useStaggerReveal'
import { ButtonLink } from '../components/ui/Button'
import { ContactCta } from '../components/ui/ContactCta'
import { DraftBadge } from '../components/ui/DraftBadge'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ServiceIcon } from '../components/ui/ServiceIcon'
import { workflow } from '../data/studio'
import { isDraft, visibleServices } from '../lib/content'
import { Seo } from '../lib/seo'

export default function ServicesPage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref)

  return (
    <>
      <Seo
        title="Services"
        description="2D and 3D animation, product animation, video editing and reels, promotional videos, branding, digital marketing and social media management by ANICX MEDIA."
        path="/services"
      />
      <PageHero
        eyebrow="Services"
        title={['Creative Solutions', 'for Every Vision']}
        intro="Animation, video and brand services from one studio. Choose a single service or combine them for a complete campaign."
        actions={<ButtonLink to="/contact?enquiry=project#enquiry">Start a project</ButtonLink>}
      />

      <div ref={ref}>
        <nav aria-label="Services on this page" className="shell pb-10">
          <ul className="flex flex-wrap gap-2">
            {visibleServices.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="inline-flex rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shell flex flex-col">
          {visibleServices.map((service, index) => (
            <section
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className="grid gap-8 border-t border-line py-14 md:py-20 lg:grid-cols-12"
            >
              <div className="flex items-start gap-5 lg:col-span-5" data-reveal>
                <span className="grid h-14 w-14 flex-none place-items-center rounded-2xl bg-mist">
                  <ServiceIcon name={service.icon} size={24} />
                </span>
                <div>
                  <p className="text-xs font-semibold tabular-nums text-muted">{String(index + 1).padStart(2, '0')}</p>
                  <h2 id={`${service.slug}-title`} className="mt-1 text-title">
                    {service.title}
                  </h2>
                  {isDraft(service) && <DraftBadge className="mt-3" />}
                </div>
              </div>
              <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
                <p className="text-lead text-ink/80" data-reveal>
                  {service.description}
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {service.includes.map((entry) => (
                    <li key={entry} data-stagger className="flex items-center gap-3 rounded-xl bg-mist px-4 py-3 text-[0.95rem]">
                      <Check size={16} className="flex-none text-accent-ink" aria-hidden="true" />
                      {entry}
                    </li>
                  ))}
                </ul>
                <div data-reveal>
                  <ButtonLink to={`/contact?enquiry=project&service=${service.slug}#enquiry`} variant="secondary" compact>
                    Discuss {service.title.toLowerCase()}
                  </ButtonLink>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section aria-labelledby="process-title" className="section-y mt-10 bg-mist">
          <div className="shell">
            <SectionHeading id="process-title" eyebrow="Process" title={['How a Project', 'Comes Together']} />
            <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {workflow.map((step, index) => (
                <li key={step.title} data-stagger className="flex flex-col gap-3 rounded-[var(--radius-card)] bg-paper p-7">
                  <span className="font-display text-sm font-medium text-accent-ink">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-xl font-medium tracking-tight">{step.title}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <div className="pt-16">
        <ContactCta />
      </div>
    </>
  )
}
