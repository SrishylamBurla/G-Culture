
// // import { useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addToCart } from "../features/cart/cartSlice";
// // import { toggleWishlist } from "../features/wishlist/wishlistSlice";
// // import toast from "react-hot-toast";

// // import {
// //   useGetProductByIdQuery,
// //   useCreateReviewMutation,
// // } from "../features/products/productApi";

// // export default function ProductPage() {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const {
// //     data: product,
// //     isLoading,
// //     isError,
// //     refetch,
// //   } = useGetProductByIdQuery(id);

// //   const [createReview] = useCreateReviewMutation();

// //   const wishlist = useSelector((state) => state.wishlist.wishlist);

// //   const [quantity, setQuantity] = useState(1);
// //   const [selectedSize, setSelectedSize] = useState("");
// //   const [selectedColor, setSelectedColor] = useState("");
// //   const [selectedImg, setSelectedImg] = useState("");

// //   const [userRating, setUserRating] = useState("");
// //   const [userComment, setUserComment] = useState("");

// //   const isWishlisted = product
// //     ? wishlist.some((i) => i._id === product._id)
// //     : false;

// //   if (isLoading)
// //     return <div className="p-8 text-center text-white">Loading...</div>;
// //   if (isError || !product)
// //     return (
// //       <div className="p-8 text-center text-red-400">Product not found.</div>
// //     );

// //   const countInStock = product.countInStock || 0;

// //   // QUANTITY CONTROL
// //   const handleQuantityChange = (type) => {
// //     if (type === "decrease") {
// //       setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
// //     } else if (type === "increase") {
// //       if (quantity < countInStock) {
// //         setQuantity((prev) => prev + 1);
// //       } else {
// //         toast.error(`Only ${countInStock} left in stock`);
// //       }
// //     }
// //   };

// //   // VALIDATE SIZE & COLOR
// //   const validateSelection = () => {
// //     if (product.sizes?.length && !selectedSize) {
// //       toast.error("Please select a size");
// //       return false;
// //     }
// //     if (product.colors?.length && !selectedColor) {
// //       toast.error("Please select a color");
// //       return false;
// //     }
// //     return true;
// //   };

// //   // ADD TO BAG
// //   const handleAddToCart = () => {
// //     if (!validateSelection()) return;

// //     dispatch(addToCart({ ...product, quantity, selectedSize, selectedColor }));
// //     toast.success("Added to cart");
// //   };

// //   // BUY NOW
// //   const handleBuyNow = () => {
// //     if (!validateSelection()) return;

// //     dispatch(addToCart({ ...product, quantity, selectedSize, selectedColor }));
// //     toast.success("Redirecting...");
// //     setTimeout(() => navigate("/checkout"), 800);
// //   };

// //   // WISHLIST
// //   const handleToggleWishlist = (e) => {
// //     e.preventDefault();
// //     dispatch(toggleWishlist(product));
// //   };

// //   // SUBMIT REVIEW
// //   const handleSubmitReview = async () => {
// //     if (!userRating || !userComment) {
// //       toast.error("Please select rating & write a review");
// //       return;
// //     }

// //     try {
// //       await createReview({
// //         productId: product._id,
// //         rating: Number(userRating),
// //         comment: userComment,
// //       }).unwrap();

// //       toast.success("Review added!");
// //       setUserRating("");
// //       setUserComment("");
// //       refetch();
// //     } catch (error) {
// //       toast.error(error?.data?.message || "Failed to add review");
// //     }
// //   };

// //   // ⭐ AMAZON STAR SVGs
// //   const StarFull = () => (
// //     <svg
// //       width="20"
// //       height="20"
// //       fill="#fbbf24"
// //       stroke="#fbbf24"
// //       viewBox="0 0 24 24"
// //     >
// //       <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.742 1.48 8.295L12 18.896l-7.416 4.447 1.48-8.295L0 9.306l8.332-1.151z" />
// //     </svg>
// //   );
// //   const StarHalf = () => (
// //     <svg width="20" height="20" viewBox="0 0 24 24">
// //       <defs>
// //         <linearGradient id="halfA1">
// //           <stop offset="50%" stopColor="#fbbf24" />
// //           <stop offset="50%" stopColor="transparent" />
// //         </linearGradient>
// //       </defs>
// //       <path
// //         fill="url(#halfA1)"
// //         stroke="#fbbf24"
// //         d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.742 
// //         1.48 8.295L12 18.896l-7.416 4.447 1.48-8.295L0 9.306 
// //         8.332-1.151z"
// //       />
// //     </svg>
// //   );
// //   const StarEmpty = () => (
// //     <svg
// //       width="20"
// //       height="20"
// //       fill="transparent"
// //       stroke="#fbbf24"
// //       viewBox="0 0 24 24"
// //     >
// //       <path
// //         d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.742 
// //       1.48 8.295L12 18.896l-7.416 4.447 1.48-8.295L0 
// //       9.306l8.332-1.151z"
// //       />
// //     </svg>
// //   );

// //   const renderStars = (rating) => {
// //     const stars = [];
// //     for (let i = 1; i <= 5; i++) {
// //       if (rating >= i) stars.push("full");
// //       else if (rating >= i - 0.5) stars.push("half");
// //       else stars.push("empty");
// //     }
// //     return stars.map((t, i) => (
// //       <span key={i}>
// //         {t === "full" ? (
// //           <StarFull />
// //         ) : t === "half" ? (
// //           <StarHalf />
// //         ) : (
// //           <StarEmpty />
// //         )}
// //       </span>
// //     ));
// //   };

// //   // ⭐ Ratings Breakdown
// //   const ratingCounts = [5, 4, 3, 2, 1].map(
// //     (star) =>
// //       product.reviews?.filter((rev) => Math.round(rev.rating) === star)
// //         .length || 0
// //   );

// //   const totalReviews = product.reviews?.length || 0;
// //   const getPercent = (count) =>
// //     totalReviews === 0 ? 0 : Math.round((count / totalReviews) * 100);

// //   return (
// //     <div className="pt-[5rem] md:pt-[5.8rem] bg-[#0c0c0c] text-white">
// //       <div className="w-full flex flex-col lg:flex-row">

// //         {/* LEFT IMAGES RESPONSIVE */}
// //         <div className="w-full lg:w-[50%] px-3">
// //           {/*  MOBILE VERSION  (horizontal slider thumbnails) */}
// //           <div className="md:hidden w-full space-y-4">
// //             {/* MAIN IMAGE */}
// //             <div className="w-full">
// //               <img
// //                 src={selectedImg || product.images[0]}
// //                 className="w-full h-[440px] object-cover rounded-xs shadow-lg"
// //               />
// //             </div>

// //             {/* THUMBNAIL CAROUSEL */}
// //             <div className="flex gap-3 overflow-x-scroll scrollbar-hide pb-2">
// //               {product.images?.map((img, i) => (
// //                 <img
// //                   key={i}
// //                   src={img}
// //                   onClick={() => setSelectedImg(img)}
// //                   className={`w-24 h-24 flex-shrink-0 rounded-xs object-cover cursor-pointer transition 
// //             ${
// //               selectedImg === img ? "ring-2 ring-white scale-105" : "opacity-80"
// //             }`}
// //                 />
// //               ))}
// //             </div>
// //           </div>

