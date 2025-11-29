// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../features/cart/cartSlice";
// import { toggleWishlist } from "../features/wishlist/wishlistSlice";
// import toast from "react-hot-toast";

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

//   const [userRating, setUserRating] = useState("");
//   const [userComment, setUserComment] = useState("");

//   const isWishlisted = product
//     ? wishlist.some((i) => i._id === product._id)
//     : false;

//   if (isLoading)
//     return <div className="p-8 text-center text-white">Loading...</div>;
//   if (isError || !product)
//     return (
//       <div className="p-8 text-center text-red-400">Product not found.</div>
//     );

//   const countInStock = product.countInStock || 0;

//   // QUANTITY
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

//   // Validate size/color
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

//   // Add to Cart
//   const handleAddToCart = () => {
//     if (!validateSelection()) return;

//     dispatch(addToCart({ ...product, quantity, selectedSize, selectedColor }));
//     toast.success("Added to cart");
//   };

//   // Buy Now
//   const handleBuyNow = () => {
//     if (!validateSelection()) return;

//     dispatch(addToCart({ ...product, quantity, selectedSize, selectedColor }));
//     toast.success("Redirecting...");
//     setTimeout(() => navigate("/checkout"), 800);
//   };

//   // Wishlist
//   const handleToggleWishlist = (e) => {
//     e.preventDefault();
//     dispatch(toggleWishlist(product));
//   };

//   // SUBMIT REVIEW
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

//       refetch(); // live update
//     } catch (error) {
//       toast.error(error?.data?.message || "Failed to add review");
//     }
//   };

//   // ⭐ AMAZON STAR SVG COMPONENTS
//   const StarFull = () => (
//     <svg
//       width="22"
//       height="22"
//       fill="#fbbf24"
//       stroke="#fbbf24"
//       viewBox="0 0 24 24"
//     >
//       <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.742 1.48 8.295L12 18.896l-7.416 4.447 1.48-8.295L0 9.306l8.332-1.151z" />
//     </svg>
//   );

//   const StarHalf = () => (
//     <svg width="22" height="22" viewBox="0 0 24 24">
//       <defs>
//         <linearGradient id="half">
//           <stop offset="50%" stopColor="#fbbf24" />
//           <stop offset="50%" stopColor="transparent" />
//         </linearGradient>
//       </defs>
//       <path
//         fill="url(#half)"
//         stroke="#fbbf24"
//         d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.742
//         1.48 8.295L12 18.896l-7.416 4.447 1.48-8.295L0 9.306
//         8.332-1.151z"
//       />
//     </svg>
//   );

//   const StarEmpty = () => (
//     <svg
//       width="22"
//       height="22"
//       fill="transparent"
//       stroke="#fbbf24"
//       viewBox="0 0 24 24"
//     >
//       <path
//         d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.742
//       1.48 8.295L12 18.896l-7.416 4.447 1.48-8.295L0
//       9.306l8.332-1.151z"
//       />
//     </svg>
//   );

//   const renderStars = (rating) => {
//     const stars = [];

//     for (let i = 1; i <= 5; i++) {
//       if (rating >= i) stars.push("full");
//       else if (rating >= i - 0.5) stars.push("half");
//       else stars.push("empty");
//     }

//     return stars.map((type, i) => (
//       <span key={i} className="inline-flex">
//         {type === "full" ? (
//           <StarFull />
//         ) : type === "half" ? (
//           <StarHalf />
//         ) : (
//           <StarEmpty />
//         )}
//       </span>
//     ));
//   };

//   const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
//     return (
//       product.reviews?.filter((rev) => Math.round(rev.rating) === star)
//         .length || 0
//     );
//   });

//   const totalReviews = product.reviews?.length || 0;

//   const getPercent = (count) =>
//     totalReviews === 0 ? 0 : Math.round((count / totalReviews) * 100);

//   return (
//     <div className="pt-[4.5rem] md:pt-[6.5rem] bg-gray-600 text-white p-6">
//       <div className="w-full flex flex-col lg:flex-row gap-12">
//         {/* LEFT IMAGES */}
//         <div className="w-full lg:w-[50%] flex gap-4">
//           <div className="flex flex-col gap-3 w-20 sticky top-32 h-fit">
//             {product.images?.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 onClick={() => setSelectedImg(img)}
//                 className={`w-full h-20 rounded-sm cursor-pointer object-cover ${
//                   selectedImg === img
//                     ? "ring-2 ring-white scale-105"
//                     : "hover:opacity-70"
//                 }`}
//               />
//             ))}
//           </div>

