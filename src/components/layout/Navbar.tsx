import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { mainNav } from '../../app/navigation'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const headerRef = useRef<HTMLElement>(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // While the menu is open, keep focus within the header (menu + toggle button).
  useFocusTrap(headerRef, menuOpen, closeMenu)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setMenuOpen(false)
  }

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Background lives on its own layer: a backdrop-filter on <header> itself
          would become the containing block for the fixed mobile menu. */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10 border-b transition-[background-color,box-shadow,border-color] duration-300',
          scrolled || menuOpen
            ? 'border-line bg-paper/90 shadow-[0_6px_24px_-18px_rgba(22,22,22,0.35)] backdrop-blur-md'
            : 'border-transparent bg-paper/70 backdrop-blur-sm',
        )}
      />
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Logo onClick={closeMenu} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn('link-underline text-[0.95rem] font-medium', isActive ? 'text-ink' : 'text-ink/75 hover:text-ink')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink to="/contact" compact className="hidden sm:inline-flex">
            Let’s Talk
          </ButtonLink>
          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-full border border-line bg-paper lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cn(
                  'absolute left-0 top-0 h-[1.5px] w-5 bg-ink transition-transform duration-300',
                  menuOpen && 'translate-y-[5.25px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'absolute bottom-0 left-0 h-[1.5px] w-5 bg-ink transition-transform duration-300',
                  menuOpen && '-translate-y-[5.25px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  )
}
