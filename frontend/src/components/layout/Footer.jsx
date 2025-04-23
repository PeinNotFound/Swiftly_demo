import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">SWIFTLY</h3>
            <p className="text-gray-400">
              Connecting talented freelancers with businesses that need their expertise.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-200"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/freelancers" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-200"></span>
                  <span>Find Freelancers</span>
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-200"></span>
                  <span>Find Jobs</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-200"></span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-200"></span>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">For Freelancers</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-200"></span>
                  <span>Create Account</span>
                </Link>
              </li>
              <li>
                <Link to="/freelancer-profile" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-200"></span>
                  <span>Create Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/find-jobs" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-200"></span>
                  <span>Find Jobs</span>
                </Link>
              </li>
             
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">For Clients</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-200"></span>
                  <span>Create Account</span>
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-200"></span>
                  <span>Post a Job</span>
                </Link>
              </li>
              <li>
                <Link to="/find-freelancers" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-200"></span>
                  <span>Find Freelancers</span>
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SWIFTLY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 