import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import ShopProductFilters from "../components/filters/ShopProductFilters";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    price: 4000,
    size: "",
    color: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🌈 Container for cascading stagger animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  // 💫 Clean, cinematic fade-in animation
  const fadeCard = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.97,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // 🧮 Filtering logic
  const filteredProducts = items.filter((p) => {
    return (
      (!filters.category || p.category === filters.category) &&
      (!filters.subcategory || p.subcategory === filters.subcategory) &&
      (!filters.size || p.sizes.includes(filters.size)) &&
      (!filters.color || p.colors.includes(filters.color)) &&
      p.offerPrice <= filters.price
    );
  });

  return (
    <div className="flex min-h-screen bg-[#001424] bg-[url('https://www.transparenttextures.com/patterns/skulls.png')] bg-top bg-repeat pt-[5rem] -mt-[5rem]">
      
      <ShopProductFilters filters={filters} setFilters={setFilters} />

      <motion.div
        className="flex-1 px-2 md:px-3 lg:px-4 py-6 overflow-y-scroll scrollbar-hover sm:scrollbar-hide h-[calc(100vh-64px)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="pt-4 pb-8"
          style={{
            animation: "fadeInLeft 1s ease-out forwards",
          }}
        >
          <h1 className="inline text-4xl shop-quote bg-clip-text text-transparent bg-gradient-to-r from-[#907b02] via-[#bfa9c8] to-[#b27006]">
            For the Men
            <br />
            Who Build, Break and Begin Again...
          </h1>

          <style>{`
    @keyframes fadeInLeft {
      0% {
        opacity: 0;
        transform: translateX(-40px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `}</style>
        </div>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="col-span-full text-center text-gray-400 py-20 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              Loading products...
            </motion.div>
          ) : filteredProducts.length > 0 ? (
            <motion.div
              key="grid"
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4 pt-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  variants={fadeCard}
                  className="transition-transform duration-700 will-change-transform"
                  whileHover={{
                    scale: 1.02,
                    transition: {
                      type: "spring",
                      stiffness: 120,
                      damping: 12,
                    },
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="col-span-full text-center text-gray-400 py-20 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              No products found.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