// //           {/* 👉 DESKTOP VERSION (unchanged) */}
// //           <div className="hidden md:flex gap-4 p-3">
// //             <div className="flex flex-col gap-3 w-20 sticky top-28 h-fit">
// //               {product.images?.map((img, i) => (
// //                 <img
// //                   key={i}
// //                   src={img}
// //                   onClick={() => setSelectedImg(img)}
// //                   className={`w-full h-20 object-cover rounded-sm cursor-pointer transition 
// //             ${
// //               selectedImg === img
// //                 ? "ring-2 ring-white scale-105"
// //                 : "hover:opacity-70"
// //             }`}
// //                 />
// //               ))}
// //             </div>

// //             <div className="flex-1">
// //               <img
// //                 src={selectedImg || product.images[0]}
// //                 className="w-full h-[520px] object-cover rounded-sm shadow-xl"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* RIGHT DETAILS */}
// //         <div className="w-full lg:w-[50%] space-y-6 p-3">
// //           {/* TITLE */}
// //           <div className="flex justify-between">
// //             <div>
// //               <h1 className="text-2xl font-semibold">{product.name}</h1>
// //               <p className="text-xs text-gray-400">{product.category}</p>

// //               <div className="flex items-center gap-2 mt-1">
// //                 {renderStars(product.rating)}
// //                 <span className="text-xs text-gray-300">
// //                   {product.rating?.toFixed(1)} / 5
// //                 </span>
// //               </div>
// //             </div>

// //             <button className="text-3xl" onClick={handleToggleWishlist}>
// //               {isWishlisted ? "💖" : "🤍"}
// //             </button>
// //           </div>

// //           {/* PRICE */}
// //           <div>
// //             {product.offerPrice ? (
// //               <div className="flex items-center gap-3">
// //                 <p className="text-2xl font-bold">₹{product.offerPrice}</p>
// //                 <p className="line-through text-gray-600 text-sm">
// //                   ₹{product.price}
// //                 </p>
// //                 <p className="text-green-500 text-xs font-semibold">
// //                   {Math.round(
// //                     ((product.price - product.offerPrice) / product.price) * 100
// //                   )}
// //                   % OFF
// //                 </p>
// //               </div>
// //             ) : (
// //               <p className="text-2xl font-bold">₹{product.price}</p>
// //             )}
// //           </div>

// //           {/* SIZE */}
// //           {product.sizes?.length > 0 && (
// //             <div>
// //               <p className="font-semibold text-sm mb-2">Select Size</p>
// //               <div className="flex gap-3">
// //                 {product.sizes.map((s) => (
// //                   <button
// //                     key={s}
// //                     onClick={() => setSelectedSize(s)}
// //                     className={`w-10 h-10 border rounded-md text-xs ${
// //                       selectedSize === s
// //                         ? "bg-white text-black"
// //                         : "border-gray-500 hover:border-white"
// //                     }`}
// //                   >
// //                     {s}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* COLOR */}
// //           {product.colors?.length > 0 && (
// //             <div>
// //               <p className="font-semibold text-sm mb-2">Color</p>
// //               <div className="flex gap-3">
// //                 {product.colors.map((c) => (
// //                   <div
// //                     key={c}
// //                     onClick={() => setSelectedColor(c)}
// //                     style={{ backgroundColor: c }}
// //                     className={`w-9 h-9 rounded-md border cursor-pointer ${
// //                       selectedColor === c
// //                         ? "border-white ring-1"
// //                         : "border-gray-500"
// //                     }`}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* QUANTITY */}
// //           <div className="flex items-center gap-3 mt-4">
// //             <p className="text-sm">Quantity</p>

// //             <div className="flex items-center border border-gray-500 rounded">
// //               <button
// //                 onClick={() => handleQuantityChange("decrease")}
// //                 className="px-3 py-1 text-sm"
// //               >
// //                 -
// //               </button>
// //               <span className="px-4 text-sm">{quantity}</span>
// //               <button
// //                 onClick={() => handleQuantityChange("increase")}
// //                 className="px-3 py-1 text-sm"
// //               >
// //                 +
// //               </button>
// //             </div>
// //           </div>

// //           {/* BUTTONS */}
// //           <div className="flex gap-4">
// //             <button
// //               className="flex-1 py-3 bg-white text-black rounded text-sm"
// //               onClick={handleAddToCart}
// //             >
// //               Add to Bag
// //             </button>

// //             <button
// //               className="flex-1 py-3 border border-gray-500 rounded text-sm"
// //               onClick={handleBuyNow}
// //             >
// //               Buy Now
// //             </button>
// //           </div>

// //           {/* DESCRIPTION */}
// //           <div className="pt-6 border-t border-gray-700">
// //             <h3 className="font-semibold text-sm mb-1">Product Details</h3>
// //             <p className="text-xs text-gray-300 leading-relaxed">
// //               {product.description}
// //             </p>
// //           </div>

// //           {/* ⭐ REVIEWS */}
// //           <div className="mt-12 bg-white/5 p-6 rounded border border-white/10 shadow-xl">
// //             <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

// //             <div className="flex items-center gap-4 mb-6">
// //               <div className="flex">{renderStars(product.rating)}</div>

// //               <div>
// //                 <p className="text-2xl font-bold text-yellow-400">
// //                   {product.rating?.toFixed(1)}
// //                 </p>
// //                 <p className="text-xs text-gray-400">
// //                   {totalReviews} global ratings
// //                 </p>
// //               </div>
// //             </div>

// //             {/* RATING BARS */}
// //             <div className="space-y-2 mb-10">
// //               {[5, 4, 3, 2, 1].map((star, idx) => (
// //                 <div key={star} className="flex items-center gap-3">
// //                   <span className="text-xs w-10">{star} star</span>

// //                   <div className="flex-1 h-2.5 bg-gray-700 rounded overflow-hidden">
// //                     <div
// //                       className="h-full bg-yellow-500 rounded"
// //                       style={{ width: `${getPercent(ratingCounts[idx])}%` }}
// //                     />
// //                   </div>

// //                   <span className="w-8 text-right text-xs text-gray-400">
// //                     {getPercent(ratingCounts[idx])}%
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* REVIEW LIST */}
// //             <div className="space-y-3">
// //               {totalReviews > 0 ? (
// //                 product.reviews.map((rev, i) => (
// //                   <div
// //                     key={i}
// //                     className="bg-white/5 p-4 rounded border border-white/10 text-xs"
// //                   >
// //                     <p className="font-semibold text-sm">{rev.name}</p>

// //                     <div className="flex items-center gap-1 mt-1">
// //                       {renderStars(rev.rating)}
// //                       <span className="text-yellow-400">{rev.rating}</span>
// //                     </div>

// //                     <p className="text-gray-300 mt-2 text-xs">{rev.comment}</p>

