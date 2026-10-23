import { lazy, type ComponentType } from 'react'

type PageModule = { default: ComponentType }

export interface LazyPage {
  Component: ComponentType
  /** Loads the page chunk. Safe to call repeatedly. */
  preload: () => Promise<PageModule>
}

/**
 * Code-split page that can be preloaded. Once loaded, it renders synchronously,
 * which lets the prerenderer render full HTML and the client hydrate without a
 * Suspense fallback flash.
 */
export function lazyPage(factory: () => Promise<PageModule>): LazyPage {
  let Loaded: ComponentType | null = null
  let pending: Promise<PageModule> | null = null

  const preload = () =>
    (pending ??= factory().then((module) => {
      Loaded = module.default
      return module
    }))

  const Lazy = lazy(preload)

  function Component() {
    const Page = Loaded
    return Page ? <Page /> : <Lazy />
  }

  return { Component, preload }
}
