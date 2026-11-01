import { ArrowUpRight, Box, Globe, GraduationCap } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { useStaggerReveal } from '../../animations/useStaggerReveal'
import { whatsappHref, WHATSAPP_TEMPLATES } from '../../data/siteConfig'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { WhatsAppIcon } from '../ui/BrandIcons'

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref, { y: 24, stagger: 0.1 })

  const serviceCards = [
    {
      title: 'Animation Studio',
      icon: Box,
      route: '/services/animation',
      scope: '3D character/cartoon animation, 2D animation, explainers, promotional animation and production support.',
      deliverables: [
        '3D character & cartoon series',
        '2D story & folktale animation',
        'Business explainers & promos',
        'Modeling, rigging & production support',
      ],
      whatsappMsg: WHATSAPP_TEMPLATES.animation,
      ctaLabel: 'Explore Animation',
    },
    {
      title: 'Websites & Content',
      icon: Globe,
      route: '/services/web-development',
      scope: 'Business and hotel/restaurant websites, landing pages, video editing and reels.',
      deliverables: [
        'Fast hotel, lodge & restaurant websites',
        'Mobile layouts with direct WhatsApp bookings',
        'YouTube video editing & Instagram reels',
        'Google Maps location integration & SEO',
      ],
      whatsappMsg: WHATSAPP_TEMPLATES.website,
      ctaLabel: 'Explore Websites & Video',
    },
    {
      title: 'ANICX Academy',
      icon: GraduationCap,
      route: '/academy',
      scope: 'Practical animation training, workshops, portfolio development and available internships.',
      deliverables: [
        'Practical Blender & 3D character workflows',
        '2D digital animation & storytelling',
        'Creator video editing for YouTube & Reels',
        'Portfolio-building & internship assessments',
      ],
      whatsappMsg: WHATSAPP_TEMPLATES.training,
      ctaLabel: 'Explore Academy',
    },
  ]

  return (
    <section ref={ref} aria-labelledby="services-title" className="section-y bg-mist">
      <div className="shell">
        <SectionHeading
          id="services-title"
          eyebrow="Our Services"
          title={['Focused Expertise.', 'Clear Production.']}
          intro="Animation, websites, video editing and training. Every service is built around a practical, transparent delivery process."
          actions={
            <ButtonLink to="/services" variant="secondary">
              All Services Overview
            </ButtonLink>
          }
        />

        {/* 3 Main Service Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {serviceCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                data-stagger
                className="group relative flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-paper p-7 transition-all duration-300 hover:border-ink hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mist text-ink transition-transform duration-300 group-hover:scale-110">
                      <Icon size={22} />
                    </span>
                    <Link
                      to={card.route}
                      aria-label={`View ${card.title} details`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-ink">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                    {card.scope}
                  </p>

                  <ul className="mt-5 divide-y divide-line/60 border-y border-line/60 text-sm">
                    {card.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2 py-2 text-ink/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col gap-2 pt-4">
                  <Link
                    to={card.route}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-mist px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-paper"
                  >
                    <span>{card.ctaLabel}</span>
                    <ArrowUpRight size={14} />
                  </Link>

                  <a
                    href={whatsappHref(card.whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-muted hover:text-[#1f7a4d]"
                  >
                    <WhatsAppIcon size={14} />
                    <span>Quick enquiry on WhatsApp</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Social Media & Paid Ads Capacity Notice */}
        <div data-reveal className="mt-8 rounded-2xl border border-line bg-paper/60 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow text-accent">Capacity Notice</span>
              <h4 className="mt-1 font-display text-base font-semibold text-ink">
                Social Media Management &amp; Paid Ads
              </h4>
              <p className="mt-1 text-sm text-muted">
                To maintain production quality for our active animation and web projects, social media management and paid campaigns are offered strictly based on studio bandwidth.
              </p>
            </div>
            <a
              href={whatsappHref('Hello ANICX Media! I would like to enquire about availability for social media management and paid ads.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-none items-center justify-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-ink"
            >
              <WhatsAppIcon size={15} />
              <span>Enquire About Availability</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
