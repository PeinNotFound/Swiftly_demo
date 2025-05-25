import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
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
import EditProfile from './pages/EditProfile';
import FreelancerDashboard from './pages/dashboard/FreelancerDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import PostJob from './pages/PostJob';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const PrivateRoute = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Public Job and Freelancer Routes */}
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/freelancers" element={<Freelancers />} />
              <Route path="/freelancer/:id" element={<FreelancerProfile />} />
              
              {/* Protected Chat Routes */}
              <Route 
                path="/chat/:freelancerId" 
                element={
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/chats" 
                element={
                  <PrivateRoute>
                    <ChatsPage />
                  </PrivateRoute>
                } 
              />
              
              {/* Protected Profile Route */}
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                } 
              />
              
              {/* Protected Dashboard Routes */}
              <Route 
                path="/dashboard/freelancer" 
                element={
                  <PrivateRoute roles={['freelancer']}>
                    <FreelancerDashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/dashboard/client" 
                element={
                  <PrivateRoute roles={['client']}>
                    <ClientDashboard />
                  </PrivateRoute>
                } 
              />
              <Route
                path="/dashboard/admin/*"
                element={
                  <PrivateRoute roles={['admin']}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/post-job" 
                element={
                  <PrivateRoute>
                    <PostJob />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App; 