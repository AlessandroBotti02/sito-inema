"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contatti({ lang }: { lang: "it" | "en" }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", messaggio: "" });

  const t = {
    it: {
      label: "Contatti",
      title: "Parliamo del",
      titleAccent: "tuo progetto.",
      sub: "Siamo a Bologna e operiamo in tutta Italia. Scrivici per una prima consulenza senza impegno.",
      nome: "Nome e Cognome",
      email: "Email",
      messaggio: "Racconta brevemente il tuo progetto",
      send: "Invia messaggio →",
      sent: "Messaggio inviato — ti risponderemo presto.",
      or: "oppure scrivici direttamente a",
      address1: "Sede Legale: Via della Zecca 1, 40121 Bologna",
      address2: "Sede Operativa: Via Caduti di Amola 11/2, 40132 Bologna",
      tel: "Tel: (+39) 051 587 23 51",
    },
    en: {
      label: "Contact",
      title: "Let's talk about",
      titleAccent: "your project.",
      sub: "We are based in Bologna and operate across Italy. Write to us for a first consultation with no commitment.",
      nome: "Full Name",
      email: "Email",
      messaggio: "Tell us briefly about your project",
      send: "Send message →",
      sent: "Message sent — we will get back to you shortly.",
      or: "or write directly to",
      address1: "Registered office: Via della Zecca 1, 40121 Bologna",
      address2: "Operations: Via Caduti di Amola 11/2, 40132 Bologna",
      tel: "Tel: (+39) 051 587 23 51",
    },
  }[lang];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = `mailto:inema@inema.bo.it?subject=Contatto da ${form.nome}&body=${encodeURIComponent(form.messaggio)}%0A%0AEmail: ${form.email}`;
    setSent(true);
  }

  const inputStyle: React.CSSProperties = {
    padding: "12px 14px",
    borderRadius: 2,
    border: "0.5px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    fontSize: 14,
    color: "var(--text-primary)",
    outline: "none",
    fontFamily: "inherit",
    WebkitTextFillColor: "var(--text-primary)",
  };

  return (
    <section id="contatti" style={{ padding: "100px clamp(24px, 5vw, 80px) 80px", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35, ease }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ width: 22, height: 1, background: "var(--blue-mid)", borderRadius: 1, display: "block" }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue-mid)" }}>
              {t.label}
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.04em", marginBottom: 18, textTransform: "uppercase" }}>
            <span style={{ color: "var(--text-primary)", display: "block" }}>{t.title}</span>
            <span style={{ color: "var(--text-faint)", display: "block" }}>{t.titleAccent}</span>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-secondary)", marginBottom: 36 }}>
            {t.sub}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[t.address1, t.address2, t.tel].map((line) => (
              <div key={line} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--blue-mid)", flexShrink: 0, marginTop: 7, display: "block" }} />
                <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{line}</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--blue-mid)", flexShrink: 0, display: "block" }} />
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{t.or} </span>
              <a href="mailto:inema@inema.bo.it" style={{ fontSize: 13, color: "var(--blue-mid)", textDecoration: "none", fontWeight: 500 }}>
                inema@inema.bo.it
              </a>
            </div>
          </div>

          {/* Careers note */}
          <div
            style={{
              marginTop: 32,
              padding: "16px 20px",
              borderRadius: 2,
              background: "var(--blue-bg)",
              border: "0.5px solid var(--blue-border)",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--blue-mid)", marginBottom: 6 }}>
              {lang === "it" ? "LAVORA CON NOI" : "WORK WITH US"}
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {lang === "it"
                ? "Cerchiamo professionisti con la passione per la consulenza."
                : "We look for professionals with a passion for consulting."}
              {" "}
              <a href="mailto:inema@inema.bo.it" style={{ color: "var(--blue-mid)", textDecoration: "none" }}>
                {lang === "it" ? "Scrivici →" : "Write to us →"}
              </a>
            </p>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35, delay: 0.1, ease }}
          className="card"
          style={{ padding: "36px 32px" }}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease }}
              style={{ textAlign: "center", padding: "40px 0" }}
            >
              <div style={{ fontSize: 32, marginBottom: 16, color: "var(--blue-mid)" }}>✓</div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{t.sent}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { key: "nome", label: t.nome, type: "text", autoComplete: "name" },
                { key: "email", label: t.email, type: "email", autoComplete: "email" },
              ].map((field) => (
                <label key={field.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                    {field.label}
                  </span>
                  <input
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    style={inputStyle}
                  />
                </label>
              ))}
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  {t.messaggio}
                </span>
                <textarea
                  required
                  rows={5}
                  autoComplete="off"
                  value={form.messaggio}
                  onChange={(e) => setForm(f => ({ ...f, messaggio: e.target.value }))}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                />
              </label>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "13px 24px",
                  borderRadius: 2,
                  border: "none",
                  background: "var(--blue)",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  marginTop: 4,
                }}
              >
                {t.send}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
