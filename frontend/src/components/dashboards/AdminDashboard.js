import React from 'react';
import { FaUsers, FaProjectDiagram, FaChartBar, FaMoneyBillWave, FaUserCog, FaUserTie, FaBell, FaCog, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Demo recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'user',
      action: 'New User Registration',
      details: 'John Doe joined the platform',
      time: '2 hours ago',
      icon: FaUsers
    },
    {
      id: 2,
      type: 'project',
      action: 'New Project Created',
      details: 'Website Development Project',
      time: '5 hours ago',
      icon: FaProjectDiagram
    },
    {
      id: 3,
      type: 'freelancer',
      action: 'Freelancer Verified',
      details: 'Sarah Wilson completed verification',
      time: '1 day ago',
      icon: FaUserTie
    },
    {
      id: 4,
      type: 'payment',
      action: 'Payment Processed',
      details: 'Project payment of $1,500 completed',
      time: '2 days ago',
      icon: FaMoneyBillWave
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening on your platform.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <FaBell className="text-xl" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <FaCog className="text-xl" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <FaQuestionCircle className="text-xl" />
            </button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/dashboard/admin/users"
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
            to="/dashboard/admin/freelancers"
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

        {/* Recent Activity and Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 p-2 rounded-full mr-4">
                        <activity.icon className="text-yellow-400" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-gray-500 text-sm">{activity.details}</p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="space-y-3">
              <Link to="/dashboard/admin/users" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <FaUserCog className="text-yellow-400" />
                  <span>User Management</span>
                </div>
              </Link>
              <Link to="/dashboard/admin/freelancers" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <FaUserTie className="text-yellow-400" />
                  <span>Freelancer Management</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 