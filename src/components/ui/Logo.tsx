import { Link } from 'react-router'
import { siteConfig } from '../../data/siteConfig'
import { cn } from '../../lib/cn'

interface LogoProps {
  className?: string
  tone?: 'dark' | 'light'
  onClick?: () => void
}

/**
 * Brand logo. Uses `siteConfig.logo.src` when the approved logo is supplied,
 * otherwise a typographic wordmark (development fallback).
 */
export function Logo({ className, tone = 'dark', onClick }: LogoProps) {
  const { logo, name } = siteConfig
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn('inline-flex items-center gap-2 rounded-md', tone === 'light' ? 'text-paper' : 'text-ink', className)}
      aria-label={`${name}, home`}
    >
      {logo.src ? (
        <img src={logo.src} alt="" width={logo.width} height={logo.height} className="h-8 w-auto" />
      ) : (
        <span className="flex items-baseline gap-1.5 font-display leading-none" aria-hidden="true">
          <span className="text-[1.35rem] font-bold tracking-[-0.04em]">ANICX</span>
          <span className="text-[0.7rem] font-semibold tracking-[0.28em] opacity-70">MEDIA</span>
          <span className="h-1.5 w-1.5 translate-y-[-0.1rem] rounded-full bg-accent" />
        </span>
      )}
    </Link>
  )
}
