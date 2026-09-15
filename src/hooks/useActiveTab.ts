import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { MenuItem, Tab } from '../types.ts'

export default function useActiveTab(tabs: Tab[], items: MenuItem[] = []) {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { itemId } = useParams()
  const defaultTabId = tabs[0]?.id ?? ''
  const itemTab = itemId
    ? items.find((item) => item.id === itemId || item.route === `/${itemId}`)?.tab
    : undefined
  const requested = searchParams.get('tab') ?? itemTab ?? null
  const activeTabId = tabs.some((tab) => tab.id === requested) ? requested : defaultTabId

  const setActiveTab = (tabId: string) => {
    const search = tabId === defaultTabId ? '' : `?tab=${encodeURIComponent(tabId)}`

    if (location.pathname !== '/') {
      navigate({ pathname: '/', search })
      return
    }

    setSearchParams(tabId === defaultTabId ? {} : { tab: tabId })
  }

  return { activeTabId, setActiveTab }
}
