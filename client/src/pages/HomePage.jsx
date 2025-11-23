// import { Link } from "react-router-dom";

// export default function HomePage() {
//   const categories = [
//     {
//       name: "Street Wear",
//       path: "/streetwear",
//       bg: "bg-[url('/images/HomeImgs/streetwear.png')]",
//     },
//     {
//       name: "Casual Wear",
//       path: "/casualwear",
//       bg: "bg-[url('/images/HomeImgs/casualwear.png')]",
//     },
//     {
//       name: "Chest Bags",
//       path: "/chestbags",
//       bg: "bg-[url('/images/HomeImgs/chestbags.png')]",
//     },
//     {
//       name: "Caps",
//       path: "/caps",
//       bg: "bg-[url('/images/HomeImgs/caps.png')]",
//     },
//   ];

//   return (
//     <div>
//       <section className="min-h-screen bg-gray-200 text-black pt-[4.5rem] md:pt-[5.8rem]">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

//           {categories.map((cat) => (
//             <Link
//               key={cat.name}
//               to={cat.path}
//               className={`
//                 relative h-80 md:h-100 shadow-md overflow-hidden
//                 bg-cover bg-center bg-no-repeat
//                 ${cat.bg}
//                 group hover:scale-[1.01] transition duration-300
//               `}
//             >
//               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>

//               <div className="absolute inset-0 flex items-center justify-center">
//                 {/* <h2 className="text-white text-2xl md:text-3xl font-bold tracking-wide drop-shadow-lg">
//                   {cat.name}
//                 </h2> */}
//               </div>
//             </Link>
//           ))}

//         </div>
//       </section>
//     </div>
//   );
// }


import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Auto-scroll animation config
const scrollX = {
  animate: {
    x: ["0%", "-100%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 15,
        ease: "linear",
      },
    },
  },
};

export default function HomePage() {
  const categories = [
    {
      name: "Street Wear",
      path: "/streetwear",
      img: "/images/HomeImgs/streetwear.png",
    },
    {
      name: "Casual Wear",
      path: "/casualwear",
      img: "/images/HomeImgs/casualwear.png",
    },
    {
      name: "Chest Bags",
      path: "/chestbags",
      img: "/images/HomeImgs/chestbags.png",
    },
    {
      name: "Caps",
      path: "/caps",
      img: "/images/HomeImgs/caps.png",
    },
  ];

  return (
    <div className="pt-[2rem] md:pt-[5.8rem]">

      {/* ===========================
          🌟 HERO SECTION
      ============================ */}
      <section
        className="
          w-full
          h-[100vh] md:h-[95vh] py-30 md:py-2
          bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]
          text-white flex flex-col md:flex-row
          items-center justify-between
          px-6 md:px-16 lg:px-40
          relative overflow-hidden
        "
      >

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl z-10"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            G-CULTURE
          </h1>

          <p className="text-lg md:text-2xl mt-4 text-gray-200 max-w-4xl leading-relaxed">
            For men who carry confidence like a second skin.
          </p>

          <div className="mt-8">
            <Link
              to="/shop"
              className="
                px-6 py-3 text-lg font-semibold
                bg-white text-black rounded-full
                hover:bg-black hover:text-white
                transition duration-300 border border-white/20
              "
            >
              Explore Collection
            </Link>
          </div>
        </motion.div>

        {/* RIGHT — ANIMATED BORDERED IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          whileHover={{ scale: 1.03 }}
          className="mt-2 md:mt-0 relative"
        >
          {/* Animated border */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="absolute -inset-4 border-4 rounded-3xl border-white/20"
          />

          {/* Actual image */}
          <img
            src="/images/HomeImgs/Herosec.png"
            alt="Men clothing hero"
            className="w-[260px] md:w-[380px] rounded-3xl shadow-2xl object-cover"
          />
        </motion.div>
      </section>

      {/* ===========================
          🔥 PREMIUM AUTO CAROUSEL
      ============================ */}
      <section className="py-10 bg-white">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
          Shop by Category
        </h2>

        <div className="overflow-hidden whitespace-nowrap relative">
          <motion.div
            className="flex gap-6 px-4"
            {...scrollX}
          >
            {[...categories, ...categories].map((cat, i) => (
              <Link
                to={cat.path}
                key={i}
                className="
                  min-w-[250px] md:min-w-[320px] 
                  bg-gray-100 rounded-xl overflow-hidden shadow-md
                  hover:scale-[1.03] transition duration-300
                "
              >
                <img
                  src={cat.img}
                  className="w-full h-60 object-cover"
                  alt={cat.name}
                />
                {/* <div className="p-4 text-center font-semibold text-gray-800">
                  {cat.name}
                </div> */}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
