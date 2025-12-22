
import adminAxios from "./adminAxios";

export const getModels = (brandId) =>
  adminAxios.get(`/api/admin/models/${brandId}`);

export const createModel = (data) =>
  adminAxios.post("/api/admin/models", data);

export const updateModel = (id, data) =>
  adminAxios.put(`/api/admin/models/${id}`, data);


