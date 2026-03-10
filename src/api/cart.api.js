import axios from "axios";

import api from '../lib/api';
export const addcartItem = async (item) => {
  const res = await api.post(`/api/cart/add`, item);
  return res.data;
};

export const getCartItem = async () => {
  const res = await api.get(`/api/cart`);
  return res.data;
};

