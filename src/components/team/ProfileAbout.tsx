"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const timeline = [
  {
    year: "2025 — oggi",
    en: "Management & Operations Consultant",
    it: "Management & Operations Consultant",
    place: "Inema · Bologna",
    detail: { en: "Data tools, custom apps, AI integrations", it: "Strumenti dati, app personalizzate, integrazioni AI" },
    active: true,
    color: "var(--teal)",
  },
  {
    year: "apr 2025",
    en: "M.Sc. Management Engineering — 96/110",
    it: "Laurea Magistrale Ing. Gestionale — 96/110",
    place: "UniMoRe",
    detail: { en: "Thesis: \"Large Language Models: a new era in data management\"", it: "Tesi: \"Large Language Model: una nuova era nella gestione dei dati\"" },
    active: false,
    color: "var(--teal-dark)",
  },
  {
    year: "giu 2022",
    en: "B.Sc. Industrial Engineering — 87/110",
    it: "Laurea Triennale Ing. Industriale — 87/110",
    place: "UniMoRe",
    detail: { en: "Thesis: Cold-storage warehouse analysis using Operations Research", it: "Tesi: Analisi di un magazzino del freddo con Ricerca Operativa" },
    active: false,
    color: "#7ABFCC",
  },
  {
    year: "2016 — oggi",
    en: "Industrial Operator & Data Entry",
    it: "Operaio Industriale & Gestione Dati",
    place: "C.M.G. di Botti&C. · Reggio Emilia",
    detail: { en: "Machine tools, assembly, logistics, ERP data management — the floor-level foundation", it: "Macchine utensili, montaggio, logistica, ERP — la base sul campo" },
    active: false,
    color: "var(--text-faint)",
  },
];

const metrics = [
  { value: 7, suffix: "+", en: "years in industry", it: "anni nell'industria" },
  { value: 15, suffix: "+", en: "companies served", it: "aziende seguite" },
  { value: 3, suffix: "", en: "sectors", it: "settori" },
];

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 900;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <>{count}{suffix}</>;
}

export default function ProfileAbout({ lang }: { lang: "en" | "it" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const bio = lang === "en" ? (
    <>
      Management Engineer graduated at UniMoRe in April 2025 <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>(96/110)</strong>. I grew up in a manufacturing family — since I was 16 I've been working at{" "}
      <strong style={{ color: "var(--text-secondary)", fontWeight: 500 }}>C.M.G. di Botti&C.</strong>, a metalworking company in Reggio Emilia, learning firsthand how production, logistics, and ERP systems work on the floor.
      <br /><br />
      That background shaped everything: my B.Sc. thesis analysed cold-storage warehouse operations using Operations Research, and my M.Sc. thesis explored how{" "}
      <strong style={{ color: "var(--teal-dark)", fontWeight: 500 }}>Large Language Models are redefining data management</strong>. Now I apply all of it at{" "}
      <strong style={{ color: "var(--teal-dark)", fontWeight: 500 }}>Inema</strong>, building data tools, custom apps, and AI integrations for real operational challenges.
    </>
  ) : (
    <>
      Ingegnere Gestionale laureato all'UniMoRe nell'aprile 2025 <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>(96/110)</strong>. Sono cresciuto in una famiglia manifatturiera — da quando avevo 16 anni lavoro alla{" "}
      <strong style={{ color: "var(--text-secondary)", fontWeight: 500 }}>C.M.G. di Botti&C.</strong>, azienda metalmeccanica di Reggio Emilia, imparando direttamente come funzionano produzione, logistica e sistemi ERP sul campo.
      <br /><br />
      Quella base ha plasmato tutto: la tesi triennale analizzava un magazzino del freddo con la Ricerca Operativa, e la tesi magistrale esplorava come i{" "}
      <strong style={{ color: "var(--teal-dark)", fontWeight: 500 }}>Large Language Model stanno ridefinendo la gestione dei dati</strong>. Oggi applico tutto questo da{" "}
      <strong style={{ color: "var(--teal-dark)", fontWeight: 500 }}>Inema</strong>, costruendo strumenti dati, app personalizzate e integrazioni AI per sfide operative reali.
    </>
  );

  return (
    <section style={{ padding: "0 24px 32px" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Metrics strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="card"
              style={{ padding: "18px 20px", textAlign: "center" }}
            >
              <p style={{ fontSize: 30, fontWeight: 500, color: "var(--teal)", letterSpacing: "-0.02em", marginBottom: 4 }}>
                <Counter target={m.value} suffix={m.suffix} inView={inView} />
              </p>
              <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.4 }}>
                {lang === "en" ? m.en : m.it}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bio + Timeline */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="card"
            style={{ padding: 28 }}
          >
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 16 }}>
              {lang === "en" ? "Who I am" : "Chi sono"}
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.82, color: "var(--text-secondary)" }}>{bio}</p>

            {/* Language chips */}
            <div style={{ display: "flex", gap: 7, marginTop: 20, flexWrap: "wrap" }}>
              {[
                { flag: "🇮🇹", lang: "Italiano", level: lang === "en" ? "Native" : "Madrelingua" },
                { flag: "🇬🇧", lang: "English", level: "B2" },
                { flag: "🇫🇷", lang: "Français", level: "A2" },
              ].map((l) => (
                <span key={l.lang} style={{
                  fontSize: 11, padding: "4px 10px", borderRadius: 2,
                  background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.10)",
                  color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 5,
                }}>
                  <span>{l.flag}</span>
                  <span>{l.lang}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 10 }}>{l.level}</span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28, ease }}
            className="card"
            style={{ padding: 28 }}
          >
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 20 }}>
              {lang === "en" ? "Background" : "Percorso"}
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.09, ease }}
                  style={{ display: "flex", gap: 14, paddingBottom: i < timeline.length - 1 ? 16 : 0 }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0, display: "block",
                      background: item.color,
                      boxShadow: item.active ? `0 0 0 3px var(--teal-bg)` : "none",
                    }} />
                    {i < timeline.length - 1 && (
                      <span style={{ width: 1, flex: 1, background: "var(--card-border)", marginTop: 5, minHeight: 14, display: "block" }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: 2, flex: 1 }}>
                    <p style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 2, letterSpacing: "0.03em" }}>{item.year}</p>
                    <p style={{ fontSize: 12, fontWeight: 600, color: item.active ? "var(--text-primary)" : "var(--text-secondary)", marginBottom: 1 }}>
                      {lang === "en" ? item.en : item.it}
                    </p>
                    <p style={{ fontSize: 11, color: item.active ? "var(--teal-dark)" : "var(--text-muted)", marginBottom: item.detail ? 3 : 0 }}>
                      {item.place}
                    </p>
                    {item.detail && (
                      <p style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.45, fontStyle: "italic" }}>
                        {lang === "en" ? item.detail.en : item.detail.it}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
