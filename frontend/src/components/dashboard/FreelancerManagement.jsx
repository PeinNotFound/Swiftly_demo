import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

const FreelancerManagement = () => {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchFreelancers = async () => {
        try {
            setLoading(true);
            const response = await adminService.getFreelancers();
            setFreelancers(response.freelancers);
            setError(null);
        } catch (err) {
            setError('Failed to fetch freelancers');
            toast.error('Failed to fetch freelancers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFreelancers();
    }, []);

    const handleVerify = async (id) => {
        try {
            await adminService.verifyFreelancer(id);
            toast.success('Freelancer verified successfully');
            fetchFreelancers();
        } catch (err) {
            toast.error('Failed to verify freelancer');
        }
    };

    const handleSuspend = async (id) => {
        try {
            await adminService.suspendFreelancer(id);
            toast.success('Freelancer suspended successfully');
            fetchFreelancers();
        } catch (err) {
            toast.error('Failed to suspend freelancer');
        }
    };

    const filteredFreelancers = freelancers.filter(freelancer =>
        freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freelancer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-4xl text-yellow-400" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Freelancer Management</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search freelancers..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Freelancer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Skills
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rating
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredFreelancers.map((freelancer) => (
                            <tr key={freelancer.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {freelancer.profile_picture ? (
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={freelancer.profile_picture}
                                                    alt={freelancer.name}
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-500 font-medium">
                                                        {freelancer.name.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {freelancer.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {freelancer.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            freelancer.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {freelancer.is_active ? 'Active' : 'Suspended'}
                                        </span>
                                        {freelancer.is_verified && (
                                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {freelancer.skills?.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-900">
                                            {freelancer.rating?.toFixed(1) || 'N/A'}
                                        </span>
                                        <span className="text-sm text-gray-500 ml-1">
                                            ({freelancer.completed_projects || 0} projects)
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        {!freelancer.is_verified && (
                                            <button
                                                onClick={() => handleVerify(freelancer.id)}
                                                className="text-green-600 hover:text-green-900"
                                                title="Verify Freelancer"
                                            >
                                                <FaCheck className="w-5 h-5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleSuspend(freelancer.id)}
                                            className={`${
                                                freelancer.is_active
                                                    ? 'text-red-600 hover:text-red-900'
                                                    : 'text-green-600 hover:text-green-900'
                                            }`}
                                            title={freelancer.is_active ? 'Suspend Freelancer' : 'Activate Freelancer'}
                                        >
                                            <FaTimes className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FreelancerManagement; 