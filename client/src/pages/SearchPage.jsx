

import { useSearchParams } from "react-router-dom";
import API from "../api/axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("query") || params.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Grid animation (same as ShopPage)
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  useEffect(() => {
    const q = params.get("query") || params.get("q") || "";
    if (!q) return;

    setLoading(true);
    setResults([]);

    API.get(`/products/search?query=${q}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => console.log("SEARCH ERROR:", err))
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <div className="bg-[#001424] bg-[url('https://www.transparenttextures.com/patterns/rocky-wall.png')] pt-[4.5rem] md:pt-[5.8rem] min-h-screen">

      {/* PAGE TITLE */}
      <h2 className="fixed w-full text-md text-white font-semibold px-4 py-2 bg-[rgba(0,0,0,.5)] z-[60]">
        Search results for “{query}”
      </h2>

      <AnimatePresence mode="wait">
        {/* ---------- LOADING: SHOW SKELETON ---------- */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 py-4 md:px-4  pt-[3rem]">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-84 bg-gray-800/30 animate-pulse border border-gray-700"
                >
                  <div className="h-2/3 bg-gray-700/40 rounded-t-lg"></div>
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-700/40 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700/40 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
        ) : results.length > 0 ? (
          /* ---------- RESULTS GRID WITH SHOP ANIMATION ---------- */
          <motion.div
            key="grid"
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 md:gap-3 py-2 md:px-4 pt-[3rem]"
            initial="hidden"
            animate="show"
            variants={gridVariants}
          >
            {results.map((p) => (
              <motion.div
                key={p._id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 120, damping: 12 },
                }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* ---------- NO RESULTS ---------- */
          <motion.p
            key="empty"
            className="text-center mt-20 text-gray-400 h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No products found.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
