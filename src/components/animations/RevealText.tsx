import { useRef, type ElementType } from 'react'
import { DURATION, EASE, MEDIA, REVEAL_START, gsap, useGSAP } from '../../animations/gsapConfig'
import { cn } from '../../lib/cn'

interface RevealTextProps {
  /** One string per visual line. Each line slides up through its own mask. */
  lines: string[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  lineClassName?: string
  /** Set false when a parent timeline animates the lines (e.g. the hero). */
  scroll?: boolean
}

/**
 * Clip-mask headline reveal. The text is real, selectable and readable without
 * JavaScript; GSAP only offsets each line when motion is allowed.
 */
export function RevealText({ lines, as = 'h2', className, lineClassName, scroll = true }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const Tag = as as ElementType

  useGSAP(
    () => {
      if (!scroll || !ref.current) return
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motionOk, () => {
        gsap.from(ref.current!.querySelectorAll('[data-line]'), {
          yPercent: 115,
          duration: DURATION.text,
          ease: EASE.expo,
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: REVEAL_START, once: true },
        })
      })
    },
    { scope: ref, dependencies: [scroll] },
  )

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, index) => (
        <span key={index} className="line-mask">
          {index > 0 && ' '}
          <span data-line className={cn('block will-change-transform', lineClassName)}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
