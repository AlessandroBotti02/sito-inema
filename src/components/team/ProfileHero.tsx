"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const chips = [
  { label: "Data Management", teal: true },
  { label: "App Development", teal: true },
  { label: "Process Simulation", teal: true },
  { label: "Bologna, Italy", teal: false },
];

const ease = [0.22, 1, 0.36, 1] as const;
const arrowSpring = { type: "spring", stiffness: 500, damping: 30 } as const;

function CtaPrimary({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={arrowSpring}
      style={{
        fontSize: 13, fontWeight: 500, padding: "11px 24px", borderRadius: 12,
        background: "var(--blue)", color: "#fff", textDecoration: "none",
        display: "flex", alignItems: "center", gap: 6,
      }}
    >
      {label}
      <motion.span
        animate={{ x: hovered ? 4 : 0 }}
        transition={arrowSpring}
        style={{ display: "inline-block" }}
      >→</motion.span>
    </motion.a>
  );
}

export default function ProfileHero({ lang }: { lang: "en" | "it" }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const sectionOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  const t = {
    en: {
      eyebrow: "Management & Operations Consultant · Inema",
      h1a: "Data consultant",
      h1b: "& app builder.",
      sub: "I help companies work better with their own data — building tools, planning systems, and AI integrations that actually get used.",
      cta: "View projects",
      cta2: "Get in touch",
    },
    it: {
      eyebrow: "Management & Operations Consultant · Inema",
      h1a: "Consulente dati",
      h1b: "& sviluppatore app.",
      sub: "Aiuto le aziende a lavorare meglio con i propri dati — costruendo strumenti, sistemi di pianificazione e integrazioni AI che vengono davvero usati.",
      cta: "Vedi i progetti",
      cta2: "Contattami",
    },
  }[lang];

  return (
    <motion.section
      id="about"
      ref={heroRef}
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 24px 80px", opacity: sectionOpacity }}
    >
      <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: 60, alignItems: "center", justifyContent: "space-between" }}>

          {/* Text */}
          <motion.div style={{ flex: 1, y: textY }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}
            >
              <span style={{ width: 24, height: 1.5, background: "var(--blue)", borderRadius: 2, display: "block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blue)" }}>
                {t.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease }}
              style={{ fontSize: 68, fontWeight: 500, lineHeight: 1.03, letterSpacing: "-0.035em", marginBottom: 20 }}
            >
              <span style={{ color: "var(--text-primary)" }}>{t.h1a}</span>
              <br />
              <span style={{ color: "var(--text-faint)" }}>{t.h1b}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: 420, marginBottom: 26 }}
            >
              {t.sub}
            </motion.p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 32 }}>
              {chips.map((c, i) => (
                <motion.span
                  key={c.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.55 + i * 0.07, ease }}
                  style={{
                    fontSize: 11, padding: "5px 12px", borderRadius: 20,
                    color: c.teal ? "var(--teal-dark)" : "var(--text-muted)",
                    background: c.teal ? "var(--teal-bg)" : "rgba(138,155,168,0.08)",
                    border: `0.5px solid ${c.teal ? "var(--teal-border)" : "rgba(138,155,168,0.2)"}`,
                  }}
                >
                  {c.label}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease }}
              style={{ display: "flex", gap: 10 }}
            >
              <CtaPrimary label={t.cta} href="#projects" />
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={arrowSpring}
                style={{
                  fontSize: 13, padding: "11px 24px", borderRadius: 12, textDecoration: "none",
                  color: "var(--text-secondary)", background: "rgba(255,255,255,0.85)",
                  border: "0.5px solid rgba(0,0,0,0.1)",
                }}
              >
                {t.cta2}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            style={{ flexShrink: 0, y: avatarY }}
            initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.22, ease }}
          >
            <img
              src={`${BASE}/team/avatar-botti.png`}
              alt="Alessandro Botti"
              style={{ width: 300, height: 300, objectFit: "contain", display: "block" }}
            />
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
