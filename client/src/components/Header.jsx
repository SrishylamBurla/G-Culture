// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";

// export default function Header() {
//   const { cartItems } = useSelector((state) => state.cart);
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const navigate = useNavigate();

//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [showMenDropdown, setShowMenDropdown] = useState(false);

//   const [showSearch, setShowSearch] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const searchRef = useRef(null);

//   // Hide header on scroll down
//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     if (window.scrollY > lastScrollY && window.scrollY > 100) {
//   //       setIsVisible(false);
//   //     } else {
//   //       setIsVisible(true);
//   //     }
//   //     setLastScrollY(window.scrollY);
//   //   };
//   //   window.addEventListener("scroll", handleScroll);
//   //   return () => window.removeEventListener("scroll", handleScroll);
//   // }, [lastScrollY]);

//   // Close search when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSearch(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Debounced search
//   useEffect(() => {
//     const fetchSearch = async () => {
//       if (searchTerm.trim().length < 2) {
//         setSearchResults([]);
//         return;
//       }
//       try {
//         const { data } = await axios.get(
//           `http://localhost:5000/api/products/search?query=${searchTerm}`
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
//       navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
//       setSearchTerm("");
//       setShowSearch(false);
//     }
//   };

//   return (
//     <header
//       className="
//     sticky top-0 z-50
//     bg-[rgba(0,0,0,0.1)]
//     backdrop-blur-md
//     bg-top bg-repeat
//     border-b border-white/10
//     shadow-[0_2px_8px_rgba(0,0,0,0.3)]
//     transition-all duration-500
//   "
//     >
//       {/* <header className="sticky top-0 z-50 bg-[rgba(0,0,0,0)] backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-500"> */}
//       {/* Top banner */}
//       <div className="bg-black text-white text-center text-xs py-1">
//         Free shipping for all orders! 🚚
//       </div>

//       {/* Main Navigation */}
//       <div ref={searchRef}>
//         <div className="flex items-center justify-between px-2 md:px-3 py-1 relative">
//           {/* LEFT: MEN + Dropdown */}
//           <nav className="flex items-center space-x-8 font-medium text-sm relative">
//             <div
//               className="relative group"
//               onMouseEnter={() => setShowMenDropdown(true)}
//               onMouseLeave={() => setShowMenDropdown(false)}
//             >
//               <Link
//                 to="/shop"
//                 // className="category text-2xl md:text-3xl transition text-transparent bg-clip-text bg-gradient-to-r from-violet-900 to-purple-600 relative"
//               >
//                 <h1 className="category bg-gradient-to-b from-[#1c043f] to-[#9b6bde] px-1 text-gray-100">
//                   MEN
//                 </h1>
//               </Link>
//               <span className="absolute left-0 bottom-0 w-0 h-[5px] bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-500 group-hover:w-full"></span>

//               {/* Dropdown */}
//               <div
//                 className={`absolute left-0 w-40 bg-gradient-to-br from-[#1C1F26] to-[#1E3A5F] text-white z-50 shadow-lg transition-all duration-300 ease-in-out ${
//                   showMenDropdown
//                     ? "opacity-100 translate-y-0 visible"
//                     : "opacity-0 -translate-y-3 invisible"
//                 }`}
//                 style={{ top: "120%" }}
//               >
//                 <ul className="text-sm">
//                   {["Street wear", "Casual wear", "Caps", "Chest bags"].map(
//                     (item) => (
//                       <li key={item}>
//                         <Link
//                           to={`/men/${item.toLowerCase().replace(" ", "")}`}
//                           className="block px-5 py-3 hover:bg-gray-900 transition-colors"
//                           onClick={() => setShowMenDropdown(false)}
//                         >
//                           {item}
//                         </Link>
//                       </li>
//                     )
//                   )}
//                 </ul>
//               </div>
//             </div>
//           </nav>

