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

  // ✅ Filter logic
  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (p) =>
          (!filters.category || p.category === filters.category) &&
          (!filters.subcategory || p.subcategory === filters.subcategory) &&
          (!filters.size || p.sizes?.includes(filters.size)) &&
          (!filters.color || p.colors?.includes(filters.color)) &&
          (!filters.price || p.price <= filters.price)
      )
    : [];

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    const qty = quantities[product._id] || 1;
    dispatch(addToCart({ ...product, quantity: qty }));
    toast.success(`${product.name} added to cart 🛒`, { duration: 1500 });
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  // ✨ Smooth fade + flow animation (no blur)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const fadeVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.96,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {filteredProducts.length > 0 ? (
        filteredProducts.map((p) => (
          <motion.div
            key={p._id}
            variants={fadeVariants}
            className="transition-transform duration-700 will-change-transform"
            whileHover={{
              scale: 1.01,
              transition: { type: "spring", stiffness: 120, damping: 12 },
            }}
            whileTap={{ scale: 0.97 }}
          >
            <ProductCard
              product={p}
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
        <motion.p
          className="col-span-full text-center text-gray-500 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          No products found in this category.
        </motion.p>
      )}
    </motion.div>
  );
}

// import { Link } from "react-router-dom";

// export default function ProductGrid({ products }) {
//   if (!products.length) return <p>No products found.</p>;

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {products.map((p) => (
//         <Link key={p.slug} to={`/product/${p.slug}`} className="block group">
//           <img src={p.images[0]} alt={p.name} className="w-full h-64 object-cover rounded-lg" />
//           <h3 className="font-medium mt-2">{p.name}</h3>
//           <p className="text-gray-600 text-sm">₹{p.offerPrice}</p>
//         </Link>
//       ))}
//     </div>
//   );
// }
