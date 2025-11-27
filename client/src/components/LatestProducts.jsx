import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useGetLatestProductsQuery } from "../features/products/productApi";
import LatestProductCard from "./LatestProductCard";

export default function LatestProducts() {
  const { data, isLoading, isError } = useGetLatestProductsQuery();
  const latestProducts = Array.isArray(data) ? data : [];

  // ⭐ Skeleton Slides Per View (matches breakpoints)
  const skeletonBreakpoints = {
    0: 1.2,
    480: 2.5,
    640: 3.2,
    768: 4.5,
    1024: 5.5,
    1280: 6.5,
  };

  const getSkeletonCount = () => {
    const width = window.innerWidth;
    const entries = Object.entries(skeletonBreakpoints).reverse();

    for (const [screen, count] of entries) {
      if (width >= Number(screen)) return Math.round(count);
    }
    return 3;
  };

  // ⭐ Loading Skeleton
  if (isLoading)
    return (
      <section className="py-10 text-white w-full">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-10">
          Latest <span className="text-yellow-400">Products</span>
        </h2>

        <div className="flex gap-4 overflow-hidden px-4">
          {Array.from({ length: getSkeletonCount() }).map((_, i) => (
            <div
              key={i}
              className="min-w-[170px] h-[260px] bg-white/10 animate-pulse"
            />
          ))}
        </div>
      </section>
    );

  if (isError || latestProducts.length === 0) return null;

  return (
    <section className="py-10 bg-[#050507] text-white relative">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-10">
        Latest <span className="text-yellow-400">Products</span>
      </h2>

      <div className="w-full px-4 md:px-6">

        {/* ⭐ Custom Navigation Buttons */}
        <style>
          {`
          .swiper-button-prev,
          .swiper-button-next {
            width: 32px;
            height: 32px;
            color: black;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            padding: 10px;
            font-weight: extra-bold;
          }
          .swiper-button-prev:after,
          .swiper-button-next:after {
            font-size: 14px;
            font-weight: 900;
          }

          /* ⭐ move dots down */
          .swiper-pagination-bullets {
            position: absolute;
            margin-top: 10px !important;
            bottom: -5px !important;
            ;
          }

          /* Dot styling */
          .swiper-pagination-bullet {
            background: rgba(255,255,255,0.7);
            opacity: 1 !important;
          }
          .swiper-pagination-bullet-active {
            background: #facc15 !important; /* amber-400 */
            opacity: 1 !important;
          }
        `}
        </style>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={12}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            480: { slidesPerView: 2.5 },
            640: { slidesPerView: 3.2 },
            768: { slidesPerView: 4.5 },
            1024: { slidesPerView: 5.5 },
            1280: { slidesPerView: 6.5 },
          }}
          className="pb-14"
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