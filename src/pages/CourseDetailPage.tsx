import { ArrowLeft, Check, ShieldAlert } from 'lucide-react'
import { useRef } from 'react'
import { Link, useParams } from 'react-router'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useStaggerReveal } from '../animations/useStaggerReveal'
import { CourseCard, CourseCover } from '../components/academy/CourseCard'
import { EnquirySection } from '../components/academy/EnquirySection'
import { SyllabusAccordion } from '../components/academy/SyllabusAccordion'
import { Accordion } from '../components/ui/Accordion'
import { ButtonLink } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'
import { EMPLOYMENT_DISCLAIMER } from '../data/courses'
import { whatsappHref, WHATSAPP_TEMPLATES } from '../data/siteConfig'
import { getCourse, onlyVisible, visibleAcademyFaq, visibleCourses } from '../lib/content'
import { Seo } from '../lib/seo'
import { WhatsAppIcon } from '../components/ui/BrandIcons'
import type { Course } from '../types/content'
import NotFoundPage from './NotFoundPage'

const FORMAT_LABELS: Record<keyof NonNullable<Course['format']>, string> = {
  level: 'Level',
  duration: 'Duration',
  teachingHours: 'Live Teaching Hours',
  mode: 'Mode',
  schedule: 'Schedule',
  language: 'Language',
  fee: 'Fee Structure',
  requiredDevice: 'Required Device / Software',
  assignments: 'Assignments',
  feedback: 'Feedback Process',
  portfolioOutcome: 'Final Portfolio Outcome',
  cancellationRefund: 'Cancellation & Refund Terms',
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
  const facts = Object.entries(course.format ?? {}).filter(([, value]) => Boolean(value)) as [
    keyof typeof FORMAT_LABELS,
    string,
  ][]
  const faq = [...onlyVisible(course.faq), ...visibleAcademyFaq]
  const related = visibleCourses.filter((c) => c.slug !== course.slug).slice(0, 3)

  const whatsappUrl = whatsappHref(WHATSAPP_TEMPLATES.training)

  return (
    <>
      <Seo
        title={`${course.title} | ANICX Academy`}
        description={course.summary}
        path={`/academy/${course.slug}`}
      />
      <PageHero
        eyebrow={`ANICX Academy · ${course.category}`}
        title={[course.title]}
        intro={course.summary}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink to="#enquire">Register Interest</ButtonLink>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-[#1f7a4d] hover:text-[#1f7a4d]"
            >
              <WhatsAppIcon size={16} />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        }
        className="pb-10 md:pb-14"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4" data-intro>
          <Link to="/academy" className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">
            <ArrowLeft size={16} aria-hidden="true" /> All Courses
          </Link>
        </div>
      </PageHero>

      <div ref={ref}>
        {/* Employment distinction notice */}
        <div className="shell pb-10">
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-mist p-5 text-sm text-muted">
            <ShieldAlert size={18} className="mt-0.5 flex-none text-accent-ink" />
            <div>
              <p className="font-semibold text-ink">Important Note on Training &amp; Employment:</p>
              <p className="mt-1">{EMPLOYMENT_DISCLAIMER}</p>
            </div>
          </div>
        </div>

        {/* Overview & Format Facts */}
        <section aria-labelledby="overview-title" className="shell grid gap-12 pb-20 md:pb-28 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <CourseCover course={course} index={Math.max(index, 0)} />

            {/* Course Facts: syllabus, level, duration, live hours, mode, schedule, fees, device, refund */}
            {facts.length > 0 && (
              <dl className="mt-8 divide-y divide-line rounded-2xl border border-line bg-mist/60 p-6">
                {facts.map(([key, value]) => (
                  <div key={key} className="flex flex-col py-3 first:pt-0 last:pb-0 text-sm">
                    <dt className="font-semibold text-ink/75">{FORMAT_LABELS[key] ?? key}</dt>
                    <dd className="mt-0.5 text-muted">{value}</dd>
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
              <p className="mt-4 text-lead text-ink/85">{course.overview}</p>
            </div>

            {course.objectives.length > 0 && (
              <div>
                <h3 className="eyebrow" data-reveal>
                  What you’ll learn
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {course.objectives.map((objective) => (
                    <li key={objective} data-stagger className="flex gap-3 text-[0.95rem] text-ink/85">
                      <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-ink text-paper">
                        <Check size={12} aria-hidden="true" />
                      </span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {course.skills.length > 0 && (
              <div data-reveal>
                <h3 className="eyebrow">Skills Acquired</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <li key={skill} className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs font-semibold text-ink">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Syllabus Module by Module */}
        {course.syllabus.length > 0 && (
          <section aria-labelledby="syllabus-title" className="border-t border-line py-20 md:py-28">
            <div className="shell grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4" data-reveal>
                <p className="eyebrow">Syllabus</p>
                <h2 id="syllabus-title" className="mt-3 text-title font-display text-3xl font-medium tracking-tight text-ink">
                  Module by Module
                </h2>
                <p className="mt-3 text-sm text-muted">
                  Hands-on curriculum structured for step-by-step skill mastery.
                </p>
              </div>
              <SyllabusAccordion modules={course.syllabus} className="lg:col-span-8" />
            </div>
          </section>
        )}

        {/* FAQs */}
        {faq.length > 0 && (
          <section aria-labelledby="faq-title" className="shell grid gap-10 border-t border-line py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-4" data-reveal>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-title" className="mt-3 text-title font-display text-3xl font-medium tracking-tight text-ink">
                Questions Answered
              </h2>
            </div>
            <Accordion
              className="lg:col-span-8"
              items={faq.map((item, i) => ({
                id: `faq-${i}`,
                title: item.question,
                content: <p className="max-w-2xl text-sm leading-relaxed text-muted">{item.answer}</p>,
              }))}
            />
          </section>
        )}

        {/* Register Interest Form */}
        <EnquirySection presetCourse={course.title} title={`Register Interest in ${course.title}`} />

        {related.length > 0 && (
          <section aria-labelledby="related-title" className="shell border-t border-line py-20 md:py-28">
            <h2 id="related-title" className="text-title font-display text-2xl font-medium tracking-tight text-ink">
              Other Academy Courses
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
