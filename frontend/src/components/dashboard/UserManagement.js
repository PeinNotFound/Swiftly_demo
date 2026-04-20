import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';
import { adminService } from '../../services/adminService';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers();
      setUsers(response.users);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminService.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  const handleSave = async (updatedUser) => {
    try {
      const response = await adminService.updateUser(updatedUser.id, updatedUser);
      setUsers(users.map(user => 
        user.id === updatedUser.id ? response.user : user
      ));
      setEditingUser(null);
      toast.success('User updated successfully');
    } catch (err) {
      toast.error('Failed to update user');
    }
  };

  const filteredUsers = users.filter(user => 
    (roleFilter === 'all' || user.role === roleFilter) &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Buttons */}
      <div className="mb-4 flex gap-2">
        {['all', 'freelancer', 'client', 'admin'].map(role => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
              roleFilter === role ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-yellow-500/20'
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
      {/* Search and Filter Bar */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-300 placeholder-gray-500"
            />
          </div>
          <button className="px-4 py-2 text-gray-400 hover:text-yellow-400 flex items-center gap-2 transition-colors">
            <FaFilter /> Filter
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-gray-800">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.profile_picture ? (
                        <img
                          src={user.profile_picture}
                          alt={user.name}
                          className="h-10 w-10 rounded-full mr-3 border border-gray-700"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full mr-3 bg-yellow-400 flex items-center justify-center text-black font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-bold text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                      user.role === 'admin' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 
                      user.role === 'freelancer' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 
                      'bg-green-500/10 border-green-500/20 text-green-400'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                      user.is_active ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-3">
                      {!(user.role === 'admin' && String(user.id) !== String(currentUser?.id)) && (
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
                          title="Edit User"
                        >
                          <FaEdit className="w-5 h-5" />
                        </button>
                      )}
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-500 hover:text-red-400 transition-colors duration-200"
                          title="Delete User"
                        >
                          <FaTrash className="w-5 h-5" />
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

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl w-[480px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Edit User</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-300 [&>option]:bg-gray-900"
                >
                  <option value="user">User</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                <select
                  value={editingUser.is_active ? 'active' : 'inactive'}
                  onChange={(e) => setEditingUser({...editingUser, is_active: e.target.value === 'active'})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-20 transition-all duration-300 [&>option]:bg-gray-900"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave(editingUser)}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors duration-200"
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

export default UserManagement; 