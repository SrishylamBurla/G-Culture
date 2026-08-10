// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Link } from "react-router-dom";

// import { useGetLatestProductsQuery } from "../features/products/productApi";
// import LatestProductCard from "./LatestProductCard";

// export default function LatestProducts() {
//   const { data, isLoading, isError } = useGetLatestProductsQuery();
//   const latestProducts = Array.isArray(data) ? data : [];

//   /* ------------------ SKELETON ------------------ */
//   if (isLoading)
//     return (
//       <section className="py-10 text-white w-full">
//         <h2 className="text-center text-4xl md:text-5xl font-bold mb-10">
//           Latest <span className="text-yellow-400">Products</span>
//         </h2>

//         <div className="flex gap-4 overflow-hidden px-4 w-full">
//           {Array.from({ length: 8 }).map((_, i) => (
//             <div
//               key={i}
//               className="min-w-[220px] md:min-w-[260px] lg:min-w-[300px] h-[360px] md:h-[420px] bg-white/10 animate-pulse"
//             />
//           ))}
//         </div>
//       </section>
//     );

//   if (isError || latestProducts.length === 0) return null;

//   return (
//     <section className="py-5 bg-[#050507] text-white relative">
//       <div className="flex justify-between items-center px-4 md:px-8 mb-10">
//         <h2 className="text-center text-4xl md:text-5xl font-bold">
//           Latest <span className="text-yellow-400">Products</span>
//         </h2>
//         <Link to="/shop">
//           <button className="cursor-pointer text-sm md:text-base border-1 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-200 hover:text-black transition">
//             See All →
//           </button>
//         </Link>
//       </div>

//       <div className="relative px-4 md:px-8 pb-14 w-full overflow-hidden">
//         {/* FADE MASKS (Rare.com effect) */}
//         {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050507] to-transparent z-30" /> */}
//         {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050507] to-transparent z-30" /> */}

//         {/* LUXURY CSS OVERRIDES */}
//         <style>{`
//           /* NAVIGATION BUTTONS */
//           .latest-swiper {
//           position: relative !important;
//           overflow: visible !important;
//           padding-bottom: 40px !important;
//           }
//           .latest-swiper .swiper-button-prev,
//           .latest-swiper .swiper-button-next {
//             width: 34px;
//             height: 34px;
//             border-radius: 50%;
//             background: rgba(255,255,255,0.92);
//             color: #000;
//             box-shadow: 0 6px 18px rgba(0,0,0,0.35);
//             top: 40%;
//           }
//           .latest-swiper .swiper-button-prev:after,
//           .latest-swiper .swiper-button-next:after {
//             font-size: 14px;
//             font-weight: 900;
//           }

//           /* PAGINATION - PREMIUM & SEPARATED */
//           .latest-swiper .swiper-pagination {
//             bottom: -35px !important;
//             position: absolute !important;
//             width: 100% !important;
//             text-align: center !important;
//             z-index: 999;
//           }

//           .latest-swiper .swiper-pagination-bullet {
//             width: 10px;
//             height: 10px;
//             background: rgba(255,255,255,0.55);
//             opacity: 0.55;
//             margin: 0 7px !important;
//             transition: 0.25s;
//           }
//           .latest-swiper .swiper-pagination-bullet-active {
//             background: #facc15 !important;
//             opacity: 1 !important;
//             transform: scale(1.25);
//           }

//           /* SLIDE DEPTH + SCALE */
//           .latest-swiper .swiper-slide {
//             transition: transform 0.45s ease, opacity 0.4s ease;
//             opacity: 0.55;
//             display: flex;
//             justify-content: center;
//           }

//           .latest-swiper .swiper-slide-active {
//             transform: scale(1.04);
//             opacity: 1;
//           }

//           .latest-swiper .swiper-slide-prev,
//           .latest-swiper .swiper-slide-next {
//             transform: scale(0.96);
//             opacity: 0.75;
//           }

//           /* Prevent clipping */
//           .latest-swiper .swiper-wrapper {
//             overflow: visible;
//           }
//         `}</style>

//         {/* SWIPER */}
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           loop={true}
//           spaceBetween={16}
//           breakpoints={{
//             0: { slidesPerView: 1.2 },
//             480: { slidesPerView: 1.6 },
//             640: { slidesPerView: 2.2 },
//             768: { slidesPerView: 3.2 },
//             1024: { slidesPerView: 4.2 },
//             1280: { slidesPerView: 4.8 },
//             1600: { slidesPerView: 5.6 },
//           }}
//           className="latest-swiper pb-6"
//         >
//           {latestProducts.map((product) => (
//             <SwiperSlide key={product._id}>
//               <LatestProductCard product={product} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { useGetLatestProductsQuery } from "../features/products/productApi";
import LatestProductCard from "./LatestProductCard";

export default function LatestProducts() {
  const { data, isLoading, isError } = useGetLatestProductsQuery();
  const latestProducts = Array.isArray(data) ? data : [];

  /* ------------------ SKELETON ------------------ */
  if (isLoading)
    return (
      <section className="py-16 bg-[#050507] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="h-3 w-20 bg-white/5 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-56 bg-white/5 rounded mx-auto animate-pulse" />
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

  if (isError || latestProducts.length === 0) return null;

  return (
    <section className="py-2 bg-[#050507] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        {/* Header */}
<div className="flex justify-between items-end mb-14">
  <div>
    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
      New Arrivals
    </p>
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
      Latest Products
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
  .latest-swiper {
    position: relative !important;
    overflow: visible !important;
  }

  /* Nav arrows — inside the carousel, vertically centered on cards */
  .latest-swiper .swiper-button-prev,
  .latest-swiper .swiper-button-next {
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
  .latest-swiper .swiper-button-prev {
    left: 8px;
  }
  .latest-swiper .swiper-button-next {
    right: 8px;
  }
  .latest-swiper .swiper-button-prev:hover,
  .latest-swiper .swiper-button-next:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.3);
  }
  .latest-swiper .swiper-button-prev::after,
  .latest-swiper .swiper-button-next::after {
    font-size: 13px;
    font-weight: bold;
  }

  /* Pagination dots — tucked right below cards */
  .latest-swiper .swiper-pagination {
    position: relative !important;
    bottom: auto !important;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 4px;
  }
  .latest-swiper .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    margin: 0 3px !important;
    background: rgba(255,255,255,0.2);
    opacity: 1;
    border-radius: 9999px;
    transition: all 200ms ease;
  }
  .latest-swiper .swiper-pagination-bullet-active {
    background: #fff !important;
    width: 20px;
    border-radius: 9999px;
  }
`}</style>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, Keyboard]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          keyboard={{ enabled: true }}
          loop={true}
          grabCursor={true}
          spaceBetween={16}
          slidesPerView={1.3}
          breakpoints={{
            0: { slidesPerView: 1.3, spaceBetween: 12 },
            480: { slidesPerView: 1.8, spaceBetween: 14 },
            640: { slidesPerView: 2.5, spaceBetween: 16 },
            768: { slidesPerView: 3.2, spaceBetween: 16 },
            1024: { slidesPerView: 4.2, spaceBetween: 16 },
            1280: { slidesPerView: 4.8, spaceBetween: 18 },
          }}
          className="latest-swiper pb-10"
        >
          {latestProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <LatestProductCard product={product} />
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
