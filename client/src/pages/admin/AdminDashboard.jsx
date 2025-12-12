import {
  useGetAllOrdersQuery,
  useGetRecentOrdersQuery,
} from "../../features/order/orderApi";
import { useGetUsersQuery } from "../../features/user/userApi";
import { useGetAllProductsQuery } from "../../features/products/productApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const { data: orders = [] } = useGetAllOrdersQuery();
  const { data: recentOrders = [] } = useGetRecentOrdersQuery();
  const { data: users = [] } = useGetUsersQuery();
  const { data: products = [] } = useGetAllProductsQuery();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  const deliveredCount = orders.filter((o) => o.isDelivered).length;
  const cancelledCount = orders.filter((o) => o.isCancelled).length;
  const pendingCount = orders.filter(
    (o) => !o.isDelivered && !o.isCancelled
  ).length;

  const adminUsers = users.filter((u) => u.isAdmin).length;
  const normalUsers = users.filter((u) => !u.isAdmin).length;

  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const todayRevenue = orders
    .filter((o) => new Date(o.createdAt).toDateString() === new Date().toDateString())
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const monthRevenue = orders
    .filter((o) => new Date(o.createdAt).getMonth() === new Date().getMonth())
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const chartData =
    orders.slice(-7).map((o) => ({
      date: new Date(o.createdAt).toLocaleDateString(),
      total: o.totalPrice,
    })) || [];

  return (
    <div className="space-y-3 p-2 text-white">

      <h1 className="text-xl font-bold mb-2 text-black">Dashboard</h1>

      {/* Enhanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">

        {/* USERS */}
        <div className="p-2 rounded-sm shadow bg-gradient-to-br from-blue-600 to-blue-800">
          <h3 className="text-md opacity-90">Users</h3>
          <p className="text-3xl font-bold">{users.length}</p>

          <div className="mt-3 space-y-1 text-sm">
            <p><span className="text-purple-300 font-semibold">Admins: </span>{adminUsers}</p>
            <p><span className="text-blue-200 font-semibold">Users: </span>{normalUsers}</p>
          </div>
        </div>

        {/* ORDERS */}
        <div className="p-2 rounded-sm shadow bg-gradient-to-br from-green-600 to-green-800">
          <h3 className="text-md opacity-90">Orders</h3>
          <p className="text-3xl font-bold">{orders.length}</p>

          <div className="mt-3 space-y-1 text-sm">
            <p><span className="text-green-200">Delivered:</span> {deliveredCount}</p>
            <p><span className="text-yellow-300">Pending:</span> {pendingCount}</p>
            <p><span className="text-red-300">Cancelled:</span> {cancelledCount}</p>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="p-2 rounded-sm shadow bg-gradient-to-br from-purple-600 to-purple-800">
          <h3 className="text-md opacity-90">Products</h3>
          <p className="text-3xl font-bold">{products.length}</p>

          <div className="mt-3 text-sm space-y-1">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <p key={cat}>
                <span className="text-pink-200 capitalize">{cat}:</span> {count}
              </p>
            ))}
          </div>
        </div>

        {/* REVENUE */}
        <div className="p-2 rounded-sm shadow bg-gradient-to-br from-orange-500 to-orange-700">
          <h3 className="text-md opacity-90">Revenue</h3>
          <p className="text-3xl font-bold">
            ₹ {totalRevenue.toLocaleString("en-IN")}
          </p>

          <div className="mt-3 text-sm space-y-1">
            <p><span className="text-yellow-200">Today:</span> ₹{todayRevenue}</p>
            <p><span className="text-green-200">This Month:</span> ₹{monthRevenue}</p>
          </div>
        </div>

      </div>

      {/* Chart */}
      <div className="bg-white text-gray-800 shadow rounded-sm p-2">
        <h2 className="text-xl font-semibold mb-4 text-center">Sales Overview</h2>
        <div className="h-64 text-sm">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" stroke="#444" />
              <YAxis stroke="#444" />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white text-gray-800 shadow rounded-sm p-2">
        <h2 className="text-xl font-semibold mb-4 text-center">Recent Orders</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">Order ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.slice(0, 5).map((o) => (
              <tr key={o._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-2">#{o._id.slice(-6)}</td>
                <td className="p-2">{o.user?.name || "Unknown"}</td>
                <td className="p-2">₹{o.totalPrice}</td>
                <td className="p-2">
                  {o.isCancelled ? (
                    <span className="text-red-600 font-medium">Cancelled</span>
                  ) : o.isDelivered ? (
                    <span className="text-green-600 font-medium">Delivered</span>
                  ) : o.isPaid ? (
                    <span className="text-blue-600 font-medium">Paid</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  )}
                </td>
                <td className="p-2">{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
