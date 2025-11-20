// src/layouts/AdminLayout.jsx
import AdminSidebar from "../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-14 bg-white shadow flex items-center justify-between px-4">
          <h1 className="font-semibold text-lg">Admin Panel</h1>
        </header>

        {/* Page Body */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
