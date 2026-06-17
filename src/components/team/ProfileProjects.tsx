"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/projects";
import GanttMockup from "./GanttMockup";

const ease = [0.22, 1, 0.36, 1] as const;

const placeholders = [
  { en: "AI Knowledge Base", it: "Knowledge Base AI", cat: "AI · Automation" },
  { en: "Process Simulation", it: "Simulazione Processi", cat: "AnyLogic · Operations" },
];

function ProjectCard({ project, lang, delay, inView }: { project: typeof projects[0]; lang: "en" | "it"; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ cursor: "default" }}
    >
      <motion.div
        className="card"
        animate={{ y: hovered ? -5 : 0, boxShadow: hovered ? "var(--card-shadow-hover)" : "var(--card-shadow)" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ overflow: "hidden" }}
      >
        {/* Mockup area */}
        <div style={{ position: "relative", padding: "20px 20px 0", background: "var(--navy)", borderRadius: "18px 18px 0 0" }}>
          <GanttMockup dark />
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(10,21,32,0.55)",
              backdropFilter: "blur(2px)",
              borderRadius: "18px 18px 0 0",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 500, color: "#fff", letterSpacing: "-0.01em" }}>
              {lang === "en" ? "Case study ↗" : "Caso studio ↗"}
            </span>
          </motion.div>
        </div>

        {/* Details */}
        <div style={{ padding: "18px 22px 22px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              {lang === "en" ? project.title : project.titleIt}
            </h3>
            <span style={{ fontSize: 11, color: "var(--text-faint)", flexShrink: 0, marginTop: 2 }}>{project.year}</span>
          </div>
          <p style={{ fontSize: 12, color: "var(--teal-dark)", marginBottom: 10, fontWeight: 500 }}>
            {lang === "en" ? project.industry : project.industryIt}
            {" · "}
            {lang === "en" ? "Hybrid production planning" : "Pianificazione produzione ibrida"}
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 14 }}>
            {lang === "en" ? project.description : project.descriptionIt}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                animate={{ background: hovered ? "var(--teal)" : "var(--teal-bg)", color: hovered ? "#fff" : "var(--teal-dark)" }}
                transition={{ duration: 0.2 }}
                style={{
                  fontSize: 11, padding: "3px 9px", borderRadius: 6,
                  border: "0.5px solid var(--teal-border)",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PlaceholderCard({ item, lang, delay, inView }: { item: typeof placeholders[0]; lang: "en" | "it"; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease }}
      style={{
        borderRadius: 18,
        border: "1px dashed rgba(40,120,180,0.25)",
        background: "rgba(255,255,255,0.35)",
        padding: "28px 24px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        minHeight: 160,
      }}
    >
      <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--teal-border)", marginBottom: 10 }}>
        {lang === "en" ? "Coming soon" : "In arrivo"}
      </p>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-muted)", marginBottom: 6 }}>
          {lang === "en" ? item.en : item.it}
        </p>
        <p style={{ fontSize: 11, color: "var(--text-faint)" }}>{item.cat}</p>
      </div>
    </motion.div>
  );
}

export default function ProfileProjects({ lang }: { lang: "en" | "it" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" style={{ padding: "0 24px 32px" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 14, paddingLeft: 2 }}
        >
          {lang === "en" ? "Selected projects" : "Progetti selezionati"}
        </motion.p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} lang={lang} delay={i * 0.1} inView={inView} />
          ))}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {placeholders.map((item, i) => (
              <PlaceholderCard key={i} item={item} lang={lang} delay={0.15 + i * 0.08} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
