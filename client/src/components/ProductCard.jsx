import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { useState } from "react";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { Heart, ShoppingBag, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  const cartItem = cartItems.find((i) => i._id === product._id);
  const quantity = cartItem ? cartItem.quantity : 1;

  const [showSizePopup, setShowSizePopup] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isBuyNow, setIsBuyNow] = useState(false);

  const isWishlisted = wishlist.some((i) => i._id === product._id);

  const price = Number(product.price) || 0;
  const offerPrice =
    Number(product.offerPrice || product.discountPrice || product.salePrice) ||
    0;

  const offerPercentage =
    product.offerPercentage ||
    (offerPrice && price > offerPrice
      ? Math.round(((price - offerPrice) / price) * 100)
      : 0);

  const stock = product.countInStock || 0;

  const handleAddToCart = (product, redirectAfter = false) => {
    if (product.sizes?.length && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const colorToUse = selectedColor || product.colors?.[0] || "";

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        selectedSize,
        selectedColor: colorToUse,
      }),
    );

    setShowSizePopup(null);

    toast.success(
      redirectAfter
        ? `"${product.name}" added — redirecting...`
        : `"${product.name}" added to cart`,
    );

    if (redirectAfter) {
      setTimeout(() => navigate("/cart"), 1000);
    }
  };

  const handlePopupOpen = (product, isBuy = false) => {
    if (stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }
    setIsBuyNow(isBuy);
    setShowSizePopup(product._id);
    setSelectedColor("");
    setSelectedSize("");
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="relative group overflow-hidden rounded-xl bg-[#0a0a0c] border border-[#d4af37]/[0.06] hover:border-[#d4af37]/20 transition-all duration-500 hover:shadow-lg hover:shadow-[#d4af37]/[0.03]">
      <Link to={`/product/${product._id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.images?.[0] || "/images/tee1.svg"}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Offer Badge */}
          {offerPercentage > 0 && (
            <span className="absolute left-3 top-3 bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              {offerPercentage}% Off
            </span>
          )}

          {/* Out of stock overlay */}
          {stock === 0 && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold border border-gray-600 px-4 py-1.5 rounded-full">
                Sold Out
              </span>
            </div>
          )}

          {/* Low stock indicator */}
          {stock > 0 && stock <= 5 && (
            <span className="absolute left-3 bottom-3 bg-black/50 backdrop-blur-sm text-[#d4af37] text-[10px] font-medium px-2.5 py-1 rounded-full border border-[#d4af37]/20">
              Only {stock} left
            </span>
          )}

          {/* Wishlist button */}
          <button
            type="button"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            onClick={handleToggleWishlist}
            className={`
    absolute
    top-2.5
    right-2.5
    sm:top-3
    sm:right-3
    z-10

    w-8
    h-8
    sm:w-9
    sm:h-9

    flex
    items-center
    justify-center

    rounded-full

    backdrop-blur-md

    border

    transition-all
    duration-300

    active:scale-90

    ${
      isWishlisted
        ? `
          bg-white
          border-white
          shadow-lg
          shadow-white/10
        `
        : `
          bg-black/45
          border-white/15
          hover:bg-white
          hover:border-white
        `
    }
  `}
          >
            <Heart
              size={14}
              strokeWidth={1.8}
              className={`
      transition-colors
      duration-300

      ${isWishlisted ? "fill-black text-black" : "text-white hover:text-black"}
    `}
            />
          </button>
        </div>

        {/* Info */}
        <div className="px-3 md:px-4 pt-2 pb-1">
          {/* Category Tag */}
          {product.category && (
            <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#d4af37]/60 mb-1 font-medium">
              {product.category}
            </p>
          )}

          <h4
            className="text-xs md:text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors duration-200"
            title={product.name}
          >
            {product.name}
          </h4>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 mt-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={9}
                    className={
                      i < Math.round(product.rating)
                        ? "fill-[#d4af37] text-[#d4af37]"
                        : "fill-transparent text-gray-700"
                    }
                  />
                ))}
              </div>
              <span className="text-[9px] md:text-[10px] text-gray-600">
                ({product.numReviews || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mt-2 mb-1">
            {offerPrice && offerPrice < price ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm md:text-base font-bold text-[#d4af37]">
                  ₹{offerPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] md:text-[11px] text-gray-600 line-through">
                  ₹{price.toLocaleString("en-IN")}
                </span>
              </div>
            ) : (
              <span className="text-sm md:text-base font-bold text-[#d4af37]">
                ₹{price.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </Link>
      {/* Action Buttons */}
      <div className="px-2.5 sm:px-3 md:px-4 pb-2.5 sm:pb-3 md:pb-4 pt-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Add to Cart */}
          <button
            disabled={stock === 0}
            onClick={() => handlePopupOpen(product, false)}
            className={`
        flex-1
        min-w-0
        h-8
        sm:h-9
        md:h-10
        px-2
        sm:px-3
        rounded-full
        flex
        items-center
        justify-center
        gap-1
        sm:gap-1.5
        text-[8px]
        sm:text-[9px]
        md:text-[11px]
        font-semibold
        uppercase
        tracking-[0.08em]
        sm:tracking-wider
        whitespace-nowrap
        transition-all
        duration-300
        active:scale-[0.97]
        ${
          stock === 0
            ? "opacity-30 cursor-not-allowed bg-white/10 text-white/30"
            : "bg-white text-black hover:bg-gray-200 hover:shadow-lg hover:shadow-white/10"
        }
      `}
          >
            <ShoppingBag
              size={11}
              strokeWidth={2}
              className="shrink-0 sm:w-3 sm:h-3"
            />

            <span className="truncate">Add to Cart</span>
          </button>

          {/* Buy Now */}
          <button
            disabled={stock === 0}
            onClick={() => handlePopupOpen(product, true)}
            className={`
        flex-1
        min-w-0
        h-8
        sm:h-9
        md:h-10
        px-2
        sm:px-3
        rounded-full
        flex
        items-center
        justify-center
        text-[8px]
        sm:text-[9px]
        md:text-[11px]
        font-semibold
        uppercase
        tracking-[0.08em]
        sm:tracking-wider
        whitespace-nowrap
        transition-all
        duration-300
        active:scale-[0.97]
        ${
          stock === 0
            ? "opacity-30 cursor-not-allowed border border-white/10 text-white/30"
            : "border border-white/20 text-white bg-transparent hover:border-white/50 hover:bg-white/5"
        }
      `}
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Size/Color Selection Popup */}
      <AnimatePresence>
        {showSizePopup === product._id && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[#050507]/95 backdrop-blur-md flex flex-col items-center justify-center p-5 z-20"
          >
            <button
              onClick={() => setShowSizePopup(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full border border-[#d4af37]/20 text-[#d4af37]/60 hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-all"
            >
              <X size={14} />
            </button>

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/50 mb-5 font-semibold">
              Select Options
            </p>

            {/* Sizes */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {product.sizes?.length > 0 ? (
                product.sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[38px] px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                      ${
                        selectedSize === size
                          ? "bg-[#d4af37] text-black"
                          : "border border-[#d4af37]/15 text-gray-400 hover:border-[#d4af37]/40 hover:text-white"
                      }`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <button
                  onClick={() => setSelectedSize("Free Size")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                    ${
                      selectedSize === "Free Size"
                        ? "bg-[#d4af37] text-black"
                        : "border border-[#d4af37]/15 text-gray-400 hover:border-[#d4af37]/40"
                    }`}
                >
                  Free Size
                </button>
              )}
            </div>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="flex gap-2.5 mb-6">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full transition-all duration-200
                      ${
                        selectedColor === color
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
                  />
                ))}
              </div>
            )}

            {/* Confirm */}
            <button
              onClick={() => handleAddToCart(product, isBuyNow)}
              className="w-full py-2.5 bg-[#d4af37] text-black rounded-full text-[11px] font-semibold uppercase tracking-wider hover:bg-[#c09b33] hover:shadow-md hover:shadow-[#d4af37]/20 transition-all duration-300"
            >
              {isBuyNow ? "Confirm & Buy" : "Confirm & Add to Cart"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
