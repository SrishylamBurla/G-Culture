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

  // Mobile-specific
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

  const searchRef = useRef(null);
  const collectionsTimeout = useRef(null);

  const [scrollDir, setScrollDir] = useState("up");
  const [lastY, setLastY] = useState(0);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentY > lastY + 6) setScrollDir("down");
          else if (currentY < lastY - 6) setScrollDir("up");
          setLastY(currentY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  const headerOpacity = scrollDir === "down" ? 0 : 1;
  const headerTranslate = scrollDir === "down" ? -40 : 0;
  const headerBlur = scrollDir === "down" ? "blur(18px)" : "blur(10px)";
  const headerBackdrop =
    scrollDir === "down" ? "rgba(10,10,10,0.2)" : "rgba(10,10,10,0.85)";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSearch = async () => {
      if (searchTerm.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/search?query=${searchTerm}`,
        );
        setSearchResults(data);
      } catch (err) {
        console.error("Search failed:", err.message);
      }
    };
    const timeout = setTimeout(fetchSearch, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setShowSearch(false);
      setMenuOpen(false);
    }
  };

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

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileCollectionsOpen(false);
    setMobileActiveCategory(null);
  };

  const collectionLinks = [
    {
      name: "Street Wear",
      path: "/streetwear",
      types: [
        {
          name: "Oversized T-Shirts",
          path: "/streetwear?subcategory=oversized-tshirts",
        },
        { name: "Hoodies", path: "/streetwear?subcategory=hoodies" },
        { name: "Joggers", path: "/streetwear?subcategory=joggers" },
        { name: "Jackets", path: "/streetwear?subcategory=jackets" },
      ],
    },
    {
      name: "Casual Wear",
      path: "/casualwear",
      types: [
        { name: "Shirts", path: "/casualwear?subcategory=shirts" },
        { name: "Trousers", path: "/casualwear?subcategory=trousers" },
        { name: "Polos", path: "/casualwear?subcategory=polos" },
        { name: "Shorts", path: "/casualwear?subcategory=shorts" },
      ],
    },
    {
      name: "Caps",
      path: "/caps",
      types: [
        { name: "Sports", path: "/caps?subcategory=sports" },
        { name: "Casual", path: "/caps?subcategory=casual" },
        { name: "Snapback", path: "/caps?subcategory=snapback" },
        { name: "Bucket", path: "/caps?subcategory=bucket" },
        { name: "Trucker", path: "/caps?subcategory=trucker" },
      ],
    },
    {
      name: "Chest Bags",
      path: "/chestbags",
      types: [
        { name: "Sports", path: "/chestbags?subcategory=sports" },
        { name: "Casual", path: "/chestbags?subcategory=casual" },
        { name: "Kids", path: "/chestbags?subcategory=kids" },
        { name: "Formal", path: "/chestbags?subcategory=formal" },
      ],
    },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-[99999] transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] border-b border-white/10 backdrop-saturate-150"
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerTranslate}px)`,
          backdropFilter: headerBlur,
          background: headerBackdrop,
        }}
      >
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-[#0a0a0c] via-[#d4af37]/10 to-[#0a0a0c] text-[#d4af37] text-center text-[10px] md:text-xs tracking-widest uppercase py-1.5 font-medium">
          Free shipping on all orders
        </div>

        <div ref={searchRef}>
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 relative">
            {/* LEFT: Logo + Nav (Desktop) */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/">
                <img
                  src="/images/gculture.png"
                  alt="Logo"
                  className="w-10 h-10"
                />
              </Link>

              <nav className="flex items-center space-x-6 text-sm font-medium tracking-wide capitalize">
                <Link
                  to="/shop"
                  className="text-gray-200 hover:text-[#d4af37] transition-colors duration-200"
                >
                  Shop
                </Link>

                {/* Collections Mega Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={handleCollectionsEnter}
                  onMouseLeave={handleCollectionsLeave}
                >
                  <button className="flex items-center gap-1 text-gray-200 hover:text-[#d4af37] transition-colors duration-200">
                    Collections
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        collectionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute top-full left-0 mt-3 flex bg-[#0a0a0c]/98 backdrop-blur-xl border border-[#d4af37]/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden transition-all duration-300 ${
                      collectionsOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="w-52 border-r border-[#d4af37]/5">
                      <p className="px-5 pt-4 pb-2 text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/50 font-semibold">
                        Categories
                      </p>
                      {collectionLinks.map((item) => (
                        <div
                          key={item.name}
                          onMouseEnter={() => setActiveCollection(item.name)}
                          className={`relative ${
                            activeCollection === item.name
                              ? "bg-[#d4af37]/5"
                              : ""
                          }`}
                        >
                          <Link
                            to={item.path}
                            className="flex items-center justify-between px-5 py-3 text-sm text-gray-300 hover:text-white transition-all duration-150"
                            onClick={() => {
                              setCollectionsOpen(false);
                              setActiveCollection(null);
                            }}
                          >
                            {item.name}
                            <ChevronRight
                              size={12}
                              className={`text-[#d4af37]/40 transition-all duration-200 ${
                                activeCollection === item.name
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 -translate-x-1"
                              }`}
                            />
                          </Link>
                        </div>
                      ))}
                    </div>

                    <div className="w-52">
                      {collectionLinks.map(
                        (item) =>
                          activeCollection === item.name && (
                            <div key={item.name}>
                              <p className="px-5 pt-4 pb-2 text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/50 font-semibold">
                                Types
                              </p>
                              {item.types.map((type) => (
                                <Link
                                  key={type.name}
                                  to={type.path}
                                  className="block px-5 py-3 text-sm text-gray-400 hover:text-white hover:bg-[#d4af37]/5 transition-all duration-150"
                                  onClick={() => {
                                    setCollectionsOpen(false);
                                    setActiveCollection(null);
                                  }}
                                >
                                  {type.name}
                                </Link>
                              ))}
                            </div>
                          ),
                      )}
                      {!activeCollection && (
                        <div className="flex items-center justify-center h-full min-h-[200px] px-6">
                          <p className="text-xs text-gray-600 text-center">
                            Hover a category to see types
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Link
                  to="/latest-drops"
                  className="text-gray-200 hover:text-[#d4af37] transition-colors duration-200"
                >
                  Latest Drops
                </Link>

                <Link
                  to="/about"
                  className="text-gray-200 hover:text-[#d4af37] transition-colors duration-200"
                >
                  About Us
                </Link>

                <Link
                  to="/contact"
                  className="text-gray-200 hover:text-[#d4af37] transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </nav>
            </div>

            {/* MOBILE: Burger + Logo */}
            <div className="flex md:hidden items-center gap-3">
              <button
                className="flex flex-col space-y-[5px]"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span
                  className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </button>

              <Link to="/" onClick={closeMobileMenu}>
                <img
                  src="/images/gculture.png"
                  alt="Logo"
                  className="w-7 h-7"
                />
              </Link>
            </div>

            {/* RIGHT: Search + Icons */}
            <div className="flex items-center space-x-4 text-xl relative">
              {/* Desktop Search */}
              <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full gap-1 px-4 py-2 w-[280px] focus-within:border-[#d4af37]/30 transition-colors duration-200">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 outline-none text-sm text-gray-200 placeholder-gray-500 bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch}>
                  <Search
                    className="text-gray-400 hover:text-[#d4af37] transition-colors"
                    size={18}
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              {/* Mobile Search Toggle */}
              {!showSearch && (
                <button
                  onClick={() => setShowSearch(true)}
                  className="md:hidden"
                >
                  <Search className="text-white" size={20} strokeWidth={1.5} />
                </button>
              )}

              {/* Wishlist */}
              <Link to="/wishlist" className="relative group">
                <BookHeart
                  className="text-gray-300 group-hover:text-[#d4af37] transition-colors"
                  size={20}
                  strokeWidth={1.5}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-black bg-[#d4af37] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative group">
                <ShoppingBag
                  className="text-gray-300 group-hover:text-[#d4af37] transition-colors"
                  size={20}
                  strokeWidth={1.5}
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-black bg-[#d4af37] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {/* Admin */}
              {userInfo?.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="hidden md:inline-flex items-center text-xs font-medium uppercase tracking-wider text-[#d4af37]/70 border border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:text-[#d4af37] px-3 py-1.5 rounded-full transition-all duration-200"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Search Dropdown */}
          {showSearch && (
            <div className="md:hidden bg-[#0a0a0c] px-4 py-3 border-t border-[#d4af37]/5">
              <div className="flex items-center bg-white/5 border border-[#d4af37]/10 rounded-full px-4 py-2.5 focus-within:border-[#d4af37]/30">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 outline-none text-sm text-white placeholder-gray-500 bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  autoFocus
                />
                <button onClick={() => setShowSearch(false)}>
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ═══════════════════════════════════════════════ */}
      {/* MOBILE FULLSCREEN MENU                          */}
      {/* ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#050507] z-[99998] overflow-y-auto pt-24 pb-10"
          >
            <nav className="px-6 space-y-1">
              {/* SHOP */}
              <MobileNavLink
                to="/shop"
                icon={ShoppingBag}
                label="Shop All"
                onClick={closeMobileMenu}
              />

              {/* COLLECTIONS — Expandable */}
              <div>
                <button
                  onClick={() =>
                    setMobileCollectionsOpen(!mobileCollectionsOpen)
                  }
                  className="flex items-center justify-between w-full py-4 border-b border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                      <LayoutGrid size={16} className="text-[#d4af37]" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      Collections
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-[#d4af37]/40 transition-transform duration-200 ${
                      mobileCollectionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileCollectionsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {collectionLinks.map((cat) => (
                          <div key={cat.name}>
                            {/* Category Header */}
                            <button
                              onClick={() =>
                                setMobileActiveCategory(
                                  mobileActiveCategory === cat.name
                                    ? null
                                    : cat.name,
                                )
                              }
                              className="flex items-center justify-between w-full py-3 px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                            >
                              <Link
                                to={cat.path}
                                onClick={closeMobileMenu}
                                className="text-sm text-gray-300 hover:text-white capitalize"
                              >
                                {cat.name}
                              </Link>
                              <ChevronDown
                                size={14}
                                className={`text-[#d4af37]/30 transition-transform duration-200 ${
                                  mobileActiveCategory === cat.name
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>

                            {/* Subcategories */}
                            <AnimatePresence>
                              {mobileActiveCategory === cat.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-6 pb-2 space-y-0.5">
                                    {cat.types.map((type) => (
                                      <Link
                                        key={type.name}
                                        to={type.path}
                                        onClick={closeMobileMenu}
                                        className="block py-2.5 px-3 text-xs text-gray-500 hover:text-[#d4af37] transition-colors rounded-lg hover:bg-[#d4af37]/5"
                                      >
                                        {type.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* LATEST DROPS */}
              <MobileNavLink
                to="/latest-drops"
                icon={Flame}
                label="Latest Drops"
                onClick={closeMobileMenu}
              />

              {/* ABOUT */}
              <MobileNavLink
                to="/about"
                icon={Info}
                label="About Us"
                onClick={closeMobileMenu}
              />

              {/* CONTACT */}
              <MobileNavLink
                to="/contact"
                icon={Phone}
                label="Contact Us"
                onClick={closeMobileMenu}
              />

              {/* Divider */}
              <div className="pt-4 pb-2">
                <div className="h-px bg-[#d4af37]/10" />
              </div>

              {/* ACCOUNT LINKS */}
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/40 font-semibold px-1 pt-2 pb-3">
                Account
              </p>

              <MobileNavLink
                to={userInfo ? "/profile" : "/login"}
                icon={User}
                label={userInfo ? "My Profile" : "Login / Register"}
                onClick={closeMobileMenu}
              />

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
                onClick={closeMobileMenu}
                badge={wishlist.length || null}
              />

              <MobileNavLink
                to="/cart"
                icon={ShoppingBag}
                label="Cart"
                onClick={closeMobileMenu}
                badge={cartItems.length || null}
              />

              {/* Admin */}
              {userInfo?.isAdmin && (
                <>
                  <div className="pt-4 pb-2">
                    <div className="h-px bg-[#d4af37]/10" />
                  </div>
                  <MobileNavLink
                    to="/admin/dashboard"
                    icon={LayoutGrid}
                    label="Admin Dashboard"
                    onClick={closeMobileMenu}
                    highlight
                  />
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── MOBILE NAV LINK COMPONENT ─── */

function MobileNavLink({ to, icon: Icon, label, onClick, badge, highlight }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center justify-between py-4 border-b border-white/5 group"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center ${
            highlight ? "bg-[#d4af37]/20" : "bg-white/[0.04]"
          }`}
        >
          <Icon
            size={16}
            className={
              highlight
                ? "text-[#d4af37]"
                : "text-gray-500 group-hover:text-[#d4af37] transition-colors"
            }
          />
        </div>
        <span
          className={`text-sm font-medium ${
            highlight
              ? "text-[#d4af37]"
              : "text-gray-300 group-hover:text-white transition-colors"
          }`}
        >
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {badge && (
          <span className="bg-[#d4af37] text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {badge}
          </span>
        )}
        <ChevronRight
          size={14}
          className="text-gray-700 group-hover:text-[#d4af37]/40 transition-colors"
        />
      </div>
    </Link>
  );
}
