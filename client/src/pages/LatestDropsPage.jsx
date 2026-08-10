import { useGetProductsQuery } from "../features/products/productApi";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { Flame, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SkeletonProducts from "../components/SkeletonProducts";

export default function LatestDropsPage() {
  const [filters, setFilters] = useState({
    category: "",
    price: 10000,
    size: "",
    color: "",
    sort: "newest",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "auto";
  }, [isFilterOpen]);

  const { data: products = [], isLoading } = useGetProductsQuery({});

  // Sort by newest (createdAt descending)
  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Apply client-side filters
  const filteredProducts = sortedProducts.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.size && p.sizes && !p.sizes.includes(filters.size)) return false;
    if (filters.color && p.color?.toLowerCase() !== filters.color.toLowerCase())
      return false;
    if (filters.price < 10000 && p.price > filters.price) return false;
    return true;
  });

  const activeFilterCount = [
    filters.category,
    filters.size,
    filters.color,
    filters.price < 10000,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({ category: "", price: 10000, size: "", color: "", sort: "newest" });
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full min-h-screen bg-[#050507] text-white pt-28 md:pt-32">
      <div className="max-w-[1600px] mx-auto">
        {/* Hero Banner */}
        <div className="px-6 mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#d4af37]/10 via-[#050507] to-[#d4af37]/5 border border-[#d4af37]/10 p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/[0.03] rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Flame size={18} className="text-[#d4af37]" />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                  Fresh Arrivals
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
                Latest Drops
              </h1>
              <p className="text-sm md:text-base text-gray-400 max-w-lg">
                The newest additions to our collection. Be the first to grab these
                fresh pieces before they're gone.
              </p>
            </div>
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
                  <LatestDropsFilters
                    filters={filters}
                    setFilters={setFilters}
                    clearFilters={clearFilters}
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
              <LatestDropsFilters
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* MAIN GRID */}
          <div className="flex-1 px-4 md:px-6 pb-24 md:pb-12">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs text-gray-600">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </span>
            </div>

            {isLoading ? (
              <SkeletonProducts />
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  No products match your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-xs uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/5 px-5 py-2 rounded-full transition-all duration-200"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                initial="hidden"
                animate="show"
                variants={gridVariants}
              >
                {filteredProducts.map((p) => (
                  <motion.div key={p._id} variants={itemVariants}>
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FILTERS ─── */

function LatestDropsFilters({ filters, setFilters, clearFilters }) {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    size: true,
    color: true,
  });

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const FILTER_OPTIONS = {
    categories: ["streetwear", "casualwear", "caps", "chestbags"],
    colors: ["black", "white", "blue", "red", "brown", "green", "gray"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "Free Size"],
  };

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  const hasActiveFilters =
    filters.category || filters.size || filters.color || filters.price < 10000;

  return (
    <div className="flex flex-col text-white px-1 py-2 space-y-1">
      <FilterSection
        title="Category"
        isOpen={openSections.category}
        onToggle={() => toggleSection("category")}
      >
        <div className="space-y-1">
          {FILTER_OPTIONS.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleChange("category", cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all duration-200 ${
                filters.category === cat
                  ? "bg-[#d4af37] text-black font-medium"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Price Range"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="px-1">
          <input
            type="range"
            min={200}
            max={10000}
            step={100}
            value={filters.price}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#d4af37] [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#d4af37] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-[11px] text-gray-600">₹200</span>
            <span className="text-xs text-[#d4af37] font-medium">
              Up to ₹{Number(filters.price).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </FilterSection>

      <FilterSection
        title="Size"
        isOpen={openSections.size}
        onToggle={() => toggleSection("size")}
      >
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleChange("size", size)}
              className={`min-w-[40px] h-9 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                filters.size === size
                  ? "bg-[#d4af37] text-black"
                  : "border border-[#d4af37]/15 text-gray-400 hover:border-[#d4af37]/40 hover:text-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Color"
        isOpen={openSections.color}
        onToggle={() => toggleSection("color")}
      >
        <div className="flex flex-wrap gap-2.5">
          {FILTER_OPTIONS.colors.map((color) => (
            <button
              key={color}
              onClick={() => handleChange("color", color)}
              className={`w-7 h-7 rounded-full transition-all duration-200 ${
                filters.color === color
                  ? "ring-2 ring-[#d4af37] ring-offset-2 ring-offset-[#050507]"
                  : "ring-1 ring-white/10 hover:ring-[#d4af37]/40"
              }`}
              style={{
                backgroundColor: color,
                border: color === "white" ? "1px solid rgba(255,255,255,0.2)" : "none",
              }}
              title={color}
            />
          ))}
        </div>
      </FilterSection>

      {hasActiveFilters && (
        <div className="pt-4 px-1">
          <button
            onClick={clearFilters}
            className="w-full py-2.5 border border-[#d4af37]/20 rounded-full text-xs font-medium uppercase tracking-wider text-[#d4af37]/70 hover:text-[#d4af37] hover:border-[#d4af37]/50 hover:bg-[#d4af37]/5 transition-all duration-200"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterSection({ title, isOpen, onToggle, children }) {
  return (
    <div className="border-b border-[#d4af37]/10 last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 px-1 text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-[#d4af37] transition-colors duration-200"
      >
        {title}
        <ChevronDown
          size={14}
          className={`text-[#d4af37]/40 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-4 px-1">{children}</div>
      </motion.div>
    </div>
  );
}
