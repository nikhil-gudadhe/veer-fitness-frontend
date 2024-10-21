import axios from 'axios';
import { BASE_URL } from '../constants';
import { logoutUser } from '../store/Slices/authSlice';

// Define the configuration for axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies in requests
});

// Add Axios Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses (for debugging, can remove for production)
    //console.log('Interceptor: Successful response:', response);
    return response;
  },
  async (error) => {
    console.log('Interceptor caught an error:', error.response?.status); // Log the error status
    const originalRequest = error.config;

    // Check if the error is 401 (Unauthorized) and the request hasn't been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Interceptor: Error 401 detected, retrying the request...');
      originalRequest._retry = true; // Mark the request as retried

      try {
        console.log('Interceptor: Requesting new access token...');
        
        // Call refresh token endpoint to get new access token
        const { data } = await axiosInstance.post('/users/refresh-token');
        console.log('Interceptor: New tokens received:', data);

        // Set new access token in the original request's authorization header
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        // Lazy-load the store and dispatch the logout action
        console.log('Interceptor: Dispatching logoutUser due to token refresh failure');
        const { default: store } = await import('../store/store'); // Lazy load the store
        store.dispatch(logoutUser());

        return Promise.reject(refreshError);
      }
    }

    // If the error is not 401 or retry failed, reject the promise
    console.log('Interceptor: Request not retried, rejecting the error');
    return Promise.reject(error);
  }
);

export default axiosInstance;
