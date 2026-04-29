import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Your backend URL
  withCredentials: true, // Important to send cookies
});

// Function to get a new access token
const refreshToken = async () => {
  try {
    const response = await API.post("/refresh");
    return response.data.accessToken;
  } catch (error) {
    console.error("Refresh token failed", error);
    throw error;
  }
};

// Axios request interceptor to attach access token
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor to handle 401 errors
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and not retrying yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return API(originalRequest); // Retry the request
      } catch (err) {
        console.error("Token refresh failed", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;