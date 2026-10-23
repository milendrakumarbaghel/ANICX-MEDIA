import { useRef } from 'react'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { useStaggerReveal } from '../../animations/useStaggerReveal'
import { isDraft, visibleCourses } from '../../lib/content'
import { AcademyBenefits } from '../academy/AcademyBenefits'
import { CourseCard } from '../academy/CourseCard'
import { SyllabusAccordion } from '../academy/SyllabusAccordion'
import { ButtonLink } from '../ui/Button'
import { DraftBadge } from '../ui/DraftBadge'
import { SectionHeading } from '../ui/SectionHeading'

export function AcademySection() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref)
  const preview = visibleCourses.find((course) => course.syllabus.length > 0)

  return (
    <section ref={ref} aria-labelledby="academy-title" className="py-6 md:py-10">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[var(--radius-panel)] border border-line bg-mist px-5 py-16 sm:px-10 md:py-24 lg:px-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-accent/40" />

          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              id="academy-title"
              className="lg:col-span-7"
              eyebrow="Animation Academy"
              title={['Learn to Create.', 'Learn to Animate.']}
              intro="Explore practical animation training from a creative production studio."
            />
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" data-reveal>
              <ButtonLink to="/academy">Explore Training</ButtonLink>
              <ButtonLink to="/academy#enquire" variant="secondary">
                Course enquiry
              </ButtonLink>
            </div>
          </div>

          <div className="mt-14">
            {visibleCourses.length > 0 ? (
              <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {visibleCourses.map((course, index) => (
                  <li key={course.slug} data-stagger>
                    <CourseCard course={course} index={index} />
                  </li>
                ))}
              </ul>
            ) : (
              <AcademyBenefits />
            )}
          </div>

          {preview && (
            <div className="mt-16 grid gap-8 border-t border-line pt-12 lg:grid-cols-12" data-reveal>
              <div className="lg:col-span-4">
                <p className="eyebrow">Syllabus preview</p>
                <h3 className="mt-3 font-display text-heading font-medium">{preview.title}</h3>
                {isDraft(preview) && <DraftBadge className="mt-4" label="Draft syllabus" />}
                <div className="mt-6">
                  <ButtonLink to={`/academy/${preview.slug}`} variant="secondary" compact>
                    Full course details
                  </ButtonLink>
                </div>
              </div>
              <SyllabusAccordion modules={preview.syllabus} className="lg:col-span-8" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
