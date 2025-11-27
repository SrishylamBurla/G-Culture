import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useGetFeaturedProductsQuery } from "../features/products/productApi";
import FeaturedProductsCard from "./FeaturedProductCard";

export default function FeaturedProducts() {
  const { data, isLoading, isError } = useGetFeaturedProductsQuery();

   const featuredProducts = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <section className="py-20 text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-14">
            Featured <span className="text-yellow-400">Products</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-white/10 animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || featuredProducts.length === 0) return null;

  return (
    <section className="py-20 bg-[#050507] text-white">
      <div className="w-full px-6">

        <h2 className="text-center text-4xl md:text-5xl font-bold mb-14">
          Featured <span className="text-yellow-400">Products</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-3">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/5 overflow-hidden border border-white/10 shadow-xl"
            >
              <FeaturedProductsCard product={product} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

