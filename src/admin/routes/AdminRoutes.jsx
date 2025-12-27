import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import Dashboard from "../pages/Dashboard";
import CategoryList from "../pages/categories/CategoryList";
import AttributeList from "../pages/attributes/AttributeList";
import ProductList from "../pages/products/ProductList";
import { Brands } from "../pages/Brands";
import { Attributes } from "../pages/attributes/Attributes";
import { Categories } from "../pages/categories/Categories";
import { Products } from "../pages/products/Products";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="categories" element={<Categories/>} />
        <Route path="attributes" element={<Attributes/>} />
        <Route path="brands" element={<Brands/>} />
        <Route path="products" element={<Products/>} />
        <Route path="variants" element={<div>Variants Page</div>} />
      </Route>
    </Routes>
  );
}
