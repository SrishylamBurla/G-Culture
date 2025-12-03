// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// export default function CartPage() {
//   const { cartItems } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const subtotal = cartItems.reduce((sum, item) => {
//     const price = parseFloat(item.offerPrice || item.price) || 0;
//     const qty = parseInt(item.quantity) || 1;
//     return sum + price * qty;
//   }, 0);

//   const handleQuantityChange = (item, newQty) => {
//     if (newQty > 0) {
//       dispatch(updateQuantity({ _id: item._id, quantity: newQty }));
//     }
//   };

//   return (
//     <div className="p-2 md:p-10 min-h-screen pt-[4.5rem] md:pt-[5rem]">
//       <h2 className="text-2xl font-bold text-center text-gray-800 py-4 md:py-6 md:mt-8 tracking-wide">
//         My Shopping Cart
//       </h2>

//       {cartItems.length === 0 ? (
//         <div className="text-center mt-40">
//           <h2 className="text-xl font-semibold text-gray-600 mb-4">Your cart is empty 🛍️</h2>
//           <button
//             onClick={() => navigate("/shop")}
//             className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
//           {/* 🛍️ Cart Items */}
//           <div className="md:col-span-2 space-y-2">
//             {/* <AnimatePresence> */}
//               {cartItems.map((item) => {
//                 const price = parseFloat(item.price) || 0;
//                 const offerPrice = parseFloat(item.offerPrice || item.price) || 0;
//                 const qty = parseInt(item.quantity) || 1;
//                 const total = offerPrice * qty;
//                 const hasDiscount = offerPrice < price;

//                 return (
//                   <motion.div
//                     key={item._id}
//                     initial={{ opacity: 0, x: -150 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     // exit={{ opacity: 0, x: -100 }}
//                     // whileHover={{ scale: 1.01 }}
//                     transition={{ duration: 0.8 }}
//                     onClick={(e) => {
//                       if (!e.target.closest("button")) {
//                         navigate(`/product/${item._id}`);
//                       }
//                     }}
//                     className="flex items-center justify-between bg-gray-200 border border-gray-200 p-3 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
//                   >
//                     <div className="flex items-center gap-2">
//                       <img
//                         src={item.images?.[0] || "/images/tee1.svg"}
//                         alt={item.name}
//                         className="w-20 h-20 object-cover shadow-sm rounded-xs"
//                       />
//                       <div>
//                         <h3 className="font-semibold text-gray-800 text-md">
//                           {item.name || "Unnamed Product"}
//                         </h3>
//                         <div className="mt-1">
//                           {hasDiscount ? (
//                             <>
//                               <span className="line-through text-gray-400 text-sm mr-2">
//                                 ₹{price.toLocaleString("en-IN")}
//                               </span>
//                               <span className="text-amber-600 font-semibold">
//                                 ₹{offerPrice.toLocaleString("en-IN")}
//                               </span>
//                             </>
//                           ) : (
//                             <span className="text-gray-800 font-medium">
//                               ₹{offerPrice.toLocaleString("en-IN")}
//                             </span>
//                           )}
//                         </div>

//                         {/* Quantity Controls */}
//                         <div className="flex items-center gap-2 mt-1">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleQuantityChange(item, item.quantity - 1);
//                             }}
//                             className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition"
//                           >
//                             -
//                           </button>
//                           <span className="text-sm font-semibold text-gray-800">
//                             {qty}
//                           </span>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleQuantityChange(item, item.quantity + 1);
//                             }}
//                             className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition"
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="text-right">
//                       <p className="font-bold text-gray-900">
//                         ₹{total.toLocaleString("en-IN")}
//                       </p>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           dispatch(removeFromCart(item._id));
//                         }}
//                         className="text-red-500 text-sm mt-2 hover:underline hover:scale-105 transition-transform"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             {/* </AnimatePresence> */}
//           </div>

//           {/* ✅ Summary */}
//           <motion.div
//             initial={{ opacity: 0, x: 150 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="bg-gray-200 shadow-lg p-6 border border-gray-200 h-fit sticky top-24"
//           >
//             <h3 className="text-lg font-semibold mb-4 text-gray-800">
//               Order Summary
//             </h3>
//             <div className="flex justify-between text-sm mb-2">
//               <span className="text-gray-800">Subtotal</span>
//               <span className="text-gray-800">₹ {subtotal.toLocaleString("en-IN")}</span>
//             </div>
//             <div className="flex justify-between text-sm mb-2">
//               <span className="text-gray-800">Shipping</span>
//               <span className="text-green-600 font-medium">Free</span>
//             </div>
//             <hr className="my-2" />
//             <div className="flex justify-between font-semibold text-md mb-4">
//               <span className="text-gray-800">Total</span>
//               <span className="text-amber-600">
//                 ₹ {subtotal.toLocaleString("en-IN")}
//               </span>
//             </div>

//             <button
//               onClick={() => navigate("/checkout")}
//               className="w-full py-1 font-semibold text-white bg-gradient-to-b from-[#0a192f] to-[#1d528a] hover:scale-105 transition-transform duration-300"
//             >
//               Proceed to Checkout →
//             </button>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  return (
    <div className="p-3 md:p-10 min-h-screen pt-[4.5rem] md:pt-[5rem] bg-[#f8f9fb]">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 py-4 md:py-6 tracking-wide">
        My Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center mt-32">
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            Your cart is empty 🛍️
          </h2>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 🛍️ Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const price = parseFloat(item.price) || 0;
              const offerPrice = parseFloat(item.offerPrice || item.price) || 0;
              const qty = parseInt(item.quantity) || 1;
              const total = offerPrice * qty;
              const hasDiscount = offerPrice < price;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55 }}
                  onClick={(e) => {
                    if (!e.target.closest("button")) {
                      navigate(`/product/${item._id}`);
                    }
                  }}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images?.[0] || "/images/tee1.svg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md shadow-sm"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-800 text-md leading-tight">
                        {item.name || "Unnamed Product"}
                      </h3>

                      {/* Price */}
                      <div className="mt-1 flex items-center gap-2">
                        {hasDiscount && (
                          <span className="line-through text-gray-400 text-sm">
                            ₹{price.toLocaleString("en-IN")}
                          </span>
                        )}
                        <span className="text-amber-600 text-[15px] font-semibold">
                          ₹{offerPrice.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(item, qty - 1);
                          }}
                          className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 hover:scale-105 transition"
                        >
                          –
                        </button>

                        <span className="text-sm font-semibold text-gray-800 min-w-[20px] text-center">
                          {qty}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(item, qty + 1);
                          }}
                          className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 hover:scale-105 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right pr-2">
                    <p className="font-bold text-gray-900 text-[15px]">
                      ₹{total.toLocaleString("en-IN")}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeFromCart(item._id));
                      }}
                      className="text-red-500 text-xs mt-2 hover:underline hover:scale-105 transition"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 🧾 Summary */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 h-fit sticky top-28"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Order Summary
            </h3>

            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-800">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-semibold text-md mb-4">
              <span className="text-gray-900">Total</span>
              <span className="text-amber-600">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-2 font-semibold text-white rounded-md bg-gradient-to-b from-[#0a192f] to-[#1d528a] hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Proceed to Checkout →
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
