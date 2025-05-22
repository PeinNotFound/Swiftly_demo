import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ClientDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your projects and find freelancers
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Stats Cards */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Active Projects</h3>
            <p className="text-3xl font-bold text-white">0</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Completed Projects</h3>
            <p className="text-3xl font-bold text-white">0</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Total Spent</h3>
            <p className="text-3xl font-bold text-white">$0</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">Recent Activity</h2>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
            <p className="text-gray-400">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard; 