import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import Dashboard from "../pages/Dashboard";
import CategoryList from "../pages/categories/CategoryList";
import AttributeList from "../pages/attributes/AttributeList";
import ProductList from "../pages/products/ProductList";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="categories" element={<CategoryList/>} />
        <Route path="attributes" element={<AttributeList/>} />
        <Route path="products" element={<ProductList/>} />
        <Route path="variants" element={<div>Variants Page</div>} />
      </Route>
    </Routes>
  );
}
