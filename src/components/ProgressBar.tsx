"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 2,
        scaleX,
        transformOrigin: "0%",
        background: "linear-gradient(90deg, var(--blue-dark) 0%, var(--blue-mid) 60%, var(--blue) 100%)",
        zIndex: 300,
      }}
    />
  );
}
