import { Clapperboard, Laptop, MessageCircle } from 'lucide-react'

/**
 * Why learn here. Kept to facts the studio has confirmed: it is a working
 * animation studio, training is online, and details are shared on enquiry.
 */
const academyBenefits = [
  {
    icon: Clapperboard,
    title: 'Learn from a production studio',
    text: 'Training comes from a team that creates animated series and client work, not just tutorials.',
  },
  {
    icon: Laptop,
    title: 'Online and practical',
    text: 'Learn online, from wherever you are, with a focus on hands-on practice.',
  },
  {
    icon: MessageCircle,
    title: 'Ask before you enrol',
    text: 'Send an enquiry and get current details on courses, batches and fees directly from the studio.',
  },
]

export function AcademyBenefits({ tone = 'light' }: { tone?: 'light' | 'mist' }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {academyBenefits.map(({ icon: Icon, title, text }) => (
        <li
          key={title}
          data-stagger
          className={`flex flex-col gap-4 rounded-[var(--radius-card)] border border-line p-6 ${tone === 'light' ? 'bg-paper' : 'bg-mist'}`}
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper">
            <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <h3 className="font-display text-lg font-medium tracking-tight">{title}</h3>
          <p className="text-[0.95rem] leading-relaxed text-muted">{text}</p>
        </li>
      ))}
    </ul>
  )
}
