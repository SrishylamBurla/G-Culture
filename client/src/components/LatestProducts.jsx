import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  A11y,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { useGetLatestProductsQuery } from "../features/products/productApi";

import LatestProductCard from "./LatestProductCard";

export default function LatestProducts() {
  const { data, isLoading, isError } = useGetLatestProductsQuery();

  const latestProducts = Array.isArray(data) ? data : [];

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (isLoading) {
    return (
      <section className="latest-section">
        {/* HEADER */}

        <div className="latest-container">
          <div className="latest-section-header">
            <div>
              <div className="latest-loading-eyebrow" />

              <div className="latest-loading-title" />

              <div className="latest-loading-subtitle" />
            </div>

            <div className="latest-loading-button" />
          </div>
        </div>

        {/* SKELETON */}

        <div className="latest-carousel-container">
          <div className="latest-skeleton-wrapper">
            <div className="latest-skeleton-track">
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <div key={index} className="latest-skeleton-card">
                  <div className="latest-skeleton-image" />

                  <div className="latest-skeleton-info">
                    <div className="latest-skeleton-name" />

                    <div className="latest-skeleton-rating" />

                    <div className="latest-skeleton-price" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * =========================================================
   * ERROR / EMPTY
   * =========================================================
   */

  if (isError || latestProducts.length === 0) {
    return null;
  }

  /*
   * =========================================================
   * LOOP
   * =========================================================
   */

  const enableLoop = latestProducts.length >= 7;

  return (
    <section className="latest-section">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="latest-container">
        <div className="latest-section-header">
          {/* LEFT */}

          <div className="latest-heading">
            <div className="latest-eyebrow-wrapper">
              {/* <span className="latest-eyebrow-line" /> */}

              <span className="latest-eyebrow">New Arrivals</span>
            </div>

            <h2 className="latest-title">Latest Products</h2>

            <p className="latest-subtitle">
              Fresh pieces just added to the collection.
            </p>
          </div>

          {/* RIGHT */}

          <Link to="/shop" className="latest-see-all group">
            <span>See All</span>

            <ArrowRight
              size={16}
              strokeWidth={1.7}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>

      {/* =====================================================
          CAROUSEL
      ====================================================== */}

      <div className="latest-carousel-container">
        <div className="latest-carousel-shell">
          {/* PREMIUM EDGE RAIL */}

          <div className="latest-edge latest-edge-left" aria-hidden="true" />

          <div className="latest-edge latest-edge-right" aria-hidden="true" />

          <Swiper
            modules={[Navigation, Pagination, Autoplay, Keyboard, A11y]}
            className="latest-products-swiper"
            wrapperClass="latest-products-wrapper"
            /* =================================================
               DESKTOP
            ================================================== */

            slidesPerView={5}
            spaceBetween={20}
            /* =================================================
               NAVIGATION
            ================================================== */

            navigation={{
              prevEl: ".latest-prev",
              nextEl: ".latest-next",
            }}
            /* =================================================
               PAGINATION
            ================================================== */

            pagination={{
              clickable: true,
              dynamicBullets: false,
            }}
            /* =================================================
               AUTOPLAY
            ================================================== */

            autoplay={{
              delay: 4200,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            /* =================================================
               KEYBOARD
            ================================================== */

            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            /* =================================================
               BEHAVIOR
            ================================================== */

            loop={enableLoop}
            grabCursor
            watchOverflow
            speed={650}
            resistance
            resistanceRatio={0.72}
            threshold={8}
            touchRatio={1}
            touchAngle={30}
            allowTouchMove
            /* =================================================
               RESPONSIVE
            ================================================== */

            breakpoints={{
              /* PHONE */

              0: {
                slidesPerView: 2.05,
                spaceBetween: 10,
              },

              /* LARGE PHONE */

              390: {
                slidesPerView: 2.15,
                spaceBetween: 11,
              },

              /* SMALL TABLET */

              480: {
                slidesPerView: 2.45,
                spaceBetween: 12,
              },

              /* TABLET */

              640: {
                slidesPerView: 3.15,
                spaceBetween: 14,
              },

              768: {
                slidesPerView: 4,
                spaceBetween: 16,
              },

              /* DESKTOP */

              1024: {
                slidesPerView: 5,
                spaceBetween: 17,
              },

              /* LARGE DESKTOP */

              1280: {
                slidesPerView: 5.4,
                spaceBetween: 18,
              },

              1440: {
                slidesPerView: 5.7,
                spaceBetween: 18,
              },

              1600: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
          >
            {latestProducts.map((product) => (
              <SwiperSlide key={product._id} className="latest-product-slide">
                <div className="latest-card-wrapper">
                  <LatestProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* =================================================
              PREVIOUS
          ================================================== */}

          <button
            type="button"
            aria-label="Previous latest products"
            className="
              latest-nav
              latest-prev
            "
          >
            <ChevronLeft size={19} strokeWidth={1.7} />
          </button>

          {/* =================================================
              NEXT
          ================================================== */}

          <button
            type="button"
            aria-label="Next latest products"
            className="
              latest-nav
              latest-next
            "
          >
            <ChevronRight size={19} strokeWidth={1.7} />
          </button>
        </div>
      </div>

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style>{`

        /* =====================================================
           SECTION
        ====================================================== */

        .latest-section {

          position: relative;

          width: 100%;

          overflow: hidden;

          background: #050507;

          color: #fff;

          padding-top: 84px;

          padding-bottom: 76px;
        }


        /* =====================================================
           MAIN CONTAINER
        ====================================================== */

         .latest-container {
  position: relative;
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
}

.latest-container::before {
  content: "";
  position: absolute;
  left: 16px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: rgba(225, 225, 225, 0.45);
  paddingRight: 5px
}

/* Tablet */
@media (max-width: 1023px) {
  .latest-container::before {
    left: 12px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .latest-container {
    padding-left: 16px;
    padding-right: 16px;
  }

  .latest-container::before {
    left: 6px;
  }
}

/* Small phones */
@media (max-width: 389px) {
  .latest-container {
    padding-left: 12px;
    padding-right: 12px;
  }

  .latest-container::before {
    left: 4px;
  }
}


        /* =====================================================
           HEADER
        ====================================================== */

        .latest-section-header {

          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 32px;

          margin-bottom: 44px;
        }


        /* =====================================================
           HEADING
        ====================================================== */

        .latest-heading {

          min-width: 0;
          
        }


        /* =====================================================
           EYEBROW
        ====================================================== */

        .latest-eyebrow-wrapper {

          display: flex;

          align-items: center;

          gap: 13px;

          margin-bottom: 14px;
        }


        .latest-eyebrow-line {

          display: block;

          width: 28px;

          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.28
            );
        }


        .latest-eyebrow {

          color:
            rgba(
              255,
              255,
              255,
              0.42
            );

          font-size: 11px;

          font-weight: 500;

          letter-spacing: 0.34em;

          text-transform: uppercase;
        }


        /* =====================================================
           TITLE
        ====================================================== */

        .latest-title {

          margin: 0;

          color: #fff;

          font-size:
            clamp(
              32px,
              3vw,
              46px
            );

          font-weight: 400;

          line-height: 1.04;

          letter-spacing: -0.045em;
        }


        /* =====================================================
           SUBTITLE
        ====================================================== */

        .latest-subtitle {

          margin: 13px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.36
            );

          font-size: 14px;

          line-height: 1.5;

          letter-spacing: 0.01em;
        }


        /* =====================================================
           SEE ALL
        ====================================================== */

        .latest-see-all {

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          flex-shrink: 0;

          min-width: 126px;

          height: 46px;

          padding: 0 18px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.12
            );

          border-radius: 999px;

          color:
            rgba(
              255,
              255,
              255,
              0.62
            );

          background:
            rgba(
              255,
              255,
              255,
              0.02
            );

          font-size: 10px;

          font-weight: 500;

          letter-spacing: 0.18em;

          text-transform: uppercase;

          text-decoration: none;

          backdrop-filter:
            blur(12px);

          -webkit-backdrop-filter:
            blur(12px);

          transition:
            color 300ms ease,
            background 300ms ease,
            border-color 300ms ease,
            transform 300ms ease;
        }


        .latest-see-all:hover {

          color: #050507;

          background: #fff;

          border-color: #fff;

          transform:
            translateY(-2px);
        }


        /* =====================================================
           CAROUSEL CONTAINER
        ====================================================== */

        .latest-carousel-container {

          width: 100%;

          max-width: 1380px;

          margin: 0 auto;

          padding-left: 40px;

          padding-right: 40px;

          box-sizing: border-box;
        }


        /* =====================================================
           CAROUSEL SHELL
        ====================================================== */

        .latest-carousel-shell {

          position: relative;

          width: 100%;

          overflow: visible;
        }


        /* =====================================================
           PREMIUM EDGE RAILS
           
           Instead of the old black blur:
           - thin architectural lines
           - subtle white ambient glow
           - no visual darkening over products
        ====================================================== */

        .latest-edge {

          position: absolute;

          top: 0;

          bottom: 58px;

          width: 1px;

          z-index: 25;

          pointer-events: none;

          opacity: 0.7;
        }


        .latest-edge-left {

          left: 0;

          background:
            linear-gradient(
              180deg,
              transparent 0%,
              rgba(
                255,
                255,
                255,
                0.16
              ) 18%,
              rgba(
                255,
                255,
                255,
                0.08
              ) 50%,
              rgba(
                255,
                255,
                255,
                0.16
              ) 82%,
              transparent 100%
            );

          box-shadow:
            0 0 18px
            rgba(
              255,
              255,
              255,
              0.04
            );
        }


        .latest-edge-right {

          right: 0;

          background:
            linear-gradient(
              180deg,
              transparent 0%,
              rgba(
                255,
                255,
                255,
                0.16
              ) 18%,
              rgba(
                255,
                255,
                255,
                0.08
              ) 50%,
              rgba(
                255,
                255,
                255,
                0.16
              ) 82%,
              transparent 100%
            );

          box-shadow:
            0 0 18px
            rgba(
              255,
              255,
              255,
              0.04
            );
        }


        /* =====================================================
           SMALL CORNER ACCENTS
        ====================================================== */

        .latest-edge-left::before,
        .latest-edge-right::before {

          content: "";

          position: absolute;

          top: 24px;

          width: 7px;

          height: 7px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.3
            );

          opacity: 0.8;
        }


        .latest-edge-left::before {

          left: 0;

          border-left:
            1px solid
            rgba(
              255,
              255,
              255,
              0.3
            );
        }


        .latest-edge-right::before {

          right: 0;

          border-right:
            1px solid
            rgba(
              255,
              255,
              255,
              0.3
            );
        }


        /* =====================================================
           SWIPER
        ====================================================== */

        .latest-products-swiper {

          position: relative;

          width: 100%;

          padding:
            0
            46px
            66px
            46px;

          overflow: hidden;
        }


        .latest-products-wrapper {

          align-items: stretch;
        }


        /* =====================================================
           SLIDE
        ====================================================== */

        .latest-products-swiper
        .swiper-slide {

          height: auto;

          min-width: 0;

          box-sizing: border-box;
        }


        /* =====================================================
           CARD
        ====================================================== */

        .latest-card-wrapper {

          width: 100%;

          height: 100%;

          min-width: 0;

          transition:
            transform
            400ms
            cubic-bezier(
              .2,
              .8,
              .2,
              1
            );
        }


        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .latest-card-wrapper:hover {

            transform:
              translateY(-5px);
          }

        }


        /* =====================================================
           NAVIGATION
        ====================================================== */

        .latest-nav {

          position: absolute;

          top: 40%;

          z-index: 60;

          display: flex;

          align-items: center;

          justify-content: center;

          width: 42px;

          height: 42px;

          padding: 0;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.14
            );

          border-radius: 50%;

          color: #fff;

          background:
            rgba(
              8,
              8,
              10,
              0.88
            );

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);

          box-shadow:
            0 8px 30px
            rgba(
              0,
              0,
              0,
              0.38
            );

          cursor: pointer;

          transform:
            translateY(-50%);

          transition:
            color 250ms ease,
            background 250ms ease,
            border-color 250ms ease,
            transform 250ms ease;
        }


        .latest-prev {

          left: 7px;
        }


        .latest-next {

          right: 7px;
        }


        .latest-nav:hover {

          color: #050507;

          background: #fff;

          border-color: #fff;

          transform:
            translateY(-50%)
            scale(1.05);
        }


        .latest-nav:active {

          transform:
            translateY(-50%)
            scale(0.94);
        }


        /* =====================================================
           PAGINATION
        ====================================================== */

        .latest-products-swiper
        .swiper-pagination {

          position: absolute;

          left: 50% !important;

          right: auto !important;

          bottom: 17px !important;

          width: auto !important;

          height: 6px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          padding: 0;

          margin: 0;

          transform:
            translateX(-50%) !important;

          z-index: 40;
        }


        .latest-products-swiper
        .swiper-pagination-bullet {

          display: block;

          flex-shrink: 0;

          width: 5px;

          height: 5px;

          margin: 0 !important;

          padding: 0;

          border: 0;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.22
            );

          opacity: 1;

          cursor: pointer;

          transition:
            width 350ms
            cubic-bezier(
              .2,
              .8,
              .2,
              1
            ),
            background 300ms ease;
        }


        .latest-products-swiper
        .swiper-pagination-bullet-active {

          width: 30px;

          height: 5px;

          background: #fff;

          opacity: 1;
        }


        /* =====================================================
           LOADING
        ====================================================== */

        .latest-loading-eyebrow {

          width: 90px;

          height: 10px;

          margin-bottom: 14px;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );

          animation:
            latestPulse
            1.6s
            ease-in-out
            infinite;
        }


        .latest-loading-title {

          width: 280px;

          height: 42px;

          border-radius: 10px;

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );

          animation:
            latestPulse
            1.6s
            ease-in-out
            infinite;
        }


        .latest-loading-subtitle {

          width: 270px;

          height: 12px;

          margin-top: 14px;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );

          animation:
            latestPulse
            1.6s
            ease-in-out
            infinite;
        }


        .latest-loading-button {

          width: 126px;

          height: 46px;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );

          animation:
            latestPulse
            1.6s
            ease-in-out
            infinite;
        }


        /* =====================================================
           SKELETON
        ====================================================== */

        .latest-skeleton-wrapper {

          width: 100%;

          padding:
            0 46px;

          overflow: hidden;

          box-sizing: border-box;
        }


        .latest-skeleton-track {

          display: grid;

          grid-template-columns:
            repeat(
              6,
              minmax(
                0,
                1fr
              )
            );

          gap: 20px;
        }


        .latest-skeleton-card {

          overflow: hidden;

          min-width: 0;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.05
            );

          border-radius: 12px;

          background:
            rgba(
              255,
              255,
              255,
              0.018
            );
        }


        .latest-skeleton-image {

          width: 100%;

          aspect-ratio: 0.78;

          background:
            rgba(
              255,
              255,
              255,
              0.035
            );

          animation:
            latestPulse
            1.6s
            ease-in-out
            infinite;
        }


        .latest-skeleton-info {

          padding: 14px;
        }


        .latest-skeleton-name {

          width: 75%;

          height: 12px;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );

          animation:
            latestPulse
            1.6s
            ease-in-out
            infinite;
        }


        .latest-skeleton-rating {

          width: 45%;

          height: 8px;

          margin-top: 12px;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.04
            );

          animation:
            latestPulse
            1.6s
            ease-in-out
            infinite;
        }


        .latest-skeleton-price {

          width: 32%;

          height: 14px;

          margin-top: 14px;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );

          animation:
            latestPulse
            1.6s
            ease-in-out
            infinite;
        }


        @keyframes latestPulse {

          0%,
          100% {
            opacity: 0.45;
          }

          50% {
            opacity: 0.8;
          }

        }


        /* =====================================================
           TABLET
        ====================================================== */

        @media (
          max-width: 1023px
        ) {

          .latest-section {

            padding-top: 64px;

            padding-bottom: 60px;
          }


          .latest-container {

            padding-left: 24px;

            padding-right: 24px;
          }


          .latest-carousel-container {

            padding-left: 24px;

            padding-right: 24px;
          }


          .latest-section-header {

            margin-bottom: 32px;
          }


          .latest-title {

            font-size: 34px;
          }


          .latest-products-swiper {

            padding-left: 38px;

            padding-right: 38px;
          }


          .latest-nav {

            width: 40px;

            height: 40px;
          }


          .latest-prev {

            left: 5px;
          }


          .latest-next {

            right: 5px;
          }


          .latest-skeleton-wrapper {

            padding-left: 38px;

            padding-right: 38px;
          }


          .latest-skeleton-track {

            grid-template-columns:
              repeat(
                4,
                minmax(
                  0,
                  1fr
                )
              );
          }

        }


        /* =====================================================
           MOBILE
        ====================================================== */

        @media (
          max-width: 767px
        ) {

          .latest-section {

            padding-top: 52px;

            padding-bottom: 48px;
          }


          .latest-container {

            padding-left: 16px;

            padding-right: 16px;
          }


          .latest-carousel-container {

            padding-left: 16px;

            padding-right: 16px;
          }


          .latest-section-header {

            align-items: flex-end;

            gap: 18px;

            margin-bottom: 26px;
          }


          .latest-eyebrow-wrapper {

            gap: 9px;

            margin-bottom: 11px;
          }


          .latest-eyebrow-line {

            width: 18px;
          }


          .latest-eyebrow {

            font-size: 9px;

            letter-spacing: 0.30em;
          }


          .latest-title {

            font-size: 30px;

            letter-spacing: -0.04em;
          }


          .latest-subtitle {

            display: none;
          }


          .latest-see-all {

            min-width: auto;

            height: 38px;

            padding:
              0 13px;

            font-size: 9px;

            letter-spacing: 0.14em;
          }


          .latest-see-all svg {

            width: 13px;

            height: 13px;
          }


          /* Carousel */

          .latest-products-swiper {

            padding:
              0
              0
              54px
              0;

            overflow:
              hidden !important;
          }


          /* Hide arrows */

          .latest-nav {

            display: none;
          }


          /* Remove edge rails */

          .latest-edge {

            display: none;
          }


          /* Pagination */

          .latest-products-swiper
          .swiper-pagination {

            bottom:
              10px !important;
          }


          /* Skeleton */

          .latest-skeleton-wrapper {

            padding: 0;
          }


          .latest-skeleton-track {

            grid-template-columns:
              repeat(
                2,
                minmax(
                  0,
                  1fr
                )
              );

            gap: 10px;
          }

        }


        /* =====================================================
           SMALL PHONES
        ====================================================== */

        @media (
          max-width: 389px
        ) {

          .latest-container {

            padding-left: 12px;

            padding-right: 12px;
          }


          .latest-carousel-container {

            padding-left: 12px;

            padding-right: 12px;
          }


          .latest-title {

            font-size: 27px;
          }


          .latest-see-all span {

            display: none;
          }


          .latest-see-all {

            width: 38px;

            padding: 0;
          }

        }


        /* =====================================================
           REDUCED MOTION
        ====================================================== */

        @media (
          prefers-reduced-motion: reduce
        ) {

          .latest-card-wrapper,
          .latest-see-all,
          .latest-nav,
          .latest-products-swiper
          .swiper-pagination-bullet {

            transition:
              none !important;
          }


          .latest-loading-eyebrow,
          .latest-loading-title,
          .latest-loading-subtitle,
          .latest-loading-button,
          .latest-skeleton-image,
          .latest-skeleton-name,
          .latest-skeleton-rating,
          .latest-skeleton-price {

            animation:
              none !important;
          }

        }

      `}</style>
    </section>
  );
}
