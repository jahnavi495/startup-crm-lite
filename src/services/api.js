import axios from 'axios';
import { toast } from 'react-hot-toast';

/**
 * Configure standard Axios client instance.
 * Reads the base API url from Vite's compiled environment variables.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Request interceptor to automatically append JWT authorization token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crm-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication expiry and connection issues globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response, request } = error;

    // 1. Handle authentication errors (401 Unauthorized)
    if (response && response.status === 401) {
      localStorage.removeItem('crm-token');
      
      // Prevent infinite redirect loops if we are already on the login/register paths
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        window.location.href = '/login';
      }
    }

    // 2. Handle network/connectivity failures (no response received from server)
    else if (!response && request) {
      toast.error('Cannot connect to server. Check your connection.', {
        id: 'network-connectivity-error', // prevents duplicate toast stacking
        style: {
          background: '#EF4444',
          color: '#FFFFFF',
          fontWeight: 'bold',
        },
        duration: 4000,
      });
    }

    return Promise.reject(error);
  }
);

export default api;
