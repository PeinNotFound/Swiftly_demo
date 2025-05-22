import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaUsers, FaChartBar } from 'react-icons/fa';
import UserManagement from '../../components/dashboard/UserManagement';
import { adminService } from '../../services/adminService';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        total_users: 0,
        total_freelancers: 0,
        total_clients: 0
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
                setStats(data);
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
                {/* Welcome Section */}
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage users and monitor platform statistics
                    </p>
                </div>

                {/* Quick Access Cards */}
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FaChartBar className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Freelancers
                                        </dt>
                                        <dd className="text-lg font-semibold text-gray-900">
                                            {stats.total_freelancers}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FaChartBar className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Clients
                                        </dt>
                                        <dd className="text-lg font-semibold text-gray-900">
                                            {stats.total_clients}
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
                        <Route
                            path="/"
                            element={
                                <div className="text-center py-12">
                                    <h2 className="text-2xl font-semibold text-gray-900">
                                        Select a management option from above
                                    </h2>
                                    <p className="mt-2 text-gray-600">
                                        Manage users or view platform statistics
                                    </p>
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