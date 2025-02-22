import axios from 'axios';
import { FacebookService } from './facebook';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = FacebookService.getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Clear token only if it exists and this isn't a verification request
      const token = localStorage.getItem('fb_access_token');
      const isVerifyRequest = error.config.url?.includes('/auth/verify');

      if (token && !isVerifyRequest) {
        localStorage.removeItem('fb_access_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);