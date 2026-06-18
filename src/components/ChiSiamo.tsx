"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { valori, stile } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

const INNER_R = 150;
const OUTER_R = 255;
const WRAP = OUTER_R * 2 + 200; // 710

type OrbitCfg = {
  items: typeof valori;
  radius: number;
  duration: number;
  dir: 1 | -1;
  color: string;
  bg: string;
  border: string;
  fontSize?: number;
  itemPadding?: string;
};

function OrbitRing({ orbit, lang, inView }: { orbit: OrbitCfg; lang: "it" | "en"; inView: boolean }) {
  const { items, radius, duration, dir, color, bg, border } = orbit;
  const fs = orbit.fontSize ?? 11;
  const pad = orbit.itemPadding ?? "5px 13px";
  const size = radius * 2;
  return (
    <motion.div
      style={{
        position: "absolute", top: "50%", left: "50%",
        marginLeft: -radius, marginTop: -radius, width: size, height: size,
      }}
      animate={inView ? { rotate: dir > 0 ? [0, 360] : [0, -360] } : { rotate: 0 }}
      transition={inView ? { duration, repeat: Infinity, ease: "linear" } : { duration: 0 }}
    >
      {items.map((item, i) => {
        const angle = (360 / items.length) * i - 90;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 50;
        const y = 50 + Math.sin(rad) * 50;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.3 + i * 0.1, ease }}
            style={{ position: "absolute", left: `${x}%`, top: `${y}%`, translateX: "-50%", translateY: "-50%" }}
          >
            <motion.span
              animate={inView ? { rotate: dir > 0 ? [0, -360] : [0, 360] } : { rotate: 0 }}
              transition={inView ? { duration, repeat: Infinity, ease: "linear" } : { duration: 0 }}
              style={{
                display: "block", fontWeight: 500, borderRadius: 2,
                fontSize: fs, padding: pad,
                background: bg, border: `0.5px solid ${border}`, color,
                whiteSpace: "nowrap", backdropFilter: "blur(8px)",
              }}
            >
              {item.title[lang]}
            </motion.span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function Orrery({ lang, inView, inner, outer, wrapSize, dotSize, scrollHint }: {
  lang: "it" | "en";
  inView: boolean;
  inner: OrbitCfg;
  outer: OrbitCfg;
  wrapSize: number;
  dotSize: number;
  scrollHint?: string;
}) {
  return (
    <>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: wrapSize * 0.96, height: wrapSize * 0.96, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(40,120,180,0.13) 0%, transparent 70%)",
        filter: "blur(64px)", pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: wrapSize, height: wrapSize,
        pointerEvents: "none",
      }}>
        {[inner.radius, outer.radius].map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.1 + i * 0.15 }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r,
              borderRadius: "50%",
              border: i === 0
                ? "0.5px solid rgba(40,120,180,0.30)"
                : "0.5px solid rgba(255,255,255,0.09)",
            }}
          />
        ))}

        {inView && (
          <motion.div
            style={{
              position: "absolute", top: "50%", left: "50%",
              translateX: "-50%", translateY: "-50%",
              width: dotSize, height: dotSize, borderRadius: "50%",
              border: "1.5px solid var(--blue)",
            }}
            animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          style={{
            position: "absolute", top: "50%", left: "50%",
            translateX: "-50%", translateY: "-50%",
            width: dotSize, height: dotSize, borderRadius: "50%",
            background: "var(--blue)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: "0 8px",
            pointerEvents: "none",
            boxShadow: `0 0 0 ${Math.round(dotSize * 0.13)}px var(--blue-bg), 0 0 ${Math.round(dotSize * 0.75)}px rgba(40,120,180,0.50)`,
          }}
        >
          <span style={{ fontSize: Math.round(dotSize * 0.115), fontWeight: 600, color: "rgba(255,255,255,0.62)", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.4 }}>
            {lang === "it" ? "i nostri" : "our"}
          </span>
          <span style={{ fontSize: Math.round(dotSize * 0.148), fontWeight: 700, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.35 }}>
            {lang === "it" ? "valori" : "values"}
          </span>
        </motion.div>

        <OrbitRing orbit={inner} lang={lang} inView={inView} />
        <OrbitRing orbit={outer} lang={lang} inView={inView} />
      </div>

      {scrollHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 1, 1, 0] } : {}}
          transition={{ duration: 2.5, delay: 2, repeat: Infinity, repeatDelay: 3 }}
          style={{
            position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
            display: "flex", alignItems: "center", gap: 8, pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>{scrollHint}</span>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>→</span>
        </motion.div>
      )}
    </>
  );
}

const MOSAIC_MT = [0, 50, -20, 70, 10, -40];
const MOSAIC_PT = [32, 20, 36, 22, 40, 20];
const MOSAIC_PB = [28, 40, 24, 40, 20, 36];

// Compact sticky header shared by both mobile and desktop
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

