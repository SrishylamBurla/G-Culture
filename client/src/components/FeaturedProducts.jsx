// import { useEffect, useState, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import {
//   Navigation,
//   Pagination,
//   Autoplay,
//   Keyboard,
//   EffectCoverflow,
// } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-coverflow";

// import { useGetFeaturedProductsQuery } from "../features/products/productApi";
// import FeaturedProductCard from "./FeaturedProductCard";
// import { Link } from "react-router-dom";

// export default function FeaturedProducts() {
//   const { data, isLoading, isError } = useGetFeaturedProductsQuery();
//   const featuredProducts = Array.isArray(data) ? data : [];

//   // responsive slidesPerView for skeleton + calculation
//   const breakpointsConfig = [
//     { min: 1280, slides: 6.5 },
//     { min: 1024, slides: 5.5 },
//     { min: 768, slides: 4.5 },
//     { min: 640, slides: 2.5 },
//     { min: 480, slides: 1.6 },
//     { min: 0, slides: 1.2 },
//   ];

//   const getSlidesForWidth = (width) => {
//     for (const bp of breakpointsConfig) {
//       if (width >= bp.min) return bp.slides;
//     }
//     return 1;
//   };

//   const [slidesPreview, setSlidesPreview] = useState(
//     getSlidesForWidth(typeof window !== "undefined" ? window.innerWidth : 1024)
//   );

//   useEffect(() => {
//     const onResize = () => {
//       setSlidesPreview(getSlidesForWidth(window.innerWidth));
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // skeleton count: round to nearest integer and show at least 1
//   const skeletonCount = Math.max(1, Math.round(slidesPreview));

//   // loading skeleton
//   if (isLoading) {
//     return (
//       <section className="py-10 bg-[#050507] text-white">
//         <h2 className="text-center text-4xl md:text-5xl font-bold mb-6">
//           Featured <span className="text-yellow-400">Products</span>
//         </h2>

//         <div className="relative w-full px-4 md:px-6 py-5">

//           <div className="flex gap-4 overflow-hidden py-6 w-full">
//             {Array.from({ length: 8 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="min-w-[220px] md:min-w-[260px] lg:min-w-[300px] h-[360px] md:h-[420px] bg-white/6 animate-pulse"
//               />
//             ))}
//           </div>

//           <div className="mt-6 flex items-center justify-center">
//             <div className="h-1 w-28 bg-white/8 rounded-full animate-pulse" />
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (isError || featuredProducts.length === 0) return null;

//   return (
//     <section className="py-5 bg-[#050507] text-white">
//       <div className="flex justify-between items-center px-4 md:px-6 mb-10">
//         <h2 className="text-3xl md:text-5xl font-bold">
//           Featured <span className="text-yellow-400">Products</span>
//         </h2>

//         <Link to="/shop">
//           <button className="cursor-pointer text-sm md:text-base border-1 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-200 hover:text-black transition">
//             See All →
//           </button>
//         </Link>
//       </div>

//       <div className="relative w-full px-4 md:px-6 pb-14 overflow-hidden">
//         {/* left / right gradient masks */}
//         {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#050507] to-transparent z-0" /> */}
//         {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#050507] to-transparent z-0" /> */}

//         <style>{`
//   .swiper-button-prev,
//   .swiper-button-next {
//     width: 36px;
//     height: 36px;
//     border-radius: 9999px;
//     background: rgba(255,255,255,0.95);
//     color: #000;
//     box-shadow: 0 6px 20px rgba(2,6,23,0.4);
//     display: flex;
//     padding: 8px;
//     align-items: center;
//     justify-content: center;
//     top: 38%;
//   }

//   @media (max-width: 640px) {
//     .swiper-button-prev,
//     .swiper-button-next {
//       width: 30px;
//       height: 30px;
//       top: 40%;
//     }
//   }

//   /* ⭐ Final Pagination fix */
//   .featured-products {
//     overflow: visible !important;
//     position: relative !important;
//     padding-bottom: 40px !important;
//   }
//   .featured-products .swiper-wrapper {
//   overflow: visible !important;
// }

//   .featured-products .swiper-pagination {
//     bottom: -32px !important;
//     position: absolute !important;
//     width: 100% !important;
//     left: 0 !important;
//     right: 0 !important;
//     text-align: center;
//     z-index: 9999 !important;
//     pointer-events: auto !important;
//   }

//   .featured-products .swiper-pagination-bullet {
//     width: 10px;
//     height: 10px;
//     margin: 0 6px !important;
//     background: rgba(255,255,255,0.6);
//     opacity: 0.6;
//     border-radius: 9999px;
//     transition: all 220ms ease;
//   }

//   .featured-products .swiper-pagination-bullet-active {
//     background: #facc15 !important;
//     transform: scale(1.2);
//     opacity: 1 !important;
//   }
// `}</style>

