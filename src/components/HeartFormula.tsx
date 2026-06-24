"use client";

import dynamic from "next/dynamic";

import { SectionBackground } from "./SectionBackground";
import { ScrollReveal } from "./ScrollReveal";

const HeartModel3D = dynamic(
  () => import("./HeartModel3D").then((mod) => mod.HeartModel3D),
  { ssr: false },
);

export function HeartFormula() {
  return (
    <section className="section-canvas section-bg flex items-center justify-center">
      <SectionBackground section="heartFormula" />
      <div className="section-bg__content w-full flex items-center justify-center">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="font-display text-6xl md:text-8xl text-ink">Н</span>
            <span className="font-display text-5xl md:text-7xl text-ink-muted">+</span>
            <span className="font-display text-6xl md:text-8xl text-ink">П</span>
            <span className="font-display text-5xl md:text-7xl text-ink-muted">=</span>
            <div className="heart-formula-model shrink-0 animate-heartbeat">
              <HeartModel3D />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
