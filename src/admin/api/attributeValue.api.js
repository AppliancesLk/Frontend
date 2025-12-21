import adminAxios from "./adminAxios";

export const getAttributeValues = (attributeId) =>
  adminAxios.get(`/api/admin/attributes/${attributeId}/values`);

export const createAttributeValue = (attributeId, data) =>
  adminAxios.post(`/api/admin/attributes/${attributeId}/values`, data);

export const updateAttributeValue = (id, data) =>
  adminAxios.put(`/api/admin/attribute-values/${id}`, data);

export const deleteAttributeValue = (id) =>
  adminAxios.delete(`/api/admin/attribute-values/${id}`);
