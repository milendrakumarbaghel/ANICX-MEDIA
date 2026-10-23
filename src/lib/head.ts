import { createContext } from 'react'
import { siteConfig } from '../data/siteConfig'
import { absoluteUrl } from './media'

/**
 * Head/metadata helpers shared by the <Seo> component (browser) and the
 * prerender step (build time).
 */

export interface HeadData {
  title: string
  description: string
  path: string
  image: string
  type: 'website' | 'article'
  noindex: boolean
  jsonLd: Record<string, unknown>[]
}

/** Receives page metadata during prerendering. */
export interface HeadCollector {
  set: (data: HeadData) => void
}

export function createHeadCollector() {
  let data: HeadData | null = null
  const collector: HeadCollector = { set: (next) => void (data = next) }
  return { collector, get: () => data }
}

export const HeadContext = createContext<HeadCollector | null>(null)

export interface SeoProps {
  /** Page title without the brand suffix. Omit on the homepage. */
  title?: string
  description: string
  path: string
  image?: string
  type?: HeadData['type']
  noindex?: boolean
  jsonLd?: Record<string, unknown>[]
}

const DEFAULT_TITLE = `${siteConfig.name} | ${siteConfig.tagline}`

export function buildHead({ title, description, path, image, type = 'website', noindex = false, jsonLd = [] }: SeoProps): HeadData {
  return {
    title: title ? `${title} | ${siteConfig.name}` : DEFAULT_TITLE,
    description,
    path,
    image: image ?? siteConfig.ogImage,
    type,
    noindex,
    jsonLd,
  }
}

/* ------------------------------------------------------------------------ */

function headTags(head: HeadData): { tag: 'meta' | 'link'; attrs: Record<string, string> }[] {
  const url = siteConfig.url
  const canonical = url ? absoluteUrl(url, head.path) : null
  const image = absoluteUrl(url, head.image)
  const tags: { tag: 'meta' | 'link'; attrs: Record<string, string> }[] = [
    { tag: 'meta', attrs: { name: 'description', content: head.description } },
    { tag: 'meta', attrs: { name: 'robots', content: head.noindex ? 'noindex, follow' : 'index, follow' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: siteConfig.name } },
    { tag: 'meta', attrs: { property: 'og:type', content: head.type } },
    { tag: 'meta', attrs: { property: 'og:title', content: head.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: head.description } },
    { tag: 'meta', attrs: { property: 'og:image', content: image } },
    { tag: 'meta', attrs: { property: 'og:locale', content: 'en_IN' } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: head.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: head.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
  ]
  if (canonical) {
    tags.push({ tag: 'meta', attrs: { property: 'og:url', content: canonical } })
    tags.push({ tag: 'link', attrs: { rel: 'canonical', href: canonical } })
  }
  return tags
}

const keyAttr = (attrs: Record<string, string>) =>
  attrs.name ? 'name' : attrs.property ? 'property' : 'rel'

export function applyHead(head: HeadData) {
  if (typeof document === 'undefined') return
  document.title = head.title

  const managed = new Set<Element>()
  for (const { tag, attrs } of headTags(head)) {
    const key = keyAttr(attrs)
    let el = document.head.querySelector(`${tag}[${key}="${attrs[key]}"]`)
    if (!el) {
      el = document.createElement(tag)
      document.head.appendChild(el)
    }
    for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value)
    el.setAttribute('data-head', '')
    managed.add(el)
  }
  // Remove tags from the previous page that no longer apply (e.g. canonical).
  document.head.querySelectorAll('[data-head]').forEach((el) => {
    if (!managed.has(el)) el.remove()
  })

  document.head.querySelectorAll('script[data-jsonld]').forEach((el) => el.remove())
  for (const data of head.jsonLd) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-jsonld', '')
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Serialises head data to HTML for the prerendered pages. */
export function renderHeadToString(head: HeadData): string {
  const lines = [`<title>${escapeHtml(head.title)}</title>`]
  for (const { tag, attrs } of headTags(head)) {
    const attributes = Object.entries(attrs)
      .map(([name, value]) => `${name}="${escapeHtml(value)}"`)
      .join(' ')
    lines.push(`<${tag} ${attributes} data-head>`)
  }
  for (const data of head.jsonLd) {
    const json = JSON.stringify(data).replace(/</g, '\\u003c')
    lines.push(`<script type="application/ld+json" data-jsonld>${json}</script>`)
  }
  return lines.join('\n    ')
}

/* ------------------------------------------------------------------------ */
/* Structured data built only from verified business details.               */
/* ------------------------------------------------------------------------ */

export function organizationJsonLd(): Record<string, unknown> {
  const { contact, address, social, logo, url, name, description } = siteConfig
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.countryCode,
      ...(address.street ? { streetAddress: address.street } : {}),
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
    },
    sameAs: [social.instagram.url, ...social.youtube.map((channel) => channel.url)],
  }
  if (url) data.url = url
  if (url && logo.src) data.logo = absoluteUrl(url, logo.src)
  if (contact.email) data.email = contact.email
  if (contact.phone) data.telephone = contact.phone
  return data
}
