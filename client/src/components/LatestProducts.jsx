import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

import { useGetLatestProductsQuery } from "../features/products/productApi";
import LatestProductCard from "./LatestProductCard";

export default function LatestProducts() {
  const { data, isLoading, isError } = useGetLatestProductsQuery();
  const latestProducts = Array.isArray(data) ? data : [];

  /* ------------------ SKELETON ------------------ */
  if (isLoading)
    return (
      <section className="py-10 text-white w-full">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-10">
          Latest <span className="text-yellow-400">Products</span>
        </h2>

        <div className="flex gap-4 overflow-hidden px-4 w-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[220px] md:min-w-[260px] lg:min-w-[300px] h-[360px] md:h-[420px] bg-white/10 animate-pulse"
            />
          ))}
        </div>
      </section>
    );

  if (isError || latestProducts.length === 0) return null;

  return (
    <section className="py-5 bg-[#050507] text-white relative">
      <div className="flex justify-between items-center px-4 md:px-8 mb-10">
        <h2 className="text-center text-4xl md:text-5xl font-bold">
          Latest <span className="text-yellow-400">Products</span>
        </h2>
        <Link to="/shop">
          <button className="cursor-pointer text-sm md:text-base border-1 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-200 hover:text-black transition">
            See All →
          </button>
        </Link>
      </div>

      <div className="relative px-4 md:px-8 pb-14 w-full overflow-hidden">
        {/* FADE MASKS (Rare.com effect) */}
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050507] to-transparent z-30" /> */}
        {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050507] to-transparent z-30" /> */}

        {/* LUXURY CSS OVERRIDES */}
        <style>{`
          /* NAVIGATION BUTTONS */
          .latest-swiper {
          position: relative !important;
          overflow: visible !important;
          padding-bottom: 40px !important;
          }
          .latest-swiper .swiper-button-prev,
          .latest-swiper .swiper-button-next {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: rgba(255,255,255,0.92);
            color: #000;
            box-shadow: 0 6px 18px rgba(0,0,0,0.35);
            top: 40%;
          }
          .latest-swiper .swiper-button-prev:after,
          .latest-swiper .swiper-button-next:after {
            font-size: 14px;
            font-weight: 900;
          }

          /* PAGINATION - PREMIUM & SEPARATED */
          .latest-swiper .swiper-pagination {
            bottom: -35px !important;
            position: absolute !important;
            width: 100% !important;
            text-align: center !important;
            z-index: 999;
          }

          .latest-swiper .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: rgba(255,255,255,0.55);
            opacity: 0.55;
            margin: 0 7px !important;
            transition: 0.25s;
          }
          .latest-swiper .swiper-pagination-bullet-active {
            background: #facc15 !important;
            opacity: 1 !important;
            transform: scale(1.25);
          }

          /* SLIDE DEPTH + SCALE */
          .latest-swiper .swiper-slide {
            transition: transform 0.45s ease, opacity 0.4s ease;
            opacity: 0.55;
            display: flex;
            justify-content: center;
          }

          .latest-swiper .swiper-slide-active {
            transform: scale(1.04);
            opacity: 1;
          }

          .latest-swiper .swiper-slide-prev,
          .latest-swiper .swiper-slide-next {
            transform: scale(0.96);
            opacity: 0.75;
          }

          /* Prevent clipping */
          .latest-swiper .swiper-wrapper {
            overflow: visible;
          }
        `}</style>

        {/* SWIPER */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            480: { slidesPerView: 1.6 },
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1280: { slidesPerView: 4.8 },
            1600: { slidesPerView: 5.6 },
          }}
          className="latest-swiper pb-6"
        >
          {latestProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <LatestProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