// //                     <p className="text-gray-500 text-[10px] mt-1">
// //                       {new Date(rev.createdAt).toLocaleDateString()}
// //                     </p>
// //                   </div>
// //                 ))
// //               ) : (
// //                 <p className="text-gray-500 text-xs">No reviews yet.</p>
// //               )}
// //             </div>

// //             {/* WRITE REVIEW */}
// //             <div className="mt-8">
// //               <h3 className="text-lg font-semibold mb-3">Write a Review</h3>

// //               <div className="flex flex-col gap-3">
// //                 <select
// //                   className="bg-gray-700 text-white text-sm border border-white/20 rounded px-3 py-2"
// //                   value={userRating}
// //                   onChange={(e) => setUserRating(e.target.value)}
// //                 >
// //                   <option value="">Select Rating</option>
// //                   <option value="5">5 - Excellent</option>
// //                   <option value="4">4 - Good</option>
// //                   <option value="3">3 - Average</option>
// //                   <option value="2">2 - Poor</option>
// //                   <option value="1">1 - Terrible</option>
// //                 </select>

// //                 <textarea
// //                   rows="4"
// //                   placeholder="Write your review..."
// //                   className="bg-gray-700 text-white text-sm border border-white/20 rounded px-3 py-2"
// //                   value={userComment}
// //                   onChange={(e) => setUserComment(e.target.value)}
// //                 />

// //                 <button
// //                   onClick={handleSubmitReview}
// //                   className="py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded text-sm"
// //                 >
// //                   Submit Review
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../features/cart/cartSlice";
// import { toggleWishlist } from "../features/wishlist/wishlistSlice";
// import toast from "react-hot-toast";
// import { Heart, Star, Minus, Plus, ChevronDown } from "lucide-react";

// import {
//   useGetProductByIdQuery,
//   useCreateReviewMutation,
// } from "../features/products/productApi";

// export default function ProductPage() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     data: product,
//     isLoading,
//     isError,
//     refetch,
//   } = useGetProductByIdQuery(id);

//   const [createReview] = useCreateReviewMutation();

//   const wishlist = useSelector((state) => state.wishlist.wishlist);

//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedImg, setSelectedImg] = useState("");
//   const [showDetails, setShowDetails] = useState(false);

//   const [userRating, setUserRating] = useState("");
//   const [userComment, setUserComment] = useState("");

//   const isWishlisted = product
//     ? wishlist.some((i) => i._id === product._id)
//     : false;

//   /* ---------- LOADING ---------- */
//   if (isLoading)
//     return (
//       <div className="pt-32 pb-20 bg-[#050507] min-h-screen">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">
//           <div className="w-full lg:w-1/2 flex gap-4">
//             <div className="hidden md:flex flex-col gap-3 w-20">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="w-full h-20 bg-white/[0.03] rounded-lg animate-pulse" />
//               ))}
//             </div>
//             <div className="flex-1 h-[520px] bg-white/[0.03] rounded-lg animate-pulse" />
//           </div>
//           <div className="w-full lg:w-1/2 space-y-6">
//             <div className="h-8 w-3/4 bg-white/[0.03] rounded animate-pulse" />
//             <div className="h-4 w-1/4 bg-white/[0.03] rounded animate-pulse" />
//             <div className="h-10 w-1/3 bg-white/[0.03] rounded animate-pulse" />
//             <div className="h-12 w-full bg-white/[0.03] rounded-full animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );

//   if (isError || !product)
//     return (
//       <div className="pt-32 pb-20 bg-[#050507] min-h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-sm">Product not found.</p>
//       </div>
//     );

//   const countInStock = product.countInStock || 0;

//   const handleQuantityChange = (type) => {
//     if (type === "decrease") {
//       setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//     } else if (type === "increase") {
//       if (quantity < countInStock) {
//         setQuantity((prev) => prev + 1);
//       } else {
//         toast.error(`Only ${countInStock} left in stock`);
//       }
//     }
//   };

//   const validateSelection = () => {
//     if (product.sizes?.length && !selectedSize) {
//       toast.error("Please select a size");
//       return false;
//     }
//     if (product.colors?.length && !selectedColor) {
//       toast.error("Please select a color");
//       return false;
//     }
//     return true;
//   };

//   const handleAddToCart = () => {
//     if (!validateSelection()) return;
//     dispatch(addToCart({ ...product, quantity, selectedSize, selectedColor }));
//     toast.success("Added to cart");
//   };

//   const handleBuyNow = () => {
//     if (!validateSelection()) return;
//     dispatch(addToCart({ ...product, quantity, selectedSize, selectedColor }));
//     toast.success("Redirecting...");
//     setTimeout(() => navigate("/checkout"), 800);
//   };

//   const handleToggleWishlist = (e) => {
//     e.preventDefault();
//     dispatch(toggleWishlist(product));
//   };

//   const handleSubmitReview = async () => {
//     if (!userRating || !userComment) {
//       toast.error("Please select rating & write a review");
//       return;
//     }
//     try {
//       await createReview({
//         productId: product._id,
//         rating: Number(userRating),
//         comment: userComment,
//       }).unwrap();
//       toast.success("Review added!");
//       setUserRating("");
//       setUserComment("");
//       refetch();
//     } catch (error) {
//       toast.error(error?.data?.message || "Failed to add review");
//     }
//   };

//   const renderStars = (rating, size = 14) => {
//     return [...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         size={size}
//         className={
//           i < Math.round(rating)
//             ? "fill-white text-white"
//             : "fill-transparent text-gray-600"
//         }
//       />
//     ));
//   };

//   const ratingCounts = [5, 4, 3, 2, 1].map(
//     (star) =>
//       product.reviews?.filter((rev) => Math.round(rev.rating) === star).length || 0
//   );
//   const totalReviews = product.reviews?.length || 0;
//   const getPercent = (count) =>
//     totalReviews === 0 ? 0 : Math.round((count / totalReviews) * 100);

//   return (
//     <div className="pt-28 md:pt-32 pb-20 bg-[#050507] text-white min-h-screen">
//       <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">

//         {/* ========== LEFT: IMAGES ========== */}
//         <div className="w-full lg:w-1/2">
//           {/* Mobile */}
//           <div className="md:hidden space-y-3">
//             <div className="overflow-hidden rounded-lg">
//               <img
//                 src={selectedImg || product.images[0]}
//                 alt={product.name}
//                 className="w-full aspect-[3/4] object-cover"
//               />
//             </div>
//             <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
//               {product.images?.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   onClick={() => setSelectedImg(img)}
//                   className={`w-16 h-16 flex-shrink-0 rounded-md object-cover cursor-pointer transition-all duration-200
//                     ${selectedImg === img || (!selectedImg && i === 0)
//                       ? "ring-1 ring-white opacity-100"
//                       : "opacity-40 hover:opacity-70"
//                     }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Desktop */}
//           <div className="hidden md:flex gap-3 sticky top-32">
//             <div className="flex flex-col gap-2 w-[72px]">
//               {product.images?.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   onClick={() => setSelectedImg(img)}
//                   className={`w-full h-[72px] object-cover rounded-md cursor-pointer transition-all duration-200
//                     ${selectedImg === img || (!selectedImg && i === 0)
//                       ? "ring-1 ring-white opacity-100"
//                       : "opacity-40 hover:opacity-70"
//                     }`}
//                 />
//               ))}
//             </div>
//             <div className="flex-1 overflow-hidden rounded-lg">
//               <img
//                 src={selectedImg || product.images[0]}
//                 alt={product.name}
//                 className="w-full aspect-[3/4] object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* ========== RIGHT: DETAILS ========== */}
//         <div className="w-full lg:w-1/2 space-y-6">
//           {/* Breadcrumb */}
//           <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
//             {product.category}
//           </p>

