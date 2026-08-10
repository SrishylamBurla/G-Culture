import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderByIdQuery } from "../features/order/orderApi";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading } = useGetOrderByIdQuery(id);

  if (isLoading || !order) {
    return (
      <section className="w-full min-h-screen bg-[#050507] pt-28 md:pt-32 px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="h-4 bg-white/[0.06] rounded-full w-24 animate-pulse" />
          <div className="bg-white/[0.03] border border-[#d4af37]/5 rounded-2xl p-6 animate-pulse">
            <div className="h-5 bg-white/[0.06] rounded-full w-40 mb-6" />
            <div className="space-y-3">
              <div className="h-3 bg-white/[0.06] rounded-full w-3/4" />
              <div className="h-3 bg-white/[0.06] rounded-full w-1/2" />
              <div className="h-3 bg-white/[0.06] rounded-full w-2/3" />
            </div>
          </div>
          <div className="bg-white/[0.03] border border-[#d4af37]/5 rounded-2xl p-6 h-48 animate-pulse" />
        </div>
      </section>
    );
  }

  const statusConfig = order.isCancelled
    ? {
        icon: XCircle,
        label: "Cancelled",
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
      }
    : order.isDelivered
    ? {
        icon: CheckCircle,
        label: "Delivered",
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
      }
    : order.isPaid
    ? {
        icon: Truck,
        label: "Paid — In Transit",
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
      }
    : {
        icon: Clock,
        label: "Pending",
        color: "text-[#d4af37]",
        bg: "bg-[#d4af37]/10",
        border: "border-[#d4af37]/20",
      };

  const StatusIcon = statusConfig.icon;

  return (
    <section className="w-full min-h-screen bg-[#050507] text-white pt-28 md:pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 hover:text-[#d4af37] transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform duration-200"
          />
          Back to Orders
        </button>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
              Order Details
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              #{order._id.slice(-6).toUpperCase()}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              at{" "}
              {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Status Badge */}
          <span
            className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider px-4 py-2 rounded-full self-start sm:self-auto ${statusConfig.bg} ${statusConfig.color} border ${statusConfig.border}`}
          >
            <StatusIcon size={13} />
            {statusConfig.label}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 space-y-6">
            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Package size={16} className="text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    Items Ordered
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {order.orderItems.length}{" "}
                    {order.orderItems.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {order.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/[0.04] flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {[
                          item.selectedSize && `Size: ${item.selectedSize}`,
                          item.selectedColor && `Color: ${item.selectedColor}`,
                          `Qty: ${item.qty}`,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-[#d4af37] flex-shrink-0">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <MapPin size={16} className="text-[#d4af37]" />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Shipping Address
                </h3>
              </div>

              <div className="pl-12 text-sm text-gray-400 space-y-1">
                <p>{order.shippingAddress.address}</p>
                {order.shippingAddress.city && (
                  <p>{order.shippingAddress.city}</p>
                )}
                {order.shippingAddress.postalCode && (
                  <p>{order.shippingAddress.postalCode}</p>
                )}
                {order.shippingAddress.country && (
                  <p>{order.shippingAddress.country}</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Summary */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="sticky top-32 bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-6 space-y-5"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>
                    ₹{(order.itemsPrice || order.totalPrice).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span
                    className={
                      order.shippingPrice
                        ? "text-gray-400"
                        : "text-green-400 text-xs font-medium"
                    }
                  >
                    {order.shippingPrice
                      ? `₹${order.shippingPrice}`
                      : "FREE"}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>₹{order.taxPrice || 0}</span>
                </div>

                <div className="border-t border-[#d4af37]/10 pt-3 flex justify-between">
                  <span className="font-semibold text-white">Total</span>
                  <span className="text-lg font-bold text-[#d4af37]">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="border-t border-white/5 pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                    <CreditCard size={14} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-600">
                      Payment Method
                    </p>
                    <p className="text-sm font-medium text-gray-300 mt-0.5">
                      {order.paymentMethod || "Cash on Delivery"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div className="border-t border-white/5 pt-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      order.isPaid ? "bg-green-500/10" : "bg-[#d4af37]/10"
                    }`}
                  >
                    {order.isPaid ? (
                      <CheckCircle size={14} className="text-green-400" />
                    ) : (
                      <Clock size={14} className="text-[#d4af37]" />
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-600">
                      Payment Status
                    </p>
                    <p
                      className={`text-sm font-medium mt-0.5 ${
                        order.isPaid ? "text-green-400" : "text-[#d4af37]"
                      }`}
                    >
                      {order.isPaid
                        ? `Paid on ${new Date(order.paidAt).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}`
                        : "Awaiting Payment"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