//           <div className="flex-1">
//             <img
//               src={selectedImg || product.images[0]}
//               className="w-full h-[550px] object-cover rounded-sm shadow-lg"
//             />
//           </div>
//         </div>

//         {/* RIGHT INFO */}
//         <div className="w-full lg:w-[40%] space-y-6">
//           {/* TITLE */}
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl font-bold">{product.name}</h1>
//               <p className="text-gray-300">{product.category}</p>

//               {/* ⭐ Stars */}
//               <div className="flex items-center gap-2 mt-2">
//                 {renderStars(product.rating)}
//                 <span className="text-sm text-gray-300">
//                   {product.rating?.toFixed(1)} / 5
//                 </span>
//               </div>
//             </div>

//             <button
//               onClick={handleToggleWishlist}
//               className="text-3xl hover:scale-110 transition"
//             >
//               {isWishlisted ? "💖" : "🤍"}
//             </button>
//           </div>

//           {/* PRICE */}
//           <div>
//             {product.offerPrice ? (
//               <div className="flex items-center gap-3">
//                 <p className="text-3xl font-bold">₹{product.offerPrice}</p>
//                 <p className="line-through text-gray-800">₹{product.price}</p>
//                 <p className="text-green-400 font-semibold">
//                   {Math.round(
//                     ((product.price - product.offerPrice) / product.price) * 100
//                   )}
//                   % OFF
//                 </p>
//               </div>
//             ) : (
//               <p className="text-3xl font-bold">₹{product.price}</p>
//             )}
//           </div>

//           {/* SIZE */}
//           {product.sizes?.length > 0 && (
//             <div>
//               <p className="font-semibold mb-2">Select Size</p>
//               <div className="flex gap-3">
//                 {product.sizes.map((s) => (
//                   <button
//                     key={s}
//                     onClick={() => setSelectedSize(s)}
//                     className={`w-12 h-12 border rounded-md ${
//                       selectedSize === s
//                         ? "bg-white text-black"
//                         : "border-gray-400 hover:border-white"
//                     }`}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* COLOR */}
//           {product.colors?.length > 0 && (
//             <div>
//               <p className="font-semibold mb-2">Color</p>
//               <div className="flex gap-3">
//                 {product.colors.map((c) => (
//                   <div
//                     key={c}
//                     onClick={() => setSelectedColor(c)}
//                     style={{ backgroundColor: c }}
//                     className={`w-10 h-10 rounded-md cursor-pointer border ${
//                       selectedColor === c
//                         ? "border-white ring-1"
//                         : "border-gray-400"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* QUANTITY */}
//           <div className="flex items-center gap-3 mt-4">
//             <p className="font-medium">Quantity</p>
//             <div className="flex items-center border border-gray-400 rounded">
//               <button
//                 onClick={() => handleQuantityChange("decrease")}
//                 className="px-3 py-1"
//               >
//                 -
//               </button>
//               <span className="px-4">{quantity}</span>
//               <button
//                 onClick={() => handleQuantityChange("increase")}
//                 className="px-3 py-1"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* BUTTONS */}
//           <div className="flex gap-4">
//             <button
//               onClick={handleAddToCart}
//               className="flex-1 py-3 bg-black text-white rounded-lg"
//             >
//               Add to Bag
//             </button>

//             <button
//               onClick={handleBuyNow}
//               className="flex-1 py-3 border border-gray-400 rounded-lg"
//             >
//               Buy Now
//             </button>
//           </div>

//           {/* DESCRIPTION */}
//           <div className="pt-6 border-t border-gray-600">
//             <h3 className="font-semibold mb-1">Product Details</h3>
//             <p className="text-gray-300 text-sm">{product.description}</p>
//           </div>

//           {/* ⭐ CUSTOMER REVIEWS SECTION (Amazon Style) */}
//           <div className="mt-14 bg-white/5 p-6 rounded border border-white/10 shadow-xl">
//             <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
//               Customer Reviews
//             </h2>

