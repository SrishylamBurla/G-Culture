import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import toast from "react-hot-toast";

// RTK QUERY
import { useGetProductByIdQuery } from "../features/products/productApi";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // RTK Query fetch product
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImg, setSelectedImg] = useState("");

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

  // UI (same as before)
  return (
    <div className="pt-[6rem] md:pt-[7rem] min-h-screen bg-[#001424] text-white py-6 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] bg-repeat opacity-[0.97]">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 px-4 md:px-10">
        
        {/* ---- LEFT SECTION (Images) ---- */}
        <div className="w-full lg:w-[52%] flex gap-4">
          <div className="flex flex-col gap-3 w-20 sticky top-32 h-fit">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImg(img)}
                className={`w-full h-20 rounded-md object-cover cursor-pointer transition-all ${
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
              className="w-full h-[580px] object-cover rounded-xl shadow-md hover:scale-[1.02] transition duration-300"
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
        </div>
      </div>
    </div>
  );
}
