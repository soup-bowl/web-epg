import { useEffect, useState } from 'react'
import publicUrl from '../publicUrl.ts'
import type { MenuData } from '../types.ts'

let pending: Promise<MenuData> | null = null

export function loadMenu(): Promise<MenuData> {
  if (!pending) {
    pending = fetch(publicUrl('/menu.json'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load menu (${response.status})`)
        }
        return response.json() as Promise<MenuData>
      })
      .then((data) => ({
        tabs: data.tabs ?? [],
        items: data.items ?? [],
      }))
      .catch((error: unknown) => {
        pending = null
        throw error
      })
  }

  return pending
}

export default function useMenuData() {
  const [data, setData] = useState<MenuData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadMenu()
      .then((menu) => {
        if (!cancelled) {
          setData(menu)
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

  return { data, error }
}
