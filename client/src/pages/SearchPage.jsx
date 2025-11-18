import { useSearchParams } from "react-router-dom";
import API from "../api/axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("query") || params.get("q") || "";
  const [results, setResults] = useState([]);

  const fadeVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  useEffect(() => {
    const q = params.get("query") || params.get("q") || "";
    if (!q) return;

    API.get(`/products/search?query=${q}`)
      .then((res) => {
        console.log("SEARCH RESPONSE FROM UI:", res.data);
        setResults(res.data);
      })
      .catch((err) => console.log("SEARCH ERROR:", err));
  }, [params]);

  return (
    <div className="bg-[#001424] bg-[url('https://www.transparenttextures.com/patterns/rocky-wall.png')] -mt-[6.5rem] pt-[6.5rem]">
      <h2 className="text-md text-gray-200 font-semibold px-4 py-2 bg-[rgba(0,0,0,.3)]">
        Search results for “{query}”
      </h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4 px-2 py-2">
          {results.map((p) => (
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
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="col-span-full text-center mt-20 text-gray-400 h-[500px]">
          No products found.
        </p>
      )}
    </div>
  );
}
