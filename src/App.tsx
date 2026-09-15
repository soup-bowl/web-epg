import { Route, Routes } from 'react-router-dom'
import GuidePage from './pages/GuidePage.tsx'
import ItemRoute from './pages/ItemRoute.tsx'

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<GuidePage />} />
        <Route path="/:itemId" element={<ItemRoute />} />
      </Routes>
    </div>
  )
}
