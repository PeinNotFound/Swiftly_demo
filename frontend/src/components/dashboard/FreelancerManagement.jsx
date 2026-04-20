import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaSearch, FaFilter, FaUserCheck, FaUserTimes, FaUserClock, FaBan } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import { adminService } from '../../services/adminService';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../../config';

const getAuthHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

const FreelancerManagement = () => {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('pending');

    // Rejection modal state
    const [rejectModal, setRejectModal] = useState({ open: false, freelancerId: null, mode: 'appeal' });
    const [rejectReason, setRejectReason] = useState('');

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
            setFreelancers(freelancers.map(f =>
                f.id === freelancerId ? { ...f, is_approved: true, is_verified: true } : f
            ));
            toast.success('Freelancer approved successfully');
        } catch (err) {
            toast.error('Failed to approve freelancer');
        }
    };

    const handleVerify = async (freelancerId) => {
        try {
            await adminService.verifyFreelancer(freelancerId);
            setFreelancers(freelancers.map(f =>
                f.id === freelancerId ? { ...f, is_verified: true } : f
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
            setFreelancers(freelancers.map(f =>
                f.id === freelancerId ? { ...f, is_suspended: true, suspension_reason: reason, appeal_status: 'none' } : f
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
                setFreelancers(freelancers.map(f =>
                    f.id === freelancerId ? { ...f, is_suspended: false, appeal_status: 'approved' } : f
                ));
                toast.success('Freelancer unsuspended successfully');
            } catch (err) {
                toast.error('Failed to unsuspend freelancer');
            }
        }
    };

    const openRejectAppealModal = (freelancerId) => {
        setRejectModal({ open: true, freelancerId, mode: 'appeal' });
        setRejectReason('');
    };

    const handleRejectAppeal = async () => {
        if (!rejectReason.trim()) { toast.error('Please provide a reason'); return; }
        try {
            await axios.post(`${API_URL}/api/admin/freelancers/${rejectModal.freelancerId}/reject-appeal`, {}, {
                headers: getAuthHeader()
            });
            setFreelancers(freelancers.map(f =>
                f.id === rejectModal.freelancerId ? { ...f, is_suspended: true, appeal_status: 'rejected' } : f
            ));
            toast.success('Appeal rejected and email banned');
            setRejectModal({ open: false, freelancerId: null, mode: 'appeal' });
        } catch (err) {
            toast.error('Failed to reject appeal');
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

    if (loading) return (
        <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading freelancers...</p>
        </div>
    );

    if (error) return <div className="text-center py-12"><p className="text-red-500">{error}</p></div>;

    return (
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl shadow-lg">
            {/* Reject Appeal Modal */}
            {rejectModal.open && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-900 border border-red-500/30 p-8 rounded-2xl w-[480px] shadow-2xl">
                        <h2 className="text-xl font-bold text-red-400 mb-2">Reject Appeal & Ban Email</h2>
                        <p className="text-gray-400 text-sm mb-6">This action will permanently ban the freelancer's email from the platform. This cannot be undone.</p>
                        <textarea
                            value={rejectReason}
                            onChange={e => setRejectReason(e.target.value)}
                            placeholder="Enter reason for rejecting the appeal..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all min-h-[100px] mb-6"
                        />
                        <div className="flex justify-end gap-4">
                            <button onClick={() => setRejectModal({ open: false, freelancerId: null, mode: 'appeal' })} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                            <button onClick={handleRejectAppeal} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold">Ban & Reject</button>
                        </div>
                    </div>
                </div>
            )}

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

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-800/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Freelancer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Skills</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Join Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-gray-800">
                        {filteredFreelancers.map(freelancer => (
                            <tr key={freelancer.id} className="hover:bg-gray-800/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {freelancer.profile_picture ? (
                                            <img src={freelancer.profile_picture} alt={freelancer.name} className="h-10 w-10 rounded-full mr-3 border border-gray-700" />
                                        ) : (
                                            <div className="h-10 w-10 rounded-full mr-3 bg-yellow-400 flex items-center justify-center text-black font-bold">
                                                {freelancer.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-sm font-bold text-white">{freelancer.name}</span>
                                                {freelancer.is_verified && (
                                                    <FiCheckCircle className="text-blue-400 text-xs flex-shrink-0" title="Verified" />
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-400">{freelancer.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {freelancer.skills?.slice(0, 3).map((skill, index) => (
                                            <span key={index} className="px-2 py-1 text-xs bg-gray-800 border border-gray-700 text-gray-300 rounded-full">{skill}</span>
                                        ))}
                                        {freelancer.skills?.length > 3 && (
                                            <span className="px-2 py-1 text-xs bg-gray-800 border border-gray-700 text-gray-300 rounded-full">+{freelancer.skills.length - 3} more</span>
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
                                                <button onClick={() => handleApprove(freelancer.id)} className="text-green-400 hover:text-green-300" title="Approve"><FaCheck /></button>
                                            </>
                                        )}
                                        {freelancer.is_approved && !freelancer.is_verified && !freelancer.is_suspended && (
                                            <button onClick={() => handleVerify(freelancer.id)} className="text-green-400 hover:text-green-300" title="Verify"><FaUserCheck /></button>
                                        )}
                                        {freelancer.is_approved && !freelancer.is_suspended && (
                                            <button onClick={() => handleSuspend(freelancer.id)} className="text-red-400 hover:text-red-300" title="Suspend"><FaUserTimes /></button>
                                        )}
                                        {freelancer.is_suspended && freelancer.appeal_status === 'pending' && (
                                            <>
                                                <button onClick={() => handleUnsuspend(freelancer.id)} className="text-yellow-400 hover:text-yellow-300 text-xs font-bold px-2 py-1 border border-yellow-500/30 rounded" title="Approve Appeal">Approve Appeal</button>
                                                <button onClick={() => openRejectAppealModal(freelancer.id)} className="text-red-400 hover:text-red-300 text-xs font-bold px-2 py-1 border border-red-500/30 rounded" title="Reject Appeal & Ban"><FaBan /></button>
                                            </>
                                        )}
                                        {freelancer.is_suspended && freelancer.appeal_status !== 'pending' && (
                                            <button onClick={() => handleUnsuspend(freelancer.id)} className="text-yellow-400 hover:text-yellow-300 font-bold text-xs" title="Lift Suspension">Unsuspend</button>
                                        )}
                                    </div>

                                    {/* Appeal Badge */}
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