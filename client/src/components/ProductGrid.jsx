import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";


export default function ProductGrid({
  products = [],
  filters = {},
}) {
  const dispatch = useDispatch();

  const { wishlist = [] } = useSelector(
    (state) => state.wishlist
  );

  const { cartItems = [] } = useSelector(
    (state) => state.cart
  );

  const [quantities, setQuantities] = useState({});


  /*
  =========================================================
  FILTER PRODUCTS
  =========================================================
  */

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {

        const matchesCategory =
          !filters.category ||
          product.category === filters.category;

        const matchesSubcategory =
          !filters.subcategory ||
          product.subcategory ===
            filters.subcategory;

        const matchesSize =
          !filters.size ||
          product.sizes?.includes(filters.size);

        const matchesColor =
          !filters.color ||
          product.colors?.includes(filters.color);

        const productPrice =
          Number(
            product.offerPrice ??
              product.price ??
              0
          );

        const matchesPrice =
          !filters.price ||
          productPrice <=
            Number(filters.price);

        return (
          matchesCategory &&
          matchesSubcategory &&
          matchesSize &&
          matchesColor &&
          matchesPrice
        );
      })
    : [];


  /*
  =========================================================
  ADD TO CART
  =========================================================
  */

  const handleAddToCart = (
    event,
    product
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const quantity =
      quantities[product._id] || 1;

    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    toast.success(
      `${product.name} added to cart`,
      {
        duration: 2200,
      }
    );
  };


  /*
  =========================================================
  WISHLIST
  =========================================================
  */

  const handleToggleWishlist = (
    event,
    product
  ) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(
      toggleWishlist(product)
    );
  };


  /*
  =========================================================
  GRID ANIMATION
  =========================================================
  */

  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,

      transition: {
        staggerChildren: 0.055,
        delayChildren: 0.03,
      },
    },
  };


  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };


  /*
  =========================================================
  EMPTY STATE
  =========================================================
  */

  if (filteredProducts.length === 0) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="
          flex
          min-h-[460px]
          w-full
          flex-col
          items-center
          justify-center
          text-center
        "
      >

        {/* Icon */}

        <div className="
          mb-6
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border
          border-white/[0.07]
          bg-white/[0.025]
        ">

          <ShoppingBag
            size={21}
            strokeWidth={1.4}
            className="text-gray-600"
          />

        </div>


        {/* Eyebrow */}

        <p className="
          text-[9px]
          font-medium
          uppercase
          tracking-[0.28em]
          text-gray-600
        ">
          Collection
        </p>


        {/* Heading */}

        <h3 className="
          mt-3
          text-lg
          font-medium
          tracking-tight
          text-white
        ">
          No products found
        </h3>


        {/* Description */}

        <p className="
          mt-2
          max-w-xs
          text-sm
          leading-6
          text-gray-600
        ">
          We couldn't find any pieces
          matching your current selection.
        </p>

      </motion.div>
    );
  }


  /*
  =========================================================
  GRID
  =========================================================
  */

  return (
    <motion.div
      className="
        grid
        w-full
        grid-cols-2
        gap-x-3
        gap-y-8
        sm:gap-x-4
        sm:gap-y-9
        md:grid-cols-3
        md:gap-x-4
        md:gap-y-10
        lg:grid-cols-5
        lg:gap-x-5
        lg:gap-y-12
        xl:gap-x-6
      "
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >

      {filteredProducts.map(
        (product, index) => (
          <motion.div
            key={product._id}
            variants={cardVariants}
            className="
              min-w-0
            "
          >

            <ProductCard
              product={product}
              quantities={quantities}
              setQuantities={
                setQuantities
              }
              handleAddToCart={
                handleAddToCart
              }
              handleToggleWishlist={
                handleToggleWishlist
              }
              wishlist={wishlist}
              cartItems={cartItems}
            />

          </motion.div>
        )
      )}

    </motion.div>
  );
}