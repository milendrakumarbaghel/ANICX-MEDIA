import { ArrowRight, GraduationCap } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { useStaggerReveal } from '../../animations/useStaggerReveal'
import { visibleCourses } from '../../lib/content'
import { CourseEnquiryForm } from '../forms/CourseEnquiryForm'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

export function AcademySection() {
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref)

  return (
    <section ref={ref} aria-labelledby="academy-preview-title" className="section-y bg-mist">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="academy-preview-title"
            className="lg:col-span-7"
            eyebrow="ANICX Academy"
            title={['Practical Animation Training', 'From a Working Studio']}
            intro="Learn 3D character animation in Blender, 2D storytelling, and high-impact video editing online."
          />
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" data-reveal>
            <ButtonLink to="/academy">Explore Academy</ButtonLink>
            <ButtonLink to="/academy#enquire" variant="secondary">
              Register Interest
            </ButtonLink>
          </div>
        </div>

        {/* Course Cards Preview */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCourses.map((course) => (
            <div
              key={course.slug}
              data-stagger
              className="flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-paper p-6 transition-all hover:border-ink"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-xs font-semibold text-muted">
                  <GraduationCap size={14} className="text-accent" />
                  {course.category}
                </span>

                <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-ink">
                  {course.title}
                </h3>

                <p className="mt-2 text-sm text-muted">
                  {course.summary}
                </p>

                {course.format && (
                  <div className="mt-4 space-y-1.5 border-t border-line/60 pt-3 text-xs text-muted">
                    {course.format.duration && (
                      <p>
                        <span className="font-semibold text-ink">Duration:</span> {course.format.duration} ({course.format.teachingHours})
                      </p>
                    )}
                    {course.format.mode && (
                      <p>
                        <span className="font-semibold text-ink">Mode:</span> {course.format.mode}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-line">
                <Link
                  to={`/academy/${course.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:underline"
                >
                  <span>View Syllabus &amp; Details</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming-Batch Interest Form */}
        <div className="mt-16 rounded-[var(--radius-panel)] border border-line bg-paper p-6 sm:p-10 lg:p-12" data-reveal>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="eyebrow text-accent">Upcoming Batches</span>
              <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                Register Your Interest
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Batches are organized in small cohorts to ensure direct personal feedback. Fill in your preferred timing and skill level to receive syllabus details and schedule on WhatsApp.
              </p>

              <div className="mt-6 rounded-xl border border-line bg-mist p-4 text-xs text-muted">
                <strong className="text-ink">Transparency Policy:</strong> Training does not guarantee employment. Candidates may be considered for available internships or jobs after skill assessment.
              </div>
            </div>

            <div className="lg:col-span-7">
              <CourseEnquiryForm idPrefix="home-academy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
