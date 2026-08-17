import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateOrderMutation } from "../features/order/orderApi";
import { MapPin, Package, CreditCard, ShieldCheck, Truck } from "lucide-react";
import {
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayPaymentMutation,
} from "../features/payment/paymentApi";

export default function CheckoutPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [createRazorpayOrder, { isLoading: isPaymentCreating }] =
    useCreateRazorpayOrderMutation();

  const [verifyRazorpayPayment, { isLoading: isPaymentVerifying }] =
    useVerifyRazorpayPaymentMutation();

  const itemsPrice = cartItems.reduce(
    (sum, i) => sum + (i.offerPrice || i.price) * (i.quantity || 1),
    0,
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

    if (!cartItems.length) {
      alert("Your cart is empty");
      return;
    }

    try {
      /*
    ==============================================
    1. Create G-Culture order
    ==============================================
    */

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

        shippingAddress: {
          address,
        },

        paymentMethod: "RAZORPAY",

        itemsPrice,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice,
      };

      const order = await createOrder(orderData).unwrap();

      /*
    ==============================================
    2. Load Razorpay
    ==============================================
    */

      if (!window.Razorpay) {
        alert(
          "Razorpay Checkout is unavailable. Please refresh the page and try again.",
        );
        return;
      }

      const razorpayOrder = await createRazorpayOrder(order._id).unwrap();

      const options = {
        key: razorpayOrder.keyId,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,

        name: "G-Culture",

        description: `Order #${order._id}`,

        order_id: razorpayOrder.orderId,

        prefill: {
          name: userInfo?.name || "",
          email: userInfo?.email || "",
          contact: userInfo?.phone
            ? `+91${String(userInfo.phone).replace(/\D/g, "")}`
            : "",
        },

        notes: {
          orderId: order._id,
        },

        theme: {
          color: "#d4af37",
        },

        handler: async (response) => {
          try {
            await verifyRazorpayPayment({
              orderId: order._id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_order_id: response.razorpay_order_id,

              razorpay_signature: response.razorpay_signature,
            }).unwrap();

            dispatch(clearCart());

            navigate(`/order-success/${order._id}`);
          } catch (error) {
            console.error("PAYMENT VERIFICATION ERROR:", error);

            alert(error?.data?.message || "Payment verification failed.");
          }
        },

        modal: {
          confirm_close: true,

          ondismiss: () => {
            console.log("Razorpay checkout closed");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("RAZORPAY PAYMENT FAILED:", response.error);

        alert(
          response?.error?.description || "Payment failed. Please try again.",
        );
      });

      razorpay.open();
    } catch (err) {
      console.error("CHECKOUT ERROR:", err);

      alert(err?.data?.message || "Unable to start payment. Please try again.");
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
                    Secure payment powered by Razorpay
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 px-4 py-4 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                    <CreditCard size={16} className="text-[#d4af37]" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">Razorpay</p>

                    <p className="text-xs text-gray-500 mt-1">
                      UPI · Cards · Net Banking · Wallets
                    </p>
                  </div>
                </div>

                <div className="w-5 h-5 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
                </div>
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
                        (item.offerPrice || item.price) * (item.quantity || 1)
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

              <button
                onClick={handlePlace}
                disabled={isLoading || isPaymentCreating || isPaymentVerifying}
                className={`w-full py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isLoading || isPaymentCreating || isPaymentVerifying
                    ? "bg-[#d4af37]/30 text-[#d4af37]/50 cursor-not-allowed"
                    : "bg-[#d4af37] text-black hover:bg-[#c09b33] hover:shadow-lg hover:shadow-[#d4af37]/20"
                }`}
              >
                {isLoading
                  ? "Creating Order..."
                  : isPaymentCreating
                    ? "Preparing Payment..."
                    : isPaymentVerifying
                      ? "Verifying Payment..."
                      : `Pay ₹${totalPrice.toLocaleString("en-IN")}`}
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
