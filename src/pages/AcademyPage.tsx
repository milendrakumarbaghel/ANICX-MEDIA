import { Briefcase, ShieldAlert } from 'lucide-react'
import { useRef } from 'react'
import { useSearchParams } from 'react-router'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useStaggerReveal } from '../animations/useStaggerReveal'
import { CourseCard } from '../components/academy/CourseCard'
import { EnquirySection } from '../components/academy/EnquirySection'
import { SyllabusAccordion } from '../components/academy/SyllabusAccordion'
import { Accordion } from '../components/ui/Accordion'
import { ButtonLink } from '../components/ui/Button'
import { ContactCta } from '../components/ui/ContactCta'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { EMPLOYMENT_DISCLAIMER } from '../data/courses'
import { useHydrated } from '../hooks/useHydrated'
import { visibleAcademyFaq, visibleCourses } from '../lib/content'
import { Seo } from '../lib/seo'

export default function AcademyPage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref)
  const hydrated = useHydrated()
  const [params] = useSearchParams()

  const categories = [...new Set(visibleCourses.map((course) => course.category))]
  const withSyllabus = visibleCourses.filter((course) => course.syllabus.length > 0)

  return (
    <>
      <Seo
        title="ANICX Academy | Animation Training"
        description="Practical animation training from ANICX MEDIA: 3D character animation in Blender, 2D animation foundations, and video editing for creators. Register interest for upcoming batches."
        path="/academy"
      />
      <PageHero
        eyebrow="ANICX Academy"
        title={['Practical Animation Training.', 'Creative Growth.']}
        intro="Practical animation training, workshops, portfolio development and available internships. Learn practical workflows directly from a working animation studio."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink to="#courses">View Courses</ButtonLink>
            <ButtonLink to="#enquire" variant="secondary">
              Register Interest
            </ButtonLink>
          </div>
        }
      />

      <div ref={ref}>
        {/* Employment & Training Distinction Notice */}
        <section aria-label="Training and employment policy" className="shell pb-12">
          <div className="rounded-[var(--radius-panel)] border border-line bg-mist p-6 sm:p-8">
            <div className="flex items-start gap-3.5">
              <ShieldAlert size={22} className="mt-0.5 flex-none text-accent-ink" />
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Training, Internship &amp; Employment Distinction
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">
                  {EMPLOYMENT_DISCLAIMER}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line/60 pt-4 text-xs text-muted">
                  <Briefcase size={14} className="text-ink" />
                  <span className="font-semibold text-ink">Current Openings:</span>
                  <span>No open employee positions currently. Skill-based internship opportunities are evaluated upon portfolio review.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" aria-labelledby="courses-title" className="shell pb-20 md:pb-28">
          <SectionHeading
            id="courses-title"
            eyebrow="Courses &amp; Syllabus"
            title={['Confirmed Training', 'Programmes']}
            intro="Detailed course curricula with live instruction hours, software requirements, and final portfolio deliverables."
          />
          {categories.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Training categories" data-reveal>
              {categories.map((category) => (
                <li key={category} className="rounded-full bg-mist px-4 py-2 text-sm font-medium">
                  {category}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCourses.map((course, index) => (
              <li key={course.slug} data-stagger>
                <CourseCard course={course} index={index} />
              </li>
            ))}
          </ul>
        </section>

        {/* Syllabus Previews */}
        {withSyllabus.length > 0 && (
          <section aria-labelledby="syllabus-title" className="border-t border-line py-20 md:py-28">
            <div className="shell">
              <SectionHeading
                id="syllabus-title"
                eyebrow="Curriculum Details"
                title={['Syllabus', 'Breakdown']}
                intro="Hands-on step-by-step modules designed for practical digital production."
              />
              <div className="mt-12 flex flex-col gap-16">
                {withSyllabus.map((course) => (
                  <div key={course.slug} className="grid gap-6 lg:grid-cols-12" data-reveal>
                    <div className="lg:col-span-4">
                      <h3 className="font-display text-2xl font-medium tracking-tight text-ink">{course.title}</h3>
                      <p className="mt-2 text-sm text-muted">{course.summary}</p>
                      <div className="mt-5">
                        <ButtonLink to={`/academy/${course.slug}`} variant="secondary" compact>
                          Full Course Details
                        </ButtonLink>
                      </div>
                    </div>
                    <SyllabusAccordion modules={course.syllabus} defaultOpenFirst={false} className="lg:col-span-8" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        {visibleAcademyFaq.length > 0 && (
          <section aria-labelledby="faq-title" className="shell grid gap-10 border-t border-line py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading id="faq-title" eyebrow="Academy FAQ" title={['Frequently Asked', 'Questions']} />
            </div>
            <Accordion
              className="lg:col-span-8"
              items={visibleAcademyFaq.map((item, index) => ({
                id: `faq-${index}`,
                title: item.question,
                content: <p className="max-w-2xl text-sm leading-relaxed text-muted">{item.answer}</p>,
              }))}
            />
          </section>
        )}

        {/* Register Interest Form */}
        <EnquirySection presetCourse={hydrated ? params.get('course') : null} />
      </div>

      <div className="pt-16">
        <ContactCta title={['Ready to Build', 'Your Animation Skills?']} subtitle="Register interest today to receive upcoming batch dates and syllabus details on WhatsApp." />
      </div>
    </>
  )
}
