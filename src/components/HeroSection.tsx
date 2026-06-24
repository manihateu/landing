"use client";

import dynamic from "next/dynamic";
import { ScrollReveal } from "./ScrollReveal";
import "./HeroSection.css";

const LineWaves = dynamic(() => import("./LineWaves"), { ssr: false });

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section">
      <div className="absolute inset-0 z-0">
        <LineWaves
          speed={0.3}
          innerLineCount={5}
          outerLineCount={10}
          warpIntensity={1.0}
          rotation={-45}
          edgeFadeWidth={0.0}
          colorCycleSpeed={0.6}
          brightness={0.25}
          color1="#ffffff"
          color2="#b8dff5"
          color3="#7ec8e8"
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-white/40 pointer-events-none" />

      <div className="relative z-10 text-center px-6 py-20 pointer-events-none">
        <ScrollReveal>
          <p className="font-body text-xl md:text-2xl text-ink-muted tracking-[0.3em] uppercase mb-6">
            Мы женимся
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h1 className="font-display text-7xl md:text-9xl lg:text-[10rem] text-ink leading-none">
            Никита
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="font-display text-5xl md:text-7xl text-ink-muted my-4">&</p>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <h1 className="font-display text-7xl md:text-9xl lg:text-[10rem] text-ink leading-none">
            Полина
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="decorative-line w-48 mx-auto my-10" />
          <p className="font-body text-2xl md:text-3xl text-ink italic">
            18 сентября 2026
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
