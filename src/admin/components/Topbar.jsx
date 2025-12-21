import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../utils/authStorage";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/admin/login");
  };

  return (
    <header className="flex justify-between items-center bg-white px-6 py-3 shadow">
      <h1 className="font-semibold">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </header>
  );
}
