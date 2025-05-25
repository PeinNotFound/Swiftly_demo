import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const jobService = {
  getAllJobs: async () => {
    try {
      console.log('Fetching jobs from:', `${API_URL}/jobs`);
      const response = await api.get('/jobs');
      console.log('Jobs response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      throw error;
    }
  },

  getJob: async (id) => {
    try {
      console.log('Fetching job:', id);
      const response = await api.get(`/jobs/${id}`);
      console.log('Job response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  },

  createJob: async (jobData) => {
    try {
      console.log('Creating job:', jobData);
      const response = await api.post('/jobs', jobData);
      console.log('Create job response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  updateJob: async (id, jobData) => {
    try {
      console.log('Updating job:', id, jobData);
      const response = await api.patch(`/jobs/${id}`, jobData);
      console.log('Update job response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  deleteJob: async (id) => {
    try {
      console.log('Deleting job:', id);
      const response = await api.delete(`/jobs/${id}`);
      console.log('Delete job response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }
}; 