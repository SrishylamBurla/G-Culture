// import { Link } from "react-router-dom";
// import { motion, useAnimation } from "framer-motion";
// import { useEffect, useRef } from "react";

// /**
//  * HomePage - modular.com inspired hero + carousel
//  *
//  * - Left: huge "G-CULTURE" heading + subtitle + CTA
//  * - Right: animated framed image (uses uploaded image path)
//  * - Below: auto-scrolling carousel with category cards (looped)
//  *
//  * Replace image path if needed. The uploaded file path used here:
//  * /mnt/data/ce0dfe8b-81de-47b5-8208-6da3c983921f.png
//  */

// const HERO_IMG = "/mnt/data/ce0dfe8b-81de-47b5-8208-6da3c983921f.png";

// const categories = [
//   {
//     name: "Street Wear",
//     quote: "Built for the streets. Worn by the fearless.",
//     path: "/streetwear",
//     accent: "from-indigo-600 to-cyan-400",
//   },
//   {
//     name: "Casual Wear",
//     quote: "Comfort that moves with your hustle.",
//     path: "/casualwear",
//     accent: "from-emerald-500 to-lime-400",
//   },
//   {
//     name: "Chest Bags",
//     quote: "Carry only what matters. Move like a creator.",
//     path: "/chestbags",
//     accent: "from-yellow-500 to-orange-400",
//   },
//   {
//     name: "Caps",
//     quote: "Finish your fit. Crown your style.",
//     path: "/caps",
//     accent: "from-pink-500 to-rose-400",
//   },
// ];

// export default function HomePage() {
//   const marqueeControls = useAnimation();
//   const trackRef = useRef(null);

//   // start marquee (auto scroll) animation once mounted
//   useEffect(() => {
//     // a continuous loop using framer-motion
//     const loop = async() => {
//       while (true) {
//         await marqueeControls.start({
//           x: ["0%", "-50%"],
//           transition: { duration: 14, ease: "linear" },
//         });
//         // reset instantly to start and loop
//         await marqueeControls.set({ x: "0%" });
//       }
//     };
//     loop();
//   }, [marqueeControls]);

//   return (
//     <main className="min-h-screen bg-gray-800 text-white pt-[4.5rem] md:pt[5.8rem] ">
//       {/* HERO */}
//       <section className="relative overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[90vh]">
//             {/* LEFT: Heading + quote */}
//             <div className="py-12 md:py-20">
//               <motion.h1
//                 initial={{ opacity: 0, y: 18 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.9 }}
//                 className="text-5xl md:text-6xl lg:text-7xl font-extralight leading-tight tracking-tight"
//                 aria-label="G-CULTURE"
//               >
//                 G-CULTURE
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.25, duration: 0.9 }}
//                 className="mt-6 text-lg md:text-2xl max-w-lg text-gray-300"
//               >
//                 For men who carry confidence like a second skin.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 6 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5, duration: 0.7 }}
//                 className="mt-8"
//               >
//                 <Link
//                   to="/shop"
//                   className="inline-block bg-white text-gray-900 rounded-full px-6 py-3 text-lg font-medium shadow hover:shadow-md transition"
//                 >
//                   Explore Collection
//                 </Link>
//               </motion.div>

//               {/* subtle supporting text */}
//               <p className="mt-6 text-sm text-gray-500 max-w-sm">
//                 Curated drops • Quality fabrics • Tailored fits — shop the latest from G-CULTURE.
//               </p>
//             </div>

//             {/* RIGHT: Framed animated image */}
//             <div className="relative flex justify-center md:justify-end">
//               {/* decorative outer rotated frame */}
//               <motion.div
//                 initial={{ rotate: -6, opacity: 0 }}
//                 animate={{ rotate: [-6, -2, -6], opacity: 1 }}
//                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                 className="relative w-[340px] md:w-[420px] lg:w-[420px] h-[420px] md:h-[420px] flex items-center justify-center"
//               >
//                 <div className="absolute inset-0 border-2 border-white/10 rounded-2xl transform translate-x-6 translate-y-6 pointer-events-none"></div>

//                 {/* image card */}
//                 <motion.figure
//                   whileHover={{ scale: 1.03, rotate: 0 }}
//                   className="relative w-full h-full rounded-2xl overflow-hidden bg-black/60 border border-white/5 shadow-lg"
//                   role="img"
//                   aria-label="Hero garment image"
//                 >
//                   {/* image */}
//                   <img
//                     src={'/images/HomeImgs/Herosec.png'}
//                     alt="Hero - G-Culture model"
//                     className="w-full h-full object-cover grayscale contrast-90"
//                     style={{ mixBlendMode: "normal" }}
//                   />

//                   {/* inner overlay text card */}
//                   {/* <div className="absolute left-4 bottom-6 bg-black/60 backdrop-blur-sm border border-white/10 rounded-md px-4 py-3 text-xs text-gray-200 max-w-[70%]">
//                     <div className="uppercase text-[10px] text-gray-400 mb-1 tracking-wider">Self reminder</div>
//                     <div className="text-sm font-medium">One step at a time. You’ll get there.</div>
//                     <div className="mt-2 text-[10px] text-gray-400">G-CULTURE</div>
//                   </div> */}
//                 </motion.figure>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CAROUSEL SECTION */}
//       <section className="py-12">
//         <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-semibold text-white">Explore categories</h2>
//             <p className="text-sm text-gray-400">Curated picks, updated regularly</p>
//           </div>

//           {/* marquee-like auto-scrolling row using framer-motion */}
//           <div className="relative overflow-hidden">
//             <motion.div
//               animate={marqueeControls}
//               ref={trackRef}
//               className="flex w-[200%] gap-6"
//               style={{ willChange: "transform" }}
//             >
//               {/* duplicate list twice to create smooth loop */}
//               {[...categories, ...categories].map((c, idx) => (
//                 <Link
//                   to={c.path}
//                   key={`${c.name}-${idx}`}
//                   className="min-w-[260px] md:min-w-[320px] lg:min-w-[380px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform"
//                 >
//                   <div className={`h-40 rounded-md bg-gradient-to-br ${c.accent} bg-opacity-30 flex items-end p-4`}>
//                     <div>
//                       <h3 className="text-white text-xl font-semibold">{c.name}</h3>
//                       <p className="text-sm text-gray-200 mt-1">{c.quote}</p>
//                     </div>
//                   </div>

//                   <div className="mt-4 flex items-center justify-between">
//                     <span className="text-sm text-gray-300">Shop</span>
//                     <span className="text-xs text-gray-400">{c.name}</span>
//                   </div>
//                 </Link>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Optional small footer spacing */}
//       <div className="h-28" />
//     </main>
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
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 text-black">
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
