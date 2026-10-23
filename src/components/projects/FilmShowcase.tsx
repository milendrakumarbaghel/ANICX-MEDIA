import { Play } from 'lucide-react'
import { cn } from '../../lib/cn'
import { isDraft } from '../../lib/content'
import { projectPoster } from '../../lib/media'
import type { OriginalProject } from '../../types/content'
import { ParallaxImage } from '../animations/ParallaxImage'
import { ButtonLink } from '../ui/Button'
import { DraftBadge } from '../ui/DraftBadge'
import { useVideoLightbox } from '../ui/videoLightboxContext'

interface FilmShowcaseProps {
  project: OriginalProject
  reverse?: boolean
  headingLevel?: 'h2' | 'h3'
}

/** A project presented like a small film page: poster, logline, trailer, episodes. */
export function FilmShowcase({ project, reverse = false, headingLevel = 'h3' }: FilmShowcaseProps) {
  const { open } = useVideoLightbox()
  const Heading = headingLevel
  const poster = projectPoster(project)
  const video = project.trailer ?? project.featuredVideo

  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14" data-stagger>
      <div className={cn('relative lg:col-span-7', reverse && 'lg:order-2')}>
        {poster ? (
          <ParallaxImage
            image={poster}
            alt={project.poster?.alt ?? `${project.title} key art`}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="aspect-[16/10] rounded-[var(--radius-panel)]"
          />
        ) : (
          <div className="grid aspect-[16/10] place-items-center rounded-[var(--radius-panel)] border border-dashed border-line bg-mist text-sm text-muted">
            Poster pending
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
          <span className="rounded-full bg-paper/95 px-3 py-1.5 text-xs font-semibold text-ink">{project.format}</span>
          {project.advisory && (
            <span className="rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-paper">{project.advisory}</span>
          )}
        </div>
        {video && (
          <button
            type="button"
            onClick={() => open(video)}
            className="group absolute bottom-4 right-4 inline-flex items-center gap-3 rounded-full bg-paper py-2 pl-2 pr-5 text-sm font-semibold text-ink shadow-lg transition-transform duration-300 hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:scale-110">
              <Play size={16} fill="currentColor" aria-hidden="true" />
            </span>
            {project.trailer ? 'Watch trailer' : 'Watch episode'}
            <span className="sr-only">: {video.title}</span>
          </button>
        )}
      </div>

      <div className={cn('flex flex-col gap-5 lg:col-span-5', reverse && 'lg:order-1')}>
        {isDraft(project) && <DraftBadge className="self-start" />}
        <p className="eyebrow">Original series</p>
        <Heading className="text-title">{project.title}</Heading>
        <p className="font-display text-xl tracking-tight text-ink/80">{project.tagline}</p>
        <p className="leading-relaxed text-muted">{project.overview[0]}</p>
        {project.episodes.length > 0 && (
          <p className="text-sm font-medium">
            <span className="tabular-nums">{project.episodes.length}</span> featured episodes
            {project.channelUrl && ' · Streaming on YouTube'}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-3">
          <ButtonLink to={`/projects/${project.slug}`}>Explore project</ButtonLink>
          {project.channelUrl && (
            <ButtonLink to={project.channelUrl} variant="secondary" ariaLabel={`${project.title} YouTube channel (opens in a new tab)`}>
              YouTube channel
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  )
}
