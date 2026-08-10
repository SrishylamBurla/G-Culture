import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <section className="w-full min-h-screen bg-[#050507] flex items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md w-full"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-24 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle size={40} className="text-[#d4af37]" strokeWidth={1.5} />
        </motion.div>

        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3"
        >
          Order Confirmed
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-3xl md:text-4xl font-bold text-white tracking-tight"
        >
          Thank You!
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-sm text-gray-500 mt-3 leading-relaxed"
        >
          Your order has been placed successfully. We'll have it on its way to
          you soon.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="w-16 h-px bg-[#d4af37]/20 mx-auto my-8"
        />

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/orders"
            className="flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-black rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#c09b33] hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all duration-300"
          >
            <Package size={16} />
            View My Orders
          </Link>

          <Link
            to="/shop"
            className="flex items-center gap-2 px-6 py-3 border border-[#d4af37]/20 text-[#d4af37]/70 rounded-full text-sm font-medium uppercase tracking-wider hover:text-[#d4af37] hover:border-[#d4af37]/50 hover:bg-[#d4af37]/5 transition-all duration-200"
          >
            Continue Shopping
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
