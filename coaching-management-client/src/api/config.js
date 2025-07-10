
export const API_BASE_URL = 'https://coaching-management-backend-one.vercel.app';



export const API_ENDPOINTS = {
  
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    profile: `${API_BASE_URL}/api/auth/profile`,
  },
  
  // Student endpoints
  students: {
    base: `${API_BASE_URL}/api/students`,
    create: `${API_BASE_URL}/api/students`,
    getAll: `${API_BASE_URL}/api/students`,
    getById: (id) => `${API_BASE_URL}/api/students/${id}`,
    update: (id) => `${API_BASE_URL}/api/students/${id}`,
    delete: (id) => `${API_BASE_URL}/api/students/${id}`,
  },
  
  // Batch endpoints
  batches: {
    base: `${API_BASE_URL}/api/batches`,
    create: `${API_BASE_URL}/api/batches`,
    getAll: `${API_BASE_URL}/api/batches`,
    getById: (id) => `${API_BASE_URL}/api/batches/${id}`,
    update: (id) => `${API_BASE_URL}/api/batches/${id}`,
    delete: (id) => `${API_BASE_URL}/api/batches/${id}`,
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
