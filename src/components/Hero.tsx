"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type LogoOffset = { x: number; y: number; scale: number };

export default function Hero({ lang }: { lang: "it" | "en" }) {
  const ref = useRef<HTMLElement>(null);
  const logoInnerRef = useRef<HTMLDivElement>(null);
  const [logoOffset, setLogoOffset] = useState<LogoOffset>({ x: 0, y: 0, scale: 0.28 });
  const [ctaHovered, setCtaHovered] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Measure nav logo position (called once entry animation completes + on resize)
  const measureLogoOffset = () => {
    const navImg = document.querySelector('header img[alt="INEMA"]') as HTMLImageElement;
    const heroImg = logoInnerRef.current?.querySelector("img") as HTMLImageElement;
    if (!navImg || !heroImg) return;
    const nav = navImg.getBoundingClientRect();
    const hero = heroImg.getBoundingClientRect();
    setLogoOffset({
      x: (nav.left + nav.width / 2) - (hero.left + hero.width / 2),
      y: (nav.top + nav.height / 2) - (hero.top + hero.height / 2),
      scale: nav.height / hero.height,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", measureLogoOffset);
    return () => window.removeEventListener("resize", measureLogoOffset);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep ref current so the transform mapper always reads the latest measured offset
  const logoOffsetRef = useRef(logoOffset);
  useEffect(() => { logoOffsetRef.current = logoOffset; }, [logoOffset]);

  // Single GPU-accelerated CSS transform string (avoids FM x/y/scale shorthand main-thread cost)
  const logoTransform = useTransform(scrollYProgress, (p: number) => {
    const { x, y, scale } = logoOffsetRef.current;
    const t = Math.min(Math.max(p, 0) / 0.5, 1);
    return `translateX(${t * x}px) translateY(${t * y}px) scale(${1 + t * (scale - 1)})`;
  });
  const logoOpacity = useTransform(scrollYProgress, [0.4, 0.52], [1, 0]);

  // Text content fades and drifts up
  const textY       = useTransform(scrollYProgress, [0, 0.4], [0, 40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const scrollIndOp = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const t = {
    it: {
      eyebrow: "Consulenza Operativa · Bologna, Italia",
      h1a: "Leader nella",
      h1b: "consulenza operativa.",
      sub: "Sviluppiamo un modello di approccio specifico per le problematiche dell'industria, dei servizi e della P.A., dall'organizzazione alle operations, dai sistemi informativi alle tecnologie.",
      cta: "Scopri i servizi",
      cta2: "Contattaci",
    },
    en: {
      eyebrow: "Operations Consulting · Bologna, Italy",
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
        overflow: "visible",
      }}
    >
      {/* Background gradient — clipped to section */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(40,120,180,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div style={{ width: "100%", maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative" }}>

        {/* Logo — outer: entry scale 2.5→1; inner: scroll fly-to-nav */}
        <motion.div
          initial={{ scale: 2.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            scale: { duration: 1.6, ease },
            opacity: { duration: 0.5, ease: "easeOut" },
          }}
          onAnimationComplete={measureLogoOffset}
          style={{ marginBottom: 48, zIndex: 60, position: "relative" }}
        >
          <motion.div
            ref={logoInnerRef}
            style={{
              transform: logoTransform,
              opacity: logoOpacity,
              position: "relative",
            }}
          >
            <div
              className="logo-orb"
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "140%", paddingBottom: "140%", borderRadius: "50%",
                background: "radial-gradient(ellipse at center, rgba(40,120,180,0.16) 0%, rgba(40,120,180,0.05) 50%, transparent 70%)",
                pointerEvents: "none", zIndex: 0,
              }}
            />
            <div
              className="logo-ring"
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "115%", paddingBottom: "115%", borderRadius: "50%",
                border: "0.5px solid rgba(40,120,180,0.18)",
                pointerEvents: "none", zIndex: 0,
              }}
            />
            <img
              src="/logo.png"
              alt="INEMA — Keep moving forward"
              width={320}
              height={100}
              style={{ width: "min(320px, 68vw)", height: "auto", objectFit: "contain", display: "block", position: "relative", zIndex: 1 }}
            />
          </motion.div>
        </motion.div>

        {/* Content — fades and drifts on scroll */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}
          >
            <span style={{ width: 22, height: 1.5, background: "var(--blue)", borderRadius: 2, display: "block" }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blue)" }}>
              {t.eyebrow}
            </span>
            <span style={{ width: 22, height: 1.5, background: "var(--blue)", borderRadius: 2, display: "block" }} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease }}
            style={{ fontSize: "clamp(42px, 8vw, 76px)", fontWeight: 500, lineHeight: 1.04, letterSpacing: "-0.035em", marginBottom: 22 }}
          >
            <span style={{ color: "var(--text-primary)" }}>{t.h1a}</span>
            <br />
            <span style={{ color: "var(--text-faint)" }}>{t.h1b}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease }}
            style={{ fontSize: 16, lineHeight: 1.78, color: "var(--text-secondary)", maxWidth: 560, margin: "0 auto 32px" }}
          >
            {t.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3, ease }}
            style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.a
              href="#aree"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setCtaHovered(true)}
              onHoverEnd={() => setCtaHovered(false)}
              style={{
                fontSize: 13, fontWeight: 500, padding: "12px 26px", borderRadius: 12,
                background: "var(--blue)", color: "#fff", textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {t.cta}
              <motion.span style={{ display: "inline-block" }} animate={{ x: ctaHovered ? 3 : 0 }} transition={{ duration: 0.15 }}>→</motion.span>
            </motion.a>
            <motion.a
              href="#contatti"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontSize: 13, padding: "12px 26px", borderRadius: 12, textDecoration: "none",
                color: "var(--text-secondary)", background: "rgba(255,255,255,0.85)",
                border: "0.5px solid rgba(0,0,0,0.09)",
              }}
            >
              {t.cta2}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator — outer: scroll-linked fade; inner: entry + bounce */}
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)" }}>
          <motion.div style={{ opacity: scrollIndOp }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--blue), transparent)", borderRadius: 1, margin: "0 auto" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
