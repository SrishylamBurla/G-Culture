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
    <aside className="w-40 bg-[#0b3a52] text-white min-h-screen">
      {/* <h2 className="text-xl font-bold mb-4 px-3 pt-3">G-Culture Admin</h2>
      <hr className="border border-gray-500" /> */}

      <nav className="space-y-1 px-2 pt-2">
        {menu.map((m) => (
          <Link
            key={m.path}
            to={m.path}
            className={`text-sm block px-2 py-1 rounded-sm transition ${
              pathname === m.path
                ? "bg-gray-800"
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

