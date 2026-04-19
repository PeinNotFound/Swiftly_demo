import api from './api';

export const freelancerService = {
    getFreelancers: async () => {
        try {
            const response = await api.get('/freelancers');
            if (!response.data) throw new Error('No data received from server');
            return response.data;
        } catch (error) {
            console.error('Freelancer service error:', error);
            if (error.response) {
                throw new Error(error.response.data.message || 'Server error occurred');
            } else if (error.request) {
                throw new Error('No response from server. Please check your connection.');
            } else {
                throw new Error('Failed to make request: ' + error.message);
            }
        }
    },

    getDashboard: async () => {
        const response = await api.get('/freelancer/dashboard');
        return response.data;
    }
};