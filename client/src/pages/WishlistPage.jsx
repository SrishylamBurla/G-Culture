import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state.wishlist);
  const [showSizePopup, setShowSizePopup] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // ✨ Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const fadeCard = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.97,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // 🧠 Open popup for size/color selection
  const handleAddToCartClick = (product) => {
    if (product.countInStock <= 0) {
      toast.error("❌ This product is out of stock!");
      return;
    }
    setShowSizePopup(product._id);
    setSelectedColor("");
    setSelectedSize("");
  };

  // 🛒 Confirm Add to Cart
  const handleConfirmAdd = (product) => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    const colorToUse = selectedColor || product.colors?.[0] || "";

    if (product.countInStock <= 0) {
      toast.error("Sorry, this product is out of stock!");
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        selectedSize,
        selectedColor: colorToUse,
      })
    );

    toast.success(`🛒 "${product.name}" added to cart!`, {
      duration: 2000,
    });

    navigate("/cart");
    dispatch(removeFromWishlist(product._id));
    setShowSizePopup(null);
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center bg-[#001424] bg-[url('https://www.transparenttextures.com/patterns/football-no-lines.png)] pt-[7rem] -mt-[5rem] min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-xl font-semibold text-gray-600 mb-4">
          Your wishlist is empty 💔
        </h2>
        <Link
          to="/shop"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="px-2 md:px-3 lg:px-4 py-12 bg-[#001424] bg-[url('https://www.transparenttextures.com/patterns/flowers.png')] pt-[7rem] -mt-[5rem]"
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-white pt-14 tracking-wide">
        My Wishlist
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          layout
          variants={container}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4"
        >
          {wishlist.map((product) => {
            const price = Number(product.price) || 0;
            const offerPrice =
              Number(
                product.offerPrice || product.discountPrice || product.salePrice
              ) || 0;

            const offerPercentage =
              product.offerPercentage ||
              (offerPrice && price > offerPrice
                ? Math.round(((price - offerPrice) / price) * 100)
                : 0);

            // 🧮 Stock Info
            const stock = product.countInStock || 0;
            let stockMessage = "";
            let stockColor = "text-gray-400";

            if (stock > 10) {
              stockMessage = "In Stock";
              stockColor = "text-green-600";
            } else if (stock > 5) {
              stockMessage = `Only ${stock} left`;
              stockColor = "text-amber-500";
            } else if (stock > 0) {
              stockMessage = `⚠️ Only ${stock} left in stock!`;
              stockColor = "text-red-600 font-semibold";
            } else {
              stockMessage = "Out of Stock";
              stockColor = "text-red-500 font-semibold";
            }

            return (
              <motion.div
                key={product._id}
                variants={fadeCard}
                className="relative bg-amber-50 overflow-hidden group transition-all duration-700 ease-out transform shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] will-change-transform"
                whileHover={{
                  scale: 1.01,
                  transition: { type: "spring", stiffness: 120, damping: 12 },
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Link to={`/product/${product._id}`} className="block relative">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images?.[0] || "/images/tee1.svg"}
                      alt={product.name}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Offer Badge */}
                  {/* className="absolute left-2 top-2 bg-gradient-to-r from-red-600 to-orange-400 text-white px-2 py-1 text-xs font-semibold shadow-md animate-pulse" */}
                  {offerPercentage > 0 && (
                    <span className="absolute left-2 top-2 bg-gradient-to-r from-[#0f6ed4] via-[#a01cb2] to-[#de8328] text-white px-2 py-1 text-xs font-bold shadow-md">
                      {offerPercentage}% OFF
                    </span>
                  )}

                  {/* Details */}
                  <div className="p-2 text-center">
                    <h4
                      className="text-sm font-semibold uppercase tracking-wide text-gray-900 truncate transition-all duration-300"
                      title={product.name}
                    >
                      {product.name}
                    </h4>

                    <div className="p-0.5">
                      {offerPrice && offerPrice < price ? (
                        <p className="text-sm font-semibold text-gray-900">
                          <span className="line-through text-gray-400 mr-2">
                            ₹{price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-amber-600 font-bold">
                            ₹{offerPrice.toLocaleString("en-IN")}
                          </span>
                        </p>
                      ) : (
                        <p className="text-sm font-semibold text-gray-400">
                          ₹{price.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>

                    {/* 🧮 Stock Info */}
                    <p className={`text-xs p-0.5 ${stockColor}`}>
                      {stockMessage}
                    </p>
                  </div>
                </Link>
                {/* Buttons */}
                <div className="bg-[rgba(255, 255, 255, 0.3)] backdrop-blur-sm flex flex-col sm:flex-row justify-between items-stretch gap-2 px-3 pb-4">
                  <button
                    disabled={stock <= 0}
                    onClick={() => handleAddToCartClick(product)}
                    className={`flex-1 py-0.5 text-sm font-medium transition-all duration-300 ${
                      stock <= 0
                        ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600"
                        : "bg-gradient-to-r from-[#0a192f] via-[#1d528a] to-[#0a192f] text-white hover:scale-[1.03]"
                    }`}
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => dispatch(removeFromWishlist(product._id))}
                    className={`flex-1 py-0.5 text-sm font-medium transition-all duration-300 ${
                      stock === 0
                        ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600"
                        : "bg-gradient-to-r from-[#1c043f] via-[#9b6bde] to-[#1c043f] text-white hover:scale-[1.03]"
                    }`}
                  >
                    Remove
                  </button>
                </div>

                {/* Popup */}
                {showSizePopup === product._id && (
                  <div className="absolute inset-0 bg-black/80 text-white flex flex-col items-center justify-center text-center animate-fadeIn z-20">
                    <p className="text-sm mb-3 font-medium tracking-wide">
                      Select Size & Color
                    </p>

                    {/* Sizes */}
                    <div className="flex flex-wrap justify-center gap-3 mb-4">
                      {product.sizes?.length > 0 ? (
                        product.sizes.map((size, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-1 border rounded text-xs transition ${
                              selectedSize === size
                                ? "bg-white text-black font-semibold"
                                : "border-white text-white hover:bg-white hover:text-black"
                            }`}
                          >
                            {size}
                          </button>
                        ))
                      ) : (
                        <button
                          onClick={() => setSelectedSize("Free Size")}
                          className="px-3 py-1 border border-white text-xs rounded hover:bg-white hover:text-black transition"
                        >
                          Default
                        </button>
                      )}
                    </div>

                    {/* Colors */}
                    {product.colors?.length > 0 && (
                      <div className="flex gap-2 mb-5">
                        {product.colors.map((color, i) => (
                          <div
                            key={i}
                            onClick={() => setSelectedColor(color)}
                            className={`w-6 h-6 rounded-full border cursor-pointer ${
                              selectedColor === color
                                ? "ring-2 ring-white scale-110"
                                : "border-white/50"
                            }`}
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    )}

                    {/* Confirm Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleConfirmAdd(product)}
                        className="bg-white text-black px-4 py-1.5 rounded hover:bg-gray-200 text-sm"
                      >
                        Confirm Add
                      </button>
                      <button
                        onClick={() => setShowSizePopup(null)}
                        className="border border-white text-white px-4 py-1.5 rounded hover:bg-white hover:text-black text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
