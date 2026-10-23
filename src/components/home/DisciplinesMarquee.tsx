import { visibleServices } from '../../lib/content'

const disciplines = [...visibleServices.map((service) => service.title), 'Animation Training']

/**
 * Slow, GPU-composited ticker of disciplines. Purely decorative: the same list
 * is available to assistive tech as a normal list. Pauses on hover and is
 * static for reduced motion.
 */
export function DisciplinesMarquee() {
  const track = (hidden: boolean) => (
    <ul className="flex flex-none items-center" aria-hidden={hidden || undefined}>
      {disciplines.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-display text-[clamp(1.4rem,1.1rem+1.4vw,2.5rem)] font-medium tracking-tight md:px-10">
            {item}
          </span>
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )

  return (
    <section aria-label="What we do" className="group overflow-hidden border-y border-line py-6 md:py-8">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track(false)}
        {track(true)}
      </div>
    </section>
  )
}
