import { useRef } from 'react'
import { useSearchParams } from 'react-router'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useStaggerReveal } from '../animations/useStaggerReveal'
import { AcademyBenefits } from '../components/academy/AcademyBenefits'
import { CourseCard } from '../components/academy/CourseCard'
import { EnquirySection } from '../components/academy/EnquirySection'
import { SyllabusAccordion } from '../components/academy/SyllabusAccordion'
import { VideoGrid } from '../components/academy/VideoGrid'
import { Accordion } from '../components/ui/Accordion'
import { ButtonLink } from '../components/ui/Button'
import { ContactCta } from '../components/ui/ContactCta'
import { DraftBadge } from '../components/ui/DraftBadge'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { useHydrated } from '../hooks/useHydrated'
import { isDraft, visibleAcademyFaq, visibleCourses, visibleReferenceVideos } from '../lib/content'
import { Seo } from '../lib/seo'

export default function AcademyPage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref)
  const hydrated = useHydrated()
  const [params] = useSearchParams()

  const categories = [...new Set(visibleCourses.map((course) => course.category))]
  const withSyllabus = visibleCourses.filter((course) => course.syllabus.length > 0)
  const sampleLessons = visibleCourses.flatMap((course) =>
    course.sampleLessons.map((lesson) => ({ ...lesson, note: course.title })),
  )

  return (
    <>
      <Seo
        title="Animation Academy"
        description="Online animation training from ANICX MEDIA, a creative production studio in Seoni, Madhya Pradesh. Explore courses and send a course enquiry."
        path="/academy"
      />
      <PageHero
        eyebrow="Animation Academy"
        title={['Learn to Create.', 'Learn to Animate.']}
        intro="Explore practical animation training from a creative production studio. Learn online, ask us anything before you enrol, and build real skills."
        actions={
          <>
            {visibleCourses.length > 0 && <ButtonLink to="#courses">View courses</ButtonLink>}
            <ButtonLink to="#enquire" variant="secondary">
              Course enquiry
            </ButtonLink>
          </>
        }
      />

      <div ref={ref}>
        <section aria-labelledby="benefits-title" className="shell pb-20 md:pb-28">
          <h2 id="benefits-title" className="sr-only">
            Why learn with us
          </h2>
          <AcademyBenefits tone="mist" />
        </section>

        <section id="courses" aria-labelledby="courses-title" className="shell pb-20 md:pb-28">
          <SectionHeading id="courses-title" eyebrow="Courses" title={['Training', 'Programmes']} />
          {categories.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Training categories" data-reveal>
              {categories.map((category) => (
                <li key={category} className="rounded-full bg-mist px-4 py-2 text-sm font-medium">
                  {category}
                </li>
              ))}
            </ul>
          )}
          {visibleCourses.length > 0 ? (
            <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCourses.map((course, index) => (
                <li key={course.slug} data-stagger>
                  <CourseCard course={course} index={index} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12 flex flex-col gap-6 rounded-[var(--radius-panel)] border border-line p-8 md:flex-row md:items-center md:justify-between md:p-12" data-reveal>
              <div>
                <h3 className="font-display text-heading font-medium">The course line-up is being finalised</h3>
                <p className="mt-2 max-w-xl text-muted">
                  Send an enquiry and we’ll share the courses and batches currently open.
                </p>
              </div>
              <ButtonLink to="#enquire">Enquire now</ButtonLink>
            </div>
          )}
        </section>

        {withSyllabus.length > 0 && (
          <section aria-labelledby="syllabus-title" className="border-t border-line py-20 md:py-28">
            <div className="shell">
              <SectionHeading id="syllabus-title" eyebrow="Syllabus previews" title={['What You’ll', 'Work Through']} />
              <div className="mt-12 flex flex-col gap-16">
                {withSyllabus.map((course) => (
                  <div key={course.slug} className="grid gap-6 lg:grid-cols-12" data-reveal>
                    <div className="lg:col-span-4">
                      <h3 className="font-display text-heading font-medium">{course.title}</h3>
                      {isDraft(course) && <DraftBadge className="mt-3" label="Draft syllabus" />}
                      <div className="mt-5">
                        <ButtonLink to={`/academy/${course.slug}`} variant="secondary" compact>
                          Course details
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

        {sampleLessons.length > 0 && (
          <section aria-labelledby="samples-title" className="shell py-20 md:py-28">
            <SectionHeading id="samples-title" eyebrow="Sample lessons" title={['Watch Before', 'You Enrol']} />
            <div className="mt-12">
              <VideoGrid videos={sampleLessons} />
            </div>
          </section>
        )}

        {visibleReferenceVideos.length > 0 && (
          <section aria-labelledby="references-title" className="shell py-20 md:py-28">
            <SectionHeading
              id="references-title"
              eyebrow="Style references"
              title={['The Kind of Work', 'You’ll Learn to Make']}
              intro="Example videos from other creators, shown for reference only. They are not ANICX MEDIA productions."
            />
            {visibleReferenceVideos.some(isDraft) && <DraftBadge className="mt-6" label="Draft: videos not yet selected" />}
            <div className="mt-12">
              <VideoGrid
                videos={visibleReferenceVideos.map((video) => ({
                  ...video,
                  credit: { label: video.creator, url: video.creatorUrl },
                }))}
              />
            </div>
          </section>
        )}

        {visibleAcademyFaq.length > 0 && (
          <section aria-labelledby="faq-title" className="shell grid gap-10 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading id="faq-title" eyebrow="FAQ" title={['Questions,', 'Answered']} />
            </div>
            <Accordion
              className="lg:col-span-8"
              items={visibleAcademyFaq.map((item, index) => ({
                id: `faq-${index}`,
                title: item.question,
                badge: isDraft(item) ? <DraftBadge label="Draft" /> : undefined,
                content: <p className="max-w-2xl leading-relaxed">{item.answer}</p>,
              }))}
            />
          </section>
        )}

        <EnquirySection presetCourse={hydrated ? params.get('course') : null} />
      </div>

      <div className="pt-16">
        <ContactCta title={['Ready to Start', 'Learning?']} subtitle="Questions about training or a project? We’d love to hear from you." />
      </div>
    </>
  )
}
