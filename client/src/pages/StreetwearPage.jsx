import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductGrid from "../components/ProductGrid";
import { Filter } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import StreetwearProductFilters from "../components/filters/StreetwearProductFilters";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function StreetwearPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    category: "streetwear",
    subcategory: "",
    price: 5000,
    size: "",
    color: "",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [blurHeader, setBlurHeader] = useState(false);

  const scrollContainerRef = useRef(null);

  // ✅ Blur header when scrolling grid
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollContainerRef.current.scrollTop;
      setBlurHeader(scrollTop > 40); // Apply blur after slight scroll
    };
    const ref = scrollContainerRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll);
    return () => ref && ref.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Prevent background scroll when mobile filter is open
  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "auto";
  }, [isFilterOpen]);

  // ✅ Load filters from URL if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subcategory = params.get("subcategory") || "";
    const size = params.get("size") || "";
    const color = params.get("color") || "";
    const price = params.get("price") ? Number(params.get("price")) : 5000;

    setFilters({
      category: "streetwear",
      subcategory,
      size,
      color,
      price,
    });
  }, [location.search]);

  // ✅ Fetch products (always filtered by streetwear)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("category", "streetwear");
        if (filters.subcategory)
          params.append("subcategory", filters.subcategory);
        if (filters.size) params.append("size", filters.size);
        if (filters.color) params.append("color", filters.color);
        if (filters.price) params.append("price", filters.price);

        // 🧭 Update URL with filters for sharable state
        navigate(`?${params.toString()}`, { replace: true });

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products?${params.toString()}`
        );

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error fetching streetwear products:", err);
        toast.error("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, navigate]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...newFilters, category: "streetwear" });
    setIsFilterOpen(false);
  };
  return (
    <section
      className="w-full min-h-screen bg-[#001424] 
               bg-[url('https://www.transparenttextures.com/patterns/snow.png')]
               pt-[4.5rem] md:pt-[5.8rem]"
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
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/70 z-[90]"
                onClick={() => setIsFilterOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                key="drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="fixed top-0 left-0 h-full w-[80%] max-w-[270px]
                   border-r border-white/10 z-[99999]
                   shadow-xl overflow-y-auto"
              >
                {/* Filters */}
                <StreetwearProductFilters
                  filters={filters}
                  setFilters={setFilters}
                  closeDrawer={() => setIsFilterOpen(false)}
                  isMobile={true}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* SIDEBAR — scrolls with page */}
        <aside className="hidden md:block w-64 border-r border-white/10">
          {/* <div className="px-2 py-3 border-b border-white/10 bg-[#001830]/80 backdrop-blur-sm">
          <h2 className="text-gray-200 font-semibold tracking-wide uppercase text-base">
            Filters
          </h2>
        </div> */}

          <div>
            <StreetwearProductFilters
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </aside>

        {/* MAIN GRID AREA */}
        <div className="flex-1 md:px-3 pb-24 pt-4">

  {/* Right aligned tag with fade-in-from-right */}
  <div
    className="flex justify-end"
    style={{
      animation: "fadeInRight 0.9s ease-out forwards",
    }}
  >
    <h1 className="inline text-gray-900 text-lg py-1 px-2 page-tags bg-[#159181]">
      #StreetWear
    </h1>
  </div>

  {/* Main heading fade-in-from-left */}
  <div
    className="py-6 mx-3 md:px-0"
    style={{
      animation: "fadeInLeft 1s ease-out forwards",
    }}
  >
    <h1 className="inline text-4xl shop-quote bg-clip-text text-transparent bg-gradient-to-r from-[#907b02] via-[#bfa9c8] to-[#b27006]">
      Wear to Dare
      <br />
      Wanna stand out then you need to carry it...
    </h1>
  </div>

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

    @keyframes fadeInRight {
      0% {
        opacity: 0;
        transform: translateX(40px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `}</style>




          {/* PRODUCT GRID */}
          {loading ? (
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
        </div>
      </div>
    </section>
  );
}
