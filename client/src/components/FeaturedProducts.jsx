// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import { useGetFeaturedProductsQuery } from "../features/products/productApi";
// import FeaturedProductCard from "./FeaturedProductCard";

// export default function FeaturedProducts() {
//   const { data, isLoading, isError } = useGetFeaturedProductsQuery();
//   const featuredProducts = Array.isArray(data) ? data : [];

//   // ⭐ Skeleton Slides Per View (matches breakpoints)
//   const skeletonBreakpoints = {
//     0: 1.2,
//     480: 2.5,
//     640: 3.2,
//     768: 4.5,
//     1024: 5.5,
//     1280: 6.5,
//   };

//   const getSkeletonCount = () => {
//     const width = window.innerWidth;
//     const entries = Object.entries(skeletonBreakpoints).reverse();

//     for (const [screen, count] of entries) {
//       if (width >= Number(screen)) return Math.round(count);
//     }
//     return 3;
//   };

//   // ⭐ Loading Skeleton
//   if (isLoading)
//     return (
//       <section className="py-10 text-white w-full">
//         <h2 className="text-center text-4xl md:text-5xl font-bold mb-10">
//           Featured <span className="text-yellow-400">Products</span>
//         </h2>

//         <div className="flex gap-4 overflow-hidden px-4">
//           {Array.from({ length: getSkeletonCount() }).map((_, i) => (
//             <div
//               key={i}
//               className="min-w-[170px] h-[260px] bg-white/10 animate-pulse"
//             />
//           ))}
//         </div>
//       </section>
//     );

//   if (isError || featuredProducts.length === 0) return null;

//   return (
//     <section className="py-10 bg-[#050507] text-white relative">
//       <h2 className="text-center text-4xl md:text-5xl font-bold mb-10">
//         Featured <span className="text-yellow-400">Products</span>
//       </h2>

//       <div className="w-full px-4 md:px-6">

//         {/* ⭐ Custom Navigation Buttons */}
//         <style>
//           {`
//           .swiper-button-prev,
//           .swiper-button-next {
//             width: 32px;
//             height: 32px;
//             color: black;
//             background: rgba(255, 255, 255, 0.9);
//             border-radius: 50%;
//             box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//             padding: 10px;
//             font-weight: extra-bold;
//           }
//           .swiper-button-prev:after,
//           .swiper-button-next:after {
//             font-size: 14px;
//             font-weight: 900;
//           }

//           /* ⭐ move dots down */
//           .swiper-pagination-bullets {
//             position: absolute;
//             margin-top: 10px !important;
//             bottom: -5px !important;
//             ;
//           }

//           /* Dot styling */
//           .swiper-pagination-bullet {
//             background: rgba(255,255,255,0.7);
//             opacity: 1 !important;
//           }
//           .swiper-pagination-bullet-active {
//             background: #facc15 !important; /* amber-400 */
//             opacity: 1 !important;
//           }
//         `}
//         </style>

//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={12}
//           navigation
//           pagination={{ clickable: true }}
//           loop={true}
//           autoplay={{ delay: 3200, disableOnInteraction: false }}
//           breakpoints={{
//             0: { slidesPerView: 1.2 },
//             480: { slidesPerView: 2.5 },
//             640: { slidesPerView: 3.2 },
//             768: { slidesPerView: 4.5 },
//             1024: { slidesPerView: 5.5 },
//             1280: { slidesPerView: 6.5 },
//           }}
//           className="pb-14"
//         >
//           {featuredProducts.map((product) => (
//             <SwiperSlide key={product._id}>
//               <FeaturedProductCard product={product} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }


// FeaturedProducts.jsx (premium pro-level slider)
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

