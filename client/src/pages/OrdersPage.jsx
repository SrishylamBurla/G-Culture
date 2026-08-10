import {
  useGetMyOrdersQuery,
  useCancelOrderMutation,
} from "../features/order/orderApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, Eye, XCircle, ShoppingBag } from "lucide-react";

export default function OrdersPage() {
  const { data: orders = [], isLoading } = useGetMyOrdersQuery();
  const [cancelOrder] = useCancelOrderMutation();

  if (isLoading) {
    return (
      <section className="w-full min-h-screen bg-[#050507] pt-28 md:pt-32 px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="bg-white/[0.03] border border-[#d4af37]/5 rounded-2xl p-6 animate-pulse"
            >
              <div className="flex justify-between mb-4">
                <div className="h-4 bg-white/[0.06] rounded-full w-32" />
                <div className="h-3 bg-white/[0.06] rounded-full w-24" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-white/[0.06] rounded-full w-20" />
                <div className="h-3 bg-white/[0.06] rounded-full w-28" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const activeOrders = orders.filter((o) => !o.isCancelled);

  return (
    <section className="w-full min-h-screen bg-[#050507] text-white pt-28 md:pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
            Account
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            My Orders
          </h1>
          {activeOrders.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {activeOrders.length}{" "}
              {activeOrders.length === 1 ? "order" : "orders"}
            </p>
          )}
        </div>

        {/* Empty State */}
        {activeOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-16 h-16 rounded-full border border-[#d4af37]/20 flex items-center justify-center mb-6">
              <ShoppingBag size={24} className="text-[#d4af37]/30" />
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              No orders yet
            </h3>
            <p className="text-sm text-gray-600 max-w-sm mb-6">
              Looks like you haven't placed any orders. Start shopping to see
              them here.
            </p>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/5 px-5 py-2.5 rounded-full transition-all duration-200"
            >
              Start Shopping
            </Link>
          </motion.div>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {activeOrders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.06,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-5 md:p-6 hover:border-[#d4af37]/20 transition-colors duration-200"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                    <Package size={16} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h2>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      ·{" "}
                      {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full flex-shrink-0 ${
                    order.isCancelled
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : order.isPaid
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20"
                  }`}
                >
                  {order.isCancelled
                    ? "Cancelled"
                    : order.isPaid
                    ? "Paid"
                    : "Pending"}
                </span>
              </div>

              {/* Order Details Row */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">
                    Total
                  </p>
                  <p className="font-semibold text-[#d4af37]">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">
                    Items
                  </p>
                  <p className="font-medium text-gray-300">
                    {order.orderItems.length}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">
                    Payment
                  </p>
                  <p className="font-medium text-gray-300">
                    {order.paymentMethod || "COD"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                <Link
                  to={`/order/${order._id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-black rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#c09b33] transition-colors duration-200"
                >
                  <Eye size={13} />
                  View Details
                </Link>

                {!order.isPaid && !order.isCancelled && (
                  <button
                    className="flex items-center gap-2 px-4 py-2 border border-red-500/20 text-red-400 rounded-full text-xs font-medium uppercase tracking-wider hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-200"
                    onClick={() => {
                      cancelOrder(order._id)
                        .unwrap()
                        .then(() => alert("Order cancelled successfully"))
                        .catch(() => alert("Failed to cancel order"));
                    }}
                  >
                    <XCircle size={13} />
                    Cancel
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
