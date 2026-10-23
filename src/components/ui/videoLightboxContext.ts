import { createContext, useContext } from 'react'
import type { VideoRef } from '../../types/content'

export interface VideoLightboxApi {
  open: (video: VideoRef) => void
  close: () => void
}

export const VideoLightboxContext = createContext<VideoLightboxApi | null>(null)

/** Opens the shared video player modal. */
export function useVideoLightbox(): VideoLightboxApi {
  const api = useContext(VideoLightboxContext)
  if (!api) throw new Error('useVideoLightbox must be used inside <VideoLightboxProvider>')
  return api
}
