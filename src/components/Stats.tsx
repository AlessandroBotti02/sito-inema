"use client";
import { motion, useInView, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import { stats } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

function CountUp({ value, inView }: { value: string; inView: boolean }) {
  const isNumeric = /^\d+/.test(value);
  const num = parseInt(value);
  const suffix = value.replace(/^\d+/, "");
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v) + suffix);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const controls = animate(mv, num, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, isNumeric, mv, num]);

  if (!isNumeric) return <span>{value}</span>;
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Stats({ lang }: { lang: "it" | "en" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.25"],
  });
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} style={{ padding: "0 24px 80px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ height: 1, overflow: "hidden", background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            style={{
              height: "100%",
              scaleX: lineScaleX,
              transformOrigin: "0%",
              background: "linear-gradient(to right, var(--blue-dark), var(--blue-mid), rgba(58,144,204,0))",
            }}
          />
        </div>

        <div
          ref={cardRef}
          className="card"
          style={{
            padding: "40px 48px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.06, ease }}
              style={{
                textAlign: "center",
                padding: "0 20px",
                borderRight: i < stats.length - 1 ? "0.5px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.04em", color: "var(--blue-mid)", lineHeight: 1.1, marginBottom: 6, fontFamily: "'Clash Display', system-ui, sans-serif" }}>
                <CountUp value={s.value} inView={inView} />
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5, letterSpacing: "0.04em" }}>
                {s.label[lang]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
