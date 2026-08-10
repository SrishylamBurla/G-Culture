// import { useSearchParams } from "react-router-dom";
// import API from "../api/axios";
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import ProductCard from "../components/ProductCard";
// import { Search } from "lucide-react";

// export default function SearchPage() {
//   const [params] = useSearchParams();
//   const query = params.get("query") || params.get("q") || "";
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const gridVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.08,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: [0.16, 1, 0.3, 1],
//       },
//     },
//   };

//   useEffect(() => {
//     const q = params.get("query") || params.get("q") || "";
//     if (!q) return;

//     setLoading(true);
//     setResults([]);

//     API.get(`/products/search?query=${q}`)
//       .then((res) => {
//         setResults(res.data);
//       })
//       .catch((err) => console.log("SEARCH ERROR:", err))
//       .finally(() => setLoading(false));
//   }, [params]);

//   return (
//     <section className="w-full min-h-screen bg-[#050507] text-white pt-28 md:pt-32">
//       <div className="max-w-[1600px] mx-auto">
//         {/* Page Header */}
//         <div className="px-6 mb-8">
//           <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
//             Search
//           </p>
//           <div className="flex items-end justify-between">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
//                 Results for "{query}"
//               </h1>
//               {!loading && (
//                 <p className="text-sm text-gray-500 mt-2">
//                   {results.length}{" "}
//                   {results.length === 1 ? "product" : "products"} found
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="px-4 md:px-6 pb-16">
//           <AnimatePresence mode="wait">
//             {/* LOADING SKELETON */}
//             {loading ? (
//               <motion.div
//                 key="skeleton"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
//               >
//                 {[...Array(8)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="rounded-xl overflow-hidden bg-white/[0.03] border border-[#d4af37]/5"
//                   >
//                     <div className="aspect-[3/4] bg-white/[0.04] animate-pulse" />
//                     <div className="p-4 space-y-3">
//                       <div className="h-3 bg-white/[0.06] rounded-full w-3/4 animate-pulse" />
//                       <div className="h-3 bg-white/[0.06] rounded-full w-1/2 animate-pulse" />
//                       <div className="h-3 bg-white/[0.06] rounded-full w-1/3 animate-pulse" />
//                     </div>
//                   </div>
//                 ))}
//               </motion.div>
//             ) : results.length > 0 ? (
//               /* RESULTS GRID */
//               <motion.div
//                 key="grid"
//                 className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
//                 initial="hidden"
//                 animate="show"
//                 variants={gridVariants}
//               >
//                 {results.map((p) => (
//                   <motion.div key={p._id} variants={itemVariants}>
//                     <ProductCard product={p} />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             ) : (
//               /* EMPTY STATE */
//               <motion.div
//                 key="empty"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="flex flex-col items-center justify-center py-32 text-center"
//               >
//                 <div className="w-16 h-16 rounded-full border border-[#d4af37]/20 flex items-center justify-center mb-6">
//                   <Search size={24} className="text-[#d4af37]/30" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-300 mb-2">
//                   No products found
//                 </h3>
//                 <p className="text-sm text-gray-600 max-w-sm">
//                   We couldn't find anything matching "{query}". Try a different
//                   search term or browse our collections.
//                 </p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useSearchParams } from "react-router-dom";
import API from "../api/axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("query") || params.get("q") || "";
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    price: 10000,
    size: "",
    color: "",
  });

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "auto";
  }, [isFilterOpen]);

  // Fetch search results
  useEffect(() => {
    const q = params.get("query") || params.get("q") || "";
    if (!q) return;

    setLoading(true);
    setResults([]);
    setFilteredResults([]);

    API.get(`/products/search?query=${q}`)
      .then((res) => {
        setResults(res.data);
        setFilteredResults(res.data);
      })
      .catch((err) => console.log("SEARCH ERROR:", err))
      .finally(() => setLoading(false));
  }, [params]);

  // Client-side filtering on search results
  useEffect(() => {
    let filtered = [...results];

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.subcategory) {
      filtered = filtered.filter((p) => p.subcategory === filters.subcategory);
    }
    if (filters.size) {
      filtered = filtered.filter(
        (p) => p.sizes && p.sizes.includes(filters.size)
      );
    }
    if (filters.color) {
      filtered = filtered.filter(
        (p) =>
          p.color &&
          p.color.toLowerCase() === filters.color.toLowerCase()
      );
    }
    if (filters.price < 10000) {
      filtered = filtered.filter((p) => p.price <= filters.price);
    }

    setFilteredResults(filtered);
  }, [filters, results]);

  const activeFilterCount = [
    filters.category,
    filters.subcategory,
    filters.size,
    filters.color,
    filters.price < 10000,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({
      category: "",
      subcategory: "",
      price: 10000,
      size: "",
      color: "",
    });
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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
        {/* Page Header */}
        <div className="px-6 mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
            Search
          </p>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Results for "{query}"
              </h1>
              {!loading && (
                <p className="text-sm text-gray-500 mt-2">
                  {filteredResults.length}{" "}
                  {filteredResults.length === 1 ? "product" : "products"} found
                </p>
              )}
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
                  <SearchFilters
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
              <SearchFilters
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1 px-4 md:px-6 pb-24 md:pb-12">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden bg-white/[0.03] border border-[#d4af37]/5"
                    >
                      <div className="aspect-[3/4] bg-white/[0.04] animate-pulse" />
                      <div className="p-4 space-y-3">
                        <div className="h-3 bg-white/[0.06] rounded-full w-3/4 animate-pulse" />
                        <div className="h-3 bg-white/[0.06] rounded-full w-1/2 animate-pulse" />
                        <div className="h-3 bg-white/[0.06] rounded-full w-1/3 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : filteredResults.length > 0 ? (
                <motion.div
                  key="grid"
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  initial="hidden"
                  animate="show"
                  variants={gridVariants}
                >
                  {filteredResults.map((p) => (
                    <motion.div key={p._id} variants={itemVariants}>
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-32 text-center"
                >
                  <div className="w-16 h-16 rounded-full border border-[#d4af37]/20 flex items-center justify-center mb-6">
                    <Search size={24} className="text-[#d4af37]/30" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">
                    No products found
                  </h3>
                  <p className="text-sm text-gray-600 max-w-sm mb-6">
                    {activeFilterCount > 0
                      ? "No products match your current filters. Try adjusting them."
                      : `We couldn't find anything matching "${query}". Try a different search term.`}
                  </p>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/5 px-5 py-2 rounded-full transition-all duration-200"
                    >
                      Clear Filters
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SEARCH FILTERS COMPONENT ─── */

function SearchFilters({ filters, setFilters, clearFilters }) {
  const [openSections, setOpenSections] = useState({
    category: true,
    subcategory: true,
    price: true,
    size: true,
    color: true,
  });

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const FILTER_OPTIONS = {
    categories: ["streetwear", "casualwear", "caps", "chestbags"],
    subcategories: {
      streetwear: ["oversized-tshirts", "hoodies", "joggers", "jackets"],
      casualwear: ["shirts", "trousers", "polos", "shorts"],
      caps: ["sports", "casual", "snapback", "bucket", "trucker"],
      chestbags: ["sports", "casual", "kids", "formal"],
    },
    colors: ["black", "white", "blue", "red", "brown", "green", "gray"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "Free Size"],
  };

  const handleChange = (key, value) => {
    if (key === "category") {
      setFilters((prev) => ({
        ...prev,
        category: prev.category === value ? "" : value,
        subcategory: prev.category === value ? prev.subcategory : "",
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: prev[key] === value ? "" : value,
      }));
    }
  };

  const hasActiveFilters =
    filters.category ||
    filters.subcategory ||
    filters.size ||
    filters.color ||
    filters.price < 10000;

  const availableSubcategories = filters.category
    ? FILTER_OPTIONS.subcategories[filters.category] || []
    : [];

  return (
    <div className="flex flex-col text-white px-1 py-2 space-y-1">
      {/* CATEGORY */}
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
              className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all duration-200
                ${
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

      {/* SUBCATEGORY (conditional) */}
      {filters.category && availableSubcategories.length > 0 && (
        <FilterSection
          title="Type"
          isOpen={openSections.subcategory}
          onToggle={() => toggleSection("subcategory")}
        >
          <div className="space-y-1">
            {availableSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => handleChange("subcategory", sub)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all duration-200
                  ${
                    filters.subcategory === sub
                      ? "bg-[#d4af37] text-black font-medium"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      {/* PRICE */}
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
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-[#d4af37]
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-[#d4af37]
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-[11px] text-gray-600">₹200</span>
            <span className="text-xs text-[#d4af37] font-medium">
              Up to ₹{Number(filters.price).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </FilterSection>

      {/* SIZE */}
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
              className={`min-w-[40px] h-9 px-3 rounded-lg text-xs font-medium transition-all duration-200
                ${
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

      {/* COLOR */}
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
              className={`w-7 h-7 rounded-full transition-all duration-200
                ${
                  filters.color === color
                    ? "ring-2 ring-[#d4af37] ring-offset-2 ring-offset-[#050507]"
                    : "ring-1 ring-white/10 hover:ring-[#d4af37]/40"
                }`}
              style={{
                backgroundColor: color,
                border:
                  color === "white"
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "none",
              }}
              title={color}
            />
          ))}
        </div>
      </FilterSection>

      {/* CLEAR */}
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

/* ─── REUSABLE FILTER SECTION ─── */

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
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-4 px-1">{children}</div>
      </motion.div>
    </div>
  );
}
