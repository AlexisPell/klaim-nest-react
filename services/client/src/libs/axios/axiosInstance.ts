import axios from 'axios';

export const request = axios.create({
  baseURL: 'http://localhost:8080',
});

request.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});
