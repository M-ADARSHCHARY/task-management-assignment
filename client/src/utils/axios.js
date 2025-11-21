import axios from 'axios';

const isDev = import.meta.env.VITE_MODE === 'development';
const baseUrl = isDev
  ? 'http://localhost:5000/api'
  : `${import.meta.env.VITE_BACKEND_URL}/api`;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});