"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, LayoutGroup } from "framer-motion";
import { valori, stile } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;
const canHover = typeof window !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;
const tabs = { it: ["Valori", "Stile"], en: ["Values", "Style"] };

export default function ChiSiamo({ lang }: { lang: "it" | "en" }) {
  const [tab, setTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const t = {
    it: {
      label: "Chi Siamo",
      title: "In INEMA crediamo nel",
      titleAccent: "miglioramento continuo.",
      desc: "Dal 1995, affianchiamo le risorse dei nostri clienti per ottenere il massimo beneficio con il minimo impatto, trasferendo know-how e garantendo l'autonomia dei risultati.",
      internal: "Interni",
      external: "Esterni",
      styleDesc: "INEMA stabilisce un approccio collaborativo che aiuta il Cliente ad esplorare nuove opportunità per un continuo miglioramento delle performances.",
    },
    en: {
      label: "About",
      title: "At INEMA we believe in",
      titleAccent: "continuous improvement.",
      desc: "Since 1995, we work alongside our clients' resources to achieve maximum benefit with minimum impact, transferring know-how and ensuring autonomy of results.",
      internal: "Internal",
      external: "External",
      styleDesc: "INEMA establishes a collaborative approach that helps the Client explore new opportunities for continuous performance improvement.",
    },
  }[lang];

  const titleWords = t.title.split(" ");
  const accentWords = t.titleAccent.split(" ");

  return (
    <section id="chi-siamo" ref={sectionRef} style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      {/* Parallax atmospheric glows */}
      <motion.div
        style={{
          y: bgY,
          position: "absolute", top: "5%", right: "-8%",
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(40,120,180,0.09) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          y: bgY2,
          position: "absolute", bottom: "10%", left: "-6%",
          width: 340, height: 340, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(40,120,180,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: 60 }}>
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

          <h2 style={{ fontSize: "clamp(36px, 7vw, 72px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.04em", marginBottom: 20, textTransform: "uppercase" }}>
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

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: 0.25, ease }}
            style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: 520 }}
          >
            {t.desc}
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, delay: 0.1, ease }}
        >
          <LayoutGroup>
            <div style={{ display: "flex", gap: 4, marginBottom: 32, background: "rgba(255,255,255,0.05)", borderRadius: 2, padding: 4, width: "fit-content", border: "0.5px solid var(--card-border)" }}>
              {tabs[lang].map((label, i) => (
                <button
                  key={i}
                  onClick={() => setTab(i)}
                  style={{
                    position: "relative",
                    padding: "8px 20px",
                    borderRadius: 2,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: tab === i ? 600 : 400,
                    letterSpacing: "0.04em",
                    color: tab === i ? "#fff" : "var(--text-muted)",
                    background: "transparent",
                    fontFamily: "inherit",
                    zIndex: 0,
                  }}
                >
                  {tab === i && (
                    <motion.div
                      layoutId="chi-tab-bg"
                      style={{
                        position: "absolute", inset: 0,
                        borderRadius: 2, background: "var(--blue)",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  {label}
                </button>
              ))}
            </div>
          </LayoutGroup>

          <AnimatePresence mode="wait">
            {tab === 0 && (
              <motion.div
                key="valori"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease }}
              >
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>
                    — {t.internal}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {valori.filter(v => v.category === "interno").map((v, i) => (
                      <motion.span
                        key={v.title.it}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05, ease }}
                        whileHover={canHover ? { scale: 1.04, y: -1 } : {}}
                        style={{
                          fontSize: 12, padding: "7px 16px", borderRadius: 2,
                          color: "var(--blue-mid)", background: "var(--blue-bg)",
                          border: "0.5px solid var(--blue-border)", fontWeight: 500,
                          letterSpacing: "0.02em",
                          cursor: "default",
                        }}
                      >
                        {v.title[lang]}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>
                    — {t.external}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {valori.filter(v => v.category === "esterno").map((v, i) => (
                      <motion.span
                        key={v.title.it}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.25 + i * 0.05, ease }}
                        whileHover={canHover ? { scale: 1.04, y: -1 } : {}}
                        style={{
                          fontSize: 12, padding: "7px 16px", borderRadius: 2,
                          color: "var(--text-secondary)",
                          background: "rgba(255,255,255,0.06)",
                          border: "0.5px solid rgba(255,255,255,0.10)", cursor: "default",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {v.title[lang]}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {tab === 1 && (
              <motion.div
                key="stile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease }}
              >
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: 28, maxWidth: 560 }}>
                  {t.styleDesc}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
                  {stile.map((s, i) => (
                    <motion.div
                      key={s.it}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06, ease }}
                      whileHover={canHover ? { y: -2, boxShadow: "var(--card-shadow-hover)" } : {}}
                      className="card"
                      style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <motion.span
                        style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--blue-mid)", flexShrink: 0, display: "block" }}
                        whileHover={canHover ? { scale: 1.5 } : {}}
                      />
                      <span style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.5 }}>{s[lang]}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
