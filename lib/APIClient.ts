import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://coding-tutor-psi.vercel.app/api"
    : "http://localhost:3000/api";

// Create an axios instance
const apiClient = axios.create({
  baseURL,
  timeout: 10000, // Set a timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Modify config before the request is sent (e.g., add authentication token)
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle the response error
    if (error.response && error.response.status === 401) {
      // Perform some action on 401 unauthorized response
    }
    return Promise.reject(error);
  }
);

export default apiClient;
