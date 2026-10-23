import { CircleAlert } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { cn } from '../../lib/cn'

interface FieldShellProps {
  id: string
  label: string
  required?: boolean
  error?: FieldError
  hint?: string
  className?: string
  children: ReactNode
}

export function FieldShell({ id, label, required, error, hint, className, children }: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-accent-ink" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error?.message && (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm font-medium text-[#b42318]">
          <CircleAlert size={16} className="mt-0.5 flex-none" aria-hidden="true" />
          {error.message}
        </p>
      )}
    </div>
  )
}

const describedBy = (id: string, error?: FieldError, hint?: string) =>
  [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined

interface BaseProps {
  id: string
  label: string
  registration: UseFormRegisterReturn
  error?: FieldError
  required?: boolean
  hint?: string
  className?: string
}

export function TextField({
  id,
  label,
  registration,
  error,
  required,
  hint,
  className,
  ...input
}: BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'>) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <input
        id={id}
        className="field-input"
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...input}
        {...registration}
      />
    </FieldShell>
  )
}

export function SelectField({
  id,
  label,
  registration,
  error,
  required,
  hint,
  className,
  options,
  placeholder = 'Please choose…',
  ...select
}: BaseProps & { options: { value: string; label: string }[]; placeholder?: string } & Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    'id' | 'className'
  >) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <select
        id={id}
        className="field-input"
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...select}
        {...registration}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

export function TextAreaField({
  id,
  label,
  registration,
  error,
  required,
  hint,
  className,
  ...textarea
}: BaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className'>) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <textarea
        id={id}
        rows={5}
        className="field-input min-h-36 resize-y"
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...textarea}
        {...registration}
      />
    </FieldShell>
  )
}
