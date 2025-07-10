import axios from 'axios';
import { auth } from '../firebase/firebase.init';

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://coaching-management-backend-one.vercel.app/',
  withCredentials: true,
});

// Request interceptor to add Firebase token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get current user and token
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
        console.log('API request with Firebase token for:', user.email);
      }
    } catch (error) {
      console.error('Error getting Firebase token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.log('Authentication error - redirecting to login');
      // You might want to trigger logout here
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;