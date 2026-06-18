"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { LuTarget, LuActivity, LuTrendingUp, LuWrench, LuShare2, LuDatabase, LuLeaf } from "react-icons/lu";
import { aree } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

const ICONS: Record<string, React.ReactNode> = {
  strategia:     <LuTarget size={24} />,
  operations:    <LuActivity size={24} />,
  improvement:   <LuTrendingUp size={24} />,
  industrial:    <LuWrench size={24} />,
  information:   <LuShare2 size={24} />,
  data:          <LuDatabase size={24} />,
  sostenibilita: <LuLeaf size={24} />,
};

const cardVariants = {
  enter: (d: number) => ({ y: d > 0 ? 56 : -56, opacity: 0 }),
  center: { y: 0, opacity: 1, transition: { duration: 0.42, ease } },
  exit:  (d: number) => ({ y: d > 0 ? -56 : 56, opacity: 0, transition: { duration: 0.22, ease } }),
};

function SectionHeader({ lang, t }: { lang: "it" | "en"; t: { label: string; title: string; titleAccent: string } }) {
  return (
    <div style={{
      padding: "16px clamp(24px, 5vw, 80px) 14px",
      flexShrink: 0,
      borderBottom: "0.5px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ width: 18, height: 1, background: "var(--blue-mid)", display: "block" }} />
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue-mid)" }}>
          {t.label}
        </span>
      </div>
      <h2 style={{ fontSize: "clamp(26px, 3.2vw, 46px)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.04em", textTransform: "uppercase", margin: 0 }}>
        <span style={{ color: "var(--text-primary)" }}>{t.title} </span>
        <span style={{ color: "var(--text-faint)" }}>{t.titleAccent}</span>
      </h2>
    </div>
  );
}

export default function Aree({ lang }: { lang: "it" | "en" }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const idxRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(Math.floor(v * aree.length), aree.length - 1);
    if (next !== idxRef.current) {
      setDir(next > idxRef.current ? 1 : -1);
      idxRef.current = next;
      setActiveIdx(next);
    }
  });

  const t = {
    it: { label: "Aree di Intervento", title: "Cosa facciamo,", titleAccent: "come lo facciamo." },
    en: { label: "Service Areas", title: "What we do,", titleAccent: "how we do it." },
  }[lang];

  const area = aree[activeIdx];

  return (
    <section id="aree" style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>

      {isMobile ? (

        // ── Mobile: stacked cards ──
        <div>
          <SectionHeader lang={lang} t={t} />
          <div style={{ padding: "12px 24px 60px", display: "flex", flexDirection: "column", gap: 10 }}>
            {aree.map((a, i) => (
              <motion.div
                key={a.id}
                className="card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease }}
                style={{ padding: "20px 20px 18px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 2, flexShrink: 0,
                    background: "var(--blue-bg)", border: "0.5px solid var(--blue-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--blue-mid)",
                  }}>{ICONS[a.id]}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "var(--blue-mid)", letterSpacing: "0.1em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6, letterSpacing: "-0.01em" }}>
                  {a.title[lang]}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 12 }}>
                  {a.desc[lang]}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {a.services[lang].slice(0, 5).map(s => (
                    <span key={s} style={{ fontSize: 10, padding: "4px 9px", borderRadius: 2, color: "var(--text-muted)", background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.08)" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      ) : (

        // ── Desktop: pinned scroll ──
        <div ref={outerRef} style={{ position: "relative", height: `${aree.length * 100}vh` }}>
          <div style={{
            position: "sticky", top: 76, height: "calc(100vh - 76px)", overflow: "hidden",
            display: "flex", flexDirection: "column",
          }}>

            {/* Compact sticky header */}
            <SectionHeader lang={lang} t={t} />

            {/* Content area: flex-1 */}
            <div style={{ flex: 1, minHeight: 0, position: "relative" }}>

              {/* Background glow */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse at 75% 45%, rgba(40,120,180,0.11) 0%, transparent 60%)",
                filter: "blur(50px)",
              }} />

              {/* Animated card */}
              <div style={{
                position: "relative", zIndex: 1,
                height: "100%", display: "flex", alignItems: "center",
                padding: "0 clamp(24px, 5vw, 80px)",
              }}>
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={activeIdx}
                    custom={dir}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{ maxWidth: 680, width: "100%" }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: 52, height: 52, borderRadius: 4,
                      background: "var(--blue-bg)", border: "0.5px solid var(--blue-border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--blue-mid)", marginBottom: 24,
                    }}>
                      {ICONS[area.id]}
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontSize: "clamp(22px, 2.8vw, 38px)", fontWeight: 500,
                      lineHeight: 1.0, letterSpacing: "-0.04em", textTransform: "uppercase",
                      color: "var(--text-primary)", marginBottom: 18,
                    }}>
                      {area.title[lang]}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontSize: 16, lineHeight: 1.75, color: "var(--text-secondary)",
                      maxWidth: 500, marginBottom: 24,
                    }}>
                      {area.desc[lang]}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {area.services[lang].map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.16 + i * 0.04, ease }}
                          style={{
                            fontSize: 11, padding: "6px 12px", borderRadius: 2,
                            color: "var(--text-secondary)",
                            background: "rgba(255,255,255,0.06)",
                            border: "0.5px solid rgba(255,255,255,0.10)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Vertical progress dots */}
              <div style={{
                position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)",
                display: "flex", flexDirection: "column", gap: 8, alignItems: "center",
                zIndex: 2,
              }}>
                {aree.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: i === activeIdx ? 24 : 5,
                      opacity: i === activeIdx ? 1 : i < activeIdx ? 0.4 : 0.18,
                    }}
                    transition={{ duration: 0.3, ease }}
                    style={{
                      width: 2, borderRadius: 1,
                      background: i <= activeIdx ? "var(--blue-mid)" : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>

              {/* Scroll hint */}
              <motion.div
                animate={{ opacity: activeIdx < aree.length - 1 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  pointerEvents: "none",
                }}
              >
                <span style={{ fontSize: 9, letterSpacing: "0.16em", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                  {lang === "it" ? "scorri" : "scroll"}
                </span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: 1, height: 18, background: "var(--text-muted)" }}
                />
              </motion.div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
