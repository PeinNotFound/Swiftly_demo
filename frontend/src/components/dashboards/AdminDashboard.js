import React from 'react';
import { FaUsers, FaProjectDiagram, FaChartBar, FaMoneyBillWave, FaUserCog, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/admin/users"
            className="group bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-yellow-400"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-400 rounded-lg group-hover:bg-yellow-500 transition-colors">
                <FaUserCog className="text-2xl text-black" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
                <p className="text-gray-600 mt-1">Manage all platform users and their roles</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/freelancers"
            className="group bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-yellow-400"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-400 rounded-lg group-hover:bg-yellow-500 transition-colors">
                <FaUserTie className="text-2xl text-black" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Freelancer Management</h2>
                <p className="text-gray-600 mt-1">Manage freelancer profiles and verifications</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaUsers className="text-yellow-400 text-2xl mr-4" />
              <div>
                <p className="text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaProjectDiagram className="text-yellow-400 text-2xl mr-4" />
              <div>
                <p className="text-gray-500">Active Projects</p>
                <p className="text-2xl font-bold">56</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaChartBar className="text-yellow-400 text-2xl mr-4" />
              <div>
                <p className="text-gray-500">Platform Revenue</p>
                <p className="text-2xl font-bold">$45,678</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FaMoneyBillWave className="text-yellow-400 text-2xl mr-4" />
              <div>
                <p className="text-gray-500">Pending Payments</p>
                <p className="text-2xl font-bold">$12,345</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-full mr-4">
                  <FaUsers className="text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">New User Registration</p>
                  <p className="text-gray-500 text-sm">John Doe joined the platform</p>
                </div>
              </div>
              <span className="text-gray-500 text-sm">2 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-full mr-4">
                  <FaProjectDiagram className="text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">New Project Created</p>
                  <p className="text-gray-500 text-sm">Website Development Project</p>
                </div>
              </div>
              <span className="text-gray-500 text-sm">5 hours ago</span>
            </div>
          </div>
        </div>

        {/* Platform Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">User Growth</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart will be displayed here</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 