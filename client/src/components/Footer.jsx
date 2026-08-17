import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Loader2,
  ArrowUp,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();

  /*
   * =========================================================
   * NEWSLETTER
   * =========================================================
   */

  const handleSubscribe = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const existingSubscribers = JSON.parse(
        localStorage.getItem("gculture_newsletter_subscribers") || "[]",
      );

      if (existingSubscribers.includes(trimmedEmail)) {
        toast("You're already subscribed.", {
          icon: "✓",
        });

        setEmail("");
        return;
      }

      existingSubscribers.push(trimmedEmail);

      localStorage.setItem(
        "gculture_newsletter_subscribers",
        JSON.stringify(existingSubscribers),
      );

      await new Promise((resolve) => setTimeout(resolve, 600));

      toast.success("You're on the list. Welcome to G-Culture.");

      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * =========================================================
   * SCROLL TO TOP
   * =========================================================
   */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  /*
   * =========================================================
   * INTERNAL NAVIGATION
   *
   * Makes footer links always start at the top of the
   * destination page.
   * =========================================================
   */

  const handleInternalNavigation = () => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  };

  return (
    <footer className="gculture-footer">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="footer-noise" />

      <div className="footer-orb footer-orb-one" />

      <div className="footer-orb footer-orb-two" />

      <div className="footer-grid" />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

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
          amount: 0.08,
        }}
        transition={{
          duration: 0.7,
        }}
        className="footer-content"
      >
        {/* ===================================================
            BRAND + NEWSLETTER
        ==================================================== */}

        <div className="footer-top">
          {/* BRAND */}

          <div className="footer-brand">
            <Link
              to="/"
              onClick={handleInternalNavigation}
              className="footer-logo-link"
            >
              <img
                src="/images/gculture.png"
                alt="G-Culture"
                className="footer-logo rounded-full
                      bg-white/[0.04]
                      border
                      border-white/[0.4] pb-0.5"
              />
            </Link>

            <div className="footer-brand-label">G-CULTURE</div>

            <h2 className="footer-brand-title">
              Wear your
              <br />
              <span>culture.</span>
            </h2>

            <p className="footer-description">
              A pioneering force in Indian fashion — crafting identity through
              design, culture and confidence.
            </p>

            <Link
              to="/about"
              onClick={handleInternalNavigation}
              className="footer-discover group"
            >
              <span>Discover G-Culture</span>

              <ArrowUpRight
                size={15}
                strokeWidth={1.7}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>
          </div>

          {/* NEWSLETTER */}

          <div className="footer-newsletter">
            <div className="footer-eyebrow">
              <span className="footer-eyebrow-line" />

              <span>Stay connected</span>
            </div>

            <h3 className="footer-newsletter-title">
              Be the first
              <br />
              to know.
            </h3>

            <p className="footer-newsletter-text">
              Get early access to new drops, exclusive pieces and everything
              happening at G-Culture.
            </p>

            <form onSubmit={handleSubscribe} className="footer-subscribe">
              <div className="footer-input-wrapper">
                <Mail
                  size={17}
                  strokeWidth={1.5}
                  className="footer-mail-icon"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  autoComplete="email"
                  className="footer-email-input"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="footer-subscribe-button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />

                    <span>Joining</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>

                    <ArrowUpRight size={15} strokeWidth={1.7} />
                  </>
                )}
              </button>
            </form>

            <div className="footer-newsletter-note">
              <span className="footer-note-dot" />
              No spam. Just G-Culture.
            </div>
          </div>
        </div>

        {/* ===================================================
            FOOTER NAVIGATION
        ==================================================== */}

        <div className="footer-navigation">
          {/* EXPLORE */}

          <div className="footer-column">
            <h4 className="footer-heading">Explore</h4>

            <ul className="footer-list">
              <li>
                <Link to="/shop" onClick={handleInternalNavigation}>
                  Shop
                </Link>
              </li>

              <li>
                <Link to="/latest-drops" onClick={handleInternalNavigation}>
                  Latest Drops
                </Link>
              </li>

              <li>
                <Link to="/streetwear" onClick={handleInternalNavigation}>
                  Streetwear
                </Link>
              </li>

              <li>
                <Link to="/casualwear" onClick={handleInternalNavigation}>
                  Casualwear
                </Link>
              </li>

              <li>
                <Link to="/caps" onClick={handleInternalNavigation}>
                  Caps
                </Link>
              </li>

              <li>
                <Link to="/chestbags" onClick={handleInternalNavigation}>
                  Chest Bags
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}

          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>

            <ul className="footer-list">
              <li>
                <Link to="/about" onClick={handleInternalNavigation}>
                  About G-Culture
                </Link>
              </li>

              <li>
                <Link to="/blog" onClick={handleInternalNavigation}>
                  Journal
                </Link>
              </li>

              <li>
                <Link to="/latest-drops" onClick={handleInternalNavigation}>
                  Latest Drops
                </Link>
              </li>

              <li>
                <Link to="/terms" onClick={handleInternalNavigation}>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* ACCOUNT */}

          <div className="footer-column">
            <h4 className="footer-heading">Account</h4>

            <ul className="footer-list">
              <li>
                <Link to="/profile" onClick={handleInternalNavigation}>
                  My Account
                </Link>
              </li>

              <li>
                <Link to="/orders" onClick={handleInternalNavigation}>
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/wishlist" onClick={handleInternalNavigation}>
                  Wishlist
                </Link>
              </li>

              <li>
                <Link to="/cart" onClick={handleInternalNavigation}>
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}

          <div className="footer-column">
            <h4 className="footer-heading">Support</h4>

            <ul className="footer-list">
              <li>
                <a href="mailto:customersupport@gculture.in">Contact Support</a>
              </li>

              <li>
                <a href="mailto:customersupport@gculture.in?subject=G-Culture%20Support">
                  Customer Care
                </a>
              </li>

              <li>
                <Link to="/terms" onClick={handleInternalNavigation}>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ===================================================
            SOCIAL / BOTTOM
        ==================================================== */}

        <div className="footer-bottom">
          {/* SOCIAL */}

          <div className="footer-social">
            <span className="footer-social-label">Follow G-Culture</span>

            <div className="footer-social-links">
              {/* INSTAGRAM */}

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="G-Culture on Instagram"
                className="social-link social-instagram"
              >
                <Instagram size={19} strokeWidth={1.8} />
              </a>

              {/* FACEBOOK */}

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="G-Culture on Facebook"
                className="social-link social-facebook"
              >
                <Facebook size={19} strokeWidth={1.8} />
              </a>

              {/* LINKEDIN */}

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="G-Culture on LinkedIn"
                className="social-link social-linkedin"
              >
                <Linkedin size={19} strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* COPYRIGHT */}

          <div className="footer-meta">
            <span>© {new Date().getFullYear()} G-Culture</span>

            <span className="footer-meta-divider">•</span>

            <span>Fashion for creators.</span>

            <Link to="/terms" onClick={handleInternalNavigation}>
              Terms
            </Link>
          </div>

          {/* BACK TO TOP */}

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-top"
            aria-label="Back to top"
          >
            <ArrowUp size={17} strokeWidth={1.7} />
          </button>
        </div>
      </motion.div>

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style>{`

        /* =====================================================
           FOOTER BASE
        ====================================================== */

        .gculture-footer {

          position: relative;

          width: 100%;

          overflow: hidden;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          background:
            #050507;

          color: #fff;
        }


        /* =====================================================
           BACKGROUND GRID
        ====================================================== */

        .footer-grid {

          position: absolute;

          inset: 0;

          pointer-events: none;

          opacity: 0.18;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.025
              ) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.025
              ) 1px,
              transparent 1px
            );

          background-size:
            80px 80px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 80%
            );
        }


        /* =====================================================
           AMBIENT ORBS
        ====================================================== */

        .footer-orb {

          position: absolute;

          width: 420px;

          height: 420px;

          border-radius: 50%;

          pointer-events: none;

          filter: blur(120px);
        }


        .footer-orb-one {

          top: -220px;

          left: -180px;

          background:
            rgba(
              122,
              70,
              255,
              0.09
            );
        }


        .footer-orb-two {

          right: -200px;

          bottom: -240px;

          background:
            rgba(
              0,
              140,
              255,
              0.07
            );
        }


        /* =====================================================
           NOISE
        ====================================================== */

        .footer-noise {

          position: absolute;

          inset: 0;

          pointer-events: none;

          opacity: 0.025;

          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E");
        }


        /* =====================================================
           CONTENT
        ====================================================== */

        .footer-content {

          position: relative;

          z-index: 10;

          width: 100%;

          max-width: 1380px;

          margin: 0 auto;

          padding:
            80px
            40px
            34px;
        }


        /* =====================================================
           TOP
        ====================================================== */

        .footer-top {

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);

          gap: 100px;

          padding-bottom: 72px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );
        }


        /* =====================================================
           BRAND
        ====================================================== */

        .footer-brand {

          max-width: 560px;
        }


        .footer-logo-link {

          display: inline-flex;

          align-items: center;

          justify-content: center;

          width: 88px;

          height: 88px;

          margin-bottom: 24px;

          box-shadow:
            0 12px 40px
            rgba(
              0,
              0,
              0,
              0.25
            );

          transition:
            transform 350ms ease,
            border-color 350ms ease;
        }


        .footer-logo-link:hover {

          transform:
            translateY(-3px)
            rotate(4deg);

          border-color:
            rgba(
              255,
              255,
              255,
              0.22
            );
        }


        .footer-logo {

          width: 88px;

          height: 88px;

          object-fit: contain;
        }


        .footer-brand-label {

          margin-bottom: 10px;

          color:
            rgba(
              255,
              255,
              255,
              0.38
            );

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 0.30em;
        }


        .footer-brand-title {

          margin: 0;

          font-size:
            clamp(
              38px,
              4vw,
              62px
            );

          font-weight: 400;

          line-height: 0.96;

          letter-spacing: -0.055em;
        }


        .footer-brand-title span {

          color:
            rgba(
              255,
              255,
              255,
              0.34
            );
        }


        .footer-description {

          max-width: 470px;

          margin-top: 22px;

          color:
            rgba(
              255,
              255,
              255,
              0.40
            );

          font-size: 14px;

          line-height: 1.8;
        }


        .footer-discover {

          display: inline-flex;

          align-items: center;

          gap: 8px;

          margin-top: 24px;

          color:
            rgba(
              255,
              255,
              255,
              0.70
            );

          font-size: 11px;

          font-weight: 600;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          text-decoration: none;

          transition:
            color 250ms ease;
        }


        .footer-discover:hover {

          color: #fff;
        }


        /* =====================================================
           NEWSLETTER
        ====================================================== */

        .footer-newsletter {

          align-self: center;

          padding:
            36px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius: 24px;

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                0.045
              ),
              rgba(
                255,
                255,
                255,
                0.015
              )
            );

          box-shadow:
            0 30px 80px
            rgba(
              0,
              0,
              0,
              0.20
            );
        }


        .footer-eyebrow {

          display: flex;

          align-items: center;

          gap: 11px;

          margin-bottom: 17px;

          color:
            rgba(
              255,
              255,
              255,
              0.40
            );

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 0.25em;

          text-transform: uppercase;
        }


        .footer-eyebrow-line {

          width: 25px;

          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.30
            );
        }


        .footer-newsletter-title {

          margin: 0;

          color: #fff;

          font-size:
            clamp(
              30px,
              3vw,
              44px
            );

          font-weight: 400;

          line-height: 1.02;

          letter-spacing: -0.045em;
        }


        .footer-newsletter-text {

          max-width: 440px;

          margin-top: 15px;

          color:
            rgba(
              255,
              255,
              255,
              0.38
            );

          font-size: 14px;

          line-height: 1.7;
        }


        .footer-subscribe {

          display: flex;

          gap: 10px;

          margin-top: 25px;
        }


        .footer-input-wrapper {

          position: relative;

          flex: 1;

          min-width: 0;
        }


        .footer-mail-icon {

          position: absolute;

          left: 17px;

          top: 50%;

          z-index: 2;

          color:
            rgba(
              255,
              255,
              255,
              0.30
            );

          transform:
            translateY(-50%);

          pointer-events: none;
        }


        .footer-email-input {

          width: 100%;

          height: 50px;

          padding:
            0
            18px
            0
            47px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.11
            );

          border-radius: 999px;

          outline: none;

          background:
            rgba(
              255,
              255,
              255,
              0.035
            );

          color: #fff;

          font-size: 14px;

          transition:
            border-color 250ms ease,
            background 250ms ease;
        }


        .footer-email-input::placeholder {

          color:
            rgba(
              255,
              255,
              255,
              0.28
            );
        }


        .footer-email-input:focus {

          border-color:
            rgba(
              255,
              255,
              255,
              0.25
            );

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );
        }


        .footer-subscribe-button {

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 9px;

          flex-shrink: 0;

          height: 50px;

          padding:
            0 22px;

          border: 0;

          border-radius: 999px;

          background: #fff;

          color: #050507;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 0.15em;

          text-transform: uppercase;

          cursor: pointer;

          transition:
            transform 250ms ease,
            box-shadow 250ms ease;
        }


        .footer-subscribe-button:hover {

          transform:
            translateY(-2px);

          box-shadow:
            0 12px 30px
            rgba(
              255,
              255,
              255,
              0.10
            );
        }


        .footer-subscribe-button:disabled {

          cursor: not-allowed;

          opacity: 0.55;
        }


        .footer-newsletter-note {

          display: flex;

          align-items: center;

          gap: 7px;

          margin-top: 13px;

          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size: 11px;
        }


        .footer-note-dot {

          width: 5px;

          height: 5px;

          border-radius: 50%;

          background:
            #5ee6a8;

          box-shadow:
            0 0 10px
            rgba(
              94,
              230,
              168,
              0.45
            );
        }


        /* =====================================================
           NAVIGATION
        ====================================================== */

        .footer-navigation {

          display: grid;

          grid-template-columns:
            repeat(
              4,
              minmax(
                0,
                1fr
              )
            );

          gap: 50px;

          padding:
            64px
            0;
        }


        .footer-heading {

          margin-bottom: 22px;

          color:
            rgba(
              255,
              255,
              255,
              0.70
            );

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 0.20em;

          text-transform: uppercase;
        }


        .footer-list {

          display: flex;

          flex-direction: column;

          gap: 15px;

          padding: 0;

          margin: 0;

          list-style: none;
        }


        .footer-list a {

          position: relative;

          display: inline-flex;

          width: fit-content;

          color:
            rgba(
              255,
              255,
              255,
              0.40
            );

          font-size: 14px;

          line-height: 1.4;

          text-decoration: none;

          transition:
            color 220ms ease,
            transform 220ms ease;
        }


        .footer-list a::after {

          content: "";

          position: absolute;

          left: 0;

          bottom: -4px;

          width: 0;

          height: 1px;

          background: #fff;

          transition:
            width 250ms ease;
        }


        .footer-list a:hover {

          color: #fff;

          transform:
            translateX(3px);
        }


        .footer-list a:hover::after {

          width: 100%;
        }


        /* =====================================================
           BOTTOM
        ====================================================== */

        .footer-bottom {

          position: relative;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 30px;

          padding-top: 26px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );
        }


        /* =====================================================
           SOCIAL
        ====================================================== */

        .footer-social {

          display: flex;

          align-items: center;

          gap: 14px;
        }


        .footer-social-label {

          margin-right: 5px;

          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 0.16em;

          text-transform: uppercase;
        }


        .footer-social-links {

          display: flex;

          align-items: center;

          gap: 9px;
        }


        .social-link {

          position: relative;

          display: flex;

          align-items: center;

          justify-content: center;

          width: 42px;

          height: 42px;

          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.10
            );

          border-radius: 50%;

          color:
            rgba(
              255,
              255,
              255,
              0.65
            );

          background:
            rgba(
              255,
              255,
              255,
              0.035
            );

          transition:
            color 300ms ease,
            transform 300ms ease,
            border-color 300ms ease,
            box-shadow 300ms ease;
        }


        .social-link:hover {

          color: #fff;

          transform:
            translateY(-4px)
            scale(1.06);
        }


        /* =====================================================
           INSTAGRAM
        ====================================================== */

        .social-instagram:hover {

          border-color:
            rgba(
              225,
              48,
              108,
              0.7
            );

          background:
            linear-gradient(
              135deg,
              #833ab4,
              #fd1d1d,
              #fcb045
            );

          box-shadow:
            0 10px 30px
            rgba(
              225,
              48,
              108,
              0.25
            );
        }


        /* =====================================================
           FACEBOOK
        ====================================================== */

        .social-facebook:hover {

          border-color:
            rgba(
              24,
              119,
              242,
              0.7
            );

          background:
            #1877f2;

          box-shadow:
            0 10px 30px
            rgba(
              24,
              119,
              242,
              0.25
            );
        }


        /* =====================================================
           LINKEDIN
        ====================================================== */

        .social-linkedin:hover {

          border-color:
            rgba(
              10,
              102,
              194,
              0.7
            );

          background:
            #0a66c2;

          box-shadow:
            0 10px 30px
            rgba(
              10,
              102,
              194,
              0.25
            );
        }


        /* =====================================================
           META
        ====================================================== */

        .footer-meta {

          display: flex;

          align-items: center;

          gap: 17px;

          color:
            rgba(
              255,
              255,
              255,
              0.27
            );

          font-size: 11px;

          white-space: nowrap;
        }


        .footer-meta a {

          color:
            rgba(
              255,
              255,
              255,
              0.42
            );

          text-decoration: none;

          transition:
            color 200ms ease;
        }


        .footer-meta a:hover {

          color: #fff;
        }


        .footer-meta-divider {

          opacity: 0.4;
        }


        /* =====================================================
           BACK TO TOP
        ====================================================== */

        .footer-back-top {

          display: flex;

          align-items: center;

          justify-content: center;

          width: 42px;

          height: 42px;

          flex-shrink: 0;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.10
            );

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          color:
            rgba(
              255,
              255,
              255,
              0.55
            );

          cursor: pointer;

          transition:
            color 250ms ease,
            background 250ms ease,
            transform 250ms ease,
            border-color 250ms ease;
        }


        .footer-back-top:hover {

          color: #050507;

          background: #fff;

          border-color: #fff;

          transform:
            translateY(-3px);
        }


        /* =====================================================
           TABLET
        ====================================================== */

        @media (
          max-width: 1023px
        ) {

          .footer-content {

            padding:
              70px
              24px
              30px;
          }


          .footer-top {

            gap: 50px;
          }


          .footer-navigation {

            gap: 30px;
          }

        }


        /* =====================================================
           MOBILE
        ====================================================== */

        @media (
          max-width: 767px
        ) {

          .footer-content {

            padding:
              58px
              18px
              24px;
          }


          .footer-top {

            display: flex;

            flex-direction: column;

            gap: 48px;

            padding-bottom: 48px;
          }


          /* BRAND */

          .footer-logo-link {

            width: 62px;

            height: 62px;

            margin-bottom: 20px;
          }


          .footer-logo {

            width: 44px;

            height: 44px;
          }


          .footer-brand-label {

            font-size: 10px;

            margin-bottom: 9px;
          }


          .footer-brand-title {

            font-size: 42px;

            line-height: 0.98;
          }


          .footer-description {

            margin-top: 18px;

            max-width: 100%;

            font-size: 15px;

            line-height: 1.75;
          }


          .footer-discover {

            margin-top: 20px;

            font-size: 11px;
          }


          /* NEWSLETTER */

          .footer-newsletter {

            padding: 26px 20px;

            border-radius: 20px;
          }


          .footer-eyebrow {

            font-size: 10px;

            margin-bottom: 15px;
          }


          .footer-newsletter-title {

            font-size: 34px;
          }


          .footer-newsletter-text {

            font-size: 14px;

            line-height: 1.7;
          }


          .footer-subscribe {

            flex-direction: column;

            gap: 10px;
          }


          .footer-email-input {

            height: 52px;

            font-size: 15px;
          }


          .footer-subscribe-button {

            width: 100%;

            height: 52px;

            font-size: 11px;
          }


          /* NAVIGATION */

          .footer-navigation {

            grid-template-columns:
              repeat(
                2,
                minmax(
                  0,
                  1fr
                )
              );

            gap:
              42px
              24px;

            padding:
              48px
              0;
          }


          .footer-heading {

            margin-bottom: 18px;

            font-size: 11px;

            letter-spacing: 0.16em;
          }


          .footer-list {

            gap: 14px;
          }


          /*
           * IMPORTANT:
           * Increased mobile link size.
           */

          .footer-list a {

            font-size: 15px;

            line-height: 1.45;

            color:
              rgba(
                255,
                255,
                255,
                0.52
              );
          }


          /* BOTTOM */

          .footer-bottom {

            flex-direction: column;

            align-items: flex-start;

            gap: 24px;

            padding-top: 24px;

            padding-bottom: 4px;
          }


          .footer-social {

            width: 100%;

            flex-direction: column;

            align-items: flex-start;

            gap: 13px;
          }


          .footer-social-label {

            font-size: 10px;

            margin: 0;
          }


          .footer-social-links {

            gap: 10px;
          }


          .social-link {

            width: 46px;

            height: 46px;
          }


          .footer-meta {

            flex-wrap: wrap;

            gap: 9px 13px;

            font-size: 12px;

            line-height: 1.6;

            white-space: normal;
          }


          .footer-meta-divider {

            display: none;
          }


          .footer-back-top {

            position: absolute;

            right: 0;

            top: 24px;

            width: 42px;

            height: 42px;
          }

        }


        /* =====================================================
           SMALL PHONES
        ====================================================== */

        @media (
          max-width: 389px
        ) {

          .footer-content {

            padding:
              50px
              15px
              22px;
          }


          .footer-brand-title {

            font-size: 38px;
          }


          .footer-description {

            font-size: 14px;
          }


          .footer-navigation {

            column-gap: 18px;

            row-gap: 38px;
          }


          .footer-list a {

            font-size: 14px;
          }


          .footer-newsletter {

            padding:
              24px
              17px;
          }


          .footer-newsletter-title {

            font-size: 31px;
          }

        }


        /* =====================================================
           REDUCED MOTION
        ====================================================== */

        @media (
          prefers-reduced-motion: reduce
        ) {

          .footer-logo-link,
          .footer-list a,
          .footer-social .social-link,
          .footer-back-top,
          .footer-subscribe-button {

            transition: none !important;
          }

        }

      `}</style>
    </footer>
  );
}
