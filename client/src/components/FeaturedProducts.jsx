import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { useGetFeaturedProductsQuery } from "../features/products/productApi";
import FeaturedProductCard from "./FeaturedProductCard";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const { data, isLoading, isError } = useGetFeaturedProductsQuery();
  const featuredProducts = Array.isArray(data) ? data : [];

  // responsive slidesPerView for skeleton + calculation
  const breakpointsConfig = [
    { min: 1280, slides: 6.5 },
    { min: 1024, slides: 5.5 },
    { min: 768, slides: 4.5 },
    { min: 640, slides: 2.5 },
    { min: 480, slides: 1.6 },
    { min: 0, slides: 1.2 }, 
  ];

  const getSlidesForWidth = (width) => {
    for (const bp of breakpointsConfig) {
      if (width >= bp.min) return bp.slides;
    }
    return 1;
  };

  const [slidesPreview, setSlidesPreview] = useState(
    getSlidesForWidth(typeof window !== "undefined" ? window.innerWidth : 1024)
  );

  useEffect(() => {
    const onResize = () => {
      setSlidesPreview(getSlidesForWidth(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // skeleton count: round to nearest integer and show at least 1
  const skeletonCount = Math.max(1, Math.round(slidesPreview));

  // loading skeleton
  if (isLoading) {
    return (
      <section className="py-10 bg-[#050507] text-white">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-6">
          Featured <span className="text-yellow-400">Products</span>
        </h2>

        <div className="relative w-full px-4 md:px-6 py-5">

          <div className="flex gap-4 overflow-hidden py-6 w-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[220px] md:min-w-[260px] lg:min-w-[300px] h-[360px] md:h-[420px] bg-white/6 animate-pulse"
              />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center">
            <div className="h-1 w-28 bg-white/8 rounded-full animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || featuredProducts.length === 0) return null;

  return (
    <section className="py-5 bg-[#050507] text-white">
      <div className="flex justify-between items-center px-4 md:px-6 mb-10">
        <h2 className="text-3xl md:text-5xl font-bold">
          Featured <span className="text-yellow-400">Products</span>
        </h2>

        <Link to="/shop">
          <button className="cursor-pointer text-sm md:text-base border-1 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-200 hover:text-black transition">
            See All →
          </button>
        </Link>
      </div>

      <div className="relative w-full px-4 md:px-6 pb-14 overflow-hidden">
        {/* left / right gradient masks */}
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#050507] to-transparent z-0" /> */}
        {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#050507] to-transparent z-0" /> */}

        <style>{`
  .swiper-button-prev,
  .swiper-button-next {
    width: 36px;
    height: 36px;
    border-radius: 9999px;
    background: rgba(255,255,255,0.95);
    color: #000;
    box-shadow: 0 6px 20px rgba(2,6,23,0.4);
    display: flex;
    padding: 8px;
    align-items: center;
    justify-content: center;
    top: 38%;
  }

  @media (max-width: 640px) {
    .swiper-button-prev,
    .swiper-button-next {
      width: 30px;
      height: 30px;
      top: 40%;
    }
  }

  /* ⭐ Final Pagination fix */
  .featured-products {
    overflow: visible !important;
    position: relative !important;
    padding-bottom: 40px !important;
  }
  .featured-products .swiper-wrapper {
  overflow: visible !important;
}

  .featured-products .swiper-pagination {
    bottom: -32px !important;
    position: absolute !important;
    width: 100% !important;
    left: 0 !important;
    right: 0 !important;
    text-align: center;
    z-index: 9999 !important;
    pointer-events: auto !important;
  }

  .featured-products .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    margin: 0 6px !important;
    background: rgba(255,255,255,0.6);
    opacity: 0.6;
    border-radius: 9999px;
    transition: all 220ms ease;
  }

  .featured-products .swiper-pagination-bullet-active {
    background: #facc15 !important;
    transform: scale(1.2);
    opacity: 1 !important;
  }
`}</style>

        <Swiper
          modules={[
            Navigation,
            Pagination,
            Autoplay,
            Keyboard,
            EffectCoverflow,
          ]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 6,
            stretch: 10,
            depth: 120,
            modifier: 0.9,
            slideShadows: false,
          }}
          spaceBetween={4}
          centeredSlides={true}
          slidesPerView={1.05}
          loop={true}
          grabCursor={true}
          keyboard={{ enabled: true }}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3400,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            480: { slidesPerView: 1.6 },
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3.5 },
            1024: { slidesPerView: 4.5 },
            1280: { slidesPerView: 4.5 },
            1600: { slidesPerView: 5.5 },
          }}
          className="featured-products pb-6"
        >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="featured-slide-wrap flex justify-center">
                <div className="featured-card">
                  <FeaturedProductCard product={product} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
