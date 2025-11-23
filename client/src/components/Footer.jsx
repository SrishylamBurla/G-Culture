import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="font-sans transition-all duration-700 ease-in-out 
      bg-gradient-to-r from-[#0a192f] via-[#0b335e] to-[#0a192f] text-gray-300">

      <div className="p-4 md:p-4 lg:p-6 xl:p-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/">
              <img
                src="/images/gculture.png"
                alt="Logo"
                className="w-20 md:w-25 mb-4"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-300">
              A pioneering force in Indian fashion since 2015, celebrating
              individuality with iconic brands — G-Culture & GC.
            </p>
            <Link
              to="/about-us"
              className="text-sm underline text-gray-300 hover:text-white mt-3 inline-block"
            >
              Learn More
            </Link>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/my-account" className="hover:text-white">My Account</Link></li>
              <li><Link to="/returns" className="hover:text-white">Returns / Exchange</Link></li>
              <li><Link to="/order-tracking" className="hover:text-white">Order Tracking</Link></li>
              <li><Link to="/store-locator" className="hover:text-white">Store Locator</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=support@gculture.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Contact Us
                </a>
              </li>
              <li><Link to="/shipping" className="hover:text-white">Shipping Policy</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
              Stay Updated
            </h4>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-sm bg-transparent border 
                border-gray-400 rounded-md focus:outline-none focus:ring-2 
                focus:ring-blue-300 text-gray-200 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-white text-[#0a192f] text-sm px-5 py-2 rounded-md 
                font-semibold hover:bg-gray-300 transition"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons */}
            <div className="mt-6 flex space-x-5 text-gray-300">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <i className="fa-brands fa-instagram text-lg"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <i className="fa-brands fa-facebook text-lg"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <i className="fa-brands fa-linkedin text-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-500 my-5"></div>

        <div className="text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} The House of Styles. All Rights Reserved.</p>
          <p className="mt-1">G-Culture & GC are trademarks under The House of Styles.</p>
        </div>

      </div>
    </footer>
  );
}
