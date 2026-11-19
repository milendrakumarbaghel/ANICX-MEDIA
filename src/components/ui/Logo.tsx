import { useId } from 'react'
import { Link } from 'react-router'
import { siteConfig } from '../../data/siteConfig'
import { cn } from '../../lib/cn'
import {
  LOGO_VIEWBOX,
  MARK_A_PATH,
  MARK_GAP,
  MARK_GRADIENT,
  MARK_SWOOSH_PATH,
  MARK_VIEWBOX,
  MARK_X_PATH,
  WORD_ANICX_PATH,
  WORD_MEDIA_PATH,
} from './logoPaths'

interface LogoProps {
  className?: string
  tone?: 'dark' | 'light'
  onClick?: () => void
}

/** "MEDIA" colour per tone: deeper blue on light backgrounds, lighter blue on dark. */
const MEDIA_COLOR = { dark: '#2F7BE5', light: '#56B9F4' } as const

/**
 * Brand logo (AX monogram + wordmark), rendered inline so the letterforms follow
 * `currentColor` (tone). Every colour version as standalone files: docs/brand/.
 */
export function Logo({ className, tone = 'dark', onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn('inline-flex items-center rounded-md', tone === 'light' ? 'text-paper' : 'text-ink', className)}
      aria-label={`${siteConfig.name}, home`}
    >
      <svg viewBox={LOGO_VIEWBOX} className="h-9 w-auto sm:h-10" aria-hidden="true" focusable="false">
        <LogoMark />
        <path fill="currentColor" d={WORD_ANICX_PATH} />
        <path fill={MEDIA_COLOR[tone]} d={WORD_MEDIA_PATH} />
      </svg>
    </Link>
  )
}

/** The AX monogram on its own, as SVG children (viewBox {@link MARK_VIEWBOX}). */
export function LogoMark() {
  // useId is stable across SSR and hydration; strip characters that are awkward inside url(#…).
  const id = `ax${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const [w, h] = MARK_VIEWBOX.split(' ').slice(2).map(Number)
  return (
    <>
      <defs>
        <mask id={`${id}-gap`} maskUnits="userSpaceOnUse" x={-10} y={-10} width={w + 20} height={h + 20}>
          <rect x={-10} y={-10} width={w + 20} height={h + 20} fill="#fff" />
          <path d={MARK_SWOOSH_PATH} fill="#000" stroke="#000" strokeWidth={MARK_GAP} strokeLinejoin="round" />
        </mask>
        <linearGradient id={`${id}-blue`} gradientUnits="userSpaceOnUse" x1={0} y1={MARK_GRADIENT.y1} x2={0} y2={MARK_GRADIENT.y2}>
          {MARK_GRADIENT.stops.map((color, i) => (
            <stop key={color} offset={i / (MARK_GRADIENT.stops.length - 1)} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
      <g mask={`url(#${id}-gap)`} fill="currentColor">
        <path d={MARK_A_PATH} />
        <path d={MARK_X_PATH} />
      </g>
      <path fill={`url(#${id}-blue)`} d={MARK_SWOOSH_PATH} />
    </>
  )
}
