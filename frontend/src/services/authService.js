import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

const authService = {
    async register(userData) {
        try {
            const response = await api.post('/register', userData);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async login(credentials) {
        try {
            const response = await api.post('/login', credentials);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    async logout() {
        try {
            await api.post('/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    async getCurrentUser() {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await api.get('/user');
            if (response.data.success) return response.data;

            throw new Error(response.data.message || 'Failed to get user data');
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
            throw this.handleError(error);
        }
    },

    async updateProfile(formData) {
        try {
            // Laravel needs method override for PUT with FormData
            formData.append('_method', 'PUT');

            const response = await api.post('/freelancers/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to update profile');
            }

            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },

    getToken() {
        return localStorage.getItem('token');
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    getUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    handleError(error) {
        console.error('Error object received by handleError:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            return {
                message: error.response.data.message || 'An error occurred',
                errors: error.response.data.errors,
                status: error.response.status
            };
        } else if (error.request) {
            console.error('Error request:', error.request);
            return {
                message: 'No response from server',
                status: 0
            };
        } else {
            console.error('Generic error:', error.message);
            return {
                message: error.message,
                status: 0
            };
        }
    }
};

export default authService;
