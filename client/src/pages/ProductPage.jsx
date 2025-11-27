import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import toast from "react-hot-toast";

// RTK QUERY
import { useGetProductByIdQuery } from "../features/products/productApi";
import useGetCreateReviewMutation from "../features/products/productApi";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // RTK Query fetch product
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const [createReview] = useGetCreateReviewMutation();

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

  // LOADING UI
  if (isLoading)
    return <div className="p-8 text-center text-white">Loading...</div>;

  // ERROR UI
  if (isError || !product)
    return (
      <div className="p-8 text-center text-red-400">Product not found.</div>
    );

  const countInStock = product.countInStock || 0;

  // QUANTITY
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

  // VALIDATION
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

  // ADD TO CART
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

  // TOGGLE WISHLIST
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  const handleSubmitReview = async () => {
    if (!userRating || !userComment) {
      toast.error("Please select rating and write a review");
      return;
    }
    try {
      await createReview({
        productId: product._id,
        rating: userRating,
        comment: userComment,
      }).unwrap();

      toast.success("Review added!");

      setUserRating("");
      setUserComment("");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add review");
    }
  };

  // UI (same as before)
  return (
    <div className="pt-[6rem] md:pt-[7rem] min-h-screen bg-[#001424] text-white py-6 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] bg-repeat opacity-[0.97]">
      <div className="w-full flex flex-col lg:flex-row gap-12 px-4 md:px-6">
        {/* ---- LEFT SECTION (Images) ---- */}
        <div className="w-full lg:w-[52%] flex gap-4">
          <div className="flex flex-col gap-3 w-20 sticky top-32 h-fit">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImg(img)}
                className={`w-full h-20 rounded-sm object-cover cursor-pointer transition-all ${
                  selectedImg === img
                    ? "ring-2 ring-white scale-[1.02]"
                    : "hover:opacity-80"
                }`}
              />
            ))}
          </div>

          <div className="flex-1">
            <img
              src={selectedImg || product.images?.[0]}
              className="w-full h-[580px] object-cover rounded-sm shadow-md hover:scale-[1.02] transition duration-300"
            />
          </div>
        </div>

        {/* ---- RIGHT SECTION ---- */}
        <div className="w-full lg:w-[40%] space-y-6 pb-10">
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
          </div>

          {/* ---- SIZES ---- */}
          {product.sizes?.length > 0 && (
            <div>
              <p className="font-semibold mb-3 text-gray-200">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center rounded-md border text-sm ${
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

          {/* ---- COLORS ---- */}
          {product.colors?.length > 0 && (
            <div>
              <p className="font-semibold mb-3 text-gray-200">Color</p>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-10 h-10 rounded-md cursor-pointer border ${
                      selectedColor === c
                        ? "border-white ring-1 ring-gray-200"
                        : "border-gray-400 hover:border-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
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

          {/* ⭐ REVIEW SECTION */}

          <div className="mt-16 bg-white/5 p-6 rounded-sm border border-white/10 shadow-lg">
            {/* Overall Rating */}
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              ⭐ Customer Reviews
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold text-yellow-400">
                {product.rating?.toFixed(1) || "0.0"}
              </div>
              <p className="text-gray-300 text-sm">
                {product.numReviews || 0} reviews
              </p>
            </div>

            {/* Divider */}
            <hr className="border-gray-600 mb-6" />

            {/* REVIEWS LIST */}
            <div className="space-y-6">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev, i) => (
                  <div
                    key={i}
                    className="bg-white/5 p-4 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{rev.name}</p>
                      <p className="text-yellow-400 text-sm">⭐ {rev.rating}</p>
                    </div>

                    <p className="text-gray-300 mt-2 text-sm">{rev.comment}</p>

                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No reviews yet. Be the first!</p>
              )}
            </div>
            {/* ADD REVIEW FORM */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-3">Write a Review</h3>

              <div className="flex flex-col gap-4">
                {/* Rating */}
                <select
                  className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2"
                  onChange={(e) => setUserRating(e.target.value)}
                >
                  <option value="">Select Rating</option>
                  <option value="5">⭐ 5 - Excellent</option>
                  <option value="4">⭐ 4 - Good</option>
                  <option value="3">⭐ 3 - Average</option>
                  <option value="2">⭐ 2 - Poor</option>
                  <option value="1">⭐ 1 - Terrible</option>
                </select>

                {/* Comment */}
                <textarea
                  rows="4"
                  placeholder="Write your review..."
                  className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2"
                  onChange={(e) => setUserComment(e.target.value)}
                />

                <button
                  onClick={handleSubmitReview}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition"
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
