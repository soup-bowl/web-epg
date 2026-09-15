import { useState } from 'react'
import { TABS } from '../tabs.ts'
import TabIcon from './TabIcon.tsx'
import './Header.css'

export default function Header() {
  const [activeTabId, setActiveTabId] = useState(TABS[0]?.id ?? '')

  return (
    <header className="header">
      <div className="header__logo">
        <img src="/logo.svg" alt="Sky Guide" />
      </div>
      <nav className="header__tabs" aria-label="Guide sections">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTabId
          return (
            <button
              key={tab.id}
              type="button"
              className={`header__tab${isActive ? ' is-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setActiveTabId(tab.id)}
            >
              <TabIcon id={tab.id} />
              <span className="header__tab-label">{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </header>
  )
}
