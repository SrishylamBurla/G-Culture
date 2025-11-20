import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useCreateOrderMutation } from "../features/order/orderApi"; // ✅ RTK Query hook

export default function CheckoutPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  // ✅ RTK Query mutation hook
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
      // ✅ RTK Query request
      const result = await createOrder(orderData).unwrap();

      dispatch(clearCart());
      navigate(`/order-success/${result._id}`);
    } catch (err) {
      alert(err?.data?.message || "Failed to place order. Try again.");
      console.error("ORDER ERROR:", err);
    }
  };

  return (
    <div className="container mx-auto p-8 space-y-6 pt-[5rem] md:pt-[7rem]">
      <h2 className="text-2xl font-bold mb-4 text-black">Checkout</h2>

      {/* Shipping Address */}
      <div className="mb-4">
        <label className="block mb-2 font-medium text-black">Shipping Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-600 shadow-sm text-gray-800 p-2 w-full h-24 resize-none"
          placeholder="Enter your shipping address"
        />
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-black">Order Summary</h3>
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item._id || item.product}
              className="border border-gray-300 text-gray-800 shadow-sm p-4 space-y-1"
            >
              <div className="flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span>
                  ₹{" "}
                  {(
                    item.offerPrice * item.quantity ||
                    item.price * item.quantity
                  ).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="text-sm text-gray-600">
                {[
                  item.selectedSize && `Size: ${item.selectedSize}`,
                  item.selectedColor && `Color: ${item.selectedColor}`,
                  `Quantity: ${item.quantity || 1}`,
                ]
                  .filter(Boolean)
                  .join(" | ")}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-4 font-semibold text-lg text-gray-800">
          Total: ₹ {totalPrice.toLocaleString("en-IN")}
        </p>
      </div>

      <button
        onClick={handlePlace}
        disabled={isLoading}
        className="px-6 py-3 bg-black text-white rounded hover:scale-105 transition duration-300 hover:bg-gradient-to-t from-[#1C1F26] to-[#1E3A5F]"
      >
        {isLoading ? "Placing Order..." : "Place Order (COD)"}
      </button>
    </div>
  );
}
