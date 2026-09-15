import { Route, Routes } from 'react-router-dom'
import GuidePage from './pages/GuidePage.tsx'
import PlaceholderPage from './pages/PlaceholderPage.tsx'

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<GuidePage />} />
        <Route path="/:itemId" element={<PlaceholderPage />} />
      </Routes>
    </div>
  )
}
