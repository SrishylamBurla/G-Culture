import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";

const navSections = [
  {
    title: "Explore",
    links: [
      ["Shop", "/shop"],
      ["Latest Drops", "/latest-drops"],
      ["Streetwear", "/streetwear"],
      ["Casualwear", "/casualwear"],
      ["Caps", "/caps"],
      ["Chest Bags", "/chestbags"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About G-Culture", "/about"],
      ["Journal", "/blog"],
      ["Latest Drops", "/latest-drops"],
      ["Terms & Conditions", "/terms"],
    ],
  },
  {
    title: "Account",
    links: [
      ["My Account", "/profile"],
      ["My Orders", "/orders"],
      ["Wishlist", "/wishlist"],
      ["Shopping Bag", "/cart"],
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: Instagram,
    hover:
      "hover:bg-gradient-to-br hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045]",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: Facebook,
    hover: "hover:bg-[#1877f2]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: Linkedin,
    hover: "hover:bg-[#0a66c2]",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavigation = () => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    });
  };

  const handleSubscribe = async (event) => {
    event.preventDefault();

    const value = email.trim().toLowerCase();

    if (!value) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const subscribers = JSON.parse(
        localStorage.getItem("gculture_newsletter_subscribers") || "[]"
      );

      if (subscribers.includes(value)) {
        toast("You're already subscribed.", {
          icon: "✓",
        });
      } else {
        subscribers.push(value);

        localStorage.setItem(
          "gculture_newsletter_subscribers",
          JSON.stringify(subscribers)
        );

        await new Promise((resolve) => setTimeout(resolve, 600));

        toast.success("You're on the list. Welcome to G-Culture.");
      }

      setEmail("");
    } catch (error) {
      console.error("Newsletter error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#050507] text-white">
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-500/[0.06] blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-500/[0.05] blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-[1380px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      >
        {/* Top */}

        <div className="grid gap-12 border-b border-white/[0.08] pb-14 lg:grid-cols-2 lg:gap-20 lg:pb-16">
          {/* Brand */}

          <div>
            <Link
              to="/"
              onClick={handleNavigation}
              className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-transform duration-300 hover:-translate-y-1 hover:rotate-2 sm:h-20 sm:w-20"
            >
              <img
                src="/images/gculture.png"
                alt="G-Culture"
                className="h-full w-full rounded-full object-contain"
              />
            </Link>

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
              G-CULTURE
            </p>

            <h2 className="text-5xl font-light leading-[0.95] tracking-[-0.05em] sm:text-6xl">
              Wear your
              <br />
              <span className="text-white/30">culture.</span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/40 sm:text-[15px]">
              A pioneering force in Indian fashion — crafting identity
              through design, culture and confidence.
            </p>

            <Link
              to="/about"
              onClick={handleNavigation}
              className="group mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
            >
              Discover G-Culture
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Newsletter */}

          <div className="self-center rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
              <span className="h-px w-6 bg-white/25" />
              Stay connected
            </div>

            <h3 className="text-4xl font-light leading-none tracking-[-0.04em]">
              Be the first
              <br />
              to know.
            </h3>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/40">
              Get early access to new drops, exclusive pieces and everything
              happening at G-Culture.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-6 flex flex-col gap-2.5 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-full border border-white/10 bg-white/[0.03] pl-11 pr-5 text-sm text-white outline-none transition focus:border-white/25 focus:bg-white/[0.05] placeholder:text-white/25"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#050507] transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Joining
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowUpRight size={15} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-3 flex items-center gap-2 text-[11px] text-white/25">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              No spam. Just G-Culture.
            </p>
          </div>
        </div>

        {/* Navigation */}

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 sm:grid-cols-4 lg:py-16">
          {navSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ddb637]">
                {section.title}
              </h4>

              <ul className="space-y-3.5">
                {section.links.map(([label, path]) => (
                  <li key={`${section.title}-${label}`}>
                    <Link
                      to={path}
                      onClick={handleNavigation}
                      className="group relative inline-block text-sm text-white/40 transition-all duration-300 hover:translate-x-1 hover:text-white"
                    >
                      {label}

                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ddb637]">
              Support
            </h4>

            <ul className="space-y-3.5">
              <li>
                <a
                  href="mailto:customersupport@gculture.in"
                  className="group relative inline-block text-sm text-white/40 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  Contact Support
                </a>
              </li>

              <li>
                <a
                  href="mailto:customersupport@gculture.in?subject=G-Culture%20Support"
                  className="group relative inline-block text-sm text-white/40 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  Customer Care
                </a>
              </li>

              <li>
                <Link
                  to="/terms"
                  onClick={handleNavigation}
                  className="group relative inline-block text-sm text-white/40 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}

        <div className="relative flex flex-col gap-6 border-t border-white/[0.08] pt-6 md:flex-row md:items-center md:justify-between">
          {/* Social */}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">
              Follow G-Culture
            </span>

            <div className="flex gap-2">
              {socialLinks.map(
                ({ label, href, icon: Icon, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`G-Culture on ${label}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-white/50 transition-all duration-300 hover:-translate-y-1 hover:text-white ${hover}`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Copyright */}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-white/25">
            <span>
              © {new Date().getFullYear()} G-Culture
            </span>

            <span className="hidden sm:inline">•</span>

            <span>Fashion for creators.</span>

            <Link
              to="/terms"
              onClick={handleNavigation}
              className="text-white/35 transition-colors hover:text-white"
            >
              Terms
            </Link>
          </div>

          {/* Back to top */}

          <button
            onClick={scrollTop}
            aria-label="Back to top"
            className="absolute right-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#050507] md:relative md:right-auto md:top-auto"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </motion.div>
    </footer>
  );
}