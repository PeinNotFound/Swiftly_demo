import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/navigation/Navbar';
import Footer from './components/layout/Footer';

// Page imports
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Freelancers from './pages/Freelancers';
import FreelancerProfile from './pages/FreelancerProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import JobDetail from './pages/JobDetail';
import Jobs from './pages/Jobs';
import ChatPage from './pages/ChatPage';
import ChatsPage from './pages/ChatsPage';

// Dashboard components
import FreelancerDashboard from './components/dashboard/FreelancerDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserManagement from './components/dashboard/UserManagement';
import FreelancerManagement from './components/dashboard/FreelancerManagement';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chat/:freelancerId" element={<ChatPage />} />
            <Route path="/chats" element={<ChatsPage />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Freelancer Routes */}
            <Route path="/freelancers" element={<Freelancers />} />
            <Route path="/freelancer/:id" element={<FreelancerProfile />} />
            
            {/* Job Routes */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetail />} />
            
            {/* Dashboard Routes - These should be protected */}
            <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/users" element={<UserManagement />} />
            <Route path="/dashboard/admin/freelancers" element={<FreelancerManagement />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App; 