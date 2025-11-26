import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ShopProductFilters({
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

  // 🔥 Combined category rule (Shop has multiple categories)
  const FILTER_OPTIONS = {
    categories: ["streetwear", "casualwear", "caps", "chestbags"],

    subcategories: {
      streetwear: ["shirts", "tops", "bottoms", "outerwear", "trousers"],
      casualwear: ["dresses", "bottoms", "tops", "outerwear", "ethnic"],
      caps: ["tops", "bottoms", "dresses", "outerwear"],
      chestbags: ["sports", "casual", "kids", "formal"],
    },

    colors: [
      "black",
      "white",
      "blue",
      "gray",
      "red",
      "green",
      "yellow",
      "pink",
      "brown",
      "navy",
    ],

    sizes: [
      "S","M","L","XL",
      "26","28","30","32","34","36",
      "5","6","7","8","9","10",
    ],
  };

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      subcategory: "",
      price: 4000,
      size: "",
      color: "",
    });
  };

  return (
    <aside
      className={`w-50 flex flex-col bg-[#001424]
          bg-[url('https://www.transparenttextures.com/patterns/snow.png')]
          border-r border-white/10 text-gray-100 sticky overflow-y-scroll scrollbar-hover
          px-4 py-2 transition-all duration-300`}
    >

      {/* FILTER HEADER */}
      <div className="relative mb-6">
        <h3 className="text-lg font-semibold uppercase border-b border-white/10 pb-3 tracking-wide">
          Filters
        </h3>

        {/* Close Button for Mobile */}
        {isMobile && (
          <button
            onClick={closeDrawer}
            className="text-gray-300 hover:text-white text-xl absolute top-1 right-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* CATEGORY */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("category")}
          className="flex justify-between w-full font-medium text-gray-200 hover:text-white"
        >
          Category
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openSections.category ? "rotate-180" : ""
            }`}
          />
        </button>

        <motion.div
          initial={false}
          animate={{
            height: openSections.category ? "auto" : 0,
            opacity: openSections.category ? 1 : 0,
          }}
          className="overflow-hidden mt-3 space-y-2 text-sm"
        >
          {FILTER_OPTIONS.categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={filters.category === cat}
                onChange={(e) => handleChange("category", e.target.value)}
                className="accent-purple-500"
              />
              <span className="capitalize">{cat}</span>
            </label>
          ))}
        </motion.div>
      </div>

      {/* SUBCATEGORY */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("subcategory")}
          className="flex justify-between w-full font-medium text-gray-200 hover:text-white"
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
          {(filters.category
            ? FILTER_OPTIONS.subcategories[filters.category]
            : []
          ).map((sub) => (
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
          className="flex justify-between w-full font-medium text-gray-200 hover:text-white"
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

          <p className="text-xs mt-1 text-gray-300">
            Up to ₹{filters.price}
          </p>
        </motion.div>
      </div>

      {/* SIZE */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("size")}
          className="flex justify-between w-full font-medium text-gray-200 hover:text-white"
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

      {/* COLOR */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("color")}
          className="flex justify-between w-full font-medium text-gray-200 hover:text-white"
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

      {/* CLEAR BUTTON */}
      <button
        onClick={clearFilters}
        className="text-sm mt-6 pb-3 underline text-gray-400 hover:text-purple-300"
      >
        Clear Filters
      </button>
    </aside>
  );
}
