"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only show once per session; skip if user prefers reduced motion
    const played = sessionStorage.getItem("intro-played") === "1";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!played && !reduced) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("intro-played", "1");
    document.body.style.overflow = "";
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={dismiss}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "#DDE1E6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <video
            ref={videoRef}
            src={`${BASE}/intro.mp4`}
            autoPlay
            muted
            playsInline
            onEnded={dismiss}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
