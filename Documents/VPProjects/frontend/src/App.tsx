import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MissionsPage from './pages/MissionsPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import PostMissionPage from './pages/PostMissionPage';
import AuthPage from './pages/AuthPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import QuizPage from './pages/QuizPage';
import AIAssistancePage from './pages/AIAssistancePage';
import MiniProjectsPage from './pages/MiniProjectsPage';
import CertificatesPage from './pages/CertificatesPage';
import FloatingHelp from './components/FloatingHelp';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/missions" element={
                <ProtectedRoute>
                  <MissionsPage />
                </ProtectedRoute>
              } />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/post-mission" element={
                <ProtectedRoute requiredRole="project-owner">
                  <PostMissionPage />
                </ProtectedRoute>
              } />
              <Route path="/quiz" element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              } />
              <Route path="/ai-assistance" element={
                <ProtectedRoute>
                  <AIAssistancePage />
                </ProtectedRoute>
              } />
              <Route path="/mini-projects" element={
                <ProtectedRoute>
                  <MiniProjectsPage />
                </ProtectedRoute>
              } />
              <Route path="/certificates" element={
                <ProtectedRoute>
                  <CertificatesPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
          <FloatingHelp />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;