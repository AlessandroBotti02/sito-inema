"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function ProfileNav({ lang, setLang }: { lang: "en" | "it"; setLang: (l: "en" | "it") => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center", padding: "14px 16px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 900,
          padding: "8px 20px",
          borderRadius: 16,
          background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.65)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.07), 0 0 0 0.5px rgba(0,0,0,0.07)"
            : "0 0 0 0.5px rgba(0,0,0,0.07)",
          transition: "all 0.35s ease",
        }}
      >
        {/* Left: back link + INEMA logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link
            href="/"
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--text-muted)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
              whiteSpace: "nowrap",
            }}
          >
            ← INEMA
          </Link>
          <img
            src={`${BASE}/logo.png`}
            alt="INEMA"
            width={88}
            height={22}
            style={{ height: 22, width: "auto", objectFit: "contain" }}
          />
        </div>

        {/* Center: section links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  position: "relative",
                  padding: "6px 11px",
                  fontSize: 13,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                {link.label}
                <motion.span
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: "50%",
                    translateX: "-50%",
                    height: 1.5,
                    width: "60%",
                    background: "var(--blue)",
                    borderRadius: 2,
                    originX: 0.5,
                  }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              </a>
            );
          })}
        </nav>

        {/* Right: lang toggle */}
        <div
          onClick={() => setLang(lang === "en" ? "it" : "en")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            fontSize: 11,
            fontWeight: 600,
            borderRadius: 20,
            border: "0.5px solid var(--card-border)",
            background: "rgba(255,255,255,0.8)",
            overflow: "hidden",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          {(["en", "it"] as const).map((l) => (
            <span
              key={l}
              style={{
                padding: "5px 10px",
                borderRadius: 20,
                background: lang === l ? "var(--blue)" : "transparent",
                color: lang === l ? "#fff" : "var(--text-muted)",
                transition: "all 0.2s ease",
                letterSpacing: "0.06em",
              }}
            >
              {l.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