//           {/* Title + Wishlist */}
//           <div className="flex items-start justify-between gap-4">
//             <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
//               {product.name}
//             </h1>
//             <button
//               onClick={handleToggleWishlist}
//               className={`mt-1 p-2 rounded-full border transition-all duration-200 ${
//                 isWishlisted
//                   ? "border-white/30 bg-white/10"
//                   : "border-white/10 hover:border-white/30"
//               }`}
//             >
//               <Heart
//                 size={18}
//                 className={isWishlisted ? "fill-white text-white" : "text-gray-400"}
//               />
//             </button>
//           </div>

//           {/* Rating */}
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-0.5">
//               {renderStars(product.rating)}
//             </div>
//             <span className="text-xs text-gray-500">
//               {product.rating?.toFixed(1)} · {totalReviews} reviews
//             </span>
//           </div>

//           {/* Price */}
//           <div className="flex items-baseline gap-3">
//             {product.offerPrice ? (
//               <>
//                 <p className="text-3xl font-bold">
//                   ₹{Number(product.offerPrice).toLocaleString("en-IN")}
//                 </p>
//                 <p className="text-sm text-gray-500 line-through">
//                   ₹{Number(product.price).toLocaleString("en-IN")}
//                 </p>
//                 <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
//                   {Math.round(
//                     ((product.price - product.offerPrice) / product.price) * 100
//                   )}% OFF
//                 </span>
//               </>
//             ) : (
//               <p className="text-3xl font-bold">
//                 ₹{Number(product.price).toLocaleString("en-IN")}
//               </p>
//             )}
//           </div>

//           <div className="border-t border-white/[0.06] pt-6 space-y-6">
//             {/* Size */}
//             {product.sizes?.length > 0 && (
//               <div>
//                 <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
//                   Size
//                 </p>
//                 <div className="flex gap-2">
//                   {product.sizes.map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => setSelectedSize(s)}
//                       className={`w-11 h-11 rounded-lg text-xs font-medium transition-all duration-200
//                         ${selectedSize === s
//                           ? "bg-white text-black"
//                           : "border border-white/15 text-gray-300 hover:border-white/40"
//                         }`}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Color */}
//             {product.colors?.length > 0 && (
//               <div>
//                 <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
//                   Color
//                 </p>
//                 <div className="flex gap-2">
//                   {product.colors.map((c) => (
//                     <button
//                       key={c}
//                       onClick={() => setSelectedColor(c)}
//                       style={{ backgroundColor: c }}
//                       className={`w-9 h-9 rounded-full transition-all duration-200
//                         ${selectedColor === c
//                           ? "ring-2 ring-white ring-offset-2 ring-offset-[#050507]"
//                           : "ring-1 ring-white/10 hover:ring-white/30"
//                         }`}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quantity */}
//             <div>
//               <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
//                 Quantity
//               </p>
//               <div className="inline-flex items-center border border-white/15 rounded-full">
//                 <button
//                   onClick={() => handleQuantityChange("decrease")}
//                   className="p-2.5 text-gray-400 hover:text-white transition-colors"
//                 >
//                   <Minus size={14} />
//                 </button>
//                 <span className="px-5 text-sm font-medium min-w-[40px] text-center">
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={() => handleQuantityChange("increase")}
//                   className="p-2.5 text-gray-400 hover:text-white transition-colors"
//                 >
//                   <Plus size={14} />
//                 </button>
//               </div>
//               {countInStock <= 5 && countInStock > 0 && (
//                 <p className="text-xs text-amber-400 mt-2">
//                   Only {countInStock} left in stock
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-2">
//             <button
//               className="flex-1 py-3.5 bg-white text-black rounded-full text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors duration-200"
//               onClick={handleAddToCart}
//             >
//               Add to Bag
//             </button>
//             <button
//               className="flex-1 py-3.5 border border-white/20 rounded-full text-sm font-medium uppercase tracking-wider hover:border-white/50 transition-colors duration-200"
//               onClick={handleBuyNow}
//             >
//               Buy Now
//             </button>
//           </div>

//           {/* Product Details Accordion */}
//           <div className="border-t border-white/[0.06]">
//             <button
//               onClick={() => setShowDetails(!showDetails)}
//               className="w-full flex items-center justify-between py-5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
//             >
//               Product Details
//               <ChevronDown
//                 size={16}
//                 className={`transition-transform duration-200 ${
//                   showDetails ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//             {showDetails && (
//               <p className="text-sm text-gray-500 leading-relaxed pb-6">
//                 {product.description}
//               </p>
//             )}
//           </div>

//           {/* ========== REVIEWS ========== */}
//           <div className="border-t border-white/[0.06] pt-8">
//             <h2 className="text-lg font-bold tracking-tight mb-6">
//               Customer Reviews
//             </h2>

//             {/* Rating Summary */}
//             <div className="flex items-start gap-8 mb-8">
//               <div className="text-center">
//                 <p className="text-4xl font-bold">{product.rating?.toFixed(1)}</p>
//                 <div className="flex items-center gap-0.5 mt-1 justify-center">
//                   {renderStars(product.rating, 12)}
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {totalReviews} reviews
//                 </p>
//               </div>

//               <div className="flex-1 space-y-2">
//                 {[5, 4, 3, 2, 1].map((star, idx) => (
//                   <div key={star} className="flex items-center gap-3">
//                     <span className="text-xs text-gray-500 w-6">{star}</span>
//                     <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-white rounded-full transition-all duration-500"
//                         style={{ width: `${getPercent(ratingCounts[idx])}%` }}
//                       />
//                     </div>
//                     <span className="w-8 text-right text-xs text-gray-600">
//                       {getPercent(ratingCounts[idx])}%
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Review List */}
//             <div className="space-y-4">
//               {totalReviews > 0 ? (
//                 product.reviews.map((rev, i) => (
//                   <div
//                     key={i}
//                     className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-5"
//                   >
//                     <div className="flex items-center justify-between mb-2">
//                       <p className="text-sm font-medium">{rev.name}</p>
//                       <p className="text-[11px] text-gray-600">
//                         {new Date(rev.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-0.5 mb-3">
//                       {renderStars(rev.rating, 12)}
//                     </div>
//                     <p className="text-sm text-gray-400 leading-relaxed">
//                       {rev.comment}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-gray-600">No reviews yet. Be the first!</p>
//               )}
//             </div>

