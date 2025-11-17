// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import API from "../api/axios";
// import { addToCart } from "../features/cart/cartSlice";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";

// export default function ProductPage() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const productFromStore = useSelector((state) =>
//     state.products.items.find((p) => p._id === id)
//   );

//   const [product, setProduct] = useState(productFromStore || null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");

//   useEffect(() => {
//     if (!product && !productFromStore) {
//       API.get(`/products/${id}`)
//         .then((res) => setProduct(res.data))
//         .catch(() => {});
//     }
//   }, [id, product, productFromStore]);

//   if (!product) return <div className="p-8 text-center">Loading...</div>;

//   const countInStock = product.countInStock || 0;

//   // ✅ Stock-safe quantity update
//   const handleQuantityChange = (type) => {
//     if (type === "decrease") {
//       setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//     } else if (type === "increase") {
//       if (quantity < countInStock) {
//         setQuantity((prev) => prev + 1);
//       } else {
//         toast.error(`Only ${countInStock} item${countInStock > 1 ? "s" : ""} in stock.`, {
//           duration: 2000,
//         });
//       }
//     }
//   };

//   // ✅ Add to Cart with stock validation
//   const handleAddToCart = () => {
//     if (product.sizes?.length && !selectedSize)
//       return toast.error("Please select a size.");
//     if (product.colors?.length && !selectedColor)
//       return toast.error("Please select a color.");

//     if (quantity > countInStock) {
//       toast.error(`Only ${countInStock} available in stock.`);
//       return;
//     }

//     dispatch(addToCart({ ...product, quantity, selectedSize, selectedColor }));

//     toast.success("🛒 Added to cart successfully!", {
//       duration: 2500,
//       style: {
//         borderRadius: "10px",
//         background: "#333",
//         color: "#fff",
//         fontSize: "14px",
//       },
//       iconTheme: {
//         primary: "#10B981",
//         secondary: "#fff",
//       },
//     });
//   };

//   const fadeIn = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   return (
//     <div className="py-10 bg-gradient-to-t from-[#fff] to-[#3e1244] pt-[6rem] md:pt-[7rem]">
//       <div className="flex flex-col lg:flex-row gap-10 px-4 md:px-12">
//         {/* LEFT IMAGE SECTION */}
//         <motion.div
//           className="w-full lg:w-[60%] grid grid-cols-2 gap-3"
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//         >
//           {product.images?.slice(0, 4).map((img, i) => (
//             <motion.img
//               key={i}
//               src={img}
//               alt={product.name}
//               className="shadow-sm hover:shadow-md object-cover w-full h-[500px] transition-transform duration-500 hover:scale-[1.03]"
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//             />
//           ))}
//         </motion.div>

//         {/* RIGHT DETAILS SECTION */}
//         <motion.div
//           className="w-full lg:w-[35%] space-y-6"
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//           transition={{ delay: 0.2 }}
//         >
//           <div>
//             <p className="text-xs uppercase tracking-widest text-gray-500">
//               {product.category}
//             </p>
//             <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight mt-1">
//               {product.name}
//             </h1>
//             <p className="mt-2 text-lg text-gray-700">
//               {product.offerPrice && product.offerPrice < product.price ? (
//                 <>
//                   <span className="line-through text-gray-400 mr-2">
//                     ₹{product.price.toLocaleString("en-IN")}
//                   </span>
//                   <span className="text-black font-semibold">
//                     ₹{product.offerPrice.toLocaleString("en-IN")}
//                   </span>
//                   <span className="ml-2 text-green-600 text-sm">
//                     ({Math.round(
//                       ((product.price - product.offerPrice) / product.price) * 100
//                     )}
//                     % OFF)
//                   </span>
//                 </>
//               ) : (
//                 <>₹{product.price.toLocaleString("en-IN")}</>
//               )}
//             </p>
//             <p className="text-xs text-gray-400 mt-1">Incl. of all taxes</p>
//             {/* 🧮 Stock Indicator */}
//             {countInStock > 0 ? (
//               <p
//                 className={`text-xs mt-2 ${
//                   countInStock <= 5
//                     ? "text-red-600"
//                     : countInStock <= 10
//                     ? "text-amber-500"
//                     : "text-green-600"
//                 }`}
//               >
//                 {countInStock <= 5
//                   ? `⚠️ Only ${countInStock} left in stock`
//                   : `${countInStock} available`}
//               </p>
//             ) : (
//               <p className="text-xs text-red-600 font-semibold mt-2">
//                 Out of stock
//               </p>
//             )}
//           </div>

