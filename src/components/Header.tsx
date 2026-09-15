import useActiveTab from '../hooks/useActiveTab.ts'
import useMenuData from '../hooks/useMenuData.ts'
import TabIcon from './TabIcon.tsx'
import './Header.css'

export default function Header() {
  const { data } = useMenuData()
  const tabs = data?.tabs ?? []
  const { activeTabId, setActiveTab } = useActiveTab(tabs, data?.items ?? [])

  return (
    <header className="header">
      <div className="header__logo">
        <img src="/logo.svg" alt="Sky Guide" />
      </div>
      <nav className="header__tabs" aria-label="Guide sections">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId
          return (
            <button
              key={tab.id}
              type="button"
              className={`header__tab${isActive ? ' is-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setActiveTab(tab.id)}
            >
              <TabIcon icon={tab.icon ?? tab.id} />
              <span className="header__tab-label">{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </header>
  )
}
