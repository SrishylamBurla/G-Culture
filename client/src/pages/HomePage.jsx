import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CategoryCard from "../components/CategoryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ParallaxWrapper from "../components/ParallaxWrapper";

const HERO_IMG_LOCAL = "/images/HomeImgs/Herosec.png";

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

  // Parallax for hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0px", "140px"]);
  const opacityFade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="bg-[#050507] text-white min-h-screen">
      {/* HERO */}
      <ParallaxWrapper speed={0.1}>
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden min-h-[100vh] md:min-h-[120vh] flex items-center"
      >
        {/* ambient shapes */}
        <div className="pointer-events-none absolute -left-28 -top-28 w-[420px] h-[420px] rounded-full blur-[120px] bg-gradient-to-br from-[#d4af37]/20 to-transparent" />
        <div className="pointer-events-none absolute -right-32 -bottom-32 w-[420px] h-[420px] rounded-full blur-[120px] bg-gradient-to-br from-[#b8860b]/12 to-transparent" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-35 md:py-50 flex flex-col justify-center md:flex-row items-center gap-50">
          {/* LEFT: Text */}
          <motion.div
            style={{ y: yText, opacity: opacityFade }}
            className="flex-1 max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h1 className="text-[48px] md:text-[84px] lg:text-[96px] font-extrabold leading-[0.95] tracking-tight">
              G-CULTURE
            </h1>

            <p className="mt-4 text-[15px] md:text-[20px] text-gray-300 max-w-xl">
              For men who carry{" "}
              <span className="text-[#d4af37] font-semibold">confidence</span>{" "}
              like a second skin — functional, refined, unapologetic.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-semibold shadow hover:scale-[1.02] transition"
              >
                Explore Collection
              </Link>

              <Link
                to="/about-us"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition"
              >
                Our Story
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <span className="inline-block w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sm">
                  🚚
                </span>
                <div>
                  <div className="font-semibold text-white">Free Shipping</div>
                  <div className="text-xs text-gray-400">
                    All orders above ₹999
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-block w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sm">
                  🔁
                </span>
                <div>
                  <div className="font-semibold text-white">Easy Returns</div>
                  <div className="text-xs text-gray-400">
                    7-day easy exchange
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            whileHover={{ scale: 1.03 }}
            className="relative mt-0"
          >
            {/* Rotating border frame */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="absolute -inset-4 rounded-3xl border-4 border-white/20"
            />

            <img
              src="/images/HomeImgs/Herosec.png"
              alt="Hero"
              className="w-[260px] md:w-[380px] rounded-3xl shadow-2xl object-cover"
            />
          </motion.div>
        </div>
      </section>
      {/* ================ CATEGORY SLIDER ================ */}

      <section className="relative w-full h-[75vh] md:h-[85vh] md:px-20 py-10 bg-black">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".cat-next-btn",
            prevEl: ".cat-prev-btn",
          }}
          className="h-full w-full"
        >
          {categories.map((cat, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${cat.img})` }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                {/* Content */}
                <div className="relative z-20 h-full w-full flex flex-col items-center justify-center text-center px-6">
                  <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    className="text-4xl md:text-6xl font-bold text-white"
                  >
                    {cat.name}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-lg md:text-2xl text-gray-200 mt-4 max-w-2xl"
                  >
                    {cat.quote ||
                      "Discover the latest collection crafted for men who move with confidence."}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-8"
                  >
                    <Link
                      to={cat.path}
                      className="px-8 py-3 rounded-full bg-white text-black text-lg font-semibold hover:bg-black hover:text-white transition"
                    >
                      Explore {cat.name}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button className="cat-prev-btn absolute left-6 top-1/2 -translate-y-1/2 z-30 text-white bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full p-3 transition">
          ❮
        </button>

        <button className="cat-next-btn absolute right-6 top-1/2 -translate-y-1/2 z-30 text-white bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full p-3 transition">
          ❯
        </button>
      </section>
      
      {/* ================ PROMO ROW ================ */}

      <section className="pt-24 bg-[#07070a]">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <PromoCard
            title="Sustainable Fabrics"
            subtitle="Organic cotton & recycled blends."
          />
          <PromoCard
            title="Limited Drops"
            subtitle="Small batch releases — get them before they vanish."
          />
          <PromoCard
            title="Tailored Fit"
            subtitle="Refined fits crafted for comfort & movement."
          />
        </div>
      </section>
      </ParallaxWrapper>
    </div>
  );
}

/* ---------- Category tile (3D tilt + badge) ---------- */
function CategoryTile({ cat }) {
  return (
    <Link
      to={cat.path}
      className="block min-w-[320px] md:min-w-[420px] bg-white rounded-2xl shadow-xl overflow-hidden transform-gpu hover:scale-[1.02] transition"
      aria-label={`Open ${cat.name}`}
    >
      <div className="relative h-60 md:h-64">
        <img
          src={cat.img}
          alt={cat.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute left-6 bottom-6">
          <div className="text-2xl md:text-3xl font-bold text-white">
            {cat.name}
          </div>
          <div className="text-sm text-white/90 mt-1 hidden md:block">
            Explore latest edits & essentials
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="text-lg font-semibold text-gray-800">{cat.name}</div>
        <div className="text-sm text-gray-500 mt-1">
          Explore latest edits & essentials
        </div>
      </div>
    </Link>
  );
}

/* ---------- Promo card ---------- */
function PromoCard({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white/6 to-white/3 border border-white/6 p-6 rounded-xl text-white"
    >
      <div className="text-sm text-gray-300 uppercase tracking-wider mb-2">
        Why G-Culture
      </div>
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="mt-2 text-gray-300 text-sm">{subtitle}</p>
      <Link
        to="/shop"
        className="inline-block mt-4 text-sm underline text-white/90"
      >
        Shop now
      </Link>
    </motion.div>
  );
}
