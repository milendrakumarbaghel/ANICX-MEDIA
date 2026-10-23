import { useMemo, useState } from 'react'
import { workCategories } from '../../data/projects'
import type { WorkItem } from '../../types/content'
import type { FilterOption } from './CategoryFilter'

/**
 * Category filter state for a list of work items. Only categories that have
 * at least one visible item are offered, so visitors never hit an empty tab.
 */
export function useCategoryFilter(items: WorkItem[], initial = 'all') {
  const [category, setCategory] = useState(initial)

  const options = useMemo<FilterOption[]>(
    () =>
      workCategories
        .map((c) => ({
          id: c.id,
          label: c.label,
          count: c.id === 'all' ? items.length : items.filter((item) => item.category === c.id).length,
        }))
        .filter((option) => option.count > 0),
    [items],
  )

  const filtered = useMemo(
    () => (category === 'all' ? items : items.filter((item) => item.category === category)),
    [items, category],
  )

  return { category, setCategory, options, filtered }
}
