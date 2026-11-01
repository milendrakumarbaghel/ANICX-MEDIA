import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { whatsappHref } from '../../data/siteConfig'
import { visibleCourses } from '../../lib/content'
import {
  buildCourseWhatsAppMessage,
  courseEnquirySchema,
  laptopOptions,
  learningModeOptions,
  skillLevelOptions,
  timingOptions,
  zodResolver,
  type CourseEnquiryValues,
} from '../../lib/forms'
import { SelectField, TextAreaField, TextField } from './FormField'
import { WhatsAppIcon } from '../ui/BrandIcons'

const GENERAL = 'General Academy Enquiry / Not Sure Yet'

const courseOptions = [
  ...visibleCourses.map((course) => ({ value: course.title, label: course.title })),
  { value: GENERAL, label: GENERAL },
]
const toOptions = (values: readonly string[]) => values.map((value) => ({ value, label: value }))

interface CourseEnquiryFormProps {
  presetCourse?: string | null
  idPrefix?: string
}

export function CourseEnquiryForm({ presetCourse, idPrefix = 'course' }: CourseEnquiryFormProps) {
  const [openedWhatsApp, setOpenedWhatsApp] = useState(false)
  const preset = visibleCourses.find((course) => course.slug === presetCourse)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CourseEnquiryValues>({
    resolver: zodResolver(courseEnquirySchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      course: preset?.title ?? '',
      skillLevel: '',
      laptopAvailability: '',
      learningMode: '',
      timing: '',
      message: '',
    },
  })

  useEffect(() => {
    if (preset) setValue('course', preset.title)
  }, [preset, setValue])

  const onSubmit = (values: CourseEnquiryValues) => {
    const message = buildCourseWhatsAppMessage(values)
    const url = whatsappHref(message)
    setOpenedWhatsApp(true)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const id = (field: string) => `${idPrefix}-${field}`

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <p className="text-sm text-muted">
        Fields marked <span className="text-accent-ink">*</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={id('name')}
          label="Full name"
          required
          autoComplete="name"
          placeholder="e.g. Priya Patel"
          registration={register('name')}
          error={errors.name}
        />
        <SelectField
          id={id('course')}
          label="Interested course"
          required
          options={courseOptions}
          placeholder="Select a course or general enquiry"
          registration={register('course')}
          error={errors.course}
        />
        <SelectField
          id={id('skill-level')}
          label="Current skill level (Optional)"
          options={toOptions(skillLevelOptions)}
          placeholder="Select your skill level"
          registration={register('skillLevel')}
          error={errors.skillLevel}
        />
        <SelectField
          id={id('laptop')}
          label="Laptop / PC availability (Optional)"
          options={toOptions(laptopOptions)}
          placeholder="Select availability"
          registration={register('laptopAvailability')}
          error={errors.laptopAvailability}
        />
        <SelectField
          id={id('mode')}
          label="Preferred learning mode (Optional)"
          options={toOptions(learningModeOptions)}
          placeholder="Online or Offline"
          registration={register('learningMode')}
          error={errors.learningMode}
        />
        <SelectField
          id={id('timing')}
          label="Preferred timing (Optional)"
          options={toOptions(timingOptions)}
          placeholder="Weekends or Weekdays"
          registration={register('timing')}
          error={errors.timing}
        />
      </div>

      <TextAreaField
        id={id('message')}
        label="Questions or specific goals (Optional)"
        placeholder="Tell us what you would like to achieve or any questions regarding schedule, software or hardware."
        registration={register('message')}
        error={errors.message}
      />

      <div className="rounded-xl border border-line bg-mist p-4 text-sm text-muted">
        <p className="font-medium text-ink">
          Your enquiry will open in WhatsApp. Please send the message there to complete it.
        </p>
        <p className="mt-1 text-xs">
          Training does not guarantee employment. Candidates may be considered for available internships or jobs after skill assessment.
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
            href={whatsappHref(buildCourseWhatsAppMessage(getValues()))}
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
