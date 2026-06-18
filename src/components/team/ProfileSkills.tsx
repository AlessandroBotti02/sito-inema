"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const orbit1 = {
  items: [
    { en: "Data Management", it: "Gestione Dati" },
    { en: "App Development", it: "Sviluppo App" },
    { en: "AI & Knowledge", it: "AI & Knowledge" },
  ],
  radius: 118,
  duration: 22,
  direction: 1,
  color: "var(--teal-dark)",
  bg: "var(--teal-bg)",
  border: "var(--teal-border)",
};

const orbit2 = {
  items: [
    { en: "Process Simulation", it: "Simulazione Processi" },
    { en: "Production Planning", it: "Pianificazione" },
    { en: "ERP Consulting", it: "Consulenza ERP" },
    { en: "Operations & Data", it: "Operations & Dati" },
  ],
  radius: 180,
  duration: 34,
  direction: -1,
  color: "var(--text-secondary)",
  bg: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.10)",
};

const orbit3 = {
  items: [
    { en: "React / TypeScript", it: "React / TypeScript" },
    { en: "Python", it: "Python" },
    { en: "PostgreSQL", it: "PostgreSQL" },
    { en: "Power BI", it: "Power BI" },
    { en: "Excel Advanced", it: "Excel Avanzato" },
    { en: "AnyLogic", it: "AnyLogic" },
  ],
  radius: 248,
  duration: 52,
  direction: 1,
  color: "var(--text-muted)",
  bg: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.08)",
};

type OrbitConfig = typeof orbit1;

function OrbitRing({ orbit, lang, inView }: { orbit: OrbitConfig; lang: "en" | "it"; inView: boolean }) {
  const { items, radius, duration, direction, color, bg, border } = orbit;
  const size = radius * 2;

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%", left: "50%",
        marginLeft: -radius,
        marginTop: -radius,
        width: size,
        height: size,
      }}
      animate={inView ? { rotate: direction > 0 ? [0, 360] : [0, -360] } : { rotate: 0 }}
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
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <motion.span
              animate={inView ? { rotate: direction > 0 ? [0, -360] : [0, 360] } : { rotate: 0 }}
              transition={inView ? { duration, repeat: Infinity, ease: "linear" } : { duration: 0 }}
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 500,
                padding: "5px 13px",
                borderRadius: 20,
                background: bg,
                border: `0.5px solid ${border}`,
                color,
                whiteSpace: "nowrap",
                backdropFilter: "blur(8px)",
                cursor: "default",
              }}
            >
              {lang === "en" ? item.en : item.it}
            </motion.span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function ProfileSkills({ lang }: { lang: "en" | "it" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" style={{ padding: "0 24px 32px" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 0, textAlign: "center" }}
        >
          {lang === "en" ? "What I do" : "Cosa faccio"}
        </motion.p>

        <div style={{ position: "relative", height: 560, overflow: "hidden" }}>
          {/* Orbit path lines */}
          {[orbit1, orbit2, orbit3].map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: o.radius * 2,
                height: o.radius * 2,
                marginLeft: -o.radius,
                marginTop: -o.radius,
                borderRadius: "50%",
                border: "0.5px solid rgba(40,120,180,0.1)",
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Center circle pulse */}
          {inView && (
            <motion.div
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                translateX: "-50%", translateY: "-50%",
                width: 80, height: 80,
                borderRadius: "50%",
                border: "1.5px solid var(--teal)",
                pointerEvents: "none",
              }}
              animate={{ scale: [1, 2], opacity: [0.45, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.9 }}
            />
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              translateX: "-50%", translateY: "-50%",
              padding: "10px 20px",
              borderRadius: 40,
              background: "var(--teal)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 8px var(--teal-bg)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: "white", letterSpacing: "0.05em", textTransform: "uppercase" }}>Alessandro Botti</span>
          </motion.div>

          {/* Orbit rings */}
          <OrbitRing orbit={orbit1} lang={lang} inView={inView} />
          <OrbitRing orbit={orbit2} lang={lang} inView={inView} />
          <OrbitRing orbit={orbit3} lang={lang} inView={inView} />
        </div>

      </div>
    </section>
  );
}
