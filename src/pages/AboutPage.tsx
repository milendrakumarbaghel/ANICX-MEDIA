import { MapPin } from 'lucide-react'
import { useRef } from 'react'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useStaggerReveal } from '../animations/useStaggerReveal'
import { ParallaxImage } from '../components/animations/ParallaxImage'
import { ButtonLink } from '../components/ui/Button'
import { ContactCta } from '../components/ui/ContactCta'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { locationLabel, siteConfig } from '../data/siteConfig'
import { capabilities, studioIntro, workflow } from '../data/studio'
import { visibleProjects, visibleWork } from '../lib/content'
import { youtubeThumbnail } from '../lib/media'
import { organizationJsonLd } from '../lib/head'
import { Seo } from '../lib/seo'

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref)

  // Two stills from different disciplines, to show range at a glance.
  const stills = ['2d-animation', '3d-animation']
    .map((category) => visibleWork.find((item) => item.category === category && item.youtubeId))
    .filter((item) => item !== undefined)

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationLabel)}`

  return (
    <>
      <Seo
        title="About"
        description={`${siteConfig.name} is an animation studio and creative academy in ${locationLabel}, working across 2D and 3D animation, video, branding and online animation training.`}
        path="/about"
        jsonLd={[organizationJsonLd()]}
      />
      <PageHero
        eyebrow="About the studio"
        title={['Creativity', 'Meets Craft.']}
        aside={
          <p className="flex items-center gap-2 text-sm font-medium text-muted">
            <MapPin size={16} aria-hidden="true" /> {locationLabel}
          </p>
        }
      />

      <div ref={ref}>
        <section aria-label="Introduction" className="shell grid gap-12 pb-20 md:pb-28 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            {studioIntro.map((paragraph) => (
              <p key={paragraph} className="text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] leading-snug tracking-tight text-ink/85" data-reveal>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="lg:col-span-4 lg:col-start-9" data-reveal>
            <h2 className="eyebrow mb-5">What we do</h2>
            <ul className="divide-y divide-line border-y border-line">
              {capabilities.map((capability) => (
                <li key={capability} className="py-3 text-[0.95rem]">
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {stills.length > 0 && (
          <section aria-label="Studio work" className="shell grid gap-4 pb-20 md:grid-cols-12 md:pb-28">
            {stills.map((item, index) => (
              <figure key={item.id} className={index === 0 ? 'md:col-span-7' : 'md:col-span-5 md:mt-24'} data-reveal>
                <ParallaxImage
                  image={youtubeThumbnail(item.youtubeId!)}
                  alt={`Still from ${item.title}`}
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="aspect-video rounded-[var(--radius-card)]"
                />
                <figcaption className="mt-3 text-sm text-muted">
                  {item.title} · {item.source}
                </figcaption>
              </figure>
            ))}
          </section>
        )}

        <section aria-labelledby="approach-title" className="section-y bg-mist">
          <div className="shell grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  id="approach-title"
                  eyebrow="Our approach"
                  title={['From Idea', 'to Final Cut']}
                  intro="A clear, collaborative process, so you always know what happens next."
                />
              </div>
            </div>
            <ol className="flex flex-col gap-4 lg:col-span-7 lg:col-start-6">
              {workflow.map((step, index) => (
                <li key={step.title} data-stagger className="flex gap-6 rounded-[var(--radius-card)] bg-paper p-7 md:p-9">
                  <span className="font-display text-3xl font-medium text-accent-ink">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="channels-title" className="section-y">
          <div className="shell">
            <SectionHeading id="channels-title" eyebrow="Original series" title={['Stories We', 'Publish']} />
            <ul className="mt-12 grid gap-4 md:grid-cols-2">
              {visibleProjects.map((project) => (
                <li key={project.slug} data-stagger className="flex flex-col justify-between gap-6 rounded-[var(--radius-card)] border border-line p-7 md:p-9">
                  <div>
                    <p className="eyebrow">{project.format}</p>
                    <h3 className="mt-3 font-display text-heading font-medium">{project.title}</h3>
                    <p className="mt-3 text-muted">{project.tagline}</p>
                  </div>
                  <div>
                    <ButtonLink to={`/projects/${project.slug}`} variant="secondary" compact>
                      Explore project
                    </ButtonLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="location-title" className="shell pb-20 md:pb-28">
          <div className="grid gap-8 rounded-[var(--radius-panel)] border border-line p-8 md:grid-cols-2 md:items-center md:p-12" data-reveal>
            <div>
              <p className="eyebrow">Where we are</p>
              <h2 id="location-title" className="mt-3 text-title">
                {siteConfig.address.locality}, {siteConfig.address.region}
              </h2>
              <p className="mt-4 max-w-md text-muted">
                Our studio is based in {siteConfig.address.locality}. Training is online, and project discussions can start with a
                simple enquiry.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <ButtonLink to={mapsUrl} variant="secondary" ariaLabel={`View ${locationLabel} on Google Maps (opens in a new tab)`}>
                View on map
              </ButtonLink>
              <ButtonLink to="/contact">Contact us</ButtonLink>
            </div>
          </div>
        </section>
      </div>

      <ContactCta />
    </>
  )
}
