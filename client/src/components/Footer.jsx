import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * Temporary frontend subscription storage.
       *
       * This prevents duplicate subscriptions on the same browser.
       * Later this can be connected directly to your MongoDB API.
       */

      const existingSubscribers =
        JSON.parse(
          localStorage.getItem(
            "gculture_newsletter_subscribers"
          ) || "[]"
        );

      if (
        existingSubscribers.includes(trimmedEmail)
      ) {
        toast("You're already subscribed.", {
          icon: "✓",
        });

        setEmail("");
        return;
      }

      existingSubscribers.push(trimmedEmail);

      localStorage.setItem(
        "gculture_newsletter_subscribers",
        JSON.stringify(existingSubscribers)
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 600)
      );

      toast.success(
        "You're on the list. Welcome to G-Culture."
      );

      setEmail("");
    } catch (error) {
      console.error(
        "Newsletter subscription error:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#050507] text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          -top-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-white/[0.035]
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-white/[0.025]
          blur-[140px]
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
          amount: 0.1,
        }}
        transition={{
          duration: 0.7,
        }}
        className="
          relative
          z-10
          mx-auto
          max-w-[1280px]
          px-5
          py-16
          sm:px-6
          lg:px-8
        "
      >

        {/* ===================================================
            TOP BRAND / NEWSLETTER
        ==================================================== */}

        <div
          className="
            mb-16
            grid
            grid-cols-1
            gap-12
            border-b
            border-white/[0.08]
            pb-14
            lg:grid-cols-[1fr_1fr]
            lg:gap-20
          "
        >

          {/* BRAND */}

          <div>

            <Link
              to="/"
              onClick={scrollToTop}
              className="inline-block"
            >
              <img
                src="/images/gculture.png"
                alt="G-Culture"
                className="
                  mb-6
                  h-16
                  w-16
                  object-contain
                  opacity-90
                  transition-opacity
                  duration-300
                  hover:opacity-100
                "
              />
            </Link>

            <p
              className="
                max-w-md
                text-sm
                leading-7
                text-white/40
              "
            >
              A pioneering force in Indian fashion —
              crafting identity through design, culture
              and confidence.
            </p>

            <Link
              to="/about"
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white/60
                transition-colors
                hover:text-white
              "
            >
              Discover G-Culture

              <ArrowUpRight
                size={13}
                strokeWidth={1.6}
              />
            </Link>

          </div>


          {/* NEWSLETTER */}

          <div>

            <div
              className="
                mb-3
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-4
                  bg-white/30
                "
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-white/40
                "
              >
                Get in touch
              </span>
            </div>

            <h3
              className="
                text-2xl
                font-normal
                tracking-[-0.03em]
                text-white
                sm:text-3xl
              "
            >
              Be the first to know.
            </h3>

            <p
              className="
                mt-3
                max-w-md
                text-sm
                leading-6
                text-white/35
              "
            >
              Get early access to new drops,
              exclusive pieces and G-Culture updates.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="
                mt-6
                flex
                max-w-lg
                flex-col
                gap-3
                sm:flex-row
              "
            >

              <div
                className="
                  relative
                  flex-1
                "
              >
                <Mail
                  size={15}
                  strokeWidth={1.5}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-white/25
                  "
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  autoComplete="email"
                  className="
                    h-11
                    w-full
                    rounded-full
                    border
                    border-white/[0.10]
                    bg-white/[0.035]
                    pl-11
                    pr-4
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/25
                    transition-all
                    duration-300
                    focus:border-white/25
                    focus:bg-white/[0.05]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-white
                  px-6
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-black
                  transition-all
                  duration-300
                  hover:bg-white/90
                  hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />

                    Joining
                  </>
                ) : (
                  <>
                    Subscribe

                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.7}
                    />
                  </>
                )}
              </button>

            </form>

            <p
              className="
                mt-3
                text-[10px]
                text-white/20
              "
            >
              No spam. Just G-Culture.
            </p>

          </div>

        </div>


        {/* ===================================================
            MAIN FOOTER GRID
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-x-8
            gap-y-12
            sm:grid-cols-3
            lg:grid-cols-4
          "
        >

          {/* SHOP */}

          <div>
            <h4 className="footer-heading">
              Explore
            </h4>

            <ul className="footer-list">

              <li>
                <Link to="/shop">
                  Shop
                </Link>
              </li>

              <li>
                <Link to="/latest-drops">
                  Latest Drops
                </Link>
              </li>

              <li>
                <Link to="/streetwear">
                  Streetwear
                </Link>
              </li>

              <li>
                <Link to="/casualwear">
                  Casualwear
                </Link>
              </li>

              <li>
                <Link to="/caps">
                  Caps
                </Link>
              </li>

              <li>
                <Link to="/chestbags">
                  Chest Bags
                </Link>
              </li>

            </ul>
          </div>


          {/* COMPANY */}

          <div>
            <h4 className="footer-heading">
              Company
            </h4>

            <ul className="footer-list">

              <li>
                <Link to="/about">
                  About G-Culture
                </Link>
              </li>

              <li>
                <Link to="/blog">
                  Journal
                </Link>
              </li>

              <li>
                <Link to="/latest-drops">
                  Latest Drops
                </Link>
              </li>

              <li>
                <Link to="/terms">
                  Terms & Conditions
                </Link>
              </li>

            </ul>
          </div>


          {/* ACCOUNT */}

          <div>
            <h4 className="footer-heading">
              Account
            </h4>

            <ul className="footer-list">

              <li>
                <Link to="/profile">
                  My Account
                </Link>
              </li>

              <li>
                <Link to="/orders">
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/wishlist">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link to="/cart">
                  Shopping Bag
                </Link>
              </li>

            </ul>
          </div>


          {/* SUPPORT */}

          <div>
            <h4 className="footer-heading">
              Support
            </h4>

            <ul className="footer-list">

              <li>
                <a href="mailto:customersupport@gculture.in">
                  Contact Support
                </a>
              </li>

              <li>
                <a href="mailto:customersupport@gculture.in?subject=G-Culture%20Support">
                  Customer Care
                </a>
              </li>

              <li>
                <Link to="/terms">
                  Terms & Conditions
                </Link>
              </li>

            </ul>
          </div>

        </div>


        {/* ===================================================
            SOCIALS + BOTTOM
        ==================================================== */}

        <div
          className="
            mt-14
            flex
            flex-col
            gap-6
            border-t
            border-white/[0.08]
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <span
              className="
                mr-2
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-white/25
              "
            >
              Follow
            </span>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="G-Culture on Instagram"
              className="social-link"
            >
              <Instagram size={15} />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="G-Culture on Facebook"
              className="social-link"
            >
              <Facebook size={15} />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="G-Culture on LinkedIn"
              className="social-link"
            >
              <Linkedin size={15} />
            </a>

          </div>


          <div
            className="
              flex
              flex-col
              gap-2
              text-[12px]
              text-white/25
              sm:flex-row
              sm:items-center
              sm:gap-5
            "
          >

            <span>
              © {new Date().getFullYear()} G-Culture
            </span>

            <span className="hidden sm:block">
              •
            </span>

            <span>
              Fashion for creators.
            </span>

            <Link
              to="/terms"
              className="
                transition-colors
                hover:text-white/60
              "
            >
              Terms
            </Link>

          </div>

        </div>


        {/* BACK TO TOP */}

        <button
          type="button"
          onClick={scrollToTop}
          className="
            absolute
            bottom-7
            right-5
            hidden
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/[0.10]
            bg-white/[0.025]
            text-white/40
            transition-all
            duration-300
            hover:border-white/20
            hover:bg-white
            hover:text-black
            sm:flex
            lg:right-8
          "
          aria-label="Back to top"
        >
          ↑
        </button>

      </motion.div>


      {/* =====================================================
          FOOTER STYLES
      ====================================================== */}

      <style>{`

        .footer-heading {
          margin-bottom: 20px;

          color: rgba(255,255,255,0.75);

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 0.2em;

          text-transform: uppercase;
        }

        .footer-list {
          display: flex;

          flex-direction: column;

          gap: 12px;

          font-size: 14px;
        }

        .footer-list a {
          color: rgba(255,255,255,0.36);

          transition:
            color 200ms ease;
        }

        .footer-list a:hover {
          color: rgba(255,255,255,0.9);
        }

        .social-link {
          display: flex;

          align-items: center;

          justify-content: center;

          width: 34px;

          height: 34px;

          border:
            1px solid
            rgba(255,255,255,0.08);

          border-radius: 50%;

          color:
            rgba(255,255,255,0.38);

          background:
            rgba(255,255,255,0.02);

          transition:
            color 250ms ease,
            background 250ms ease,
            border-color 250ms ease,
            transform 250ms ease;
        }

        .social-link:hover {
          color: #050507;

          background: #fff;

          border-color: #fff;

          transform:
            translateY(-2px);
        }

        @media (max-width: 640px) {
          .footer-list {
            gap: 10px;
            font-size: 12px;
          }
        }

      `}</style>

    </footer>
  );
}