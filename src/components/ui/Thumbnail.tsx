import type { PointerEvent } from 'react'
import { cn } from '../../lib/cn'
import { resolveImage, youtubeThumbnail } from '../../lib/media'
import type { ImageAsset } from '../../types/content'

interface ThumbnailProps {
  youtubeId?: string
  image?: ImageAsset
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  /** Aspect ratio class for the frame. Dimensions are reserved to avoid layout shift. */
  aspect?: string
  /** Subtle pointer-follow drift on desktop (pure CSS variables, no re-renders). */
  pointerDrift?: boolean
}

function onPointerMove(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== 'mouse') return
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3))
  el.style.setProperty('--my', ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3))
}

function onPointerLeave(event: PointerEvent<HTMLDivElement>) {
  event.currentTarget.style.setProperty('--mx', '0')
  event.currentTarget.style.setProperty('--my', '0')
}

/** Responsive, lazy-loaded media frame for video thumbnails and posters. */
export function Thumbnail({
  youtubeId,
  image,
  alt,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  className,
  aspect = 'aspect-video',
  pointerDrift = false,
}: ThumbnailProps) {
  const resolved = image ? resolveImage(image) : youtubeId ? youtubeThumbnail(youtubeId) : null

  return (
    <div
      className={cn('media-frame', aspect, className)}
      onPointerMove={pointerDrift ? onPointerMove : undefined}
      onPointerLeave={pointerDrift ? onPointerLeave : undefined}
    >
      {resolved ? (
        <img
          src={resolved.src}
          srcSet={resolved.srcSet}
          sizes={resolved.srcSet ? sizes : undefined}
          width={resolved.width}
          height={resolved.height}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      ) : (
        <div className="grid h-full w-full place-items-center text-sm text-muted">Image coming soon</div>
      )}
    </div>
  )
}
