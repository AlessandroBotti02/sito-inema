"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, LayoutGroup } from "framer-motion";
import { settori } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

const accents: Record<string, string> = {
  retail:      "#E8632A",
  utilities:   "#1E7D6B",
  fashion:     "#8B5CF6",
  industriale: "#3A90CC",
};

export default function Settori({ lang }: { lang: "it" | "en" }) {
  const [active, setActive] = useState(settori[0].id);
  const current = settori.find(s => s.id === active)!;
  const accent = accents[active];
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const t = {
    it: { label: "Settori di Eccellenza", title: "Dove operiamo", titleAccent: "con eccellenza.", highlights: "Interventi principali" },
    en: { label: "Sectors of Excellence", title: "Where we operate", titleAccent: "with excellence.", highlights: "Key interventions" },
  }[lang];

  const titleWords = t.title.split(" ");
  const accentWords = t.titleAccent.split(" ");

  return (
    <section id="settori" ref={sectionRef} style={{ padding: "100px 24px", position: "relative", overflow: "hidden", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
      {/* Parallax glow */}
      <motion.div
        style={{
          y: bgY,
          position: "absolute", top: "20%", left: "-8%",
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(40,120,180,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}
          >
            <span style={{ width: 22, height: 1, background: "var(--blue-mid)", borderRadius: 1, display: "block" }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue-mid)" }}>
              {t.label}
            </span>
          </motion.div>

          <h2 style={{ fontSize: "clamp(36px, 7vw, 72px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.04em", textTransform: "uppercase" }}>
            <span style={{ display: "block" }}>
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, delay: 0.05 + i * 0.05, ease }}
                  style={{ display: "inline-block", marginRight: "0.22em", color: "var(--text-primary)" }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span style={{ display: "block" }}>
              {accentWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, delay: 0.05 + (titleWords.length + i) * 0.07, ease }}
                  style={{ display: "inline-block", marginRight: "0.22em", color: "var(--text-faint)" }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h2>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, ease }}
        >
          <LayoutGroup>
            <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
              {settori.map((s) => (
                <motion.button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    position: "relative",
                    padding: "10px 20px",
                    borderRadius: 2,
                    border: `0.5px solid ${active === s.id ? accents[s.id] + "80" : "rgba(255,255,255,0.12)"}`,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: active === s.id ? 600 : 400,
                    letterSpacing: "0.04em",
                    color: active === s.id ? "#fff" : "var(--text-muted)",
                    background: "transparent",
                    fontFamily: "inherit",
                    transition: "border-color 0.25s, color 0.25s",
                    overflow: "hidden",
                  }}
                >
                  {active === s.id && (
                    <motion.div
                      layoutId="settori-tab-bg"
                      style={{
                        position: "absolute", inset: 0,
                        background: accents[s.id],
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {s.title[lang]}
                </motion.button>
              ))}
            </div>
          </LayoutGroup>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
              className="card"
              style={{ padding: "40px 44px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}
            >
              {/* Left */}
              <div>
                <div
                  style={{
                    display: "inline-block", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: accent, background: `${accent}18`,
                    border: `0.5px solid ${accent}40`,
                    padding: "4px 12px", borderRadius: 2, marginBottom: 20,
                  }}
                >
                  {current.years[lang]}
                </div>
                <h3 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: 14 }}>
                  {current.title[lang]}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text-secondary)" }}>
                  {current.desc[lang]}
                </p>
              </div>

              {/* Right */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 16 }}>
                  {t.highlights}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {current.highlights[lang].map((h, i) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.05, ease }}
                      style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                    >
                      <span
                        style={{
                          width: 20, height: 20, borderRadius: 2,
                          background: `${accent}18`, border: `0.5px solid ${accent}35`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, marginTop: 1,
                        }}
                      >
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, display: "block" }} />
                      </span>
                      <span style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.6 }}>{h}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
