import axios from 'axios';
import { API_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

export const adminService = {
    // User Management
    getUsers: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/users`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateUser: async (id, userData) => {
        try {
            const response = await axios.put(`${API_URL}/api/admin/users/${id}`, userData, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteUser: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/api/admin/users/${id}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Freelancer Management
    getFreelancers: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/freelancers`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    approveFreelancer: async (freelancerId) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/freelancers/${freelancerId}/approve`,
                {},
                { headers: getAuthHeader() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    rejectFreelancer: async (freelancerId) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/freelancers/${freelancerId}/reject`,
                {},
                { headers: getAuthHeader() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    verifyFreelancer: async (freelancerId) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/freelancers/${freelancerId}/verify`,
                {},
                { headers: getAuthHeader() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    suspendFreelancer: async (freelancerId, reason) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/freelancers/${freelancerId}/suspend`,
                { reason },
                { headers: getAuthHeader() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    unsuspendFreelancer: async (freelancerId) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/freelancers/${freelancerId}/unsuspend`,
                {},
                { headers: getAuthHeader() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Job Management
    getJobs: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/jobs`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteJob: async (jobId) => {
        try {
            const response = await axios.delete(`${API_URL}/api/admin/jobs/${jobId}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateJobStatus: async (jobId, newStatus) => {
        try {
            const response = await axios.patch(
                `${API_URL}/api/admin/jobs/${jobId}/status`,
                { status: newStatus },
                { headers: getAuthHeader() }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Statistics
    getStats: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/stats`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getFreelancerStats: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/freelancers/stats`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    rejectAppeal: async (freelancerId) => {
        try {
            const response = await axios.post(`${API_URL}/api/admin/freelancers/${freelancerId}/reject-appeal`, {}, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}; 