//             <div className="flex items-center gap-4 mb-6">
//               <div className="flex items-center gap-1">
//                 {renderStars(product.rating)}
//               </div>

//               <div>
//                 <p className="text-3xl font-bold text-yellow-400 leading-none">
//                   {product.rating?.toFixed(1)}
//                 </p>
//                 <p className="text-gray-300 text-sm">
//                   {totalReviews} global ratings
//                 </p>
//               </div>
//             </div>

//             {/* ⭐ Rating Bars */}
//             <div className="space-y-3 mb-10">
//               {[5, 4, 3, 2, 1].map((star, idx) => (
//                 <div key={star} className="flex items-center gap-3">
//                   <span className="w-12 text-sm">{star} star</span>

//                   <div className="flex-1 h-3 bg-gray-700 rounded overflow-hidden">
//                     <div
//                       className="h-full bg-yellow-500 rounded"
//                       style={{ width: `${getPercent(ratingCounts[idx])}%` }}
//                     />
//                   </div>

//                   <span className="w-10 text-right text-sm text-gray-300">
//                     {getPercent(ratingCounts[idx])}%
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* ⭐ Individual Reviews */}
//             <div className="space-y-4">
//               {product.reviews?.length > 0 ? (
//                 product.reviews.map((rev, i) => (
//                   <div
//                     key={i}
//                     className="bg-white/5 p-4 rounded border border-white/10"
//                   >
//                     <p className="font-semibold">{rev.name}</p>

//                     <div className="flex items-center gap-1 mt-1">
//                       {renderStars(rev.rating)}
//                       <span className="text-yellow-400 text-sm">
//                         {rev.rating}
//                       </span>
//                     </div>

//                     <p className="text-gray-300 text-sm mt-2">{rev.comment}</p>

//                     <p className="text-gray-800 text-xs mt-1">
//                       {new Date(rev.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-400">No reviews yet.</p>
//               )}
//             </div>

//             {/* ⭐ Write a Review */}
//             <div className="mt-10">
//               <h3 className="text-xl font-semibold mb-3">Write a Review</h3>

//               <div className="flex flex-col gap-4">
//                 {/* Rating Selector */}
//                 <select
//                   className="bg-gray-700 text-white border border-white/20 rounded px-3 py-2"
//                   value={userRating}
//                   onChange={(e) => setUserRating(e.target.value)}
//                 >
//                   <option value="">Select Rating</option>
//                   <option value="5">⭐ 5 - Excellent</option>
//                   <option value="4">⭐ 4 - Good</option>
//                   <option value="3">⭐ 3 - Average</option>
//                   <option value="2">⭐ 2 - Poor</option>
//                   <option value="1">⭐ 1 - Terrible</option>
//                 </select>

//                 {/* Comment */}
//                 <textarea
//                   rows="4"
//                   placeholder="Write your review..."
//                   className="bg-gray-700 text-white border border-white/20 rounded px-3 py-2"
//                   value={userComment}
//                   onChange={(e) => setUserComment(e.target.value)}
//                 />

