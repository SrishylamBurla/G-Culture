import { useState, useEffect } from "react";
import CapsProductFilters from "../components/filters/CapsProductFilters";
import ProductGrid from "../components/ProductGrid";
import { Filter } from "lucide-react";
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

  // Prevent background scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "auto";
  }, [isFilterOpen]);

  // Load filter values from URL on first load
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

  // RTK Query auto-fetch 🔥
  const {
    data: products = [],
    isLoading,
    isFetching,
  } = useGetProductsQuery(filters);

  // Sync URL with filters
  useEffect(() => {
    const params = new URLSearchParams();

    params.append("category", "caps");
    if (filters.subcategory) params.append("subcategory", filters.subcategory);
    if (filters.size) params.append("size", filters.size);
    if (filters.color) params.append("color", filters.color);
    if (filters.price) params.append("price", filters.price);

    navigate(`?${params.toString()}`, { replace: true });
  }, [filters, navigate]);

  return (
    <section className="w-full min-h-screen bg-gray-100 pt-[4.5rem] md:pt-[5.8rem]">
      <div className="flex flex-col md:flex-row w-full">

        {/* MOBILE FILTER BUTTON */}
        <button
          className="md:hidden flex items-center gap-2 p-3 bg-[#001424] 
                     text-gray-200 border-b border-white/10 sticky top-0 z-[50]"
          onClick={() => setIsFilterOpen(true)}
        >
          <Filter size={18} />
          Filters
        </button>

        {/* MOBILE FILTER DRAWER */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-black/70 z-[90]"
                onClick={() => setIsFilterOpen(false)}
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="fixed top-0 left-0 h-screen w-50 max-w-[300px] 
                           bg-gray-200 border-r border-white/10 z-[99999]
                           shadow-xl overflow-y-auto"
              >
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
        <aside className="hidden md:block w-50">
          <CapsProductFilters filters={filters} setFilters={setFilters} />
        </aside>

        {/* PRODUCT GRID AREA */}
        <div className="flex-1 md:px-3 py-2">

          {/* TAG */}
          <div
            className="flex justify-end"
            style={{ animation: "fadeInRight 0.9s ease-out forwards" }}
          >
            <h1 className="inline text-gray-200 text-lg py-1 px-2 page-tags bg-[#159181]">
              #Caps
            </h1>
          </div>

          {/* HEADING */}
          <div
            className="py-6 px-3"
            style={{ animation: "fadeInLeft 1s ease-out forwards" }}
          >
            <h1 className="inline text-4xl shop-quote bg-clip-text text-transparent 
                           bg-gradient-to-r from-[#907b02] to-[#b27006]">
              Men Never Rest Mentally...
            </h1>
          </div>

          {/* ANIMATION CSS */}
          <style>{`
            @keyframes fadeInLeft {
              0% { opacity: 0; transform: translateX(-40px); }
              100% { opacity: 1; transform: translateX(0); }
            }

            @keyframes fadeInRight {
              0% { opacity: 0; transform: translateX(40px); }
              100% { opacity: 1; transform: translateX(0); }
            }
          `}</style>

          {/* GRID / LOADING */}
          {isLoading || isFetching ? (
            <SkeletonProducts />
          ) : (
            <ProductGrid products={products} filters={filters} />
          )}
        </div>
      </div>
    </section>
  );
}
