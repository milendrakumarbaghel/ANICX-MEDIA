import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './app/App'
import { preloadRoute } from './app/routes'

declare global {
  interface Window {
    __ANICX_READY__?: boolean
  }
}

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Prerendered pages are hydrated; the dev server renders from scratch.
// The current page's chunk is loaded first so hydration matches the HTML.
void preloadRoute(window.location.pathname).then(() => {
  if (container.firstElementChild) hydrateRoot(container, app)
  else createRoot(container).render(app)
  window.__ANICX_READY__ = true
})
