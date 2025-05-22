import api from './api';

export const adminService = {
    // User Management
    getUsers: async () => {
        try {
            const response = await api.get('/admin/users');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateUser: async (id, userData) => {
        try {
            const response = await api.put(`/admin/users/${id}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteUser: async (id) => {
        try {
            const response = await api.delete(`/admin/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Freelancer Management
    getFreelancers: async () => {
        try {
            const response = await api.get('/freelancers');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    verifyFreelancer: async (id) => {
        try {
            const response = await api.post(`/admin/freelancers/${id}/verify`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    suspendFreelancer: async (id) => {
        try {
            const response = await api.post(`/admin/freelancers/${id}/suspend`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Statistics
    getStats: async () => {
        try {
            const response = await api.get('/admin/stats');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getFreelancerStats: async () => {
        try {
            const response = await api.get('/admin/freelancer-stats');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}; 