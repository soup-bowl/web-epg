import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import type { MenuData, MenuItem } from '../types.ts'
import DetailsPage from './DetailsPage.tsx'
import PlaceholderPage from './PlaceholderPage.tsx'

type LocationState = {
  label?: string
  description?: string
}

type ResolvedItem = Pick<MenuItem, 'label' | 'description'>

export default function ItemRoute() {
  const { itemId } = useParams()
  const location = useLocation()
  const state = (location.state as LocationState | null) ?? null
  const itemFromState: ResolvedItem | null =
    state?.label != null ? { label: state.label, description: state.description } : null
  const [fetched, setFetched] = useState<{ itemId: string; item: ResolvedItem | null } | null>(null)

  useEffect(() => {
    if (state?.label != null || !itemId) {
      return
    }

    let cancelled = false

    fetch('/menu.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load menu')
        }
        return response.json() as Promise<MenuData>
      })
      .then((data) => {
        const match = data.items.find((entry) => entry.id === itemId || entry.route === `/${itemId}`)
        if (!cancelled) {
          setFetched({
            itemId,
            item: match ? { label: match.label, description: match.description } : null,
          })
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFetched({ itemId, item: null })
        }
      })

    return () => {
      cancelled = true
    }
  }, [itemId, state?.label, state?.description])

  const item = itemFromState ?? (fetched && fetched.itemId === itemId ? fetched.item : undefined)

  if (item === undefined) {
    return null
  }

  if (item?.description) {
    return <DetailsPage title={item.label} description={item.description} />
  }

  return <PlaceholderPage />
}
