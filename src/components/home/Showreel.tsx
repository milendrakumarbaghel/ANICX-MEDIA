import { Play } from 'lucide-react'
import { useRef } from 'react'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { useVideoLightbox } from '../ui/videoLightboxContext'

export function Showreel() {
  const ref = useRef<HTMLElement>(null)
  const { open } = useVideoLightbox()
  useScrollReveal(ref)

  // Actual ANICX original animation work
  const showreelVideo = {
    youtubeId: 'BZZ_sTI_ooM',
    title: 'ANICX Media 3D Animation Showcase — Pinky Chirkut aur Hero Makdaman',
  }

  return (
    <section ref={ref} aria-labelledby="showreel-heading" className="shell pb-12 sm:pb-16 md:pb-20">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-panel)] border border-line bg-ink shadow-2xl sm:aspect-video lg:aspect-[21/9]">
        {/* Strong poster image: WebP poster of actual ANICX work */}
        <img
          src="/media/work/BZZ_sTI_ooM-1280.webp"
          srcSet="/media/work/BZZ_sTI_ooM-640.webp 640w, /media/work/BZZ_sTI_ooM-960.webp 960w, /media/work/BZZ_sTI_ooM-1280.webp 1280w"
          sizes="(min-width: 1440px) 1340px, 100vw"
          width={1280}
          height={720}
          alt="ANICX Media 3D animation production showcase"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-[50%_40%] opacity-85 transition-transform duration-700 ease-out hover:scale-[1.02]"
        />

        {/* Ambient bottom scrim */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />

        {/* Center / corner play controls */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-paper/15 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-paper backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-accent" />
              STUDIO SHOWREEL
            </span>
            <span className="hidden text-xs text-paper/70 sm:inline-block">Click to play with audio</span>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-accent">Real ANICX Studio Work</p>
              <h2 id="showreel-heading" className="mt-1 font-display text-2xl font-medium tracking-tight text-paper sm:text-3xl">
                Stories in Motion
              </h2>
              <p className="mt-1 max-w-lg text-sm text-paper/75">
                Character rigging, 3D cartoon acting, 2D horror folktales, and high-energy animation.
              </p>
            </div>

            <button
              type="button"
              onClick={() => open(showreelVideo)}
              className="group inline-flex items-center gap-3.5 rounded-full bg-paper py-2.5 pl-3 pr-6 text-sm font-semibold text-ink shadow-2xl transition-all hover:scale-105 hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper"
              aria-label="Play ANICX Media showreel"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:scale-110">
                <Play size={16} fill="currentColor" aria-hidden="true" />
              </span>
              <span>Watch Showreel</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