//           {/* RIGHT: Icons */}
//           <div className="flex items-center space-x-5 text-xl relative">
//             {/* Desktop Search */}
//             <div className="hidden md:flex items-center bg-amber-50 border border-gray-300 px-1 py-1 w-full h-[25px] max-w-md shadow-sm transition-all duration-300">
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 className="flex-1 outline-none text-sm text-gray-800 px-2 placeholder-gray-500 bg-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//               />
//               <button
//                 onClick={handleSearch}
//                 className="text-white py-1 rounded-full text-sm"
//               >
//                 <svg
//                   className="w-4 h-4 text-gray-800 cursor-pointer "
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 18 18"
//                 >
//                   <path
//                     d="M11.1797 11.1895L14.1631 13.9994"
//                     stroke="black"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M6.96674 12.9462C10.2621 12.9462 12.9335 10.2748 12.9335 6.97943C12.9335 3.68409 10.2621 1.0127 6.96674 1.0127C3.6714 1.0127 1 3.68409 1 6.97943C1 10.2748 3.6714 12.9462 6.96674 12.9462Z"
//                     stroke="black"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Mobile Search Icon */}
//             {showSearch === false &&
//             <button
//               onClick={() => setShowSearch(!showSearch)}
//               className="md:hidden flex items-center justify-center rounded-full hover:rotate-45 transition-transform duration-300"
//             >
//               <svg
//                 className="w-5 h-5 text-gray-700"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 18 18"
//               >
//                 <path
//                   d="M11.1797 11.1895L14.1631 13.9994"
//                   stroke="white"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M6.96674 12.9462C10.2621 12.9462 12.9335 10.2748 12.9335 6.97943C12.9335 3.68409 10.2621 1.0127 6.96674 1.0127C3.6714 1.0127 1 3.68409 1 6.97943C1 10.2748 3.6714 12.9462 6.96674 12.9462Z"
//                   stroke="white"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>}
//             {/* ❤️ Wishlist */}
//             <Link to="/wishlist" className="relative">
//               <img
//                 src="https://cdn.shopify.com/s/files/1/0752/6435/files/Vector_5ef8fdd7-fe82-493a-9740-e9ce2077266f.svg?v=1738670882"
//                 alt="Wishlist"
//                 className="w-5 h-5"
//               />
//               {wishlist.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
//                   {wishlist.length}
//                 </span>
//               )}
//             </Link>

//             {/* 🛒 Cart */}
//             <Link to="/cart" className="relative">
//               <img
//                 src="https://cdn.shopify.com/s/files/1/0752/6435/files/Group_1171276473.svg?v=1738670982"
//                 alt="cart"
//                 className="w-5 h-5"
//               />
//               {cartItems.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-purple-950 text-white text-[10px] md:text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {cartItems.length}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>

//         {/* Mobile Search Overlay */}
//         {showSearch && (
//           <div
//             className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
//               showSearch ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
//             }`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex items-center bg-[#06193b] backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
//               {/* 🔍 Input box */}
//               <div className="flex-1 relative">
//                 <input
//                   type="text"
//                   placeholder="Search for products..."
//                   className="w-full bg-gray-100 px-2 py-1 text-sm text-gray-800 focus:bg-gray-50 transition-all duration-300 outline-none"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                   autoFocus={showSearch}
//                 />

