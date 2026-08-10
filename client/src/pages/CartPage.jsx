import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.offerPrice || item.price) || 0;
    const qty = parseInt(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const handleQuantityChange = (item, newQty) => {
    if (newQty > 0) {
      dispatch(updateQuantity({ _id: item._id, quantity: newQty }));
    }
  };

  /* ---------- EMPTY CART ---------- */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#050507] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6">
          <ShoppingBag size={24} className="text-gray-500" />
        </div>

        <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
          Your cart is empty
        </h2>

        <p className="text-sm text-gray-500 mb-8">
          Add items to get started.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="bg-white text-black px-8 py-3 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors duration-200"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  /* ---------- CART WITH ITEMS ---------- */
  return (
    <div className="min-h-screen bg-[#050507] text-white pt-28 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
            Review
          </p>
          <div className="flex items-baseline justify-between">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Shopping Cart
            </h1>
            <span className="text-sm text-gray-500">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {cartItems.map((item, index) => {
              const price = parseFloat(item.price) || 0;
              const offerPrice = parseFloat(item.offerPrice || item.price) || 0;
              const qty = parseInt(item.quantity) || 1;
              const total = offerPrice * qty;
              const hasDiscount = offerPrice < price;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={(e) => {
                    if (!e.target.closest("button")) {
                      navigate(`/product/${item._id}`);
                    }
                  }}
                  className="flex items-center gap-4 md:gap-6 bg-white/[0.02] border border-white/[0.06] hover:border-white/15 rounded-lg p-4 transition-all duration-200 cursor-pointer"
                >
                  {/* Image */}
                  <img
                    src={item.images?.[0] || "/images/tee1.svg"}
                    alt={item.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-medium text-gray-200 truncate">
                      {item.name || "Unnamed Product"}
                    </h3>

                    {/* Variants */}
                    <div className="flex items-center gap-3 mt-1">
                      {item.selectedSize && (
                        <span className="text-[11px] text-gray-500 uppercase tracking-wider">
                          Size: {item.selectedSize}
                        </span>
                      )}
                      {item.selectedColor && (
                        <span className="flex items-center gap-1 text-[11px] text-gray-500 uppercase tracking-wider">
                          Color:
                          <span
                            className="w-3 h-3 rounded-full inline-block ring-1 ring-white/10"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-sm font-semibold text-white">
                        ₹{offerPrice.toLocaleString("en-IN")}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-gray-500 line-through">
                          ₹{price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* Quantity — mobile */}
                    <div className="flex items-center gap-3 mt-3 md:hidden">
                      <div className="inline-flex items-center border border-white/15 rounded-full">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(item, qty - 1);
                          }}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-medium min-w-[28px] text-center">
                          {qty}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(item, qty + 1);
                          }}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(removeFromCart(item._id));
                        }}
                        className="p-2 rounded-full border border-white/10 text-gray-500 hover:text-white hover:border-white/30 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Right side — desktop */}
                  <div className="hidden md:flex items-center gap-6">
                    {/* Quantity */}
                    <div className="inline-flex items-center border border-white/15 rounded-full">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(item, qty - 1);
                        }}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 text-sm font-medium min-w-[36px] text-center">
                        {qty}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(item, qty + 1);
                        }}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Total */}
                    <p className="text-sm font-semibold text-white min-w-[80px] text-right">
                      ₹{total.toLocaleString("en-IN")}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeFromCart(item._id));
                      }}
                      className="p-2 rounded-full border border-white/10 text-gray-500 hover:text-white hover:border-white/30 transition-all duration-200"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-fit lg:sticky lg:top-32"
          >
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-200">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-400 text-xs font-medium">Free</span>
                </div>
              </div>

              <div className="border-t border-white/[0.06] pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-300">Total</span>
                  <span className="text-lg font-bold text-white">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black rounded-full text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors duration-200"
              >
                Checkout
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => navigate("/shop")}
                className="w-full mt-3 py-3 border border-white/15 rounded-full text-xs font-medium uppercase tracking-wider text-gray-400 hover:text-white hover:border-white/40 transition-all duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
