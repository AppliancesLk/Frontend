import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${
      isActive ? "bg-yellow-400 text-black" : "hover:bg-yellow-400"
    }`;

  return (
    <aside className="w-64 bg-black text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-2">
        <NavLink to="/admin" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/admin/categories" className={linkClass}>
          Categories
        </NavLink>
        <NavLink to="/admin/attributes" className={linkClass}>
          Attributes
        </NavLink>
        <NavLink to="/admin/variants" className={linkClass}>
          Variants
        </NavLink>
      </nav>
    </aside>
  );
}
