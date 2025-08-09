import axios from 'axios';

const axiosInstance = axios.create({
  // You can set a baseURL here if desired
  baseURL: 'https://project-portico-backend.vercel.app/api',
  withCredentials: true,
});

// Helper to check if the request is for login or signup/register
function isAuthRoute(url) {
  return (
    url.includes('/login') ||
    url.includes('/register-learner') ||
    url.includes('/register-instructor')||
    url.includes('/verify-token')
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
  async (error) => {
    const originalRequest = error.config;
    // If 401 and not already retried, try refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');
        const res = await axiosInstance.post('/auth/refresh-token', { refreshToken });
        const newAccessToken = res.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        // Update header and retry original request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Optionally clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // window.location.href = '/instructor/login'; // Uncomment if you want to force logout
        return Promise.reject(refreshError);
      }
    }
    // You can handle global errors here
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance; 