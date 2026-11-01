import { ShieldAlert } from 'lucide-react'
import { useRef } from 'react'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { useStaggerReveal } from '../../animations/useStaggerReveal'
import { visibleProjects } from '../../lib/content'
import { FilmShowcase } from '../projects/FilmShowcase'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

export function OriginalsSection() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref, { y: 60 })

  if (!visibleProjects.length) return null

  return (
    <section ref={ref} aria-labelledby="originals-title" className="section-y bg-mist">
      <div className="shell">
        <SectionHeading
          id="originals-title"
          eyebrow="ANICX Original Series"
          title={['Original Stories.', 'Original Worlds.']}
          intro="Original animated series created and published by ANICX Media, presented separately from client commissions."
          actions={
            <ButtonLink to="/portfolio?category=original-series" variant="secondary">
              View All Series
            </ButtonLink>
          }
        />

        {/* Content advisory notice */}
        <div data-reveal className="mt-8 flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-xs text-muted">
          <ShieldAlert size={16} className="flex-none text-accent-ink" />
          <span>
            <strong className="text-ink">Audience Notice:</strong> Panga Toonz is family comedy animation. Raaz Wali Raat contains horror and supernatural folktales intended for mature audiences (18+).
          </span>
        </div>

        <div className="mt-14 flex flex-col gap-24 md:mt-18 md:gap-28">
          {visibleProjects.map((project, index) => (
            <FilmShowcase key={project.slug} project={project} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
