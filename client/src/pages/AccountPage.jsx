import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { User } from "lucide-react";

export default function AccountPage() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      {/* Floating Profile Icon (bottom-right) */}
      <Link
        to={userInfo ? "/profile" : "/login"}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#d4af37] rounded-full shadow-lg shadow-[#d4af37]/20 flex items-center justify-center hover:bg-[#c09b33] hover:scale-110 hover:shadow-xl hover:shadow-[#d4af37]/30 transition-all duration-300 z-[50] group"
      >
        {userInfo?.avatar ? (
          <img
            src={userInfo.avatar}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-[#d4af37]"
          />
        ) : (
          <User
            size={22}
            className="text-black group-hover:scale-110 transition-transform duration-200"
          />
        )}

        {/* Online Indicator */}
        {userInfo && (
          <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-green-400 border-2 border-[#050507] rounded-full" />
        )}
      </Link>
    </>
  );
}
