import useAdminGuard from "../hooks/useAdminGuard";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
 useAdminGuard();

  return (
    <div className="flex min-h-screen bg-gray-100 m- -ml-14.5 -mr-14">
      
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-yellow-400 text-black" : "hover:bg-gray-800"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-yellow-400 text-black" : "hover:bg-gray-800"
              }`
            }
          >
            Categories
          </NavLink>

          <NavLink
            to="/admin/attributes"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-yellow-400 text-black" : "hover:bg-gray-800"
              }`
            }
          >
            Attributes
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-yellow-400 text-black" : "hover:bg-gray-800"
              }`
            }
          >
            Products
          </NavLink>
           <NavLink
            to="/admin/brands"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-yellow-400 text-black" : "hover:bg-gray-800"
              }`
            }
          >
            Brands
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
