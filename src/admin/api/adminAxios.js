import axios from "axios";
import { getAdminToken } from "../../utils/authStorage";

const adminAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

adminAxios.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminAxios;