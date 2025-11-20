import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function CasualwearProductFilters({
  filters,
  setFilters,
  isMobile,
  closeDrawer,
}) {
  const [openSections, setOpenSections] = useState({
    subcategory: true,
    price: true,
    size: true,
    color: true,
  });

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const FILTER_OPTIONS = {
    subcategories: ["dresses", "bottoms", "tops", "outerwear", "ethnic"],
    colors: ["black", "blue", "green", "yellow", "pink"],
    sizes: ["S", "M", "L"],
  };

  const handleChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value, category: "casualwear" }));

  const clearFilters = () =>
    setFilters({
      category: "casualwear",
      subcategory: "",
      price: 3000,
      size: "",
      color: "",
    });

  return (
    <aside
      className="w-50 flex flex-col bg-gray-200
                 border-r border-white/10 text-gray-800 sticky
                 h-[calc(100vh-64px)] overflow-y-scroll scrollbar-hover
                 px-4 py-2 transition-all duration-300"
    >
      {/* HEADER */}
      <div className="relative">
        <h3 className="text-lg font-semibold mb-6 uppercase border-b border-white/90 pb-3 tracking-wide">
          Filters
        </h3>

        {isMobile && (
          <button
            onClick={closeDrawer}
            className="text-gray-800 hover:text-gray-600 text-xl absolute top-1 right-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* SUBCATEGORY */}
      <div className="mb-4">
        <motion.div
          initial={false}
          animate={{
            height: openSections.subcategory ? "auto" : 0,
            opacity: openSections.subcategory ? 1 : 0,
          }}
          className="overflow-hidden space-y-2 text-sm"
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

      {/* PRICE */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("price")}
          className="flex justify-between w-full font-medium text-gray-800 hover:text-gray-600"
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
            max={3000}
            step="100"
            value={filters.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="w-full accent-purple-500"
          />
          <p className="text-xs mt-1 text-gray-800">Up to ₹{filters.price}</p>
        </motion.div>
      </div>

      {/* SIZE */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("size")}
          className="flex justify-between w-full font-medium text-gray-800 hover:text-gray-600"
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
                  ? "border-purple-400 bg-purple-400/10 text-gray-800"
                  : "border-gray-600 text-gray-800 hover:bg-white/10"
              }`}
            >
              {size}
            </button>
          ))}
        </motion.div>
      </div>

      {/* COLOR */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("color")}
          className="flex justify-between w-full font-medium text-gray-800 hover:text-gray-600"
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

      {/* CLEAR FILTERS */}
      <button
        onClick={clearFilters}
        className="text-sm underline text-gray-800 hover:text-purple-300 mb-6"
      >
        Clear Filters
      </button>
    </aside>
  );
}
