import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaUsers, FaChartBar, FaBriefcase, FaMoneyBillWave, FaUserTie, FaUserCog, FaBell, FaCog, FaQuestionCircle } from 'react-icons/fa';
import UserManagement from '../../components/dashboard/UserManagement';
import JobManagement from '../../components/dashboard/JobManagement';
import FreelancerManagement from '../../components/dashboard/FreelancerManagement';
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
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="px-4 py-6 sm:px-0 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage your platform and monitor key metrics
                        </p>
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

                {/* Quick Access Cards */}
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <Link
                        to="/dashboard/admin/users"
                        className={`bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-lg ${
                            isActivePath('/dashboard/admin/users') ? 'ring-2 ring-yellow-400' : ''
                        }`}
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FaUsers className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Users
                                        </dt>
                                        <dd className="text-lg font-semibold text-gray-900">
                                            {stats.total_users}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/dashboard/admin/freelancers"
                        className={`bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-lg ${
                            isActivePath('/dashboard/admin/freelancers') ? 'ring-2 ring-yellow-400' : ''
                        }`}
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FaUserTie className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Freelancers
                                        </dt>
                                        <dd className="text-lg font-semibold text-gray-900">
                                            {stats.total_freelancers}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/dashboard/admin/jobs"
                        className={`bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-lg ${
                            isActivePath('/dashboard/admin/jobs') ? 'ring-2 ring-yellow-400' : ''
                        }`}
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FaBriefcase className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Active Jobs
                                        </dt>
                                        <dd className="text-lg font-semibold text-gray-900">
                                            {stats.active_jobs}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FaMoneyBillWave className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Revenue
                                        </dt>
                                        <dd className="text-lg font-semibold text-gray-900">
                                            ${stats.total_revenue.toLocaleString()}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-8">
                    <Routes>
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/jobs" element={<JobManagement />} />
                        <Route path="/freelancers" element={<FreelancerManagement />} />
                        <Route
                            path="/"
                            element={
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Recent Activity */}
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between border-b pb-4">
                                                <div className="flex items-center">
                                                    <div className="bg-yellow-100 p-2 rounded-full mr-4">
                                                        <FaUserCog className="text-yellow-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">New User Registration</p>
                                                        <p className="text-gray-500 text-sm">John Doe joined the platform</p>
                                                    </div>
                                                </div>
                                                <span className="text-gray-500 text-sm">2 hours ago</span>
                                            </div>
                                            <div className="flex items-center justify-between border-b pb-4">
                                                <div className="flex items-center">
                                                    <div className="bg-yellow-100 p-2 rounded-full mr-4">
                                                        <FaBriefcase className="text-yellow-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">New Job Posted</p>
                                                        <p className="text-gray-500 text-sm">Website Development Project</p>
                                                    </div>
                                                </div>
                                                <span className="text-gray-500 text-sm">5 hours ago</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                                        <div className="space-y-3">
                                            <Link
                                                to="/dashboard/admin/users"
                                                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <FaUserCog className="text-yellow-400 mr-3" />
                                                <span>Manage Users</span>
                                            </Link>
                                            <Link
                                                to="/dashboard/admin/freelancers"
                                                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <FaUserTie className="text-yellow-400 mr-3" />
                                                <span>Manage Freelancers</span>
                                            </Link>
                                            <Link
                                                to="/dashboard/admin/jobs"
                                                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
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