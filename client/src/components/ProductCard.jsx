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
        duration: 1500,
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
            className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110"
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


// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleWishlist } from "../features/wishlist/wishlistSlice";
// import { useState, useEffect, useRef } from "react";
// import { addToCart } from "../features/cart/cartSlice";
// import toast from "react-hot-toast";

// // Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Keyboard, Navigation, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/effect-fade";

// /**
//  * Premium ProductCard — Rare.com style
//  * - Hover starts autoplay (desktop)
//  * - Thumbnails on left (desktop)
//  * - Swipe on mobile
//  * - Quick action overlay on hover
//  *
//  * Props:
//  * - product (object) — must contain `images` array, price, offerPrice, sizes, colors, _id, name, rating...
//  */

// export default function ProductCard({ product }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { wishlist } = useSelector((state) => state.wishlist);
//   const { cartItems } = useSelector((state) => state.cart);

//   const cartItem = cartItems.find((i) => i._id === product._id);
//   const initialQty = cartItem ? cartItem.quantity : 1;

//   // local state
//   const [localQty, setLocalQty] = useState(initialQty);
//   const [showSizePopup, setShowSizePopup] = useState(null);
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [isBuyNow, setIsBuyNow] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const isWishlisted = wishlist.some((i) => i._id === product._id);
//   const isInCart = !!cartItem;

//   const price = Number(product.price) || 0;
//   const offerPrice = Number(product.offerPrice || product.discountPrice || product.salePrice) || 0;

//   const offerPercentage =
//     product.offerPercentage ||
//     (offerPrice && price > offerPrice ? Math.round(((price - offerPrice) / price) * 100) : 0);

//   const stock = product.countInStock || 0;
//   let stockMessage = "";
//   let stockColor = "text-gray-500";

//   if (stock > 10) {
//     stockMessage = "In stock";
//     stockColor = "text-green-600";
//   } else if (stock > 5) {
//     stockMessage = `Only ${stock} left`;
//     stockColor = "text-amber-500";
//   } else if (stock > 0) {
//     stockMessage = `⚠️ Only ${stock} left`;
//     stockColor = "text-red-600 font-semibold";
//   } else {
//     stockMessage = "Out of stock";
//     stockColor = "text-red-500 font-semibold";
//   }

//   // swiper ref control
//   const swiperRef = useRef(null);
//   const containerRef = useRef(null);

//   // start/stop autoplay based on hover (desktop)
//   useEffect(() => {
//     const node = containerRef.current;
//     if (!node || !swiperRef.current) return;

//     const handleEnter = () => {
//       setIsHovered(true);
//       // start autoplay
//       try {
//         swiperRef.current.autoplay?.start();
//       } catch (e) {}
//     };
//     const handleLeave = () => {
//       setIsHovered(false);
//       try {
//         swiperRef.current.autoplay?.stop();
//       } catch (e) {}
//     };

//     node.addEventListener("mouseenter", handleEnter);
//     node.addEventListener("mouseleave", handleLeave);

//     return () => {
//       node.removeEventListener("mouseenter", handleEnter);
//       node.removeEventListener("mouseleave", handleLeave);
//     };
//   }, []);

//   // update local qty when cart changes
//   useEffect(() => {
//     setLocalQty(initialQty);
//   }, [initialQty]);

//   // Add to cart (shared)
//   const handleAddToCartConfirm = (product, redirectAfter = false) => {
//     if (product.sizes?.length && !selectedSize) {
//       toast.error("Please select a size before continuing.");
//       return;
//     }

//     const colorToUse = selectedColor || (product.colors?.[0] ?? "");

//     dispatch(
//       addToCart({
//         ...product,
//         quantity: 1,
//         selectedSize,
//         selectedColor: colorToUse,
//       })
//     );

//     setShowSizePopup(null);

//     toast.success(
//       redirectAfter
//         ? `🛍️ "${product.name}" added — redirecting to checkout...`
//         : `🛒 "${product.name}" added to cart successfully!`,
//       { duration: 1400 }
//     );

//     if (redirectAfter) {
//       setTimeout(() => navigate("/cart"), 900);
//     }
//   };

//   const handlePopupOpen = (productArg, isBuy = false) => {
//     setIsBuyNow(isBuy);
//     setShowSizePopup(productArg._id);
//     setSelectedColor("");
//     setSelectedSize("");
//   };

//   const handleToggleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     dispatch(toggleWishlist(product));
//   };

