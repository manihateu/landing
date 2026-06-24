"use client";

import dynamic from "next/dynamic";

import heart2Model from "@/assets/heart2.glb";
import { ScrollReveal } from "./ScrollReveal";
import { SectionBackground } from "./SectionBackground";

const HeartModel3D = dynamic(
  () => import("./HeartModel3D").then((mod) => mod.HeartModel3D),
  { ssr: false },
);

export function FooterHeart() {
  return (
    <section className="section-bg py-12">
      <SectionBackground section="footerHeart" />
      <div className="section-bg__content flex justify-center">
        <ScrollReveal>
          <div className="heart-footer-model shrink-0 drop-shadow-md">
            <HeartModel3D
              src={heart2Model}
              fallbackSize={80}
              autoRotate
              rotationPerSecond="50deg"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
