import axios from 'axios';
import { BASE_URL } from '../constants';

// Define the configuration for axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
