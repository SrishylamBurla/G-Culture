import { Link } from "react-router-dom";

export default function MobileMenu({ setMenuOpen }) {
  return (
    <div
      className="fixed inset-0 z-[999999] bg-black/90 text-white 
                 transform transition-transform duration-500 ease-in-out
                 animate-[slideInRight_0.5s_ease-out] overflow-x-hidden"
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-5 right-5 text-gray-300 hover:text-white text-3xl"
      >
        ✕
      </button>

      <nav className="flex flex-col items-center justify-center space-y-6 h-full text-2xl font-light">
        {[
          { name: "Street wear", path: "/streetwear" },
          { name: "Casual wear", path: "/casualwear" },
          { name: "Caps", path: "/caps" },
          { name: "Chest bags", path: "/chestbags" },
        ].map((cat) => (
          <Link
            key={cat.name}
            to={cat.path}
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-400 transition-transform transform hover:scale-105"
          >
            {cat.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
