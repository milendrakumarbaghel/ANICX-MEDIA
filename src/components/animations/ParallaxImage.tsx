import { useRef } from 'react'
import { useParallax } from '../../animations/useParallax'
import { cn } from '../../lib/cn'
import type { ResolvedImage } from '../../lib/media'

interface ParallaxImageProps {
  image: ResolvedImage
  alt: string
  className?: string
  sizes?: string
  amount?: number
  priority?: boolean
}

/**
 * Image that drifts slightly against the scroll direction on desktop. The
 * image is oversized by the travel distance so its edges never show.
 */
export function ParallaxImage({ image, alt, className, sizes = '100vw', amount = 6, priority = false }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  useParallax(ref, { amount })

  return (
    <div ref={ref} className={cn('relative overflow-hidden bg-cloud', className)}>
      <div data-parallax={amount} className="absolute inset-x-0 -inset-y-[8%] will-change-transform">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          width={image.width}
          height={image.height}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
