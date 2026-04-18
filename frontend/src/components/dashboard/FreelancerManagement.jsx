import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaSearch, FaFilter, FaUserCheck, FaUserTimes, FaUserClock } from 'react-icons/fa';
import { adminService } from '../../services/adminService';
import { toast } from 'react-toastify';

const FreelancerManagement = () => {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('pending');

    useEffect(() => {
        fetchFreelancers();
    }, []);

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

    const handleApprove = async (freelancerId) => {
        try {
            await adminService.approveFreelancer(freelancerId);
            setFreelancers(freelancers.map(freelancer => 
                freelancer.id === freelancerId ? { ...freelancer, is_approved: true, is_verified: true } : freelancer
            ));
            toast.success('Freelancer approved successfully');
        } catch (err) {
            toast.error('Failed to approve freelancer');
        }
    };

    const handleReject = async (freelancerId) => {
        if (window.confirm('Are you sure you want to reject this freelancer?')) {
            try {
                await adminService.rejectFreelancer(freelancerId);
                setFreelancers(freelancers.filter(freelancer => freelancer.id !== freelancerId));
                toast.success('Freelancer rejected successfully');
            } catch (err) {
                toast.error('Failed to reject freelancer');
            }
        }
    };

    const handleVerify = async (freelancerId) => {
        try {
            await adminService.verifyFreelancer(freelancerId);
            setFreelancers(freelancers.map(freelancer => 
                freelancer.id === freelancerId ? { ...freelancer, is_verified: true } : freelancer
            ));
            toast.success('Freelancer verified successfully');
        } catch (err) {
            toast.error('Failed to verify freelancer');
        }
    };

    const handleSuspend = async (freelancerId) => {
        const reason = prompt("Enter suspension reason:");
        if (!reason) return;

        try {
            await adminService.suspendFreelancer(freelancerId, reason);
            setFreelancers(freelancers.map(freelancer => 
                freelancer.id === freelancerId ? { ...freelancer, is_suspended: true, suspension_reason: reason, appeal_status: 'none' } : freelancer
            ));
            toast.success('Freelancer suspended successfully');
        } catch (err) {
            toast.error('Failed to suspend freelancer');
        }
    };

    const handleUnsuspend = async (freelancerId) => {
        if (window.confirm("Are you sure you want to lift this suspension?")) {
            try {
                await adminService.unsuspendFreelancer(freelancerId);
                setFreelancers(freelancers.map(freelancer => 
                    freelancer.id === freelancerId ? { ...freelancer, is_suspended: false, appeal_status: 'approved' } : freelancer
                ));
                toast.success('Freelancer unsuspended successfully');
            } catch (err) {
                toast.error('Failed to unsuspend freelancer');
            }
        }
    };

    const filteredFreelancers = freelancers.filter(freelancer => {
        const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            freelancer.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || 
                            (statusFilter === 'pending' && !freelancer.is_approved) ||
                            (statusFilter === 'verified' && freelancer.is_verified && !freelancer.is_suspended) ||
                            (statusFilter === 'suspended' && freelancer.is_suspended);
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading freelancers...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl shadow-lg">
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Freelancer Management</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search freelancers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-700 bg-gray-800/50 text-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-500"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-700 bg-gray-800/50 text-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending Approval</option>
                            <option value="verified">Verified</option>
                            <option value="suspended">Suspended</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Freelancers Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-800/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Freelancer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Skills
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Join Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-gray-800">
                        {filteredFreelancers.map(freelancer => (
                            <tr key={freelancer.id} className="hover:bg-gray-800/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {freelancer.profile_picture ? (
                                            <img
                                                src={freelancer.profile_picture}
                                                alt={freelancer.name}
                                                className="h-10 w-10 rounded-full mr-3 border border-gray-700"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded-full mr-3 bg-yellow-400 flex items-center justify-center text-black font-bold">
                                                {freelancer.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-sm font-bold text-white">{freelancer.name}</div>
                                            <div className="text-sm text-gray-400">{freelancer.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {freelancer.skills?.slice(0, 3).map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs bg-gray-800 border border-gray-700 text-gray-300 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {freelancer.skills?.length > 3 && (
                                            <span className="px-2 py-1 text-xs bg-gray-800 border border-gray-700 text-gray-300 rounded-full">
                                                +{freelancer.skills.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                                        freelancer.is_suspended ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                        !freelancer.is_approved ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                                        freelancer.is_verified ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                        'bg-gray-500/10 border-gray-500/20 text-gray-400'
                                    }`}>
                                        {freelancer.is_suspended ? 'Suspended' :
                                         !freelancer.is_approved ? 'Pending Approval' :
                                         freelancer.is_verified ? 'Verified' : 'Unverified'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(freelancer.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        {!freelancer.is_approved && (
                                            <>
                                                <button
                                                    onClick={() => handleApprove(freelancer.id)}
                                                    className="text-green-600 hover:text-green-900"
                                                    title="Approve freelancer"
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button
                                                    onClick={() => handleReject(freelancer.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Reject freelancer"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </>
                                        )}
                                        {freelancer.is_approved && !freelancer.is_verified && !freelancer.is_suspended && (
                                            <button
                                                onClick={() => handleVerify(freelancer.id)}
                                                className="text-green-600 hover:text-green-900"
                                                title="Verify freelancer"
                                            >
                                                <FaUserCheck />
                                            </button>
                                        )}
                                        {freelancer.is_approved && !freelancer.is_suspended && (
                                            <button
                                                onClick={() => handleSuspend(freelancer.id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Suspend freelancer"
                                            >
                                                <FaUserTimes />
                                            </button>
                                        )}
                                        {freelancer.is_suspended && (
                                            <button
                                                onClick={() => handleUnsuspend(freelancer.id)}
                                                className="text-yellow-600 hover:text-yellow-900 font-bold"
                                                title="Lift Suspension / Approve Appeal"
                                            >
                                                Unsuspend
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* Display Appeal Status */}
                                    {freelancer.is_suspended && freelancer.appeal_status === 'pending' && (
                                        <div className="mt-2 text-xs text-orange-400 font-semibold bg-orange-500/10 p-2 rounded block w-full border border-orange-500/20">
                                            🚨 Pending Appeal
                                            <div className="font-normal text-gray-300 italic mt-1 max-w-xs whitespace-normal break-words">
                                                "{freelancer.appeal_message}"
                                            </div>
                                        </div>
                                    )}
                                    {freelancer.is_suspended && freelancer.suspension_reason && (
                                        <div className="mt-2 text-xs text-red-400 block w-full max-w-xs whitespace-normal break-words">
                                            Reason: {freelancer.suspension_reason}
                                        </div>
                                    )}
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