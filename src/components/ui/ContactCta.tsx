import { useRef } from 'react'
import { MEDIA, gsap, useGSAP } from '../../animations/gsapConfig'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { siteConfig } from '../../data/siteConfig'
import { RevealText } from '../animations/RevealText'
import { MagneticButton } from '../animations/MagneticButton'
import { ButtonLink } from './Button'

interface ContactCtaProps {
  title?: string[]
  subtitle?: string
}

/**
 * Large closing call to action. The dark panel eases from slightly inset to
 * full size as it scrolls in (transform only).
 */
export function ContactCta({
  title = ['Have a Story', 'to Tell?'],
  subtitle = 'Let’s bring your next big idea to life.',
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

  return (
    <section ref={ref} aria-labelledby="contact-cta-title" className="shell pb-6 pt-10 md:pb-10">
      <div
        data-cta-panel
        className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-20 text-paper will-change-transform sm:px-12 md:py-28 lg:px-20"
      >
        {/* Decorative rings, echoing the accent dot of the wordmark. */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full border border-paper/10 md:-right-24" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 -z-10 h-[22rem] w-[22rem] rounded-full border border-accent/40 md:right-0" />
        <div aria-hidden="true" className="pointer-events-none absolute right-24 top-24 -z-10 h-3 w-3 rounded-full bg-accent md:right-40 md:top-32" />

        <p className="eyebrow mb-8 text-paper/60" data-reveal>
          {siteConfig.name}, {siteConfig.address.locality}
        </p>
        <div id="contact-cta-title">
          <RevealText lines={title} as="h2" className="text-display max-w-4xl" />
        </div>
        <p className="mt-8 max-w-xl text-lead text-paper/70" data-reveal>
          {subtitle}
        </p>
        <div className="mt-12 flex flex-wrap gap-3" data-reveal>
          <MagneticButton>
            <ButtonLink to="/contact?enquiry=project#enquiry" variant="light">
              Start a Project
            </ButtonLink>
          </MagneticButton>
          <ButtonLink to="/contact" variant="ghost-light">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
