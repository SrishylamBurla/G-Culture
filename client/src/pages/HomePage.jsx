import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FeaturedProducts from "../components/FeaturedProducts";
import LatestProducts from "../components/LatestProducts";

export default function HomePage() {
  const categories = [
    {
      name: "Street Wear",
      path: "/streetwear",
      description: "Bold cuts. Raw energy. Own the sidewalk.",
    },
    {
      name: "Casual Wear",
      path: "/casualwear",
      description: "Effortless style for every moment.",
    },
    {
      name: "Chest Bags",
      path: "/chestbags",
      description: "Carry with intent. Travel light, look sharp.",
    },
    {
      name: "Caps",
      path: "/caps",
      description: "Crown your look. Statement headwear.",
    },
  ];

  // Parallax for hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]);
  const opacityFade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="bg-[#050507] text-white min-h-screen">
      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden h-[100vh] flex items-center justify-center"
      >
        {/* Background image with overlay */}
        {/* <div className="absolute inset-0">
          <img
            src="/images/HomeImgs/Herosec1.png"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050507]" />
        </div> */}

        {/* Subtle ambient glow */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[200px] bg-white/5" />

        {/* Hero Content */}
        <motion.div
          style={{ y: yText, opacity: opacityFade }}
          className="relative z-10 text-center max-w-3xl px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6"
          >
            Redefining Indian Streetwear
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="text-[55px] md:text-[90px] lg:text-[90px] font-bold text-gray-300 leading-[0.9] tracking-tight"
          >
            G-CULTURE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed"
          >
            For men who carry{" "}
            <span className="text-white font-medium">confidence</span> like a
            second skin
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gray-200 text-black text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors duration-200"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/latest-drops"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white text-sm font-medium uppercase tracking-wider hover:border-white/50 transition-colors duration-200"
            >
              Latest Drops
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ============ CATEGORIES ============ */}
     
<section className="relative py-24 overflow-hidden bg-[#c0aecf]">

  {/* Background image */}
  {/* <div className="absolute inset-0">
    <img
      src="/images/HomeImgs/Categories.png"
      alt=""
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/40" />
    <div className="absolute inset-0 bg-[#1F0A2E]/25 mix-blend-multiply" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,7,0.7)_100%)]" />
    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050507] to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050507] to-transparent" />
  </div> */}

  {/* G-CULTURE watermark */}
  {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <span className="text-[140px] font-bold tracking-[30px] text-white/[0.06] select-none">
      G-CULTURE
    </span>
  </div> */}

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
        Browse
      </p>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
        Shop by Category
      </h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {categories.map((cat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Link
            to={cat.path}
            className="group relative block h-[40vh] md:h-[50vh] overflow-hidden rounded-lg bg-white/5 border border-white/5 hover:border-white/15 backdrop-blur-sm transition-all duration-500"
          >
            {cat.img && (
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${cat.img})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4 max-w-xs">
                {cat.description}
              </p>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-300 group-hover:text-white transition-colors duration-200">
                Explore
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* ============ PROMO / WHY G-CULTURE ============ */}
{/* <section className="relative pt-24 pb-2 overflow-hidden">
  <div className="absolute inset-0">
    <img
      src="/images/HomeImgs/Categories.png"
      alt=""
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050507] to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050507] to-transparent" />
  </div>

</section> */}


      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="bg-[#050507]">
        <FeaturedProducts />
      </section>

      {/* ============ LATEST PRODUCTS ============ */}
      <section className="bg-[#050507]">
        <LatestProducts />
      </section>

      {/* ============ PROMO / WHY G-CULTURE ============ */}
      <section className="py-24 bg-[#050507]">
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
              The Difference
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Why G-Culture
            </h2>
          </motion.div>
          

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PromoCard
              number="01"
              title="Sustainable Fabrics"
              subtitle="Organic cotton & recycled blends — fashion that respects the planet."
            />
            <PromoCard
              number="02"
              title="Limited Drops"
              subtitle="Small batch releases — get them before they vanish."
            />
            <PromoCard
              number="03"
              title="Tailored Fit"
              subtitle="Refined fits crafted for comfort & movement."
            />
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="py-24 bg-[#050507]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Ready to elevate your wardrobe?
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
            Join the culture. Discover pieces designed for men who move with
            purpose.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-10 py-3.5 rounded-full bg-white text-black text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors duration-200"
          >
            Shop All
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

/* ---------- Promo card ---------- */
function PromoCard({ number, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group bg-white/[0.03] border border-white/[0.06] hover:border-white/15 p-8 rounded-lg transition-all duration-300"
    >
      <span className="text-xs text-gray-600 font-mono">{number}</span>
      <h4 className="text-xl font-semibold mt-3 mb-2 text-white">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed">{subtitle}</p>
      <Link
        to="/shop"
        className="inline-flex items-center gap-1 mt-5 text-xs uppercase tracking-wider text-gray-400 hover:text-white transition-colors duration-200"
      >
        Shop now
        <ArrowRight
          size={12}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Link>
    </motion.div>
  );
}
