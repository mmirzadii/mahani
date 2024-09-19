import axios from 'axios';
import { BASE_URL } from './config.ts';

const myAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

myAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token-access');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default myAxios;
