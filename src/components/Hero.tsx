"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Hero({ lang }: { lang: "it" | "en" }) {
  const ref = useRef<HTMLElement>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY       = useTransform(scrollYProgress, [0, 0.4], [0, 50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const t = {
    it: {
      h1a: "Leader nella",
      h1b: "consulenza operativa.",
      sub: "Sviluppiamo un modello di approccio specifico per le problematiche dell'industria, dei servizi e della P.A., dall'organizzazione alle operations, dai sistemi informativi alle tecnologie.",
      cta: "Scopri i servizi",
      cta2: "Contattaci",
    },
    en: {
      h1a: "Leaders in",
      h1b: "operational consulting.",
      sub: "We develop a specific approach model for industry, services and public administration challenges — from organisation to operations, from information systems to technology.",
      cta: "Explore services",
      cta2: "Get in touch",
    },
  }[lang];

  return (
    <motion.section
      id="hero"
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, delay: 0, ease: "easeOut" }}
        style={{
          position: "absolute", top: "-10%", left: "-8%",
          width: 520, height: 520, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(40,120,180,0.18) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, delay: 0.35, ease: "easeOut" }}
        style={{
          position: "absolute", bottom: "-5%", right: "-8%",
          width: 440, height: 440, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(58,144,204,0.12) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative" }}>

        {/* All hero content — logo + text + CTAs share the same scroll fade-up */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease }}
            style={{ marginBottom: 52, position: "relative" }}
          >
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "160%", paddingBottom: "160%", borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(40,120,180,0.22) 0%, rgba(40,120,180,0.06) 50%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <img
              src={`${BASE}/logo.png`}
              alt="INEMA — Keep moving forward"
              width={320}
              height={100}
              style={{ width: "min(320px, 68vw)", height: "auto", objectFit: "contain", display: "block", position: "relative" }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease }}
            style={{
              fontFamily: "'Clash Display', system-ui, sans-serif",
              fontSize: "clamp(36px, 5.5vw, 72px)",
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.045em",
              marginBottom: 28,
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "var(--text-primary)", display: "block" }}>{t.h1a}</span>
            <span style={{ color: "var(--text-faint)", display: "block" }}>{t.h1b}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease }}
            style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto 36px" }}
          >
            {t.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.a
              href="#aree"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setCtaHovered(true)}
              onHoverEnd={() => setCtaHovered(false)}
              style={{
                fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
                padding: "13px 28px", borderRadius: 2,
                background: "var(--blue)", color: "#fff", textDecoration: "none",
                display: "flex", alignItems: "center", gap: 8,
                textTransform: "uppercase",
              }}
            >
              {t.cta}
              <motion.span style={{ display: "inline-block" }} animate={{ x: ctaHovered ? 4 : 0 }} transition={{ duration: 0.15 }}>→</motion.span>
            </motion.a>
            <motion.a
              href="#contatti"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
                padding: "13px 28px", borderRadius: 2, textDecoration: "none",
                color: "rgba(255,255,255,0.65)",
                border: "0.5px solid rgba(255,255,255,0.18)",
                textTransform: "uppercase",
              }}
            >
              {t.cta2}
            </motion.a>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
}
