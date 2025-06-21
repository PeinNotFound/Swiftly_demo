import axios from 'axios';

const MESSAGE_API_URL = process.env.REACT_APP_MESSAGE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: MESSAGE_API_URL,
    headers: {
        'Accept': 'application/json'
    }
});

// Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('API Request:', {
            url: config.url,
            method: config.method,
            data: config.data,
            params: config.params
        });
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 errors and add response logging
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', {
            url: response.config.url,
            status: response.status,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error('API Error:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

const messageService = {
    async getMessages(userId, freelancerId) {
        try {
            // Ensure IDs are strings
            const userIdStr = userId?.toString();
            const freelancerIdStr = freelancerId?.toString();
            
            if (!userIdStr || !freelancerIdStr) {
                throw new Error('Invalid user IDs');
            }

            const response = await api.get(`/messages/${userIdStr}/${freelancerIdStr}`);
            return response.data;
        } catch (error) {
            console.error('getMessages error:', error);
            throw error.response?.data || error.message;
        }
    },

    async sendMessage(userId, freelancerId, content) {
        try {
            // Ensure IDs are strings
            const userIdStr = userId?.toString();
            const freelancerIdStr = freelancerId?.toString();
            
            if (!userIdStr || !freelancerIdStr || !content) {
                throw new Error('Invalid message data');
            }

            const response = await api.post('/messages', {
                userId: userIdStr,
                freelancerId: freelancerIdStr,
                content
            });
            return response.data;
        } catch (error) {
            console.error('sendMessage error:', error);
            throw error.response?.data || error.message;
        }
    },

    async getChatPartners(userId) {
        try {
            // Ensure ID is string
            const userIdStr = userId?.toString();
            
            if (!userIdStr) {
                throw new Error('Invalid user ID');
            }

            const response = await api.get(`/messages/partners/${userIdStr}`);
            return response.data;
        } catch (error) {
            console.error('getChatPartners error:', error);
            throw error.response?.data || error.message;
        }
    }
};

export default messageService; 