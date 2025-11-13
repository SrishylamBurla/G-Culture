import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

export default function StreetwearProductFilters({ filters, setFilters, isMobile, closeDrawer }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    subcategory: true,
    price: true,
    size: true,
    color: true,
  });

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "auto";
  }, [isFilterOpen]);

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // 🎽 Streetwear-specific filter data
  const FILTER_OPTIONS = {
    subcategories: ["shirts", "tops", "bottoms", "outerwear", "trousers"],
    colors: ["black", "white", "blue", "gray", "red", "navy"],
    sizes: ["S", "M", "L", "XL", "32", "34", "36"],
  };

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, category: "streetwear" }));
  };

  const clearFilters = () => {
    setFilters({
      category: "streetwear",
      subcategory: "",
      price: 4000,
      size: "",
      color: "",
    });
  };

  return (
    <aside
      className="w-full md:w-64 flex flex-col bg-[#001424]
                 bg-[url('https://www.transparenttextures.com/patterns/snow.png')]
                 border-r border-white/10 text-gray-100 sticky top-[64px]
                 h-[calc(100vh-64px)] overflow-y-scroll scrollbar-hover
                 px-4 py-2 transition-all duration-300"
    >
      {/* 🧩 Header */}

      <div className="relative">
        <h3 className="text-lg font-semibold mb-6 uppercase border-b border-white/10 pb-3 tracking-wide">
          Filters
        </h3>

        {isMobile && (
          <button
            onClick={closeDrawer}
            className="text-gray-300 hover:text-white text-xl absolute top-1 right-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* 🧷 Type (Subcategory) */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("subcategory")}
          className="flex justify-between w-full font-medium text-gray-200 hover:text-white"
          aria-expanded={openSections.subcategory}
        >
          Type
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.subcategory ? "rotate-180" : ""
            }`}
          />
        </button>
        <motion.div
          initial={false}
          animate={{
            height: openSections.subcategory ? "auto" : 0,
            opacity: openSections.subcategory ? 1 : 0,
          }}
          className="overflow-hidden mt-3 space-y-2 text-sm"
        >
          {FILTER_OPTIONS.subcategories.map((sub) => (
            <label key={sub} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="subcategory"
                value={sub}
                checked={filters.subcategory === sub}
                onChange={(e) => handleChange("subcategory", e.target.value)}
                className="accent-purple-500"
              />
              <span className="capitalize">{sub}</span>
            </label>
          ))}
        </motion.div>
      </div>

      {/* 💰 Price Range */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("price")}
          className="flex justify-between w-full font-medium text-gray-200 hover:text-white"
          aria-expanded={openSections.price}
        >
          Price Range
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.price ? "rotate-180" : ""
            }`}
          />
        </button>
        <motion.div
          initial={false}
          animate={{
            height: openSections.price ? "auto" : 0,
            opacity: openSections.price ? 1 : 0,
          }}
          className="overflow-hidden mt-3"
        >
          <input
            type="range"
            min={500}
            max={4000}
            step="100"
            value={filters.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="w-full accent-purple-500"
          />
          <p className="text-xs mt-1 text-gray-300">Up to ₹{filters.price}</p>
        </motion.div>
      </div>

      {/* 📏 Size */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("size")}
          className="flex justify-between w-full font-medium text-gray-200 hover:text-white"
          aria-expanded={openSections.size}
        >
          Size
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.size ? "rotate-180" : ""
            }`}
          />
        </button>
        <motion.div
          initial={false}
          animate={{
            height: openSections.size ? "auto" : 0,
            opacity: openSections.size ? 1 : 0,
          }}
          className="overflow-hidden mt-3 flex flex-wrap gap-2"
        >
          {FILTER_OPTIONS.sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleChange("size", size)}
              className={`px-3 py-1 border rounded-md text-sm transition-all duration-200 ${
                filters.size === size
                  ? "border-purple-400 bg-purple-400/10 text-white"
                  : "border-gray-600 text-gray-300 hover:bg-white/10"
              }`}
            >
              {size}
            </button>
          ))}
        </motion.div>
      </div>

      {/* 🎨 Color */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("color")}
          className="flex justify-between w-full font-medium text-gray-200 hover:text-white"
          aria-expanded={openSections.color}
        >
          Color
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.color ? "rotate-180" : ""
            }`}
          />
        </button>
        <motion.div
          initial={false}
          animate={{
            height: openSections.color ? "auto" : 0,
            opacity: openSections.color ? 1 : 0,
          }}
          className="overflow-hidden mt-3 flex gap-3 flex-wrap"
        >
          {FILTER_OPTIONS.colors.map((color) => (
            <button
              key={color}
              onClick={() => handleChange("color", color)}
              className={`w-6 h-6 rounded-full border-2 transition-transform duration-200 ${
                filters.color === color
                  ? "border-purple-400 scale-110"
                  : "border-gray-600 hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </motion.div>
      </div>

      {/* ❌ Clear Filters */}
      <button
        onClick={clearFilters}
        className="text-sm mt-6 pb-4 underline text-gray-400 hover:text-purple-300"
      >
        Clear Filters
      </button>
    </aside>
  );
}
