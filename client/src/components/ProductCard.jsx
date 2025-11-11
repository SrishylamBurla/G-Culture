import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { useState, useEffect } from "react";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  const cartItem = cartItems.find((i) => i._id === product._id);
  const quantity = cartItem ? cartItem.quantity : 1;
  const [localQty, setLocalQty] = useState(quantity);
  const [showSizePopup, setShowSizePopup] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isBuyNow, setIsBuyNow] = useState(false);

  const isWishlisted = wishlist.some((i) => i._id === product._id);
  const isInCart = !!cartItem;

  const price = Number(product.price) || 0;
  const offerPrice =
    Number(product.offerPrice || product.discountPrice || product.salePrice) ||
    0;

  const offerPercentage =
    product.offerPercentage ||
    (offerPrice && price > offerPrice
      ? Math.round(((price - offerPrice) / price) * 100)
      : 0);

  const colorArray = Array.isArray(product.colors)
    ? product.colors
    : product.colors
    ? [product.colors]
    : ["#ccc"];

  // 🧮 Stock Status Display Logic
  const stock = product.countInStock || 0;
  let stockMessage = "";
  let stockColor = "text-gray-500";

  if (stock > 10) {
    stockMessage = "In stock";
    stockColor = "text-green-600";
  } else if (stock > 5) {
    stockMessage = `Only ${stock} left`;
    stockColor = "text-amber-500";
  } else if (stock > 0) {
    stockMessage = `⚠️ Only ${stock} left in stock!`;
    stockColor = "text-red-600 font-semibold";
  } else {
    stockMessage = "Out of stock";
    stockColor = "text-red-500 font-semibold";
  }

  // 🛒 Common Add to Cart handler
  const handleAddToCart = (product, redirectAfter = false) => {
    if (!selectedSize) {
      toast.error("Please select a size before continuing.");
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
        ? `🛍️ "${product.name}" added — redirecting to checkout...`
        : `🛒 "${product.name}" added to cart successfully!`,
      {
        duration: 2500,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          fontSize: "14px",
          padding: "12px 18px",
        },
        iconTheme: {
          primary: "#10B981",
          secondary: "#fff",
        },
      }
    );

    if (redirectAfter) {
      setTimeout(() => navigate("/cart"), 1200);
    }
  };

  // 🧠 Trigger popup for Add or Buy Now
  const handlePopupOpen = (product, isBuy = false) => {
    setIsBuyNow(isBuy);
    setShowSizePopup(product._id);
    setSelectedColor("");
    setSelectedSize("");
  };

  // 🧠 Wishlist toggle
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  useEffect(() => {
    setLocalQty(quantity);
  }, [quantity]);

  return (
    <div className="relative bg-white overflow-hidden group transition-all duration-500 ease-out transform shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)]">
      <Link to={`/product/${product._id}`} className="block relative">
        <div className="relative overflow-hidden">
          <img
            src={product.images?.[0] || "/images/tee1.svg"}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {offerPercentage > 0 && (
          <span className="absolute left-2 top-2 bg-gradient-to-r from-[#0f6ed4] via-[#a01cb2] to-[#de8328] text-white px-2 py-1 text-xs font-bold shadow-md">
            {offerPercentage}% Off
          </span>
        )}

        <div className="p-0.5 text-center bg-amber-50">
          <h4
            className="text-sm font-semibold uppercase tracking-wide text-gray-800 truncate w-full transition-all duration-300"
            title={product.name}
          >
            {product.name}
          </h4>

          {/* 💰 Price */}
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
              <p className="text-sm font-semibold text-gray-900">
                ₹{price.toLocaleString("en-IN")}
              </p>
            )}
          </div>

          {/* 🎨 Colors */}
          {/* <div className="flex justify-center gap-1 p-1.5">
            {colorArray.slice(0, 4).map((clr, i) => (
              <span
                key={i}
                className="w-4 h-4 shadow-sm"
                style={{ backgroundColor: clr }}
              />
            ))}
            {colorArray.length > 4 && (
              <span className="text-[11px] text-gray-400 ml-1">
                +{colorArray.length - 4}
              </span>
            )}
          </div> */}

          {/* 🧮 Stock Indicator Section */}
          {stockMessage && (
            <div className="text-center p-0.5">
              <p className={`text-[12px] ${stockColor}`}>{stockMessage}</p>
            </div>
          )}
        </div>
      </Link>

      {/* 🧩 Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch gap-2 px-3 pb-4 pt-0.5 bg-amber-50">
        <button
          disabled={stock === 0}
          onClick={() => handlePopupOpen(product, false)}
          className={`flex-1 py-0.5 text-sm font-medium transition-all duration-300 ${
            stock === 0
              ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600"
              : "bg-gradient-to-r from-[#0a192f] via-[#1d528a] to-[#0a192f] text-white hover:scale-[1.03]"
          }`}
        >
          Add to Cart
        </button>
        <button
          disabled={stock === 0}
          onClick={() => handlePopupOpen(product, true)}
          className={`flex-1 py-0.5 text-sm font-medium transition-all duration-300 ${
            stock === 0
              ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600"
              : "bg-gradient-to-r from-[#1c043f] via-[#9b6bde] to-[#1c043f] text-white hover:scale-[1.03]"
          }`}
        >
          Buy Now
        </button>
      </div>

      {/* 🎯 Popup for Size/Color */}
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
                  className={`w-6 h-6 border cursor-pointer ${
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
              onClick={() => handleAddToCart(product, isBuyNow)}
              className="bg-white text-black px-4 py-1.5 rounded hover:bg-gray-200 text-sm"
            >
              {isBuyNow ? "Confirm & Buy" : "Confirm Add"}
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

      {/* ❤️ Wishlist */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 transition-transform duration-300 hover:scale-110"
      >
        <img
          src={
            isWishlisted
              ? "/images/wishlisted.png"
              : "/images/tobewishlisted.png"
          }
          alt="wishlist"
          className="w-8 h-6 mix-blend-multiply"
        />
      </button>
    </div>
  );
}
