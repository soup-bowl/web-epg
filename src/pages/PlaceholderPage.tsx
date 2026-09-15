import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import type { MenuData } from '../types.ts'
import './PlaceholderPage.css'

type LocationState = {
  label?: string
}

export default function PlaceholderPage() {
  const { itemId } = useParams()
  const location = useLocation()
  const stateLabel = (location.state as LocationState | null)?.label
  const [label, setLabel] = useState(stateLabel ?? itemId ?? 'This section')

  useEffect(() => {
    if (stateLabel || !itemId) {
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
        const match = data.items.find((item) => item.id === itemId || item.route === `/${itemId}`)
        if (!cancelled && match) {
          setLabel(match.label)
        }
      })
      .catch(() => {
        /* Keep the route id as a fallback title. */
      })

    return () => {
      cancelled = true
    }
  }, [itemId, stateLabel])

  return (
    <div className="placeholder-page">
      <p className="placeholder-page__kicker">Coming soon</p>
      <h1 className="placeholder-page__title">{label}</h1>
      <Link className="placeholder-page__back" to="/">
        Back to TV Guide
      </Link>
    </div>
  )
}
