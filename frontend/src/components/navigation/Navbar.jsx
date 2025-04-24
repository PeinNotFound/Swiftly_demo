import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  // TODO: Replace with actual auth state
  const isAuthenticated = false;
  const user = {
    avatar: 'https://via.placeholder.com/40',
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinkClasses = (path) => `px-3 py-2 text-[15px] rounded-md transition-all duration-200 relative
    ${isActivePath(path) 
      ? 'text-yellow-400 bg-gray-800/80' 
      : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800/80'}
    after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] 
    after:bg-yellow-400 after:transform after:scale-x-0 after:origin-left after:transition-transform
    ${isActivePath(path) ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
    active:scale-95 active:bg-gray-700/80`;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-[64px]">
          <div className="flex items-center gap-4 md:gap-8">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity active:scale-95"
            >
              SWIFTLY
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <Link to="/" className={navLinkClasses("/")}>
                Home
              </Link>
              <Link to="/freelancers" className={navLinkClasses("/freelancers")}>
                Find Freelancers
              </Link>
              <Link to="/jobs" className={navLinkClasses("/jobs")}>
                Find Jobs
              </Link>
              <Link to="/dashboard/freelancer" className={navLinkClasses("/dashboard/freelancer")}>
              Freelancer Dashbord
              </Link>
              <Link to="/dashboard/admin" className={navLinkClasses("/dashboard/admin")}>
              Admin Dashbord
              </Link>
              <Link to="/about" className={navLinkClasses("/about")}>
                About
              </Link>
              <Link to="/contact" className={navLinkClasses("/contact")}>
                Contact
              </Link>
              
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-2 p-1.5 text-[15px] text-gray-300 rounded-full hover:bg-gray-800/80 transition-all duration-200 active:scale-95"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <img
                    className="h-8 w-8 rounded-full ring-2 ring-yellow-400 hover:ring-yellow-500 transition-colors"
                    src={user?.avatar || 'https://via.placeholder.com/40'}
                    alt=""
                  />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-800 py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-[15px] text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition-colors active:scale-95"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-[15px] text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition-colors active:scale-95"
                    >
                      Settings
                    </Link>
                    <div className="h-[1px] bg-gray-800 my-1"></div>
                    <button
                      className="block w-full text-left px-4 py-2 text-[15px] text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition-colors active:scale-95"
                      onClick={() => {
                        // TODO: Implement logout
                        console.log('Logout clicked');
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 text-[15px] text-gray-300 rounded-md hover:bg-gray-800/80 hover:text-yellow-400 transition-all duration-200 active:scale-95"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-[15px] text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-all duration-200 shadow-sm hover:shadow font-medium active:scale-95 active:bg-yellow-600"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:bg-gray-800/80 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 text-[15px] rounded-md transition-all duration-200 ${
                isActivePath("/") 
                  ? "text-yellow-400 bg-gray-800/80" 
                  : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
              }`}
            >
              Home
            </Link>
            <Link
              to="/freelancers"
              className={`block px-3 py-2 text-[15px] rounded-md transition-all duration-200 ${
                isActivePath("/freelancers") 
                  ? "text-yellow-400 bg-gray-800/80" 
                  : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
              }`}
            >
              Find Freelancers
            </Link>
            <Link
              to="/jobs"
              className={`block px-3 py-2 text-[15px] rounded-md transition-all duration-200 ${
                isActivePath("/jobs") 
                  ? "text-yellow-400 bg-gray-800/80" 
                  : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
              }`}
            >
              Find Jobs
            </Link>
            <Link
              to="/dashboard/freelancer"
              className={`block px-3 py-2 text-[15px] rounded-md transition-all duration-200 ${
                isActivePath("/dashboard/freelancer") 
                  ? "text-yellow-400 bg-gray-800/80" 
                  : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
              }`}
            >
              Freelancer Dashboard
            </Link>
            <Link
              to="/dashboard/admin"
              className={`block px-3 py-2 text-[15px] rounded-md transition-all duration-200 ${
                isActivePath("/dashboard/admin") 
                  ? "text-yellow-400 bg-gray-800/80" 
                  : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
              }`}
            >
              Admin Dashboard
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 text-[15px] rounded-md transition-all duration-200 ${
                isActivePath("/about") 
                  ? "text-yellow-400 bg-gray-800/80" 
                  : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 text-[15px] rounded-md transition-all duration-200 ${
                isActivePath("/contact") 
                  ? "text-yellow-400 bg-gray-800/80" 
                  : "text-gray-300 hover:bg-gray-800/80 hover:text-yellow-400"
              }`}
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-800">
            {isAuthenticated ? (
              <div className="px-2 space-y-1">
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-[15px] text-gray-300 rounded-md hover:bg-gray-800/80 hover:text-yellow-400 transition-all duration-200"
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-[15px] text-gray-300 rounded-md hover:bg-gray-800/80 hover:text-yellow-400 transition-all duration-200"
                >
                  Settings
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 text-[15px] text-gray-300 rounded-md hover:bg-gray-800/80 hover:text-yellow-400 transition-all duration-200"
                  onClick={() => {
                    // TODO: Implement logout
                    console.log('Logout clicked');
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-3 py-2 text-[15px] text-gray-300 rounded-md hover:bg-gray-800/80 hover:text-yellow-400 transition-all duration-200 text-center"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-3 py-2 text-[15px] text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-all duration-200 font-medium text-center"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 