// api/category.api.js
import axios from "axios";
const API_BASE = import.meta.env.REACT_APP_API_BASE_URL; 


export const fetchCategories = async () => {
  const res = await axios.get(`${API_BASE}/api/product/categories`);
  return res.data;
};