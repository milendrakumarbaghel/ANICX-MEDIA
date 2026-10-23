import { Play } from 'lucide-react'
import type { VideoRef } from '../../types/content'
import { Thumbnail } from '../ui/Thumbnail'
import { useVideoLightbox } from '../ui/videoLightboxContext'

interface VideoGridProps {
  videos: (VideoRef & { credit?: { label: string; url: string }; note?: string })[]
}

/** Grid of lazily-played videos (sample lessons, style references). */
export function VideoGrid({ videos }: VideoGridProps) {
  const { open } = useVideoLightbox()
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video, index) => (
        <li key={video.youtubeId || index} data-stagger className="flex flex-col gap-4">
          {video.youtubeId ? (
            <button
              type="button"
              onClick={() => open(video)}
              className="group relative block w-full rounded-[var(--radius-card)] text-left"
              aria-label={`Play video: ${video.title}`}
            >
              <Thumbnail youtubeId={video.youtubeId} alt="" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw" />
              <span
                aria-hidden="true"
                className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:scale-110"
              >
                <Play size={15} fill="currentColor" />
              </span>
            </button>
          ) : (
            <div className="grid aspect-video place-items-center rounded-[var(--radius-card)] border border-dashed border-line bg-mist px-6 text-center text-sm text-muted">
              Video slot awaiting client selection
            </div>
          )}
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-lg font-medium leading-snug tracking-tight">{video.title}</h3>
            {video.note && <p className="text-sm text-muted">{video.note}</p>}
            {video.credit && (
              <p className="text-sm text-muted">
                Credit:{' '}
                <a href={video.credit.url} target="_blank" rel="noopener noreferrer" className="link-underline font-medium text-ink">
                  {video.credit.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
