import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { whatsappHref } from '../../data/siteConfig'
import {
  budgetOptions,
  buildProjectWhatsAppMessage,
  deadlineOptions,
  projectEnquirySchema,
  serviceChoices,
  zodResolver,
  type ProjectEnquiryValues,
} from '../../lib/forms'
import { TextAreaField, TextField, SelectField } from './FormField'
import { WhatsAppIcon } from '../ui/BrandIcons'

const serviceOptions = serviceChoices.map((choice) => ({ value: choice, label: choice }))
const toOptions = (values: readonly string[]) => values.map((value) => ({ value, label: value }))

interface ProjectEnquiryFormProps {
  presetService?: string | null
}

const SERVICE_SLUG_MAP: Record<string, string> = {
  '3d-animation': '3D Animation',
  '2d-animation': '2D Animation',
  'animation': '3D Animation',
  'website-development': 'Website Development',
  'web-development': 'Website Development',
  'video-editing': 'Video Editing / Reels',
  'video-editing-reels': 'Video Editing / Reels',
  'social-media-ads': 'Social Media / Ads Availability',
  'digital-marketing': 'Social Media / Ads Availability',
}

export function ProjectEnquiryForm({ presetService }: ProjectEnquiryFormProps) {
  const [openedWhatsApp, setOpenedWhatsApp] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ProjectEnquiryValues>({
    resolver: zodResolver(projectEnquirySchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      service: '',
      businessName: '',
      budget: '',
      deadline: '',
      message: '',
      referenceUrl: '',
    },
  })

  useEffect(() => {
    if (presetService) {
      const mapped = SERVICE_SLUG_MAP[presetService]
      if (mapped) setValue('service', mapped)
    }
  }, [presetService, setValue])

  const onSubmit = (values: ProjectEnquiryValues) => {
    const message = buildProjectWhatsAppMessage(values)
    const url = whatsappHref(message)
    setOpenedWhatsApp(true)
    // Open WhatsApp in new tab / application
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      aria-describedby="project-form-note"
    >
      <p id="project-form-note" className="text-sm text-muted">
        Fields marked <span className="text-accent-ink">*</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="project-name"
          label="Full name"
          required
          autoComplete="name"
          placeholder="e.g. Rahul Sharma"
          registration={register('name')}
          error={errors.name}
        />
        <SelectField
          id="project-service"
          label="Service"
          required
          options={serviceOptions}
          placeholder="Select a service"
          registration={register('service')}
          error={errors.service}
        />
        <TextField
          id="project-business"
          label="Business / Channel name (Optional)"
          placeholder="e.g. My Brand or YouTube Channel"
          registration={register('businessName')}
          error={errors.businessName}
        />
        <SelectField
          id="project-budget"
          label="Budget range (Optional)"
          options={toOptions(budgetOptions)}
          placeholder="Select a range or Need Guidance"
          registration={register('budget')}
          error={errors.budget}
        />
        <SelectField
          id="project-deadline"
          label="Preferred deadline (Optional)"
          options={toOptions(deadlineOptions)}
          placeholder="Select a timeline or Flexible"
          registration={register('deadline')}
          error={errors.deadline}
        />
        <TextField
          id="project-reference"
          label="Reference link or video (Optional)"
          type="url"
          placeholder="https://youtube.com/..."
          registration={register('referenceUrl')}
          error={errors.referenceUrl}
        />
      </div>

      <TextAreaField
        id="project-message"
        label="Project details"
        required
        placeholder="Briefly describe what you want to create (style, duration, key characters or pages needed)."
        registration={register('message')}
        error={errors.message}
      />

      <div className="rounded-xl border border-line bg-mist p-4 text-sm text-muted">
        <p className="font-medium text-ink">
          Your enquiry will open in WhatsApp. Please send the message there to complete it.
        </p>
        <p className="mt-1 text-xs">
          Your details are retained in the form if you return to this window.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-[#1f7a4d] px-7 py-3.5 text-base font-semibold text-paper shadow-md transition-transform hover:-translate-y-0.5 hover:bg-[#1a6640] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7a4d]"
        >
          <WhatsAppIcon size={20} />
          <span>Continue on WhatsApp</span>
        </button>

        <p className="text-xs text-muted">
          By continuing you agree to our{' '}
          <Link to="/privacy-policy" className="underline">
            privacy policy
          </Link>
          .
        </p>
      </div>

      {openedWhatsApp && (
        <p className="text-sm text-muted" aria-live="polite">
          WhatsApp opened in a new tab. If it did not open automatically,{' '}
          <a
            href={whatsappHref(buildProjectWhatsAppMessage(getValues()))}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink underline"
          >
            click here to continue on WhatsApp
          </a>
          .
        </p>
      )}
    </form>
  )
}
