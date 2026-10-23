import { cn } from '../../lib/cn'

/**
 * Visible marker for unapproved content. Drafts only render in development
 * and deploy previews, never in production builds.
 */
export function DraftBadge({ className, label = 'Draft · awaiting client approval' }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#b45309] bg-[#fffbeb] px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-[#92400e]',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" aria-hidden="true" />
      {label}
    </span>
  )
}
