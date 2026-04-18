import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch, FaFilter, FaCheck, FaTimes } from 'react-icons/fa';
import { adminService } from '../../services/adminService';
import { toast } from 'react-toastify';

const JobManagement = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await adminService.getJobs();
            setJobs(response.jobs);
            setError(null);
        } catch (err) {
            setError('Failed to fetch jobs');
            toast.error('Failed to fetch jobs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await adminService.deleteJob(jobId);
                setJobs(jobs.filter(job => job.id !== jobId));
                toast.success('Job deleted successfully');
            } catch (err) {
                toast.error('Failed to delete job');
            }
        }
    };

    const handleStatusChange = async (jobId, newStatus) => {
        try {
            await adminService.updateJobStatus(jobId, newStatus);
            setJobs(jobs.map(job => 
                job.id === jobId ? { ...job, status: newStatus } : job
            ));
            toast.success('Job status updated successfully');
        } catch (err) {
            toast.error('Failed to update job status');
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading jobs...</p>
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
                    <h2 className="text-xl font-bold text-white">Job Management</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-700 bg-gray-800/50 text-white rounded-lg focus:border-yellow-400 focus:ring-yellow-400 placeholder-gray-500"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-700 bg-gray-800/50 text-white rounded-lg focus:border-yellow-400 focus:ring-yellow-400 [&>option]:bg-gray-900"
                        >
                            <option value="all">All Status</option>
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Jobs Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-800/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Job
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Client
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Posted Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-gray-800">
                        {filteredJobs.map(job => (
                            <tr key={job.id} className="hover:bg-gray-800/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="text-sm font-bold text-white">{job.title}</div>
                                            <div className="text-sm text-gray-400">{job.type}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-300">{job.client?.name || 'N/A'}</div>
                                    <div className="text-sm text-gray-500">{job.client?.email || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                                        job.status === 'open' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                        job.status === 'in_progress' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                        job.status === 'completed' ? 'bg-gray-500/10 border-gray-500/20 text-gray-400' :
                                        'bg-red-500/10 border-red-500/20 text-red-400'
                                    }`}>
                                        {job.status.charAt(0).toUpperCase() + job.status.slice(1).replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(job.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => handleStatusChange(job.id, 'completed')}
                                            className="text-green-500 hover:text-green-400 transition-colors"
                                            title="Mark as completed"
                                        >
                                            <FaCheck className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(job.id, 'cancelled')}
                                            className="text-yellow-500 hover:text-yellow-400 transition-colors"
                                            title="Cancel job"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(job.id)}
                                            className="text-red-500 hover:text-red-400 transition-colors"
                                            title="Delete job"
                                        >
                                            <FaTrash className="w-4 h-4" />
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

export default JobManagement; 