"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

type ToolDef = {
  id: string;
  name: string;
  short?: string;
  svgFile?: string;
  iconSize?: number;
  bg: [string, string];
  level: 1 | 2 | 3 | 4 | 5;
  levelEn: string;
  levelIt: string;
  projectIds: string[];
};

const levelDotColor = (level: number) =>
  level >= 4 ? "var(--teal)" : level === 3 ? "#7ABFCC" : "var(--text-faint)";

const toolData: ToolDef[] = [
  { id: "excel",      name: "Excel Advanced",   svgFile: "excel_app.png",      iconSize: 50, bg: ["#FFFFFF","#F0F0F0"], level: 5, levelEn: "Advanced",     levelIt: "Avanzato",   projectIds: ["erp-mes"] },
  { id: "powerbi",    name: "Power BI",          svgFile: "powerbi.svg",        iconSize: 28, bg: ["#F2C811","#C88A00"], level: 3, levelEn: "Intermediate", levelIt: "Intermedio", projectIds: [] },
  { id: "knime",      name: "KNIME",             svgFile: "knime_app.png",      iconSize: 50, bg: ["#F0D800","#BBA800"], level: 3, levelEn: "Intermediate", levelIt: "Intermedio", projectIds: [] },
  { id: "postgresql", name: "PostgreSQL",        svgFile: "postgresql_app.png", iconSize: 50, bg: ["#181830","#121225"], level: 4, levelEn: "Advanced",     levelIt: "Avanzato",   projectIds: ["erp-mes"] },
  { id: "sql",        name: "SQL",               svgFile: "sql.svg",            bg: ["#4A6070","#2C3E50"], level: 4, levelEn: "Advanced",     levelIt: "Avanzato",   projectIds: ["erp-mes"] },
  { id: "react",      name: "React / TS",        svgFile: "react.svg",          bg: ["#20232A","#10161A"], level: 4, levelEn: "Advanced",     levelIt: "Avanzato",   projectIds: ["erp-mes"] },
  { id: "typescript", name: "TypeScript",        svgFile: "typescript.svg",     bg: ["#3178C6","#1A5FA8"], level: 4, levelEn: "Advanced",     levelIt: "Avanzato",   projectIds: ["erp-mes"] },
  { id: "python",     name: "Python",            svgFile: "python.svg",         bg: ["#3776AB","#1A5A8A"], level: 3, levelEn: "Intermediate", levelIt: "Intermedio", projectIds: ["erp-mes"] },
  { id: "streamlit",  name: "Streamlit",         svgFile: "streamlit.svg",      bg: ["#FF4B4B","#C43030"], level: 3, levelEn: "Intermediate", levelIt: "Intermedio", projectIds: [] },
  { id: "vscode",     name: "VS Code",           svgFile: "vscode_app.png",     iconSize: 50, bg: ["#FFFFFF","#F0F0F0"], level: 5, levelEn: "Advanced",     levelIt: "Avanzato",   projectIds: [] },
  { id: "anylogic",   name: "AnyLogic",          svgFile: "anylogic_app.png",   iconSize: 50, bg: ["#008DC7","#006B99"], level: 3, levelEn: "Intermediate", levelIt: "Intermedio", projectIds: [] },
  { id: "mes",        name: "MES Systems",       short: "MES",              bg: ["#253545","#1C2E3C"], level: 4, levelEn: "Advanced",     levelIt: "Avanzato",   projectIds: ["erp-mes"] },
  { id: "bc",         name: "Business Central",  short: "BC",               bg: ["#00A4EF","#0082C8"], level: 3, levelEn: "Intermediate", levelIt: "Intermedio", projectIds: [] },
  { id: "teamsystem", name: "TeamSystem",        short: "TS",               bg: ["#0055CC","#003FA0"], level: 3, levelEn: "Intermediate", levelIt: "Intermedio", projectIds: [] },
  { id: "wms",        name: "Modula WMS",        short: "WMS",              bg: ["#FF6600","#D45200"], level: 2, levelEn: "Basic",        levelIt: "Base",       projectIds: [] },
  { id: "claude",     name: "Claude / AI",       svgFile: "claude_app.png", iconSize: 50, bg: ["#D8664D","#A64A38"], level: 5, levelEn: "Advanced",     levelIt: "Avanzato",   projectIds: [] },
];

const groups = [
  { en: "Data & Analytics", it: "Dati & Analytics", ids: ["excel","powerbi","knime","postgresql","sql"] },
  { en: "Development",      it: "Sviluppo",          ids: ["react","typescript","python","streamlit","vscode"] },
  { en: "Simulation & Planning", it: "Simulazione & Pianificazione", ids: ["anylogic","mes"] },
  { en: "ERP & Operations", it: "ERP & Operations",  ids: ["bc","teamsystem","wms"] },
  { en: "AI",               it: "AI",                ids: ["claude"] },
];

