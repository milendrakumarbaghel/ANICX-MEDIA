import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router'
import { categoryLabel } from '../../data/projects'
import { cn } from '../../lib/cn'
import { getProject, isDraft } from '../../lib/content'
import { youtubeWatchUrl } from '../../lib/media'
import type { WorkItem } from '../../types/content'
import { DraftBadge } from '../ui/DraftBadge'
import { Thumbnail } from '../ui/Thumbnail'
import { useVideoLightbox } from '../ui/videoLightboxContext'

interface WorkCardProps {
  item: WorkItem
  sizes?: string
  priority?: boolean
  className?: string
  headingLevel?: 'h2' | 'h3'
}

export function WorkCard({ item, sizes, priority, className, headingLevel = 'h3' }: WorkCardProps) {
  const { open } = useVideoLightbox()
  const Heading = headingLevel
  const project = item.projectSlug ? getProject(item.projectSlug) : undefined
  const video = item.youtubeId ? { youtubeId: item.youtubeId, title: item.title } : null
  const alt = `${item.title}, ${categoryLabel(item.category)} thumbnail`

  const media = (
    <>
      <Thumbnail
        youtubeId={item.youtubeId}
        image={item.image}
        alt={video ? '' : alt}
        sizes={sizes}
        priority={priority}
        pointerDrift
        className="shadow-[0_0_0_0_rgba(0,0,0,0)] transition-shadow duration-500 group-hover:shadow-[0_24px_50px_-28px_rgba(22,22,22,0.45)]"
      />
      {video && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-paper/95 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-ink shadow-sm transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-paper">
            <Play size={14} fill="currentColor" />
          </span>
          Play
        </span>
      )}
    </>
  )

  return (
    <article className={cn('group flex flex-col gap-5', className)}>
      <div className="relative">
        {video ? (
          <button
            type="button"
            onClick={() => open(video)}
            className="relative block w-full rounded-[var(--radius-card)] text-left focus-visible:outline-offset-4"
            aria-label={`Play video: ${item.title}`}
          >
            {media}
          </button>
        ) : item.externalUrl ? (
          <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="relative block rounded-[var(--radius-card)]">
            {media}
            <span className="sr-only">{item.title} (opens in a new tab)</span>
          </a>
        ) : (
          media
        )}
        <div className="pointer-events-none absolute left-4 right-4 top-4 flex flex-wrap items-start justify-between gap-2">
          {item.advisory ? (
            <span className="rounded-full bg-ink/80 px-2.5 py-1 text-xs font-semibold text-paper backdrop-blur-sm">
              {item.advisory}
            </span>
          ) : (
            <span />
          )}
          {isDraft(item) && <DraftBadge />}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          <span className="text-accent-ink">{categoryLabel(item.category)}</span>
          {item.source && (
            <>
              <span className="h-px w-5 bg-line" aria-hidden="true" />
              <span>{item.source}</span>
            </>
          )}
        </p>
        <Heading className="font-display text-[clamp(1.3rem,1.1rem+0.7vw,1.75rem)] font-medium leading-tight tracking-tight">
          {item.title}
        </Heading>
        <p className="max-w-xl text-[0.95rem] leading-relaxed text-muted">{item.description}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-2">
          {item.youtubeId && (
            <a
              href={youtubeWatchUrl(item.youtubeId)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm font-semibold"
            >
              Watch on YouTube
              <span className="sr-only">: {item.title} (opens in a new tab)</span>
            </a>
          )}
          {project && (
            <Link to={`/projects/${project.slug}`} className="link-underline text-sm font-semibold">
              View project <span className="sr-only">: {project.title}</span>
              <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
