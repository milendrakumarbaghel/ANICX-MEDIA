import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'
import { useEffect, useRef, type RefObject } from 'react'
import { HONEYPOT_FIELD } from '../../lib/forms'
import { siteConfig } from '../../data/siteConfig'
import { Button } from '../ui/Button'

/** Hidden fields every Netlify form needs: form-name and the honeypot. */
export function NetlifyHiddenFields({ formName, honeypotRef }: { formName: string; honeypotRef: RefObject<HTMLInputElement | null> }) {
  return (
    <>
      <input type="hidden" name="form-name" value={formName} />
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input ref={honeypotRef} name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  )
}

export function SubmitButton({ submitting, label }: { submitting: boolean; label: string }) {
  return (
    <Button type="submit" disabled={submitting} aria-disabled={submitting} className="w-full justify-between disabled:opacity-80 sm:w-auto">
      {submitting ? (
        <span className="inline-flex items-center gap-2">
          <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Sending…
        </span>
      ) : (
        label
      )}
    </Button>
  )
}

export function FormSuccess({ title, message, onReset }: { title: string; message: string; onReset: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => ref.current?.focus(), [])
  return (
    <div ref={ref} tabIndex={-1} role="status" className="flex flex-col items-start gap-5 rounded-[var(--radius-card)] border border-line bg-mist p-8 outline-none md:p-10">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-paper">
        <CircleCheck size={22} aria-hidden="true" />
      </span>
      <h3 className="font-display text-heading font-medium">{title}</h3>
      <p className="max-w-lg text-muted">{message}</p>
      <Button variant="secondary" compact onClick={onReset}>
        Send another enquiry
      </Button>
    </div>
  )
}

export function FormError() {
  const { email } = siteConfig.contact
  return (
    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-[#f4c7c3] bg-[#fef3f2] p-4 text-sm text-[#7a271a]">
      <CircleAlert size={18} className="mt-0.5 flex-none" aria-hidden="true" />
      <p>
        Sorry, your enquiry could not be sent. Please check your connection and try again
        {email ? (
          <>
            , or email us at{' '}
            <a href={`mailto:${email}`} className="font-semibold underline">
              {email}
            </a>
          </>
        ) : (
          <>
            , or message us on{' '}
            <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              Instagram
            </a>
          </>
        )}
        .
      </p>
    </div>
  )
}
