import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function LatestProductCard({ product }) {
  const price = Number(product.price) || 0;
  const offerPrice = Number(product.offerPrice) || 0;

  const offerPercentage =
    product.offerPercentage ||
    (offerPrice && price > offerPrice
      ? Math.round(((price - offerPrice) / price) * 100)
      : 0);

  return (
    <div className="relative bg-white overflow-hidden group transition-all duration-500 shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:scale-[1.02] cursor-pointer">

      {/* LINK WRAPPER */}
      <Link to={`/product/${product._id}`} className="block">

        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Offer Badge */}
          {offerPercentage > 0 && (
            <span className="absolute left-2 top-2 bg-gradient-to-r from-[#0f6ed4] via-[#a01cb2] to-[#de8328] text-white px-2 py-1 text-xs font-bold shadow-md">
              {offerPercentage}% Off
            </span>
          )}
        </div>

        {/* Info Section */}
        <div className="p-2 text-center bg-amber-50">

          {/* Product Name */}
          <h4
            className="text-sm font-semibold uppercase tracking-wide text-gray-800 truncate"
            title={product.name}
          >
            {product.name}
          </h4>

          {/* Price */}
          <div className="mt-1">
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

          {/* ⭐ Rating & Reviews */}
          <div className="flex justify-center items-center gap-1 mt-1 text-yellow-500">
            <Star size={14} className="fill-yellow-500" />
            <span className="text-xs text-gray-700">{product.rating}</span>
            <span className="text-[11px] text-gray-500">({product.numReviews})</span>
          </div>

        </div>
      </Link>
    </div>
  );
}
