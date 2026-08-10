import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../features/products/productApi";
import ProductCard from "../components/ProductCard";
import ShopProductFilters from "../components/filters/ShopProductFilters";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import SkeletonProducts from "../components/SkeletonProducts";

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    price: 4000,
    size: "",
    color: "",
  });

  const { data: items = [], isLoading: loading } = useGetProductsQuery();

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "auto";
  }, [isFilterOpen]);

  const filteredProducts = items.filter((p) => {
    return (
      (!filters.category || p.category === filters.category) &&
      (!filters.subcategory || p.subcategory === filters.subcategory) &&
      (!filters.size || p.sizes.includes(filters.size)) &&
      (!filters.color || p.colors.includes(filters.color)) &&
      p.offerPrice <= filters.price
    );
  });

  const activeFilterCount = [
    filters.category,
    filters.subcategory,
    filters.size,
    filters.color,
    filters.price < 4000,
  ].filter(Boolean).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full min-h-screen bg-[#050507] text-white pt-28 md:pt-32">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="px-6 mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
            Browse
          </p>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Shop All
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                For the men who build, break and begin again.
              </p>
            </div>
            {!loading && (
              <span className="text-xs text-gray-600">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full">
          {/* MOBILE FILTER BUTTON */}
          <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[50]">
            <button
              className="flex items-center gap-2 px-5 py-3 bg-[#d4af37] text-black rounded-full text-xs font-medium uppercase tracking-wider shadow-2xl hover:bg-[#c09b33] transition-colors duration-200"
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-black text-[#d4af37] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* MOBILE FILTER DRAWER */}
          <AnimatePresence>
            {isFilterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                  onClick={() => setIsFilterOpen(false)}
                />

                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed top-0 left-0 h-screen w-[280px] bg-[#0a0a0c] border-r border-[#d4af37]/10 z-[99999] overflow-y-auto"
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#d4af37]/10">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                      Filters
                    </h3>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-1.5 rounded-full border border-[#d4af37]/20 text-[#d4af37]/60 hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-all"
                    >
                      <X size={14} />
                    </button>
                  </div>

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

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:block w-[240px] flex-shrink-0 px-6">
            <div className="sticky top-32">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]/60 mb-6">
                Filters
              </h3>
              <ShopProductFilters filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* MAIN GRID */}
          <div className="flex-1 px-4 md:px-6 pb-24 md:pb-12">
            <AnimatePresence mode="wait">
              {loading || items.length === 0 ? (
                <SkeletonProducts />
              ) : filteredProducts.length > 0 ? (
                <motion.div
                  key="grid"
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {filteredProducts.map((product) => (
                    <motion.div key={product._id} variants={cardVariants}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="flex flex-col items-center justify-center py-32 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-sm text-gray-500 mb-4">
                    No products match your filters.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        category: "",
                        subcategory: "",
                        price: 4000,
                        size: "",
                        color: "",
                      })
                    }
                    className="text-xs uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/5 px-5 py-2 rounded-full transition-all duration-200"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
