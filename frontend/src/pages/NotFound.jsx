import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-9xl font-bold text-yellow-400 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black rounded-xl font-medium hover:bg-yellow-500 transition-all duration-200 transform hover:scale-[1.02]"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound; 