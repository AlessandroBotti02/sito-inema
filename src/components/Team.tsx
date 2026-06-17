"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { team } from "@/data/team";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

function MemberCard({
  member,
  index,
  inView,
  lang,
  canHover,
}: {
  member: (typeof team)[0];
  index: number;
  inView: boolean;
  lang: "it" | "en";
  canHover: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.04, ease }}
      onHoverStart={() => canHover && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className="card"
        animate={{
          y: hovered ? -4 : 0,
          boxShadow: hovered ? "var(--card-shadow-hover)" : "var(--card-shadow)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ padding: "20px 18px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10 }}
      >
        {/* Avatar */}
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              objectFit: "cover",
              border: "1.5px solid var(--blue-border)",
            }}
          />
        ) : (
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "var(--blue-bg)",
              border: "1.5px solid var(--blue-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 600, color: "var(--blue-dark)", letterSpacing: "0.03em" }}>
              {member.initials}
            </span>
          </div>
        )}

        {/* Name & Role */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
            {member.name}
          </p>
          <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.4 }}>
            {member.role[lang]}
          </p>
        </div>

        {/* Profile link */}
        {member.hasPage && (
          <Link
            href={`/team/${member.slug}`}
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "var(--blue)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 3,
              marginTop: 2,
            }}
          >
            {lang === "it" ? "→ Profilo" : "→ Profile"}
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Team({ lang }: { lang: "it" | "en" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
  }, []);

  return (
    <section id="team" style={{ padding: "0 24px 80px" }} ref={ref}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--blue)",
            marginBottom: 10,
          }}
        >
          {lang === "it" ? "I nostri Partner e Ingegneri" : "Our Partners & Engineers"}
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.06, ease }}
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            lineHeight: 1.1,
            marginBottom: 36,
          }}
        >
          {lang === "it" ? "Le persone che rendono INEMA." : "The people who make INEMA."}
        </motion.h2>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {team.map((member, i) => (
            <MemberCard
              key={member.slug}
              member={member}
              index={i}
              inView={inView}
              lang={lang}
              canHover={canHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
