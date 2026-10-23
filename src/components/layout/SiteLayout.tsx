import type { CSSProperties, ReactNode } from 'react'
import { siteConfig } from '../../data/siteConfig'
import { VideoLightboxProvider } from '../ui/VideoLightbox'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { WhatsAppButton } from './WhatsAppButton'

const { colors } = siteConfig.brand

// Brand colours from siteConfig override the CSS theme tokens.
const brandVars = {
  '--color-paper': colors.paper,
  '--color-mist': colors.mist,
  '--color-ink': colors.ink,
  '--color-muted': colors.muted,
  '--color-line': colors.line,
  '--color-accent': colors.accent,
  '--color-accent-ink': colors.accentInk,
} as CSSProperties

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div style={brandVars} className="flex min-h-svh flex-col bg-paper text-ink">
      <VideoLightboxProvider>
        <a
          href="#main"
          className="fixed left-4 top-3 z-[60] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-1 pt-[4.5rem] outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </VideoLightboxProvider>
    </div>
  )
}
