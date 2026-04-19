import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaTasks, FaMoneyBillWave, FaStar, FaChartLine, FaCheckCircle, FaClock, FaBriefcase, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { freelancerService } from '../../services/freelancerService';

const FreelancerDashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dashData, setDashData] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                const data = await freelancerService.getDashboard();
                setDashData(data);
            } catch (err) {
                setError('Failed to load dashboard data.');
                toast.error('Failed to load dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <FaSpinner className="text-yellow-400 text-5xl animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading your dashboard...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <p className="text-red-400 text-xl">{error}</p>
        </div>
    );

    const stats = dashData?.stats ?? {};
    const activeJobs = dashData?.active_jobs ?? [];
    const recentActivity = dashData?.recent_activity ?? [];
    const skills = dashData?.skills ?? [];

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">{user?.name}!</span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Here's what's happening with your projects today.
                        </p>
                    </div>
                    <button onClick={() => toast.info('Find Work feature coming soon!')} className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-yellow-500/20 flex items-center gap-2">
                        <FaBriefcase /> Find Work
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-lg shadow-black/50 hover:border-gray-700 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <FaTasks className="text-2xl text-blue-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Active Projects</p>
                                <h3 className="text-3xl font-bold text-white">{stats.active_projects ?? 0}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-lg shadow-black/50 hover:border-gray-700 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                                <FaMoneyBillWave className="text-2xl text-green-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Total Earnings</p>
                                <h3 className="text-3xl font-bold text-white">${(stats.total_earnings ?? 0).toLocaleString()}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-lg shadow-black/50 hover:border-gray-700 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                <FaStar className="text-2xl text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Average Rating</p>
                                <h3 className="text-3xl font-bold text-white">{stats.average_rating ?? '—'}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-lg shadow-black/50 hover:border-gray-700 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                <FaChartLine className="text-2xl text-purple-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Completion Rate</p>
                                <h3 className="text-3xl font-bold text-white">{stats.completion_rate ?? 0}%</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Active Projects Table */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-lg">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">Current Projects</h2>
                                <button className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors">View All</button>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-800 text-gray-400 text-sm">
                                            <th className="pb-3 font-medium">Project</th>
                                            <th className="pb-3 font-medium">Client</th>
                                            <th className="pb-3 font-medium">Progress</th>
                                            <th className="pb-3 font-medium">Due Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {activeJobs.length === 0 ? (
                                            <tr><td colSpan={4} className="py-8 text-center text-gray-500">No active projects right now.</td></tr>
                                        ) : activeJobs.map(job => (
                                            <tr key={job.id} className="hover:bg-gray-800/30 transition-colors">
                                                <td className="py-4">
                                                    <p className="text-white font-semibold">{job.title}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{job.status}</p>
                                                </td>
                                                <td className="py-4 text-gray-300">{job.client}</td>
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-full bg-gray-800 rounded-full h-2 max-w-[100px]">
                                                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${job.progress}%` }}></div>
                                                        </div>
                                                        <span className="text-xs text-gray-400">{job.progress}%</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
                                                        <FaClock className="text-gray-400" />
                                                        {job.due_date ? new Date(job.due_date).toLocaleDateString() : 'N/A'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        {/* Skills Quick view */}
                        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-bold text-white mb-6">Your Top Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No skills added yet.</p>
                                ) : skills.map(skill => (
                                    <span key={skill} className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-4 py-2 rounded-xl text-sm font-semibold">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Timeline Sidebar */}
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-lg h-fit">
                        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                        
                        <div className="space-y-6">
                            {recentActivity.length === 0 ? (
                                <p className="text-gray-500 text-sm">No recent activity.</p>
                            ) : recentActivity.map((activity, idx) => {
                                const isPayment = activity.type === 'payment';
                                const IconComp = isPayment ? FaMoneyBillWave : FaCheckCircle;
                                const colorClass = isPayment ? 'text-green-400' : 'text-blue-400';
                                return (
                                    <div key={idx} className="relative flex items-start gap-4">
                                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-gray-800 bg-gray-900 ${colorClass}`}>
                                            <IconComp className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <p className="text-sm font-bold text-white">
                                                {activity.action}
                                                {activity.amount && <span className="text-green-400 ml-1">{activity.amount}</span>}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">{activity.project}</p>
                                            <p className="text-xs text-gray-500 mt-2 font-medium">{activity.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="w-full mt-6 py-2.5 text-sm font-medium text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-colors border border-gray-700">
                            View All Activity
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerDashboard; 