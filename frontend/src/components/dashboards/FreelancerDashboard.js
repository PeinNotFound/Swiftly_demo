import React from 'react';
import { FaTasks, FaMoneyBillWave, FaStar, FaChartLine } from 'react-icons/fa';

const FreelancerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Freelancer Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-400 rounded-lg mr-4">
                <FaTasks className="text-2xl text-black" />
              </div>
              <div>
                <p className="text-gray-500">Active Projects</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-400 rounded-lg mr-4">
                <FaMoneyBillWave className="text-2xl text-black" />
              </div>
              <div>
                <p className="text-gray-500">Earnings</p>
                <p className="text-2xl font-bold">$2,450</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-400 rounded-lg mr-4">
                <FaStar className="text-2xl text-black" />
              </div>
              <div>
                <p className="text-gray-500">Rating</p>
                <p className="text-2xl font-bold">4.8/5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-400 rounded-lg mr-4">
                <FaChartLine className="text-2xl text-black" />
              </div>
              <div>
                <p className="text-gray-500">Completion Rate</p>
                <p className="text-2xl font-bold">95%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Project Name</th>
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Due Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Website Redesign</td>
                  <td className="py-3">ABC Corp</td>
                  <td className="py-3">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">In Progress</span>
                  </td>
                  <td className="py-3">May 15, 2023</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Mobile App Development</td>
                  <td className="py-3">XYZ Inc</td>
                  <td className="py-3">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending Review</span>
                  </td>
                  <td className="py-3">May 20, 2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* competences */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4">Top Skills</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">React</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">Node.js</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">UI/UX Design</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">JavaScript</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700">Current Week</span>
                <span className="text-yellow-600 font-medium">Available</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700">Next Week</span>
                <span className="text-yellow-600 font-medium">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard; 