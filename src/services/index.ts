import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3002",
  headers: {
    "Content-Type": "application/json"
  }
});
axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
export default axiosClient;
