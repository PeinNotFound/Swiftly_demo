import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaUsers, FaChartBar, FaBriefcase, FaMoneyBillWave, FaUserTie, FaUserCog, FaBell, FaCog, FaQuestionCircle, FaCheck } from 'react-icons/fa';
import UserManagement from '../../components/dashboard/UserManagement';
import JobManagement from '../../components/dashboard/JobManagement';
import FreelancerManagement from '../../components/dashboard/FreelancerManagement';
import VerificationRequests from '../../components/dashboard/VerificationRequests';
import { adminService } from '../../services/adminService';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        total_users: 0,
        total_freelancers: 0,
        total_clients: 0,
        total_jobs: 0,
        active_jobs: 0,
        total_revenue: 0,
        pending_verifications: 0,
        recent_activities: []
    });
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.getStats();
                setStats(prevStats => ({
                    ...prevStats,
                    ...data,
                    total_revenue: data.total_revenue ?? prevStats.total_revenue,
                    total_users: data.total_users ?? prevStats.total_users,
                    total_freelancers: data.total_freelancers ?? prevStats.total_freelancers,
                    total_clients: data.total_clients ?? prevStats.total_clients,
                    total_jobs: data.total_jobs ?? prevStats.total_jobs,
                    active_jobs: data.active_jobs ?? prevStats.active_jobs,
                    pending_verifications: data.pending_verifications ?? prevStats.pending_verifications,
                    recent_activities: data.recent_activities ?? prevStats.recent_activities
                }));
            } catch (error) {
                toast.error('Failed to fetch dashboard statistics');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="px-4 py-6 sm:px-0 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Admin Dashboard</h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Manage your platform and monitor key metrics
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => toast.info('You have no new notifications.', { icon: '🔔', theme: 'dark' })}
                            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                        >
                            <FaBell className="text-xl" />
                        </button>
                        <button 
                            onClick={() => toast.info('Admin settings panel coming in v2.0!', { icon: '⚙️', theme: 'dark' })}
                            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                        >
                            <FaCog className="text-xl" />
                        </button>
                        <button 
                            onClick={() => toast.info('Help Center is currently offline. Please refer to the doc.', { icon: '❓', theme: 'dark' })}
                            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                        >
                            <FaQuestionCircle className="text-xl" />
                        </button>
                    </div>
                </div>

                {/* Quick Access Cards */}
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <Link
                        to="/dashboard/admin/users"
                        className={`bg-gray-900/50 backdrop-blur-xl border border-gray-800 overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-yellow-500/10 hover:border-yellow-500/50 ${isActivePath('/dashboard/admin/users') ? 'ring-2 ring-yellow-400' : ''
                            }`}
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FaUsers className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-400 truncate">
                                            Total Users
                                        </dt>
                                        <dd className="text-xl font-bold text-white">
                                            {stats.total_users}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/dashboard/admin/freelancers"
                        className={`bg-gray-900/50 backdrop-blur-xl border border-gray-800 overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-yellow-500/10 hover:border-yellow-500/50 ${isActivePath('/dashboard/admin/freelancers') ? 'ring-2 ring-yellow-400' : ''
                            }`}
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FaUserTie className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-400 truncate">
                                            Freelancers
                                        </dt>
                                        <dd className="text-xl font-bold text-white">
                                            {stats.total_freelancers}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/dashboard/admin/jobs"
                        className={`bg-gray-900/50 backdrop-blur-xl border border-gray-800 overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-yellow-500/10 hover:border-yellow-500/50 ${isActivePath('/dashboard/admin/jobs') ? 'ring-2 ring-yellow-400' : ''
                            }`}
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FaBriefcase className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-400 truncate">
                                            Active Jobs
                                        </dt>
                                        <dd className="text-xl font-bold text-white">
                                            {stats.active_jobs}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 overflow-hidden shadow-lg rounded-xl">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FaMoneyBillWave className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-400 truncate">
                                            Total Revenue
                                        </dt>
                                        <dd className="text-xl font-bold text-white">
                                            ${stats.total_revenue.toLocaleString()}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/dashboard/admin/verifications"
                        className={`bg-gray-900/50 backdrop-blur-xl border border-gray-800 overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-yellow-500/10 hover:border-yellow-500/50 ${isActivePath('/dashboard/admin/verifications') ? 'ring-2 ring-yellow-400' : ''
                            }`}
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FaCheck className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-400 truncate">
                                            Pending Verifs
                                        </dt>
                                        <dd className="text-xl font-bold text-white">
                                            {stats.pending_verifications}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Main Content */}
                <div className="mt-8">
                    <Routes>
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/jobs" element={<JobManagement />} />
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/jobs" element={<JobManagement />} />
                        <Route path="/freelancers" element={<FreelancerManagement />} />
                        <Route path="/verifications" element={<VerificationRequests />} />
                        <Route
                            path="/"
                            element={
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Recent Activity */}
                                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl shadow-lg p-6">
                                        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                                <div className="flex items-center">
                                                    <div className="bg-yellow-500/10 p-3 rounded-full mr-4 border border-yellow-500/20">
                                                        <FaUserCog className="text-yellow-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-200">New User Registration</p>
                                                        <p className="text-gray-400 text-sm">John Doe joined the platform</p>
                                                    </div>
                                                </div>
                                                <span className="text-gray-500 text-sm">2 hours ago</span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                                                <div className="flex items-center">
                                                    <div className="bg-yellow-500/10 p-3 rounded-full mr-4 border border-yellow-500/20">
                                                        <FaBriefcase className="text-yellow-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-200">New Job Posted</p>
                                                        <p className="text-gray-400 text-sm">Website Development Project</p>
                                                    </div>
                                                </div>
                                                <span className="text-gray-500 text-sm">5 hours ago</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl shadow-lg p-6">
                                        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                                        <div className="space-y-3">
                                            <Link
                                                to="/dashboard/admin/users"
                                                className="flex items-center p-3 rounded-lg border border-transparent hover:border-gray-700 hover:bg-gray-800/50 text-gray-300 transition-all duration-200"
                                            >
                                                <FaUserCog className="text-yellow-400 mr-3" />
                                                <span>Manage Users</span>
                                            </Link>
                                            <Link
                                                to="/dashboard/admin/freelancers"
                                                className="flex items-center p-3 rounded-lg border border-transparent hover:border-gray-700 hover:bg-gray-800/50 text-gray-300 transition-all duration-200"
                                            >
                                                <FaUserTie className="text-yellow-400 mr-3" />
                                                <span>Manage Freelancers</span>
                                            </Link>
                                            <Link
                                                to="/dashboard/admin/jobs"
                                                className="flex items-center p-3 rounded-lg border border-transparent hover:border-gray-700 hover:bg-gray-800/50 text-gray-300 transition-all duration-200"
                                            >
                                                <FaBriefcase className="text-yellow-400 mr-3" />
                                                <span>Manage Jobs</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 