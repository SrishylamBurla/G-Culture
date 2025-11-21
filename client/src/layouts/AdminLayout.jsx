// src/layouts/AdminLayout.jsx
import AdminSidebar from "../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="pt-[4.5rem] md:pt-[5.8rem]">
    {/* Top Header */}
        {/* <header className="h-14 shadow flex items-center justify-center px-4 bg-gray-900">
          <h1 className="font-semibold text-lg text-white">G-Culture Admin Panel</h1>
        </header> */}
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        

        {/* Page Body */}
        <main className="">
          <Outlet />
        </main>
      </div>
    </div></div>
  );
}


// import { Link, Outlet, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function AdminLayout() {
//   const { userInfo } = useSelector((state) => state.user);

//   // 🛑 NOT ADMIN → block access
//   if (!userInfo || !userInfo.isAdmin) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100 pt-[4.5rem] md:pt-[5.8rem]">

//       {/* ---------- SIDEBAR ---------- */}
//       <aside className="w-64 bg-[#0a192f] text-gray-200 p-5 space-y-6 shadow-lg">
//         <h2 className="text-xl font-bold mb-6 border-b border-gray-600 pb-3">
//           Admin Panel
//         </h2>

//         <nav className="space-y-4 text-sm">
//           <Link className="block hover:text-white" to="/admin/dashboard">
//             📊 Dashboard
//           </Link>

//           <Link className="block hover:text-white" to="/admin/products">
//             🛍️ Products
//           </Link>

//           <Link className="block hover:text-white" to="/admin/orders">
//             📦 Orders
//           </Link>

//           <Link className="block hover:text-white" to="/admin/users">
//             👤 Users
//           </Link>
//         </nav>
//       </aside>

//       {/* ---------- MAIN CONTENT ---------- */}
//       <main className="flex-1 p-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// }
