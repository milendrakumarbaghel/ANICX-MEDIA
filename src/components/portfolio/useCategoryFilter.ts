import { useMemo, useState } from 'react'
import { workCategories } from '../../data/projects'
import type { WorkItem } from '../../types/content'
import type { FilterOption } from './CategoryFilter'

export function matchesCategory(item: WorkItem, catId: string): boolean {
  if (catId === 'all') return true
  if (catId === 'original-series') {
    return item.kind === 'original-series' || item.category === 'original-series'
  }
  return item.category === catId
}

/**
 * Category filter state for work items.
 * Only categories that have at least one visible item are shown (hiding empty categories).
 */
export function useCategoryFilter(items: WorkItem[], initial = 'all') {
  const [category, setCategory] = useState(initial)

  const options = useMemo<FilterOption[]>(
    () =>
      workCategories
        .map((c) => ({
          id: c.id,
          label: c.label,
          count: items.filter((item) => matchesCategory(item, c.id)).length,
        }))
        .filter((option) => option.count > 0),
    [items],
  )

  const filtered = useMemo(
    () => items.filter((item) => matchesCategory(item, category)),
    [items, category],
  )

  return { category, setCategory, options, filtered }
}
