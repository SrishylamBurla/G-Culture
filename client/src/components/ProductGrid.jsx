import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function ProductGrid({ products = [], filters = {} }) {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const [quantities, setQuantities] = useState({});

  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (p) =>
          (!filters.category || p.category === filters.category) &&
          (!filters.subcategory || p.subcategory === filters.subcategory) &&
          (!filters.size || p.sizes?.includes(filters.size)) &&
          (!filters.color || p.colors?.includes(filters.color)) &&
          (!filters.price || (p.offerPrice ?? p.price) <= filters.price)
      )
    : [];

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    const qty = quantities[product._id] || 1;
    dispatch(addToCart({ ...product, quantity: qty }));
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.05,
      },
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <motion.div key={product._id} variants={fadeVariants}>
            <ProductCard
              product={product}
              quantities={quantities}
              setQuantities={setQuantities}
              handleAddToCart={handleAddToCart}
              handleToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
              cartItems={cartItems}
            />
          </motion.div>
        ))
      ) : (
        <motion.div
          className="col-span-full flex flex-col items-center justify-center py-24 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm text-gray-500">No products found.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
