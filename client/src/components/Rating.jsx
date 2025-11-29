import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Rating({ value = 0, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ fontSize: `${size}px` }}>
          {value >= star ? (
            <FaStar />
          ) : value >= star - 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
    </div>
  );
}
