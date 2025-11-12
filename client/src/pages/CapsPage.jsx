import { useState, useEffect } from "react";
import axios from "axios";
import CapsProductFilters from "../components/filters/CapsProductFilters";
import ProductGrid from "../components/ProductGrid";
import { Filter } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ✅ Prevent background scroll when mobile filter is open
  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "auto";
  }, [isFilterOpen]);

  // ✅ Load filters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subcategory = params.get("subcategory") || "";
    const size = params.get("size") || "";
    const color = params.get("color") || "";
    const price = params.get("price") ? Number(params.get("price")) : 5000;

    setFilters({
      category: "caps",
      subcategory,
      size,
      color,
      price,
    });
  }, [location.search]);

  // ✅ Fetch products (always filtered by caps)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("category", "caps");
        if (filters.subcategory) params.append("subcategory", filters.subcategory);
        if (filters.size) params.append("size", filters.size);
        if (filters.color) params.append("color", filters.color);
        if (filters.price) params.append("price", filters.price);

        // 🧭 Update URL query for shareable filters
        navigate(`?${params.toString()}`, { replace: true });

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products?${params.toString()}`
        );

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error fetching caps products:", err);
        toast.error("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, navigate]);

  // ✅ Reset filters
  const handleClearFilters = () => {
    setFilters({
      category: "caps",
      subcategory: "",
      price: 5000,
      size: "",
      color: "",
    });
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...newFilters, category: "caps" });
    setIsFilterOpen(false);
  };

  return (
    <section
      className="flex flex-col md:flex-row min-h-screen
                 bg-[#001424] bg-[url('https://www.transparenttextures.com/patterns/snow.png')] 
                 pt-[5rem] -mt-[5rem]"
    >
      {/* Mobile Filter Button */}
      <button
        className="md:hidden flex items-center gap-2 p-2 bg-[#001424] text-gray-200 border-b border-white/10"
        onClick={() => setIsFilterOpen(true)}
      >
        <Filter size={18} />
        Filters
      </button>

      {/* Mobile Sidebar (Animated) */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setIsFilterOpen(false)}
            />

            {/* Sliding Sidebar */}
            <motion.div
              key="sidebar"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed md:hidden top-0 left-0 h-[100dvh] w-[80%] max-w-[257px] bg-[#001424]/95 z-50 
                         border-r border-white/10 shadow-xl backdrop-blur-md"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#001830]/95 backdrop-blur-sm">
                <h2 className="text-gray-200 text-base font-semibold tracking-wide uppercase">
                  Filters
                </h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-300 hover:text-white text-xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Filters Section */}
              <div className="overflow-y-auto max-h-[calc(100dvh-60px)]">
                <CapsProductFilters filters={filters} setFilters={setFilters} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 bg-[#001424] border-r border-white/10
                   sticky h-[calc(100vh-64px)] overflow-y-auto scrollbar-hover"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#001830]/95 backdrop-blur-sm">
          <h2 className="text-gray-200 text-base font-semibold tracking-wide uppercase">
            Filters
          </h2>
        </div>

        <div className="overflow-y-auto">
          <CapsProductFilters filters={filters} setFilters={setFilters} />
        </div>
      </aside>

      {/* Product Grid */}
      <motion.div
        key={JSON.stringify(filters)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 md:px-2 overflow-y-auto scrollbar-hover min-h-screen pb-24"
      >
        <h1 className="text-gray-400 text-2xl px-2 py-4 page-tags">#Caps</h1>

        <div
          className="pt-4 py-8 px-2"
          style={{ animation: "fadeInLeft 1s ease-out forwards" }}
        >
          <h1 className="inline text-4xl shop-quote bg-clip-text text-transparent bg-gradient-to-r from-[#907b02] via-[#bfa9c8] to-[#b27006]">
            Men Never Rest Mentally...
          </h1>

          <style>{`
            @keyframes fadeInLeft {
              0% {
                opacity: 0;
                transform: translateX(-120px);
              }
              100% {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}</style>
        </div>

        {loading ? (
          // ✅ Skeleton Loader
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2">
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
        ) : (
          <ProductGrid products={products} filters={filters} />
        )}
      </motion.div>
    </section>
  );
}
