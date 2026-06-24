"use client";

import nikitaPhoto from "@/assets/nikita.jpg";
import polinaPhoto from "@/assets/polina.jpg";
import ProfileCard from "./ProfileCard";
import { SectionBackground } from "./SectionBackground";
import { ScrollReveal } from "./ScrollReveal";

const photos = [
  {
    name: "Жених",
    src: nikitaPhoto.src,
  },
  {
    name: "Невеста",
    src: polinaPhoto.src,
  },
] as const;

const PROFILE_CARD_PROPS = {
  showUserInfo: false,
  enableTilt: true,
  enableMobileTilt: false,
  behindGlowEnabled: false,
  className: "pc-card-wrapper--compact pc-card-wrapper--duo w-full",
} as const;

export function ChildhoodPhotos() {
  return (
    <section className="section-canvas section-sky section-bg">
      <SectionBackground section="childhoodPhotos" />
      <div className="section-bg__content">
        <ScrollReveal>
          <h2 className="font-display text-5xl md:text-6xl text-center text-ink mb-4">
            Мы были такими
          </h2>
          <p className="font-body text-xl text-center text-ink-muted mb-12">
            А потом судьба свела нас вместе
          </p>
        </ScrollReveal>

        <div className="childhood-photos__grid px-4">
          {photos.map((photo, i) => (
            <ScrollReveal
              key={photo.name}
              delay={i * 0.15}
              className="childhood-photos__item"
            >
              <ProfileCard
                {...PROFILE_CARD_PROPS}
                name={photo.name}
                avatarUrl={photo.src}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
