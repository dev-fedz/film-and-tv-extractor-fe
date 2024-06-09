import axios from 'axios';
export const apiHost = `${process.env.NEXT_PUBLIC_BACKEND}`;
export const wsHost = process.env.NEXT_PUBLIC_WEBSOCKET;

const axiosConfig = {
  baseURL: apiHost,
  headers: {},
};

const api = axios.create(axiosConfig);

api.interceptors.request.use(function (config) {
  if (localStorage.getItem('token')) {
    config.headers['Authorization'] = `Token ${localStorage.getItem('token')}`;
  }
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    if (error?.response?.status === 403) {
      // Pass
    }
    return Promise.reject(error);
  }
);

export default api;
