import axios from 'axios';

// Create an axios instance for API service
const ApiService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Set base URL from environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject the JWT token in headers
ApiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add the token to headers if it exists
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Optionally, add a response interceptor to handle responses or errors globally
ApiService.interceptors.response.use(
  (response) => response, // Handle successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized responses, such as token expiry
      localStorage.removeItem('token'); // Clear the token if the response is 401
      window.location.href = '/login';  // Redirect to login
    }
    return Promise.reject(error); // Forward error to catch blocks
  }
);

export { ApiService };