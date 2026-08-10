import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateOrderMutation } from "../features/order/orderApi";
import { MapPin, Package, CreditCard, ShieldCheck, Truck } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const itemsPrice = cartItems.reduce(
    (sum, i) => sum + (i.offerPrice || i.price) * (i.quantity || 1),
    0
  );
  const totalPrice = itemsPrice;

  const handlePlace = async () => {
    if (!userInfo?.token) {
      alert("You must be logged in to place an order");
      navigate("/login");
      return;
    }

    if (!address.trim()) {
      alert("Please enter a shipping address");
      return;
    }

    const orderData = {
      orderItems: cartItems.map((i) => ({
        product: i._id || i.product,
        name: i.name,
        qty: i.quantity || 1,
        price: i.offerPrice || i.price,
        image: i.images?.[0] || i.image,
        selectedSize: i.selectedSize || "",
        selectedColor: i.selectedColor || "",
      })),
      shippingAddress: { address },
      paymentMethod: "COD",
      itemsPrice,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice,
    };

    try {
      const result = await createOrder(orderData).unwrap();
      dispatch(clearCart());
      navigate(`/order-success/${result._id}`);
    } catch (err) {
      alert(err?.data?.message || "Failed to place order. Try again.");
      console.error("ORDER ERROR:", err);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#050507] text-white pt-28 md:pt-32 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
            Checkout
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Complete Your Order
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* LEFT — Shipping + Items */}
          <div className="lg:col-span-3 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <MapPin size={16} className="text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    Shipping Address
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-white/[0.04] border border-[#d4af37]/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 resize-none h-28 outline-none focus:border-[#d4af37]/30 transition-colors duration-200"
                placeholder="Enter your full shipping address..."
              />
            </div>

            {/* Payment Method */}
            <div className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <CreditCard size={16} className="text-[#d4af37]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    Payment Method
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    How would you like to pay?
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3.5 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl">
                <div className="w-4 h-4 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                </div>
                <span className="text-sm font-medium text-[#d4af37]">
                  Cash on Delivery (COD)
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                  <Package size={16} className="text-[#d4af37]" />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Order Items
                </h3>
              </div>

              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item._id || item.product}
                    className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl"
                  >
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/[0.04] flex-shrink-0">
                      <img
                        src={item.images?.[0] || item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {[
                          item.selectedSize && `Size: ${item.selectedSize}`,
                          item.selectedColor && `Color: ${item.selectedColor}`,
                          `Qty: ${item.quantity || 1}`,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>

                    {/* Item Price */}
                    <p className="text-sm font-semibold text-[#d4af37] flex-shrink-0">
                      ₹
                      {(
                        (item.offerPrice || item.price) *
                        (item.quantity || 1)
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-32 bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-6 space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{itemsPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-400 text-xs font-medium">
                    FREE
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>

                <div className="border-t border-[#d4af37]/10 pt-3 flex justify-between">
                  <span className="font-semibold text-white">Total</span>
                  <span className="text-lg font-bold text-[#d4af37]">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlace}
                disabled={isLoading}
                className={`w-full py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isLoading
                    ? "bg-[#d4af37]/30 text-[#d4af37]/50 cursor-not-allowed"
                    : "bg-[#d4af37] text-black hover:bg-[#c09b33] hover:shadow-lg hover:shadow-[#d4af37]/20"
                }`}
              >
                {isLoading ? "Placing Order..." : "Place Order"}
              </button>

              {/* Trust Badges */}
              <div className="space-y-3 pt-3 border-t border-white/5">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <ShieldCheck size={14} className="text-[#d4af37]/40" />
                  <span>Secure checkout — your data is protected</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Truck size={14} className="text-[#d4af37]/40" />
                  <span>Free shipping on all orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
