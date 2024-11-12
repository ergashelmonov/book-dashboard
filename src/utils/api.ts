import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://523ec91c9179b301.mokky.dev",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
