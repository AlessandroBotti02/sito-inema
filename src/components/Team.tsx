"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { team } from "@/data/team";
import Link from "next/link";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ease = [0.22, 1, 0.36, 1] as const;
const SPEED = 0.5; // px per frame
const CARD_W = 180;

// Duplicate for seamless loop
const looped = [...team, ...team];

function MemberCard({ member, lang }: { member: (typeof team)[0]; lang: "it" | "en" }) {
  return (
    <div
      className="card"
      style={{ padding: "20px 18px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10 }}
    >
      {member.avatar ? (
        <img
          src={`${BASE}${member.avatar}`}
          alt={member.name}
          style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", border: "1.5px solid var(--blue-border)" }}
        />
      ) : (
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: "var(--blue-bg)", border: "1.5px solid var(--blue-border)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "var(--blue-mid)", letterSpacing: "0.03em" }}>
            {member.initials}
          </span>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
          {member.name}
        </p>
        <p style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.4, letterSpacing: "0.02em" }}>
          {member.role[lang]}
        </p>
      </div>
      {member.hasPage && (
        <Link
          href={`/team/${member.slug}`}
          style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "var(--blue-mid)", textDecoration: "none", display: "flex", alignItems: "center", gap: 3, marginTop: 2, textTransform: "uppercase" }}
        >
          {lang === "it" ? "→ Profilo" : "→ Profile"}
        </Link>
      )}
    </div>
  );
}

export default function Team({ lang }: { lang: "it" | "en" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const rafId = useRef(0);
  const posRef = useRef(0);
  const halfWidthRef = useRef(0);
  const pausedRef = useRef(false);

  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // Measure half-width (the point where we reset the loop)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => { halfWidthRef.current = el.scrollWidth / 2; };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-scroll loop — always running, paused via ref
  useEffect(() => {
    const animate = () => {
      const el = trackRef.current;
      const half = halfWidthRef.current;
      if (el && half && !pausedRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= half) posRef.current -= half;
        el.scrollLeft = posRef.current;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const handleMouseEnter = () => {
    if (!canHover) return;
    pausedRef.current = true;
    setIsHovering(true);
    if (trackRef.current) posRef.current = trackRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    setIsHovering(false);
    isDraggingRef.current = false;
    setIsDragging(false);
    if (trackRef.current) posRef.current = trackRef.current.scrollLeft;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canHover || !isHovering) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = trackRef.current?.scrollLeft ?? 0;
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    let next = dragStartScroll.current - dx;
    const half = halfWidthRef.current;
    if (half) {
      if (next < 0) { next += half; dragStartScroll.current += half; }
      if (next >= half) { next -= half; dragStartScroll.current -= half; }
    }
    trackRef.current.scrollLeft = next;
    posRef.current = next;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      style={{ padding: "80px 0", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease }}
        style={{ padding: "0 clamp(24px, 5vw, 80px)", marginBottom: 44 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ width: 18, height: 1, background: "var(--blue-mid)", display: "block" }} />
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue-mid)" }}>
            {lang === "it" ? "I nostri Partner e Ingegneri" : "Our Partners & Engineers"}
          </span>
        </div>
        <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, letterSpacing: "-0.04em", textTransform: "uppercase", lineHeight: 1.02, margin: 0 }}>
          <span style={{ color: "var(--text-primary)" }}>
            {lang === "it" ? "Le persone che rendono " : "The people who make "}
          </span>
          <span style={{ color: "var(--text-faint)" }}>INEMA.</span>
        </h2>
      </motion.div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          overflowX: "scroll",
          overflowY: "hidden",
          scrollbarWidth: "none",
          cursor: isDragging ? "grabbing" : (isHovering ? "grab" : "auto"),
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <div style={{
          display: "flex",
          gap: 10,
          width: "max-content",
          padding: "16px clamp(24px, 5vw, 80px)",
        }}>
          {looped.map((member, i) => (
            <div key={`${member.slug}-${i}`} style={{ width: CARD_W, flexShrink: 0 }}>
              <MemberCard member={member} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
