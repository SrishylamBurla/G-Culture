import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxWrapper({ children, speed = 0.3 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative will-change-transform">
      {children}
    </motion.div>
  );
}
