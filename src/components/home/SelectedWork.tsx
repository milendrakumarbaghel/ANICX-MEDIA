import { ExternalLink, Globe, Play } from 'lucide-react'
import { useRef } from 'react'
import { useScrollReveal } from '../../animations/useScrollReveal'
import { useStaggerReveal } from '../../animations/useStaggerReveal'
import { clientChannels } from '../../data/clients'
import { whatsappHref, WHATSAPP_TEMPLATES } from '../../data/siteConfig'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { WhatsAppIcon, YouTubeIcon } from '../ui/BrandIcons'
import { useVideoLightbox } from '../ui/videoLightboxContext'

export function SelectedWork() {
  const ref = useRef<HTMLElement>(null)
  const { open } = useVideoLightbox()
  useScrollReveal(ref)
  useStaggerReveal(ref, { y: 24, stagger: 0.08 })

  // Representative animation client contributions with real video IDs
  const animationContributions = [
    {
      title: 'Pinky Chirkut aur Hero Makdaman',
      channel: 'Chintu Pintu Toons',
      role: '3D Character Animation & Comic Timing',
      youtubeId: 'BZZ_sTI_ooM',
      category: '3D Animation',
    },
    {
      title: 'Rinku Tony Ki Dandia',
      channel: 'Chintu Pintu Toons',
      role: '3D Character Rigging & Scene Assembly',
      youtubeId: '6REn-I_gkRY',
      category: '3D Animation',
    },
  ]

  return (
    <section ref={ref} aria-labelledby="client-work-title" className="section-y">
      <div className="shell">
        <SectionHeading
          id="client-work-title"
          eyebrow="Client Work &amp; Collaborations"
          title={['Selected Projects', 'for Clients & Channels']}
          intro="Delivered web development and representative animation contributions for creator channels and business owners."
          actions={
            <ButtonLink to="/portfolio" variant="secondary">
              View All Work
            </ButtonLink>
          }
        />

        {/* Featured Website Development Case: hotelshantione.in */}
        <div data-reveal className="mt-12 overflow-hidden rounded-[var(--radius-panel)] border border-line bg-mist">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="p-6 sm:p-10 lg:col-span-6 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-ink">
                  <Globe size={13} className="text-accent" />
                  Website Development
                </span>
                <span className="text-xs font-medium text-muted">Client Project</span>
              </div>

              <h3 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                hotelshantione.in
              </h3>

              <p className="mt-3 text-lead text-ink/80">
                A hotel website developed by ANICX Media.
              </p>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                Modern responsive showcase for Hotel Shantione (Suktara, Seoni), presenting AC/non-AC rooms, guest facilities, Google Maps location integration, and direct WhatsApp booking enquiries.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="https://hotelshantione.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-ink/90"
                >
                  <span>Visit Website</span>
                  <ExternalLink size={15} />
                </a>

                <a
                  href={whatsappHref('Hello ANICX Media! I saw hotelshantione.in on your website and would like to discuss a similar website.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-[#1f7a4d] hover:text-[#1f7a4d]"
                >
                  <WhatsAppIcon size={16} />
                  <span>Enquire About a Similar Website</span>
                </a>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden lg:col-span-6 lg:h-full">
              <img
                src="/media/work/hotelshantione-og.jpg"
                alt="Hotel Shantione website developed by ANICX Media"
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-4 right-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-md">
                Live at hotelshantione.in
              </div>
            </div>
          </div>
        </div>

        {/* Representative Animation Contributions */}
        <div className="mt-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between" data-reveal>
            <div>
              <p className="eyebrow">Animation Production</p>
              <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                Representative Animation Contributions
              </h3>
            </div>
            <p className="text-xs text-muted">
              Role accurately labeled per project contribution
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {animationContributions.map((item) => (
              <div
                key={item.title}
                data-stagger
                className="group flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-paper p-5 transition-all hover:border-ink"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-ink">
                  <img
                    src={`/media/work/${item.youtubeId}-960.webp`}
                    alt={item.title}
                    width={960}
                    height={540}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => open({ youtubeId: item.youtubeId, title: item.title })}
                    className="absolute inset-0 grid place-items-center bg-ink/20 opacity-90 transition-opacity hover:opacity-100"
                    aria-label={`Play ${item.title}`}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-ink shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play size={18} fill="currentColor" />
                    </span>
                  </button>
                  <span className="absolute bottom-3 left-3 rounded-md bg-ink/80 px-2 py-1 text-[11px] font-semibold text-paper backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-ink">
                    {item.channel}
                  </span>
                  <h4 className="font-display text-lg font-medium leading-snug tracking-tight text-ink">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted">
                    <span className="font-semibold text-ink">Role:</span> {item.role}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-line/60">
                  <a
                    href={whatsappHref(WHATSAPP_TEMPLATES.portfolio(item.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-[#1f7a4d]"
                  >
                    <WhatsAppIcon size={14} />
                    <span>Enquire about similar animation</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Clients & Collaborations Grid */}
        <div className="mt-16 rounded-[var(--radius-panel)] border border-line bg-mist p-6 sm:p-10" data-reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Client Collaborations</p>
            <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
              Selected Clients &amp; Animation Channels
            </h3>
            <p className="mt-2 text-sm text-muted">
              Owner-confirmed client channels and production collaborations. We accurately label contributions and do not claim sole channel ownership.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clientChannels.map((client) => (
              <div
                key={client.name}
                data-stagger
                className="flex flex-col justify-between rounded-2xl border border-line bg-paper p-5 transition-all hover:border-ink"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-mist text-ink">
                      <YouTubeIcon size={18} />
                    </span>
                    <span className="rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-semibold text-muted">
                      {client.role}
                    </span>
                  </div>

                  <h4 className="mt-3 font-display text-lg font-medium tracking-tight text-ink">
                    {client.name}
                  </h4>

                  {client.description && (
                    <p className="mt-1 text-xs text-muted">
                      {client.description}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-line/60">
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-ink underline-offset-4 hover:underline"
                  >
                    <span>View Channel</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
