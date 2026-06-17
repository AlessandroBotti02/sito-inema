"use client";
import { useState } from "react";
import { MotionConfig } from "framer-motion";
import ProfileNav from "./ProfileNav";
import ProfileHero from "./ProfileHero";
import ProfileAbout from "./ProfileAbout";
import ProfileSkills from "./ProfileSkills";
import ProfileProjects from "./ProfileProjects";
import ProfileStack from "./ProfileStack";
import ProfileContact from "./ProfileContact";

export default function ProfilePageClient() {
  const [lang, setLang] = useState<"en" | "it">("it");

  return (
    <MotionConfig reducedMotion="user">
      <main style={{ minHeight: "100vh" }}>
        <ProfileNav lang={lang} setLang={setLang} />
        <ProfileHero lang={lang} />
        <ProfileAbout lang={lang} />
        <ProfileSkills lang={lang} />
        <ProfileProjects lang={lang} />
        <ProfileStack lang={lang} />
        <ProfileContact lang={lang} />
      </main>
    </MotionConfig>
  );
}
