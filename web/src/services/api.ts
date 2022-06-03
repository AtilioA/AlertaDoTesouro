import axios from 'axios';

// TODO: Use env variable
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
