import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { visibleServices } from '../../lib/content'
import {
  FORM_NAMES,
  budgetOptions,
  projectEnquirySchema,
  timelineOptions,
  zodResolver,
  type ProjectEnquiryValues,
} from '../../lib/forms'
import { TextAreaField, TextField, SelectField } from './FormField'
import { FormError, FormSuccess, NetlifyHiddenFields, SubmitButton } from './FormParts'
import { useNetlifySubmit } from './useNetlifySubmit'

const serviceOptions = [
  ...visibleServices.map((service) => ({ value: service.title, label: service.title })),
  { value: 'Something else', label: 'Something else' },
]
const toOptions = (values: readonly string[]) => values.map((value) => ({ value, label: value }))

interface ProjectEnquiryFormProps {
  /** Service slug to preselect, e.g. from /contact?service=3d-animation. */
  presetService?: string | null
}

export function ProjectEnquiryForm({ presetService }: ProjectEnquiryFormProps) {
  const { status, setStatus, submit, honeypotRef } = useNetlifySubmit(FORM_NAMES.project)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProjectEnquiryValues>({
    resolver: zodResolver(projectEnquirySchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', phone: '', service: '', budget: '', timeline: '', message: '' },
  })

  useEffect(() => {
    const service = visibleServices.find((s) => s.slug === presetService)
    if (service) setValue('service', service.title)
  }, [presetService, setValue])

  if (status === 'success') {
    return (
      <FormSuccess
        title="Thank you, your enquiry is on its way."
        message="We’ve received your project details and will get back to you soon."
        onReset={() => {
          reset()
          setStatus('idle')
        }}
      />
    )
  }

  return (
    <form
      name={FORM_NAMES.project}
      method="POST"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        if (await submit(values)) reset()
      })}
      className="flex flex-col gap-6"
      aria-describedby="project-form-note"
    >
      <NetlifyHiddenFields formName={FORM_NAMES.project} honeypotRef={honeypotRef} />
      <p id="project-form-note" className="text-sm text-muted">
        Fields marked <span className="text-accent-ink">*</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="project-name" label="Full name" required autoComplete="name" registration={register('name')} error={errors.name} />
        <TextField
          id="project-email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          registration={register('email')}
          error={errors.email}
        />
        <TextField
          id="project-phone"
          label="Phone number"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          hint="Include your country code if outside India."
          registration={register('phone')}
          error={errors.phone}
        />
        <SelectField
          id="project-service"
          label="Interested service"
          required
          options={serviceOptions}
          registration={register('service')}
          error={errors.service}
        />
        <SelectField
          id="project-budget"
          label="Budget range"
          options={toOptions(budgetOptions)}
          placeholder="Select a range"
          registration={register('budget')}
          error={errors.budget}
        />
        <SelectField
          id="project-timeline"
          label="Project timeline"
          options={toOptions(timelineOptions)}
          placeholder="Select a timeline"
          registration={register('timeline')}
          error={errors.timeline}
        />
      </div>

      <TextAreaField
        id="project-message"
        label="Project description"
        required
        placeholder="Tell us about your idea, audience, style references and where the video will be used."
        registration={register('message')}
        error={errors.message}
      />

      {status === 'error' && <FormError />}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton submitting={isSubmitting} label="Send project enquiry" />
        <p className="text-xs text-muted">
          By sending this form you agree to our <Link to="/privacy-policy" className="underline">privacy policy</Link>.
        </p>
      </div>
    </form>
  )
}
