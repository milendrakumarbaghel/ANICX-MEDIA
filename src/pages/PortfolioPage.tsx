import { AnimatePresence, m } from 'motion/react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { CategoryFilter } from '../components/portfolio/CategoryFilter'
import { WorkCard } from '../components/portfolio/WorkCard'
import { useCategoryFilter } from '../components/portfolio/useCategoryFilter'
import { ButtonLink } from '../components/ui/Button'
import { ContactCta } from '../components/ui/ContactCta'
import { PageHero } from '../components/ui/PageHero'
import { siteConfig } from '../data/siteConfig'
import { useHydrated } from '../hooks/useHydrated'
import { visibleWork } from '../lib/content'
import { Seo } from '../lib/seo'

export default function PortfolioPage() {
  const hydrated = useHydrated()
  const [params, setParams] = useSearchParams()
  const { options, setCategory, category } = useCategoryFilter(visibleWork)

  // The URL (?category=…) is the source of truth after hydration, so filtered
  // views can be shared and survive back/forward navigation.
  const fromUrl = hydrated ? params.get('category') : null
  const active = fromUrl && options.some((o) => o.id === fromUrl) ? fromUrl : category
  const items = useMemo(
    () => (active === 'all' ? visibleWork : visibleWork.filter((item) => item.category === active)),
    [active],
  )

  const onChange = (id: string) => {
    setCategory(id)
    setParams(id === 'all' ? {} : { category: id }, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <Seo
        title="Work"
        description="Animation portfolio of ANICX MEDIA: 2D animated horror stories, 3D cartoon comedy episodes, trailers and promotional videos."
        path="/portfolio"
      />
      <PageHero
        eyebrow="Our work"
        title={['Stories We’ve', 'Brought to Life']}
        intro="Browse 2D and 3D animation, trailers and promotional work. Press play on any project to watch it right here."
      />

      <section aria-label="Projects" className="shell pb-24 md:pb-32">
        <div className="sticky top-[4.5rem] z-10 -mx-5 bg-paper/90 px-5 py-4 backdrop-blur-md sm:mx-0 sm:px-0">
          <CategoryFilter options={options} value={active} onChange={onChange} />
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {items.length} {items.length === 1 ? 'project' : 'projects'}
        </p>

        <m.ul layout className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => (
              <m.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <WorkCard item={item} sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw" />
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>

        <div className="mt-24 flex flex-col gap-6 rounded-[var(--radius-panel)] bg-mist p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="font-display text-heading font-medium">More on our channels</h2>
            <p className="mt-2 max-w-xl text-muted">Watch more episodes on YouTube and follow the studio on Instagram.</p>
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