//             {/* Write Review */}
//             <div className="mt-10 bg-white/[0.02] border border-white/[0.06] rounded-lg p-6">
//               <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">
//                 Write a Review
//               </h3>

//               <div className="space-y-4">
//                 <div>
//                   <label className="text-xs text-gray-500 mb-1.5 block">Rating</label>
//                   <select
//                     className="w-full bg-white/[0.03] border border-white/10 text-sm text-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-white/30 transition-colors appearance-none"
//                     value={userRating}
//                     onChange={(e) => setUserRating(e.target.value)}
//                   >
//                     <option value="">Select Rating</option>
//                     <option value="5">5 — Excellent</option>
//                     <option value="4">4 — Good</option>
//                     <option value="3">3 — Average</option>
//                     <option value="2">2 — Poor</option>
//                     <option value="1">1 — Terrible</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-xs text-gray-500 mb-1.5 block">Your Review</label>
//                   <textarea
//                     rows="4"
//                     placeholder="Share your experience..."
//                     className="w-full bg-white/[0.03] border border-white/10 text-sm text-gray-200 placeholder-gray-600 rounded-lg px-4 py-3 outline-none focus:border-white/30 transition-colors resize-none"
//                     value={userComment}
//                     onChange={(e) => setUserComment(e.target.value)}
//                   />
//                 </div>

//                 <button
//                   onClick={handleSubmitReview}
//                   className="w-full py-3 bg-white text-black rounded-full text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors duration-200"
//                 >
//                   Submit Review
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import toast from "react-hot-toast";

