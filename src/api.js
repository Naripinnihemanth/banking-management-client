import axios from "axios";
import { TOKEN } from "./constents";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.resolve(error);
  },
);

export default api;
