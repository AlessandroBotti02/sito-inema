"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function IntroOverlay({ onEnd }: { onEnd?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [dissolve, setDissolve] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function triggerDissolve() {
    setDissolve(true);
    onEnd?.();
    setTimeout(() => setVisible(false), 1200);
  }

  function handleSkip() {
    if (videoRef.current) videoRef.current.pause();
    triggerDissolve();
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{
            opacity: dissolve ? 0 : 1,
            scale: dissolve ? 1.04 : 1,
            filter: dissolve ? "blur(10px)" : "blur(0px)",
          }}
          transition={{ duration: 1.1, ease }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "#000",
            overflow: "hidden",
          }}
        >
          <video
            ref={videoRef}
            src="/intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={triggerDissolve}
            onError={triggerDissolve}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          {/* Skip */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: dissolve ? 0 : 1 }}
            transition={{ duration: 0.4, delay: 1.5 }}
            onClick={handleSkip}
            style={{
              position: "absolute",
              bottom: 32,
              right: 32,
              zIndex: 1,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.38)",
              background: "transparent",
              border: "0.5px solid rgba(255,255,255,0.16)",
              padding: "7px 16px",
              borderRadius: 20,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.35)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.38)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.16)";
            }}
          >
            Salta →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
