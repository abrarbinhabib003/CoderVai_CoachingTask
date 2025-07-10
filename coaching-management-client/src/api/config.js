
export const API_BASE_URL = 'http://localhost:5000/api';


export const API_ENDPOINTS = {
  
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    profile: `${API_BASE_URL}/auth/profile`,
  },
  
  // Student endpoints
  students: {
    base: `${API_BASE_URL}/students`,
    create: `${API_BASE_URL}/students`,
    getAll: `${API_BASE_URL}/students`,
    getById: (id) => `${API_BASE_URL}/students/${id}`,
    update: (id) => `${API_BASE_URL}/students/${id}`,
    delete: (id) => `${API_BASE_URL}/students/${id}`,
  },
  
  // Batch endpoints
  batches: {
    base: `${API_BASE_URL}/batches`,
    create: `${API_BASE_URL}/batches`,
    getAll: `${API_BASE_URL}/batches`,
    getById: (id) => `${API_BASE_URL}/batches/${id}`,
    update: (id) => `${API_BASE_URL}/batches/${id}`,
    delete: (id) => `${API_BASE_URL}/batches/${id}`,
  },
  
 
};

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  withCredentials: true, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  }
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  API_CONFIG
};
