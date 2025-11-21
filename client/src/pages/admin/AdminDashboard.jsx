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

  const chartData =
    orders.slice(-7).map((o) => ({
      date: new Date(o.createdAt).toLocaleDateString(),
      total: o.totalPrice,
    })) || [];

  return (
    <div className="space-y-6 text-gray-800 p-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Users" value={users.length} color="bg-blue-600" />
        <StatCard title="Orders" value={orders.length} color="bg-green-600" />
        <StatCard title="Products" value={products.length} color="bg-purple-600" />
        <StatCard
          title="Revenue"
          value={`₹ ${totalRevenue.toLocaleString("en-IN")}`}
          color="bg-orange-600"
        />
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" stroke="#444" />
            <YAxis stroke="#444" />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Recent Orders</h2>

        <table className="w-full text-left text-gray-800">
          <thead>
            <tr className="border-b text-gray-900 bg-gray-100">
              <th className="p-2 font-semibold">Order ID</th>
              <th className="p-2 font-semibold">User</th>
              <th className="p-2 font-semibold">Total</th>
              <th className="p-2 font-semibold">Status</th>
              <th className="p-2 font-semibold">Date</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.slice(0, 5).map((o) => (
              <tr key={o._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-2 text-gray-700">#{o._id.slice(-6)}</td>
                <td className="p-2 text-gray-700">{o.user?.name || "Unknown"}</td>
                <td className="p-2 text-gray-700">₹{o.totalPrice}</td>
                <td className="p-2">
                  {o.isPaid ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>
                <td className="p-2 text-gray-700">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {recentOrders.length === 0 && (
          <p className="text-gray-500 text-center py-4">No recent orders.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`${color} text-white p-4 rounded-lg shadow`}>
      <h3 className="text-sm opacity-90">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