import {
  Heart,
  Star,
  Minus,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

import {
  useGetProductByIdQuery,
  useCreateReviewMutation,
} from "../features/products/productApi";


export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductByIdQuery(id);

  const [createReview] =
    useCreateReviewMutation();

  const wishlist = useSelector(
    (state) => state.wishlist.wishlist
  );

  const [quantity, setQuantity] =
    useState(1);

  const [selectedSize, setSelectedSize] =
    useState("");

  const [selectedColor, setSelectedColor] =
    useState("");

  const [selectedImg, setSelectedImg] =
    useState("");

  const [showDetails, setShowDetails] =
    useState(false);

  const [userRating, setUserRating] =
    useState("");

  const [userComment, setUserComment] =
    useState("");


  /* =====================================================
     LOADING
  ====================================================== */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050507] pt-28 pb-20 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">

          <div className="grid gap-10 lg:grid-cols-2">

            {/* IMAGE SKELETON */}

            <div className="flex gap-3">
              <div className="hidden w-[72px] flex-col gap-2 md:flex">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="
                      h-[72px]
                      w-full
                      animate-pulse
                      rounded-lg
                      bg-white/[0.04]
                    "
                  />
                ))}
              </div>

              <div
                className="
                  aspect-[3/4]
                  w-full
                  animate-pulse
                  rounded-xl
                  bg-white/[0.04]
                "
              />
            </div>


            {/* DETAILS SKELETON */}

            <div className="space-y-7">

              <div className="h-3 w-24 animate-pulse rounded bg-white/[0.04]" />

              <div className="h-10 w-3/4 animate-pulse rounded bg-white/[0.04]" />

              <div className="h-5 w-40 animate-pulse rounded bg-white/[0.04]" />

              <div className="h-10 w-36 animate-pulse rounded bg-white/[0.04]" />

              <div className="h-px w-full bg-white/[0.06]" />

              <div className="h-20 w-full animate-pulse rounded bg-white/[0.04]" />

              <div className="h-12 w-full animate-pulse rounded-full bg-white/[0.04]" />

            </div>

          </div>

        </div>
      </div>
    );
  }


  /* =====================================================
     ERROR
  ====================================================== */

  if (isError || !product) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#050507]
          px-6
          text-white
        "
      >
        <div className="text-center">

          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/30">
            G-Culture
          </p>

          <h1 className="text-xl font-medium">
            Product not found
          </h1>

          <button
            onClick={() => navigate("/shop")}
            className="
              mt-6
              rounded-full
              bg-white
              px-6
              py-3
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-black
              transition
              hover:bg-white/90
            "
          >
            Back to Shop
          </button>

        </div>
      </div>
    );
  }


  /* =====================================================
     PRODUCT DATA
  ====================================================== */

  const images = product.images || [];

  const countInStock =
    Number(product.countInStock) || 0;

  const rating =
    Number(product.rating) || 0;

  const totalReviews =
    product.reviews?.length || 0;

  const offerPrice =
    Number(product.offerPrice) || 0;

  const originalPrice =
    Number(product.price) || 0;

  const hasDiscount =
    offerPrice > 0 &&
    offerPrice < originalPrice;

  const discountPercentage =
    hasDiscount
      ? Math.round(
          ((originalPrice - offerPrice) /
            originalPrice) *
            100
        )
      : 0;

  const isWishlisted = wishlist.some(
    (item) =>
      item._id === product._id
  );


  /* =====================================================
     IMAGE HELPERS
  ====================================================== */

  const currentImage =
    selectedImg || images[0];

  const currentImageIndex =
    Math.max(
      images.indexOf(currentImage),
      0
    );

  const changeImage = (direction) => {
    if (images.length <= 1) return;

    const nextIndex =
      direction === "next"
        ? (currentImageIndex + 1) %
          images.length
        : (currentImageIndex - 1 + images.length) %
          images.length;

    setSelectedImg(
      images[nextIndex]
    );
  };


  /* =====================================================
     QUANTITY
  ====================================================== */

  const handleQuantityChange = (
    type
  ) => {
    if (type === "decrease") {
      setQuantity((prev) =>
        Math.max(1, prev - 1)
      );
      return;
    }

    if (type === "increase") {
      if (quantity < countInStock) {
        setQuantity(
          (prev) => prev + 1
        );
      } else {
        toast.error(
          `Only ${countInStock} left in stock`
        );
      }
    }
  };


  /* =====================================================
     VALIDATION
  ====================================================== */

  const validateSelection = () => {
    if (
      product.sizes?.length &&
      !selectedSize
    ) {
      toast.error(
        "Please select a size"
      );
      return false;
    }

    if (
      product.colors?.length &&
      !selectedColor
    ) {
      toast.error(
        "Please select a color"
      );
      return false;
    }

    if (countInStock <= 0) {
      toast.error(
        "This product is out of stock"
      );
      return false;
    }

    return true;
  };


  /* =====================================================
     ADD TO CART
  ====================================================== */

  const handleAddToCart = () => {
    if (!validateSelection()) return;

    dispatch(
      addToCart({
        ...product,
        quantity,
        selectedSize,
        selectedColor,
      })
    );

    toast.success(
      "Added to cart"
    );
  };


  /* =====================================================
     BUY NOW
  ====================================================== */

  const handleBuyNow = () => {
    if (!validateSelection()) return;

    dispatch(
      addToCart({
        ...product,
        quantity,
        selectedSize,
        selectedColor,
      })
    );

    toast.success(
      "Redirecting..."
    );

    setTimeout(() => {
      navigate("/checkout");
    }, 700);
  };


  /* =====================================================
     WISHLIST
  ====================================================== */

  const handleToggleWishlist = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(
      toggleWishlist(product)
    );
  };


  /* =====================================================
     REVIEW
  ====================================================== */

  const handleSubmitReview =
    async () => {
      if (
        !userRating ||
        !userComment.trim()
      ) {
        toast.error(
          "Please select a rating and write a review"
        );
        return;
      }

      try {
        await createReview({
          productId: product._id,
          rating: Number(userRating),
          comment: userComment.trim(),
        }).unwrap();

        toast.success(
          "Review added!"
        );

        setUserRating("");
        setUserComment("");

        refetch();
      } catch (error) {
        toast.error(
          error?.data?.message ||
            "Failed to add review"
        );
      }
    };


  /* =====================================================
     STARS
  ====================================================== */

  const renderStars = (
    value,
    size = 14
  ) => {
    return [...Array(5)].map(
      (_, index) => (
        <Star
          key={index}
          size={size}
          strokeWidth={1.7}
          className={
            index < Math.round(value)
              ? "fill-[#d4af37] text-[#d4af37]"
              : "fill-transparent text-white/15"
          }
        />
      )
    );
  };


  /* =====================================================
     RATING BREAKDOWN
  ====================================================== */

  const ratingCounts = [
    5,
    4,
    3,
    2,
    1,
  ].map(
    (star) =>
      product.reviews?.filter(
        (review) =>
          Math.round(
            review.rating
          ) === star
      ).length || 0
  );

  const getPercent = (
    count
  ) => {
    if (!totalReviews) return 0;

    return Math.round(
      (count / totalReviews) *
        100
    );
  };


  return (
    <main
      className="
        min-h-screen
        bg-[#050507]
        pb-24
        pt-28
        text-white
        md:pt-32
      "
    >

      {/* =================================================
          MAIN PRODUCT
      ================================================== */}

      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]
            lg:gap-16
          "
        >

          {/* =============================================
              IMAGE GALLERY
          ============================================== */}

          <section>

            {/* MOBILE MAIN IMAGE */}

            <div
              className="
                relative
                overflow-hidden
                rounded-xl
                border
                border-white/[0.07]
                bg-[#0b0b0d]
                md:hidden
              "
            >

              <img
                src={
                  currentImage ||
                  "/images/tee1.svg"
                }
                alt={product.name}
                className="
                  aspect-[3/4]
                  w-full
                  object-cover
                "
              />

              {/* Discount */}

              {discountPercentage >
                0 && (
                <span
                  className="
                    absolute
                    left-3
                    top-3
                    rounded-full
                    bg-white
                    px-2.5
                    py-1
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-black
                  "
                >
                  {discountPercentage}% OFF
                </span>
              )}

              {/* Mobile arrows */}

              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      changeImage("prev")
                    }
                    className="
                      absolute
                      left-3
                      top-1/2
                      flex
                      h-9
                      w-9
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/15
                      bg-black/40
                      text-white
                      backdrop-blur-md
                    "
                  >
                    <ChevronLeft
                      size={17}
                    />
                  </button>

                  <button
                    onClick={() =>
                      changeImage("next")
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      h-9
                      w-9
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/15
                      bg-black/40
                      text-white
                      backdrop-blur-md
                    "
                  >
                    <ChevronRight
                      size={17}
                    />
                  </button>
                </>
              )}

            </div>


            {/* MOBILE THUMBNAILS */}

            <div
              className="
                mt-3
                flex
                gap-2
                overflow-x-auto
                pb-1
                scrollbar-hide
                md:hidden
              "
            >
              {images.map(
                (image, index) => (
                  <button
                    key={image}
                    onClick={() =>
                      setSelectedImg(
                        image
                      )
                    }
                    className={`
                      h-16
                      w-16
                      shrink-0
                      overflow-hidden
                      rounded-lg
                      border
                      transition-all
                      duration-300

                      ${
                        currentImage ===
                        image
                          ? "border-white opacity-100"
                          : "border-white/[0.06] opacity-45 hover:opacity-80"
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  </button>
                )
              )}
            </div>


            {/* DESKTOP GALLERY */}

            <div
              className="
                sticky
                top-28
                hidden
                gap-3
                md:flex
              "
            >

              {/* THUMBNAILS */}

              <div
                className="
                  flex
                  w-[74px]
                  shrink-0
                  flex-col
                  gap-2
                "
              >
                {images.map(
                  (image, index) => (
                    <button
                      key={image}
                      onClick={() =>
                        setSelectedImg(
                          image
                        )
                      }
                      className={`
                        relative
                        aspect-square
                        overflow-hidden
                        rounded-lg
                        border
                        transition-all
                        duration-300

                        ${
                          currentImage ===
                          image
                            ? "border-white opacity-100"
                            : "border-white/[0.06] opacity-40 hover:opacity-80"
                        }
                      `}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    </button>
                  )
                )}
              </div>


              {/* MAIN IMAGE */}

              <div
                className="
                  relative
                  min-w-0
                  flex-1
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-[#0b0b0d]
                "
              >

                <img
                  src={
                    currentImage ||
                    "/images/tee1.svg"
                  }
                  alt={product.name}
                  className="
                    aspect-[3/4]
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                  "
                />

                {discountPercentage >
                  0 && (
                  <span
                    className="
                      absolute
                      left-4
                      top-4
                      rounded-full
                      bg-white
                      px-3
                      py-1.5
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-black
                    "
                  >
                    {discountPercentage}% OFF
                  </span>
                )}

                {/* Gallery navigation */}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        changeImage("prev")
                      }
                      className="
                        absolute
                        left-4
                        top-1/2
                        flex
                        h-10
                        w-10
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/15
                        bg-black/45
                        text-white
                        opacity-0
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:bg-white
                        hover:text-black
                        group-hover:opacity-100
                      "
                    >
                      <ChevronLeft
                        size={18}
                      />
                    </button>

                    <button
                      onClick={() =>
                        changeImage("next")
                      }
                      className="
                        absolute
                        right-4
                        top-1/2
                        flex
                        h-10
                        w-10
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/15
                        bg-black/45
                        text-white
                        opacity-0
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:bg-white
                        hover:text-black
                        group-hover:opacity-100
                      "
                    >
                      <ChevronRight
                        size={18}
                      />
                    </button>
                  </>
                )}

              </div>

            </div>

          </section>


          {/* =============================================
              PRODUCT DETAILS
          ============================================== */}

          <section
            className="
              flex
              flex-col
              lg:pt-2
            "
          >

            {/* CATEGORY */}

            <p
              className="
                mb-3
                text-[9px]
                font-medium
                uppercase
                tracking-[0.3em]
                text-white/35
              "
            >
              {product.category}
            </p>


            {/* TITLE */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-5
              "
            >

              <h1
                className="
                  max-w-[600px]
                  text-2xl
                  font-medium
                  leading-[1.08]
                  tracking-[-0.035em]
                  text-white
                  sm:text-3xl
                  lg:text-[42px]
                "
              >
                {product.name}
              </h1>


              {/* WISHLIST */}

              <button
                type="button"
                onClick={
                  handleToggleWishlist
                }
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  transition-all
                  duration-300
                  active:scale-90

                  ${
                    isWishlisted
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/30 hover:bg-white hover:text-black"
                  }
                `}
              >
                <Heart
                  size={17}
                  strokeWidth={1.8}
                  className={
                    isWishlisted
                      ? "fill-black"
                      : ""
                  }
                />
              </button>

            </div>


            {/* RATING */}

            <div
              className="
                mt-4
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-0.5
                "
              >
                {renderStars(
                  rating,
                  13
                )}
              </div>

              <span
                className="
                  text-xs
                  text-white/40
                "
              >
                {rating.toFixed(1)}
                {" · "}
                {totalReviews}{" "}
                reviews
              </span>

            </div>


            {/* PRICE */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                items-baseline
                gap-3
              "
            >

              <span
                className="
                  text-3xl
                  font-semibold
                  tracking-[-0.03em]
                  text-white
                "
              >
                ₹
                {(
                  hasDiscount
                    ? offerPrice
                    : originalPrice
                ).toLocaleString(
                  "en-IN"
                )}
              </span>

              {hasDiscount && (
                <>
                  <span
                    className="
                      text-sm
                      text-white/25
                      line-through
                    "
                  >
                    ₹
                    {originalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span
                    className="
                      rounded-full
                      bg-[#d4af37]/10
                      px-2
                      py-1
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-[#d4af37]
                    "
                  >
                    Save {discountPercentage}%
                  </span>
                </>
              )}

            </div>


            {/* DIVIDER */}

            <div
              className="
                my-7
                h-px
                bg-white/[0.07]
              "
            />


            {/* SIZE */}

            {product.sizes?.length >
              0 && (
              <div className="mb-7">

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    justify-between
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white/50
                    "
                  >
                    Select Size
                  </p>

                  <span
                    className="
                      text-[9px]
                      text-white/25
                    "
                  >
                    Required
                  </span>
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {product.sizes.map(
                    (size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          setSelectedSize(
                            size
                          )
                        }
                        className={`
                          flex
                          h-11
                          min-w-[46px]
                          items-center
                          justify-center
                          rounded-lg
                          px-3
                          text-xs
                          font-medium
                          transition-all
                          duration-300

                          ${
                            selectedSize ===
                            size
                              ? "bg-white text-black shadow-lg"
                              : "border border-white/10 bg-white/[0.02] text-white/55 hover:border-white/30 hover:text-white"
                          }
                        `}
                      >
                        {size}
                      </button>
                    )
                  )}
                </div>

              </div>
            )}


            {/* COLOR */}

            {product.colors?.length >
              0 && (
              <div className="mb-7">

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    justify-between
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-white/50
                    "
                  >
                    Select Color
                  </p>

                  {selectedColor && (
                    <span className="text-[10px] text-white/35">
                      {selectedColor}
                    </span>
                  )}
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-3
                  "
                >
                  {product.colors.map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        aria-label={`Select ${color}`}
                        onClick={() =>
                          setSelectedColor(
                            color
                          )
                        }
                        style={{
                          backgroundColor:
                            color,
                        }}
                        className={`
                          h-9
                          w-9
                          rounded-full
                          border
                          transition-all
                          duration-300

                          ${
                            selectedColor ===
                            color
                              ? "border-white ring-2 ring-white ring-offset-2 ring-offset-[#050507]"
                              : "border-white/10 hover:border-white/40"
                          }
                        `}
                      />
                    )
                  )}
                </div>

              </div>
            )}


            {/* QUANTITY */}

            <div className="mb-7">

              <p
                className="
                  mb-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white/50
                "
              >
                Quantity
              </p>

              <div
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.02]
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    handleQuantityChange(
                      "decrease"
                    )
                  }
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    text-white/40
                    transition
                    hover:text-white
                  "
                >
                  <Minus size={14} />
                </button>

                <span
                  className="
                    min-w-[38px]
                    text-center
                    text-sm
                    font-medium
                  "
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    handleQuantityChange(
                      "increase"
                    )
                  }
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    text-white/40
                    transition
                    hover:text-white
                  "
                >
                  <Plus size={14} />
                </button>

              </div>


              {/* STOCK */}

              {countInStock >
                0 &&
                countInStock <= 5 && (
                  <p
                    className="
                      mt-2
                      text-[10px]
                      text-[#d4af37]
                    "
                  >
                    Only {countInStock} left
                    in stock
                  </p>
                )}

              {countInStock === 0 && (
                <p
                  className="
                    mt-2
                    text-[10px]
                    text-red-400
                  "
                >
                  Currently unavailable
                </p>
              )}

            </div>


            {/* ACTIONS */}

            <div
              className="
                grid
                grid-cols-2
                gap-3
              "
            >

              <button
                type="button"
                onClick={
                  handleAddToCart
                }
                disabled={
                  countInStock === 0
                }
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-white
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-black
                  transition-all
                  duration-300
                  hover:bg-white/90
                  hover:shadow-[0_12px_35px_rgba(255,255,255,0.08)]
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:bg-white/[0.08]
                  disabled:text-white/20
                "
              >
                <ShoppingBag
                  size={15}
                />
                Add to Bag
              </button>


              <button
                type="button"
                onClick={
                  handleBuyNow
                }
                disabled={
                  countInStock === 0
                }
                className="
                  h-12
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.02]
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-white
                  transition-all
                  duration-300
                  hover:border-white/35
                  hover:bg-white/[0.06]
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:border-white/[0.06]
                  disabled:text-white/20
                "
              >
                Buy Now
              </button>

            </div>


            {/* SERVICE FEATURES */}

            <div
              className="
                mt-7
                grid
                grid-cols-3
                gap-2
                border-y
                border-white/[0.06]
                py-5
              "
            >

              <div className="text-center">

                <Truck
                  size={16}
                  className="mx-auto mb-2 text-white/45"
                  strokeWidth={1.5}
                />

                <p className="text-[9px] uppercase tracking-wider text-white/40">
                  Fast Delivery
                </p>

              </div>

              <div className="border-x border-white/[0.06] text-center">

                <ShieldCheck
                  size={16}
                  className="mx-auto mb-2 text-white/45"
                  strokeWidth={1.5}
                />

                <p className="text-[9px] uppercase tracking-wider text-white/40">
                  Secure Payment
                </p>

              </div>

              <div className="text-center">

                <RotateCcw
                  size={16}
                  className="mx-auto mb-2 text-white/45"
                  strokeWidth={1.5}
                />

                <p className="text-[9px] uppercase tracking-wider text-white/40">
                  Easy Returns
                </p>

              </div>

            </div>


            {/* DETAILS */}

            <div
              className="
                border-b
                border-white/[0.06]
              "
            >

              <button
                type="button"
                onClick={() =>
                  setShowDetails(
                    !showDetails
                  )
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  py-5
                  text-left
                "
              >

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-white/55
                  "
                >
                  Product Details
                </span>

                <ChevronDown
                  size={16}
                  className={`
                    text-white/35
                    transition-transform
                    duration-300
                    ${
                      showDetails
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />

              </button>

              {showDetails && (
                <div
                  className="
                    pb-6
                    text-sm
                    leading-7
                    text-white/40
                  "
                >
                  {product.description}
                </div>
              )}

            </div>

          </section>

        </div>


        {/* =================================================
            REVIEWS
        ================================================== */}

        <section
          className="
            mt-24
            border-t
            border-white/[0.07]
            pt-16
          "
        >

          <div
            className="
              mb-10
              flex
              flex-col
              gap-3
              md:flex-row
              md:items-end
              md:justify-between
            "
          >

            <div>

              <p
                className="
                  mb-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-white/30
                "
              >
                Community
              </p>

              <h2
                className="
                  text-2xl
                  font-medium
                  tracking-[-0.03em]
                  sm:text-3xl
                "
              >
                Customer Reviews
              </h2>

            </div>

            <p
              className="
                text-xs
                text-white/30
              "
            >
              {totalReviews}{" "}
              {totalReviews === 1
                ? "review"
                : "reviews"}
            </p>

          </div>


          {/* RATING SUMMARY */}

          <div
            className="
              grid
              gap-8
              rounded-2xl
              border
              border-white/[0.07]
              bg-white/[0.02]
              p-6
              md:grid-cols-[220px_1fr]
              md:p-8
            "
          >

            {/* OVERALL */}

            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                border-b
                border-white/[0.06]
                pb-7
                md:border-b-0
                md:border-r
                md:pb-0
                md:pr-8
              "
            >

              <p
                className="
                  text-5xl
                  font-semibold
                  tracking-[-0.05em]
                "
              >
                {rating.toFixed(1)}
              </p>

              <div className="mt-2 flex gap-0.5">
                {renderStars(
                  rating,
                  14
                )}
              </div>

              <p
                className="
                  mt-2
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-white/30
                "
              >
                Based on{" "}
                {totalReviews}{" "}
                reviews
              </p>

            </div>


            {/* BARS */}

            <div className="flex flex-col justify-center gap-3">

              {[5, 4, 3, 2, 1].map(
                (star, index) => {
                  const percentage =
                    getPercent(
                      ratingCounts[index]
                    );

                  return (
                    <div
                      key={star}
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <span
                        className="
                          w-8
                          text-[10px]
                          text-white/35
                        "
                      >
                        {star}★
                      </span>

                      <div
                        className="
                          h-1.5
                          flex-1
                          overflow-hidden
                          rounded-full
                          bg-white/[0.06]
                        "
                      >
                        <div
                          className="
                            h-full
                            rounded-full
                            bg-[#d4af37]
                            transition-all
                            duration-700
                          "
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                      <span
                        className="
                          w-9
                          text-right
                          text-[10px]
                          text-white/25
                        "
                      >
                        {percentage}%
                      </span>

                    </div>
                  );
                }
              )}

            </div>

          </div>


          {/* REVIEW LIST */}

          <div
            className="
              mt-8
              grid
              gap-3
              md:grid-cols-2
            "
          >

            {totalReviews > 0 ? (
              product.reviews.map(
                (review, index) => (
                  <article
                    key={index}
                    className="
                      rounded-xl
                      border
                      border-white/[0.06]
                      bg-white/[0.018]
                      p-5
                      transition-all
                      duration-300
                      hover:border-white/[0.11]
                      hover:bg-white/[0.025]
                    "
                  >

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >

                      <div>

                        <p
                          className="
                            text-sm
                            font-medium
                            text-white
                          "
                        >
                          {review.name}
                        </p>

                        <div className="mt-2 flex gap-0.5">
                          {renderStars(
                            review.rating,
                            11
                          )}
                        </div>

                      </div>

                      <time
                        className="
                          text-[9px]
                          text-white/20
                        "
                      >
                        {new Date(
                          review.createdAt
                        ).toLocaleDateString()}
                      </time>

                    </div>

                    <p
                      className="
                        mt-4
                        text-sm
                        leading-6
                        text-white/45
                      "
                    >
                      {review.comment}
                    </p>

                  </article>
                )
              )
            ) : (
              <div
                className="
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.018]
                  p-8
                  text-center
                  md:col-span-2
                "
              >
                <p className="text-sm text-white/35">
                  No reviews yet.
                </p>

                <p className="mt-1 text-xs text-white/20">
                  Be the first to share your experience.
                </p>
              </div>
            )}

          </div>


          {/* WRITE REVIEW */}

          <div
            className="
              mt-8
              rounded-2xl
              border
              border-white/[0.07]
              bg-white/[0.02]
              p-6
              sm:p-8
            "
          >

            <div className="mb-6">

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-white/30
                "
              >
                Your Experience
              </p>

              <h3
                className="
                  mt-2
                  text-lg
                  font-medium
                "
              >
                Write a Review
              </h3>

            </div>


            <div className="space-y-5">

              {/* RATING */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wider
                    text-white/35
                  "
                >
                  Rating
                </label>

                <select
                  value={userRating}
                  onChange={(event) =>
                    setUserRating(
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    appearance-none
                    rounded-lg
                    border
                    border-white/10
                    bg-[#0b0b0d]
                    px-4
                    py-3
                    text-sm
                    text-white/80
                    outline-none
                    transition
                    focus:border-white/30
                  "
                >
                  <option value="">
                    Select Rating
                  </option>
                  <option value="5">
                    5 — Excellent
                  </option>
                  <option value="4">
                    4 — Good
                  </option>
                  <option value="3">
                    3 — Average
                  </option>
                  <option value="2">
                    2 — Poor
                  </option>
                  <option value="1">
                    1 — Terrible
                  </option>
                </select>

              </div>


              {/* COMMENT */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wider
                    text-white/35
                  "
                >
                  Your Review
                </label>

                <textarea
                  rows={5}
                  value={userComment}
                  onChange={(event) =>
                    setUserComment(
                      event.target.value
                    )
                  }
                  placeholder="Share your experience with this product..."
                  className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-white/10
                    bg-[#0b0b0d]
                    px-4
                    py-3
                    text-sm
                    leading-6
                    text-white/80
                    outline-none
                    placeholder:text-white/20
                    transition
                    focus:border-white/30
                  "
                />

              </div>


              {/* SUBMIT */}

              <button
                type="button"
                onClick={
                  handleSubmitReview
                }
                className="
                  w-full
                  rounded-full
                  bg-white
                  py-3.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-black
                  transition-all
                  duration-300
                  hover:bg-white/90
                  hover:shadow-[0_12px_35px_rgba(255,255,255,0.08)]
                  active:scale-[0.99]
                "
              >
                Submit Review
              </button>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}