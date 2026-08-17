import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import FeaturedProducts from "../components/FeaturedProducts";
import LatestProducts from "../components/LatestProducts";

export default function HomePage() {
  const categories = [
    {
      name: "Street Wear",
      path: "/streetwear",
      description: "Bold cuts. Raw energy. Own the sidewalk.",
    },
    {
      name: "Casual Wear",
      path: "/casualwear",
      description: "Effortless style for every moment.",
    },
    {
      name: "Chest Bags",
      path: "/chestbags",
      description: "Carry with intent. Travel light, look sharp.",
    },
    {
      name: "Caps",
      path: "/caps",
      description: "Crown your look. Statement headwear.",
    },
  ];

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <main className="bg-[#050507] text-white">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        ref={heroRef}
        className="
          relative
          flex
          min-h-[100svh]
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-[#050507]
        "
      >
        {/* Background image */}

        <motion.div style={{ y: heroImageY }} className="absolute inset-[-8%]">
          <img
            src="/images/HomeImgs/Herosec1.png"
            alt="G-Culture collection"
            className="
              h-full
              w-full
              object-cover
              object-center
              opacity-80
            "
          />

          <div
            className="
            absolute
            inset-0
            bg-black/35
          "
          />

          <div
            className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/75
            via-black/25
            to-[#050507]
          "
          />

          <div
            className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,.55)_100%)]
          "
          />
        </motion.div>

        {/* Ambient light */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[600px]
            w-[600px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/[0.035]
            blur-[150px]
          "
        />

        {/* Hero content */}

        <motion.div
          style={{
            y: heroTextY,
            opacity: heroOpacity,
          }}
          className="
            relative
            z-10
            mx-auto
            max-w-4xl
            px-6
            text-center
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mb-7
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span className="h-px w-7 bg-white/30" />

            <span
              className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.38em]
              text-white/55
            "
            >
              Redefining Indian Streetwear
            </span>

            <span className="h-px w-7 bg-white/30" />
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.12,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              text-[clamp(4rem,12vw,6rem)]
              font-medium
              leading-[0.82]
              tracking-[-0.055em]
              text-white
            "
          >
            G-CULTURE
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.35,
              duration: 0.8,
            }}
            className="
              mx-auto
              mt-8
              max-w-xl
              text-sm
              leading-6
              text-white/55
              sm:text-base
            "
          >
            For men who carry <span className="text-white">confidence</span>{" "}
            like a second skin.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.8,
            }}
            className="
              mt-9
              flex
              flex-wrap
              justify-center
              gap-3
            "
          >
            <Link
              to="/shop"
              className="
                group
                inline-flex
                h-12
                items-center
                gap-3
                rounded-full
                bg-white
                px-6
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-black
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/90
              "
            >
              Explore Collection
              <ArrowRight
                size={15}
                strokeWidth={1.8}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            <Link
              to="/latest-drops"
              className="
                inline-flex
                h-12
                items-center
                gap-3
                rounded-full
                border
                border-white/20
                bg-white/[0.04]
                px-6
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white/80
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/50
                hover:text-white
              "
            >
              Latest Drops
              <ArrowUpRight size={15} strokeWidth={1.7} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom information */}

        <div
          className="
          absolute
          bottom-8
          left-0
          right-0
          z-10
          px-6
        "
        >
          <div
            className="
            mx-auto
            flex
            max-w-[1380px]
            items-end
            justify-between
          "
          >
            <span
              className="
              hidden
              text-[9px]
              uppercase
              tracking-[0.28em]
              text-white/30
              sm:block
            "
            >
              Hyderabad · India
            </span>

            <motion.div
              animate={{
                y: [0, 7, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="
                mx-auto
                flex
                flex-col
                items-center
                gap-2
                sm:mx-0
              "
            >
              <span
                className="
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-white/35
              "
              >
                Scroll
              </span>

              <ArrowDown
                size={13}
                strokeWidth={1.4}
                className="text-white/40"
              />
            </motion.div>

            <span
              className="
              hidden
              text-[9px]
              uppercase
              tracking-[0.28em]
              text-white/30
              sm:block
            "
            >
              2026 Collection
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
    SHOP BY CATEGORY
====================================================== */}

      <section
        className="
    relative
    overflow-hidden
    bg-[#050507]
    py-24
    text-white
    md:py-32
  "
      >
        {/* ===================================================
      AMBIENT BACKGROUND
  ==================================================== */}

        <div
          className="
      pointer-events-none
      absolute
      -right-40
      top-20
      h-[420px]
      w-[420px]
      rounded-full
      bg-white/[0.025]
      blur-[120px]
    "
        />

        <div
          className="
      pointer-events-none
      absolute
      -left-40
      bottom-0
      h-[380px]
      w-[380px]
      rounded-full
      bg-white/[0.02]
      blur-[110px]
    "
        />

        {/* Subtle center glow */}

        <div
          className="
      pointer-events-none
      absolute
      left-1/2
      top-1/2
      h-[500px]
      w-[500px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-white/[0.012]
      blur-[140px]
    "
        />

        {/* ===================================================
      MAIN CONTAINER
  ==================================================== */}

        <div
          className="
      relative
      z-10
      mx-auto
      max-w-[1380px]
      px-5
      sm:px-8
      lg:px-10
    "
        >
          {/* =================================================
        HEADER
    ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
        mb-12
        flex
        flex-col
        justify-between
        gap-8
        md:mb-14
        md:flex-row
        md:items-end
      "
          >
            {/* LEFT */}

            <div>
              {/* Eyebrow */}

              <div
                className="
            mb-4
            flex
            items-center
            gap-3
          "
              >
                <span
                  className="
              h-px
              w-7
              bg-white/30
            "
                />

                <span
                  className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.32em]
              text-white/45
            "
                >
                  Browse Collection
                </span>
              </div>

              {/* Heading */}

              <h2
                className="
            max-w-xl
            text-4xl
            font-normal
            leading-[0.92]
            tracking-[-0.055em]
            text-white
            sm:text-5xl
            md:text-6xl
          "
              >
                Shop by <span className="text-white/30">Category.</span>
              </h2>
            </div>

            {/* DESCRIPTION */}

            <p
              className="
          max-w-sm
          text-sm
          leading-6
          text-white/40
          md:pb-1
        "
            >
              Discover pieces designed across streetwear, everyday essentials
              and accessories.
            </p>
          </motion.div>

          {/* =================================================
        CATEGORY GRID
    ================================================== */}

          <div
            className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-4
      "
          >
            {categories.map((cat, index) => (
              <motion.div
                key={cat.path}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  to={cat.path}
                  className="
              group
              relative
              block
              aspect-[0.78]
              overflow-hidden
              rounded-[16px]
              bg-[#111113]
              border
              border-white/[0.07]
              transition-all
              duration-500
              hover:border-white/[0.18]
            "
                >
                  {/* =========================================
                IMAGE
            ========================================== */}

                  {cat.img && (
                    <div
                      className="
                  absolute
                  inset-0
                  bg-cover
                  bg-center
                  transition-transform
                  duration-[1000ms]
                  ease-[cubic-bezier(.2,.8,.2,1)]
                  group-hover:scale-[1.06]
                "
                      style={{
                        backgroundImage: `url(${cat.img})`,
                      }}
                    />
                  )}

                  {/* =========================================
                IMAGE OVERLAY
            ========================================== */}

                  <div
                    className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black
                via-black/35
                to-black/5
                transition-all
                duration-500
                group-hover:from-black
                group-hover:via-black/25
              "
                  />

                  {/* =========================================
                TOP BORDER DETAIL
            ========================================== */}

                  <div
                    className="
                absolute
                left-5
                right-5
                top-5
                h-px
                bg-white/20
                transition-all
                duration-500
                group-hover:bg-white/40
              "
                  />

                  {/* =========================================
                TOP META
            ========================================== */}

                  <div
                    className="
                absolute
                left-5
                right-5
                top-7
                flex
                items-center
                justify-between
              "
                  >
                    {/* Number */}

                    <span
                      className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-white/50
                  transition-colors
                  duration-300
                  group-hover:text-white/80
                "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Arrow */}

                    <span
                      className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/25
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-500
                  group-hover:border-white
                  group-hover:bg-white
                  group-hover:text-black
                "
                    >
                      <ArrowRight
                        size={15}
                        strokeWidth={1.6}
                        className="
                    -rotate-45
                    transition-transform
                    duration-500
                    group-hover:rotate-0
                  "
                      />
                    </span>
                  </div>

                  {/* =========================================
                CONTENT
            ========================================== */}

                  <div
                    className="
                absolute
                inset-x-0
                bottom-0
                z-10
                p-5
                sm:p-6
              "
                  >
                    {/* Label */}

                    <p
                      className="
                  mb-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-white/45
                  transition-colors
                  duration-300
                  group-hover:text-white/65
                "
                    >
                      G-Culture
                    </p>

                    {/* Category */}

                    <h3
                      className="
                  text-2xl
                  font-medium
                  leading-none
                  tracking-[-0.035em]
                  text-white
                  sm:text-[27px]
                "
                    >
                      {cat.name}
                    </h3>

                    {/* Description */}

                    <p
                      className="
                  mt-3
                  max-w-[240px]
                  text-xs
                  leading-5
                  text-white/50
                  transition-colors
                  duration-300
                  group-hover:text-white/65
                "
                    >
                      {cat.description}
                    </p>

                    {/* Explore */}

                    <div
                      className="
                  mt-5
                  flex
                  items-center
                  gap-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-white/55
                  transition-colors
                  duration-300
                  group-hover:text-white
                "
                    >
                      <span>Explore Collection</span>

                      <span
                        className="
                    h-px
                    w-7
                    bg-white/25
                    transition-all
                    duration-500
                    group-hover:w-12
                    group-hover:bg-white/70
                  "
                      />
                    </div>
                  </div>

                  {/* =========================================
                PREMIUM HOVER BORDER
            ========================================== */}

                  <div
                    className="
                pointer-events-none
                absolute
                inset-0
                rounded-[16px]
                border
                border-transparent
                transition-all
                duration-500
                group-hover:border-white/25
              "
                  />

                  {/* =========================================
                SUBTLE INNER GLOW
            ========================================== */}

                  <div
                    className="
                pointer-events-none
                absolute
                inset-0
                rounded-[16px]
                opacity-0
                shadow-[inset_0_0_60px_rgba(255,255,255,0.06)]
                transition-opacity
                duration-500
                group-hover:opacity-100
              "
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* =================================================
        BOTTOM BRAND LINE
    ================================================== */}

          <div
            className="
        mt-10
        flex
        items-center
        justify-between
        border-t
        border-white/[0.08]
        pt-5
      "
          >
            <span
              className="
          text-[9px]
          uppercase
          tracking-[0.28em]
          text-white/30
        "
            >
              G-Culture
            </span>

            <span
              className="
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-white/25
        "
            >
              Wear the culture.
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED PRODUCTS
      ====================================================== */}

      <section className="bg-[#050507]">
        <FeaturedProducts />
      </section>

      {/* =====================================================
          LATEST PRODUCTS
      ====================================================== */}

      <section className="bg-[#050507]">
        <LatestProducts />
      </section>

      {/* =====================================================
          WHY G-CULTURE
      ====================================================== */}

      <section
        className="
        relative
        overflow-hidden
        border-t
        border-white/[0.05]
        bg-[#050507]
        py-24
        md:py-32
      "
      >
        <div
          className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/[0.02]
          blur-[130px]
        "
        />

        <div
          className="
          relative
          z-10
          mx-auto
          max-w-[1380px]
          px-6
        "
        >
          {/* Header */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              mb-14
              flex
              flex-col
              justify-between
              gap-6
              md:flex-row
              md:items-end
            "
          >
            <div>
              <div
                className="
                mb-4
                flex
                items-center
                gap-3
              "
              >
                <span
                  className="
                  h-px
                  w-7
                  bg-white/25
                "
                />

                <p
                  className="
                  text-[10px]
                  uppercase
                  tracking-[0.32em]
                  text-white/35
                "
                >
                  The Difference
                </p>
              </div>

              <h2
                className="
                text-4xl
                font-normal
                tracking-[-0.05em]
                sm:text-5xl
              "
              >
                Why <span className="text-white/35">G-Culture.</span>
              </h2>
            </div>

            <p
              className="
              max-w-sm
              text-sm
              leading-6
              text-white/35
            "
            >
              Thoughtful design, limited releases and clothing made to move with
              you.
            </p>
          </motion.div>

          {/* Feature cards */}

          <div
            className="
            grid
            grid-cols-1
            gap-px
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.07]
            bg-white/[0.07]
            md:grid-cols-3
          "
          >
            <PromoCard
              number="01"
              title="Sustainable Fabrics"
              subtitle="Organic cotton & recycled blends — fashion that respects the planet."
            />

            <PromoCard
              number="02"
              title="Limited Drops"
              subtitle="Small batch releases — get them before they vanish."
            />

            <PromoCard
              number="03"
              title="Tailored Fit"
              subtitle="Refined fits crafted for comfort & movement."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section
        className="
        relative
        overflow-hidden
        bg-[#050507]
        pb-28
        pt-16
        md:pb-36
        md:pt-20
      "
      >
        <div
          className="
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
        "
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            relative
            z-10
            mx-auto
            max-w-4xl
            px-6
            text-center
          "
        >
          <p
            className="
            mb-5
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-white/30
          "
          >
            Your next rotation starts here
          </p>

          <h2
            className="
            text-4xl
            font-normal
            leading-[0.95]
            tracking-[-0.06em]
            sm:text-5xl
            md:text-7xl
          "
          >
            Elevate your
            <br />
            <span className="text-white/30">wardrobe.</span>
          </h2>

          <p
            className="
            mx-auto
            mt-6
            max-w-xl
            text-sm
            leading-6
            text-white/35
            md:text-base
          "
          >
            Discover pieces designed for men who move with purpose.
          </p>

          <Link
            to="/shop"
            className="
              group
              mt-9
              inline-flex
              h-13
              items-center
              gap-3
              rounded-full
              bg-white
              px-8
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-black
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-white/90
            "
          >
            Shop All
            <ArrowRight
              size={15}
              strokeWidth={1.8}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </motion.div>

        {/* Huge watermark */}

        <div
          className="
          pointer-events-none
          absolute
          bottom-[5px]
          left-1/2
          -translate-x-1/2
          whitespace-nowrap
          text-[9vw]
          font-semibold
          leading-none
          tracking-[-0.08em]
          text-white/[0.028]
          select-none
        "
        >
          G-CULTURE
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   PROMO CARD
============================================================ */

function PromoCard({ number, title, subtitle }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        group
        relative
        min-h-[250px]
        bg-[#09090b]
        p-7
        transition-colors
        duration-500
        hover:bg-[#0e0e11]
        sm:p-9
      "
    >
      <div
        className="
        flex
        items-start
        justify-between
      "
      >
        <span
          className="
          font-mono
          text-[10px]
          tracking-[0.15em]
          text-white/25
        "
        >
          {number}
        </span>

        <ArrowUpRight
          size={17}
          strokeWidth={1.4}
          className="
            text-white/20
            transition-all
            duration-500
            group-hover:-translate-y-1
            group-hover:translate-x-1
            group-hover:text-white
          "
        />
      </div>

      <div
        className="
        absolute
        bottom-7
        left-7
        right-7
        sm:bottom-9
        sm:left-9
        sm:right-9
      "
      >
        <h3
          className="
          text-xl
          font-medium
          tracking-[-0.025em]
          text-white
        "
        >
          {title}
        </h3>

        <p
          className="
          mt-3
          max-w-sm
          text-sm
          leading-6
          text-white/35
        "
        >
          {subtitle}
        </p>

        <Link
          to="/shop"
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            text-[9px]
            font-medium
            uppercase
            tracking-[0.2em]
            text-white/45
            transition-colors
            duration-300
            hover:text-white
          "
        >
          Shop now
          <ArrowRight
            size={12}
            strokeWidth={1.5}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>
    </motion.div>
  );
}
