import adminAxios from "./adminAxios";

export const getAttributes = () =>
  adminAxios.get("/api/admin/attributes");

export const createAttribute = (data) =>
  adminAxios.post("/api/admin/attributes", data);

export const updateAttribute = (id, data) =>
  adminAxios.put(`/api/admin/attributes/${id}`, data);

export const deleteAttribute = (id) =>
  adminAxios.delete(`/api/admin/attributes/${id}`);
