import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { useRef, useState } from 'react'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { isDraft, visibleTestimonials } from '../../lib/content'
import { resolveImage } from '../../lib/media'
import type { Testimonial } from '../../types/content'
import { DraftBadge } from '../ui/DraftBadge'
import { SectionHeading } from '../ui/SectionHeading'
import { useVideoLightbox } from '../ui/videoLightboxContext'

const CAROUSEL_MIN = 3

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { open } = useVideoLightbox()
  const photo = testimonial.photo ? resolveImage(testimonial.photo) : null
  return (
    <figure className="flex h-full flex-col justify-between gap-10 rounded-[var(--radius-card)] border border-line bg-paper p-7 md:p-10">
      {isDraft(testimonial) && <DraftBadge className="self-start" />}
      <blockquote className="font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.9rem)] font-medium leading-snug tracking-tight">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-4">
        {photo && (
          <img
            src={photo.src}
            alt=""
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 rounded-full object-cover"
          />
        )}
        <span className="flex flex-1 flex-col">
          <span className="font-semibold">{testimonial.name}</span>
          {(testimonial.role || testimonial.company) && (
            <span className="text-sm text-muted">{[testimonial.role, testimonial.company].filter(Boolean).join(', ')}</span>
          )}
        </span>
        {testimonial.youtubeId && (
          <button
            type="button"
            onClick={() => open({ youtubeId: testimonial.youtubeId!, title: `Testimonial from ${testimonial.name}` })}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold hover:border-ink"
          >
            <Play size={14} aria-hidden="true" /> Watch
          </button>
        )}
      </figcaption>
    </figure>
  )
}

/** Renders only when approved testimonials exist; carousel from three up. */
export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  useScrollReveal(ref)

  const items = visibleTestimonials
  if (!items.length) return null
  const carousel = items.length >= CAROUSEL_MIN

  const go = (step: number) => {
    setDirection(step)
    setIndex((current) => (current + step + items.length) % items.length)
  }

  return (
    <section ref={ref} aria-labelledby="testimonials-title" className="section-y bg-mist">
      <div className="shell">
        <SectionHeading id="testimonials-title" eyebrow="Kind words" title={['What Clients', 'and Students Say']} />
        {carousel ? (
          <div className="mt-12" aria-roledescription="carousel" aria-label="Testimonials">
            <div className="relative overflow-hidden" aria-live="polite">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <m.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${items.length}`}
                >
                  <TestimonialCard testimonial={items[index]} />
                </m.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-line bg-paper hover:border-ink"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-line bg-paper hover:border-ink"
                aria-label="Next testimonial"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <span className="ml-2 text-sm tabular-nums text-muted">
                {index + 1} / {items.length}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {items.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
