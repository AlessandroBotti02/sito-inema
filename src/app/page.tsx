"use client";
import { useState } from "react";
import { MotionConfig } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ChiSiamo from "@/components/ChiSiamo";
import Aree from "@/components/Aree";
import Settori from "@/components/Settori";
import Contatti from "@/components/Contatti";
import Footer from "@/components/Footer";
import Team from "@/components/Team";

export default function Home() {
  const [lang, setLang] = useState<"it" | "en">("it");

  return (
    <MotionConfig reducedMotion="user">
<main style={{ minHeight: "100vh" }}>
        <ProgressBar />
        <Nav lang={lang} setLang={setLang} />
        <Hero lang={lang} />
        <Stats lang={lang} />
        <ChiSiamo lang={lang} />
        <Aree lang={lang} />
        <Settori lang={lang} />
        <Team lang={lang} />
        <Contatti lang={lang} />
        <Footer lang={lang} />
      </main>
    </MotionConfig>
  );
}
