import Header from '../components/Header.tsx'
import MenuList from '../components/MenuList.tsx'
import useActiveTab from '../hooks/useActiveTab.ts'
import useMenuData from '../hooks/useMenuData.ts'
import './GuidePage.css'

export default function GuidePage() {
  const { data, error } = useMenuData()
  const tabs = data?.tabs ?? []
  const { activeTabId } = useActiveTab(tabs)
  const items = data?.items.filter((item) => item.tab === activeTabId) ?? null

  return (
    <div className="guide-page">
      <Header />
      <main className="guide-page__main">
        {error ? <p className="guide-page__status">{error}</p> : null}
        {data === null && !error ? <p className="guide-page__status">Loading…</p> : null}
        {data ? <MenuList key={activeTabId} items={items ?? []} /> : null}
      </main>
    </div>
  )
}
