import { ArrowRight, Check, Box, Globe, Clapperboard, Megaphone } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useStaggerReveal } from '../animations/useStaggerReveal'
import { ButtonLink } from '../components/ui/Button'
import { ContactCta } from '../components/ui/ContactCta'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { WhatsAppIcon } from '../components/ui/BrandIcons'
import { services } from '../data/services'
import { whatsappHref } from '../data/siteConfig'
import { workflow } from '../data/studio'
import { Seo } from '../lib/seo'

export default function ServicesPage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref)

  const iconMap = {
    'box': Box,
    'globe': Globe,
    'clapperboard': Clapperboard,
    'megaphone': Megaphone,
  }

  return (
    <>
      <Seo
        title="Services Overview"
        description="Animation, business websites, video editing and training by ANICX MEDIA. Clear deliverables, realistic timelines, and collaborative production."
        path="/services"
      />
      <PageHero
        eyebrow="ANICX Media Services"
        title={['Creative Solutions.', 'Systematic Delivery.']}
        intro="Explore our dedicated capabilities across animation production, modern business websites, and video editing. Every service is grounded in clear deliverables without inflated claims."
        actions={<ButtonLink to="/contact?enquiry=project#enquiry">Start a Project</ButtonLink>}
      />

      <div ref={ref}>
        {/* Navigation to dedicated service pages */}
        <nav aria-label="Services overview" className="shell pb-10">
          <ul className="flex flex-wrap gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                {service.pageRoute ? (
                  <Link
                    to={service.pageRoute}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold transition-colors hover:border-ink"
                  >
                    <span>{service.title}</span>
                    <ArrowRight size={13} />
                  </Link>
                ) : (
                  <a
                    href={`#${service.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-mist px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
                  >
                    <span>{service.title}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Detailed Service Cards */}
        <div className="shell flex flex-col gap-12">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Box
            const whatsappMsg = service.detail?.whatsappMessage ?? 'Hello ANICX Media! I would like to know more about your services.'
            return (
              <section
                key={service.slug}
                id={service.slug}
                aria-labelledby={`${service.slug}-title`}
                className="grid gap-8 rounded-[var(--radius-panel)] border border-line bg-paper p-8 lg:grid-cols-12 lg:p-12 shadow-sm"
              >
                <div className="flex flex-col justify-between lg:col-span-5" data-reveal>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-mist text-ink">
                        <Icon size={22} />
                      </span>
                      {service.availabilityOnly && (
                        <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-ink">
                          Enquire About Availability
                        </span>
                      )}
                    </div>
                    <h2 id={`${service.slug}-title`} className="mt-4 font-display text-3xl font-medium tracking-tight text-ink">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-lead text-ink/80">
                      {service.summary}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {service.pageRoute ? (
                      <ButtonLink to={service.pageRoute}>
                        View Dedicated Service Page
                      </ButtonLink>
                    ) : (
                      <ButtonLink to={`/contact?enquiry=project&service=${service.slug}#enquiry`}>
                        Enquire About Availability
                      </ButtonLink>
                    )}

                    <a
                      href={whatsappHref(whatsappMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-[#1f7a4d] hover:text-[#1f7a4d]"
                    >
                      <WhatsAppIcon size={15} />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7" data-reveal>
                  <p className="eyebrow text-accent-ink">Included Scope</p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {service.includes.map((entry) => (
                      <li key={entry} data-stagger className="flex items-start gap-2.5 rounded-xl bg-mist p-3.5 text-sm text-ink/85">
                        <Check size={16} className="mt-0.5 flex-none text-[#1f7a4d]" aria-hidden="true" />
                        <span>{entry}</span>
                      </li>
                    ))}
                  </ul>

                  {service.detail && (
                    <div className="rounded-xl border border-line/60 bg-mist/50 p-4 text-xs text-muted">
                      <p className="font-semibold text-ink">Scope Boundaries &amp; Revision Approach:</p>
                      <p className="mt-1">{service.detail.revisionApproach}</p>
                    </div>
                  )}
                </div>
              </section>
            )
          })}
        </div>

        {/* 5-Step Process */}
        <section aria-labelledby="process-title" className="section-y mt-16 bg-mist">
          <div className="shell">
            <SectionHeading
              id="process-title"
              eyebrow="Workflow"
              title={['How We Work', 'Five Collaborative Steps']}
              intro="Discuss → Plan & Quote → Create → Review → Deliver"
            />
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {workflow.map((step, index) => (
                <li key={step.title} data-stagger className="flex flex-col gap-3 rounded-[var(--radius-card)] bg-paper p-6 shadow-sm">
                  <span className="font-display text-sm font-semibold text-accent-ink">0{index + 1}</span>
                  <h3 className="font-display text-xl font-medium tracking-tight text-ink">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <div className="pt-8">
        <ContactCta />
      </div>
    </>
  )
}
