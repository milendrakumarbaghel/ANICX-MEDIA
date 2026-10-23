import { useContext, useEffect } from 'react'
import { HeadContext, applyHead, buildHead, type HeadData, type SeoProps } from './head'

/**
 * Per-page metadata.
 *
 * During prerendering (scripts/prerender.mjs) <Seo> hands its data to a
 * collector and the tags are written into each page's static HTML <head>, so
 * crawlers that do not run JavaScript still see unique titles, descriptions and
 * Open Graph tags. In the browser it keeps <head> in sync on client-side
 * navigation.
 */
export function Seo(props: SeoProps) {
  const collector = useContext(HeadContext)
  const head = buildHead(props)

  // Server-side only: hand the data to the prerender script.
  collector?.set(head)

  const serialized = JSON.stringify(head)
  useEffect(() => {
    applyHead(JSON.parse(serialized) as HeadData)
  }, [serialized])

  return null
}
