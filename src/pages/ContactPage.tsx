import { GraduationCap, MapPin, Phone, Sparkles } from 'lucide-react'
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
  { id: 'project', label: 'Start a Project', icon: Sparkles },
  { id: 'course', label: 'Academy Enquiry', icon: GraduationCap },
]

function ContactCard({
  icon,
  label,
  value,
  sublabel,
  href,
  highlight,
}: {
  icon: ReactNode
  label: string
  value: string
  sublabel?: string
  href?: string
  highlight?: boolean
}) {
  const external = href?.startsWith('http')
  const content = (
    <div className="flex items-center gap-4">
      <span
        className={cn(
          'grid h-12 w-12 flex-none place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-105',
          highlight ? 'bg-[#1f7a4d] text-paper' : 'bg-paper text-ink shadow-sm',
        )}
      >
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
        <span className="font-display text-base font-medium text-ink">{value}</span>
        {sublabel && <span className="text-xs text-muted">{sublabel}</span>}
      </div>
    </div>
  )

  const cls = cn(
    'group rounded-2xl border border-line bg-mist p-5 transition-all duration-300 hover:border-ink hover:bg-paper hover:shadow-md',
    highlight && 'border-[#1f7a4d]/40 bg-[#1f7a4d]/5 hover:border-[#1f7a4d]',
  )

  return href ? (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
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
        title="Contact Us"
        description={`Contact ANICX MEDIA in ${locationLabel}: WhatsApp enquiry, direct call, or Google Maps office location.`}
        path="/contact"
        jsonLd={[organizationJsonLd()]}
      />
      <PageHero
        eyebrow="Contact ANICX Media"
        title={['Let’s Discuss', 'Your Next Project']}
        intro="Contact priority: WhatsApp enquiry, direct call, and Google Maps office location. Reach out through the actions below or submit an enquiry."
      />

      <div ref={ref} className="shell grid gap-12 pb-24 md:pb-32 lg:grid-cols-12">
        {/* Left Column: Confirmed Contact Details & Direct Actions */}
        <aside className="flex flex-col gap-4 lg:col-span-4" aria-label="Business contact details" data-reveal>
          <div className="mb-2">
            <span className="eyebrow text-accent">Confirmed Studio Details</span>
            <h2 className="mt-1 font-display text-xl font-medium text-ink">ANICX MEDIA</h2>
            <p className="mt-1 text-sm text-muted">{locationLabel}</p>
          </div>

          {/* Action 1: WhatsApp Us */}
          <ContactCard
            icon={<WhatsAppIcon size={22} />}
            label="WhatsApp (Priority)"
            value={contact.phone}
            sublabel="Chat with ANICX Media on WhatsApp"
            href={whatsapp}
            highlight
          />

          {/* Action 2: Call Us */}
          <ContactCard
            icon={<Phone size={20} />}
            label="Direct Phone Call"
            value={contact.phone}
            sublabel="Call our Seoni studio directly"
            href={tel}
          />

          {/* Action 3: View Location on Google Maps */}
          <ContactCard
            icon={<MapPin size={20} className="text-accent" />}
            label="Office Location"
            value={locationLabel}
            sublabel="View Location on Google Maps"
            href={contact.mapsUrl}
          />

          {/* Social: Instagram */}
          <ContactCard
            icon={<InstagramIcon size={20} />}
            label="Instagram"
            value={social.instagram.handle}
            sublabel="Follow our latest animations & updates"
            href={social.instagram.url}
          />

          {/* Location details card with direct button */}
          <div className="mt-2 rounded-2xl border border-line bg-mist p-5 text-sm text-muted">
            <p className="font-semibold text-ink">Studio Location Notice</p>
            <p className="mt-1 text-xs leading-relaxed">
              Based in Seoni, Madhya Pradesh (480661). Visitors can open the supplied Google Maps link directly without browser geolocation requests.
            </p>
            <div className="mt-4">
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink"
              >
                <MapPin size={14} className="text-accent" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Right Column: Tabbed Enquiry Forms */}
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
                    'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300',
                    isActive ? 'bg-ink text-paper shadow-sm' : 'text-ink/75 hover:text-ink',
                  )}
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </button>
              )
            })}
          </div>

          <div className="mt-8 rounded-[var(--radius-panel)] border border-line bg-paper p-6 sm:p-10 shadow-sm">
            <div role="tabpanel" id="panel-project" aria-labelledby="tab-project" hidden={active !== 'project'}>
              <div className="mb-8">
                <h2 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  Start a Project
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Fill in your project details. We’ll generate a prefilled message and continue directly on WhatsApp.
                </p>
              </div>
              <ProjectEnquiryForm presetService={hydrated ? params.get('service') : null} />
            </div>

            <div role="tabpanel" id="panel-course" aria-labelledby="tab-course" hidden={active !== 'course'}>
              <div className="mb-8">
                <h2 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  Register Interest in Training
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Ask about upcoming batches, syllabus, PC requirements, and live timings for ANICX Academy.
                </p>
              </div>
              <CourseEnquiryForm presetCourse={hydrated ? params.get('course') : null} idPrefix="contact-course" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