export default function ChiSiamo({ lang }: { lang: "it" | "en" }) {
  const horizRef = useRef<HTMLDivElement>(null);
  const orreryRef = useRef<HTMLDivElement>(null);
  const mobileOrreryRef = useRef<HTMLDivElement>(null);
  const desktopInView = useInView(orreryRef, { once: true, margin: "0px" });
  const mobileInView = useInView(mobileOrreryRef, { once: true, margin: "0px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: horizRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-120vw"]);

  const t = {
    it: {
      label: "Chi Siamo",
      title: "In INEMA crediamo nel",
      titleAccent: "miglioramento continuo.",
      approach: "Il nostro approccio",
      styleDesc: "INEMA stabilisce un approccio collaborativo che aiuta il Cliente ad esplorare nuove opportunità per un continuo miglioramento delle performances.",
      scroll: "scorri",
    },
    en: {
      label: "About",
      title: "At INEMA we believe in",
      titleAccent: "continuous improvement.",
      approach: "Our approach",
      styleDesc: "INEMA establishes a collaborative approach that helps the Client explore new opportunities for continuous performance improvement.",
      scroll: "scroll",
    },
  }[lang];

  const innerValori = valori.filter(v => v.category === "interno");
  const outerValori = valori.filter(v => v.category === "esterno");

  const innerOrbit: OrbitCfg = {
    items: innerValori, radius: INNER_R, duration: 28, dir: 1,
    color: "var(--blue-mid)", bg: "var(--blue-bg)", border: "var(--blue-border)",
  };
  const outerOrbit: OrbitCfg = {
    items: outerValori, radius: OUTER_R, duration: 46, dir: -1,
    color: "var(--text-secondary)", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.10)",
  };
  const mobileInner: OrbitCfg = { ...innerOrbit, radius: 82, fontSize: 9, itemPadding: "3px 8px" };
  const mobileOuter: OrbitCfg = { ...outerOrbit, radius: 138, fontSize: 9, itemPadding: "3px 8px" };

  return (
    <section id="chi-siamo" style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>

      {isMobile ? (

        // ── Mobile ──
        <div>
          <SectionHeader lang={lang} t={t} />
          <div ref={mobileOrreryRef} style={{ position: "relative", height: 340, overflow: "hidden" }}>
            <Orrery
              lang={lang}
              inView={mobileInView}
              inner={mobileInner}
              outer={mobileOuter}
              wrapSize={mobileOuter.radius * 2 + 100}
              dotSize={56}
            />
          </div>
          <div style={{ padding: "16px 24px 60px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue-mid)", marginBottom: 10 }}>{t.approach}</p>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: 16, maxWidth: 420 }}>{t.styleDesc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {stile.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease }}
                  className="card"
                  style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue-mid)", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.5 }}>{s[lang]}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      ) : (

        // ── Desktop: pinned horizontal scroll ──
        <div ref={horizRef} style={{ position: "relative", height: "350vh" }}>
          <div style={{
            position: "sticky", top: 76, height: "calc(100vh - 76px)", overflow: "hidden",
            display: "flex", flexDirection: "column",
          }}>

            {/* Compact sticky header */}
            <SectionHeader lang={lang} t={t} />

            {/* Content area: flex-1 */}
            <div style={{ flex: 1, minHeight: 0, overflow: "hidden", position: "relative" }}>
              <motion.div style={{ display: "flex", height: "100%", x }}>

                {/* Panel 1: Orrery */}
                <div
                  ref={orreryRef}
                  style={{ width: "100vw", height: "100%", flexShrink: 0, position: "relative" }}
                >
                  <Orrery
                    lang={lang}
                    inView={desktopInView}
                    inner={innerOrbit}
                    outer={outerOrbit}
                    wrapSize={WRAP}
                    dotSize={76}
                    scrollHint={t.scroll}
                  />
                </div>

                {/* Panel 2: Principles */}
                <div style={{
                  width: "120vw", height: "100%", flexShrink: 0,
                  display: "flex", alignItems: "center",
                  paddingLeft: "8vw",
                  background: "var(--bg-primary)",
                }}>
                  <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                    <div style={{ width: "clamp(200px, 20vw, 280px)", flexShrink: 0, paddingTop: 8, marginRight: 8 }}>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue-mid)", marginBottom: 16 }}>
                        {t.approach}
                      </p>
                      <p style={{ fontSize: "clamp(15px, 1.6vw, 20px)", lineHeight: 1.65, color: "var(--text-primary)", fontWeight: 500, letterSpacing: "-0.02em" }}>
                        {t.styleDesc}
                      </p>
                    </div>
                    {stile.map((s, i) => (
                      <motion.div
                        key={i}
                        className="card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease }}
                        style={{
                          width: "clamp(150px, 12vw, 195px)",
                          flexShrink: 0,
                          paddingTop: MOSAIC_PT[i],
                          paddingBottom: MOSAIC_PB[i],
                          paddingLeft: 18,
                          paddingRight: 18,
                          display: "flex", flexDirection: "column", gap: 14,
                          alignSelf: "flex-start",
                          marginTop: MOSAIC_MT[i],
                        }}
                      >
                        <span style={{ fontSize: 20, fontWeight: 700, color: "var(--blue-mid)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.6, fontWeight: 500 }}>
                          {s[lang]}
                        </span>
                        <motion.span
                          style={{ height: 1, background: "var(--blue-border)", display: "block", originX: 0 }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
