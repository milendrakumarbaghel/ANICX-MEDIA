import type { FieldError, FieldErrors, FieldValues, Resolver } from 'react-hook-form'
import * as z from 'zod/mini'
import { siteConfig } from '../data/siteConfig'

/* ------------------------------------------------------------------------ */
/* Netlify Forms                                                            */
/* Form names and field names must match public/__forms.html exactly.       */
/* ------------------------------------------------------------------------ */

export const FORM_NAMES = {
  project: 'project-enquiry',
  course: 'course-enquiry',
} as const

export const HONEYPOT_FIELD = 'bot-field'

export class FormSubmitError extends Error {}

/**
 * Submits a form to Netlify Forms as URL-encoded data (Netlify does not
 * accept JSON). In local development there is no Netlify form handler, so
 * the submission is logged and treated as successful.
 */
export async function submitNetlifyForm(formName: string, values: Record<string, string>): Promise<void> {
  const body = new URLSearchParams({ 'form-name': formName, ...values }).toString()

  if (import.meta.env.DEV) {
    console.info(`[dev] Netlify form "${formName}" would submit:`, Object.fromEntries(new URLSearchParams(body)))
    await new Promise((resolve) => setTimeout(resolve, 700))
    return
  }

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!response.ok) {
    throw new FormSubmitError(`Form submission failed with status ${response.status}`)
  }
}

/** Converts form values to strings for URL encoding. */
export function toFormValues(values: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined || value === null) continue
    result[key] = String(value)
  }
  return result
}

/* ------------------------------------------------------------------------ */
/* Zod resolver for React Hook Form (small local version, no extra package) */
/* ------------------------------------------------------------------------ */

export function zodResolver<TValues extends FieldValues>(schema: z.ZodMiniType<TValues>): Resolver<TValues> {
  return async (values) => {
    const result = await z.safeParseAsync(schema, values)
    if (result.success) {
      return { values: result.data, errors: {} }
    }
    const errors: Record<string, FieldError> = {}
    for (const issue of result.error.issues) {
      const path = issue.path.join('.')
      if (path && !errors[path]) {
        errors[path] = { type: issue.code, message: issue.message }
      }
    }
    return { values: {}, errors: errors as FieldErrors<TValues> }
  }
}

/* ------------------------------------------------------------------------ */
/* Schemas                                                                  */
/* ------------------------------------------------------------------------ */

// zod/mini: the same Zod validation with a tree-shakable API (much smaller bundle).
const trimmed = (...checks: z.core.$ZodCheck<string>[]) => z.string().check(z.trim(), ...checks)

const name = trimmed(
  z.minLength(2, { error: 'Please enter your full name.' }),
  z.maxLength(100, { error: 'Please keep your name under 100 characters.' }),
)

const email = z.pipe(
  trimmed(z.minLength(1, { error: 'Please enter your email address.' })),
  z.email({ error: 'Please enter a valid email address, like name@example.com.' }),
)

const phone = trimmed(
  z.minLength(1, { error: 'Please enter your phone number.' }),
  z.regex(/^\+?[\d\s()-]{7,20}$/, { error: 'Please enter a valid phone number, e.g. +91 98765 43210.' }),
  z.refine((value) => value.replace(/\D/g, '').length >= 7, { error: 'Please enter a valid phone number.' }),
)

const required = (message: string) => trimmed(z.minLength(1, { error: message }))

export const projectEnquirySchema = z.object({
  name,
  email,
  phone,
  service: required('Please choose the service you are interested in.'),
  budget: trimmed(),
  timeline: trimmed(),
  message: trimmed(
    z.minLength(20, { error: 'Please tell us a little more about your project (at least 20 characters).' }),
    z.maxLength(3000, { error: 'Please keep your message under 3000 characters.' }),
  ),
})

export type ProjectEnquiryValues = z.infer<typeof projectEnquirySchema>

export const courseEnquirySchema = z.object({
  name,
  email,
  phone,
  course: required('Please choose the course you are interested in.'),
  message: trimmed(z.maxLength(2000, { error: 'Please keep your message under 2000 characters.' })),
})

export type CourseEnquiryValues = z.infer<typeof courseEnquirySchema>

export const budgetOptions = siteConfig.forms.budgetRanges
export const timelineOptions = siteConfig.forms.timelines
