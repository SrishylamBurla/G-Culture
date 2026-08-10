import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function StreetwearProductFilters({
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

  const hasActiveFilters =
    filters.subcategory || filters.size || filters.color || filters.price < 4000;

  return (
    <div className="flex flex-col text-white px-1 py-2 space-y-1">
      {/* SUBCATEGORY */}
      <FilterSection
        title="Category"
        isOpen={openSections.subcategory}
        onToggle={() => toggleSection("subcategory")}
      >
        <div className="space-y-1">
          {FILTER_OPTIONS.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() =>
                handleChange("subcategory", filters.subcategory === sub ? "" : sub)
              }
              className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-all duration-200
                ${
                  filters.subcategory === sub
                    ? "bg-white text-black font-medium"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* PRICE */}
      <FilterSection
        title="Price Range"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="px-1">
          <input
            type="range"
            min={500}
            max={4000}
            step={100}
            value={filters.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="w-full accent-white h-1 bg-white/10 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-[11px] text-gray-500">₹500</span>
            <span className="text-xs text-gray-300 font-medium">
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
              onClick={() => handleChange("size", filters.size === size ? "" : size)}
              className={`min-w-[40px] h-9 px-2 rounded-lg text-xs font-medium transition-all duration-200
                ${
                  filters.size === size
                    ? "bg-white text-black"
                    : "border border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
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
              onClick={() =>
                handleChange("color", filters.color === color ? "" : color)
              }
              className={`w-7 h-7 rounded-full transition-all duration-200
                ${
                  filters.color === color
                    ? "ring-2 ring-white ring-offset-2 ring-offset-[#050507]"
                    : "ring-1 ring-white/10 hover:ring-white/30"
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

      {/* CLEAR FILTERS */}
      {hasActiveFilters && (
        <div className="pt-4 px-1">
          <button
            onClick={clearFilters}
            className="w-full py-2.5 border border-white/10 rounded-full text-xs font-medium uppercase tracking-wider text-gray-400 hover:text-white hover:border-white/30 transition-all duration-200"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Collapsible Filter Section ---------- */
function FilterSection({ title, isOpen, onToggle, children }) {
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 px-1 text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors duration-200"
      >
        {title}
        <ChevronDown
          size={14}
          className={`text-gray-500 transition-transform duration-200 ${
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
