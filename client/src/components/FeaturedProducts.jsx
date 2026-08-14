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

import { useGetFeaturedProductsQuery } from "../features/products/productApi";
import FeaturedProductCard from "./FeaturedProductCard";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedProducts() {
  const { data, isLoading, isError } = useGetFeaturedProductsQuery();

  const featuredProducts = Array.isArray(data) ? data : [];

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (isLoading) {
    return (
      <section className="featured-section">
        <div className="featured-container">
          {/* Header skeleton */}

          <div className="featured-section-header">
            <div>
              <div className="featured-loading-eyebrow" />

              <div className="featured-loading-title" />

              <div className="featured-loading-subtitle" />
            </div>

            <div className="featured-loading-button" />
          </div>
        </div>

        {/* Skeleton carousel */}

        <div className="featured-skeleton-wrapper">
          <div className="featured-skeleton-track">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="featured-skeleton-card">
                <div className="featured-skeleton-image" />

                <div className="featured-skeleton-info">
                  <div className="featured-skeleton-name" />

                  <div className="featured-skeleton-rating" />

                  <div className="featured-skeleton-price" />
                </div>
              </div>
            ))}
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

  if (isError || featuredProducts.length === 0) {
    return null;
  }

  /*
   * =========================================================
   * LOOP
   * =========================================================
   *
   * We only loop when enough products exist.
   */

  const enableLoop = featuredProducts.length >= 7;

  return (
    <section className="featured-section">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="featured-container">
        <div className="featured-section-header">
          {/* LEFT */}

          <div className="featured-heading">
            <div className="featured-eyebrow-wrapper">
              <span className="featured-eyebrow-line" />

              <span className="featured-eyebrow">Curated</span>
            </div>

            <h2 className="featured-title">Featured Products</h2>

            <p className="featured-subtitle">
              Selected pieces worth adding to your rotation.
            </p>
          </div>

          {/* RIGHT */}

          <Link to="/shop" className="featured-see-all group">
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

      <div
        className="featured-carousel-shell"
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Keyboard, A11y]}
          className="featured-products-swiper"
          wrapperClass="featured-products-wrapper"
          /*
           * =================================================
           * DESKTOP DEFAULT
           * =================================================
           */

          slidesPerView={6}
          spaceBetween={20}
          /*
           * =================================================
           * NAVIGATION
           * =================================================
           */

          navigation={{
            prevEl: ".featured-prev",
            nextEl: ".featured-next",
          }}
          /*
           * =================================================
           * PAGINATION
           * =================================================
           *
           * IMPORTANT:
           * Let Swiper create its own pagination.
           * This keeps it perfectly aligned with the
           * Swiper container.
           */

          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          /*
           * =================================================
           * AUTOPLAY
           * =================================================
           */

          autoplay={{
            delay: 4200,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          /*
           * =================================================
           * KEYBOARD
           * =================================================
           */

          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          /*
           * =================================================
           * GENERAL
           * =================================================
           */

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
          /*
           * =================================================
           * RESPONSIVE
           * =================================================
           */

          breakpoints={{
            /*
             * MOBILE
             */

            0: {
              slidesPerView: 2.05,
              spaceBetween: 10,
            },

            390: {
              slidesPerView: 2.15,
              spaceBetween: 11,
            },

            480: {
              slidesPerView: 2.45,
              spaceBetween: 12,
            },

            /*
             * SMALL TABLET
             */

            640: {
              slidesPerView: 3.15,
              spaceBetween: 14,
            },

            /*
             * TABLET
             */

            768: {
              slidesPerView: 4,
              spaceBetween: 16,
            },

            /*
             * DESKTOP
             */

            1024: {
              slidesPerView: 5,
              spaceBetween: 17,
            },

            /*
             * LARGE DESKTOP
             */

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
          {featuredProducts.map((product) => (
            <SwiperSlide key={product._id} className="featured-product-slide">
              <div className="featured-card-wrapper">
                <FeaturedProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ===================================================
            PREVIOUS
        ==================================================== */}

        <button
          type="button"
          aria-label="Previous featured products"
          className="
            featured-nav
            featured-prev
          "
        >
          <ChevronLeft size={19} strokeWidth={1.7} />
        </button>

        {/* ===================================================
            NEXT
        ==================================================== */}

        <button
          type="button"
          aria-label="Next featured products"
          className="
            featured-nav
            featured-next
          "
        >
          <ChevronRight size={19} strokeWidth={1.7} />
        </button>
      </div>

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style>{`

        /* =====================================================
           SECTION
        ====================================================== */

        .featured-section {
          position: relative;

          width: 100%;

          overflow: hidden;

          background: #050507;

          color: #fff;

          padding-top: 80px;
          padding-bottom: 72px;
        }


        /* =====================================================
           HEADER CONTAINER
        ====================================================== */

        .featured-container {
          width: 100%;

          max-width: 1280px;

          margin: 0 auto;

          padding-left: 24px;
          padding-right: 24px;
        }


        /* =====================================================
           HEADER
        ====================================================== */

        .featured-section-header {
          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 32px;

          margin-bottom: 42px;
        }


        /* =====================================================
           HEADING
        ====================================================== */

        .featured-heading {
          min-width: 0;
        }


        /* =====================================================
           EYEBROW
        ====================================================== */

        .featured-eyebrow-wrapper {
          display: flex;

          align-items: center;

          gap: 13px;

          margin-bottom: 14px;
        }

        .featured-eyebrow-line {
          display: block;

          width: 28px;

          height: 1px;

          background: rgba(255,255,255,0.28);
        }

        .featured-eyebrow {
          color: rgba(255,255,255,0.42);

          font-size: 11px;

          font-weight: 500;

          letter-spacing: 0.34em;

          text-transform: uppercase;
        }


        /* =====================================================
           TITLE
        ====================================================== */

        .featured-title {
          margin: 0;

          color: #fff;

          font-size: clamp(
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

        .featured-subtitle {
          margin: 13px 0 0;

          color: rgba(255,255,255,0.36);

          font-size: 13px;

          line-height: 1.5;

          letter-spacing: 0.01em;
        }


        /* =====================================================
           SEE ALL
        ====================================================== */

        .featured-see-all {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          flex-shrink: 0;

          min-width: 126px;

          height: 46px;

          padding: 0 18px;

          border: 1px solid rgba(
            255,
            255,
            255,
            0.12
          );

          border-radius: 999px;

          color: rgba(
            255,
            255,
            255,
            0.62
          );

          background: rgba(
            255,
            255,
            255,
            0.015
          );

          font-size: 10px;

          font-weight: 500;

          letter-spacing: 0.18em;

          text-transform: uppercase;

          text-decoration: none;

          transition:
            color 300ms ease,
            background 300ms ease,
            border-color 300ms ease,
            transform 300ms ease;
        }

        .featured-see-all:hover {
          color: #050507;

          background: #fff;

          border-color: #fff;

          transform: translateY(-2px);
        }


        /* =====================================================
           CAROUSEL SHELL
        ====================================================== */

        .featured-carousel-shell {
          position: relative;

          width: 100%;

          overflow: visible;
        }


        /* =====================================================
           SWIPER
        ====================================================== */

        .featured-products-swiper {
          position: relative;

          width: 100%;

          padding:
            0
            40px
            66px
            40px;

          overflow: hidden;
        }


        /* =====================================================
           WRAPPER
        ====================================================== */

        .featured-products-wrapper {
          align-items: stretch;
        }


        /* =====================================================
           SLIDE
        ====================================================== */

        /*
         * IMPORTANT:
         *
         * DO NOT set width here.
         *
         * Swiper calculates the width from
         * slidesPerView.
         */

        .featured-products-swiper
        .swiper-slide {
          height: auto;

          min-width: 0;

          box-sizing: border-box;
        }


        /* =====================================================
           CARD WRAPPER
        ====================================================== */

        .featured-card-wrapper {
          width: 100%;

          height: 100%;

          min-width: 0;

          transition:
            transform 400ms
            cubic-bezier(.2,.8,.2,1);
        }


        @media (
          hover: hover
        ) and (
          pointer: fine
        ) {

          .featured-card-wrapper:hover {
            transform:
              translateY(-5px);
          }

        }


        /* =====================================================
           NAVIGATION
        ====================================================== */

        .featured-nav {
          position: absolute;

          top: 40%;

          z-index: 60;

          display: flex;

          align-items: center;

          justify-content: center;

          width: 44px;

          height: 44px;

          padding: 0;

          border: 1px solid rgba(
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
              0.84
            );

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);

          box-shadow:
            0 8px 30px
            rgba(0,0,0,0.38);

          cursor: pointer;

          transform:
            translateY(-50%);

          transition:
            color 250ms ease,
            background 250ms ease,
            border-color 250ms ease,
            transform 250ms ease,
            opacity 250ms ease;
        }


        .featured-prev {
          left: 16px;
        }


        .featured-next {
          right: 16px;
        }


        .featured-nav:hover {
          color: #050507;

          background: #fff;

          border-color: #fff;

          transform:
            translateY(-50%)
            scale(1.04);
        }


        .featured-nav:active {
          transform:
            translateY(-50%)
            scale(0.94);
        }


        /* =====================================================
           SWIPER PAGINATION
        ====================================================== */

        /*
         * IMPORTANT:
         *
         * We are using Swiper's own pagination element.
         * This makes centering reliable.
         */

        .featured-products-swiper
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


        /* =====================================================
           PAGINATION DOT
        ====================================================== */

        .featured-products-swiper
        .swiper-pagination-bullet {

          display: block;

          flex-shrink: 0;

          width: 5px;

          height: 5px;

          padding: 0;

          margin: 0 !important;

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
            cubic-bezier(.2,.8,.2,1),

            background 300ms ease,

            opacity 300ms ease;
        }


        /* =====================================================
           ACTIVE PAGINATION
        ====================================================== */

        .featured-products-swiper
        .swiper-pagination-bullet-active {

          width: 30px;

          height: 5px;

          background: #fff;

          opacity: 1;
        }


        /* =====================================================
           EDGE FADE
        ====================================================== */

        .featured-carousel-shell::before,
        .featured-carousel-shell::after {

          content: "";

          position: absolute;

          top: 0;

          bottom: 60px;

          z-index: 20;

          width: 52px;

          pointer-events: none;
        }


        .featured-carousel-shell::before {

          left: 0;

          background:
            linear-gradient(
              90deg,
              #050507 0%,
              rgba(5,5,7,0) 100%
            );
        }


        .featured-carousel-shell::after {

          right: 0;

          background:
            linear-gradient(
              270deg,
              #050507 0%,
              rgba(5,5,7,0) 100%
            );
        }


        /* =====================================================
           LOADING
        ====================================================== */

        .featured-loading-eyebrow {

          width: 82px;

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
            featuredPulse
            1.6s ease-in-out
            infinite;
        }


        .featured-loading-title {

          width: 290px;

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
            featuredPulse
            1.6s ease-in-out
            infinite;
        }


        .featured-loading-subtitle {

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
            featuredPulse
            1.6s ease-in-out
            infinite;
        }


        .featured-loading-button {

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
            featuredPulse
            1.6s ease-in-out
            infinite;
        }


        /* =====================================================
           SKELETON
        ====================================================== */

        .featured-skeleton-wrapper {

          width: 100%;

          padding:
            0 40px;

          overflow: hidden;
        }


        .featured-skeleton-track {

          display: grid;

          grid-template-columns:
            repeat(
              6,
              minmax(0,1fr)
            );

          gap: 20px;
        }


        .featured-skeleton-card {

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


        .featured-skeleton-image {

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
            featuredPulse
            1.6s ease-in-out
            infinite;
        }


        .featured-skeleton-info {

          padding: 14px;
        }


        .featured-skeleton-name {

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
            featuredPulse
            1.6s ease-in-out
            infinite;
        }


        .featured-skeleton-rating {

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
            featuredPulse
            1.6s ease-in-out
            infinite;
        }


        .featured-skeleton-price {

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
            featuredPulse
            1.6s ease-in-out
            infinite;
        }


        @keyframes featuredPulse {

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

          .featured-section {
            padding-top: 64px;

            padding-bottom: 60px;
          }


          .featured-container {
            padding-left: 24px;

            padding-right: 24px;
          }


          .featured-section-header {
            margin-bottom: 32px;
          }


          .featured-title {
            font-size: 34px;
          }


          .featured-products-swiper {

            padding-left: 24px;

            padding-right: 24px;
          }


          .featured-nav {

            width: 40px;

            height: 40px;
          }


          .featured-prev {

            left: 10px;
          }


          .featured-next {

            right: 10px;
          }


          .featured-skeleton-track {

            grid-template-columns:
              repeat(
                4,
                minmax(0,1fr)
              );
          }

        }


        /* =====================================================
           MOBILE
        ====================================================== */

        @media (
          max-width: 767px
        ) {

          .featured-section {

            padding-top: 52px;

            padding-bottom: 48px;
          }


          .featured-container {

            padding-left: 16px;

            padding-right: 16px;
          }


          .featured-section-header {

            align-items: flex-end;

            gap: 18px;

            margin-bottom: 26px;
          }


          .featured-eyebrow-wrapper {

            gap: 9px;

            margin-bottom: 11px;
          }


          .featured-eyebrow-line {

            width: 18px;
          }


          .featured-eyebrow {

            font-size: 9px;

            letter-spacing: 0.30em;
          }


          .featured-title {

            font-size: 30px;

            letter-spacing: -0.04em;
          }


          .featured-subtitle {

            display: none;
          }


          .featured-see-all {

            min-width: auto;

            height: 38px;

            padding:
              0 13px;

            font-size: 9px;

            letter-spacing: 0.14em;
          }


          .featured-see-all svg {

            width: 13px;

            height: 13px;
          }


          /* Carousel */

          .featured-products-swiper {

            padding:
              0
              16px
              54px
              16px;

            overflow: hidden !important;
          }


          /* Hide desktop arrows */

          .featured-nav {

            display: none;
          }


          /* Remove edge masks */

          .featured-carousel-shell::before,
          .featured-carousel-shell::after {

            display: none;
          }


          /* Mobile pagination */

          .featured-products-swiper
          .swiper-pagination {

            bottom: 10px !important;
          }


          /* Skeleton */

          .featured-skeleton-wrapper {

            padding:
              0 16px;
          }


          .featured-skeleton-track {

            grid-template-columns:
              repeat(
                2,
                minmax(0,1fr)
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

          .featured-title {

            font-size: 27px;
          }


          .featured-see-all span {

            display: none;
          }


          .featured-see-all {

            width: 38px;

            padding: 0;
          }


          .featured-products-swiper {

            padding-left: 12px;

            padding-right: 12px;
          }

        }


        /* =====================================================
           REDUCED MOTION
        ====================================================== */

        @media (
          prefers-reduced-motion: reduce
        ) {

          .featured-card-wrapper,
          .featured-see-all,
          .featured-nav,
          .featured-products-swiper
          .swiper-pagination-bullet {

            transition: none !important;
          }


          .featured-loading-eyebrow,
          .featured-loading-title,
          .featured-loading-subtitle,
          .featured-loading-button,
          .featured-skeleton-image,
          .featured-skeleton-name,
          .featured-skeleton-rating,
          .featured-skeleton-price {

            animation: none !important;
          }

        }

      `}</style>
    </section>
  );
}
