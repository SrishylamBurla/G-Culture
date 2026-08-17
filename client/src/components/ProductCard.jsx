import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { useState } from "react";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import {
  Heart,
  ShoppingBag,
  Star,
  X,
  ArrowUpRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wishlist } = useSelector(
    (state) => state.wishlist
  );

  const { cartItems } = useSelector(
    (state) => state.cart
  );

  const cartItem = cartItems.find(
    (item) => item._id === product._id
  );

  const quantity = cartItem
    ? cartItem.quantity
    : 1;

  const [showSizePopup, setShowSizePopup] =
    useState(null);

  const [selectedColor, setSelectedColor] =
    useState("");

  const [selectedSize, setSelectedSize] =
    useState("");

  const [isBuyNow, setIsBuyNow] =
    useState(false);


  /* =====================================================
     PRODUCT DATA
  ====================================================== */

  const isWishlisted = wishlist.some(
    (item) => item._id === product._id
  );

  const price =
    Number(product.price) || 0;

  const offerPrice =
    Number(
      product.offerPrice ||
        product.discountPrice ||
        product.salePrice
    ) || 0;

  const offerPercentage =
    product.offerPercentage ||
    (offerPrice && price > offerPrice
      ? Math.round(
          ((price - offerPrice) / price) * 100
        )
      : 0);

  const stock =
    Number(product.countInStock) || 0;

  const rating =
    Number(product.rating) || 0;

  const reviewCount =
    Number(product.numReviews) || 0;

  const hasDiscount =
    offerPrice > 0 &&
    offerPrice < price;


  /* =====================================================
     ADD TO CART
  ====================================================== */

  const handleAddToCart = (
    product,
    redirectAfter = false
  ) => {
    if (
      product.sizes?.length &&
      !selectedSize
    ) {
      toast.error(
        "Please select a size"
      );

      return;
    }

    const colorToUse =
      selectedColor ||
      product.colors?.[0] ||
      "";

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
        ? `"${product.name}" added — redirecting...`
        : `"${product.name}" added to cart`
    );

    if (redirectAfter) {
      setTimeout(() => {
        navigate("/cart");
      }, 700);
    }
  };


  /* =====================================================
     OPEN OPTIONS
  ====================================================== */

  const handlePopupOpen = (
    product,
    isBuy = false
  ) => {
    if (stock <= 0) {
      toast.error(
        "This product is out of stock"
      );

      return;
    }

    setIsBuyNow(isBuy);

    setShowSizePopup(product._id);

    setSelectedColor("");

    setSelectedSize("");
  };


  /* =====================================================
     WISHLIST
  ====================================================== */

  const handleToggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(
      toggleWishlist(product)
    );
  };


  /* =====================================================
     RATING STARS
  ====================================================== */

  const roundedRating =
    Math.round(rating);


  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[14px]
        border
        border-white/[0.07]
        bg-[#0b0b0d]
        shadow-[0_8px_35px_rgba(0,0,0,0.18)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-white/[0.14]
        hover:shadow-[0_18px_50px_rgba(0,0,0,0.32)]
      "
    >

      {/* =================================================
          PRODUCT LINK
      ================================================== */}

      <Link
        to={`/product/${product._id}`}
        className="block"
      >

        {/* ===============================================
            IMAGE
        ================================================ */}

        <div
          className="
            relative
            aspect-[3/4]
            overflow-hidden
            bg-[#111113]
          "
        >

          <img
            src={
              product.images?.[0] ||
              "/images/tee1.svg"
            }
            alt={product.name}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-[900ms]
              ease-[cubic-bezier(.2,.8,.2,1)]
              group-hover:scale-[1.045]
            "
          />


          {/* =============================================
              IMAGE VIGNETTE
          ============================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/35
              via-transparent
              to-black/10
              opacity-70
            "
          />


          {/* =============================================
              DISCOUNT
          ============================================== */}

          {offerPercentage > 0 && (
            <div
              className="
                absolute
                left-3
                top-3
                rounded-full
                border
                border-white/20
                bg-white
                px-2.5
                py-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-black
                shadow-lg
              "
            >
              {offerPercentage}% OFF
            </div>
          )}


          {/* =============================================
              WISHLIST
          ============================================== */}

          <button
            type="button"
            aria-label={
              isWishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            onClick={
              handleToggleWishlist
            }
            className={`
              absolute
              right-3
              top-3
              z-10
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              backdrop-blur-xl
              transition-all
              duration-300
              active:scale-90

              ${
                isWishlisted
                  ? `
                    border-white
                    bg-white
                    text-black
                    shadow-lg
                  `
                  : `
                    border-white/15
                    bg-black/35
                    text-white
                    hover:border-white/35
                    hover:bg-white
                    hover:text-black
                  `
              }
            `}
          >
            <Heart
              size={15}
              strokeWidth={1.8}
              className={
                isWishlisted
                  ? "fill-black"
                  : ""
              }
            />
          </button>


          {/* =============================================
              LOW STOCK
          ============================================== */}

          {stock > 0 &&
            stock <= 5 && (
              <div
                className="
                  absolute
                  bottom-3
                  left-3
                  rounded-full
                  border
                  border-white/10
                  bg-black/55
                  px-2.5
                  py-1
                  text-[9px]
                  font-medium
                  tracking-wide
                  text-white/75
                  backdrop-blur-md
                "
              >
                Only {stock} left
              </div>
            )}


          {/* =============================================
              SOLD OUT
          ============================================== */}

          {stock === 0 && (
            <div
              className="
                absolute
                inset-0
                z-10
                flex
                items-center
                justify-center
                bg-black/65
                backdrop-blur-[3px]
              "
            >
              <span
                className="
                  rounded-full
                  border
                  border-white/20
                  bg-black/50
                  px-4
                  py-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-white/70
                "
              >
                Sold Out
              </span>
            </div>
          )}

        </div>


        {/* ===============================================
            PRODUCT INFORMATION
        ================================================ */}

        <div
          className="
            px-3.5
            pb-1
            pt-3
            sm:px-4
          "
        >

          {/* CATEGORY */}

          {product.category && (
            <p
              className="
                mb-1.5
                truncate
                text-[8px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-white/35
              "
            >
              {product.category}
            </p>
          )}


          {/* PRODUCT NAME */}

          <h4
            title={product.name}
            className="
              truncate
              text-[13px]
              font-medium
              tracking-[-0.01em]
              text-white/85
              transition-colors
              duration-300
              group-hover:text-white
              sm:text-sm
            "
          >
            {product.name}
          </h4>


          {/* =============================================
              RATING
          ============================================== */}

          {rating > 0 && (
            <div
              className="
                mt-2
                flex
                items-center
                gap-1.5
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-[2px]
                "
              >
                {[...Array(5)].map(
                  (_, index) => (
                    <Star
                      key={index}
                      size={10}
                      strokeWidth={1.5}
                      className={
                        index <
                        roundedRating
                          ? "fill-[#d4af37] text-[#d4af37]"
                          : "fill-transparent text-white/15"
                      }
                    />
                  )
                )}
              </div>

              <span
                className="
                  text-[9px]
                  text-white/30
                "
              >
                {rating.toFixed(1)}
              </span>

              <span
                className="
                  text-[9px]
                  text-white/20
                "
              >
                ({reviewCount})
              </span>

            </div>
          )}


          {/* =============================================
              PRICE
          ============================================== */}

          <div className="mt-2.5 mb-1">

            {hasDiscount ? (
              <div
                className="
                  flex
                  items-baseline
                  gap-2
                "
              >

                <span
                  className="
                    text-[15px]
                    font-semibold
                    tracking-[-0.02em]
                    text-white
                    sm:text-base
                  "
                >
                  ₹
                  {offerPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>

                <span
                  className="
                    text-[10px]
                    text-white/25
                    line-through
                    sm:text-[11px]
                  "
                >
                  ₹
                  {price.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>
            ) : (
              <span
                className="
                  text-[15px]
                  font-semibold
                  tracking-[-0.02em]
                  text-white
                  sm:text-base
                "
              >
                ₹
                {price.toLocaleString(
                  "en-IN"
                )}
              </span>
            )}

          </div>

        </div>

      </Link>


      {/* =================================================
          ACTIONS
      ================================================== */}

      <div
        className="
          px-3.5
          pb-3.5
          pt-2
          sm:px-4
          sm:pb-4
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          {/* ADD TO CART */}

          <button
            type="button"
            disabled={stock === 0}
            onClick={() =>
              handlePopupOpen(
                product,
                false
              )
            }
            className={`
              flex
              h-9
              min-w-0
              flex-1
              items-center
              justify-center
              gap-1.5
              rounded-full
              px-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.08em]
              transition-all
              duration-300
              active:scale-[0.97]
              sm:h-10
              sm:px-3
              sm:text-[10px]

              ${
                stock === 0
                  ? `
                    cursor-not-allowed
                    bg-white/[0.06]
                    text-white/20
                  `
                  : `
                    bg-white
                    text-black
                    hover:bg-white/90
                    hover:shadow-[0_8px_25px_rgba(255,255,255,0.10)]
                  `
              }
            `}
          >
            <ShoppingBag
              size={12}
              strokeWidth={2}
              className="shrink-0"
            />

            <span className="truncate">
              Add to Cart
            </span>
          </button>


          {/* BUY NOW */}

          <button
            type="button"
            disabled={stock === 0}
            onClick={() =>
              handlePopupOpen(
                product,
                true
              )
            }
            className={`
              flex
              h-9
              min-w-0
              flex-1
              items-center
              justify-center
              gap-1
              rounded-full
              px-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.08em]
              transition-all
              duration-300
              active:scale-[0.97]
              sm:h-10
              sm:px-3
              sm:text-[10px]

              ${
                stock === 0
                  ? `
                    cursor-not-allowed
                    border
                    border-white/[0.06]
                    text-white/20
                  `
                  : `
                    border
                    border-white/15
                    bg-white/[0.02]
                    text-white/75
                    hover:border-white/30
                    hover:bg-white/[0.06]
                    hover:text-white
                  `
              }
            `}
          >
            Buy Now

            <ArrowUpRight
              size={12}
              strokeWidth={1.8}
              className="
                hidden
                shrink-0
                sm:block
              "
            />
          </button>

        </div>

      </div>


      {/* =================================================
          SIZE / COLOR OPTIONS
      ================================================== */}

      <AnimatePresence>
        {showSizePopup ===
          product._id && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              inset-0
              z-30
              flex
              flex-col
              items-center
              justify-center
              bg-[#050507]/97
              p-5
              backdrop-blur-xl
              sm:p-6
            "
          >

            {/* CLOSE */}

            <button
              type="button"
              onClick={() =>
                setShowSizePopup(null)
              }
              className="
                absolute
                right-3
                top-3
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-white/50
                transition-all
                duration-300
                hover:border-white/25
                hover:bg-white
                hover:text-black
              "
            >
              <X size={14} />
            </button>


            {/* TITLE */}

            <div className="mb-6 text-center">

              <p
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-white/35
                "
              >
                Select Options
              </p>

              <p
                className="
                  mt-2
                  max-w-[180px]
                  truncate
                  text-sm
                  font-medium
                  text-white
                "
                title={product.name}
              >
                {product.name}
              </p>

            </div>


            {/* ===========================================
                SIZES
            ============================================ */}

            <div className="mb-5 w-full">

              <p
                className="
                  mb-2.5
                  text-center
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white/30
                "
              >
                Size
              </p>

              <div
                className="
                  flex
                  flex-wrap
                  justify-center
                  gap-2
                "
              >

                {product.sizes?.length >
                0 ? (
                  product.sizes.map(
                    (size, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() =>
                          setSelectedSize(
                            size
                          )
                        }
                        className={`
                          min-w-[40px]
                          rounded-lg
                          px-3
                          py-2
                          text-[10px]
                          font-medium
                          transition-all
                          duration-200

                          ${
                            selectedSize ===
                            size
                              ? `
                                bg-white
                                text-black
                                shadow-lg
                              `
                              : `
                                border
                                border-white/10
                                text-white/45
                                hover:border-white/30
                                hover:text-white
                              `
                          }
                        `}
                      >
                        {size}
                      </button>
                    )
                  )
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedSize(
                        "Free Size"
                      )
                    }
                    className={`
                      rounded-lg
                      px-4
                      py-2
                      text-[10px]
                      font-medium
                      transition-all

                      ${
                        selectedSize ===
                        "Free Size"
                          ? "bg-white text-black"
                          : "border border-white/10 text-white/45 hover:border-white/30"
                      }
                    `}
                  >
                    Free Size
                  </button>
                )}

              </div>

            </div>


            {/* ===========================================
                COLORS
            ============================================ */}

            {product.colors?.length >
              0 && (

              <div className="mb-6 w-full">

                <p
                  className="
                    mb-3
                    text-center
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-white/30
                  "
                >
                  Color
                </p>

                <div
                  className="
                    flex
                    justify-center
                    gap-3
                  "
                >

                  {product.colors.map(
                    (color, index) => (
                      <button
                        type="button"
                        key={index}
                        aria-label={`Select ${color}`}
                        onClick={() =>
                          setSelectedColor(
                            color
                          )
                        }
                        className={`
                          h-7
                          w-7
                          rounded-full
                          transition-all
                          duration-200

                          ${
                            selectedColor ===
                            color
                              ? `
                                ring-2
                                ring-white
                                ring-offset-2
                                ring-offset-[#050507]
                              `
                              : `
                                ring-1
                                ring-white/15
                                hover:ring-white/40
                              `
                          }
                        `}
                        style={{
                          backgroundColor:
                            color,
                          border:
                            color ===
                            "white"
                              ? "1px solid rgba(255,255,255,0.25)"
                              : undefined,
                        }}
                      />
                    )
                  )}

                </div>

              </div>
            )}


            {/* ===========================================
                CONFIRM
            ============================================ */}

            <button
              type="button"
              onClick={() =>
                handleAddToCart(
                  product,
                  isBuyNow
                )
              }
              className="
                w-full
                rounded-full
                bg-white
                py-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-black
                transition-all
                duration-300
                hover:bg-white/90
                hover:shadow-[0_10px_30px_rgba(255,255,255,0.10)]
                active:scale-[0.98]
              "
            >
              {isBuyNow
                ? "Confirm & Buy"
                : "Confirm & Add to Cart"}
            </button>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}