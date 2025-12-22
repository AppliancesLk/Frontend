import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import AdminRoutes from "./admin/routes/AdminRoutes";
import AdminLogin from "./admin/pages/Login";
import AdminDashboard from "./admin/pages/Dashboard";

import AdminApp from "./admin/AdminApp";

function App() {
  return (
    <BrowserRouter>
    <AdminApp />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
     
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
