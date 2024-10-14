import axios from 'axios';
import { BASE_URL } from '../constants';
import store  from '../store/store'; // Import the store directly
import { logoutUser } from '../store/Slices/authSlice';

// Define the configuration for axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies in requests
});


// Move the interceptor logic to the end
axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  async (error) => {
    console.log('Interceptor caught an error:', error.response?.status);
    const originalRequest = error.config;

    // Check if error is 401 (Unauthorized) and the request hasn't been retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        // Call refresh token endpoint to get new access token
        const { data } = await axiosInstance.post('/refresh-token');

        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed');
        
        // Dispatch a logout action to Redux or handle it in your own way
        //store.dispatch(logoutUser()); // Use store.dispatch to dispatch the logout action

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // If the error is not 401 or retry failed, reject the promise
  }
);

export default axiosInstance;