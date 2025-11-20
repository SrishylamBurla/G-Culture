import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderByIdQuery } from "../features/order/orderApi";
import { motion } from "framer-motion";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading } = useGetOrderByIdQuery(id);

  if (isLoading || !order) {
    return (
      <div className="pt-[5rem] md:pt-[7rem] px-4 h-screen text-gray-200 animate-pulse">
        <div className="bg-[#9a9da1] p-4 rounded-xl h-[200px]" />
      </div>
    );
  }

  return (
    <div className="bg-[#a8a8a8] min-h-screen pt-[5.8rem] md:pt-[7rem] px-2 md:px-4 text-gray-200">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate("/orders")}
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 
                   bg-[#0A2239] hover:bg-[#0F2D4F] 
                   text-gray-200 border border-white/10 rounded-lg
                   transition-all duration-300 hover:scale-105"
      >
        <span className="text-xl">←</span> Back to Orders
      </button>

      <h1 className="text-2xl font-bold mb-6 text-black">Order Details</h1>

      <motion.div
        className="bg-[#0A2239] p-4 rounded-xl border border-white/10 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold">
          Order #{order._id.slice(-6)}
        </h2>

        <div>
          <h3 className="font-semibold">Shipping Address</h3>
          <p>{order.shippingAddress.address}</p>
          {order.shippingAddress.city && (
            <p>{order.shippingAddress.city}</p>
          )}
        </div>

        <div>
          <h3 className="font-semibold">Payment</h3>
          <p>{order.isPaid ? "Paid" : "Not Paid"}</p>
        </div>

        <div>
          <h3 className="font-semibold">Items</h3>
          {order.orderItems.map((item) => (
            <div key={item._id} className="flex items-center gap-3 mt-2">
              <img
                src={item.image}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p>{item.name}</p>
                <p>
                  Qty: {item.qty} × ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="font-semibold">Total</h3>
          <p className="text-lg font-bold">₹{order.totalPrice}</p>
        </div>
      </motion.div>
    </div>
  );
}