//   // thumbnail click
//   const goToSlide = (idx) => {
//     setActiveIndex(idx);
//     if (swiperRef.current) {
//       // if loop is enabled, use slideToLoop for correct index; here we will disable loop for precise indexing
//       swiperRef.current.slideTo(idx);
//     }
//   };

//   // safe images array
//   const images = Array.isArray(product.images) && product.images.length > 0
//     ? product.images
//     : ["/images/tee1.svg"];

//   // render
//   return (
//     <div
//       ref={containerRef}
//       className="relative bg-white overflow-hidden group transition-all duration-450 ease-out transform shadow-xl hover:shadow-[0_18px_60px_rgba(2,6,23,0.12)] rounded-lg"
//       aria-label={product.name}
//     >
//       <div className="flex">
//         {/* Thumbnails column (desktop only) */}
//         <div className="hidden md:flex flex-col gap-2 pr-3">
//           {images.map((img, i) => (
//             <button
//               key={i}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 goToSlide(i);
//               }}
//               className={`w-14 h-14 rounded-md overflow-hidden border ${i === activeIndex ? "border-yellow-400 scale-[1.02]" : "border-transparent"} transition`}
//               aria-label={`View image ${i + 1}`}
//             >
//               <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
//             </button>
//           ))}
//         </div>

//         {/* Swiper / main image */}
//         <div className="relative flex-1">
//           <Link to={`/product/${product._id}`} className="block">
//             <Swiper
//               modules={[Autoplay, Pagination, Keyboard, Navigation, EffectFade]}
//               effect="fade"
//               onSwiper={(swiper) => {
//                 swiperRef.current = swiper;
//                 // keep autoplay stopped by default on mount (we start on hover)
//                 try {
//                   swiper.autoplay?.stop();
//                 } catch (e) {}
//               }}
//               onSlideChange={(s) => setActiveIndex(s.realIndex ?? s.activeIndex)}
//               pagination={{
//                 clickable: true,
//                 bulletClass:
//                   "swiper-pagination-bullet bg-white/60 w-2 h-2 rounded-full mx-1 opacity-90",
//                 el: ".custom-pagination",
//               }}
//               navigation={{
//                 nextEl: ".custom-next",
//                 prevEl: ".custom-prev",
//               }}
//               autoplay={{
//                 delay: 3200,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: false, // we manage start/stop manually
//               }}
//               keyboard={{ enabled: true }}
//               loop={false} // loop off for stable thumbnail indexing
//               slidesPerView={1}
//               className="product-card-swiper"
//               style={{ width: "100%", height: "100%" }}
//             >
//               {images.map((img, idx) => (
//                 <SwiperSlide key={idx}>
//                   <div className="relative">
//                     <img
//                       src={img}
//                       alt={`${product.name} image ${idx + 1}`}
//                       className="w-full aspect-[4/5] md:aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
//                       loading="lazy"
//                     />

//                     {/* Offer badge */}
//                     {offerPercentage > 0 && (
//                       <div className="absolute left-3 top-3 z-20">
//                         <span className="bg-gradient-to-r from-[#0f6ed4] via-[#a01cb2] to-[#de8328] text-white px-2 py-1 text-xs font-bold rounded-md shadow">
//                           {offerPercentage}% Off
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </SwiperSlide>
//               ))}

//               {/* Custom small pagination: bottom center */}
//               <div className="custom-pagination absolute left-0 right-0 bottom-3 flex justify-center z-30 pointer-events-auto" />

//             </Swiper>
//           </Link>

//           {/* NAV ARROWS (small white) */}
//           <button
//             aria-hidden
//             className="custom-prev hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow z-40 items-center justify-center text-black"
//           >
//             ‹
//           </button>
//           <button
//             aria-hidden
//             className="custom-next hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow z-40 items-center justify-center text-black"
//           >
//             ›
//           </button>

//           {/* Quick overlay actions — appear on hover (desktop) */}
//           <div
//             className="absolute inset-0 z-40 pointer-events-none"
//             aria-hidden
//           >
//             <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
//               <div className="flex flex-col gap-2 items-end">
//                 {/* Add to Cart quick */}
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     handlePopupOpen(product, false);
//                   }}
//                   className="bg-black text-white px-3 py-2 rounded-md text-sm shadow hover:scale-105 transition"
//                 >
//                   Add
//                 </button>

