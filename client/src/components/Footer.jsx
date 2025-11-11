import { Link } from "react-router-dom";

export default function Footer() {
  return (
    // <footer className="bg-gradient-to-r from-[#174143] to-[#0A2647] text-white font-sans mt-20"> bg-gradient-to-b from-[#0a192f] to-[#001a36]
    <footer
      className="bg-[#001424] bg-[url('https://www.transparenttextures.com/patterns/shley-tree-1.png')] text-gray-300 font-sans transition-all duration-700 ease-in-out
"
    >
      <div className="p-4 md:p-4 lg:p-6 xl:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
          <Link to="/">
            <img
              src="/images/G-Logo.png"
              alt="Logo"
              className="w-10 md:w-16 mb-4"
            />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              A pioneering force in Indian fashion since 2015, celebrating
              individuality with iconic brands — G-Culture & GC.
            </p>
            <Link
              to="/about-us"
              className="text-sm underline hover:text-white mt-3 inline-block"
            >
              Learn More
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/my-account" className="hover:text-white">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white">
                  Returns / Exchange
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="hover:text-white">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/store-locator" className="hover:text-white">
                  Store Locator
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest mb-4 uppercase">
              Stay Updated
            </h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-sm bg-transparent border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-200 placeholder-gray-300"
              />
              <button
                type="submit"
                className="bg-white text-black text-sm px-5 py-2 rounded-md hover:bg-gray-200 transition"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-6 flex space-x-5 text-gray-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <i className="fa-brands fa-instagram text-lg"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <i className="fa-brands fa-facebook text-lg"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <i className="fa-brands fa-linkedin text-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 my-10"></div>

        {/* Bottom Note */}
        <div className="text-center text-xs text-gray-300">
          <p>
            © {new Date().getFullYear()} The House of Styles. All Rights
            Reserved.
          </p>
          <p className="mt-1">
            G-Culture & GC are trademarks under The House of Styles.
          </p>
        </div>
      </div>
    </footer>
  );
}
