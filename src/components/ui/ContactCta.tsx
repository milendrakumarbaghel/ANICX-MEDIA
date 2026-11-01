import { MapPin, Phone } from 'lucide-react'
import { useRef } from 'react'
import { MEDIA, gsap, useGSAP } from '../../animations/gsapConfig'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { locationLabel, phoneHref, siteConfig, whatsappHref } from '../../data/siteConfig'
import { RevealText } from '../animations/RevealText'
import { WhatsAppIcon } from './BrandIcons'
import { ButtonLink } from './Button'

interface ContactCtaProps {
  title?: string[]
  subtitle?: string
}

/**
 * Large closing call to action.
 *
 * Implements the brief's required final contact section:
 * "Have a project in mind? Let’s discuss it."
 * Actions: WhatsApp, Direct Call, View Location on Google Maps.
 */
export function ContactCta({
  title = ['Have a Project in Mind?', 'Let’s Discuss It.'],
  subtitle = 'Whether you need 2D/3D animation, a modern business website, or creator video editing, we are ready to collaborate.',
}: ContactCtaProps) {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motionOk, () => {
        gsap.fromTo(
          '[data-cta-panel]',
          { scale: 0.94 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top 35%', scrub: 0.6 },
          },
        )
      })
    },
    { scope: ref },
  )

  const whatsapp = whatsappHref()
  const tel = phoneHref()

  return (
    <section ref={ref} aria-labelledby="contact-cta-title" className="shell pb-10 pt-10 md:pb-16">
      <div
        data-cta-panel
        className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-paper will-change-transform sm:px-12 md:py-24 lg:px-20"
      >
        {/* Subtle decorative rings */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full border border-paper/10 md:-right-24" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 -z-10 h-[22rem] w-[22rem] rounded-full border border-accent/40 md:right-0" />
        <div aria-hidden="true" className="pointer-events-none absolute right-24 top-24 -z-10 h-3 w-3 rounded-full bg-accent md:right-40 md:top-32" />

        <p className="eyebrow mb-6 text-accent" data-reveal>
          {siteConfig.name} · {locationLabel}
        </p>

        <div id="contact-cta-title">
          <RevealText lines={title} as="h2" className="text-display max-w-4xl" />
        </div>

        <p className="mt-6 max-w-2xl text-lead text-paper/75" data-reveal>
          {subtitle}
        </p>

        {/* WhatsApp, Call, Maps Actions */}
        <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[#1f7a4d] px-6 py-3.5 text-sm font-semibold text-paper shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#1a6640]"
          >
            <WhatsAppIcon size={18} />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={tel}
            className="inline-flex items-center gap-2 rounded-full border border-paper/30 bg-paper/10 px-6 py-3.5 text-sm font-semibold text-paper backdrop-blur-md transition-colors hover:border-paper hover:bg-paper/20"
          >
            <Phone size={16} />
            <span>Call {siteConfig.contact.phone}</span>
          </a>

          <a
            href={siteConfig.contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-3.5 text-sm font-medium text-paper/80 transition-colors hover:border-paper hover:text-paper"
          >
            <MapPin size={16} />
            <span>View Location on Maps</span>
          </a>

          <ButtonLink to="/contact" variant="ghost-light">
            Open Contact Form
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