//                 {/* Search icon inside input */}
//                 <button
//                   onClick={handleSearch}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 transition"
//                 >
//                   <svg
//                     className="w-4 h-4"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 18 18"
//                   >
//                     <path
//                       d="M11.1797 11.1895L14.1631 13.9994"
//                       stroke="black"
//                       strokeWidth="1.4"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M6.96674 12.9462C10.2621 12.9462 12.9335 10.2748 12.9335 6.97943C12.9335 3.68409 10.2621 1.0127 6.96674 1.0127C3.6714 1.0127 1 3.68409 1 6.97943C1 10.2748 3.6714 12.9462 6.96674 12.9462Z"
//                       stroke="black"
//                       strokeWidth="1.4"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* ❌ Close icon */}
//               <button
//                 onClick={() => setShowSearch(false)}
//                 className="text-black transition px-1 py-1 bg-gray-300"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="currentColor"
//                   className="w-5 h-5"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
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

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMenDropdown, setShowMenDropdown] = useState(false);

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
          `http://localhost:5000/api/products/search?query=${searchTerm}`
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
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setShowSearch(false);
    }
  };

  return (
    <header
      className="
    sticky top-0 z-50
    bg-[rgba(0,0,0,0.1)]
    backdrop-blur-md
    bg-top bg-repeat
    border-b border-white/10
    shadow-[0_2px_8px_rgba(0,0,0,0.3)]
    transition-all duration-500
  "
    >
      {/* Top banner */}
      <div className="bg-black text-white text-center text-xs py-1">
        Free shipping for all orders! 🚚
      </div>

      {/* Main Navigation */}
      <div ref={searchRef}>
        <div className="flex items-center justify-between px-6 md:px-8 py-1 relative">
          {/* LEFT: MEN + Dropdown */}
          <nav className="flex items-center space-x-8 font-medium text-sm relative">
            <div
              className="relative group"
              onMouseEnter={() => setShowMenDropdown(true)}
              onMouseLeave={() => setShowMenDropdown(false)}
            >
              <Link to="/shop">
                <h1 className="category bg-clip-text text-transparent bg-gradient-to-r from-[#907b02] via-[#e3c208] to-[#b27006] text-gray-100">
                  MEN
                </h1>
              </Link>
              <span className="absolute left-0 bottom-0 w-0 h-[5px] bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-500 group-hover:w-full"></span>

              {/* Dropdown */}
              <div
                className={`absolute left-0 w-40 bg-gradient-to-br from-[#1C1F26] to-[#1E3A5F] text-white z-50 shadow-lg transition-all duration-300 ease-in-out ${
                  showMenDropdown
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-3 invisible"
                }`}
                style={{ top: "120%" }}
              >
                <ul className="text-sm">
                  {["Street wear", "Casual wear", "Caps", "Chest bags"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          to={`/men/${item.toLowerCase().replace(" ", "")}`}
                          className="block px-5 py-3 hover:bg-gray-900 transition-colors"
                          onClick={() => setShowMenDropdown(false)}
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </nav>

          {/* RIGHT: Icons */}
          <div className="flex items-center space-x-5 text-xl relative">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center bg-amber-50 border rounded-xs border-gray-300 gap-1 px-1 py-1 w-full h-[25px] shadow-sm transition-all duration-300">
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 outline-none text-sm text-gray-800 pl-2 placeholder-gray-500 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="text-white py-1 rounded-full text-sm"
              >
                <img
                  src={"/images/search.png"}
                  alt="search"
                  className="w-5 h-4 transition-all duration-300 group-hover:opacity-80 cursor-pointer pr-1"
                />
              </button>
            </div>

            {/* Mobile Search Icon */}
            {!showSearch && (
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="md:hidden flex items-center justify-center rounded-full hover:rotate-45 transition-transform duration-300"
              >
                <img
                  src={"/images/search.png"}
                  alt="search"
                  className="w-5 h-4 transition-all duration-300 group-hover:opacity-80 cursor-pointer pr-1"
                />
              </button>
            )}

            {/* ❤️ Wishlist (adaptive visibility) */}
            <Link to="/wishlist" className="relative group">
              <img
                src={"/images/wishlist.png"}
                alt="Wishlist"
                className="w-6 h-5 transition-all duration-300 group-hover:opacity-80"
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 border-1 text-white text-xs px-1 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* 🛒 Cart (adaptive visibility) */}
            <Link to="/cart" className="relative group">
              <img
                src={"/images/cart.png"}
                alt="cart"
                className="w-6 h-5 transition-all duration-300 group-hover:opacity-80"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 border-1 text-white text-[10px] md:text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {showSearch && (
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              showSearch ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center bg-[#06193b] backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full bg-gray-100 px-2 py-1 text-sm text-gray-800 focus:bg-gray-50 transition-all duration-300 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  autoFocus={showSearch}
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 transition"
                >
                  <img
                    src={"/images/search.png"}
                    alt="search"
                    className="w-5 h-4 transition-all duration-300 group-hover:opacity-80 cursor-pointer pr-1"
                  />
                </button>
              </div>

              {/* ❌ Close icon */}
              <button
                onClick={() => setShowSearch(false)}
                className="text-black transition px-1 py-1 bg-gray-300"
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
