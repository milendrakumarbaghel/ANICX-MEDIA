import { AnimatePresence, m } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { CategoryFilter } from '../components/portfolio/CategoryFilter'
import { WorkCard } from '../components/portfolio/WorkCard'
import { matchesCategory, useCategoryFilter } from '../components/portfolio/useCategoryFilter'
import { ButtonLink } from '../components/ui/Button'
import { ContactCta } from '../components/ui/ContactCta'
import { PageHero } from '../components/ui/PageHero'
import { YouTubeIcon } from '../components/ui/BrandIcons'
import { clientChannels } from '../data/clients'
import { siteConfig } from '../data/siteConfig'
import { useHydrated } from '../hooks/useHydrated'
import { visibleWork } from '../lib/content'
import { Seo } from '../lib/seo'

export default function PortfolioPage() {
  const hydrated = useHydrated()
  const [params, setParams] = useSearchParams()
  const { options, setCategory, category } = useCategoryFilter(visibleWork)

  // URL ?category=... is source of truth after hydration
  const fromUrl = hydrated ? params.get('category') : null
  const active = fromUrl && options.some((o) => o.id === fromUrl) ? fromUrl : category

  const items = useMemo(
    () => visibleWork.filter((item) => matchesCategory(item, active)),
    [active],
  )

  const onChange = (id: string) => {
    setCategory(id)
    setParams(id === 'all' ? {} : { category: id }, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <Seo
        title="Our Work"
        description="Browse ANICX Media work: website development, 2D and 3D animation, video editing and original animated series."
        path="/portfolio"
      />
      <PageHero
        eyebrow="Our Work"
        title={['Stories in Motion.', 'Businesses Online.']}
        intro="Browse client web development, animation production, video editing, and our original animated series. Filter by category below."
        actions={
          <ButtonLink to="/contact?enquiry=project#enquiry">
            Start a Project
          </ButtonLink>
        }
      />

      <section aria-label="Portfolio filters and projects" className="shell pb-24 md:pb-32">
        <div className="sticky top-[4.5rem] z-10 -mx-5 bg-paper/90 px-5 py-4 backdrop-blur-md sm:mx-0 sm:px-0">
          <CategoryFilter options={options} value={active} onChange={onChange} />
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {items.length} {items.length === 1 ? 'project' : 'projects'}
        </p>

        <m.ul layout className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => (
              <m.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <WorkCard item={item} headingLevel="h2" sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw" />
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>

        {/* Selected Clients & Collaborations Grid */}
        <div className="mt-24 rounded-[var(--radius-panel)] border border-line bg-mist p-8 md:p-12">
          <div className="max-w-2xl">
            <span className="eyebrow text-accent">Client Relationships</span>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Selected Clients &amp; Collaborations
            </h2>
            <p className="mt-2 text-sm text-muted">
              Owner-provided animation and creator collaborations. We accurately label individual contributions and retain direct channel destinations.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clientChannels.map((client) => (
              <div
                key={client.name}
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

                  <h3 className="mt-3 font-display text-lg font-medium tracking-tight text-ink">
                    {client.name}
                  </h3>

                  {client.description && (
                    <p className="mt-1 text-xs text-muted">
                      {client.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-line/60">
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

        {/* Official Channels Block */}
        <div className="mt-12 flex flex-col gap-6 rounded-[var(--radius-panel)] bg-mist p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h3 className="font-display text-xl font-medium text-ink">Watch More on Our Studio Channels</h3>
            <p className="mt-1 max-w-xl text-sm text-muted">Full episodes and original series on YouTube, updates on Instagram.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {siteConfig.social.youtube.map((channel) => (
              <ButtonLink key={channel.url} to={channel.url} variant="secondary" compact>
                {channel.label}
              </ButtonLink>
            ))}
            <ButtonLink to={siteConfig.social.instagram.url} variant="secondary" compact>
              Instagram
            </ButtonLink>
          </div>
        </div>
      </section>

      <ContactCta title={['Like What', 'You See?']} subtitle="Tell us about your project and we’ll help you bring it to life." />
    </>
  )
}