//                 <button
//                   onClick={handleSubmitReview}
//                   className="py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded"
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

  const [createReview] = useCreateReviewMutation();

  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImg, setSelectedImg] = useState("");

  const [userRating, setUserRating] = useState("");
  const [userComment, setUserComment] = useState("");

  const isWishlisted = product
    ? wishlist.some((i) => i._id === product._id)
    : false;

  if (isLoading)
    return <div className="p-8 text-center text-white">Loading...</div>;
  if (isError || !product)
    return (
      <div className="p-8 text-center text-red-400">Product not found.</div>
    );

  const countInStock = product.countInStock || 0;

  // QUANTITY CONTROL
  const handleQuantityChange = (type) => {
    if (type === "decrease") {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    } else if (type === "increase") {
      if (quantity < countInStock) {
        setQuantity((prev) => prev + 1);
      } else {
        toast.error(`Only ${countInStock} left in stock`);
      }
    }
  };

  // VALIDATE SIZE & COLOR
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

  // ADD TO BAG
  const handleAddToCart = () => {
    if (!validateSelection()) return;

    dispatch(addToCart({ ...product, quantity, selectedSize, selectedColor }));
    toast.success("Added to cart");
  };

  // BUY NOW
  const handleBuyNow = () => {
    if (!validateSelection()) return;

    dispatch(addToCart({ ...product, quantity, selectedSize, selectedColor }));
    toast.success("Redirecting...");
    setTimeout(() => navigate("/checkout"), 800);
  };

  // WISHLIST
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  // SUBMIT REVIEW
  const handleSubmitReview = async () => {
    if (!userRating || !userComment) {
      toast.error("Please select rating & write a review");
      return;
    }

    try {
      await createReview({
        productId: product._id,
        rating: Number(userRating),
        comment: userComment,
      }).unwrap();

      toast.success("Review added!");
      setUserRating("");
      setUserComment("");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add review");
    }
  };

  // ⭐ AMAZON STAR SVGs
  const StarFull = () => (
    <svg
      width="20"
      height="20"
      fill="#fbbf24"
      stroke="#fbbf24"
      viewBox="0 0 24 24"
    >
      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.742 1.48 8.295L12 18.896l-7.416 4.447 1.48-8.295L0 9.306l8.332-1.151z" />
    </svg>
  );
  const StarHalf = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="halfA1">
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        fill="url(#halfA1)"
        stroke="#fbbf24"
        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.742 
        1.48 8.295L12 18.896l-7.416 4.447 1.48-8.295L0 9.306 
        8.332-1.151z"
      />
    </svg>
  );
  const StarEmpty = () => (
    <svg
      width="20"
      height="20"
      fill="transparent"
      stroke="#fbbf24"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.742 
      1.48 8.295L12 18.896l-7.416 4.447 1.48-8.295L0 
      9.306l8.332-1.151z"
      />
    </svg>
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push("full");
      else if (rating >= i - 0.5) stars.push("half");
      else stars.push("empty");
    }
    return stars.map((t, i) => (
      <span key={i}>
        {t === "full" ? (
          <StarFull />
        ) : t === "half" ? (
          <StarHalf />
        ) : (
          <StarEmpty />
        )}
      </span>
    ));
  };

  // ⭐ Ratings Breakdown
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) =>
      product.reviews?.filter((rev) => Math.round(rev.rating) === star)
        .length || 0
  );

  const totalReviews = product.reviews?.length || 0;
  const getPercent = (count) =>
    totalReviews === 0 ? 0 : Math.round((count / totalReviews) * 100);

  return (
    <div className="pt-[5rem] md:pt-[5.8rem] bg-[#0c0c0c] text-white">
      <div className="w-full flex flex-col lg:flex-row">

        {/* LEFT IMAGES RESPONSIVE */}
        <div className="w-full lg:w-[50%] px-3">
          {/*  MOBILE VERSION  (horizontal slider thumbnails) */}
          <div className="md:hidden w-full space-y-4">
            {/* MAIN IMAGE */}
            <div className="w-full">
              <img
                src={selectedImg || product.images[0]}
                className="w-full h-[440px] object-cover rounded-xs shadow-lg"
              />
            </div>

            {/* THUMBNAIL CAROUSEL */}
            <div className="flex gap-3 overflow-x-scroll scrollbar-hide pb-2">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImg(img)}
                  className={`w-24 h-24 flex-shrink-0 rounded-xs object-cover cursor-pointer transition 
            ${
              selectedImg === img ? "ring-2 ring-white scale-105" : "opacity-80"
            }`}
                />
              ))}
            </div>
          </div>

          {/* 👉 DESKTOP VERSION (unchanged) */}
          <div className="hidden md:flex gap-4 p-3">
            <div className="flex flex-col gap-3 w-20 sticky top-28 h-fit">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImg(img)}
                  className={`w-full h-20 object-cover rounded-sm cursor-pointer transition 
            ${
              selectedImg === img
                ? "ring-2 ring-white scale-105"
                : "hover:opacity-70"
            }`}
                />
              ))}
            </div>

            <div className="flex-1">
              <img
                src={selectedImg || product.images[0]}
                className="w-full h-[520px] object-cover rounded-sm shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="w-full lg:w-[50%] space-y-6 p-3">
          {/* TITLE */}
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <p className="text-xs text-gray-400">{product.category}</p>

              <div className="flex items-center gap-2 mt-1">
                {renderStars(product.rating)}
                <span className="text-xs text-gray-300">
                  {product.rating?.toFixed(1)} / 5
                </span>
              </div>
            </div>

            <button className="text-3xl" onClick={handleToggleWishlist}>
              {isWishlisted ? "💖" : "🤍"}
            </button>
          </div>

          {/* PRICE */}
          <div>
            {product.offerPrice ? (
              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold">₹{product.offerPrice}</p>
                <p className="line-through text-gray-600 text-sm">
                  ₹{product.price}
                </p>
                <p className="text-green-500 text-xs font-semibold">
                  {Math.round(
                    ((product.price - product.offerPrice) / product.price) * 100
                  )}
                  % OFF
                </p>
              </div>
            ) : (
              <p className="text-2xl font-bold">₹{product.price}</p>
            )}
          </div>

          {/* SIZE */}
          {product.sizes?.length > 0 && (
            <div>
              <p className="font-semibold text-sm mb-2">Select Size</p>
              <div className="flex gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-10 h-10 border rounded-md text-xs ${
                      selectedSize === s
                        ? "bg-white text-black"
                        : "border-gray-500 hover:border-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* COLOR */}
          {product.colors?.length > 0 && (
            <div>
              <p className="font-semibold text-sm mb-2">Color</p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <div
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-9 h-9 rounded-md border cursor-pointer ${
                      selectedColor === c
                        ? "border-white ring-1"
                        : "border-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className="flex items-center gap-3 mt-4">
            <p className="text-sm">Quantity</p>

            <div className="flex items-center border border-gray-500 rounded">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="px-3 py-1 text-sm"
              >
                -
              </button>
              <span className="px-4 text-sm">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="px-3 py-1 text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
              className="flex-1 py-3 bg-white text-black rounded text-sm"
              onClick={handleAddToCart}
            >
              Add to Bag
            </button>

            <button
              className="flex-1 py-3 border border-gray-500 rounded text-sm"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>

          {/* DESCRIPTION */}
          <div className="pt-6 border-t border-gray-700">
            <h3 className="font-semibold text-sm mb-1">Product Details</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* ⭐ REVIEWS */}
          <div className="mt-12 bg-white/5 p-6 rounded border border-white/10 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex">{renderStars(product.rating)}</div>

              <div>
                <p className="text-2xl font-bold text-yellow-400">
                  {product.rating?.toFixed(1)}
                </p>
                <p className="text-xs text-gray-400">
                  {totalReviews} global ratings
                </p>
              </div>
            </div>

            {/* RATING BARS */}
            <div className="space-y-2 mb-10">
              {[5, 4, 3, 2, 1].map((star, idx) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-xs w-10">{star} star</span>

                  <div className="flex-1 h-2.5 bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded"
                      style={{ width: `${getPercent(ratingCounts[idx])}%` }}
                    />
                  </div>

                  <span className="w-8 text-right text-xs text-gray-400">
                    {getPercent(ratingCounts[idx])}%
                  </span>
                </div>
              ))}
            </div>

            {/* REVIEW LIST */}
            <div className="space-y-3">
              {totalReviews > 0 ? (
                product.reviews.map((rev, i) => (
                  <div
                    key={i}
                    className="bg-white/5 p-4 rounded border border-white/10 text-xs"
                  >
                    <p className="font-semibold text-sm">{rev.name}</p>

                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(rev.rating)}
                      <span className="text-yellow-400">{rev.rating}</span>
                    </div>

                    <p className="text-gray-300 mt-2 text-xs">{rev.comment}</p>

                    <p className="text-gray-500 text-[10px] mt-1">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-xs">No reviews yet.</p>
              )}
            </div>

            {/* WRITE REVIEW */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Write a Review</h3>

              <div className="flex flex-col gap-3">
                <select
                  className="bg-gray-700 text-white text-sm border border-white/20 rounded px-3 py-2"
                  value={userRating}
                  onChange={(e) => setUserRating(e.target.value)}
                >
                  <option value="">Select Rating</option>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>

                <textarea
                  rows="4"
                  placeholder="Write your review..."
                  className="bg-gray-700 text-white text-sm border border-white/20 rounded px-3 py-2"
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                />

                <button
                  onClick={handleSubmitReview}
                  className="py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded text-sm"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
