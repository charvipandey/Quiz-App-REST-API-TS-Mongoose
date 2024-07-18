import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // Change this to your backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;