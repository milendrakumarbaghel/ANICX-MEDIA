import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'light' | 'ghost-light'

interface CommonProps {
  children: ReactNode
  variant?: Variant
  compact?: boolean
  /** Arrow bubble on the right. `external` uses a diagonal arrow. */
  arrow?: boolean
  className?: string
}

const classes = (variant: Variant, compact: boolean, arrow: boolean, className?: string) =>
  cn('btn', `btn-${variant}`, compact && 'btn-compact', !arrow && 'pr-6', className)

function ArrowBubble({ external }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight
  return (
    <span className="btn-arrow" aria-hidden="true">
      <Icon size={16} strokeWidth={2} />
      <Icon size={16} strokeWidth={2} />
    </span>
  )
}

interface ButtonLinkProps extends CommonProps {
  to: string
  /** Opens in a new tab with rel="noopener". Detected automatically for http(s) links. */
  external?: boolean
  ariaLabel?: string
}

export function ButtonLink({ to, children, variant = 'primary', compact = false, arrow = true, external, className, ariaLabel }: ButtonLinkProps) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(to)
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowBubble external={isExternal && to.startsWith('http')} />}
    </>
  )

  if (isExternal) {
    const newTab = to.startsWith('http')
    return (
      <a
        href={to}
        className={classes(variant, compact, arrow, className)}
        aria-label={ariaLabel}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
        {newTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    )
  }

  return (
    <Link to={to} className={classes(variant, compact, arrow, className)} aria-label={ariaLabel}>
      {content}
    </Link>
  )
}

interface ButtonProps extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {}

export function Button({ children, variant = 'primary', compact = false, arrow = true, className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={classes(variant, compact, arrow, className)} {...rest}>
      <span>{children}</span>
      {arrow && <ArrowBubble />}
    </button>
  )
}

interface TextLinkProps {
  to: string
  children: ReactNode
  className?: string
}

/** Understated text link with an animated underline and arrow. */
export function TextLink({ to, children, className }: TextLinkProps) {
  const external = /^https?:/.test(to)
  const inner = (
    <>
      {children}
      {external ? <ArrowUpRight size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
    </>
  )
  const cls = cn('link-underline text-sm font-semibold', className)
  return external ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  )
}
