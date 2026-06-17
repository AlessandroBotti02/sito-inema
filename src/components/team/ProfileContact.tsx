"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const btnSpring = { type: "spring", stiffness: 500, damping: 28, mass: 0.8 } as const;

export default function ProfileContact({ lang }: { lang: "en" | "it" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const t = {
    en: {
      label: "Contact",
      title: "Let's talk.",
      sub: "If you're working on something that involves data, processes, or custom tools — I'm happy to have a conversation.",
      email: "Email me",
      linkedin: "LinkedIn",
      footer: "Management & Operations Consultant · Inema",
    },
    it: {
      label: "Contatti",
      title: "Parliamo.",
      sub: "Se stai lavorando su qualcosa che riguarda dati, processi o strumenti personalizzati — sono disponibile a una conversazione.",
      email: "Scrivimi",
      linkedin: "LinkedIn",
      footer: "Management & Operations Consultant · Inema",
    },
  }[lang];

  return (
    <section id="contact" style={{ padding: "0 24px 100px" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="card"
          style={{ padding: "44px 44px 40px" }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 28 }}>
            {/* Photo circle */}
            <div style={{
              width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
              overflow: "hidden",
              background: "var(--teal-bg)",
              border: "1.5px solid var(--teal-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <img
                src="/team/photo-botti.jpg"
                alt="Alessandro Botti"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).nextElementSibling?.setAttribute("style", "display:flex"); }}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />
              <span style={{
                display: "none", fontSize: 14, fontWeight: 600,
                color: "var(--teal-dark)", alignItems: "center", justifyContent: "center",
                width: "100%", height: "100%",
              }}>AB</span>
            </div>

            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 6 }}>
                {t.label}
              </p>
              <motion.h2
                initial={{ opacity: 0, scale: 0.96 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1, ease }}
                style={{ fontSize: 44, fontWeight: 500, letterSpacing: "-0.03em", color: "var(--text-primary)", lineHeight: 1 }}
              >
                {t.title}
              </motion.h2>
            </div>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: 460, marginBottom: 32 }}>
            {t.sub}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2, ease }}
            style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
          >
            <motion.a
              href="mailto:alessandro.botti@inema.bo.it"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={btnSpring}
              style={{
                fontSize: 13, fontWeight: 500, padding: "11px 26px", borderRadius: 12,
                background: "var(--teal)", color: "#fff", textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {t.email} ↗
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/alessandro-botti-698b73159"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={btnSpring}
              style={{
                fontSize: 13, padding: "11px 26px", borderRadius: 12, textDecoration: "none",
                color: "var(--text-secondary)",
                background: "rgba(255,255,255,0.85)",
                border: "0.5px solid rgba(0,0,0,0.1)",
              }}
            >
              {t.linkedin} ↗
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, padding: "0 4px" }}
        >
          <span style={{ fontSize: 11, color: "var(--text-faint)" }}>Alessandro Botti © 2026</span>
          <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{t.footer}</span>
        </motion.div>
      </div>
    </section>
  );
}