//                 {/* Buy Now quick */}
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     handlePopupOpen(product, true);
//                   }}
//                   className="bg-yellow-400 text-black px-3 py-2 rounded-md text-sm shadow hover:scale-105 transition"
//                 >
//                   Buy
//                 </button>

//                 {/* View Product */}
//                 <Link
//                   to={`/product/${product._id}`}
//                   onClick={(e) => e.stopPropagation()}
//                   className="bg-white text-black px-3 py-2 rounded-md text-sm shadow hover:scale-105 transition"
//                 >
//                   View
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom details */}
//       <div className="p-3 bg-amber-50 rounded-b-md">
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex-1">
//             <h4
//               className="text-sm font-semibold uppercase tracking-wide text-gray-800 truncate"
//               title={product.name}
//             >
//               {product.name}
//             </h4>

//             <div className="flex items-center gap-2 mt-1">
//               {/* rating if available */}
//               {product.rating ? (
//                 <div className="text-yellow-400 text-xs flex items-center gap-1">
//                   <svg width="12" height="12" viewBox="0 0 24 24" fill="#facc15">
//                     <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.742 1.48 8.295L12 18.896l-7.416 4.447 1.48-8.295L0 9.306l8.332-1.151z" />
//                   </svg>
//                   <span className="text-xs text-gray-700">{product.rating?.toFixed(1)}</span>
//                   <span className="text-[11px] text-gray-500">({product.numReviews || 0})</span>
//                 </div>
//               ) : null}
//             </div>
//           </div>

//           <div className="text-right">
//             {offerPrice && offerPrice < price ? (
//               <div className="text-sm">
//                 <div className="text-gray-500 line-through">₹{price.toLocaleString("en-IN")}</div>
//                 <div className="font-bold text-gray-900">₹{offerPrice.toLocaleString("en-IN")}</div>
//               </div>
//             ) : (
//               <div className="font-bold text-gray-900">₹{price.toLocaleString("en-IN")}</div>
//             )}
//           </div>
//         </div>

//         {/* stock + wishlist icon */}
//         <div className="mt-2 flex items-center justify-between">
//           <div className={`text-[11px] ${stockColor}`}>{stockMessage}</div>

//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               handleToggleWishlist(e);
//             }}
//             className="transition-transform hover:scale-110"
//             aria-label="toggle wishlist"
//           >
//             <img
//               src={isWishlisted ? "/images/wishlisted.png" : "/images/tobewishlisted.png"}
//               alt="wishlist"
//               className="w-7 h-6 mix-blend-multiply"
//             />
//           </button>
//         </div>
//       </div>

//       {/* Size/Color popup */}
//       {showSizePopup === product._id && (
//         <div className="absolute inset-0 bg-black/85 text-white flex flex-col items-center justify-center text-center z-50 p-6">
//           <p className="text-sm mb-3 font-medium tracking-wide">Select Size & Color</p>

//           {/* Sizes */}
//           <div className="flex flex-wrap justify-center gap-3 mb-4">
//             {product.sizes?.length > 0 ? (
//               product.sizes.map((size, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-3 py-1 border rounded text-xs transition ${selectedSize === size ? "bg-white text-black font-semibold" : "border-white text-white hover:bg-white hover:text-black"}`}
//                 >
//                   {size}
//                 </button>
//               ))
//             ) : (
//               <button
//                 onClick={() => setSelectedSize("Free Size")}
//                 className="px-3 py-1 border border-white text-xs rounded hover:bg-white hover:text-black transition"
//               >
//                 Default
//               </button>
//             )}
//           </div>

//           {/* Colors */}
//           {product.colors?.length > 0 && (
//             <div className="flex gap-2 mb-5">
//               {product.colors.map((color, i) => (
//                 <div
//                   key={i}
//                   onClick={() => setSelectedColor(color)}
//                   className={`w-8 h-8 border cursor-pointer ${selectedColor === color ? "ring-2 ring-white scale-110" : "border-white/50"}`}
//                   style={{ backgroundColor: color }}
//                 />
//               ))}
//             </div>
//           )}

//           <div className="flex gap-3">
//             <button
//               onClick={() => handleAddToCartConfirm(product, isBuyNow)}
//               className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 font-semibold"
//             >
//               {isBuyNow ? "Confirm & Buy" : "Confirm Add"}
//             </button>
//             <button
//               onClick={() => setShowSizePopup(null)}
//               className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
