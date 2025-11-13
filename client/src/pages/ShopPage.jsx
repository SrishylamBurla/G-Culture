import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import ShopProductFilters from "../components/filters/ShopProductFilters";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";

export default function ShopPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  // Disable page scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "auto";
  }, [isFilterOpen]);

  // Filtering logic
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
    <section
      className="w-full min-h-screen bg-[#001424]
                 bg-[url('https://www.transparenttextures.com/patterns/skulls.png')]
                 pt-[4rem] md:pt-[4.5rem]"
    >
      <div className="flex flex-col md:flex-row w-full">

        {/* ---------- MOBILE FILTER BUTTON ---------- */}
        <button
          className="md:hidden flex items-center gap-2 p-3 bg-[#001424] text-gray-200 border-b border-white/10 sticky top-0 z-[50]"
          onClick={() => setIsFilterOpen(true)}
        >
          <Filter size={18} />
          Filters
        </button>

        {/* ---------- MOBILE FILTER DRAWER ---------- */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/70 z-[90]"
                onClick={() => setIsFilterOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="fixed top-0 left-0 h-full w-[80%] max-w-[270px]
                           border-r border-white/10 z-[99999]
                           shadow-xl overflow-y-auto"
              >
                <ShopProductFilters
                  filters={filters}
                  setFilters={setFilters}
                  isMobile={true}
                  closeDrawer={() => setIsFilterOpen(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ---------- DESKTOP SIDEBAR ---------- */}
        <aside className="hidden md:block w-64 border-r border-white/10">
          <ShopProductFilters filters={filters} setFilters={setFilters} />
        </aside>

        {/* ---------- MAIN GRID AREA ---------- */}
        <motion.div
          className="flex-1 px-2 md:px-3 pb-24 pt-4 overflow-y-auto scrollbar-hover h-[calc(100vh-64px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Animated Title */}
          <div
            className="pt-4 pb-8 mx-3"
            style={{ animation: "fadeInLeft 1s ease-out forwards" }}
          >
            <h1 className="inline text-4xl shop-quote bg-clip-text text-transparent bg-gradient-to-r from-[#907b02] via-[#bfa9c8] to-[#b27006]">
              For the Men
              <br />
              Who Build, Break and Begin Again...
            </h1>
          </div>

          {/* Fade animation CSS */}
          <style>{`
            @keyframes fadeInLeft {
              0% { opacity: 0; transform: translateX(-40px); }
              100% { opacity: 1; transform: translateX(0); }
            }
          `}</style>

          {/* Product Grid */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                className="text-center text-gray-400 py-20 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Loading products...
              </motion.div>
            ) : filteredProducts.length ? (
              <motion.div
                key="grid"
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="text-center text-gray-400 py-20 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No products found.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
