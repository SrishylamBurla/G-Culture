// src/components/admin/AdminSidebar.jsx
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
  ];

  return (
    <aside className="w-60 bg-[#0a192f] text-white min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6">G-Culture Admin</h2>

      <nav className="space-y-3">
        {menu.map((m) => (
          <Link
            key={m.path}
            to={m.path}
            className={`block px-4 py-2 rounded-md transition ${
              pathname === m.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {m.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
