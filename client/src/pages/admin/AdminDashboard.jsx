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
  CartesianGrid,
} from "recharts";

import {
  Users,
  ShoppingBag,
  Package,
  IndianRupee,
  TrendingUp,
  Clock3,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: orders = [], isLoading: ordersLoading } =
    useGetAllOrdersQuery();

  const { data: recentOrders = [], isLoading: recentLoading } =
    useGetRecentOrdersQuery();

  const { data: users = [], isLoading: usersLoading } =
    useGetUsersQuery();

  const { data: products = [], isLoading: productsLoading } =
    useGetAllProductsQuery();

  /* =========================================================
     CALCULATIONS
  ========================================================= */

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.totalPrice || 0),
    0
  );

  const deliveredCount = orders.filter(
    (order) => order.isDelivered
  ).length;

  const cancelledCount = orders.filter(
    (order) => order.isCancelled
  ).length;

  const pendingCount = orders.filter(
    (order) => !order.isDelivered && !order.isCancelled
  ).length;

  const paidCount = orders.filter(
    (order) => order.isPaid
  ).length;

  const adminUsers = users.filter(
    (user) => user.isAdmin
  ).length;

  const normalUsers = users.filter(
    (user) => !user.isAdmin
  ).length;

  const categoryCounts = products.reduce((acc, product) => {
    const category = product.category || "Other";

    acc[category] = (acc[category] || 0) + 1;

    return acc;
  }, {});

  const now = new Date();

  const todayRevenue = orders
    .filter((order) => {
      const date = new Date(order.createdAt);

      return (
        date.toDateString() === now.toDateString()
      );
    })
    .reduce(
      (sum, order) =>
        sum + Number(order.totalPrice || 0),
      0
    );

  const monthRevenue = orders
    .filter((order) => {
      const date = new Date(order.createdAt);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce(
      (sum, order) =>
        sum + Number(order.totalPrice || 0),
      0
    );

  /* =========================================================
     SALES CHART
  ========================================================= */

  const chartData = [...orders]
    .sort(
      (a, b) =>
        new Date(a.createdAt) -
        new Date(b.createdAt)
    )
    .slice(-7)
    .map((order) => ({
      date: new Date(
        order.createdAt
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      total: Number(order.totalPrice || 0),
    }));

  const isLoading =
    ordersLoading ||
    recentLoading ||
    usersLoading ||
    productsLoading;

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f7f8] p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1600px] space-y-6">

          <div className="space-y-2">
            <div className="h-7 w-40 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-4 w-64 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>

          <div className="h-[380px] animate-pulse rounded-2xl bg-white shadow-sm" />

          <div className="h-[350px] animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#111114]">

      <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
              G-Culture Admin
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Overview of your store performance and activity.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-500 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Store operational
          </div>
        </div>

        {/* =====================================================
            PRIMARY METRICS
        ====================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <DashboardCard
            title="Total Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
            subtitle={`₹${monthRevenue.toLocaleString(
              "en-IN"
            )} this month`}
            icon={IndianRupee}
            trend="Revenue"
          />

          <DashboardCard
            title="Total Orders"
            value={orders.length}
            subtitle={`${paidCount} paid orders`}
            icon={ShoppingBag}
            trend="Orders"
          />

          <DashboardCard
            title="Customers"
            value={users.length}
            subtitle={`${adminUsers} admin accounts`}
            icon={Users}
            trend="Users"
          />

          <DashboardCard
            title="Products"
            value={products.length}
            subtitle={`${Object.keys(categoryCounts).length} categories`}
            icon={Package}
            trend="Catalog"
          />

        </div>

        {/* =====================================================
            SECONDARY STATS
        ====================================================== */}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

          <MiniStat
            icon={CheckCircle2}
            label="Delivered"
            value={deliveredCount}
            iconClass="text-emerald-600"
            bgClass="bg-emerald-50"
          />

          <MiniStat
            icon={Clock3}
            label="Pending"
            value={pendingCount}
            iconClass="text-amber-600"
            bgClass="bg-amber-50"
          />

          <MiniStat
            icon={XCircle}
            label="Cancelled"
            value={cancelledCount}
            iconClass="text-red-600"
            bgClass="bg-red-50"
          />

          <MiniStat
            icon={ShieldCheck}
            label="Admins"
            value={adminUsers}
            iconClass="text-violet-600"
            bgClass="bg-violet-50"
          />

        </div>

        {/* =====================================================
            CHART + REVENUE SUMMARY
        ====================================================== */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">

          {/* SALES CHART */}

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Sales Overview
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Recent order revenue performance
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <TrendingUp
                  size={14}
                  className="text-emerald-500"
                />
                Last 7 orders
              </div>
            </div>

            <div className="h-[320px] p-4 sm:h-[360px]">

              {chartData.length > 0 ? (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -15,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      stroke="#f0f0f0"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#9ca3af",
                        fontSize: 11,
                      }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#9ca3af",
                        fontSize: 11,
                      }}
                      tickFormatter={(value) =>
                        `₹${value}`
                      }
                    />

                    <Tooltip
                      cursor={{
                        stroke: "#e5e7eb",
                        strokeWidth: 1,
                      }}
                      contentStyle={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        background: "#fff",
                        boxShadow:
                          "0 10px 30px rgba(0,0,0,0.08)",
                        fontSize: "12px",
                      }}
                      formatter={(value) => [
                        `₹${Number(
                          value
                        ).toLocaleString("en-IN")}`,
                        "Revenue",
                      ]}
                    />

                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#111827"
                      strokeWidth={2.5}
                      dot={{
                        r: 3,
                        fill: "#111827",
                        strokeWidth: 0,
                      }}
                      activeDot={{
                        r: 5,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No sales data available
                </div>
              )}

            </div>
          </section>

          {/* REVENUE SUMMARY */}

          <section className="rounded-2xl border border-gray-200 bg-[#111114] p-5 text-white shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Revenue
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  ₹{totalRevenue.toLocaleString(
                    "en-IN"
                  )}
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.07]">
                <TrendingUp
                  size={18}
                  className="text-[#d4af37]"
                />
              </div>

            </div>

            <div className="mt-8 space-y-5">

              <RevenueRow
                label="Today"
                value={`₹${todayRevenue.toLocaleString(
                  "en-IN"
                )}`}
              />

              <RevenueRow
                label="This Month"
                value={`₹${monthRevenue.toLocaleString(
                  "en-IN"
                )}`}
              />

              <RevenueRow
                label="All Time"
                value={`₹${totalRevenue.toLocaleString(
                  "en-IN"
                )}`}
              />

            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-5">

              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">
                  Total customers
                </span>

                <span className="text-sm font-medium">
                  {users.length}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-white/40">
                  Active products
                </span>

                <span className="text-sm font-medium">
                  {products.length}
                </span>
              </div>

            </div>

          </section>

        </div>

        {/* =====================================================
            CATALOG + USER SUMMARY
        ====================================================== */}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* PRODUCT CATEGORIES */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Product Categories
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Current catalog distribution
                </p>
              </div>

              <Package
                size={18}
                className="text-gray-300"
              />
            </div>

            <div className="p-5">

              {Object.entries(categoryCounts).length >
              0 ? (
                <div className="space-y-4">
                  {Object.entries(categoryCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([category, count]) => {

                      const percentage =
                        products.length > 0
                          ? Math.round(
                              (count /
                                products.length) *
                                100
                            )
                          : 0;

                      return (
                        <div key={category}>

                          <div className="mb-2 flex items-center justify-between">

                            <span className="text-sm font-medium capitalize text-gray-700">
                              {category}
                            </span>

                            <span className="text-xs text-gray-400">
                              {count} products
                            </span>

                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">

                            <div
                              className="h-full rounded-full bg-gray-900 transition-all"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />

                          </div>

                        </div>
                      );
                    })}
                </div>
              ) : (
                <p className="py-8 text-center text-sm text-gray-400">
                  No products available
                </p>
              )}

            </div>
          </section>

          {/* USER SUMMARY */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Customer Overview
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Account distribution
                </p>
              </div>

              <Users
                size={18}
                className="text-gray-300"
              />

            </div>

            <div className="p-5">

              <div className="flex items-center gap-6">

                <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-[12px] border-gray-100">

                  <div className="text-center">
                    <p className="text-xl font-semibold text-gray-900">
                      {users.length}
                    </p>

                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                      Accounts
                    </p>
                  </div>

                </div>

                <div className="min-w-0 flex-1 space-y-4">

                  <UserBreakdown
                    label="Customers"
                    value={normalUsers}
                    total={users.length}
                    dot="bg-blue-500"
                  />

                  <UserBreakdown
                    label="Administrators"
                    value={adminUsers}
                    total={users.length}
                    dot="bg-violet-500"
                  />

                </div>

              </div>

            </div>
          </section>

        </div>

        {/* =====================================================
            RECENT ORDERS
        ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Recent Orders
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Latest customer transactions
              </p>
            </div>

            <MoreHorizontal
              size={18}
              className="text-gray-300"
            />

          </div>

          {/* DESKTOP TABLE */}

          <div className="hidden overflow-x-auto md:block">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">

                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Order
                  </th>

                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Customer
                  </th>

                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Total
                  </th>

                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Date
                  </th>

                </tr>
              </thead>

              <tbody>

                {recentOrders
                  .slice(0, 7)
                  .map((order) => (
                    <OrderRow
                      key={order._id}
                      order={order}
                    />
                  ))}

              </tbody>

            </table>

          </div>

          {/* MOBILE ORDERS */}

          <div className="divide-y divide-gray-100 md:hidden">

            {recentOrders
              .slice(0, 7)
              .map((order) => (
                <MobileOrder
                  key={order._id}
                  order={order}
                />
              ))}

          </div>

          {recentOrders.length === 0 && (
            <div className="px-5 py-12 text-center text-sm text-gray-400">
              No recent orders found.
            </div>
          )}

        </section>

      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD CARD
========================================================= */

function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
          <Icon
            size={18}
            strokeWidth={1.7}
            className="text-gray-700"
          />
        </div>

        <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-gray-300">
          {trend}
          <ArrowUpRight size={12} />
        </div>

      </div>

      <p className="mt-5 text-xs font-medium text-gray-400">
        {title}
      </p>

      <p className="mt-1 truncate text-2xl font-semibold tracking-tight text-gray-900">
        {value}
      </p>

      <p className="mt-2 text-[11px] text-gray-400">
        {subtitle}
      </p>

    </div>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  icon: Icon,
  label,
  value,
  iconClass,
  bgClass,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm">

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bgClass}`}
      >
        <Icon
          size={16}
          className={iconClass}
        />
      </div>

      <div className="min-w-0">
        <p className="truncate text-[11px] text-gray-400">
          {label}
        </p>

        <p className="mt-0.5 text-base font-semibold text-gray-900">
          {value}
        </p>
      </div>

    </div>
  );
}

/* =========================================================
   REVENUE ROW
========================================================= */

function RevenueRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-xs text-white/40">
        {label}
      </span>

      <span className="text-sm font-medium text-white">
        {value}
      </span>

    </div>
  );
}

/* =========================================================
   USER BREAKDOWN
========================================================= */

function UserBreakdown({
  label,
  value,
  total,
  dot,
}) {
  const percentage =
    total > 0
      ? Math.round((value / total) * 100)
      : 0;

  return (
    <div>

      <div className="mb-1.5 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <span
            className={`h-2 w-2 rounded-full ${dot}`}
          />

          <span className="text-xs text-gray-500">
            {label}
          </span>

        </div>

        <span className="text-xs font-medium text-gray-700">
          {value}
        </span>

      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">

        <div
          className={`h-full rounded-full ${dot}`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

/* =========================================================
   ORDER ROW
========================================================= */

function OrderRow({ order }) {
  return (
    <tr className="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50/70">

      <td className="px-5 py-4">

        <span className="font-mono text-xs font-medium text-gray-700">
          #{order._id?.slice(-7)}
        </span>

      </td>

      <td className="px-5 py-4">

        <div>
          <p className="text-sm font-medium text-gray-800">
            {order.user?.name || "Unknown"}
          </p>

          {order.user?.email && (
            <p className="mt-0.5 text-[10px] text-gray-400">
              {order.user.email}
            </p>
          )}
        </div>

      </td>

      <td className="px-5 py-4">

        <span className="text-sm font-semibold text-gray-800">
          ₹
          {Number(
            order.totalPrice || 0
          ).toLocaleString("en-IN")}
        </span>

      </td>

      <td className="px-5 py-4">
        <OrderStatus order={order} />
      </td>

      <td className="px-5 py-4">

        <span className="text-xs text-gray-400">
          {new Date(
            order.createdAt
          ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>

      </td>

    </tr>
  );
}

/* =========================================================
   MOBILE ORDER
========================================================= */

function MobileOrder({ order }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">

      <div className="min-w-0">

        <p className="font-mono text-xs font-medium text-gray-700">
          #{order._id?.slice(-7)}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-gray-800">
          {order.user?.name || "Unknown"}
        </p>

        <p className="mt-1 text-[10px] text-gray-400">
          {new Date(
            order.createdAt
          ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

      </div>

      <div className="shrink-0 text-right">

        <p className="text-sm font-semibold text-gray-800">
          ₹
          {Number(
            order.totalPrice || 0
          ).toLocaleString("en-IN")}
        </p>

        <div className="mt-1">
          <OrderStatus order={order} />
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   ORDER STATUS
========================================================= */

function OrderStatus({ order }) {
  if (order.isCancelled) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-600">
        <XCircle size={11} />
        Cancelled
      </span>
    );
  }

  if (order.isDelivered) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
        <CheckCircle2 size={11} />
        Delivered
      </span>
    );
  }

  if (order.isPaid) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-600">
        <CheckCircle2 size={11} />
        Paid
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-600">
      <Clock3 size={11} />
      Pending
    </span>
  );
}