export default function FeaturedProducts() {
  const { data, isLoading, isError } = useGetFeaturedProductsQuery();
  const featuredProducts = Array.isArray(data) ? data : [];

  // responsive slidesPerView for skeleton + calculation
  const breakpointsConfig = [
    { min: 1280, slides: 4 }, // very large screens
    { min: 1024, slides: 3 }, // laptop
    { min: 768, slides: 2.2 }, // tablet
    { min: 480, slides: 1.4 }, // big phone
    { min: 0, slides: 1.05 }, // phone
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

  // Early UI: loading skeleton that matches screen (count)
  if (isLoading) {
    return (
      <section className="py-10 bg-[#050507] text-white">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-6">
          Featured <span className="text-yellow-400">Products</span>
        </h2>

        <div className="relative w-full px-4 md:px-6 py-5">
          {/* gradient masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#050507] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050507] to-transparent z-10" />

          <div className="flex gap-4 overflow-hidden py-6">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <div
                key={i}
                className="min-w-[220px] md:min-w-[260px] lg:min-w-[300px] h-[360px] md:h-[420px] bg-white/6 animate-pulse rounded-xl"
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
    <section className="py-10 bg-[#050507] text-white">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-6">
        Featured <span className="text-yellow-400">Products</span>
      </h2>

      <div className="relative w-full px-4 md:px-6 py-5">
        {/* left / right gradient masks for premium fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#050507] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#050507] to-transparent z-20" />

        {/* CUSTOM INLINE CSS for nav/pagination styling */}
        <style>{`
          /* small white circular nav buttons */
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
            top: 40%;
          }
          .swiper-button-prev:after,
          .swiper-button-next:after {
            font-size: 10px;
            font-weight: 900;
            color: black;
            opacity: 0.95;
          }
          /* smaller nav on mobile */
          @media (max-width: 640px) {
            .swiper-button-prev,
            .swiper-button-next { width: 30px; height: 30px; top: 45%; }
            .swiper-button-prev:after, .swiper-button-next:after { font-size: 12px; }
          }

          /* pagination dots placed below slider and styled */
          .swiper-pagination {
            bottom: -18px !important;
            text-align: center;
            left: 0;
            right: 0;
          }
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 0 6px !important;
            background: rgba(255,255,255,0.7);
            opacity: 0.6;
            border-radius: 9999px;
            transition: all 240ms ease;
          }
          .swiper-pagination-bullet-active {
            transform: scale(1.15);
            background: #facc15 !important; /* amber */
            opacity: 1;
          }

          /* center focus effect: scale active slide and subtle rotate for neighbors */
          .swiper-slide {
            transition: transform 360ms cubic-bezier(.2,.9,.2,1), box-shadow 360ms;
            will-change: transform;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .swiper-slide .featured-card {
            transform: scale(0.985);
            transition: transform 360ms cubic-bezier(.2,.9,.2,1), box-shadow 360ms;
            will-change: transform;
            width: 100%;
            max-width: 280px;
          }

          .swiper-slide-active .featured-card {
            transform: scale(1.02);
            box-shadow: 0 20px 50px rgba(2,6,23,0.55);
            border-radius: 12px;
          }

          /* slight tilt for prev/next visible slides to create depth */
          .swiper-slide-prev .featured-card,
          .swiper-slide-next .featured-card {
            transform: scale(0.98) rotateY(3deg);
            filter: saturate(0.98);
          }

          /* keep slides centered and responsive */
          .featured-slide-wrap {
            padding: 4px;
            display: flex;
            align-items: stretch;
            justify-content: center;
          }
        `}</style>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, Keyboard, EffectCoverflow]}
          effect={"coverflow"}
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
          autoplay={{ delay: 3400, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            0: { slidesPerView: 1.05 },
            480: { slidesPerView: 1.25 },
            640: { slidesPerView: 1.8 },
            768: { slidesPerView: 2.6 },
            1024: { slidesPerView: 3.6 },
            1280: { slidesPerView: 4.2 },
            1600: { slidesPerView: 4.8 },
          }}
          className="pb-12"
        >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="featured-slide-wrap">
                {/* featured-card is targeted by CSS to get focus scale/shadow */}
                <div className="featured-card w-full">
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
