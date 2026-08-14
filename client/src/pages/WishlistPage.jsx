import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Heart,
  ShoppingBag,
  Trash2,
  X,
  Star,
  ArrowRight,
} from "lucide-react";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wishlist } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.user);

  const [showSizePopup, setShowSizePopup] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  /* -------------------------------------------------------
     ANIMATIONS
  ------------------------------------------------------- */

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.08,
      },
    },
  };

  const fadeCard = {
    hidden: {
      opacity: 0,
      y: 18,
      scale: 0.98,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.94,
      transition: {
        duration: 0.25,
      },
    },
  };

  /* -------------------------------------------------------
     ADD TO CART
  ------------------------------------------------------- */

  const handleAddToCartClick = (product) => {
    if (product.countInStock <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    setShowSizePopup(product._id);
    setSelectedColor("");
    setSelectedSize("");
  };

  const handleConfirmAdd = (product) => {
    const size =
      selectedSize ||
      (product.sizes?.length ? "" : "Free Size");

    if (!size) {
      toast.error("Please select a size");
      return;
    }

    if (product.countInStock <= 0) {
      toast.error("This product is out of stock");
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
        selectedSize: size,
        selectedColor: colorToUse,
      })
    );

    toast.success(`"${product.name}" added to cart`);

    dispatch(removeFromWishlist(product._id));

    setShowSizePopup(null);

    navigate("/cart");
  };

  /* -------------------------------------------------------
     LOGIN STATE
  ------------------------------------------------------- */

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-[#050507] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.07] flex items-center justify-center mb-6">
          <Heart
            size={24}
            strokeWidth={1.5}
            className="text-gray-500"
          />
        </div>

        <h2 className="text-xl font-semibold text-white mb-2 tracking-tight">
          Login to view your Wishlist
        </h2>

        <p className="text-sm text-gray-500 mb-8 max-w-xs leading-relaxed">
          Your saved items will appear here once you log in.
        </p>

        <Link
          to="/login"
          className="
            bg-white
            text-black
            px-8
            py-3
            rounded-full
            text-xs
            font-semibold
            uppercase
            tracking-[0.16em]
            hover:bg-gray-200
            transition-all
            duration-300
            active:scale-95
          "
        >
          Login
        </Link>

        <Link
          to="/shop"
          className="
            mt-4
            text-[10px]
            uppercase
            tracking-[0.16em]
            text-gray-500
            hover:text-white
            border
            border-white/10
            hover:border-white/30
            px-6
            py-2.5
            rounded-full
            transition-all
            duration-300
          "
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  /* -------------------------------------------------------
     EMPTY WISHLIST
  ------------------------------------------------------- */

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#050507] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.07] flex items-center justify-center mb-6">
          <Heart
            size={24}
            strokeWidth={1.5}
            className="text-gray-500"
          />
        </div>

        <h2 className="text-xl font-semibold text-white mb-2">
          Your wishlist is empty
        </h2>

        <p className="text-sm text-gray-500 mb-8">
          Save items you love to find them later.
        </p>

        <Link
          to="/shop"
          className="
            group
            flex
            items-center
            gap-2
            bg-white
            text-black
            px-7
            py-3
            rounded-full
            text-xs
            font-semibold
            uppercase
            tracking-[0.14em]
            hover:bg-gray-200
            transition-all
            duration-300
          "
        >
          Continue Shopping

          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    );
  }

  /* -------------------------------------------------------
     WISHLIST
  ------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-[#050507] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6">

        {/* -------------------------------------------------
            HEADER
        ------------------------------------------------- */}

        <div className="mb-7 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-5 sm:w-7 h-px bg-white/30" />

            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-gray-500">
              Saved Items
            </p>
          </div>

          <div className="flex items-end justify-between gap-4">
            <h1 className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-semibold
              tracking-[-0.035em]
              text-white
            ">
              My Wishlist
            </h1>

            <span className="
              shrink-0
              text-[10px]
              sm:text-xs
              text-gray-500
              uppercase
              tracking-wider
            ">
              {wishlist.length}{" "}
              {wishlist.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {/* -------------------------------------------------
            PRODUCT GRID
        ------------------------------------------------- */}

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            variants={container}
            initial="hidden"
            animate="show"
            className="
              grid
              grid-cols-2
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-x-2
              gap-y-4
              sm:gap-4
              md:gap-5
            "
          >
            {wishlist.map((product) => {
              const price = Number(product.price) || 0;

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

              return (
                <motion.div
                  key={product._id}
                  variants={fadeCard}
                  layout
                  className="
                    relative
                    group
                    overflow-hidden
                    rounded-xl
                    bg-white/[0.025]
                    border
                    border-white/[0.07]
                    hover:border-white/[0.16]
                    transition-all
                    duration-300
                  "
                >
                  {/* ------------------------------------------------
                      PRODUCT LINK / IMAGE
                  ------------------------------------------------ */}

                  <Link
                    to={`/product/${product._id}`}
                    className="block"
                  >
                    <div className="relative overflow-hidden">

                      <img
                        src={
                          product.images?.[0] ||
                          "/images/tee1.svg"
                        }
                        alt={product.name}
                        className="
                          w-full
                          aspect-[3/4]
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-105
                        "
                      />

                      {/* Offer */}

                      {offerPercentage > 0 && (
                        <span className="
                          absolute
                          left-2.5
                          top-2.5
                          sm:left-3
                          sm:top-3
                          bg-white
                          text-black
                          text-[8px]
                          sm:text-[10px]
                          font-semibold
                          uppercase
                          tracking-wider
                          px-2
                          sm:px-2.5
                          py-1
                          rounded-full
                          shadow-lg
                        ">
                          {offerPercentage}% Off
                        </span>
                      )}

                      {/* Wishlist / Remove */}

                      <button
                        type="button"
                        aria-label="Remove from wishlist"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          dispatch(
                            removeFromWishlist(product._id)
                          );

                          toast.success("Removed from wishlist");
                        }}
                        className="
                          absolute
                          top-2.5
                          right-2.5
                          sm:top-3
                          sm:right-3
                          z-10

                          w-8
                          h-8
                          sm:w-9
                          sm:h-9

                          flex
                          items-center
                          justify-center

                          rounded-full

                          bg-white
                          text-black

                          shadow-lg
                          shadow-black/20

                          transition-all
                          duration-300

                          hover:bg-gray-200
                          active:scale-90
                        "
                      >
                        <Heart
                          size={14}
                          strokeWidth={1.8}
                          className="fill-black"
                        />
                      </button>

                      {/* Out of stock */}

                      {stock === 0 && (
                        <div className="
                          absolute
                          inset-0
                          bg-black/60
                          backdrop-blur-[1px]
                          flex
                          items-center
                          justify-center
                        ">
                          <span className="
                            text-[9px]
                            sm:text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-gray-300
                            font-medium
                            border
                            border-white/20
                            px-3
                            py-1.5
                            rounded-full
                          ">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      {/* Hover overlay */}

                      <div className="
                        absolute
                        inset-0
                        bg-black/0
                        group-hover:bg-black/10
                        transition-colors
                        duration-300
                        pointer-events-none
                      " />
                    </div>

                    {/* ------------------------------------------------
                        INFO
                    ------------------------------------------------ */}

                    <div className="
                      px-2.5
                      sm:px-3
                      md:px-4
                      pt-2.5
                      sm:pt-3
                      pb-2
                    ">
                      <h4
                        className="
                          text-[11px]
                          sm:text-xs
                          md:text-sm
                          font-medium
                          text-gray-200
                          truncate
                          group-hover:text-white
                          transition-colors
                          duration-200
                        "
                        title={product.name}
                      >
                        {product.name}
                      </h4>

                      {/* Rating */}

                      {rating > 0 && (
                        <div className="
                          flex
                          items-center
                          gap-1
                          mt-1.5
                        ">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={9}
                                strokeWidth={1.5}
                                className={
                                  i < Math.round(rating)
                                    ? "fill-white text-white"
                                    : "fill-transparent text-gray-700"
                                }
                              />
                            ))}
                          </div>

                          <span className="
                            text-[8px]
                            sm:text-[9px]
                            text-gray-600
                          ">
                            ({product.numReviews || 0})
                          </span>
                        </div>
                      )}

                      {/* Price */}

                      <div className="mt-2">
                        {offerPrice &&
                        offerPrice < price ? (
                          <div className="
                            flex
                            items-baseline
                            gap-1.5
                            flex-wrap
                          ">
                            <span className="
                              text-xs
                              sm:text-sm
                              md:text-base
                              font-semibold
                              text-white
                            ">
                              ₹
                              {offerPrice.toLocaleString(
                                "en-IN"
                              )}
                            </span>

                            <span className="
                              text-[9px]
                              sm:text-[10px]
                              text-gray-600
                              line-through
                            ">
                              ₹
                              {price.toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>
                        ) : (
                          <span className="
                            text-xs
                            sm:text-sm
                            md:text-base
                            font-semibold
                            text-white
                          ">
                            ₹
                            {price.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        )}
                      </div>

                      {/* Low stock */}

                      {stock > 0 && stock <= 5 && (
                        <p className="
                          text-[8px]
                          sm:text-[9px]
                          text-amber-400
                          mt-1.5
                        ">
                          Only {stock} left
                        </p>
                      )}
                    </div>
                  </Link>

                  {/* ------------------------------------------------
                      ACTIONS
                  ------------------------------------------------ */}

                  <div className="
                    px-2.5
                    sm:px-3
                    md:px-4
                    pb-2.5
                    sm:pb-3
                    md:pb-4
                    pt-1
                  ">
                    <div className="
                      flex
                      items-center
                      gap-1.5
                      sm:gap-2
                    ">
                      {/* Move to Cart */}

                      <button
                        type="button"
                        disabled={stock <= 0}
                        onClick={() =>
                          handleAddToCartClick(product)
                        }
                        className={`
                          flex-1
                          min-w-0
                          h-8
                          sm:h-9
                          md:h-10
                          px-1.5
                          sm:px-2
                          rounded-full
                          flex
                          items-center
                          justify-center
                          gap-1
                          text-[7px]
                          sm:text-[9px]
                          md:text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.06em]
                          sm:tracking-wider
                          whitespace-nowrap
                          transition-all
                          duration-300
                          active:scale-[0.97]

                          ${
                            stock <= 0
                              ? "opacity-30 cursor-not-allowed bg-white/10 text-gray-500"
                              : "bg-white text-black hover:bg-gray-200 hover:shadow-lg hover:shadow-white/10"
                          }
                        `}
                      >
                        <ShoppingBag
                          size={11}
                          strokeWidth={2}
                          className="shrink-0"
                        />

                        <span className="truncate">
                          Move to Cart
                        </span>
                      </button>

                      {/* Remove */}

                      <button
                        type="button"
                        aria-label="Remove from wishlist"
                        onClick={() => {
                          dispatch(
                            removeFromWishlist(product._id)
                          );

                          toast.success(
                            "Removed from wishlist"
                          );
                        }}
                        className="
                          shrink-0
                          w-8
                          h-8
                          sm:w-9
                          sm:h-9
                          md:w-10
                          md:h-10

                          flex
                          items-center
                          justify-center

                          rounded-full

                          border
                          border-white/10

                          text-gray-400

                          hover:text-white
                          hover:border-white/30
                          hover:bg-white/[0.04]

                          active:scale-90

                          transition-all
                          duration-300
                        "
                      >
                        <Trash2
                          size={13}
                          strokeWidth={1.7}
                        />
                      </button>
                    </div>
                  </div>

                  {/* ------------------------------------------------
                      SIZE / COLOR POPUP
                  ------------------------------------------------ */}

                  <AnimatePresence>
                    {showSizePopup === product._id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="
                          absolute
                          inset-0
                          z-20
                          bg-[#050507]/95
                          backdrop-blur-md
                          flex
                          flex-col
                          items-center
                          justify-center
                          p-4
                          sm:p-5
                        "
                      >
                        {/* Close */}

                        <button
                          type="button"
                          aria-label="Close"
                          onClick={() =>
                            setShowSizePopup(null)
                          }
                          className="
                            absolute
                            top-3
                            right-3
                            w-8
                            h-8
                            flex
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/10
                            text-gray-400
                            hover:text-white
                            hover:border-white/30
                            transition-all
                          "
                        >
                          <X size={14} />
                        </button>

                        <p className="
                          text-[9px]
                          sm:text-[10px]
                          uppercase
                          tracking-[0.2em]
                          text-gray-400
                          mb-5
                        ">
                          Select Size & Color
                        </p>

                        {/* Sizes */}

                        <div className="
                          flex
                          flex-wrap
                          justify-center
                          gap-1.5
                          sm:gap-2
                          mb-5
                        ">
                          {product.sizes?.length > 0 ? (
                            product.sizes.map(
                              (size, i) => (
                                <button
                                  type="button"
                                  key={i}
                                  onClick={() =>
                                    setSelectedSize(size)
                                  }
                                  className={`
                                    min-w-[34px]
                                    px-2.5
                                    py-1.5
                                    rounded-lg
                                    text-[10px]
                                    font-medium
                                    transition-all
                                    duration-200

                                    ${
                                      selectedSize ===
                                      size
                                        ? "bg-white text-black"
                                        : "border border-white/15 text-gray-300 hover:border-white/40"
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
                                setSelectedSize("Free Size")
                              }
                              className="
                                px-3
                                py-1.5
                                rounded-lg
                                text-[10px]
                                font-medium
                                border
                                border-white/15
                                text-gray-300
                                hover:border-white/40
                              "
                            >
                              Free Size
                            </button>
                          )}
                        </div>

                        {/* Colors */}

                        {product.colors?.length > 0 && (
                          <div className="
                            flex
                            gap-2.5
                            mb-6
                          ">
                            {product.colors.map(
                              (color, i) => (
                                <button
                                  type="button"
                                  key={i}
                                  aria-label={`Select ${color}`}
                                  onClick={() =>
                                    setSelectedColor(color)
                                  }
                                  className={`
                                    w-7
                                    h-7
                                    rounded-full
                                    transition-all
                                    duration-200

                                    ${
                                      selectedColor ===
                                      color
                                        ? "ring-2 ring-white ring-offset-2 ring-offset-[#050507] scale-105"
                                        : "ring-1 ring-white/10 hover:ring-white/30"
                                    }
                                  `}
                                  style={{
                                    backgroundColor: color,
                                  }}
                                />
                              )
                            )}
                          </div>
                        )}

                        {/* Confirm */}

                        <button
                          type="button"
                          onClick={() =>
                            handleConfirmAdd(product)
                          }
                          className="
                            w-full
                            h-9
                            sm:h-10
                            bg-white
                            text-black
                            rounded-full
                            text-[9px]
                            sm:text-[10px]
                            font-semibold
                            uppercase
                            tracking-wider
                            hover:bg-gray-200
                            hover:shadow-lg
                            hover:shadow-white/10
                            active:scale-[0.98]
                            transition-all
                            duration-300
                          "
                        >
                          Confirm & Add to Cart
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}