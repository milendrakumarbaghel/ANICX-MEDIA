import { ArrowRight, ExternalLink, Play } from 'lucide-react'
import { Link } from 'react-router'
import { categoryLabel } from '../../data/projects'
import { whatsappHref, WHATSAPP_TEMPLATES } from '../../data/siteConfig'
import { cn } from '../../lib/cn'
import { getProject, isDraft } from '../../lib/content'
import { youtubeWatchUrl } from '../../lib/media'
import type { WorkItem } from '../../types/content'
import { WhatsAppIcon } from '../ui/BrandIcons'
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

  const enquiryText = item.enquiryMessage ?? WHATSAPP_TEMPLATES.portfolio(item.title)
  const whatsappUrl = whatsappHref(enquiryText)

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
    <article className={cn('group flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-paper p-5 transition-all duration-300 hover:border-ink hover:shadow-lg', className)}>
      <div>
        <div className="relative">
          {video ? (
            <button
              type="button"
              onClick={() => open(video)}
              className="relative block w-full rounded-2xl text-left focus-visible:outline-offset-4"
              aria-label={`Play video: ${item.title}`}
            >
              {media}
            </button>
          ) : item.externalUrl ? (
            <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="relative block rounded-2xl">
              {media}
              <span className="sr-only">{item.title} (opens in a new tab)</span>
            </a>
          ) : (
            media
          )}
          <div className="pointer-events-none absolute left-3 right-3 top-3 flex flex-wrap items-start justify-between gap-2">
            <span className="rounded-full bg-paper/90 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur-md">
              {item.kind === 'client-work' ? 'Client Work' : 'ANICX Original'}
            </span>
            {item.advisory ? (
              <span className="rounded-full bg-ink/80 px-2.5 py-1 text-xs font-semibold text-paper backdrop-blur-sm">
                {item.advisory}
              </span>
            ) : null}
            {isDraft(item) && <DraftBadge />}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <p className="flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <span className="text-accent-ink">{categoryLabel(item.category)}</span>
            {item.source && (
              <>
                <span>·</span>
                <span>{item.source}</span>
              </>
            )}
          </p>

          <Heading className="font-display text-2xl font-medium leading-tight tracking-tight text-ink">
            {item.title}
          </Heading>

          <p className="text-[0.95rem] leading-relaxed text-muted">{item.description}</p>

          {/* Detailed case study fields: Role, Brief, Deliverables */}
          {item.actualRole && (
            <div className="mt-2 text-xs text-muted">
              <span className="font-semibold text-ink">Actual Role:</span> {item.actualRole}
            </div>
          )}

          {item.brief && (
            <div className="mt-1 text-xs text-muted">
              <span className="font-semibold text-ink">Brief:</span> {item.brief}
            </div>
          )}

          {item.deliverables && item.deliverables.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Deliverables</p>
              <ul className="mt-1 space-y-1 text-xs text-ink/85">
                {item.deliverables.map((deliv) => (
                  <li key={deliv} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-line/60 pt-4">
        <div className="flex flex-wrap items-center gap-3">
          {item.externalUrl && (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper hover:bg-ink/90"
            >
              <span>{item.externalUrlLabel ?? 'Visit Project'}</span>
              <ExternalLink size={13} />
            </a>
          )}

          {item.youtubeId && (
            <a
              href={youtubeWatchUrl(item.youtubeId)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ink hover:border-ink"
            >
              <span>Watch on YouTube</span>
              <ExternalLink size={12} />
            </a>
          )}

          {project && (
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ink hover:border-ink"
            >
              <span>Explore Series</span>
              <ArrowRight size={13} />
            </Link>
          )}
        </div>

        {/* Relevant Enquiry Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted transition-colors hover:text-[#1f7a4d]"
        >
          <WhatsAppIcon size={14} />
          <span>
            {item.category === 'website-development'
              ? 'Enquire About a Similar Website'
              : 'Enquire About Similar Project'}
          </span>
        </a>
      </div>
    </article>
  )
}
