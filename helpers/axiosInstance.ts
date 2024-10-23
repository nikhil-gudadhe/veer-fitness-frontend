import axios from 'axios';
import { BASE_URL } from '../constants';

// Define the configuration for axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies in requests
});

// Add Axios Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    //console.log('Interceptor successful response: ', response);
    return response;
  },
  async (error) => {
    console.log('Interceptor caught an error: ', error.response?.status);

    const originalRequest = error.config;
    console.log('Original request: ', originalRequest);

    // Check if the error is 401 and not yet retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('401 Unauthorized error detected');
      originalRequest._retry = true; // Mark the request as retried

      try {
        console.log('Attempting to refresh the token...');
        // Attempt to refresh the token
        const { data } = await axiosInstance.post('/users/refresh-token');

        console.log('Token refreshed successfully: ', data);

        // If refresh is successful, retry the original request
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        console.error('Refresh token failed: ', refreshError);

        if (axios.isAxiosError(refreshError)) {
          const { default: store } = await import('../store/store'); // Lazy load store
          const { logoutUser } = await import('../store/Slices/authSlice'); // Lazy load logoutUser

          if (refreshError.response?.data?.message === 'Refresh token is missing') {
            console.log('Refresh token is missing, logging out user...');
            //store.dispatch(logoutUser());
            //window.location.href = '/signin';
          }
        }

        return Promise.reject(refreshError);
      }
    }

    console.log('Request is not retried, rejecting the error');
    return Promise.reject(error);
  }
);

// let retryCount = 0;
// const MAX_RETRY_LIMIT = 1; // Prevent infinite loop, limit retries


// Add Axios Interceptor for handling token refresh and logout
// axiosInstance.interceptors.response.use(
//   (response) => response, // Pass through successful responses
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is 401 and the request hasn't been retried
//     if (error.response?.status === 401 && !originalRequest._retry && retryCount < MAX_RETRY_LIMIT) {
//       originalRequest._retry = true; // Mark the request as retried
//       retryCount += 1; // Increment retry count

//       try {
//         // Attempt to refresh the access token
//         const { data } = await axiosInstance.post('/users/refresh-token');

//         // Retry original request with new access token
//         originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
//         retryCount = 0; // Reset retry count

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error('Token refresh failed:', refreshError);

//         // If refresh token is invalid or expired, redirect to sign-in page
//         if (axios.isAxiosError(refreshError)) {
//           if (refreshError.response?.data?.message === 'Refresh token is missing' ||
//               refreshError.response?.data?.message === 'Invalid or expired refresh token') {
            
//             // Dispatch the logout action to handle invalid refresh token
//             const { default: store } = await import('../store/store'); // Lazy load store
//             const { logoutUser } = await import('../store/Slices/authSlice'); // Lazy load logoutUser

//             store.dispatch(logoutUser());

//             // Clear cookies if they are invalid
//             document.cookie = 'accessToken=; Max-Age=0';
//             document.cookie = 'refreshToken=; Max-Age=0';

//             // Redirect to login page
//             window.location.href = '/signin';
//           }
//         }

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error); // Reject other errors
//   }
// );

export default axiosInstance;
