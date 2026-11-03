import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { useIntro } from '../../animations/useIntro'
import { MagneticButton } from '../animations/MagneticButton'
import { ButtonLink } from '../ui/Button'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  useIntro(ref)

  return (
    <section ref={ref} aria-labelledby="hero-title" data-intro-root className="relative pb-8 pt-6 sm:pb-12 sm:pt-10 md:pb-16 md:pt-14">
      <div className="shell">
        <p className="eyebrow" data-intro>
          ANICX MEDIA · Animation &amp; Web Studio · Seoni (M.P.)
        </p>

        <div className="mt-4 grid gap-6 sm:mt-6 lg:mt-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h1 id="hero-title" className="text-hero font-medium lg:col-span-8" data-intro>
            <span className="line-mask">
              <span data-line className="block">
                Stories in Motion
              </span>
            </span>
            <span className="line-mask">
              <span data-line className="block">
                Businesses Online
              </span>
            </span>
          </h1>

          <div className="flex flex-col gap-6 lg:col-span-4 lg:pb-3">
            <p className="text-lead text-muted" data-intro>
              ANICX Media creates 2D and 3D animation, business websites and engaging video content. Based in Seoni, collaborating with clients online.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span data-intro className="inline-flex">
                  <MagneticButton>
                    <ButtonLink to="/contact?enquiry=project#enquiry">Discuss Your Project</ButtonLink>
                  </MagneticButton>
                </span>
                <span data-intro className="inline-flex">
                  <ButtonLink to="/portfolio" variant="secondary">
                    Explore Our Work
                  </ButtonLink>
                </span>
              </div>

              <div data-intro className="pt-1">
                <Link
                  to="/academy"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-ink/80 transition-colors hover:text-ink"
                >
                  <span>Want to learn? Explore ANICX Academy</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
