import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BookHeart, Search, ShoppingBag, ChevronDown } from "lucide-react";

export default function Header({ menuOpen, setMenuOpen }) {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchRef = useRef(null);

  const [scrollDir, setScrollDir] = useState("up");
const [lastY, setLastY] = useState(0);

useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    const currentY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (currentY > lastY + 6) {
          setScrollDir("down");
        } else if (currentY < lastY - 6) {
          setScrollDir("up");
        }
        setLastY(currentY);
        ticking = false;
      });

      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, [lastY]);

// Smooth fade + blur intensity
const headerOpacity = scrollDir === "down" ? 0 : 1;
const headerTranslate = scrollDir === "down" ? -40 : 0;
const headerBlur = scrollDir === "down" ? "blur(18px)" : "blur(6px)";
const headerBackdrop = scrollDir === "down" ? "rgba(10,10,10,0.2)" : "rgba(10,10,10,0.55)";


  // const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const opacity = scrollY > 80 ? 0 : 1 - scrollY / 80;
  // const translateY = scrollY > 80 ? -20 : -(scrollY / 12);

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
          `${
            import.meta.env.VITE_API_URL
          }/api/products/search?query=${searchTerm}`
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
    }
  };

  return (
    // <header className="fixed top-0 w-full z-[99999] bg-[#0a0908] shadow-md">
    // <header
    //   className="fixed top-0 w-full z-[99999] bg-[#0a0908] shadow-md backdrop-blur-xl transition-all duration-300"
    //   style={{
    //     opacity: opacity,
    //     transform: `translateY(${translateY}px)`,
    //   }}
    // >

    <header
  className="
    fixed top-0 left-0 w-full z-[99999]
    transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]
    border-b border-white/5
    backdrop-saturate-150
  "
  style={{
    opacity: headerOpacity,
    transform: `translateY(${headerTranslate}px)`,
    backdropFilter: headerBlur,
    background: headerBackdrop,
  }}
>

      <div className="bg-black text-white text-center text-sm py-1">
        Free shipping for all orders! 🚚
      </div>

      <div ref={searchRef}>
        <div className="flex items-center justify-between px-3 py-2 relative">
          {/* LEFT NAV */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-md text-gray-800">
            <Link to="/">
              <img
                src="/images/gculture.png"
                alt="Logo"
                className="w-12 h-12"
              />
            </Link>

            {[
              { name: "Street wear", path: "/streetwear" },
              { name: "Casual wear", path: "/casualwear" },
              { name: "Caps", path: "/caps" },
              { name: "Chest bags", path: "/chestbags" },
            ].map((cat) => (
              <Link
                rel="prefetch"
                key={cat.name}
                to={cat.path}
                className="relative group text-md hover:text-yellow-500 transition text-gray-200"
              >
                {cat.name}
                <span
                  className="absolute left-0 bottom-[-4px] w-0 h-[2px] 
                  bg-gradient-to-r from-[#0f6ed4] via-[#a01cb2] to-[#de8328] 
                  transition-all duration-300 group-hover:w-full"
                ></span>
              </Link>
            ))}
          </nav>

          {/* MOBILE BURGER + LOGO */}
          <div className="flex md:hidden items-center gap-3">
            <button
              className="burger-btn md:hidden flex flex-col space-y-[5px]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                className={`w-6 h-[2px] bg-white transition-all ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-[2px] bg-white transition-all ${
                  menuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-6 h-[2px] bg-white transition-all ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              ></span>
            </button>

            <Link to="/">
              <img src="/images/gculture.png" alt="Logo" className="w-7 h-7" />
            </Link>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center space-x-3 text-xl relative pr-2">
            {/* DESKTOP SEARCH */}
            <div className="hidden md:flex items-center bg-white border rounded-xs border-gray-300 gap-1 px-1 py-1 w-[500px] shadow-sm">
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 outline-none text-sm text-gray-900 pl-2 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button onClick={handleSearch}>
                <Search className="text-black" size={22} strokeWidth={1} />
              </button>
            </div>

            {/* MOBILE SEARCH */}
            {!showSearch && (
              <button onClick={() => setShowSearch(true)} className="md:hidden">
                <Search className="text-white" size={24} strokeWidth={1} />
              </button>
            )}

            {/* WISHLIST */}
            <Link to="/wishlist" className="relative">
              <BookHeart className="text-white" size={24} strokeWidth={1} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 text-white bg-black text-xs px-1 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* CART */}
            <Link to="/cart" className="relative">
              <ShoppingBag className="text-white" size={24} strokeWidth={1} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 text-white bg-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* ADMIN DROPDOWN (ONLY IF ADMIN) */}
            {userInfo?.isAdmin && (
              <div className="relative">
                <Link
                  to={"/admin/dashboard"}
                  className="flex items-center gap-1 border-1 text-white px-2 py-1 rounded text-sm"
                >
                  Admin Panel
                </Link>

                {/* {adminMenuOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded border w-40 z-[9999]">
                    <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                    <Link to="/admin/products" className="block px-4 py-2 hover:bg-gray-100">Products</Link>
                    <Link to="/admin/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                    <Link to="/admin/users" className="block px-4 py-2 hover:bg-gray-100">Users</Link>
                  </div>
                )} */}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE SEARCH DROPDOWN */}
        {showSearch && (
          <div className="md:hidden bg-white px-3 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 px-2 py-2 text-gray-800 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              autoFocus
            />
          </div>
        )}
      </div>
    </header>
  );
}
