
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BookHeart, Search, ShoppingBag } from "lucide-react"

export default function Header({ menuOpen, setMenuOpen }) {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchRef = useRef(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const fetchSearch = async () => {
      if (searchTerm.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/search?query=${searchTerm}`
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
    <header
      className="
        fixed top-0 w-full z-[99999]
        bg-[rgba(136,245,216,0.1)]
        backdrop-blur-md
        border-b border-white/10
        shadow-[0_2px_8px_rgba(0,0,0,0.3)]
        transition-all duration-500
        overflow-x-hidden
      "
    >
      {/* 🔝 Top Banner */}
      <div className="bg-black text-white text-center text-sm py-1">
        Free shipping for all orders! 🚚
      </div>

      {/* 🔹 Main Navigation */}
      <div ref={searchRef}>
        <div className="flex items-center justify-between px-3 py-2 relative">
          {/* LEFT: Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-md">
          <Link to="/">
              <img
                src="/images/gculture.png"
                alt="Logo"
                className="w-12 h-12 mix-blend-multiply"
              />
            </Link>
            {[
              { name: "Street wear", path: "/men/streetwear" },
              { name: "Casual wear", path: "/men/casualwear" },
              { name: "Caps", path: "/men/caps" },
              { name: "Chest bags", path: "/men/chestbags" },
            ].map((cat) => (
              <Link
                rel="prefetch"
                key={cat.name}
                to={cat.path}
                className="hidden relative group text-md hover:text-yellow-400 tracking-normal bg-clip-text transition-colors duration-300 text-gray-800"
              >
                {cat.name}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-[#0f6ed4] via-[#a01cb2] to-[#de8328] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* 🍔 BURGER MENU (Mobile) */}
            <div className="flex justify-center items-center gap-2">
          
          <button
            className="burger-btn md:hidden flex flex-col space-y-[5px] focus:outline-none z-[10001]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            ></span>
          </button>
          <Link to="/">
              <img
                src="/images/gculture.png"
                alt="Logo"
                className="w-7 h-7 md:hidden"
              />
            </Link>
          </div>

          {/* RIGHT: Search + Icons */}
          <div className="flex items-center space-x-3 text-xl relative pr-2">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center bg-amber-50 border rounded-xs border-gray-300 gap-1 px-1 py-1 w-[300px] h-[30px] shadow-sm">
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 outline-none text-sm text-gray-800 pl-2 placeholder-gray-500 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={handleSearch}>
                <Search className="text-black cursor-pointer" size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile Search Icon */}
            {!showSearch && (
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="md:hidden flex items-center justify-center"
              >
                <Search className="text-black cursor-pointer" size={24} strokeWidth={1.5} />
              </button>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              <BookHeart className="text-black" size={24} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 text-white bg-black border-red-100 text-xs px-1 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingBag className="text-black" size={24} strokeWidth={1.5} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 text-white bg-black border-red-100 text-[10px] md:text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* 🔍 Mobile Search Overlay */}
        {showSearch && (
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              showSearch ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center bg-[#06193b] backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full bg-gray-100 px-2 py-2 text-sm text-gray-800 focus:bg-gray-50 transition-all duration-300 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  autoFocus={showSearch}
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Search className="text-black" size={20} strokeWidth={1.5} />
                </button>
              </div>
              <button
                onClick={() => setShowSearch(false)}
                className="text-black px-1 py-2 bg-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
