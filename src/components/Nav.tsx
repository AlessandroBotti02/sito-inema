"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const links = [
  { label: { it: "Chi Siamo", en: "About" }, href: "#chi-siamo" },
  { label: { it: "Aree", en: "Services" }, href: "#aree" },
  { label: { it: "Settori", en: "Sectors" }, href: "#settori" },
  { label: { it: "Team", en: "Team" }, href: "#team" },
  { label: { it: "Contatti", en: "Contact" }, href: "#contatti" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Nav({ lang, setLang }: { lang: "it" | "en"; setLang: (l: "it" | "en") => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setLogoVisible(window.scrollY > window.innerHeight * 0.42);
    };
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
      transition={{ duration: 0.6, delay: 0.6, ease }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center", padding: "14px 16px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 1000,
          padding: "8px 20px",
          borderRadius: 2,
          background: scrolled ? "rgba(6,17,30,0.90)" : "rgba(6,17,30,0.45)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,255,255,0.07)"
            : "0 0 0 0.5px rgba(255,255,255,0.06)",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <motion.img
            src={`${BASE}/logo.png`}
            alt="INEMA"
            width={112}
            height={28}
            style={{ height: 28, width: "auto", objectFit: "contain" }}
            animate={{ opacity: logoVisible ? 1 : 0, x: logoVisible ? 0 : -6 }}
            transition={{ duration: 0.25, ease }}
          />
        </a>

        {/* Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  position: "relative",
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: isActive ? 500 : 400,
                  letterSpacing: "0.04em",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.48)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                {link.label[lang]}
                <motion.span
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: "50%",
                    translateX: "-50%",
                    height: 1.5,
                    width: "60%",
                    background: "var(--blue-mid)",
                    borderRadius: 1,
                    originX: 0.5,
                  }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.25, ease }}
                />
              </a>
            );
          })}
        </nav>

        {/* Right: lang + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            onClick={() => setLang(lang === "it" ? "en" : "it")}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 2,
              border: "0.5px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.05)",
              overflow: "hidden",
              cursor: "pointer",
              userSelect: "none",
              letterSpacing: "0.08em",
            }}
          >
            {(["it", "en"] as const).map((l) => (
              <span
                key={l}
                style={{
                  padding: "5px 10px",
                  borderRadius: 2,
                  background: lang === l ? "var(--blue)" : "transparent",
                  color: lang === l ? "#fff" : "rgba(255,255,255,0.40)",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.08em",
                }}
              >
                {l.toUpperCase()}
              </span>
            ))}
          </div>
          <a
            href="#contatti"
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              padding: "7px 18px",
              borderRadius: 2,
              border: "0.5px solid rgba(255,255,255,0.20)",
              background: "transparent",
              color: "#fff",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,1)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#06111E";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
          >
            {lang === "it" ? "CONTATTACI" : "CONTACT"}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
