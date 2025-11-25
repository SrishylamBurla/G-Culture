// import { Link } from "react-router-dom";

// export default function Footer() {
//   return (
//     <footer className="font-sans transition-all duration-700 ease-in-out 
//       bg-[#5e503f] text-gray-300">

//       <div className="p-4 md:p-4 lg:p-6 xl:p-8">

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

//           {/* Brand */}
//           <div>
//             <Link to="/">
//               <img
//                 src="/images/gculture.png"
//                 alt="Logo"
//                 className="w-20 md:w-25 mb-4"
//               />
//             </Link>
//             <p className="text-sm leading-relaxed text-gray-300">
//               A pioneering force in Indian fashion since 2015, celebrating
//               individuality with iconic brands — G-Culture & GC.
//             </p>
//             <Link
//               to="/about-us"
//               className="text-sm underline text-gray-300 hover:text-white mt-3 inline-block"
//             >
//               Learn More
//             </Link>
//           </div>

//           {/* Company */}
//           <div>
//             <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
//               Company
//             </h4>
//             <ul className="space-y-2 text-sm">
//               <li><Link to="/my-account" className="hover:text-white">My Account</Link></li>
//               <li><Link to="/returns" className="hover:text-white">Returns / Exchange</Link></li>
//               <li><Link to="/order-tracking" className="hover:text-white">Order Tracking</Link></li>
//               <li><Link to="/store-locator" className="hover:text-white">Store Locator</Link></li>
//               <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
//               <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
//             </ul>
//           </div>

//           {/* Customer Care */}
//           <div>
//             <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
//               Customer Care
//             </h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <a
//                   href="https://mail.google.com/mail/?view=cm&fs=1&to=support@gculture.in"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-white"
//                 >
//                   Contact Us
//                 </a>
//               </li>
//               <li><Link to="/shipping" className="hover:text-white">Shipping Policy</Link></li>
//               <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
//               <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
//               Stay Updated
//             </h4>

//             <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 px-4 py-2 text-sm bg-transparent border 
//                 border-gray-400 rounded-md focus:outline-none focus:ring-2 
//                 focus:ring-blue-300 text-gray-200 placeholder-gray-400"
//               />
//               <button
//                 type="submit"
//                 className="bg-white text-[#0a192f] text-sm px-5 py-2 rounded-md 
//                 font-semibold hover:bg-gray-300 transition"
//               >
//                 Subscribe
//               </button>
//             </form>

//             {/* Social Icons */}
//             <div className="mt-6 flex space-x-5 text-gray-300">
//               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
//                 <i className="fa-brands fa-instagram text-lg"></i>
//               </a>
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
//                 <i className="fa-brands fa-facebook text-lg"></i>
//               </a>
//               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
//                 <i className="fa-brands fa-linkedin text-lg"></i>
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-500 my-5"></div>

//         <div className="text-center text-xs text-gray-400">
//           <p>© {new Date().getFullYear()} The House of Styles. All Rights Reserved.</p>
//           <p className="mt-1">G-Culture & GC are trademarks under The House of Styles.</p>
//         </div>

//       </div>
//     </footer>
//   );
// }


import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="
        font-sans bg-[#0a0a0c]
        text-gray-300
        border-t border-white/10
        backdrop-blur-xl
        relative overflow-hidden
      "
    >

      {/* glowing gradients */}
      <div className="pointer-events-none absolute -top-40 left-0 w-[380px] h-[380px] bg-[#d4af37]/15 blur-[150px]"></div>
      <div className="pointer-events-none absolute -bottom-40 right-0 w-[380px] h-[380px] bg-[#bb8f30]/10 blur-[150px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 max-w-[1400px] mx-auto p-2 md:p-4 lg:p-6"
      >

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* BRAND SECTION */}
          <div>
            <Link to="/">
              <img
                src="/images/gculture.png"
                alt="Logo"
                className="w-24 mb-4 opacity-90 hover:opacity-100 transition"
              />
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed">
              A pioneering force in Indian fashion — crafting identity through
              design, culture & confidence.
            </p>

            <Link
              to="/about-us"
              className="inline-block mt-3 text-sm text-gray-300 hover:text-white underline underline-offset-4"
            >
              Learn More
            </Link>
          </div>
    <div className="grid grid-cols-2 md:grid-cols-2">
          {/* COMPANY LINKS */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest mb-5 uppercase">
              Company
            </h4>

            <ul className="space-y-2 text-sm">
              <li><Link to="/my-account" className="hover:text-white">My Account</Link></li>
              <li><Link to="/returns" className="hover:text-white">Returns & Exchanges</Link></li>
              <li><Link to="/order-tracking" className="hover:text-white">Order Tracking</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest mb-5 uppercase">
              Support
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:support@gculture.in"
                  className="hover:text-white"
                >
                  Contact Support
                </a>
              </li>
              <li><Link to="/shipping" className="hover:text-white">Shipping Policy</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
</div>
          {/* NEWSLETTER */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest mb-5 uppercase">
              Stay Updated
            </h4>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  px-4 py-2 text-sm
                  bg-white/5 border border-white/15
                  rounded-md text-gray-200
                  placeholder-gray-400
                  focus:ring-2 focus:ring-[#d4af37]/30
                  outline-none
                "
              />

              <button
                type="submit"
                className="
                  bg-[#d4af37]
                  text-black font-semibold text-sm
                  px-5 py-2 rounded-md
                  hover:bg-[#c09b33] transition
                "
              >
                Subscribe
              </button>
            </form>

            {/* SOCIALS */}
            <div className="mt-6 flex space-x-5 text-gray-300 text-xl">
              <a href="https://instagram.com" target="_blank" className="hover:text-white">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" className="hover:text-white">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" className="hover:text-white">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="border-t border-white/10 mt-10 pt-5 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} G-Culture. All Rights Reserved.</p>
          <p className="mt-1 opacity-70">
            Fashion for creators. Built with intention — worn with confidence.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
