import { Play } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { useIntro } from '../../animations/useIntro'
import { useParallax } from '../../animations/useParallax'
import { categoryLabel } from '../../data/projects'
import { featuredWork } from '../../lib/content'
import { youtubeThumbnail } from '../../lib/media'
import { MagneticButton } from '../animations/MagneticButton'
import { ButtonLink } from '../ui/Button'
import { useVideoLightbox } from '../ui/videoLightboxContext'

const HEADLINE = ['We Create.', 'We Animate.', 'We Teach.']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { open } = useVideoLightbox()
  useIntro(ref)
  useParallax(ref, { amount: 5 })

  // Hero visual: the first featured project, i.e. the studio's own work.
  const spotlight = featuredWork.find((item) => item.youtubeId)
  const image = spotlight?.youtubeId ? youtubeThumbnail(spotlight.youtubeId) : null

  return (
    <section ref={ref} aria-labelledby="hero-title" data-intro-root className="relative pb-10 md:pb-16">
      <div className="shell pt-10 sm:pt-14 lg:pt-20">
        <p className="eyebrow flex items-center gap-2.5" data-intro>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Animation Studio &amp; Creative Academy
        </p>

        <div className="mt-6 grid gap-10 lg:mt-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h1 id="hero-title" className="text-hero font-medium lg:col-span-8" data-intro>
            {HEADLINE.map((line, index) => (
              <span key={line} className="line-mask">
                {index > 0 && ' '}
                <span data-line className="block">
                  {line.replace('.', '')}
                  <span className="text-accent">.</span>
                </span>
              </span>
            ))}
          </h1>

          <div className="flex flex-col gap-8 lg:col-span-4 lg:pb-4">
            <p className="max-w-md text-lead text-muted" data-intro>
              Bringing stories to life through animation, creative production, and hands‑on learning.
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-3">
                <span data-intro className="inline-flex">
                  <MagneticButton>
                    <ButtonLink to="/portfolio">Explore Our Work</ButtonLink>
                  </MagneticButton>
                </span>
                <span data-intro className="inline-flex">
                  <ButtonLink to="/academy" variant="secondary">
                    Explore Training
                  </ButtonLink>
                </span>
              </div>
              <p className="text-sm text-muted" data-intro>
                Have a project in mind?{' '}
                <Link to="/contact" className="link-underline font-semibold text-ink">
                  Get in touch
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {spotlight && image && (
        <div className="shell mt-12 md:mt-16">
          <div
            data-intro="image"
            className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] bg-cloud sm:aspect-video lg:aspect-[21/9]"
          >
            <div data-parallax="5" className="absolute inset-x-0 -inset-y-[6%]">
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes="(min-width: 1440px) 1340px, 100vw"
                width={image.width}
                height={image.height}
                alt={`Still from ${spotlight.title}, ${categoryLabel(spotlight.category)} by ${spotlight.source ?? 'ANICX MEDIA'}`}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-[50%_35%]"
              />
            </div>
            {/* Bottom scrim keeps the caption legible over any artwork. */}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 text-paper sm:flex-row sm:items-end sm:justify-between sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/75">
                  {spotlight.source} · {categoryLabel(spotlight.category)}
                </p>
                <p className="mt-2 font-display text-xl font-medium tracking-tight sm:text-2xl">{spotlight.title}</p>
              </div>
              {spotlight.youtubeId && (
                <button
                  type="button"
                  onClick={() => open({ youtubeId: spotlight.youtubeId!, title: spotlight.title })}
                  className="group inline-flex items-center gap-3 self-start rounded-full bg-paper py-2 pl-2 pr-5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-paper sm:self-auto"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:scale-110">
                    <Play size={16} fill="currentColor" aria-hidden="true" />
                  </span>
                  Watch the episode
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
