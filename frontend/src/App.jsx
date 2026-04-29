import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/UI/Navbar'
import Footer from './components/UI/Footer'
import HomePage from './pages/HomePage'
import TopicsPage from './pages/TopicsPage'
import ARViewerPage from './pages/ARViewerPage'
import QuizPage from './pages/QuizPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import WorkspacePage from './pages/WorkspacePage'

import SocraticChatbot from './components/AI/SocraticChatbot'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20 text-slate-400">Memuat data pengguna...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/ar/:topicSlug" element={<ARViewerPage />} />
          <Route path="/quiz" element={<TopicsPage />} />
          <Route path="/quiz/:topicSlug" element={<QuizPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/workspace" 
            element={
              <ProtectedRoute>
                <WorkspacePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <SocraticChatbot />
      <Footer />
    </div>
    </ThemeProvider>
  )
}

export default App