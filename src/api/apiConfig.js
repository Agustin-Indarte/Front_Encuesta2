import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar token si lo tenés en localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // si usás login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

