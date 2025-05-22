import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinkClasses = (path) => `px-3 py-2 text-[15px] rounded-md transition-all duration-200 relative
    ${isActivePath(path) 
      ? 'text-yellow-400 bg-gray-800/80' 
      : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800/80'}
    after:content-["\""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] 
    after:bg-yellow-400 after:transform after:scale-x-0 after:origin-left after:transition-transform
    ${isActivePath(path) ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
    active:scale-95 active:bg-gray-700/80`;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderAuthLinks = () => {
    if (isAuthenticated) {
      return (
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-all duration-300 ease-in-out"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400">
              {user?.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-semibold shadow-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <span className="hidden lg:block">{user?.name}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-800/50 py-2 z-50 transform origin-top-right transition-all duration-300 ease-in-out">
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800/50 hover:text-yellow-400 transition-all duration-300"
                onClick={() => setIsProfileOpen(false)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Edit Profile
              </Link>
              <Link
                to="/chats"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800/50 hover:text-yellow-400 transition-all duration-300"
                onClick={() => setIsProfileOpen(false)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chats
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-800/50 hover:text-yellow-400 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="text-gray-300 hover:text-yellow-400 transition-all duration-300"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
        >
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Swiftly
              </span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-6">
                <Link
                  to="/"
                  className={`text-[15px] font-medium transition-all duration-300 relative group ${
                    isActivePath("/") 
                      ? "text-yellow-400" 
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  Home
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transition-all duration-300 ${
                    isActivePath("/") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
                </Link>
                <Link
                  to="/jobs"
                  className={`text-[15px] font-medium transition-all duration-300 relative group ${
                    isActivePath("/jobs") 
                      ? "text-yellow-400" 
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  Find Jobs
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transition-all duration-300 ${
                    isActivePath("/jobs") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
                </Link>
                <Link
                  to="/freelancers"
                  className={`text-[15px] font-medium transition-all duration-300 relative group ${
                    isActivePath("/freelancers") 
                      ? "text-yellow-400" 
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  Find Freelancers
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transition-all duration-300 ${
                    isActivePath("/freelancers") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/dashboard/admin"
                    className={`text-[15px] font-medium transition-all duration-300 relative group ${
                      isActivePath("/dashboard/admin") 
                        ? "text-yellow-400" 
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                  >
                    Admin Dashboard
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transition-all duration-300 ${
                      isActivePath("/dashboard/admin") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}></span>
                  </Link>
                )}
                {user?.role === 'freelancer' && (
                  <Link
                    to="/dashboard/freelancer"
                    className={`text-[15px] font-medium transition-all duration-300 relative group ${
                      isActivePath("/dashboard/freelancer") 
                        ? "text-yellow-400" 
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                  >
                    Freelancer Dashboard
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transition-all duration-300 ${
                      isActivePath("/dashboard/freelancer") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}></span>
                  </Link>
                )}
                <Link
                  to="/about"
                  className={`text-[15px] font-medium transition-all duration-300 relative group ${
                    isActivePath("/about") 
                      ? "text-yellow-400" 
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  About
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transition-all duration-300 ${
                    isActivePath("/about") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
                </Link>
                <Link
                  to="/contact"
                  className={`text-[15px] font-medium transition-all duration-300 relative group ${
                    isActivePath("/contact") 
                      ? "text-yellow-400" 
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  Contact
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transition-all duration-300 ${
                    isActivePath("/contact") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Auth buttons */}
          <div className="hidden md:block">
            {renderAuthLinks()}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-yellow-400 transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-sm">
          <Link
            to="/"
            className={`block px-3 py-2 text-[15px] font-medium rounded-md transition-all duration-200 ${
              isActivePath("/") 
                ? "text-yellow-400 bg-gray-800/80" 
                : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
            }`}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className={`block px-3 py-2 text-[15px] font-medium rounded-md transition-all duration-200 ${
              isActivePath("/jobs") 
                ? "text-yellow-400 bg-gray-800/80" 
                : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
            }`}
          >
            Find Jobs
          </Link>
          <Link
            to="/freelancers"
            className={`block px-3 py-2 text-[15px] font-medium rounded-md transition-all duration-200 ${
              isActivePath("/freelancers") 
                ? "text-yellow-400 bg-gray-800/80" 
                : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
            }`}
          >
            Find Freelancers
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/dashboard/admin"
              className={`block px-3 py-2 text-[15px] font-medium rounded-md transition-all duration-200 ${
                isActivePath("/dashboard/admin") 
                  ? "text-yellow-400 bg-gray-800/80" 
                  : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
              }`}
            >
              Admin Dashboard
            </Link>
          )}
          {user?.role === 'freelancer' && (
            <Link
              to="/dashboard/freelancer"
              className={`block px-3 py-2 text-[15px] font-medium rounded-md transition-all duration-200 ${
                isActivePath("/dashboard/freelancer") 
                  ? "text-yellow-400 bg-gray-800/80" 
                  : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
              }`}
            >
              Freelancer Dashboard
            </Link>
          )}
          <Link
            to="/about"
            className={`block px-3 py-2 text-[15px] font-medium rounded-md transition-all duration-200 ${
              isActivePath("/about") 
                ? "text-yellow-400 bg-gray-800/80" 
                : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block px-3 py-2 text-[15px] font-medium rounded-md transition-all duration-200 ${
              isActivePath("/contact") 
                ? "text-yellow-400 bg-gray-800/80" 
                : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
            }`}
          >
            Contact
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-800">
            {isAuthenticated ? (
              <div className="px-2 space-y-1">
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-[15px] text-gray-300 rounded-md hover:bg-gray-800/80 hover:text-yellow-400 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Edit Profile
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 text-[15px] text-gray-300 rounded-md hover:bg-gray-800/80 hover:text-yellow-400 transition-all duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-3 py-2 text-[15px] text-gray-300 rounded-md hover:bg-gray-800/80 hover:text-yellow-400 transition-all duration-200 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-3 py-2 text-[15px] text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-all duration-200 font-medium text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 