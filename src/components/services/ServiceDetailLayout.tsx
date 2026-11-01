import { ArrowLeft, Check, HelpCircle, ListChecks, Users } from 'lucide-react'
import { Link } from 'react-router'
import { services } from '../../data/services'
import { whatsappHref } from '../../data/siteConfig'
import { visibleWork } from '../../lib/content'
import { ProjectEnquiryForm } from '../forms/ProjectEnquiryForm'
import { WorkCard } from '../portfolio/WorkCard'
import { Accordion } from '../ui/Accordion'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { ButtonLink } from '../ui/Button'
import { PageHero } from '../ui/PageHero'
import { SectionHeading } from '../ui/SectionHeading'
import { Seo } from '../../lib/seo'

interface ServiceDetailLayoutProps {
  slug: string
}

export function ServiceDetailLayout({ slug }: ServiceDetailLayoutProps) {
  const service = services.find((s) => s.slug === slug)
  if (!service || !service.detail) return null

  const { detail } = service
  const whatsappUrl = whatsappHref(detail.whatsappMessage)

  // Find relevant samples from workItems
  const samples = visibleWork
    .filter((item) => {
      if (slug === 'animation') return item.category === '3d-animation' || item.category === '2d-animation'
      if (slug === 'web-development') return item.category === 'website-development'
      if (slug === 'video-editing') return item.category === 'video-editing'
      return false
    })
    .slice(0, 3)

  return (
    <>
      <Seo
        title={service.title}
        description={service.summary}
        path={service.pageRoute ?? `/services/${slug}`}
      />

      <PageHero
        eyebrow="ANICX Media Service"
        title={[service.title]}
        intro={service.description}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#1f7a4d] px-6 py-3 text-sm font-semibold text-paper shadow-md transition-transform hover:-translate-y-0.5 hover:bg-[#1a6640]"
            >
              <WhatsAppIcon size={18} />
              <span>Discuss on WhatsApp</span>
            </a>
            <ButtonLink to="#enquiry" variant="secondary">
              Project Enquiry Form
            </ButtonLink>
          </div>
        }
      >
        <div className="mt-8">
          <Link to="/services" className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
            <ArrowLeft size={16} /> All Services Overview
          </Link>
        </div>
      </PageHero>

      {/* Target Audience & Deliverables */}
      <section className="shell pb-16 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Audience */}
          <div className="rounded-[var(--radius-card)] border border-line bg-mist p-7 sm:p-9">
            <div className="flex items-center gap-2.5 text-accent-ink">
              <Users size={20} />
              <h2 className="eyebrow">Who This Is For</h2>
            </div>
            <ul className="mt-6 space-y-3 text-[0.95rem] text-ink/85">
              {detail.audience.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="rounded-[var(--radius-card)] border border-line bg-paper p-7 sm:p-9 shadow-sm">
            <div className="flex items-center gap-2.5 text-accent-ink">
              <ListChecks size={20} />
              <h2 className="eyebrow">Deliverables</h2>
            </div>
            <ul className="mt-6 space-y-3 text-[0.95rem] text-ink/85">
              {detail.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} className="mt-0.5 flex-none text-[#1f7a4d]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Relevant Samples */}
      {samples.length > 0 && (
        <section className="shell border-t border-line py-16 md:py-24">
          <SectionHeading
            eyebrow="Relevant Work"
            title={['Selected Samples', 'In This Category']}
            intro="Genuine projects delivered by ANICX Media."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {samples.map((sample) => (
              <WorkCard key={sample.id} item={sample} />
            ))}
          </div>
        </section>
      )}

      {/* Required Client Inputs & Process */}
      <section className="shell border-t border-line py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="eyebrow">Client Inputs</h2>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              What We Need From You
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Having these inputs ready helps us clarify the scope quickly and provide a concrete quote without guesswork.
            </p>

            <ul className="mt-6 space-y-3 rounded-2xl border border-line bg-mist p-6 text-sm text-ink/85">
              {detail.requiredInputs.map((input) => (
                <li key={input} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-ink" />
                  <span>{input}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h2 className="eyebrow">Production Stages</h2>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              How Your Project Moves Forward
            </h3>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {detail.process.map((stage) => (
                <li key={stage.step} className="py-4">
                  <h4 className="font-display text-base font-semibold text-ink">{stage.step}</h4>
                  <p className="mt-1 text-sm text-muted">{stage.details}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Revision Approach & Scope Boundaries */}
      <section className="shell border-t border-line py-16 md:py-24">
        <div className="rounded-[var(--radius-panel)] border border-line bg-mist p-8 md:p-12">
          <span className="eyebrow text-accent">Scope &amp; Support Policy</span>
          <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
            Revision Approach &amp; Scope Boundaries
          </h2>
          <p className="mt-4 max-w-3xl text-lead text-ink/80">
            {detail.revisionApproach}
          </p>
          <div className="mt-6 grid gap-4 border-t border-line/60 pt-6 sm:grid-cols-2 text-xs text-muted">
            <div>
              <strong className="text-ink">Defined Response Times:</strong> Standard enquiries receive response within 1 business day.
            </div>
            <div>
              <strong className="text-ink">No Exaggerated Promises:</strong> We publish clear, agreed deliverables rather than unverified revenue guarantees or 24/7 availability claims.
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {detail.faqs.length > 0 && (
        <section className="shell border-t border-line py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 text-accent-ink">
                <HelpCircle size={18} />
                <h2 className="eyebrow">FAQs</h2>
              </div>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                Common Questions
              </h3>
            </div>
            <div className="lg:col-span-8">
              <Accordion
                items={detail.faqs.map((faq, idx) => ({
                  id: `faq-${idx}`,
                  title: faq.question,
                  content: <p className="text-sm leading-relaxed text-muted">{faq.answer}</p>,
                }))}
              />
            </div>
          </div>
        </section>
      )}

      {/* Preselected Project Enquiry Form */}
      <section id="enquiry" className="shell border-t border-line py-16 md:py-24">
        <div className="rounded-[var(--radius-panel)] border border-line bg-paper p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="eyebrow text-accent">Get Started</span>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Discuss Your {service.title} Project
            </h2>
            <p className="mt-2 text-sm text-muted">
              Submit your project details below to continue on WhatsApp with our team.
            </p>
          </div>

          <ProjectEnquiryForm presetService={slug} />
        </div>
      </section>
    </>
  )
}

