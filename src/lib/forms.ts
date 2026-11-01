import type { FieldError, FieldErrors, FieldValues, Resolver } from 'react-hook-form'
import * as z from 'zod/mini'

/* ------------------------------------------------------------------------ */
/* Netlify Forms                                                            */
/* ------------------------------------------------------------------------ */

export const FORM_NAMES = {
  project: 'project-enquiry',
  course: 'course-enquiry',
} as const

export const HONEYPOT_FIELD = 'bot-field'

export class FormSubmitError extends Error {}

/**
 * Submits a form to Netlify Forms as URL-encoded data.
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
/* Zod resolver for React Hook Form                                         */
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
/* Validation Schemas                                                       */
/* ------------------------------------------------------------------------ */

const trimmed = (...checks: z.core.$ZodCheck<string>[]) => z.string().check(z.trim(), ...checks)

const name = trimmed(
  z.minLength(2, { error: 'Please enter your full name.' }),
  z.maxLength(100, { error: 'Please keep your name under 100 characters.' }),
)

const required = (message: string) => trimmed(z.minLength(1, { error: message }))

export const projectEnquirySchema = z.object({
  name,
  service: required('Please select a service.'),
  message: trimmed(
    z.minLength(10, { error: 'Please share your project details (at least 10 characters).' }),
    z.maxLength(3000, { error: 'Please keep project details under 3000 characters.' }),
  ),
  businessName: trimmed(z.maxLength(120, { error: 'Max 120 characters.' })),
  budget: trimmed(),
  deadline: trimmed(),
  referenceUrl: trimmed(z.maxLength(300, { error: 'Max 300 characters.' })),
})

export type ProjectEnquiryValues = z.infer<typeof projectEnquirySchema>

export const courseEnquirySchema = z.object({
  name,
  course: required('Please choose the course you are interested in.'),
  skillLevel: trimmed(),
  laptopAvailability: trimmed(),
  learningMode: trimmed(),
  timing: trimmed(),
  message: trimmed(z.maxLength(2000, { error: 'Please keep message under 2000 characters.' })),
})

export type CourseEnquiryValues = z.infer<typeof courseEnquirySchema>

export const serviceChoices = [
  '3D Animation',
  '2D Animation',
  'Website Development',
  'Video Editing / Reels',
  'Social Media / Ads Availability',
  'Other / Need Guidance',
] as const

export const budgetOptions = [
  'Under ₹25,000',
  '₹25,000 – ₹75,000',
  '₹75,000 – ₹2,00,000',
  'Above ₹2,00,000',
  'Need Guidance',
] as const

export const deadlineOptions = [
  'As soon as possible',
  'Within 1 month',
  '1 – 3 months',
  'Flexible',
] as const

export const skillLevelOptions = [
  'Beginner (No experience)',
  'Intermediate (Know basics)',
  'Advanced (Working on projects)',
] as const

export const laptopOptions = [
  'Yes, have a laptop/PC ready',
  'Will arrange soon',
  'Need guidance on requirements',
] as const

export const learningModeOptions = [
  'Online Live Classes',
  'Offline (Seoni)',
  'Flexible / Either',
] as const

export const timingOptions = [
  'Weekends',
  'Weekday Evenings',
  'Flexible',
] as const

/**
 * Builds the readable WhatsApp text message for project enquiries.
 * Omit empty optional fields, ending with "Enquiry from ANICX website".
 */
export function buildProjectWhatsAppMessage(values: ProjectEnquiryValues): string {
  const lines: string[] = ['Hello ANICX Media!', '', `Full Name: ${values.name}`, `Service: ${values.service}`]

  if (values.businessName) {
    lines.push(`Business / Channel: ${values.businessName}`)
  }
  if (values.budget) {
    lines.push(`Budget: ${values.budget}`)
  }
  if (values.deadline) {
    lines.push(`Preferred Deadline: ${values.deadline}`)
  }
  lines.push(`Project Details: ${values.message}`)
  if (values.referenceUrl) {
    lines.push(`Reference URL: ${values.referenceUrl}`)
  }

  lines.push('', 'Enquiry from ANICX website')
  return lines.join('\n')
}

/**
 * Builds the readable WhatsApp text message for student enquiries.
 */
export function buildCourseWhatsAppMessage(values: CourseEnquiryValues): string {
  const lines: string[] = [
    'Hello ANICX Academy! I would like information about courses, fees, timings and laptop/PC requirements.',
    '',
    `Student Name: ${values.name}`,
    `Interested Course: ${values.course}`,
  ]

  if (values.skillLevel) {
    lines.push(`Skill Level: ${values.skillLevel}`)
  }
  if (values.laptopAvailability) {
    lines.push(`Laptop/PC Availability: ${values.laptopAvailability}`)
  }
  if (values.learningMode) {
    lines.push(`Preferred Mode: ${values.learningMode}`)
  }
  if (values.timing) {
    lines.push(`Preferred Timing: ${values.timing}`)
  }
  if (values.message) {
    lines.push(`Notes/Questions: ${values.message}`)
  }

  lines.push('', 'Enquiry from ANICX website')
  return lines.join('\n')
}
