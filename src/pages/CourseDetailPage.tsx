import { ArrowLeft, Check } from 'lucide-react'
import { useRef } from 'react'
import { Link, useParams } from 'react-router'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useStaggerReveal } from '../animations/useStaggerReveal'
import { CourseCard, CourseCover } from '../components/academy/CourseCard'
import { EnquirySection } from '../components/academy/EnquirySection'
import { SyllabusAccordion } from '../components/academy/SyllabusAccordion'
import { VideoGrid } from '../components/academy/VideoGrid'
import { Accordion } from '../components/ui/Accordion'
import { ButtonLink } from '../components/ui/Button'
import { DraftBadge } from '../components/ui/DraftBadge'
import { PageHero } from '../components/ui/PageHero'
import { siteConfig } from '../data/siteConfig'
import { getCourse, isDraft, onlyVisible, visibleAcademyFaq, visibleCourses } from '../lib/content'
import { Seo } from '../lib/seo'
import type { Course } from '../types/content'
import NotFoundPage from './NotFoundPage'

const FORMAT_LABELS: Record<keyof NonNullable<Course['format']>, string> = {
  mode: 'Mode',
  duration: 'Duration',
  schedule: 'Schedule',
  language: 'Language',
  level: 'Level',
  fee: 'Fee',
}

export default function CourseDetailPage() {
  const { slug } = useParams()
  const course = getCourse(slug)
  if (!course) return <NotFoundPage />
  return <CourseDetail key={course.slug} course={course} />
}

function CourseDetail({ course }: { course: Course }) {
  const ref = useRef<HTMLDivElement>(null)
  useScrollReveal(ref)
  useStaggerReveal(ref)

  const index = visibleCourses.indexOf(course)
  const facts = Object.entries(course.format ?? {}).filter(([, value]) => Boolean(value)) as [keyof typeof FORMAT_LABELS, string][]
  const faq = [...onlyVisible(course.faq), ...visibleAcademyFaq]
  const related = visibleCourses.filter((c) => c.slug !== course.slug).slice(0, 3)

  const jsonLd =
    course.status === 'approved'
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: course.title,
            description: course.summary,
            provider: { '@type': 'Organization', name: siteConfig.name, ...(siteConfig.url ? { sameAs: siteConfig.url } : {}) },
          },
        ]
      : []

  return (
    <>
      <Seo title={course.title} description={course.summary} path={`/academy/${course.slug}`} jsonLd={jsonLd} />
      <PageHero
        eyebrow={course.category}
        title={[course.title]}
        intro={course.summary}
        actions={<ButtonLink to="#enquire">Enquire about this course</ButtonLink>}
        className="pb-10 md:pb-14"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4" data-intro>
          <Link to="/academy" className="link-underline text-sm font-semibold text-muted hover:text-ink">
            <ArrowLeft size={16} aria-hidden="true" /> All courses
          </Link>
          {isDraft(course) && <DraftBadge label="Draft course outline: not shown in production" />}
        </div>
      </PageHero>

      <div ref={ref}>
        <section aria-labelledby="overview-title" className="shell grid gap-12 pb-20 md:pb-28 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <CourseCover course={course} index={Math.max(index, 0)} />
            {facts.length > 0 && (
              <dl className="mt-8 divide-y divide-line border-y border-line">
                {facts.map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 py-3 text-[0.95rem]">
                    <dt className="text-muted">{FORMAT_LABELS[key]}</dt>
                    <dd className="text-right font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
            <div data-reveal>
              <h2 id="overview-title" className="eyebrow">
                Course overview
              </h2>
              <p className="mt-5 text-lead text-ink/85">{course.overview}</p>
            </div>
            {course.objectives.length > 0 && (
              <div>
                <h2 className="eyebrow" data-reveal>
                  What you’ll learn
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {course.objectives.map((objective) => (
                    <li key={objective} data-stagger className="flex gap-3">
                      <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-ink text-paper">
                        <Check size={14} aria-hidden="true" />
                      </span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {course.skills.length > 0 && (
              <div data-reveal>
                <h2 className="eyebrow">Skills</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <li key={skill} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {course.syllabus.length > 0 && (
          <section aria-labelledby="syllabus-title" className="border-t border-line py-20 md:py-28">
            <div className="shell grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4" data-reveal>
                <p className="eyebrow">Syllabus</p>
                <h2 id="syllabus-title" className="mt-4 text-title">
                  Module by module
                </h2>
              </div>
              <SyllabusAccordion modules={course.syllabus} className="lg:col-span-8" />
            </div>
          </section>
        )}

        {course.sampleLessons.length > 0 && (
          <section aria-labelledby="samples-title" className="shell py-20 md:py-28">
            <h2 id="samples-title" className="text-title" data-reveal>
              Sample lessons
            </h2>
            <div className="mt-10">
              <VideoGrid videos={course.sampleLessons} />
            </div>
          </section>
        )}

        {faq.length > 0 && (
          <section aria-labelledby="faq-title" className="shell grid gap-10 border-t border-line py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-4" data-reveal>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-title" className="mt-4 text-title">
                Questions, answered
              </h2>
            </div>
            <Accordion
              className="lg:col-span-8"
              items={faq.map((item, i) => ({
                id: `faq-${i}`,
                title: item.question,
                badge: isDraft(item) ? <DraftBadge label="Draft" /> : undefined,
                content: <p className="max-w-2xl leading-relaxed">{item.answer}</p>,
              }))}
            />
          </section>
        )}

        <EnquirySection presetCourse={course.slug} title={`Enquire about ${course.title}`} />

        {related.length > 0 && (
          <section aria-labelledby="related-title" className="shell py-20 md:py-28">
            <h2 id="related-title" className="text-title" data-reveal>
              Other courses
            </h2>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} data-stagger>
                  <CourseCard course={item} index={visibleCourses.indexOf(item)} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  )
}
