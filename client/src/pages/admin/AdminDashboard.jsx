export default function AdminDashboard() {
  return <h1 className="text-2xl font-bold">Dashboard</h1>;
}



// import { useGetAllOrdersQuery } from "../../features/order/orderApi";
// import { useGetAllProductsQuery } from "../../features/products/productApi";
// import { useGetUsersQuery } from "../../features/user/userApi";

// export default function AdminDashboard() {
//   // Fetch data  
//   const { data: orders = [] } = useGetAllOrdersQuery();
//   const { data: products = [] } = useGetAllProductsQuery();
//   const { data: users = [] } = useGetUsersQuery();

//   // Calculate revenue  
//   const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

//   const stats = [
//     { title: "Total Orders", value: orders.length, color: "bg-blue-600" },
//     { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: "bg-green-600" },
//     { title: "Total Users", value: users.length, color: "bg-purple-600" },
//     { title: "Total Products", value: products.length, color: "bg-orange-600" },
//   ];

//   return (
//     <div className="space-y-6">

//       {/* ------ SUMMARY CARDS ------ */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className={`p-5 text-white rounded-xl shadow-lg ${stat.color}`}
//           >
//             <p className="text-sm opacity-80">{stat.title}</p>
//             <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
//           </div>
//         ))}
//       </div>

//       {/* ------ RECENT ORDERS TABLE ------ */}
//       <div className="bg-white p-5 rounded-xl shadow">
//         <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="p-3 font-semibold">Order ID</th>
//                 <th className="p-3 font-semibold">User</th>
//                 <th className="p-3 font-semibold">Amount</th>
//                 <th className="p-3 font-semibold">Status</th>
//                 <th className="p-3 font-semibold">Date</th>
//               </tr>
//             </thead>

//             <tbody>
//               {orders.slice(0, 8).map((order) => (
//                 <tr
//                   key={order._id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="p-3">#{order._id.slice(-6)}</td>
//                   <td className="p-3">{order.user?.name || "N/A"}</td>
//                   <td className="p-3">₹{order.totalPrice}</td>

//                   <td className="p-3">
//                     {order.isCancelled ? (
//                       <span className="text-red-500 font-medium">Cancelled</span>
//                     ) : order.isPaid ? (
//                       <span className="text-green-600 font-medium">Paid</span>
//                     ) : (
//                       <span className="text-yellow-600 font-medium">Pending</span>
//                     )}
//                   </td>

//                   <td className="p-3">
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {orders.length === 0 && (
//             <p className="text-gray-500 text-center py-6">No recent orders.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
