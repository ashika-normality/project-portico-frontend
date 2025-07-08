import axios from 'axios';

const axiosInstance = axios.create({
  // You can set a baseURL here if desired
  baseURL: 'http://localhost:7002/api',
  withCredentials: true,
});

// Helper to check if the request is for login or signup/register
function isAuthRoute(url) {
  return (
    url.includes('/login') ||
    url.includes('/register-learner') ||
    url.includes('/register-instructor')
  );
}

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Only attach token if not login or signup/register
    if (!isAuthRoute(config.url)) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    // You can handle global errors here
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance; 