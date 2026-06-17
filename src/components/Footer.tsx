"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const canHover = typeof window !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function Footer({ lang }: { lang: "it" | "en" }) {
  const navLinks = {
    it: [
      { label: "Chi Siamo", href: "#chi-siamo" },
      { label: "Aree di Intervento", href: "#aree" },
      { label: "Settori", href: "#settori" },
      { label: "Contatti", href: "#contatti" },
    ],
    en: [
      { label: "About", href: "#chi-siamo" },
      { label: "Services", href: "#aree" },
      { label: "Sectors", href: "#settori" },
      { label: "Contact", href: "#contatti" },
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
    <footer style={{ background: "#0C1A2E" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px 0" }}>

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
            borderBottom: "0.5px solid rgba(255,255,255,0.08)",
            marginBottom: 48,
          }}
        >
          <div>
            <img
              src="/logo.png"
              alt="INEMA"
              width={128}
              height={32}
              style={{
                height: 32,
                width: "auto",
                objectFit: "contain",
                marginBottom: 16,
                display: "block",
              }}
            />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.65, maxWidth: 280 }}>
              {t.tagline}
            </p>
          </div>

          <motion.a
            href="#contatti"
            whileHover={canHover ? { scale: 1.02 } : {}}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 500,
              color: "#fff",
              textDecoration: "none",
              padding: "11px 22px",
              borderRadius: 12,
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
            <div style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 18,
            }}>
              {t.navLabel}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {navLinks.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  whileHover={canHover ? { color: "rgba(255,255,255,0.9)", x: 2 } : {}}
                  transition={{ duration: 0.15 }}
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <div style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 18,
            }}>
              {t.contactLabel}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <motion.a
                href="mailto:inema@inema.bo.it"
                whileHover={canHover ? { color: "rgba(110,179,232,1)" } : {}}
                transition={{ duration: 0.15 }}
                style={{ fontSize: 13, fontWeight: 500, color: "rgba(110,179,232,0.85)", textDecoration: "none" }}
              >
                inema@inema.bo.it
              </motion.a>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                {t.tel}
              </span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.55 }}>
                {t.address}
              </span>
            </div>
          </div>

          {/* Partners / Social */}
          <div>
            <div style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 18,
            }}>
              {t.partnerLabel}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <motion.a
                href="https://www.linkedin.com/company/inema"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={canHover ? { color: "rgba(255,255,255,0.9)", x: 2 } : {}}
                transition={{ duration: 0.15 }}
                style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
              >
                LinkedIn →
              </motion.a>
              <motion.a
                href="https://www.fitstrategy.it"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={canHover ? { color: "rgba(255,255,255,0.7)", x: 2 } : {}}
                transition={{ duration: 0.15 }}
                style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", textDecoration: "none" }}
              >
                FIT Strategy ↗
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
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
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{t.copyright}</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{t.partnership} SSMI</span>
        </div>
      </div>
    </footer>
  );
}
