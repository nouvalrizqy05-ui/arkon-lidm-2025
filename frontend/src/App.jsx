import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TopicsPage from './pages/TopicsPage'
import ARViewerPage from './pages/ARViewerPage'
import QuizPage from './pages/QuizPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/topics" element={<TopicsPage />} />
      <Route path="/ar/:topicSlug" element={<ARViewerPage />} />
      <Route path="/quiz/:topicSlug" element={<QuizPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App