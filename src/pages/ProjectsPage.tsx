import { useRef } from 'react'
import { useStaggerReveal } from '../animations/useStaggerReveal'
import { FilmShowcase } from '../components/projects/FilmShowcase'
import { ContactCta } from '../components/ui/ContactCta'
import { PageHero } from '../components/ui/PageHero'
import { visibleProjects } from '../lib/content'
import { Seo } from '../lib/seo'

export default function ProjectsPage() {
  const ref = useRef<HTMLElement>(null)
  useStaggerReveal(ref, { y: 60 })

  return (
    <>
      <Seo
        title="Original Projects"
        description="Original animated series by ANICX MEDIA, including Raaz Wali Raat (2D Hindi horror stories) and Panga Toonz (3D desi comedy)."
        path="/projects"
      />
      <PageHero
        eyebrow="Original projects"
        title={['Original Stories.', 'Original Worlds.']}
        intro="Animated series with their own characters, worlds and audiences. Watch trailers and episodes, or explore each project."
      />
      <section ref={ref} aria-label="Original projects" className="shell flex flex-col gap-24 pb-24 md:gap-32 md:pb-32">
        {visibleProjects.map((project, index) => (
          <FilmShowcase key={project.slug} project={project} reverse={index % 2 === 1} headingLevel="h2" />
        ))}
      </section>
      <ContactCta title={['Have a Story', 'Worth Animating?']} subtitle="From a pilot episode to a full series, let’s talk about your idea." />
    </>
  )
}
