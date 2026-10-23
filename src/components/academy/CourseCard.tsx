import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '../../lib/cn'
import { isDraft } from '../../lib/content'
import { resolveImage } from '../../lib/media'
import type { Course } from '../../types/content'
import { DraftBadge } from '../ui/DraftBadge'

/** Course cover: the supplied image, or a clean typographic cover until one exists. */
export function CourseCover({ course, index = 0, className }: { course: Course; index?: number; className?: string }) {
  if (course.image) {
    const image = resolveImage(course.image)
    return (
      <div className={cn('media-frame aspect-[4/3]', className)}>
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1024px) 33vw, 100vw"
          width={image.width}
          height={image.height}
          alt={course.image.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }

  const tones = ['bg-ink text-paper', 'bg-[#2b2a27] text-paper', 'bg-cloud text-ink']
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-6',
        tones[index % tones.length],
        className,
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{course.category}</span>
      <span className="font-display text-[clamp(3.5rem,2.5rem+4vw,6rem)] font-medium leading-none tracking-[-0.05em] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:scale-[1.03]">
        {course.category.split(' ')[0]}
      </span>
      <span className="absolute right-6 top-6 h-2.5 w-2.5 rounded-full bg-accent" />
      <span className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full border border-current opacity-15" />
    </div>
  )
}

export function CourseCard({ course, index = 0, headingLevel = 'h3' }: { course: Course; index?: number; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  return (
    <article className="group relative flex h-full flex-col gap-5">
      <div className="relative">
        <CourseCover course={course} index={index} />
        {isDraft(course) && <DraftBadge className="absolute bottom-4 left-4" label="Draft course outline" />}
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <Heading className="font-display text-[clamp(1.3rem,1.1rem+0.6vw,1.65rem)] font-medium leading-tight tracking-tight">
          <Link to={`/academy/${course.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {course.title}
          </Link>
        </Heading>
        <p className="text-[0.95rem] leading-relaxed text-muted">{course.summary}</p>
        {course.skills.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-2" aria-label="Skills covered">
            {course.skills.map((skill) => (
              <li key={skill} className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium text-ink/80">
                {skill}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold" aria-hidden="true">
          View course
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </article>
  )
}