const byId = Object.fromEntries(toolData.map((t) => [t.id, t]));

function AppIcon({ tool, globalIndex, lang, inView }: {
  tool: ToolDef; globalIndex: number; lang: "en" | "it"; inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const linkedProjects = projects.filter((p) => tool.projectIds.includes(p.id));

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.16, ease }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 12px)",
              left: "50%",
              x: "-50%",
              zIndex: 200,
              minWidth: 168,
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              borderRadius: 14,
              padding: "12px 14px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.13), 0 0 0 0.5px rgba(0,0,0,0.08)",
              pointerEvents: "none",
            }}
          >
            {/* Arrow */}
            <span style={{
              position: "absolute",
              bottom: -5,
              left: "calc(50% - 5px)",
              width: 10, height: 10,
              background: "rgba(255,255,255,0.97)",
              transform: "rotate(45deg)",
              borderRight: "0.5px solid rgba(0,0,0,0.07)",
              borderBottom: "0.5px solid rgba(0,0,0,0.07)",
            }} />

            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", marginBottom: 7, whiteSpace: "nowrap" }}>
              {tool.name}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: linkedProjects.length ? 10 : 0 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {[1,2,3,4,5].map((d) => (
                  <span key={d} style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: d <= tool.level ? levelDotColor(tool.level) : "var(--text-faint)",
                  }} />
                ))}
              </div>
              <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 500, whiteSpace: "nowrap" }}>
                {lang === "en" ? tool.levelEn : tool.levelIt}
              </span>
            </div>

            {linkedProjects.length > 0 && (
              <div style={{ borderTop: "0.5px solid rgba(0,0,0,0.07)", paddingTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
                {linkedProjects.map((p) => (
                  <a
                    key={p.id}
                    href="#projects"
                    style={{
                      fontSize: 11, color: "var(--teal-dark)", textDecoration: "none",
                      display: "flex", alignItems: "center", gap: 5, fontWeight: 500,
                      pointerEvents: "auto", whiteSpace: "nowrap",
                    }}
                  >
                    <span>📁</span>
                    {lang === "en" ? p.title : p.titleIt}
                    <span style={{ marginLeft: "auto", paddingLeft: 6, color: "var(--teal)" }}>↗</span>
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* App icon */}
      <motion.div
        initial={{ opacity: 0, y: -36, scale: 0.85 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 30,
          delay: globalIndex * 0.045,
        }}
        whileHover={{ scale: 1.08, y: -3, transition: { type: "spring", stiffness: 500, damping: 28, mass: 0.8 } }}
        style={{
          width: 64, height: 64,
          borderRadius: 16,
          background: `linear-gradient(145deg, ${tool.bg[0]}, ${tool.bg[1]})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "default",
          boxShadow: "0 3px 10px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
          flexShrink: 0,
        }}
      >
        {tool.svgFile ? (
          <img
            src={`/team/icons/${tool.svgFile}`}
            alt={tool.name}
            style={{ width: tool.iconSize ?? 32, height: tool.iconSize ?? 32, objectFit: "contain" }}
            draggable={false}
          />
        ) : (
          <span style={{
            fontSize: tool.short && tool.short.length > 2 ? 10 : 13,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.02em",
          }}>
            {tool.short}
          </span>
        )}
      </motion.div>

      {/* Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: globalIndex * 0.045 + 0.2 }}
        style={{
          fontSize: 10, color: "var(--text-muted)",
          textAlign: "center", maxWidth: 72, lineHeight: 1.3,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}
      >
        {tool.name}
      </motion.span>
    </div>
  );
}

export default function ProfileStack({ lang }: { lang: "en" | "it" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  let globalIndex = 0;

  return (
    <section id="stack" style={{ padding: "0 24px 32px" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 28, paddingLeft: 2 }}
        >
          {lang === "en" ? "Tools & stack" : "Strumenti & stack"}
        </motion.p>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {groups.map((group, gi) => {
            const groupTools = group.ids.map((id) => byId[id]).filter(Boolean);
            return (
              <div key={gi}>
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: gi * 0.06, ease }}
                  style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 14 }}
                >
                  {lang === "en" ? group.en : group.it}
                </motion.p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 20px" }}>
                  {groupTools.map((tool) => {
                    const idx = globalIndex++;
                    return (
                      <AppIcon key={tool.id} tool={tool} globalIndex={idx} lang={lang} inView={inView} />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
