import { useState, useEffect } from "react";
import CapsProductFilters from "../components/filters/CapsProductFilters";
import ProductGrid from "../components/ProductGrid";
import { SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import SkeletonProducts from "../components/SkeletonProducts";
import { useGetProductsQuery } from "../features/products/productApi";

export default function CapsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    category: "caps",
    subcategory: "",
    price: 5000,
    size: "",
    color: "",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "auto";
  }, [isFilterOpen]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      category: "caps",
      subcategory: params.get("subcategory") || "",
      size: params.get("size") || "",
      color: params.get("color") || "",
      price: params.get("price") ? Number(params.get("price")) : 5000,
    });
  }, [location.search]);

  const {
    data: products = [],
    isLoading,
    isFetching,
  } = useGetProductsQuery(filters);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("category", "caps");
    if (filters.subcategory) params.append("subcategory", filters.subcategory);
    if (filters.size) params.append("size", filters.size);
    if (filters.color) params.append("color", filters.color);
    if (filters.price) params.append("price", filters.price);
    navigate(`?${params.toString()}`, { replace: true });
  }, [filters, navigate]);

  const activeFilterCount = [
    filters.subcategory,
    filters.size,
    filters.color,
    filters.price < 5000,
  ].filter(Boolean).length;

  return (
    <section className="w-full min-h-screen bg-[#050507] text-white pt-28 md:pt-32">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="px-6 mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
            Collections
          </p>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Caps
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Crown your look. Statement headwear.
              </p>
            </div>
            {!isLoading && (
              <span className="text-xs text-gray-600">
                {products.length} {products.length === 1 ? "product" : "products"}
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

                  <CapsProductFilters
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
              <CapsProductFilters filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* MAIN GRID */}
          <div className="flex-1 px-4 md:px-6 pb-24 md:pb-12">
            {isLoading || isFetching ? (
              <SkeletonProducts />
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  No products match your filters.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      category: "caps",
                      subcategory: "",
                      price: 5000,
                      size: "",
                      color: "",
                    })
                  }
                  className="text-xs uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/5 px-5 py-2 rounded-full transition-all duration-200"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <ProductGrid products={products} filters={filters} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
