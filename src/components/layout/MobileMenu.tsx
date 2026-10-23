import { AnimatePresence, m, type Variants } from 'motion/react'
import { useEffect } from 'react'
import { NavLink } from 'react-router'
import { mainNav } from '../../app/navigation'
import { setScrollLocked } from '../../animations/smoothScroll'
import { siteConfig, whatsappHref } from '../../data/siteConfig'
import { cn } from '../../lib/cn'
import { InstagramIcon, WhatsAppIcon } from '../ui/BrandIcons'
import { ButtonLink } from '../ui/Button'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const panel: Variants = {
  closed: { clipPath: 'inset(0 0 100% 0)' },
  open: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
  exit: { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.05 } },
}

const list: Variants = {
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

const item: Variants = {
  closed: { y: '110%' },
  open: { y: '0%', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { y: '0%', opacity: 0, transition: { duration: 0.2 } },
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return
    setScrollLocked(true)
    const onResize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) onClose()
    }
    window.addEventListener('resize', onResize)
    return () => {
      setScrollLocked(false)
      window.removeEventListener('resize', onResize)
    }
  }, [open, onClose])

  const whatsapp = whatsappHref()

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-paper lg:hidden"
          variants={panel}
          initial="closed"
          animate="open"
          exit="exit"
          data-lenis-prevent
        >
          <div className="shell flex min-h-full flex-col justify-between gap-10 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8">
            <nav aria-label="Mobile">
              <m.ul variants={list} initial="closed" animate="open" exit="exit" className="flex flex-col">
                {mainNav.map((link, index) => (
                  <li key={link.to} className="overflow-hidden border-b border-line">
                    <m.div variants={item}>
                      <NavLink
                        to={link.to}
                        onClick={onClose}
                        data-autofocus={index === 0 ? true : undefined}
                        className={({ isActive }) =>
                          cn(
                            'flex items-baseline justify-between py-4 font-display text-[clamp(2rem,9vw,3rem)] font-medium tracking-tight',
                            isActive ? 'text-ink' : 'text-ink/80',
                          )
                        }
                      >
                        {link.label}
                        <span className="font-sans text-xs font-semibold text-muted">0{index + 1}</span>
                      </NavLink>
                    </m.div>
                  </li>
                ))}
              </m.ul>
            </nav>

            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="flex flex-col gap-6"
            >
              <ButtonLink to="/contact" className="w-full justify-between">
                Let’s Talk
              </ButtonLink>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
                <a
                  href={siteConfig.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <InstagramIcon size={18} /> {siteConfig.social.instagram.handle}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                {whatsapp && (
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <WhatsAppIcon size={18} /> WhatsApp
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
