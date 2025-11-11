import { useState, useEffect } from "react";
import axios from "axios";
import CapsProductFilters from "../components/filters/CapsProductFilters";
import ProductGrid from "../components/ProductGrid";
import { Filter } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function CapsPage() {
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

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products?${params.toString()}`
        );

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error fetching caps products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  // ✅ Clear filters but keep caps category enforced
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
      className="flex flex-col md:flex-row h-screen overflow-hidden
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

      {/* Mobile Sidebar (Framer Motion AnimatePresence) */}
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
              className="fixed md:hidden top-0 left-0 h-full w-64 bg-[#001424] z-50 
                         border-r border-white/10 overflow-y-scroll scrollbar-hover shadow-lg"
            >
              <div className="flex justify-end p-3">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-300 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>
              <CapsProductFilters filters={filters} setFilters={setFilters} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar — with visible scrollbar thumb */}
      <aside
        className="hidden md:flex flex-col w-64 bg-[#001424] border-r border-white/10
                   h-[calc(100vh-64px)] overflow-y-scroll scrollbar-hide"
      >
        <CapsProductFilters filters={filters} setFilters={setFilters} />
      </aside>

      {/* Product Grid */}
      <motion.div
        key={JSON.stringify(filters)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 px-2 pb-6 md:px-4 overflow-y-scroll scrollbar-hover h-[calc(100vh-64px)]"
      >

        <h1 className="text-gray-400 text-2xl py-4 page-tags">#Caps</h1>
        <div
          className="pt-4 py-8"
          style={{
            animation: "fadeInLeft 1s ease-out forwards",
          }}
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
          <div className="flex justify-center items-center h-64 text-gray-500 text-sm">
            Loading products...
          </div>
        ) : (
          <ProductGrid products={products} filters={filters} />
        )}
      </motion.div>
    </section>
  );
}