//           {/* SIZE Selector */}
//           {product.sizes?.length > 0 && (
//             <div>
//               <p className="font-medium mb-2 text-sm text-gray-700">Size</p>
//               <div className="flex flex-wrap gap-3">
//                 {product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`border rounded-md w-10 h-10 flex items-center justify-center text-sm transition-all duration-200 ${
//                       selectedSize === size
//                         ? "border-gray-800 bg-gray-900 text-white"
//                         : "border-gray-300 hover:border-gray-800"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* COLOR Options */}
//           {product.colors?.length > 0 && (
//             <div>
//               <p className="font-medium mb-2 text-sm text-gray-700">Color</p>
//               <div className="flex gap-3">
//                 {product.colors.map((color, i) => (
//                   <motion.div
//                     key={i}
//                     onClick={() => setSelectedColor(color)}
//                     className={`w-9 h-9 rounded-md border cursor-pointer transition-all ${
//                       selectedColor === color
//                         ? "border-gray-900 ring-2 ring-gray-400"
//                         : "border-gray-300 hover:ring-1 hover:ring-gray-200"
//                     }`}
//                     style={{ backgroundColor: color }}
//                     whileHover={{ scale: 1.1 }}
//                   ></motion.div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Quantity Selector + Stock Info */}
//           <div className="flex flex-col gap-2 mt-4">
//             <div className="flex items-center gap-3">
//               <p className="font-medium text-sm text-gray-700">Quantity</p>
//               <div className="flex items-center border border-gray-300 rounded">
//                 <button
//                   onClick={() => handleQuantityChange("decrease")}
//                   className="px-3 py-1 hover:bg-gray-100"
//                 >
//                   -
//                 </button>
//                 <span className="px-4">{quantity}</span>
//                 <button
//                   onClick={() => handleQuantityChange("increase")}
//                   className="px-3 py-1 hover:bg-gray-100"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-4 mt-6">
//             <motion.button
//               onClick={handleAddToCart}
//               disabled={countInStock === 0}
//               className={`flex-1 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
//                 countInStock === 0
//                   ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-800"
//               }`}
//               whileHover={countInStock > 0 ? { scale: 1.02 } : {}}
//             >
//               Add to Cart
//             </motion.button>
//             <motion.button
//               disabled={countInStock === 0}
//               className={`flex-1 py-2 text-sm uppercase tracking-wider border transition-all duration-300 ${
//                 countInStock === 0
//                   ? "border-gray-300 text-gray-400 cursor-not-allowed"
//                   : "border-black hover:bg-gray-100"
//               }`}
//               whileHover={countInStock > 0 ? { scale: 1.02 } : {}}
//             >
//               Buy Now
//             </motion.button>
//           </div>

