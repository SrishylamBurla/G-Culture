import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { useState, useEffect } from "react";
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
    Number(product.offerPrice || product.discountPrice || product.salePrice) || 0;

  const offerPercentage =
    product.offerPercentage ||
    (offerPrice && price > offerPrice
      ? Math.round(((price - offerPrice) / price) * 100)
      : 0);

  const stock = product.countInStock || 0;

  // Add to cart handler
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
      })
    );

    setShowSizePopup(null);

    toast.success(
      redirectAfter
        ? `"${product.name}" added — redirecting...`
        : `"${product.name}" added to cart`
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
    <div className="relative group overflow-hidden rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition-all duration-300">
      <Link to={`/product/${product._id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.images?.[0] || "/images/tee1.svg"}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Offer Badge */}
          {offerPercentage > 0 && (
            <span className="absolute left-3 top-3 bg-white text-black text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {offerPercentage}% Off
            </span>
          )}

          {/* Out of stock overlay */}
          {stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                Out of Stock
              </span>
            </div>
          )}

          {/* Low stock indicator */}
          {stock > 0 && stock <= 5 && (
            <span className="absolute left-3 bottom-3 bg-black/60 backdrop-blur-sm text-amber-400 text-[10px] font-medium px-2.5 py-1 rounded-full">
              Only {stock} left
            </span>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Wishlist button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10
              ${
                isWishlisted
                  ? "bg-white/15 backdrop-blur-sm"
                  : "bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100"
              }`}
          >
            <Heart
              size={15}
              className={
                isWishlisted
                  ? "fill-white text-white"
                  : "text-white"
              }
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          <h4
            className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors duration-200"
            title={product.name}
          >
            {product.name}
          </h4>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className={
                      i < Math.round(product.rating)
                        ? "fill-white text-white"
                        : "fill-transparent text-gray-600"
                    }
                  />
                ))}
              </div>
              <span className="text-[11px] text-gray-500">
                ({product.numReviews || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mt-2">
            {offerPrice && offerPrice < price ? (
              <div className="flex items-baseline gap-2">
                <span className="text-base font-semibold text-white">
                  ₹{offerPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  ₹{price.toLocaleString("en-IN")}
                </span>
              </div>
            ) : (
              <span className="text-base font-semibold text-white">
                ₹{price.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pb-4 flex gap-2">
        <button
          disabled={stock === 0}
          onClick={() => handlePopupOpen(product, false)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200
            ${
              stock === 0
                ? "opacity-30 cursor-not-allowed bg-white/5 text-gray-500"
                : "bg-white text-black hover:bg-gray-200"
            }`}
        >
          <ShoppingBag size={13} />
          Add to Cart
        </button>
        <button
          disabled={stock === 0}
          onClick={() => handlePopupOpen(product, true)}
          className={`flex-1 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200
            ${
              stock === 0
                ? "opacity-30 cursor-not-allowed bg-white/5 text-gray-500"
                : "border border-white/15 text-gray-300 hover:border-white/40 hover:text-white"
            }`}
        >
          Buy Now
        </button>
      </div>

      {/* Size/Color Selection Popup */}
      <AnimatePresence>
        {showSizePopup === product._id && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-5 z-20"
          >
            <button
              onClick={() => setShowSizePopup(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all"
            >
              <X size={14} />
            </button>

            <p className="text-xs uppercase tracking-wider text-gray-400 mb-5">
              Select Size & Color
            </p>

            {/* Sizes */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {product.sizes?.length > 0 ? (
                product.sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                      ${
                        selectedSize === size
                          ? "bg-white text-black"
                          : "border border-white/15 text-gray-300 hover:border-white/40"
                      }`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <button
                  onClick={() => setSelectedSize("Free Size")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                    ${
                      selectedSize === "Free Size"
                        ? "bg-white text-black"
                        : "border border-white/15 text-gray-300 hover:border-white/40"
                    }`}
                >
                  Free Size
                </button>
              )}
            </div>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="flex gap-2 mb-6">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full transition-all duration-200
                      ${
                        selectedColor === color
                          ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                          : "ring-1 ring-white/10 hover:ring-white/30"
                      }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}

            {/* Confirm */}
            <button
              onClick={() => handleAddToCart(product, isBuyNow)}
              className="w-full py-2.5 bg-white text-black rounded-full text-xs font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors duration-200"
            >
              {isBuyNow ? "Confirm & Buy" : "Confirm & Add to Cart"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
