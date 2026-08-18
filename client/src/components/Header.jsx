import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
  BookHeart,
  Search,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  X,
  User,
  Package,
  Phone,
  Info,
  Flame,
  LayoutGrid,
  Sparkles,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

export default function Header({ menuOpen, setMenuOpen }) {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState(null);

  const [mobileCollectionsOpen, setMobileCollectionsOpen] =
    useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] =
    useState(null);

  const [scrollDir, setScrollDir] = useState("up");

  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  const searchRef = useRef(null);
  const collectionsTimeout = useRef(null);

  const collectionLinks = [
    {
      name: "Street Wear",
      path: "/streetwear",
      types: [
        {
          name: "Oversized T-Shirts",
          path: "/streetwear?subcategory=oversized-tshirts",
        },
        {
          name: "Hoodies",
          path: "/streetwear?subcategory=hoodies",
        },
        {
          name: "Joggers",
          path: "/streetwear?subcategory=joggers",
        },
        {
          name: "Jackets",
          path: "/streetwear?subcategory=jackets",
        },
      ],
    },
    {
      name: "Casual Wear",
      path: "/casualwear",
      types: [
        {
          name: "Shirts",
          path: "/casualwear?subcategory=shirts",
        },
        {
          name: "Trousers",
          path: "/casualwear?subcategory=trousers",
        },
        {
          name: "Polos",
          path: "/casualwear?subcategory=polos",
        },
        {
          name: "Shorts",
          path: "/casualwear?subcategory=shorts",
        },
      ],
    },
    {
      name: "Caps",
      path: "/caps",
      types: [
        {
          name: "Sports",
          path: "/caps?subcategory=sports",
        },
        {
          name: "Casual",
          path: "/caps?subcategory=casual",
        },
        {
          name: "Snapback",
          path: "/caps?subcategory=snapback",
        },
        {
          name: "Bucket",
          path: "/caps?subcategory=bucket",
        },
        {
          name: "Trucker",
          path: "/caps?subcategory=trucker",
        },
      ],
    },
    {
      name: "Chest Bags",
      path: "/chestbags",
      types: [
        {
          name: "Sports",
          path: "/chestbags?subcategory=sports",
        },
        {
          name: "Casual",
          path: "/chestbags?subcategory=casual",
        },
        {
          name: "Kids",
          path: "/chestbags?subcategory=kids",
        },
        {
          name: "Formal",
          path: "/chestbags?subcategory=formal",
        },
      ],
    },
  ];

  /* ---------------- SCROLL ---------------- */

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;

        if (currentY > lastYRef.current + 8) {
          setScrollDir("down");
        } else if (currentY < lastYRef.current - 8) {
          setScrollDir("up");
        }

        lastYRef.current = currentY;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerOpacity = scrollDir === "down" ? 0 : 1;
  const headerTranslate = scrollDir === "down" ? -40 : 0;
  const headerBlur =
    scrollDir === "down" ? "blur(18px)" : "blur(10px)";

  const headerBackdrop =
    scrollDir === "down"
      ? "rgba(10,10,10,0.2)"
      : "rgba(10,10,10,0.85)";

  /* ---------------- OUTSIDE SEARCH CLICK ---------------- */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ---------------- MOBILE SCROLL LOCK ---------------- */

  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  /* ---------------- SEARCH API ---------------- */

  useEffect(() => {
    const fetchSearch = async () => {
      const query = searchTerm.trim();

      if (query.length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/products/search?query=${encodeURIComponent(query)}`
        );

        setSearchResults(data);
      } catch (error) {
        console.error("Search failed:", error.message);
        setSearchResults([]);
      }
    };

    const timeout = setTimeout(fetchSearch, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  /* ---------------- SEARCH ---------------- */

  const handleSearch = () => {
    const query = searchTerm.trim();

    if (!query) return;

    navigate(`/search?query=${encodeURIComponent(query)}`);

    setSearchTerm("");
    setSearchResults([]);
    setShowSearch(false);
    setMenuOpen(false);
  };

  /* ---------------- COLLECTIONS ---------------- */

  const handleCollectionsEnter = () => {
    clearTimeout(collectionsTimeout.current);
    setCollectionsOpen(true);
  };

  const handleCollectionsLeave = () => {
    collectionsTimeout.current = setTimeout(() => {
      setCollectionsOpen(false);
      setActiveCollection(null);
    }, 200);
  };

  /* ---------------- MOBILE MENU ---------------- */

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileCollectionsOpen(false);
    setMobileActiveCategory(null);
  };

  const toggleMobileMenu = () => {
    if (menuOpen) {
      closeMobileMenu();
    } else {
      setMenuOpen(true);
    }
  };

  const toggleMobileCategory = (category) => {
    setMobileActiveCategory((current) =>
      current === category ? null : category
    );
  };

  return (
    <>
      {/* HEADER */}

      <header
        className="
          fixed
          top-0
          left-0
          z-[99990]
          w-full
          border-b
          border-white/10
          backdrop-saturate-150
          transition-all
          duration-500
        "
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerTranslate}px)`,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          background: headerBackdrop,
        }}
      >
        {/* SHIPPING */}

        <div
          className="
            bg-gradient-to-r
            from-[#0a0a0c]
            via-[#d4af37]/10
            to-[#0a0a0c]
            py-1.5
            text-center
            text-[11px]
            font-medium
            uppercase
            tracking-[0.2em]
            text-[#d4af37]
            md:text-[11px]
          "
        >
          Free shipping on all orders
        </div>

        <div ref={searchRef}>
          {/* MAIN BAR */}

          <div
            className="
              relative
              mx-auto
              flex
              max-w-7xl
              items-center
              justify-between
              px-4
              py-3
              sm:px-6
            "
          >
            {/* DESKTOP */}

            <div className="hidden items-center space-x-8 md:flex">
              <Link
                to="/"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.04]
                "
              >
                <img
                  src="/images/gculture.png"
                  alt="G-Culture"
                  className="h-10 w-10 object-contain"
                />
              </Link>

              <nav
                className="
                  flex
                  items-center
                  space-x-6
                  text-sm
                  font-medium
                  tracking-wide
                "
              >
                <Link
                  to="/shop"
                  className="
                    text-gray-200
                    transition-colors
                    hover:text-[#d4af37]
                  "
                >
                  Shop
                </Link>

                {/* COLLECTIONS */}

                <div
                  className="relative"
                  onMouseEnter={handleCollectionsEnter}
                  onMouseLeave={handleCollectionsLeave}
                >
                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-1
                      text-gray-200
                      transition-colors
                      hover:text-[#d4af37]
                    "
                  >
                    Collections

                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        collectionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`
                      absolute
                      left-0
                      top-full
                      mt-3
                      flex
                      overflow-hidden
                      rounded-xl
                      border
                      border-[#d4af37]/10
                      bg-[#0a0a0c]/98
                      shadow-2xl
                      shadow-black/40
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      ${
                        collectionsOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-2 opacity-0"
                      }
                    `}
                  >
                    {/* CATEGORIES */}

                    <div className="w-52 border-r border-[#d4af37]/5">
                      <p
                        className="
                          px-5
                          pb-2
                          pt-4
                          text-[11px]
                          font-semibold
                          uppercase
                          tracking-[0.2em]
                          text-[#d4af37]/50
                        "
                      >
                        Categories
                      </p>

                      {collectionLinks.map((item) => (
                        <div
                          key={item.name}
                          onMouseEnter={() =>
                            setActiveCollection(item.name)
                          }
                          className={
                            activeCollection === item.name
                              ? "bg-[#d4af37]/5"
                              : ""
                          }
                        >
                          <Link
                            to={item.path}
                            onClick={() => {
                              setCollectionsOpen(false);
                              setActiveCollection(null);
                            }}
                            className="
                              flex
                              items-center
                              justify-between
                              px-5
                              py-3
                              text-[13px]
                              text-gray-300
                              transition-all
                              hover:text-white
                            "
                          >
                            {item.name}

                            <ChevronRight
                              size={12}
                              className={
                                activeCollection === item.name
                                  ? "translate-x-0 text-[#d4af37] opacity-100"
                                  : "-translate-x-1 text-[#d4af37]/40 opacity-0"
                              }
                            />
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* TYPES */}

                    <div className="w-52">
                      {collectionLinks.map(
                        (item) =>
                          activeCollection === item.name && (
                            <div key={item.name}>
                              <p
                                className="
                                  px-5
                                  pb-2
                                  pt-4
                                  text-[11px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.2em]
                                  text-[#d4af37]/50
                                "
                              >
                                Types
                              </p>

                              {item.types.map((type) => (
                                <Link
                                  key={type.name}
                                  to={type.path}
                                  onClick={() => {
                                    setCollectionsOpen(false);
                                    setActiveCollection(null);
                                  }}
                                  className="
                                    block
                                    px-5
                                    py-3
                                    text-[13px]
                                    text-gray-400
                                    transition-all
                                    hover:bg-[#d4af37]/5
                                    hover:text-white
                                  "
                                >
                                  {type.name}
                                </Link>
                              ))}
                            </div>
                          )
                      )}

                      {!activeCollection && (
                        <div className="flex min-h-[200px] items-center justify-center px-6">
                          <p className="text-[11px] text-center text-gray-600">
                            Hover a category to see types
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Link
                  to="/latest-drops"
                  className="
                    text-gray-200
                    transition-colors
                    hover:text-[#d4af37]
                  "
                >
                  Latest Drops
                </Link>

                <Link
                  to="/about"
                  className="
                    text-gray-200
                    transition-colors
                    hover:text-[#d4af37]
                  "
                >
                  About Us
                </Link>

                <Link
                  to="/contact"
                  className="
                    text-gray-200
                    transition-colors
                    hover:text-[#d4af37]
                  "
                >
                  Contact Us
                </Link>
              </nav>
            </div>

            {/* MOBILE LEFT */}

            <div className="flex items-center gap-3 md:hidden">
              <button
                type="button"
                aria-label={
                  menuOpen
                    ? "Close navigation"
                    : "Open navigation"
                }
                aria-expanded={menuOpen}
                onClick={toggleMobileMenu}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  transition-transform
                  active:scale-90
                "
              >
                <span className="relative block h-4 w-5">
                  <span
                    className={`
                      absolute
                      left-0
                      top-0
                      h-[1.5px]
                      w-5
                      bg-white
                      transition-all
                      duration-300
                      ${
                        menuOpen
                          ? "top-[7px] rotate-45"
                          : ""
                      }
                    `}
                  />

                  <span
                    className={`
                      absolute
                      left-0
                      top-[7px]
                      h-[1.5px]
                      w-5
                      bg-white
                      transition-all
                      duration-300
                      ${menuOpen ? "opacity-0" : ""}
                    `}
                  />

                  <span
                    className={`
                      absolute
                      left-0
                      top-[14px]
                      h-[1.5px]
                      w-5
                      bg-white
                      transition-all
                      duration-300
                      ${
                        menuOpen
                          ? "top-[7px] -rotate-45"
                          : ""
                      }
                    `}
                  />
                </span>
              </button>

              <Link
                to="/"
                onClick={closeMobileMenu}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.04]
                "
              >
                <img
                  src="/images/gculture.png"
                  alt="G-Culture"
                  className="h-9 w-9 object-contain"
                />
              </Link>
            </div>

            {/* RIGHT */}

            <div className="relative flex items-center space-x-4">
              {/* DESKTOP SEARCH */}

              <div
                className="
                  hidden
                  h-10
                  w-[280px]
                  items-center
                  gap-1
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  transition-colors
                  focus-within:border-[#d4af37]/30
                  md:flex
                "
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  className="
                    flex-1
                    bg-transparent
                    text-[13px]
                    text-gray-200
                    outline-none
                    placeholder:text-gray-500
                  "
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  aria-label="Search"
                >
                  <Search
                    size={18}
                    strokeWidth={1.5}
                    className="
                      text-gray-400
                      transition-colors
                      hover:text-[#d4af37]
                    "
                  />
                </button>
              </div>

              {/* MOBILE SEARCH */}

              {!showSearch && (
                <button
                  type="button"
                  onClick={() => setShowSearch(true)}
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    md:hidden
                  "
                  aria-label="Search"
                >
                  <Search
                    size={20}
                    strokeWidth={1.5}
                  />
                </button>
              )}

              {/* WISHLIST */}

              <Link
                to="/wishlist"
                onClick={() => {
                  if (menuOpen) closeMobileMenu();
                }}
                className="group relative"
                aria-label="Wishlist"
              >
                <BookHeart
                  size={20}
                  strokeWidth={1.5}
                  className="
                    text-gray-300
                    transition-colors
                    group-hover:text-[#d4af37]
                  "
                />

                {wishlist.length > 0 && (
                  <span
                    className="
                      absolute
                      -right-1.5
                      -top-1.5
                      flex
                      h-4
                      w-4
                      items-center
                      justify-center
                      rounded-full
                      bg-[#d4af37]
                      text-[10px]
                      font-bold
                      text-black
                    "
                  >
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* CART */}

              <Link
                to="/cart"
                onClick={() => {
                  if (menuOpen) closeMobileMenu();
                }}
                className="group relative"
                aria-label="Cart"
              >
                <ShoppingBag
                  size={20}
                  strokeWidth={1.5}
                  className="
                    text-gray-300
                    transition-colors
                    group-hover:text-[#d4af37]
                  "
                />

                {cartItems.length > 0 && (
                  <span
                    className="
                      absolute
                      -right-1.5
                      -top-1.5
                      flex
                      h-4
                      w-4
                      items-center
                      justify-center
                      rounded-full
                      bg-[#d4af37]
                      text-[10px]
                      font-bold
                      text-black
                    "
                  >
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* ADMIN */}

              {userInfo?.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="
                    hidden
                    rounded-full
                    border
                    border-[#d4af37]/20
                    px-3
                    py-1.5
                    text-[12px]
                    font-medium
                    uppercase
                    tracking-wider
                    text-[#d4af37]/70
                    transition-all
                    hover:border-[#d4af37]/50
                    hover:text-[#d4af37]
                    md:inline-flex
                  "
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* MOBILE SEARCH */}

          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                className="
                  overflow-hidden
                  border-t
                  border-[#d4af37]/5
                  bg-[#0a0a0c]
                  md:hidden
                "
              >
                <div className="px-4 py-3">
                  <div
                    className="
                      flex
                      items-center
                      rounded-full
                      border
                      border-[#d4af37]/10
                      bg-white/5
                      px-4
                      py-2.5
                      focus-within:border-[#d4af37]/30
                    "
                  >
                    <Search
                      size={16}
                      className="mr-2 text-white/30"
                    />

                    <input
                      type="text"
                      placeholder="Search products..."
                      autoFocus
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      className="
                        flex-1
                        bg-transparent
                        text-[13px]
                        text-white
                        outline-none
                        placeholder:text-gray-500
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowSearch(false)
                      }
                      aria-label="Close search"
                    >
                      <X
                        size={16}
                        className="text-gray-500"
                      />
                    </button>
                  </div>

                  {searchResults.length > 0 && (
                    <div
                      className="
                        mt-2
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/[0.06]
                        bg-[#0d0d10]
                      "
                    >
                      {searchResults
                        .slice(0, 5)
                        .map((product) => (
                          <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            onClick={() => {
                              setShowSearch(false);
                              setSearchTerm("");
                            }}
                            className="
                              flex
                              items-center
                              gap-3
                              border-b
                              border-white/[0.04]
                              px-3
                              py-2.5
                              last:border-b-0
                            "
                          >
                            <img
                              src={product.images?.[0]}
                              alt={product.name}
                              className="
                                h-10
                                w-10
                                rounded-lg
                                object-cover
                              "
                            />

                            <div className="min-w-0">
                              <p className="truncate text-[12px] text-white">
                                {product.name}
                              </p>

                              <p className="mt-0.5 text-[11px] text-white/30">
                                ₹
                                {Number(
                                  product.offerPrice ||
                                    product.price ||
                                    0
                                ).toLocaleString("en-IN")}
                              </p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* MOBILE DRAWER */}

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="
                fixed
                inset-0
                z-[99997]
                bg-black/75
                backdrop-blur-[7px]
                md:hidden
              "
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.42,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                fixed
                bottom-0
                left-0
                top-0
                z-[99998]
                flex
                w-[82%]
                max-w-[390px]
                flex-col
                overflow-hidden
                border-r
                border-white/[0.08]
                bg-[#070709]
                shadow-[20px_0_70px_rgba(0,0,0,0.55)]
                md:hidden
              "
              style={{
                paddingTop:
                  "env(safe-area-inset-top)",
                paddingBottom:
                  "env(safe-area-inset-bottom)",
              }}
            >
              {/* DRAWER HEADER */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-white/[0.07]
                  bg-[#070709]
                  px-5
                  py-4
                "
              >
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3"
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/[0.08]
                      bg-white/[0.04]
                    "
                  >
                    <img
                      src="/images/gculture.png"
                      alt="G-Culture"
                      className="h-9 w-9 object-contain"
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-[13px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-white
                      "
                    >
                      G-Culture
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[12px]
                        uppercase
                        tracking-[0.2em]
                        text-white/30
                      "
                    >
                      Wear your culture
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    text-white/60
                    transition-all
                    hover:bg-white/[0.08]
                    hover:text-white
                    active:scale-90
                  "
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* CONTENT */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-x-hidden
                  overflow-y-auto
                  overscroll-contain
                  px-4
                  pb-10
                  pt-5
                "
                style={{
                  WebkitOverflowScrolling: "touch",
                  overscrollBehaviorY: "contain",
                }}
              >
                {/* ACCOUNT */}

                <Link
                  to={userInfo ? "/profile" : "/login"}
                  onClick={closeMobileMenu}
                  className="
                    mb-7
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-gradient-to-r
                    from-white/[0.045]
                    to-white/[0.02]
                    p-3
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#d4af37]/15
                      bg-[#d4af37]/10
                    "
                  >
                    <User
                      size={18}
                      className="text-[#d4af37]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        text-[12px]
                        uppercase
                        tracking-[0.16em]
                        text-white/30
                      "
                    >
                      {userInfo
                        ? "Welcome back"
                        : "Your account"}
                    </p>

                    <p className="mt-1 truncate text-[13px] font-medium text-white">
                      {userInfo
                        ? "My Profile"
                        : "Login / Register"}
                    </p>
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-white/20"
                  />
                </Link>

                {/* EXPLORE */}

                <section className="mb-8">
                  <SectionLabel label="Explore" />

                  <MobileNavLink
                    to="/shop"
                    icon={ShoppingBag}
                    label="Shop All"
                    onClick={closeMobileMenu}
                  />

                  {/* COLLECTIONS */}

                  <div className="border-b border-white/[0.055]">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileCollectionsOpen(
                          (value) => !value
                        )
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        py-3
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/[0.04]
                            bg-white/[0.035]
                          "
                        >
                          <LayoutGrid
                            size={16}
                            className="text-white/50"
                          />
                        </div>

                        <span className="text-[13px] font-medium text-white/75">
                          Collections
                        </span>
                      </div>

                      <ChevronDown
                        size={15}
                        className={`
                          text-white/30
                          transition-transform
                          duration-300
                          ${
                            mobileCollectionsOpen
                              ? "rotate-180 text-[#d4af37]"
                              : ""
                          }
                        `}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileCollectionsOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="mb-3 ml-3 border-l border-[#d4af37]/15 pl-4">
                            {collectionLinks.map(
                              (category) => (
                                <div
                                  key={category.name}
                                >
                                  <div className="flex items-center justify-between gap-3 py-2.5">
                                    <Link
                                      to={category.path}
                                      onClick={
                                        closeMobileMenu
                                      }
                                      className="
                                        flex-1
                                        text-[13px]
                                        font-medium
                                        text-white/65
                                        transition-colors
                                        active:text-white
                                      "
                                    >
                                      {category.name}
                                    </Link>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        toggleMobileCategory(
                                          category.name
                                        )
                                      }
                                      className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-white/[0.04]
                                        bg-white/[0.035]
                                      "
                                    >
                                      <ChevronDown
                                        size={13}
                                        className={`
                                          text-white/30
                                          transition-transform
                                          ${
                                            mobileActiveCategory ===
                                            category.name
                                              ? "rotate-180 text-[#d4af37]"
                                              : ""
                                          }
                                        `}
                                      />
                                    </button>
                                  </div>

                                  <AnimatePresence initial={false}>
                                    {mobileActiveCategory ===
                                      category.name && (
                                      <motion.div
                                        initial={{
                                          height: 0,
                                          opacity: 0,
                                        }}
                                        animate={{
                                          height: "auto",
                                          opacity: 1,
                                        }}
                                        exit={{
                                          height: 0,
                                          opacity: 0,
                                        }}
                                        className="overflow-hidden"
                                      >
                                        <div className="pb-2">
                                          {category.types.map(
                                            (type) => (
                                              <Link
                                                key={
                                                  type.name
                                                }
                                                to={type.path}
                                                onClick={
                                                  closeMobileMenu
                                                }
                                                className="
                                                  flex
                                                  items-center
                                                  gap-2
                                                  py-2
                                                  pl-2
                                                  text-[12px]
                                                  text-white/40
                                                  transition-colors
                                                  active:text-[#d4af37]
                                                "
                                              >
                                                <span className="h-1 w-1 rounded-full bg-white/20" />
                                                {type.name}
                                              </Link>
                                            )
                                          )}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <MobileNavLink
                    to="/latest-drops"
                    icon={Flame}
                    label="Latest Drops"
                    onClick={closeMobileMenu}
                    highlight
                  />

                  <MobileNavLink
                    to="/about"
                    icon={Info}
                    label="About Us"
                    onClick={closeMobileMenu}
                  />

                  <MobileNavLink
                    to="/contact"
                    icon={Phone}
                    label="Contact Us"
                    onClick={closeMobileMenu}
                  />
                </section>

                {/* ACCOUNT */}

                <section className="mb-8">
                  <SectionLabel label="Account" />

                  <MobileNavLink
                    to="/orders"
                    icon={Package}
                    label="My Orders"
                    onClick={closeMobileMenu}
                  />

                  <MobileNavLink
                    to="/wishlist"
                    icon={BookHeart}
                    label="Wishlist"
                    badge={
                      wishlist.length > 0
                        ? wishlist.length
                        : null
                    }
                    onClick={closeMobileMenu}
                  />

                  <MobileNavLink
                    to="/cart"
                    icon={ShoppingBag}
                    label="Cart"
                    badge={
                      cartItems.length > 0
                        ? cartItems.length
                        : null
                    }
                    onClick={closeMobileMenu}
                  />
                </section>

                {/* ADMIN */}

                {userInfo?.isAdmin && (
                  <section className="mb-8">
                    <div className="mb-4 h-px bg-[#d4af37]/10" />

                    <MobileNavLink
                      to="/admin/dashboard"
                      icon={LayoutGrid}
                      label="Admin Dashboard"
                      onClick={closeMobileMenu}
                      highlight
                    />
                  </section>
                )}

                {/* FOOTER */}

                <div className="relative mt-5 pb-5 pt-8 text-center">
                  <div className="absolute left-1/2 top-0 h-px w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent" />

                  <div className="mb-2 flex items-center justify-center gap-2">
                    <Sparkles
                      size={11}
                      className="text-[#d4af37]/40"
                    />

                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.25em]
                        text-white/25
                      "
                    >
                      G-Culture
                    </p>

                    <Sparkles
                      size={11}
                      className="text-[#d4af37]/40"
                    />
                  </div>

                  <p className="text-[11px] text-white/25">
                    Wear your culture.
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({ label }) {
  return (
    <div className="mb-2 flex items-center gap-3 px-2">
      <p
        className="
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-white/30
        "
      >
        {label}
      </p>

      <div className="h-px flex-1 bg-white/[0.05]" />
    </div>
  );
}

/* =========================================================
   MOBILE NAV LINK
========================================================= */

function MobileNavLink({
  to,
  icon: Icon,
  label,
  onClick,
  badge,
  highlight = false,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        justify-between
        border-b
        border-white/[0.055]
        py-3
        transition-all
        active:scale-[0.985]
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            ${
              highlight
                ? "border-[#d4af37]/15 bg-[#d4af37]/10"
                : "border-white/[0.04] bg-white/[0.035]"
            }
          `}
        >
          <Icon
            size={16}
            strokeWidth={1.5}
            className={
              highlight
                ? "text-[#d4af37]"
                : "text-white/45 group-active:text-[#d4af37]"
            }
          />
        </div>

        <span
          className={`
            truncate
            text-[14px]
            font-medium
            ${
              highlight
                ? "text-[#d4af37]"
                : "text-white/70 group-active:text-white"
            }
          `}
        >
          {label}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {badge && (
          <span
            className="
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-[#d4af37]
              px-1
              text-[10px]
              font-bold
              text-black
            "
          >
            {badge}
          </span>
        )}

        <ChevronRight
          size={14}
          strokeWidth={1.5}
          className="
            text-white/20
            transition-all
            group-active:translate-x-0.5
            group-active:text-[#d4af37]
          "
        />
      </div>
    </Link>
  );
}