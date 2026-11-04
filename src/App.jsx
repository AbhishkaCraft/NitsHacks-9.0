import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TeamsPage from './pages/TeamsPage'
import TimelinePage from './pages/TimelinePage'
import FAQsPage from './pages/FAQsPage'
import TrackPage from './pages/Trackpage'
import ComingSoon from './pages/ComingSoon'
import LoaderPage from './pages/LoaderPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/loader" element={<LoaderPage />} />
        <Route path="/loading" element={<LoaderPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/faq" element={<FAQsPage />} />
        <Route path="/tracks" element={<TrackPage />} />
        <Route path="/track" element={<TrackPage />} />
      </Routes>
    </BrowserRouter>
  )
}