import { localThumbnails } from '../data/localThumbnails'
import type { ImageAsset, OriginalProject } from '../types/content'

export interface ResolvedImage {
  src: string
  srcSet?: string
  width: number
  height: number
}

/**
 * Thumbnail for a YouTube video. Uses the optimised local WebP copies in
 * /public/media/work when available (see scripts/fetch-thumbnails.sh),
 * otherwise falls back to YouTube's always-available hqdefault image.
 */
export function youtubeThumbnail(youtubeId: string): ResolvedImage {
  if (localThumbnails.has(youtubeId)) {
    return {
      src: `/media/work/${youtubeId}-1280.webp`,
      srcSet: `/media/work/${youtubeId}-640.webp 640w, /media/work/${youtubeId}-1280.webp 1280w`,
      width: 1280,
      height: 720,
    }
  }
  return {
    src: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    width: 480,
    height: 360,
  }
}

export function resolveImage(image: ImageAsset): ResolvedImage {
  return {
    src: image.srcLarge ?? image.src,
    srcSet: image.srcLarge ? `${image.src} 640w, ${image.srcLarge} 1280w` : undefined,
    width: image.width ?? 1280,
    height: image.height ?? 720,
  }
}

export const youtubeWatchUrl = (youtubeId: string) => `https://www.youtube.com/watch?v=${youtubeId}`

/** Privacy-enhanced embed URL, only requested when the visitor presses play. */
export const youtubeEmbedUrl = (youtubeId: string) =>
  `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`

export const absoluteUrl = (siteUrl: string, path: string) => (siteUrl ? `${siteUrl}${path}` : path)

/** Poster for an original project: custom poster, else a still from its poster video. */
export function projectPoster(project: OriginalProject): ResolvedImage | null {
  if (project.poster) return resolveImage(project.poster)
  if (project.posterVideoId) return youtubeThumbnail(project.posterVideoId)
  return null
}
