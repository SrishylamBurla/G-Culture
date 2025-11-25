import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";


export default function CategoryCard({ cat }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sX = useSpring(x, { stiffness: 120, damping: 18 });
  const sY = useSpring(y, { stiffness: 120, damping: 18 });

  return (
    <Link
      to={cat.path}
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        x.set((px - 0.5) * 14);
        y.set((py - 0.5) * -10);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="
        block rounded-2xl overflow-hidden bg-white shadow-xl
        transition-transform duration-300 hover:scale-[1.04]
      "
    >
      <motion.div
        style={{ rotateY: sX, rotateX: sY }}
        className="transform-gpu"
      >
        <img
          src={cat.img}
          alt={cat.name}
          className="w-full h-64 object-cover"
          draggable={false}
        />

        <div className="p-4 bg-amber-50">
          <h4 className="text-xl font-bold text-gray-800">{cat.name}</h4>
          <p className="text-sm text-gray-500 mt-1">
            Explore latest edits & essentials
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