//         <Swiper
//           modules={[
//             Navigation,
//             Pagination,
//             Autoplay,
//             Keyboard,
//             EffectCoverflow,
//           ]}
//           effect="coverflow"
//           coverflowEffect={{
//             rotate: 6,
//             stretch: 10,
//             depth: 120,
//             modifier: 0.9,
//             slideShadows: false,
//           }}
//           spaceBetween={4}
//           centeredSlides={true}
//           slidesPerView={1.05}
//           loop={true}
//           grabCursor={true}
//           keyboard={{ enabled: true }}
//           navigation={true}
//           pagination={{ clickable: true }}
//           autoplay={{
//             delay: 3400,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true,
//           }}
//           breakpoints={{
//             0: { slidesPerView: 1.2 },
//             480: { slidesPerView: 1.6 },
//             640: { slidesPerView: 2.5 },
//             768: { slidesPerView: 3.5 },
//             1024: { slidesPerView: 4.5 },
//             1280: { slidesPerView: 4.5 },
//             1600: { slidesPerView: 5.5 },
//           }}
//           className="featured-products pb-6"
//         >
//           {featuredProducts.map((product) => (
//             <SwiperSlide key={product._id}>
//               <div className="featured-slide-wrap flex justify-center">
//                 <div className="featured-card">
//                   <FeaturedProductCard product={product} />
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useGetFeaturedProductsQuery } from "../features/products/productApi";
import FeaturedProductCard from "./FeaturedProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
  const { data, isLoading, isError } = useGetFeaturedProductsQuery();
  const featuredProducts = Array.isArray(data) ? data : [];

  const breakpointsConfig = [
    { min: 1280, slides: 5.5 },
    { min: 1024, slides: 4.5 },
    { min: 768, slides: 3.5 },
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
    getSlidesForWidth(typeof window !== "undefined" ? window.innerWidth : 1024),
  );

  useEffect(() => {
    const onResize = () => {
      setSlidesPreview(getSlidesForWidth(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="py-16 bg-[#050507] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="h-3 w-20 bg-white/5 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-64 bg-white/5 rounded mx-auto animate-pulse" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[220px] md:min-w-[240px] h-[380px] bg-white/[0.03] rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || featuredProducts.length === 0) return null;

  return (
    <section className="py-2 bg-[#050507] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        {/* <div className="flex justify-between items-end mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
              Curated
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Featured Products
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 hover:text-white border border-white/15 hover:border-white/40 px-5 py-2.5 rounded-full transition-all duration-200"
          >
            See All
            <ArrowRight size={14} />
          </Link>
        </div> */}

        {/* Header */}
        <div className="flex justify-between items-end mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
              Curated
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Featured Products
            </h2>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 hover:text-white border border-white/15 hover:border-white/40 px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-all duration-200"
          >
            See All
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Swiper */}
      <div className="relative w-full pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pb-14 overflow-hidden">
        <style>{`
  .featured-swiper {
    position: relative !important;
    overflow: visible !important;
  }

  /* Nav arrows — inside the carousel, vertically centered on cards */
  .featured-swiper .swiper-button-prev,
  .featured-swiper .swiper-button-next {
    width: 36px;
    height: 36px;
    border-radius: 9999px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.15);
    backdrop-filter: blur(12px);
    color: #fff;
    padding: 10px;
    top: 35%;
    transform: translateY(-50%);
    transition: all 200ms ease;
    z-index: 10;
  }
  .featured-swiper .swiper-button-prev {
    left: 8px;
  }
  .featured-swiper .swiper-button-next {
    right: 8px;
  }
  .featured-swiper .swiper-button-prev:hover,
  .featured-swiper .swiper-button-next:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.3);
  }
  .featured-swiper .swiper-button-prev::after,
  .featured-swiper .swiper-button-next::after {
    font-size: 13px;
    font-weight: bold;
  }

  /* Pagination dots — tucked right below cards */
  .featured-swiper .swiper-pagination {
    position: relative !important;
    bottom: auto !important;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 4px;
  }
  .featured-swiper .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    margin: 0 3px !important;
    background: rgba(255,255,255,0.2);
    opacity: 1;
    border-radius: 9999px;
    transition: all 200ms ease;
  }
  .featured-swiper .swiper-pagination-bullet-active {
    background: #fff !important;
    width: 20px;
    border-radius: 9999px;
  }
`}</style>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, Keyboard]}
          spaceBetween={16}
          slidesPerView={1.2}
          loop={true}
          grabCursor={true}
          keyboard={{ enabled: true }}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1.3, spaceBetween: 12 },
            480: { slidesPerView: 1.8, spaceBetween: 14 },
            640: { slidesPerView: 2.5, spaceBetween: 16 },
            768: { slidesPerView: 3.2, spaceBetween: 16 },
            1024: { slidesPerView: 4.2, spaceBetween: 16 },
            1280: { slidesPerView: 4.8, spaceBetween: 18 },
          }}
          className="featured-swiper pb-10"
        >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <FeaturedProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile See All */}
      {/* <div className="md:hidden flex justify-center mt-4">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 hover:text-white border border-white/15 hover:border-white/40 px-6 py-2.5 rounded-full transition-all duration-200"
        >
          See All Products
          <ArrowRight size={14} />
        </Link>
      </div> */}
    </section>
  );
}
