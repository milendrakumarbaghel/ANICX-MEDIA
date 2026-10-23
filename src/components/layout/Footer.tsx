import { Mail, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { mainNav } from '../../app/navigation'
import { locationLabel, phoneHref, siteConfig, whatsappHref } from '../../data/siteConfig'
import { visibleCourses, visibleServices } from '../../lib/content'
import { InstagramIcon, WhatsAppIcon, YouTubeIcon } from '../ui/BrandIcons'
import { Logo } from '../ui/Logo'

const linkClass = 'link-underline text-[0.95rem] text-ink/75 hover:text-ink'

function ExternalLink({ href, children, className = linkClass }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

export function Footer() {
  const { contact, social, name, description } = siteConfig
  const whatsapp = whatsappHref()
  const tel = phoneHref()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-mist">
      <div className="shell grid gap-14 pb-10 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Logo />
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted">{description}</p>
          <ul className="flex items-center gap-3" aria-label="Social media">
            <li>
              <ExternalLink
                href={social.instagram.url}
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper transition-colors hover:border-ink"
              >
                <InstagramIcon size={18} />
                <span className="sr-only">Instagram {social.instagram.handle}</span>
              </ExternalLink>
            </li>
            {social.youtube.map((channel) => (
              <li key={channel.url}>
                <ExternalLink
                  href={channel.url}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper transition-colors hover:border-ink"
                >
                  <YouTubeIcon size={18} />
                  <span className="sr-only">YouTube: {channel.label}</span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
          <div>
            <h2 className="eyebrow mb-5">Explore</h2>
            <ul className="flex flex-col gap-3">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow mb-5">Services</h2>
            <ul className="flex flex-col gap-3">
              {visibleServices.map((service) => (
                <li key={service.slug}>
                  <Link to={`/services#${service.slug}`} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow mb-5">Academy</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/academy" className={linkClass}>
                  Animation Academy
                </Link>
              </li>
              {visibleCourses.map((course) => (
                <li key={course.slug}>
                  <Link to={`/academy/${course.slug}`} className={linkClass}>
                    {course.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/academy#enquire" className={linkClass}>
                  Course enquiry
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow mb-5">Connect</h2>
            <ul className="flex flex-col gap-3 text-[0.95rem]">
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className={`${linkClass} gap-2`}>
                    <Mail size={16} aria-hidden="true" /> {contact.email}
                  </a>
                </li>
              )}
              {tel && (
                <li>
                  <a href={tel} className={`${linkClass} gap-2`}>
                    <Phone size={16} aria-hidden="true" /> {contact.phone}
                  </a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <ExternalLink href={whatsapp} className={`${linkClass} gap-2`}>
                    <WhatsAppIcon size={16} /> WhatsApp
                  </ExternalLink>
                </li>
              )}
              <li>
                <ExternalLink href={social.instagram.url} className={`${linkClass} gap-2`}>
                  <InstagramIcon size={16} /> Instagram
                </ExternalLink>
              </li>
              {social.youtube.map((channel) => (
                <li key={channel.url}>
                  <ExternalLink href={channel.url} className={`${linkClass} gap-2`}>
                    <YouTubeIcon size={16} /> {channel.label}
                  </ExternalLink>
                </li>
              ))}
              <li className="flex items-start gap-2 pt-1 text-ink/75">
                <MapPin size={16} className="mt-1 flex-none" aria-hidden="true" />
                <address className="not-italic">{locationLabel}</address>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {name}. All rights reserved.
        </p>
        <Link to="/privacy-policy" className="link-underline self-start sm:self-auto">
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}
