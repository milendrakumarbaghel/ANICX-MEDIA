import { useSyncExternalStore } from 'react'

const noop = () => () => {}

/**
 * False during prerender and hydration, true afterwards. Use it before reading
 * browser-only state (query strings, storage) so hydration always matches the
 * prerendered HTML.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
}
