import { useRef } from 'react'
import { useStaggerReveal } from '../animations/useStaggerReveal'
import { TestimonialCard } from '../components/home/TestimonialsSection'
import { ButtonLink } from '../components/ui/Button'
import { ContactCta } from '../components/ui/ContactCta'
import { PageHero } from '../components/ui/PageHero'
import { visibleTestimonials } from '../lib/content'
import { Seo } from '../lib/seo'

export default function TestimonialsPage() {
  const ref = useRef<HTMLElement>(null)
  useStaggerReveal(ref)
  const hasTestimonials = visibleTestimonials.length > 0

  return (
    <>
      <Seo
        title="Testimonials"
        description="What clients and students say about working and learning with ANICX MEDIA."
        path="/testimonials"
        noindex={!hasTestimonials}
      />
      <PageHero eyebrow="Testimonials" title={['Kind Words', 'from Our People']} />

      <section ref={ref} aria-label="Testimonials" className="shell pb-24 md:pb-32">
        {hasTestimonials ? (
          <ul className="grid gap-6 md:grid-cols-2">
            {visibleTestimonials.map((testimonial) => (
              <li key={testimonial.name} data-stagger>
                <TestimonialCard testimonial={testimonial} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-6 rounded-[var(--radius-panel)] bg-mist p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <h2 className="font-display text-heading font-medium">Reviews are on their way</h2>
              <p className="mt-2 max-w-xl text-muted">
                We only publish genuine feedback shared with permission. Meanwhile, the work speaks for itself.
              </p>
            </div>
            <ButtonLink to="/portfolio">See our work</ButtonLink>
          </div>
        )}
      </section>

      <ContactCta />
    </>
  )
}
