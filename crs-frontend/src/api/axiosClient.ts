// path: crs-frontend/src/api/axiosClient.ts
// purpose: THEM Response Interceptor xu ly 401 (token het han/khong hop le) -> tu dong dang xuat.
// Phan Request Interceptor GIU NGUYEN tu Buoi 7, khong sua.

import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - tu Buoi 7, giu nguyen
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('crs_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor - MOI o Buoi 8
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        const requestUrl = String(error.config?.url ?? '');
        const isLoginRequest = requestUrl.includes('/api/auth/login');
        if (!isLoginRequest) {
          localStorage.removeItem('crs_token');
          localStorage.removeItem('crs_user');
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
      }
    return Promise.reject(error);
  },
);

export default axiosClient;
