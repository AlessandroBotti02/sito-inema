"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { settori } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;
const CARD_W = 420;
const GAP = 28;

export default function Settori({ lang }: { lang: "it" | "en" }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [vpW, setVpW] = useState(1440);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      setVpW(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const padL = Math.min(Math.max(vpW * 0.05, 24), 80);
  const stripW = settori.length * CARD_W + (settori.length - 1) * GAP + padL + 40;
  const xEnd = Math.min(0, vpW - stripW);
  const x = useTransform(scrollYProgress, [0, 1], [0, xEnd]);

  const t = {
    it: { label: "Settori di Eccellenza", title: "Dove operiamo,", titleAccent: "con eccellenza.", highlights: "Interventi principali" },
    en: { label: "Sectors of Excellence", title: "Where we operate,", titleAccent: "with excellence.", highlights: "Key interventions" },
  }[lang];

  return (
    <section id="settori" style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>

      {isMobile ? (

        // ── Mobile: stacked cards ──
        <div>
          <div style={{ padding: "40px 24px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
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
          <div style={{ padding: "16px 24px 60px", display: "flex", flexDirection: "column", gap: 12 }}>
            {settori.map((s, i) => (
              <motion.div
                key={s.id}
                className="card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
                style={{ padding: "22px 22px 20px" }}
              >
                <div style={{ display: "inline-block", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue-mid)", background: "var(--blue-bg)", border: "0.5px solid var(--blue-border)", padding: "3px 10px", borderRadius: 2, marginBottom: 12 }}>
                  {s.years[lang]}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: 8 }}>
                  {s.title[lang]}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-secondary)", marginBottom: 14 }}>
                  {s.desc[lang]}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {s.highlights[lang].map(h => (
                    <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                      <span style={{ width: 16, height: 16, borderRadius: 2, background: "var(--blue-bg)", border: "0.5px solid var(--blue-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--blue-mid)", display: "block" }} />
                      </span>
                      <span style={{ fontSize: 12, color: "var(--text-primary)", lineHeight: 1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      ) : (

        // ── Desktop: sticky horizontal scroll ──
        <div ref={outerRef} style={{ position: "relative", height: "220vh" }}>
          <div style={{
            position: "sticky", top: 76, height: "calc(100vh - 76px)",
            overflow: "hidden", display: "flex", flexDirection: "column",
          }}>

            {/* Compact sticky header */}
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

            {/* Cards strip */}
            <div style={{ flex: 1, minHeight: 0, overflow: "hidden", position: "relative" }}>

              {/* Atmospheric glow */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse at 25% 55%, rgba(40,120,180,0.09) 0%, transparent 60%)",
                filter: "blur(50px)",
              }} />

              <motion.div style={{
                x,
                display: "flex",
                gap: GAP,
                height: "100%",
                paddingLeft: padL,
                paddingRight: 40,
                alignItems: "center",
                willChange: "transform",
              }}>
                {settori.map((s, i) => (
                  <div
                    key={s.id}
                    className="card"
                    style={{
                      width: CARD_W,
                      flexShrink: 0,
                      padding: "32px 36px 30px",
                      maxHeight: "calc(100% - 48px)",
                      overflowY: "auto",
                    }}
                  >
                    {/* Years badge */}
                    <div style={{
                      display: "inline-block", fontSize: 10, fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "var(--blue-mid)", background: "var(--blue-bg)",
                      border: "0.5px solid var(--blue-border)",
                      padding: "4px 12px", borderRadius: 2, marginBottom: 18,
                    }}>
                      {s.years[lang]}
                    </div>

                    {/* Title */}
                    <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: 10 }}>
                      {s.title[lang]}
                    </h3>

                    {/* Description */}
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 22 }}>
                      {s.desc[lang]}
                    </p>

                    {/* Highlights label */}
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>
                      {t.highlights}
                    </div>

                    {/* Highlights list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                      {s.highlights[lang].map(h => (
                        <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <span style={{
                            width: 18, height: 18, borderRadius: 2,
                            background: "var(--blue-bg)", border: "0.5px solid var(--blue-border)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0, marginTop: 1,
                          }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--blue-mid)", display: "block" }} />
                          </span>
                          <span style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.55 }}>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
