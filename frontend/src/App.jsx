import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import FreelancerProfile from './pages/FreelancerProfile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetail />} />

            {/* Protected Routes */}
            <Route
              path="/post-job"
              element={
                <ProtectedRoute requiredRole="client">
                  <PostJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/freelancer/:id"
              element={
                <ProtectedRoute>
                  <FreelancerProfile />
                </ProtectedRoute>
              }
            />

            {/* Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navigate to="/" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Navigate to="/" replace />
                </ProtectedRoute>
              }
            />

            {/* Catch all route - 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App; 