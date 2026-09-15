import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import type { MenuData, MenuItem } from '../types.ts'
import DetailsPage from './DetailsPage.tsx'
import LinkPage from './LinkPage.tsx'
import PlaceholderPage from './PlaceholderPage.tsx'

type LocationState = {
  label?: string
  description?: string
  link?: MenuItem['link']
}

type ResolvedItem = Pick<MenuItem, 'label' | 'description' | 'link'>

function pageForItem(item: ResolvedItem) {
  if (item.link) {
    return <LinkPage title={item.label} description={item.description} link={item.link} />
  }

  if (item.description) {
    return <DetailsPage title={item.label} description={item.description} />
  }

  return <PlaceholderPage />
}

export default function ItemRoute() {
  const { itemId } = useParams()
  const location = useLocation()
  const state = (location.state as LocationState | null) ?? null
  const itemFromState: ResolvedItem | null =
    state?.label != null
      ? { label: state.label, description: state.description, link: state.link }
      : null
  const [fetched, setFetched] = useState<{ itemId: string; item: ResolvedItem | null } | null>(null)

  useEffect(() => {
    if (!itemId) {
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
            item: match
              ? { label: match.label, description: match.description, link: match.link }
              : null,
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
  }, [itemId])

  const fetchedItem = fetched && fetched.itemId === itemId ? fetched.item : undefined

  if (itemFromState?.link || itemFromState?.description) {
    return pageForItem(itemFromState)
  }

  if (fetchedItem === undefined) {
    return null
  }

  if (fetchedItem) {
    return pageForItem(fetchedItem)
  }

  if (itemFromState) {
    return pageForItem(itemFromState)
  }

  return <PlaceholderPage />
}
