

// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { BookHeart, Search, ShoppingBag, ChevronDown } from "lucide-react";

// export default function Header({ menuOpen, setMenuOpen }) {
//   const { cartItems } = useSelector((state) => state.cart);
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const { userInfo } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const [showSearch, setShowSearch] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [collectionsOpen, setCollectionsOpen] = useState(false);

//   const searchRef = useRef(null);
//   const collectionsTimeout = useRef(null);

//   const [scrollDir, setScrollDir] = useState("up");
//   const [lastY, setLastY] = useState(0);

//   useEffect(() => {
//     let ticking = false;

//     const handleScroll = () => {
//       const currentY = window.scrollY;

//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           if (currentY > lastY + 6) {
//             setScrollDir("down");
//           } else if (currentY < lastY - 6) {
//             setScrollDir("up");
//           }
//           setLastY(currentY);
//           ticking = false;
//         });

//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastY]);

//   const headerOpacity = scrollDir === "down" ? 0 : 1;
//   const headerTranslate = scrollDir === "down" ? -40 : 0;
//   const headerBlur = scrollDir === "down" ? "blur(18px)" : "blur(10px)";
//   const headerBackdrop = scrollDir === "down" ? "rgba(10,10,10,0.2)" : "rgba(10,10,10,0.85)";

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSearch(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const fetchSearch = async () => {
//       if (searchTerm.trim().length < 2) {
//         setSearchResults([]);
//         return;
//       }
//       try {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/products/search?query=${searchTerm}`
//         );
//         setSearchResults(data);
//       } catch (err) {
//         console.error("Search failed:", err.message);
//       }
//     };
//     const timeout = setTimeout(fetchSearch, 300);
//     return () => clearTimeout(timeout);
//   }, [searchTerm]);

//   const handleSearch = () => {
//     if (searchTerm.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
//       setSearchTerm("");
//       setShowSearch(false);
//     }
//   };

//   const handleCollectionsEnter = () => {
//     clearTimeout(collectionsTimeout.current);
//     setCollectionsOpen(true);
//   };

//   const handleCollectionsLeave = () => {
//     collectionsTimeout.current = setTimeout(() => {
//       setCollectionsOpen(false);
//     }, 200);
//   };

//   const collectionLinks = [
//     { name: "Street Wear", path: "/streetwear" },
//     { name: "Casual Wear", path: "/casualwear" },
//     { name: "Caps", path: "/caps" },
//     { name: "Chest Bags", path: "/chestbags" },
//   ];

//   return (
//     <header
//       className="fixed top-0 left-0 w-full z-[99999] transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] border-b border-white/10 backdrop-saturate-150"
//       style={{
//         opacity: headerOpacity,
//         transform: `translateY(${headerTranslate}px)`,
//         backdropFilter: headerBlur,
//         background: headerBackdrop,
//       }}
//     >
//       {/* Top Banner */}
//       <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white text-center text-xs tracking-widest uppercase py-1.5 font-medium">
//         Free shipping on all orders 🚚
//       </div>

//       <div ref={searchRef}>
//         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 relative">
//           {/* LEFT: Logo + Nav */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link to="/">
//               <img
//                 src="/images/gculture.png"
//                 alt="Logo"
//                 className="w-10 h-10"
//               />
//             </Link>

//             <nav className="flex items-center space-x-6 text-sm font-medium tracking-wide Capitalize">
//               {/* Collections Dropdown */}
//               <div
//                 className="relative"
//                 onMouseEnter={handleCollectionsEnter}
//                 onMouseLeave={handleCollectionsLeave}
//               >
//                 <button className="flex items-center gap-1 text-gray-200 hover:text-white transition-colors duration-200">
//                   Collections
//                   <ChevronDown
//                     size={14}
//                     className={`transition-transform duration-200 ${
//                       collectionsOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {/* Dropdown Menu */}
//                 <div
//                   className={`absolute top-full left-0 mt-3 w-52 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
//                     collectionsOpen
//                       ? "opacity-100 translate-y-0 pointer-events-auto"
//                       : "opacity-0 -translate-y-2 pointer-events-none"
//                   }`}
//                 >
//                   {collectionLinks.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.path}
//                       className="block px-5 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-150 border-b border-white/5 last:border-0"
//                       onClick={() => setCollectionsOpen(false)}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               <Link
//                 to="/latest-drops"
//                 className="text-gray-200 hover:text-white transition-colors duration-200"
//               >
//                 Latest Drops
//               </Link>

//               <Link
//                 to="/about"
//                 className="text-gray-200 hover:text-white transition-colors duration-200"
//               >
//                 About Us
//               </Link>

//               <Link
//                 to="/contact"
//                 className="text-gray-200 hover:text-white transition-colors duration-200"
//               >
//                 Contact Us
//               </Link>
//             </nav>
//           </div>

//           {/* MOBILE: Burger + Logo */}
//           <div className="flex md:hidden items-center gap-3">
//             <button
//               className="burger-btn md:hidden flex flex-col space-y-[5px]"
//               onClick={() => setMenuOpen(!menuOpen)}
//             >
//               <span
//                 className={`w-6 h-[2px] bg-white transition-all ${
//                   menuOpen ? "rotate-45 translate-y-[7px]" : ""
//                 }`}
//               ></span>
//               <span
//                 className={`w-6 h-[2px] bg-white transition-all ${
//                   menuOpen ? "opacity-0" : ""
//                 }`}
//               ></span>
//               <span
//                 className={`w-6 h-[2px] bg-white transition-all ${
//                   menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
//                 }`}
//               ></span>
//             </button>

//             <Link to="/">
//               <img src="/images/gculture.png" alt="Logo" className="w-7 h-7" />
//             </Link>
//           </div>

//           {/* RIGHT: Search + Icons */}
//           <div className="flex items-center space-x-4 text-xl relative">
//             {/* Desktop Search */}
//             <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full gap-1 px-4 py-2 w-[280px] focus-within:border-white/30 transition-colors duration-200">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="flex-1 outline-none text-sm text-gray-200 placeholder-gray-500 bg-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//               />
//               <button onClick={handleSearch}>
//                 <Search className="text-gray-400 hover:text-white transition-colors" size={18} strokeWidth={1.5} />
//               </button>
//             </div>

//             {/* Mobile Search Toggle */}
//             {!showSearch && (
//               <button onClick={() => setShowSearch(true)} className="md:hidden">
//                 <Search className="text-white" size={22} strokeWidth={1.5} />
//               </button>
//             )}

//             {/* Wishlist */}
//             <Link to="/wishlist" className="relative group">
//               <BookHeart className="text-gray-300 group-hover:text-white transition-colors" size={22} strokeWidth={1.5} />
//               {wishlist.length > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 text-white bg-red-500 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
//                   {wishlist.length}
//                 </span>
//               )}
//             </Link>

//             {/* Cart */}
//             <Link to="/cart" className="relative group">
//               <ShoppingBag className="text-gray-300 group-hover:text-white transition-colors" size={22} strokeWidth={1.5} />
//               {cartItems.length > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 text-white bg-red-500 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
//                   {cartItems.length}
//                 </span>
//               )}
//             </Link>

//             {/* Admin Panel Link */}
//             {userInfo?.isAdmin && (
//               <Link
//                 to="/admin/dashboard"
//                 className="hidden md:inline-flex items-center text-xs font-medium uppercase tracking-wider text-gray-300 border border-white/20 hover:border-white/40 hover:text-white px-3 py-1.5 rounded-full transition-all duration-200"
//               >
//                 Admin
//               </Link>
//             )}
//           </div>
//         </div>

//         {/* Mobile Search Dropdown */}
//         {showSearch && (
//           <div className="md:hidden bg-black/90 px-4 py-3 border-t border-white/5">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 rounded-full outline-none focus:border-white/30"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//               autoFocus
//             />
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BookHeart, Search, ShoppingBag, ChevronDown, ChevronRight } from "lucide-react";

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

  const searchRef = useRef(null);
  const collectionsTimeout = useRef(null);

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

  const collectionLinks = [
    {
      name: "Street Wear",
      path: "/streetwear",
      types: [
        { name: "Oversized T-Shirts", path: "/streetwear?subcategory=oversized-tshirts" },
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
      <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white text-center text-xs tracking-widest uppercase py-1.5 font-medium">
        Free shipping on all orders 🚚
      </div>

      <div ref={searchRef}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 relative">
          {/* LEFT: Logo + Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/">
              <img
                src="/images/gculture.png"
                alt="Logo"
                className="w-10 h-10"
              />
            </Link>

            <nav className="flex items-center space-x-6 text-sm font-medium tracking-wide capitalize">
              {/* Collections Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleCollectionsEnter}
                onMouseLeave={handleCollectionsLeave}
              >
                <button className="flex items-center gap-1 text-gray-200 hover:text-white transition-colors duration-200">
                  Collections
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      collectionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mega Dropdown */}
                <div
                  className={`absolute top-full left-0 mt-3 flex bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
                    collectionsOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {/* Categories Column */}
                  <div className="w-52 border-r border-white/5">
                    <p className="px-5 pt-4 pb-2 text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/50 font-semibold">
                      Categories
                    </p>
                    {collectionLinks.map((item) => (
                      <div
                        key={item.name}
                        onMouseEnter={() => setActiveCollection(item.name)}
                        className={`relative ${
                          activeCollection === item.name
                            ? "bg-white/[0.06]"
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

                  {/* Types Column */}
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
                                className="block px-5 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-150"
                                onClick={() => {
                                  setCollectionsOpen(false);
                                  setActiveCollection(null);
                                }}
                              >
                                {type.name}
                              </Link>
                            ))}
                          </div>
                        )
                    )}

                    {/* Default state when no category hovered */}
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
                className="text-gray-200 hover:text-white transition-colors duration-200"
              >
                Latest Drops
              </Link>

              <Link
                to="/about"
                className="text-gray-200 hover:text-white transition-colors duration-200"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="text-gray-200 hover:text-white transition-colors duration-200"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* MOBILE: Burger + Logo */}
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
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full gap-1 px-4 py-2 w-[280px] focus-within:border-white/30 transition-colors duration-200">
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
                  className="text-gray-400 hover:text-white transition-colors"
                  size={18}
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* Mobile Search Toggle */}
            {!showSearch && (
              <button onClick={() => setShowSearch(true)} className="md:hidden">
                <Search className="text-white" size={22} strokeWidth={1.5} />
              </button>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" className="relative group">
              <BookHeart
                className="text-gray-300 group-hover:text-white transition-colors"
                size={22}
                strokeWidth={1.5}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 text-white bg-red-500 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <ShoppingBag
                className="text-gray-300 group-hover:text-white transition-colors"
                size={22}
                strokeWidth={1.5}
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 text-white bg-red-500 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Admin Panel Link */}
            {userInfo?.isAdmin && (
              <Link
                to="/admin/dashboard"
                className="hidden md:inline-flex items-center text-xs font-medium uppercase tracking-wider text-gray-300 border border-white/20 hover:border-white/40 hover:text-white px-3 py-1.5 rounded-full transition-all duration-200"
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {showSearch && (
          <div className="md:hidden bg-black/90 px-4 py-3 border-t border-white/5">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 rounded-full outline-none focus:border-white/30"
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
