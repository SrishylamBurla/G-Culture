import { Link } from "react-router-dom";
import { Star, ArrowUpRight } from "lucide-react";

export default function FeaturedProductCard({ product }) {
  const price = Number(product.price) || 0;
  const offerPrice = Number(product.offerPrice) || 0;

  const offerPercentage =
    Number(product.offerPercentage) ||
    (offerPrice > 0 && price > offerPrice
      ? Math.round(((price - offerPrice) / price) * 100)
      : 0);

  const rating = Number(product.rating) || 0;
  const reviews = Number(product.numReviews) || 0;

  const image =
    product.images?.[0] ||
    "/images/product-placeholder.webp";

  const displayName = product.name || "Product";

  return (
    <article className="group relative w-full min-w-0">
      <Link
        to={`/product/${product._id}`}
        className="block w-full"
      >
        {/* =================================================
            IMAGE
        ================================================== */}

        <div
          className="
            relative
            w-full
            overflow-hidden
            rounded-xl
            bg-[#111113]
            border
            border-white/[0.07]
            aspect-[0.78]
          "
        >
          <img
            src={image}
            alt={displayName}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src =
                "/images/product-placeholder.webp";
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-[cubic-bezier(.2,.8,.2,1)]
              group-hover:scale-[1.045]
            "
          />

          {/* subtle image overlay */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/20
              via-transparent
              to-transparent
              opacity-70
            "
          />

          {/* =================================================
              DISCOUNT
          ================================================== */}

          {offerPercentage > 0 && (
            <span
              className="
                absolute
                left-3
                top-3
                z-10
                rounded-full
                bg-white
                px-2.5
                py-1
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-black
                shadow-lg
              "
            >
              {offerPercentage}% OFF
            </span>
          )}

          {/* =================================================
              VIEW BUTTON
          ================================================== */}

          <span
            className="
              absolute
              bottom-3
              right-3
              z-10
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/45
              text-white
              opacity-0
              backdrop-blur-md
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
              translate-y-2
            "
          >
            <ArrowUpRight
              size={14}
              strokeWidth={1.7}
            />
          </span>
        </div>

        {/* =================================================
            PRODUCT INFORMATION
        ================================================== */}

        <div className="px-1 pt-3 pb-1">
          {/* Product name */}

          <h3
            title={displayName}
            className="
              overflow-hidden
              text-ellipsis
              whitespace-nowrap
              text-[14px]
              font-medium
              tracking-[-0.01em]
              text-white/85
              transition-colors
              duration-300
              group-hover:text-white
            "
          >
            {displayName}
          </h3>

          {/* Rating */}

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-[2px]">
              {[0, 1, 2, 3, 4].map((index) => {
                const filled = index < Math.round(rating);

                return (
                  <Star
                    key={index}
                    size={12}
                    strokeWidth={1.5}
                    className={
                      filled
                        ? "fill-white text-white"
                        : "fill-transparent text-white/20"
                    }
                  />
                );
              })}
            </div>

            <span className="text-[12px] text-white/35">
              {reviews > 0 ? `(${reviews})` : "(0)"}
            </span>
          </div>

          {/* Price */}

          <div className="mt-2.5 flex items-baseline gap-2">
            {offerPrice > 0 && offerPrice < price ? (
              <>
                <span className="text-[14px] font-semibold tracking-tight text-white">
                  ₹{offerPrice.toLocaleString("en-IN")}
                </span>

                <span className="text-[12px] text-white/30 line-through">
                  ₹{price.toLocaleString("en-IN")}
                </span>
              </>
            ) : (
              <span className="text-[14px] font-semibold tracking-tight text-white">
                ₹{price.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}