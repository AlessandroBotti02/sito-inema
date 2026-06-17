"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuTarget, LuActivity, LuTrendingUp, LuWrench, LuShare2, LuDatabase, LuLeaf } from "react-icons/lu";
import { aree } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;
const canHover = typeof window !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;

const icons: Record<string, React.ReactNode> = {
  strategia:    <LuTarget size={18} />,
  operations:   <LuActivity size={18} />,
  improvement:  <LuTrendingUp size={18} />,
  industrial:   <LuWrench size={18} />,
  information:  <LuShare2 size={18} />,
  data:         <LuDatabase size={18} />,
  sostenibilita: <LuLeaf size={18} />,
};

export default function Aree({ lang }: { lang: "it" | "en" }) {
  const [open, setOpen] = useState<string | null>(null);

  const t = {
    it: { label: "Aree di Intervento", title: "Cosa facciamo,", titleAccent: "come lo facciamo.", services: "Servizi" },
    en: { label: "Service Areas", title: "What we do,", titleAccent: "how we do it.", services: "Services" },
  }[lang];

  return (
    <section id="aree" style={{ padding: "100px 24px", background: "rgba(255,255,255,0.35)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35, ease }}
          style={{ marginBottom: 56 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ width: 22, height: 1.5, background: "var(--blue)", borderRadius: 2, display: "block" }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blue)" }}>
              {t.label}
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
            <span style={{ color: "var(--text-primary)" }}>{t.title}</span>
            <br />
            <span style={{ color: "var(--text-faint)" }}>{t.titleAccent}</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {aree.map((area, i) => {
            const isOpen = open === area.id;
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.06, ease }}
                className="card"
                style={{ overflow: "hidden", cursor: "pointer" }}
                onClick={() => setOpen(isOpen ? null : area.id)}
                whileHover={!isOpen && canHover ? { boxShadow: "var(--card-shadow-hover)" } : {}}
              >
                {/* Row */}
                <div
                  style={{
                    padding: "22px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    transition: "background 0.2s",
                    background: isOpen ? "rgba(40,120,180,0.04)" : "transparent",
                  }}
                >
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: isOpen ? "var(--blue)" : "var(--blue-bg)",
                      border: "0.5px solid var(--blue-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      color: isOpen ? "#fff" : "var(--blue)",
                      flexShrink: 0,
                      transition: "all 0.25s ease",
                    }}
                  >
                    {icons[area.id]}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: isOpen ? "var(--blue-dark)" : "var(--text-primary)", marginBottom: 2 }}>
                      {area.title[lang]}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, display: isOpen ? "none" : "block" }}>
                      {area.desc[lang]}
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease }}
                    style={{ fontSize: 20, color: "var(--text-muted)", flexShrink: 0, lineHeight: 1 }}
                  >
                    +
                  </motion.span>
                </div>

                {/* Expanded */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.22, ease } }}
                      transition={{ duration: 0.35, ease }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ padding: "0 28px 24px 86px" }}>
                        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 20 }}>
                          {area.desc[lang]}
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                          {area.services[lang].map((s) => (
                            <span
                              key={s}
                              style={{
                                fontSize: 12,
                                padding: "5px 12px",
                                borderRadius: 20,
                                color: "var(--text-secondary)",
                                background: "rgba(255,255,255,0.9)",
                                border: "0.5px solid rgba(0,0,0,0.09)",
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
