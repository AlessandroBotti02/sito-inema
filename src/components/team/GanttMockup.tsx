"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const rows = [
  { label: "Order A", fill: 70, offset: 4, variant: "primary" },
  { label: "Order B", fill: 48, offset: 22, variant: "dark" },
  { label: "Order C", fill: 38, offset: 42, variant: "light" },
  { label: "Order D", fill: 28, offset: 14, variant: "primary" },
  { label: "Order E", fill: 55, offset: 30, variant: "dark" },
];

export default function GanttMockup({ dark }: { dark?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      style={{
        borderRadius: 12,
        padding: 16,
        background: dark ? "rgba(255,255,255,0.05)" : "#EEF3F6",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00B4C8", display: "block" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.12)" : "#DDE5EA", display: "block" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.12)" : "#DDE5EA", display: "block" }} />
        </div>
        <span style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.4)" : "#9AAAB5" }}>Production Schedule</span>
        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "rgba(0,180,200,0.15)", color: "#00B4C8" }}>Live</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map((row, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 11, width: 52, flexShrink: 0, color: dark ? "rgba(255,255,255,0.4)" : "#9AAAB5" }}>{row.label}</span>
            <div style={{ flex: 1, height: 10, borderRadius: 999, overflow: "hidden", background: dark ? "rgba(255,255,255,0.08)" : "#DDE5EA" }}>
              <motion.div
                style={{
                  height: "100%", borderRadius: 999,
                  marginLeft: `${row.offset}%`,
                  background: row.variant === "primary" ? "#00B4C8" : row.variant === "dark" ? (dark ? "rgba(255,255,255,0.3)" : "#253545") : "#9AAAB5",
                  opacity: row.variant === "light" ? 0.35 : 1,
                }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${row.fill}%` } : { width: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: row.variant === "primary" ? "#00B4C8" : (dark ? "rgba(255,255,255,0.12)" : "#DDE5EA"), display: "block" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
