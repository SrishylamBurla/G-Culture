import {
  useGetMyOrdersQuery,
  useCancelOrderMutation,
} from "../features/order/orderApi";
import { motion } from "framer-motion";

export default function OrdersPage() {
  const { data: orders = [], isLoading } = useGetMyOrdersQuery();
  const [cancelOrder] = useCancelOrderMutation();

  if (isLoading) {
    return (
      <div className="pt-[5rem] md:pt-[7rem] px-4 h-screen text-gray-200 animate-pulse">
        {[1, 2, 3].map((s) => (
          <div key={s} className="bg-[#777a7d] p-4 rounded-xl mb-4 h-[120px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[#ebf0f4] min-h-screen pt-[5rem] md:pt-[7rem] px-2 md:px-4 py-4 text-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-black">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-800 text-center mt-20">No orders yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {orders.filter(o => !o.isCancelled).map((order) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#294a69] p-4 rounded-xl shadow-lg border border-white/10"
          >
            <div className="flex justify-between">
              <h2 className="font-semibold text-lg">
                Order #{order._id.slice(-6)}
              </h2>
              <span className="text-sm text-gray-400">
                {new Date(order.createdAt).toLocaleTimeString()}{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-3 space-y-1 text-sm">
              <p>Total: ₹{order.totalPrice}</p>
              <p>
                Status:
                {order.isCancelled ? (
                  <span className="text-red-400 ml-1">Cancelled</span>
                ) : order.isPaid ? (
                  <span className="text-green-400 ml-1">Paid</span>
                ) : (
                  <span className="text-yellow-400 ml-1">Pending</span>
                )}
              </p>
              <p>Items: {order.orderItems.length}</p>
            </div>

            <div className="flex justify-between mt-4">
              <a
                href={`/order/${order._id}`}
                className="px-4 py-2 bg-[#159181] rounded-lg text-sm"
              >
                View Details
              </a>

              {!order.isPaid && !order.isCancelled && (
                <button
                  className="px-4 py-2 bg-red-500 rounded-lg text-sm"
                  onClick={() => {
                    console.log("CANCEL CLICKED", order._id);

                    cancelOrder(order._id)
                      .unwrap()
                      .then(() => {
                        alert("Order cancelled successfully");
                      })
                      .catch((err) => {
                        console.log("CANCEL ERROR:", err);
                        alert("Failed to cancel order");
                      });
                  }}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}