//           {/* Expandable Sections */}
//           <div className="border-t border-gray-200 pt-4 space-y-4 text-sm text-gray-600">
//             {[
//               { title: "Description", content: product.description },
//               {
//                 title: "Manufacturer Details",
//                 content:
//                   "Crafted with premium materials ensuring comfort and durability.",
//               },
//               {
//                 title: "Shipping, Return & Exchange",
//                 content:
//                   "Free shipping on all orders. Easy 7-day return or exchange.",
//               },
//             ].map((section, i) => (
//               <motion.details
//                 key={i}
//                 className="group"
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//                 viewport={{ once: true }}
//               >
//                 <summary className="cursor-pointer font-medium text-gray-700 hover:text-black">
//                   {section.title}
//                 </summary>
//                 <p className="mt-2 text-gray-500">{section.content}</p>
//               </motion.details>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import API from "../api/axios";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productFromStore = useSelector((state) =>
    state.products.items.find((p) => p._id === id)
  );

  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [product, setProduct] = useState(productFromStore || null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImg, setSelectedImg] = useState("");

  const isWishlisted = product
    ? wishlist.some((i) => i._id === product._id)
    : false;

  // ─────────────────────────────── LOAD PRODUCT ───────────────────────────────
  useEffect(() => {
    if (!product && !productFromStore) {
      API.get(`/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch(() => {});
    }
  }, [id, product, productFromStore]);

  if (!product)
    return <div className="p-8 text-center text-white">Loading...</div>;

  const countInStock = product.countInStock || 0;

  // ─────────────────────────────── QUANTITY ───────────────────────────────
  const handleQuantityChange = (type) => {
    if (type === "decrease") {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    } else if (type === "increase") {
      if (quantity < countInStock) {
        setQuantity((prev) => prev + 1);
      } else {
        toast.error(`Only ${countInStock} in stock`, { duration: 2000 });
      }
    }
  };

  // ─────────────────────────────── VALIDATION ───────────────────────────────
  const validateSelection = () => {
    if (product.sizes?.length && !selectedSize) {
      toast.error("Please select a size");
      return false;
    }
    if (product.colors?.length && !selectedColor) {
      toast.error("Please select a color");
      return false;
    }
    return true;
  };

  // ─────────────────────────────── ADD TO CART ───────────────────────────────
  const handleAddToCart = () => {
    if (!validateSelection()) return;

    dispatch(addToCart({ ...product, quantity, selectedSize, selectedColor }));

    toast.success("🛒 Added to cart!", {
      duration: 2000,
      style: {
        borderRadius: "10px",
        background: "#222",
        color: "#fff",
      },
    });
  };

  // ─────────────────────────────── BUY NOW ───────────────────────────────
  const handleBuyNow = () => {
    if (!validateSelection()) return;

    dispatch(addToCart({ ...product, quantity, selectedSize, selectedColor }));

    toast.success("Redirecting to checkout…", {
      duration: 1500,
    });

    setTimeout(() => navigate("/checkout"), 800);
  };

  // ─────────────────────────────── WISHLIST ───────────────────────────────
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  // ─────────────────────────────── UI ───────────────────────────────

  return (
    <div
      className="pt-[6rem] md:pt-[7rem] min-h-screen
      bg-[#001424] text-white py-6
      bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')]
      bg-repeat opacity-[0.97]"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 px-4 md:px-10">
        {/* LEFT SECTION – IMAGES */}
        <div className="w-full lg:w-[52%] flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 w-20 sticky top-32 h-fit">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImg(img)}
                className={`w-full h-20 rounded-md object-cover cursor-pointer transition-all
                ${
                  selectedImg === img
                    ? "ring-2 ring-white scale-[1.02]"
                    : "hover:opacity-80"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={selectedImg || product.images?.[0]}
              className="w-full h-[580px] object-cover rounded-xl shadow-md hover:scale-[1.02] transition duration-300"
            />
          </div>
        </div>

        {/* RIGHT SECTION – DETAILS */}
        <div className="w-full lg:w-[40%] space-y-6 pb-10">
          {/* Title + Wishlist */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold">{product.name}</h1>
              <p className="text-sm text-gray-300 mt-1">{product.category}</p>
            </div>

            <button
              onClick={handleToggleWishlist}
              className="text-3xl hover:scale-110 transition"
            >
              {isWishlisted ? "💖" : "🤍"}
            </button>
          </div>

          {/* PRICE */}
          <div>
            {product.offerPrice && product.offerPrice < product.price ? (
              <div className="flex items-center gap-3">
                <p className="text-3xl font-bold text-white">
                  ₹{product.offerPrice.toLocaleString("en-IN")}
                </p>
                <p className="line-through text-gray-500">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <p className="text-green-400 font-semibold">
                  {Math.round(
                    ((product.price - product.offerPrice) / product.price) * 100
                  )}
                  % OFF
                </p>
              </div>
            ) : (
              <p className="text-3xl font-bold">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            )}
            <p className="text-xs text-gray-400">Inclusive of all taxes</p>
          </div>

          {/* SIZE */}
          {product.sizes?.length > 0 && (
            <div>
              <p className="font-semibold mb-3 text-gray-200">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center rounded-md border text-sm
                    ${
                      selectedSize === size
                        ? "bg-white text-black border-white scale-[1.05]"
                        : "border-gray-400 hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* COLORS */}
          {product.colors?.length > 0 && (
            <div>
              <p className="font-semibold mb-3 text-gray-200">Color</p>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-10 h-10 rounded-md cursor-pointer border
                    ${
                      selectedColor === c
                        ? "border-white ring-1 ring-gray-200"
                        : "border-gray-400 hover:border-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector + Stock Info */}
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-3">
              <p className="font-medium text-sm text-gray-200">Quantity</p>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="px-3 py-1 hover:bg-gray-100 hover:text-gray-800"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="px-3 py-1 hover:bg-gray-100 hover:text-gray-800"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900"
            >
              Add to Bag
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 py-3 border border-gray-400 text-gray-200 rounded-lg font-medium hover:bg-gray-100 hover:text-black"
            >
              Buy Now
            </button>
          </div>

          {/* DESCRIPTION */}
          <div className="pt-6 border-t border-gray-600">
            <p className="font-semibold text-white mb-2">Product Details</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
