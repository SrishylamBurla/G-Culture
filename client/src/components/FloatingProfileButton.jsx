import { User2 } from "lucide-react";
import { Link } from "react-router-dom";


export default function FloatingProfileButton() {
  return (
    <Link to="/profile" className="profile-btn profile-float hover:rotate-360 transition-transform duration-300 z-10">
      <User2 size={28} strokeWidth={1.5} />
    </Link>
  );
}
