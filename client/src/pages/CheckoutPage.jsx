


// import { useSelector, useDispatch } from "react-redux";
// import { createOrder } from "../features/order/orderSlice";
// import { clearCart } from "../features/cart/cartSlice";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function CheckoutPage() {
//   const { cartItems } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [address, setAddress] = useState("");

//   const itemsPrice = cartItems.reduce(
//     (sum, i) => sum + (i.offerPrice || i.price) * (i.quantity || 1),
//     0
//   );
//   const totalPrice = itemsPrice;

//   const handlePlace = async () => {
//     if (!address.trim()) {
//       alert("Please enter a shipping address");
//       return;
//     }

//     const orderData = {
//       orderItems: cartItems.map((i) => ({
//         product: i._id || i.product,
//         name: i.name,
//         qty: i.quantity || 1,
//         price: i.offerPrice || i.price,
//         image: i.images?.[0] || i.image,
//         selectedSize: i.selectedSize || "",
//         selectedColor: i.selectedColor || "",
//       })),
//       shippingAddress: { address },
//       paymentMethod: "COD",
//       itemsPrice,
//       taxPrice: 0,
//       shippingPrice: 0,
//       totalPrice,
//     };

//     try {
//       const result = await dispatch(createOrder(orderData)).unwrap();
//       dispatch(clearCart());
//       navigate(`/order-success/${result._id}`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to place order. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-8 space-y-6">
//       <h2 className="text-2xl font-bold mb-4">Checkout</h2>

//       {/* Shipping Address */}
//       <div className="mb-4">
//         <label className="block mb-2 font-medium">Shipping Address</label>
//         <textarea
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           className="border p-2 w-full h-24 resize-none"
//           placeholder="Enter your shipping address"
//         />
//       </div>

//       {/* Order Summary */}
//       <div className="mb-6">
//         <h3 className="font-semibold mb-2">Order Summary</h3>
//         <ul className="space-y-4">
//           {cartItems.map((item) => (
//             <li
//               key={item._id || item.product}
//               className="border p-4 rounded space-y-1"
//             >
//               <div className="flex justify-between">
//                 <span className="font-medium">{item.name}</span>
//                 <span>
//                   ₹ {(item.offerPrice || item.price).toLocaleString("en-IN")}
//                 </span>
//               </div>

//               <div className="text-sm text-gray-600">
//                 {item.selectedSize && <span>Size: {item.selectedSize}</span>}
//                 {item.selectedSize && item.selectedColor && <span> | </span>}
//                 {item.selectedColor && <span>Color: {item.selectedColor}</span>}
//                 {(item.selectedSize || item.selectedColor) && <span> | </span>}
//                 <span>Quantity: {item.quantity || 1}</span>
//               </div>
//               {/* <div className="text-sm text-gray-600">
//                 {[
//                   item.selectedSize ? `Size: ${item.selectedSize}` : null,
//                   item.selectedColor ? `Color: ${item.selectedColor}` : null,
//                   `Quantity: ${item.quantity || 1}`,
//                 ]
//                   .filter(Boolean) // remove null/empty values
//                   .join(" | ")}
//               </div> */}
//             </li>
//           ))}
//         </ul>
//         <p className="mt-4 font-semibold text-lg">
//           Total: ₹ {totalPrice.toLocaleString("en-IN")}
//         </p>
//       </div>

//       <button
//         onClick={handlePlace}
//         className="px-6 py-3 bg-black text-white rounded hover:bg-gray-900 transition"
//       >
//         Place Order (COD)
//       </button>
//     </div>
//   );
// }


import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const itemsPrice = cartItems.reduce(
    (sum, i) => sum + (i.offerPrice || i.price) * (i.quantity || 1),
    0
  );
  const totalPrice = itemsPrice;

  const handlePlace = async () => {
    if (!userInfo || !userInfo.token) {
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
      const result = await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      navigate(`/order-success/${result._id}`);
    } catch (err) {
      console.error(err);
      alert(
        err?.message ||
          "Failed to place order. Please check your login and try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Shipping Address */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Shipping Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 shadow-sm p-2 w-full h-24 resize-none"
          placeholder="Enter your shipping address"
        />
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item._id || item.product}
              className="border border-gray-300 shadow-sm p-4 space-y-1"
            >
              <div className="flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span>
                  ₹ {(item.offerPrice*item.quantity || item.price*item.quantity).toLocaleString("en-IN")}
                </span>
              </div>

              {/* Only show selected size, color, and quantity */}
              <div className="text-sm text-gray-600">
                {[item.selectedSize && `Size: ${item.selectedSize}`,
                  item.selectedColor && `Color: ${item.selectedColor}`,
                  `Quantity: ${item.quantity || 1}`]
                  .filter(Boolean)
                  .join(" | ")}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-semibold text-lg">
          Total: ₹ {totalPrice.toLocaleString("en-IN")}
        </p>
      </div>

      <button
        onClick={handlePlace}
        className="px-6 py-3 bg-black text-white rounded hover:scale-105 transition duration-300 hover:bg-gradient-to-t from-[#1C1F26] to-[#1E3A5F]"
      >
        Place Order (COD)
      </button>
    </div>
  );
}
