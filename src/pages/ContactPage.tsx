import { GraduationCap, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { useScrollReveal } from '../animations/useScrollReveal'
import { CourseEnquiryForm } from '../components/forms/CourseEnquiryForm'
import { ProjectEnquiryForm } from '../components/forms/ProjectEnquiryForm'
import { InstagramIcon, WhatsAppIcon } from '../components/ui/BrandIcons'
import { PageHero } from '../components/ui/PageHero'
import { locationLabel, phoneHref, siteConfig, whatsappHref } from '../data/siteConfig'
import { useHydrated } from '../hooks/useHydrated'
import { cn } from '../lib/cn'
import { organizationJsonLd } from '../lib/head'
import { Seo } from '../lib/seo'

type Tab = 'project' | 'course'

const TABS: { id: Tab; label: string; icon: typeof Sparkles }[] = [
  { id: 'project', label: 'Start a project', icon: Sparkles },
  { id: 'course', label: 'Course enquiry', icon: GraduationCap },
]

function ContactOption({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const external = href?.startsWith('http')
  const content = (
    <>
      <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-paper">{icon}</span>
      <span className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</span>
        <span className="font-medium">{value}</span>
      </span>
    </>
  )
  const cls = 'flex items-center gap-4 rounded-2xl bg-mist p-4 transition-colors'
  return href ? (
    <a href={href} className={cn(cls, 'hover:bg-cloud')} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {content}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  ) : (
    <div className={cls}>{content}</div>
  )
}

export default function ContactPage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollReveal(ref)
  const hydrated = useHydrated()
  const [params] = useSearchParams()
  const [selected, setSelected] = useState<Tab | null>(null)
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ project: null, course: null })

  // Query params are applied after hydration so the prerendered HTML matches.
  const fromUrl = hydrated && params.get('enquiry') === 'course' ? 'course' : 'project'
  const active: Tab = selected ?? fromUrl

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') return
    event.preventDefault()
    const index = TABS.findIndex((tab) => tab.id === active)
    const next =
      event.key === 'Home' ? 0 : event.key === 'End' ? TABS.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length
    setSelected(TABS[next].id)
    tabRefs.current[TABS[next].id]?.focus()
  }

  const { contact, social } = siteConfig
  const tel = phoneHref()
  const whatsapp = whatsappHref()

  return (
    <>
      <Seo
        title="Contact"
        description={`Contact ${siteConfig.name} in ${locationLabel} to start an animation or video project, or to enquire about animation training.`}
        path="/contact"
        jsonLd={[organizationJsonLd()]}
      />
      <PageHero
        eyebrow="Contact"
        title={['Let’s Bring Your', 'Story to Life']}
        intro="Tell us about your project or the course you’re interested in. Choose a form below, or reach us directly."
      />

      <div ref={ref} className="shell grid gap-12 pb-24 md:pb-32 lg:grid-cols-12">
        <aside className="flex flex-col gap-3 lg:col-span-4" aria-label="Contact details" data-reveal>
          {contact.email && (
            <ContactOption icon={<Mail size={18} aria-hidden="true" />} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          )}
          {tel && contact.phone && <ContactOption icon={<Phone size={18} aria-hidden="true" />} label="Phone" value={contact.phone} href={tel} />}
          {whatsapp && <ContactOption icon={<WhatsAppIcon size={18} />} label="WhatsApp" value="Chat with us" href={whatsapp} />}
          <ContactOption icon={<InstagramIcon size={18} />} label="Instagram" value={social.instagram.handle} href={social.instagram.url} />
          <ContactOption icon={<MapPin size={18} aria-hidden="true" />} label="Location" value={locationLabel} />
        </aside>

        <div id="enquiry" className="lg:col-span-8" data-reveal>
          <div role="tablist" aria-label="Enquiry type" className="inline-flex flex-wrap gap-2 rounded-full bg-mist p-1.5">
            {TABS.map(({ id, label, icon: Icon }) => {
              const isActive = id === active
              return (
                <button
                  key={id}
                  ref={(el) => {
                    tabRefs.current[id] = el
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setSelected(id)}
                  onKeyDown={onTabKey}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300',
                    isActive ? 'bg-ink text-paper' : 'text-ink/75 hover:text-ink',
                  )}
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </button>
              )
            })}
          </div>

          <div className="mt-8 rounded-[var(--radius-panel)] border border-line p-6 sm:p-10">
            <div role="tabpanel" id="panel-project" aria-labelledby="tab-project" hidden={active !== 'project'}>
              <h2 className="mb-6 font-display text-heading font-medium">Tell us about your project</h2>
              <ProjectEnquiryForm presetService={hydrated ? params.get('service') : null} />
            </div>
            <div role="tabpanel" id="panel-course" aria-labelledby="tab-course" hidden={active !== 'course'}>
              <h2 className="mb-6 font-display text-heading font-medium">Ask about a course</h2>
              <CourseEnquiryForm presetCourse={hydrated ? params.get('course') : null} idPrefix="contact-course" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
