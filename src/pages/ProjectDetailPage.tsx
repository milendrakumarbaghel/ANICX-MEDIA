import { ArrowLeft, Play } from 'lucide-react'
import { useRef } from 'react'
import { Link, useParams } from 'react-router'
import { useIntro } from '../animations/useIntro'
import { useParallax } from '../animations/useParallax'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useStaggerReveal } from '../animations/useStaggerReveal'
import { ButtonLink } from '../components/ui/Button'
import { ContactCta } from '../components/ui/ContactCta'
import { DraftBadge } from '../components/ui/DraftBadge'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Thumbnail } from '../components/ui/Thumbnail'
import { useVideoLightbox } from '../components/ui/videoLightboxContext'
import { getProject, isDraft, visibleProjects } from '../lib/content'
import { projectPoster, resolveImage } from '../lib/media'
import { Seo } from '../lib/seo'
import type { OriginalProject } from '../types/content'
import NotFoundPage from './NotFoundPage'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  // Unknown or unpublished slug: render the 404 page (Netlify serves 404.html).
  if (!project) return <NotFoundPage />
  return <ProjectDetail key={project.slug} project={project} />
}

function ProjectDetail({ project }: { project: OriginalProject }) {
  const heroRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const { open } = useVideoLightbox()
  useIntro(heroRef)
  useParallax(heroRef, { amount: 5 })
  useScrollReveal(bodyRef)
  useStaggerReveal(bodyRef)

  const poster = projectPoster(project)
  const video = project.trailer ?? project.featuredVideo
  const related = visibleProjects.filter((p) => p.slug !== project.slug)

  return (
    <>
      <Seo
        title={project.title}
        description={project.overview[0]}
        path={`/projects/${project.slug}`}
        image={poster?.src}
        type="article"
      />

      <section ref={heroRef} aria-labelledby="project-title" className="shell pt-10 md:pt-16">
        <Link to="/projects" className="link-underline text-sm font-semibold text-muted hover:text-ink" data-intro>
          <ArrowLeft size={16} aria-hidden="true" /> All projects
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow flex flex-wrap items-center gap-3" data-intro>
              {project.format}
              {isDraft(project) && <DraftBadge />}
            </p>
            <h1 id="project-title" className="mt-5 text-display" data-intro>
              <span className="line-mask">
                <span data-line className="block">
                  {project.title}
                </span>
              </span>
            </h1>
          </div>
          <p className="font-display text-xl tracking-tight text-ink/80 lg:col-span-4 lg:pb-3" data-intro>
            {project.tagline}
          </p>
        </div>

        <div data-intro="image" className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] bg-cloud sm:aspect-video lg:aspect-[21/9]">
          {poster ? (
            <div data-parallax="5" className="absolute inset-x-0 -inset-y-[6%]">
              <img
                src={poster.src}
                srcSet={poster.srcSet}
                sizes="(min-width: 1440px) 1340px, 100vw"
                width={poster.width}
                height={poster.height}
                alt={project.poster?.alt ?? `${project.title} key art`}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="grid h-full place-items-center text-sm text-muted">Poster pending</div>
          )}
          {video && (
            <button
              type="button"
              onClick={() => open(video)}
              className="group absolute bottom-5 left-5 inline-flex items-center gap-3 rounded-full bg-paper py-2 pl-2 pr-5 text-sm font-semibold text-ink shadow-lg transition-transform hover:-translate-y-0.5 sm:bottom-8 sm:left-8"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:scale-110">
                <Play size={17} fill="currentColor" aria-hidden="true" />
              </span>
              {project.trailer ? 'Watch trailer' : 'Watch episode'}
              <span className="sr-only">: {video.title}</span>
            </button>
          )}
        </div>
      </section>

      <div ref={bodyRef}>
        <section aria-labelledby="overview-title" className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="overview-title" className="eyebrow" data-reveal>
              Overview
            </h2>
            {project.facts.length > 0 && (
              <dl className="mt-6 divide-y divide-line border-y border-line" data-reveal>
                {project.facts.map((fact) => (
                  <div key={fact.label} className="flex justify-between gap-4 py-3 text-[0.95rem]">
                    <dt className="text-muted">{fact.label}</dt>
                    <dd className="text-right font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
            {project.overview.map((paragraph) => (
              <p key={paragraph} className="text-lead text-ink/85" data-reveal>
                {paragraph}
              </p>
            ))}
            {project.channelUrl && (
              <div className="mt-2 flex flex-wrap gap-3" data-reveal>
                <ButtonLink to={project.channelUrl} variant="secondary" ariaLabel={`${project.title} on YouTube (opens in a new tab)`}>
                  Watch on YouTube
                </ButtonLink>
              </div>
            )}
          </div>
        </section>

        {project.characters.length > 0 && (
          <section aria-labelledby="characters-title" className="bg-mist py-16 md:py-24">
            <div className="shell">
              <h2 id="characters-title" className="text-title" data-reveal>
                Characters
              </h2>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {project.characters.map((character) => {
                  const image = character.image ? resolveImage(character.image) : null
                  return (
                    <li key={character.name} data-stagger className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-paper p-5">
                      {image ? (
                        <img
                          src={image.src}
                          alt={character.image?.alt ?? character.name}
                          width={image.width}
                          height={image.height}
                          loading="lazy"
                          className="aspect-square w-full rounded-xl object-cover"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="grid aspect-[5/3] place-items-center rounded-xl bg-cloud font-display text-5xl font-medium text-ink/70"
                        >
                          {character.name.charAt(0)}
                        </span>
                      )}
                      <h3 className="font-display text-xl font-medium">{character.name}</h3>
                      {character.description && <p className="text-[0.95rem] text-muted">{character.description}</p>}
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        )}

        {project.episodes.length > 0 && (
          <section aria-labelledby="episodes-title" className="shell py-16 md:py-24">
            <SectionHeading id="episodes-title" eyebrow="Watch" title={['Episodes']} />
            <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {project.episodes.map((episode, index) => (
                <li key={episode.youtubeId} data-stagger>
                  <button
                    type="button"
                    onClick={() => open(episode)}
                    className="group flex w-full flex-col gap-4 rounded-[var(--radius-card)] text-left focus-visible:outline-offset-4"
                  >
                    <span className="relative block">
                      <Thumbnail youtubeId={episode.youtubeId} alt="" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw" />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:scale-110"
                      >
                        <Play size={15} fill="currentColor" />
                      </span>
                    </span>
                    <span className="flex items-baseline gap-3">
                      <span className="text-xs font-semibold tabular-nums text-muted">{String(index + 1).padStart(2, '0')}</span>
                      <span className="font-display text-lg font-medium leading-snug tracking-tight">{episode.title}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.gallery.length > 0 && (
          <section aria-labelledby="gallery-title" className="shell pb-16 md:pb-24">
            <h2 id="gallery-title" className="text-title" data-reveal>
              Gallery
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image) => (
                <li key={image.src} data-stagger>
                  <Thumbnail image={image} alt={image.alt} sizes="(min-width: 640px) 50vw, 100vw" />
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section aria-labelledby="related-title" className="border-t border-line py-16 md:py-24">
            <div className="shell">
              <h2 id="related-title" className="eyebrow" data-reveal>
                More original projects
              </h2>
              <ul className="mt-8 grid gap-6 md:grid-cols-2">
                {related.map((item) => {
                  const relatedPoster = projectPoster(item)
                  return (
                    <li key={item.slug} data-stagger>
                      <Link to={`/projects/${item.slug}`} className="group flex items-center gap-5 rounded-[var(--radius-card)] border border-line p-4 transition-colors hover:border-ink">
                        <span className="w-32 flex-none sm:w-44">
                          {relatedPoster ? (
                            <Thumbnail
                              image={item.poster}
                              youtubeId={item.poster ? undefined : item.posterVideoId}
                              alt=""
                              sizes="176px"
                              className="rounded-xl"
                            />
                          ) : (
                            <span className="block aspect-video rounded-xl bg-mist" />
                          )}
                        </span>
                        <span className="flex flex-col gap-1">
                          <span className="font-display text-xl font-medium tracking-tight">{item.title}</span>
                          <span className="text-sm text-muted">{item.format}</span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        )}
      </div>

      <ContactCta title={['Have a Story', 'Worth Animating?']} subtitle="From a pilot episode to a full series, let’s talk about your idea." />
    </>
  )
}
