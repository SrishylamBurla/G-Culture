import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
// import CategoryCard from "../components/CategoryCard";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import HomeHeroCarousel from "../components/HomeHeroCarousel";
import FeaturedProducts from "../components/FeaturedProducts";
// import ParallaxWrapper from "../components/ParallaxWrapper";

export default function HomePage() {
  const categories = [
    {
      name: "Street Wear",
      path: "/streetwear",
      // img: "/images/HomeImgs/streetwear.png",
    },
    {
      name: "Casual Wear",
      path: "/casualwear",
      // img: "/images/HomeImgs/casualwear1.webp",
    },
    {
      name: "Chest Bags",
      path: "/chestbags",
      // img: "/images/HomeImgs/chestbags.png",
    },
    {
      name: "Caps",
      path: "/caps",
      // img: "/images/HomeImgs/caps.png",
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
      {/* <ParallaxWrapper speed={0.2}> */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden min-h-[50vh] md:h-[110vh] flex justify-center items-center"
      >
        {/* ambient shapes */}
        <div className="pointer-events-none absolute -left-28 -top-28 w-[420px] h-[420px] rounded-full blur-[120px] bg-gradient-to-br from-[#d4af37]/20 to-transparent" />
        <div className="pointer-events-none absolute -right-32 -bottom-32 w-[420px] h-[420px] rounded-full blur-[120px] bg-gradient-to-br from-[#b8860b]/12 to-transparent" />

        <div className="relative z-10 w-full px-6 md:px-8 lg:px-10 py-35 md:py-50 flex flex-col justify-center md:flex-row items-center gap-50">
          {/* LEFT: Text */}
          <motion.div
            style={{ y: yText, opacity: opacityFade }}
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h1 className="hero-head text-[48px] md:text-[84px] lg:text-[96px] leading-[0.95] tracking-tight">
              G-CULTURE
            </h1>

            <p className="mt-4 text-[20px] md:text-[30px] text-gray-300 max-w-2xl">
              For men who carry{" "}
              <span className="text-[#d4af37] font-semibold">confidence</span>{" "}
              like a second skin
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-6 py-3 rounded-sm border-1 text-white hover:bg-amber-50 hover:text-black font-semibold shadow hover:scale-[1.02] transition"
              >
                Explore Collection
              </Link>
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
              className="w-[260px] md:w-[350px] rounded-3xl shadow-2xl object-cover"
            />
          </motion.div>
        </div>
      </section>
      {/* <section>
      <HomeHeroCarousel />
    </section> */}
      <section className="bg-[#050507]">
        <div className="w-full">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 text-white">
            Shop by <span className="text-yellow-400">Category</span>
          </h2>

          <div className="flex flex-col">
            {categories.map((cat, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`
              relative w-full h-[70vh] overflow-hidden shadow-xl group cursor-pointer
              ${
                isEven
                  ? "bg-gradient-to-r from-black/80"
                  : "bg-gradient-to-l from-black/80"
              }
            `}
                >
                  {/* Background Image */}
                  <motion.div
                    className="absolute inset-0 bg-center bg-cover"
                    style={{ backgroundImage: `url(${cat.img})` }}
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />

                  {/* Overlay */}
                  <div
                    className={`
                absolute inset-0 
                ${isEven ? "bg-black/40" : "bg-black/50"}
                group-hover:bg-black/30 transition-all
              `}
                  />

                  {/* TEXT BLOCK */}
                  <div
                    className={`
                absolute z-20 px-3 flex flex-col justify-center text-center max-w-2xl
                ${
                  isEven
                    ? "left-1 md:left-5 text-left"
                    : "right-1 md:right-5 text-right"
                }
                top-1/2 -translate-y-1/2
              `}
                  >
                    <motion.h3
                      className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-xl"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.7 }}
                    >
                      {cat.name}
                    </motion.h3>

                    <motion.p
                      className="mt-4 text-lg md:text-2xl text-gray-200"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.7 }}
                    >
                      {cat.quote ||
                        "Discover exclusive new arrivals curated for bold men."}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.7 }}
                      className="mt-8"
                    >
                      <Link
                        to={cat.path}
                        className="
                    px-10 py-3 rounded-sm border text-white bg-black hover:bg-white hover:text-black
                    text-lg font-semibold shadow-lg transition
                  "
                      >
                        Explore {cat.name}
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* <section className="relative w-full h-[50vh] md:h-[60vh] bg-black">
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
              <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{backgroundColor: "gray"}}
                  // style={{ backgroundImage: `url(${cat.img})` }}
                />

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
        <button className="cat-prev-btn absolute left-6 top-1/2 -translate-y-1/2 z-30 text-white rounded-full p-3 transition">
          ❮
        </button>

        <button className="cat-next-btn absolute right-6 top-1/2 -translate-y-1/2 z-30 text-white rounded-full p-3 transition">
          ❯
        </button>
      </section> */}

      {/* ================ PROMO ROW ================ */}
      <section className="bg-[#07070a]">
        <FeaturedProducts />
      </section>

      <section className="pt-24 py-24 bg-[#07070a]">
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
      {/* </ParallaxWrapper> */}
    </div>
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
