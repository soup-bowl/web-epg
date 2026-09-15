import { useEffect, useState } from 'react'
import Header from '../components/Header.tsx'
import MenuList from '../components/MenuList.tsx'
import type { MenuData, MenuItem } from '../types.ts'
import './GuidePage.css'

export default function GuidePage() {
  const [items, setItems] = useState<MenuItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch('/menu.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load menu (${response.status})`)
        }
        return response.json() as Promise<MenuData>
      })
      .then((data) => {
        if (!cancelled) {
          setItems(data.items ?? [])
        }
      })
      .catch((loadError: unknown) => {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Could not load menu')
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="guide-page">
      <Header />
      <main className="guide-page__main">
        {error ? <p className="guide-page__status">{error}</p> : null}
        {items === null && !error ? <p className="guide-page__status">Loading…</p> : null}
        {items ? <MenuList items={items} /> : null}
      </main>
    </div>
  )
}
