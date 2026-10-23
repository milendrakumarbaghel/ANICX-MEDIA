import { ExternalLink, X } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { setScrollLocked } from '../../animations/smoothScroll'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { youtubeEmbedUrl, youtubeWatchUrl } from '../../lib/media'
import type { VideoRef } from '../../types/content'
import { VideoLightboxContext } from './videoLightboxContext'

/**
 * Shared, accessible video modal. The YouTube iframe is only created when a
 * visitor asks to play a video, so pages never load embeds up front.
 */
export function VideoLightboxProvider({ children }: { children: ReactNode }) {
  const [video, setVideo] = useState<VideoRef | null>(null)
  const open = useCallback((next: VideoRef) => setVideo(next), [])
  const close = useCallback(() => setVideo(null), [])
  const api = useMemo(() => ({ open, close }), [open, close])

  return (
    <VideoLightboxContext.Provider value={api}>
      {children}
      <AnimatePresence>{video && <LightboxDialog key={video.youtubeId} video={video} onClose={close} />}</AnimatePresence>
    </VideoLightboxContext.Provider>
  )
}

function LightboxDialog({ video, onClose }: { video: VideoRef; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useFocusTrap(dialogRef, true, onClose)

  useEffect(() => {
    setScrollLocked(true)
    return () => setScrollLocked(false)
  }, [])

  const titleId = `video-title-${video.youtubeId}`

  return (
    <m.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      data-lenis-prevent
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-5xl"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-3 flex items-center justify-between gap-4 text-paper">
          <h2 id={titleId} className="truncate font-display text-base font-medium sm:text-lg">
            {video.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 flex-none place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 focus-visible:outline-paper"
            aria-label="Close video"
            data-autofocus
          >
            <X size={20} />
          </button>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
          <iframe
            src={youtubeEmbedUrl(video.youtubeId)}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p className="mt-3 text-sm text-paper/70">
          Video not playing?{' '}
          <a
            href={youtubeWatchUrl(video.youtubeId)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-paper underline underline-offset-4 focus-visible:outline-paper"
          >
            Watch on YouTube <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </p>
      </m.div>
    </m.div>
  )
}
