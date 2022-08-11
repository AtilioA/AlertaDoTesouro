/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import loadRequiredEnv from '../utils/loadRequiredEnv';

const axiosInstance = axios.create({
  baseURL: loadRequiredEnv('REACT_APP_BACKEND_BASE_URL'),
  headers: {
    'Content-Type': 'application/json',
  },
});
const token = localStorage.getItem('@AlertaDoTesouro:token');
if (token) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}
export default axiosInstance;

if (process.env.NODE_ENV === 'development') {
  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    req => {
      console.log('Sending:', req, req.data);
      return req;
    },
    error => {
      console.error('Error on request:', error);
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    res => {
      console.log('Received:', res);
      return res;
    },
    error => {
      console.error('Error on response:', error);
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
      return Promise.reject(error);
    },
  );
}
