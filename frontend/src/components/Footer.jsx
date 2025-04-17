import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Swiftly</h3>
            <p className="text-gray-400">
              Connecting talented freelancers with businesses that need their expertise.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/freelancers" className="text-gray-400 hover:text-white">Find Freelancers</Link></li>
              <li><Link to="/jobs" className="text-gray-400 hover:text-white">Find Jobs</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">For Freelancers</h4>
            <ul className="space-y-2">
              <li><Link to="/register" className="text-gray-400 hover:text-white">Create Account</Link></li>
              <li><Link to="/freelancer-profile" className="text-gray-400 hover:text-white">Create Profile</Link></li>
              <li><Link to="/find-jobs" className="text-gray-400 hover:text-white">Find Jobs</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">For Clients</h4>
            <ul className="space-y-2">
              <li><Link to="/register" className="text-gray-400 hover:text-white">Create Account</Link></li>
              <li><Link to="/post-job" className="text-gray-400 hover:text-white">Post a Job</Link></li>
              <li><Link to="/find-freelancers" className="text-gray-400 hover:text-white">Find Freelancers</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Swiftly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 