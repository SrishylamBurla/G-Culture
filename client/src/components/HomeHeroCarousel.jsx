// import { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Link } from "react-router-dom";

// gsap.registerPlugin(ScrollTrigger);

// export default function HomeHeroCarousel() {
//   const [index, setIndex] = useState(0);
//   const heroRef = useRef(null);
//   const textRef = useRef(null);
//   const bgRef = useRef(null);

//   const slides = [
//     {
//       title: (
//         <>
//           Empowering <span className="text-yellow-400">businesses</span> with
//           confidence-driven clothing
//         </>
//       ),
//       subtitle:
//         "Precision, style & comfort — made for men who lead with confidence.",
//       bg: "/images/HomeImgs/streetwear.png",
//       destination: "/streetwear",
//     },
//     {
//       title: (
//         <>
//           Built for <span className="text-yellow-400">Everyday Warriors</span>
//         </>
//       ),
//       subtitle:
//         "Premium fabrics engineered for movement, durability and bold identity.",
//       bg: "/images/HomeImgs/casualwear.png",
//       destination: "/casualwear",
//     },
//     {
//       title: (
//         <>
//           Redefining <span className="text-yellow-400">Street Culture</span>
//         </>
//       ),
//       subtitle:
//         "Limited collections designed for creators, thinkers & doers.",
//       bg: "/images/HomeImgs/chestbags.png",
//         destination: "/chestbags",
//     },
//     {
//       title: (
//         <>
//           Redefining <span className="text-yellow-400">Caps</span>
//         </>
//       ),
//       subtitle:
//         "Limited collections designed for creators, thinkers & doers.",
//       bg: "/images/HomeImgs/caps.png",
//         destination: "/caps",
//     },
//   ];

//   // Auto-slide
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % slides.length);
//     }, 6000);

//     return () => clearInterval(timer);
//   }, []);

//   // GSAP HERO PARALLAX
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         textRef.current,
//         { y: 0 },
//         {
//           y: -120,
//           ease: "none",
//           scrollTrigger: {
//             trigger: heroRef.current,
//             start: "top top",
//             end: "bottom top",
//             scrub: true,
//           },
//         }
//       );

//       gsap.fromTo(
//         bgRef.current,
//         { y: 0 },
//         {
//           y: 160,
//           ease: "none",
//           scrollTrigger: {
//             trigger: heroRef.current,
//             start: "top top",
//             end: "bottom top",
//             scrub: true,
//           },
//         }
//       );
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//   ref={heroRef}
//   className="relative w-full h-[80vh] overflow-hidden"
// >
//   {/* Background Zoom-Out Crossfade */}
//   <AnimatePresence>
//     <motion.div
//       key={index}
//       ref={bgRef}
//       initial={{ opacity: 0, scale: 1.15 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 1 }}
//       transition={{
//         opacity: { duration: 1.2, ease: "easeOut" },
//         scale: { duration: 6, ease: "easeOut" },
//       }}
//       className="absolute inset-0 bg-cover bg-center"
//       style={{
//         backgroundImage: `url(${slides[index].bg})`,
//       }}
//     >
//       <div className="absolute inset-0 bg-black/55"></div>
//     </motion.div>
//   </AnimatePresence>

//   {/* Text Layer */}
//   <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={index}
//         ref={textRef}
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 40 }}
//         transition={{
//           duration: 1,
//           ease: "easeOut",
//         }}
//         className="max-w-3xl"
//       >
//         <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
//           {slides[index].title}
//         </h1>

//         <p className="text-gray-200 text-base md:text-xl mb-10">
//           {slides[index].subtitle}
//         </p>

//         <Link to={slides[index].destination}>
//             <motion.button
//           whileHover={{ scale: 1.05 }}
//           className="px-8 py-3 bg-white text-black rounded-full font-semibold shadow-lg hover:bg-black hover:text-white transition"
//         >
//           Explore Collection
//         </motion.button>
//         </Link>
//       </motion.div>
//     </AnimatePresence>
//   </div>
// </section>
//   );
// }



import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function HomeHeroCarousel() {
  const [index, setIndex] = useState(0);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  const slides = [
    {
      title: (
        <>
          Empowering <span className="text-yellow-400">businesses</span> with
          confidence-driven clothing
        </>
      ),
      subtitle:
        "Precision, style & comfort — made for men who lead with confidence.",
      bg: "/images/HomeImgs/streetwear.png",
      destination: "/streetwear",
    },
    {
      title: (
        <>
          Built for <span className="text-yellow-400">Everyday Warriors</span>
        </>
      ),
      subtitle:
        "Premium fabrics engineered for movement, durability and bold identity.",
      bg: "/images/HomeImgs/casualwear.png",
      destination: "/casualwear",
    },
    {
      title: (
        <>
          Redefining <span className="text-yellow-400">Street Culture</span>
        </>
      ),
      subtitle:
        "Limited collections designed for creators, thinkers & doers.",
      bg: "/images/HomeImgs/chestbags.png",
      destination: "/chestbags",
    },
    {
      title: (
        <>
          Redefining <span className="text-yellow-400">Caps</span>
        </>
      ),
      subtitle:
        "Limited collections designed for creators, thinkers & doers.",
      bg: "/images/HomeImgs/caps.png",
      destination: "/caps",
    },
  ];

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  // GSAP HERO PARALLAX
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 0 },
        {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        bgRef.current,
        { y: 0 },
        {
          y: 160,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[80vh] overflow-hidden"
    >
      {/* Background Zoom-Out Crossfade */}
      <AnimatePresence>
        <motion.div
          key={index}
          ref={bgRef}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeOut" },
            scale: { duration: 6, ease: "easeOut" },
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slides[index].bg})`,
          }}
        >
          <div className="absolute inset-0 bg-black/55"></div>
        </motion.div>
      </AnimatePresence>

      {/* Text Layer */}
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            ref={textRef}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              {slides[index].title}
            </h1>

            <p className="text-gray-200 text-base md:text-xl mb-10">
              {slides[index].subtitle}
            </p>

            <Link to={slides[index].destination}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-white text-black rounded-full font-semibold shadow-lg hover:bg-black hover:text-white transition"
              >
                Explore Collection
              </motion.button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* === PAGINATION DOTS === */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              index === i
                ? "w-6 h-3 bg-white"
                : "w-3 h-3 bg-white/40 hover:bg-white/70"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
