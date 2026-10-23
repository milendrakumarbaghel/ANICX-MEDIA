import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { visibleCourses } from '../../lib/content'
import { FORM_NAMES, courseEnquirySchema, zodResolver, type CourseEnquiryValues } from '../../lib/forms'
import { SelectField, TextAreaField, TextField } from './FormField'
import { FormError, FormSuccess, NetlifyHiddenFields, SubmitButton } from './FormParts'
import { useNetlifySubmit } from './useNetlifySubmit'

const GENERAL = 'General training enquiry / not sure yet'

const courseOptions = [
  ...visibleCourses.map((course) => ({ value: course.title, label: course.title })),
  { value: GENERAL, label: GENERAL },
]

interface CourseEnquiryFormProps {
  /** Course slug to preselect (course detail page or ?course=slug). */
  presetCourse?: string | null
  /** Prefix for field ids when the form appears more than once. */
  idPrefix?: string
}

export function CourseEnquiryForm({ presetCourse, idPrefix = 'course' }: CourseEnquiryFormProps) {
  const { status, setStatus, submit, honeypotRef } = useNetlifySubmit(FORM_NAMES.course)
  const preset = visibleCourses.find((course) => course.slug === presetCourse)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CourseEnquiryValues>({
    resolver: zodResolver(courseEnquirySchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', phone: '', course: preset?.title ?? '', message: '' },
  })

  useEffect(() => {
    if (preset) setValue('course', preset.title)
  }, [preset, setValue])

  if (status === 'success') {
    return (
      <FormSuccess
        title="Thank you, we’ve received your enquiry."
        message="The academy team will contact you with details about the course you’re interested in."
        onReset={() => {
          reset()
          setStatus('idle')
        }}
      />
    )
  }

  const id = (field: string) => `${idPrefix}-${field}`

  return (
    <form
      name={FORM_NAMES.course}
      method="POST"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        if (await submit(values)) reset({ name: '', email: '', phone: '', course: preset?.title ?? '', message: '' })
      })}
      className="flex flex-col gap-6"
    >
      <NetlifyHiddenFields formName={FORM_NAMES.course} honeypotRef={honeypotRef} />
      <p className="text-sm text-muted">
        Fields marked <span className="text-accent-ink">*</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id={id('name')} label="Full name" required autoComplete="name" registration={register('name')} error={errors.name} />
        <TextField
          id={id('email')}
          label="Email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          registration={register('email')}
          error={errors.email}
        />
        <TextField
          id={id('phone')}
          label="Phone number"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          registration={register('phone')}
          error={errors.phone}
        />
        <SelectField
          id={id('course')}
          label="Interested course"
          required
          options={courseOptions}
          registration={register('course')}
          error={errors.course}
        />
      </div>

      <TextAreaField
        id={id('message')}
        label="Message"
        placeholder="Tell us about your experience so far and what you’d like to learn."
        registration={register('message')}
        error={errors.message}
      />

      {status === 'error' && <FormError />}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton submitting={isSubmitting} label="Send course enquiry" />
        <p className="text-xs text-muted">
          By sending this form you agree to our <Link to="/privacy-policy" className="underline">privacy policy</Link>.
        </p>
      </div>
    </form>
  )
}
