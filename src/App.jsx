import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TeamsPage from './pages/TeamsPage'
import TimelinePage from './pages/TimelinePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeamsPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </BrowserRouter>
  )
}
