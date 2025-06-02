import api from './api';

export const freelancerService = {
    getFreelancers: async () => {
        try {
            console.log('Fetching freelancers...'); // Debug log
            const response = await api.get('/freelancers');
            console.log('Raw API response:', response); // Debug log
            
            if (!response.data) {
                throw new Error('No data received from server');
            }
            
            return response.data;
        } catch (error) {
            console.error('Freelancer service error:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                throw new Error(error.response.data.message || 'Server error occurred');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                throw new Error('No response from server. Please check your connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Request setup error:', error.message);
                throw new Error('Failed to make request: ' + error.message);
            }
        }
    }
}; 