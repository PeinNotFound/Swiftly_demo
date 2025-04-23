import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Freelancers from './pages/Freelancers';
import FreelancerProfile from './pages/FreelancerProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import JobDetail from './pages/JobDetail';
import Jobs from './pages/Jobs';
import FreelancerDashboard from './components/dashboards/FreelancerDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import UserManagement from './components/dashboards/UserManagement';
import FreelancerManagement from './components/dashboards/FreelancerManagement';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/freelancers" element={<Freelancers />} />
            <Route path="/freelancer/:id" element={<FreelancerProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/job/:id" element={<JobDetail />} />
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