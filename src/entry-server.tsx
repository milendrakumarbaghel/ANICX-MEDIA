import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './app/App'
import { NOT_FOUND_PATH, getPrerenderEntries, matchRoute, preloadAllRoutes } from './app/routes'
import { siteConfig } from './data/siteConfig'
import { HeadContext, createHeadCollector, renderHeadToString } from './lib/head'

/**
 * Prerender entry, used only at build time by scripts/prerender.mjs.
 * Renders a route to static HTML plus its <head> tags.
 */
export async function render(url: string) {
  await preloadAllRoutes()
  const { collector, get } = createHeadCollector()

  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  )

  const head = get()
  return {
    html,
    head: head ? renderHeadToString(head) : '',
    module: matchRoute(url).module,
  }
}

export { NOT_FOUND_PATH, getPrerenderEntries, siteConfig }
