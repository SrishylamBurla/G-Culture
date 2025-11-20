import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center text-gray-200">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        {/* <img
          src="/images/success.png"
          className="w-32 mx-auto mb-4 drop-shadow-lg"
        /> */}

        <h1 className="text-3xl font-bold text-black">Order Placed!</h1>
        <p className="text-gray-800 mt-2">Thank you for shopping with us.</p>

        <Link
          to="/orders"
          className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-md 
                     font-semibold hover:scale-105 transition-all duration-300"
        >
          View My Orders
        </Link>
      </motion.div>
    </div>
  );
}
