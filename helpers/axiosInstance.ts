import axios from 'axios';
import { BASE_URL } from '../constants';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { logoutUser } from '../store/Slices/authSlice';

// Define the configuration for axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies in requests
});

// Axios Interceptor for handling token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const dispatch = useDispatch<AppDispatch>();

    // Check if the error is due to an expired6 access token (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent multiple retries for the same request

      try {
        // Attempt to refresh the access token using the refresh token endpoint
        const refreshResponse = await axiosInstance.post('/users/refresh-token');
        
        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        // If refreshing the token fails, log the user out and reject the request
        dispatch(logoutUser()); // Dispatch logout action from Redux store
        return Promise.reject(refreshError);
      }
    }

    // If the error is not related to token expiration, reject the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
