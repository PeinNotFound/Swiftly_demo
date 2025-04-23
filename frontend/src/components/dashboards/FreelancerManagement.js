import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSearch, FaFilter, FaCheck, FaStar } from 'react-icons/fa';

const FreelancerManagement = () => {
  // Demo freelancers data
  const [freelancers, setFreelancers] = useState([
    {
      id: 1,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      skills: ['Web Development', 'React', 'Node.js'],
      hourlyRate: 50,
      status: 'Verified',
      joinDate: '2024-01-15',
      completedProjects: 12,
      rating: 4.8,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=random'
    },
    {
      id: 2,
      name: 'David Brown',
      email: 'david@example.com',
      skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
      hourlyRate: 45,
      status: 'Pending',
      joinDate: '2024-01-10',
      completedProjects: 8,
      rating: 4.5,
      avatar: 'https://ui-avatars.com/api/?name=David+Brown&background=random'
    },
    {
      id: 3,
      name: 'Emily Chen',
      email: 'emily@example.com',
      skills: ['Mobile Development', 'Flutter', 'Dart'],
      hourlyRate: 55,
      status: 'Verified',
      joinDate: '2024-01-05',
      completedProjects: 15,
      rating: 4.9,
      avatar: 'https://ui-avatars.com/api/?name=Emily+Chen&background=random'
    }
  ]);

  const [editingFreelancer, setEditingFreelancer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (freelancer) => {
    setEditingFreelancer(freelancer);
  };

  const handleDelete = (freelancerId) => {
    setFreelancers(freelancers.filter(freelancer => freelancer.id !== freelancerId));
  };

  const handleSave = (updatedFreelancer) => {
    setFreelancers(freelancers.map(freelancer => 
      freelancer.id === updatedFreelancer.id ? updatedFreelancer : freelancer
    ));
    setEditingFreelancer(null);
  };

  const handleVerify = (freelancerId) => {
    setFreelancers(freelancers.map(freelancer => 
      freelancer.id === freelancerId 
        ? { ...freelancer, status: 'Verified' }
        : freelancer
    ));
  };

  const filteredFreelancers = freelancers.filter(freelancer => 
    freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    freelancer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Freelancer Management</h1>
            <p className="text-gray-600 mt-1">Manage and verify freelancer profiles</p>
          </div>
        </div>

        {/* Bar de recherch */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search freelancers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-300"
              />
            </div>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2">
              <FaFilter /> Filter
            </button>
          </div>
        </div>

        {/* la list des freelanceres */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freelancer</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFreelancers.map(freelancer => (
                  <tr key={freelancer.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={freelancer.avatar}
                          alt={freelancer.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{freelancer.name}</div>
                          <div className="text-sm text-gray-500">{freelancer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {freelancer.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">${freelancer.hourlyRate}/hr</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        freelancer.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {freelancer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900">{freelancer.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({freelancer.completedProjects} projects)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(freelancer)}
                          className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(freelancer.id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        >
                          <FaTrash />
                        </button>
                        {freelancer.status === 'Pending' && (
                          <button
                            onClick={() => handleVerify(freelancer.id)}
                            className="text-green-600 hover:text-green-900 transition-colors duration-200"
                          >
                            <FaCheck />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* formulaire de update un freelancer */}
      {editingFreelancer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-[480px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Edit Freelancer</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editingFreelancer.name}
                  onChange={(e) => setEditingFreelancer({...editingFreelancer, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingFreelancer.email}
                  onChange={(e) => setEditingFreelancer({...editingFreelancer, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <input
                  type="text"
                  value={editingFreelancer.skills.join(', ')}
                  onChange={(e) => setEditingFreelancer({...editingFreelancer, skills: e.target.value.split(',').map(s => s.trim())})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-300"
                  placeholder="Enter skills separated by commas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
                <input
                  type="number"
                  value={editingFreelancer.hourlyRate}
                  onChange={(e) => setEditingFreelancer({...editingFreelancer, hourlyRate: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={editingFreelancer.status}
                  onChange={(e) => setEditingFreelancer({...editingFreelancer, status: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-300"
                >
                  <option value="Pending">Pending</option>
                  <option value="Verified">Verified</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setEditingFreelancer(null)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave(editingFreelancer)}
                  className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerManagement; 