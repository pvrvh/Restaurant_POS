import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials) => {
  console.log('🔐 Login function called with:', credentials);
  
  try {
    const response = await api.post('/auth/login', credentials);
    console.log('✅ Login response:', response);
    
    // Store token if login successful
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return { data: { data: response.data } };
  } catch (error) {
    console.error('❌ Login error:', error);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  
  // Store token if registration successful
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  
  return { data: { data: response.data } };
};

export default api;
