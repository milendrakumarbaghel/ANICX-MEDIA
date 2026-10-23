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
    <section ref={ref} aria-labelledby="originals-title" className="section-y">
      <div className="shell">
        <SectionHeading
          id="originals-title"
          eyebrow="Original projects"
          title={['Original Stories.', 'Original Worlds.']}
          intro="Animated series released on YouTube, from a Hindi horror anthology to a desi family comedy."
          actions={
            <ButtonLink to="/projects" variant="secondary">
              All projects
            </ButtonLink>
          }
        />
        <div className="mt-16 flex flex-col gap-24 md:mt-20 md:gap-32">
          {visibleProjects.map((project, index) => (
            <FilmShowcase key={project.slug} project={project} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
