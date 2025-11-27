import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useGetFeaturedProductsQuery } from "../features/products/productApi";

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
      <div className="max-w-[1400px] mx-auto px-6">

        <h2 className="text-center text-4xl md:text-5xl font-bold mb-14">
          Featured <span className="text-yellow-400">Products</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 shadow-xl"
            >
              <button className="absolute top-4 right-4 bg-black/40 p-2 rounded-full hover:bg-black/70 transition">
                <Heart size={20} className="text-white" />
              </button>

              <div className="h-60 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold">{product.name}</h3>

                <div className="flex items-center text-yellow-400 mt-1">
                  <Star size={18} className="fill-yellow-400" />
                  <span className="ml-1 text-sm text-gray-300">
                    {product.rating}
                  </span>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xl font-bold">₹{product.price}</span>

                  <button className="bg-white text-black px-3 py-1 rounded-md flex items-center gap-2 hover:bg-yellow-400 transition">
                    <ShoppingBag size={18} />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <Link
                to={`/product/${product._id}`}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-black/40 text-white text-lg font-semibold transition"
              >
                View Product
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
