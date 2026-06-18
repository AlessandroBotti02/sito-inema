"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const canHover = typeof window !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function Footer({ lang, prefix = "" }: { lang: "it" | "en"; prefix?: string }) {
  const navLinks = {
    it: [
      { label: "Chi Siamo", href: `${prefix}#chi-siamo` },
      { label: "Aree di Intervento", href: `${prefix}#aree` },
      { label: "Settori", href: `${prefix}#settori` },
      { label: "Contatti", href: `${prefix}#contatti` },
    ],
    en: [
      { label: "About", href: `${prefix}#chi-siamo` },
      { label: "Services", href: `${prefix}#aree` },
      { label: "Sectors", href: `${prefix}#settori` },
      { label: "Contact", href: `${prefix}#contatti` },
    ],
  }[lang];

  const t = {
    it: {
      tagline: "Trasformiamo le organizzazioni dal 1995.",
      cta: "Parliamo del tuo progetto",
      navLabel: "Naviga",
      contactLabel: "Contatti",
      partnerLabel: "Partner",
      address: "Via della Zecca 1 — 40121 Bologna",
      tel: "+39 051 587 23 51",
      copyright: "© 2026 INEMA S.R.L. — P.I. 09176950153",
      partnership: "In partnership con",
    },
    en: {
      tagline: "Transforming organisations since 1995.",
      cta: "Let's talk about your project",
      navLabel: "Navigate",
      contactLabel: "Contact",
      partnerLabel: "Partner",
      address: "Via della Zecca 1 — 40121 Bologna",
      tel: "+39 051 587 23 51",
      copyright: "© 2026 INEMA S.R.L. — P.I. 09176950153",
      partnership: "In partnership with",
    },
  }[lang];

  return (
    <footer style={{ background: "var(--bg-footer, #020B14)", position: "relative", overflow: "hidden" }}>
      {/* Ghost brand mark */}
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(80px, 18vw, 200px)",
          fontFamily: "'Clash Display', system-ui, sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          color: "rgba(255,255,255,0.03)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        INEMA
      </div>

      {/* Atmospheric glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(40,120,180,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px 0", position: "relative" }}>

        {/* Brand + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 32,
            paddingBottom: 48,
            borderBottom: "0.5px solid rgba(255,255,255,0.07)",
            marginBottom: 48,
          }}
        >
          <div>
            <img
              src={`${BASE}/logo.png`}
              alt="INEMA"
              width={128}
              height={32}
              style={{ height: 32, width: "auto", objectFit: "contain", marginBottom: 16, display: "block" }}
            />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", lineHeight: 1.65, maxWidth: 260 }}>
              {t.tagline}
            </p>
          </div>

          <motion.a
            href={`${prefix}#contatti`}
            whileHover={canHover ? { scale: 1.02 } : {}}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#fff",
              textDecoration: "none",
              padding: "12px 24px",
              borderRadius: 2,
              background: "var(--blue)",
              border: "none",
              flexShrink: 0,
            }}
          >
            {t.cta}
            <span style={{ opacity: 0.7 }}>→</span>
          </motion.a>
        </motion.div>

        {/* 3-column grid */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 40,
            paddingBottom: 48,
          }}
        >
          {/* Navigate */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 18 }}>
              {t.navLabel}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {navLinks.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  whileHover={canHover ? { color: "rgba(255,255,255,0.9)", x: 2 } : {}}
                  transition={{ duration: 0.15 }}
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.44)", textDecoration: "none" }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 18 }}>
              {t.contactLabel}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <motion.a
                href="mailto:inema@inema.bo.it"
                whileHover={canHover ? { color: "rgba(110,179,232,1)" } : {}}
                transition={{ duration: 0.15 }}
                style={{ fontSize: 13, fontWeight: 500, color: "rgba(110,179,232,0.80)", textDecoration: "none" }}
              >
                inema@inema.bo.it
              </motion.a>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{t.tel}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.55 }}>{t.address}</span>
            </div>
          </div>

          {/* Partners */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 18 }}>
              {t.partnerLabel}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <motion.a
                href="https://www.linkedin.com/company/inema"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={canHover ? { color: "rgba(255,255,255,0.9)", x: 2 } : {}}
                transition={{ duration: 0.15 }}
                style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.50)", textDecoration: "none" }}
              >
                LinkedIn →
              </motion.a>
              <motion.a
                href="https://www.fitstrategy.it"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={canHover ? { color: "rgba(255,255,255,0.65)", x: 2 } : {}}
                transition={{ duration: 0.15 }}
                style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", textDecoration: "none" }}
              >
                FIT Strategy ↗
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)", position: "relative" }}>
        <div style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "18px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}>
          <span style={{ fontSize: 10, letterSpacing: "0.08em", color: "rgba(255,255,255,0.18)" }}>{t.copyright}</span>
          <span style={{ fontSize: 10, letterSpacing: "0.08em", color: "rgba(255,255,255,0.18)" }}>{t.partnership} SSMI</span>
        </div>
      </div>
    </footer>
  );
}
