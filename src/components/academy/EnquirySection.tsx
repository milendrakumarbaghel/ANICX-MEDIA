import { Mail, Phone } from 'lucide-react'
import { phoneHref, siteConfig, whatsappHref } from '../../data/siteConfig'
import { CourseEnquiryForm } from '../forms/CourseEnquiryForm'
import { InstagramIcon, WhatsAppIcon } from '../ui/BrandIcons'

interface EnquirySectionProps {
  presetCourse?: string | null
  title?: string
  intro?: string
}

/** Course enquiry block (id="enquire"), used on the academy and course pages. */
export function EnquirySection({
  presetCourse,
  title = 'Enquire about training',
  intro = 'Tell us which course you’re interested in. We’ll reply with current details on content, batches and fees.',
}: EnquirySectionProps) {
  const { contact, social } = siteConfig
  const tel = phoneHref()
  const whatsapp = whatsappHref('Hello ANICX MEDIA, I would like to know more about your animation courses.')

  return (
    <section id="enquire" aria-labelledby="enquire-title" className="section-y bg-mist">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4" data-reveal>
          <p className="eyebrow">Student enquiry</p>
          <h2 id="enquire-title" className="text-title">
            {title}
          </h2>
          <p className="text-lead text-muted">{intro}</p>
          <ul className="mt-2 flex flex-col gap-3 text-[0.95rem]">
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="link-underline gap-2 font-medium">
                  <Mail size={16} aria-hidden="true" /> {contact.email}
                </a>
              </li>
            )}
            {tel && (
              <li>
                <a href={tel} className="link-underline gap-2 font-medium">
                  <Phone size={16} aria-hidden="true" /> {contact.phone}
                </a>
              </li>
            )}
            {whatsapp && (
              <li>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="link-underline gap-2 font-medium">
                  <WhatsAppIcon size={16} /> Chat on WhatsApp
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            )}
            <li>
              <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline gap-2 font-medium">
                <InstagramIcon size={16} /> Message us on Instagram
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-[var(--radius-panel)] bg-paper p-6 sm:p-10 lg:col-span-8" data-reveal>
          <CourseEnquiryForm presetCourse={presetCourse} />
        </div>
      </div>
    </section>
  )
}
