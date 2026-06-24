"use client";

import BorderGlow from "./BorderGlow";
import { Heart } from "./Heart";
import { SectionBackground } from "./SectionBackground";
import { ScrollReveal } from "./ScrollReveal";

const WISHES_TEXT = [
  "Будем рады, если ваши наряды поддержат нежную атмосферу праздника. Просим <span>без слишком ярких и кислотных цветов</span> — насыщенного фиолетового, неоново-розового и подобного.",
  "Свои тёплые слова и пожелания приносите в сердцах, <span>а подарки — в конверте</span>.",
  "Будем благодарны, если вместо традиционного <span>«Горько!»</span> вы подарите нам свои улыбки, аплодисменты и добрые эмоции.",
  "Несмотря на нашу любовь к детям, мы решили провести этот день в формате <span>18+</span>, чтобы каждый гость смог полностью насладиться праздником.",
] as const;

function renderWishParagraph(text: string) {
  const parts = text.split(/(<span>[\s\S]*?<\/span>)/g);

  return parts.map((part, index) => {
    const match = part.match(/^<span>([\s\S]*?)<\/span>$/);
    if (match) {
      return <span style={{ fontWeight: "bolder" }} key={index}>{match[1]}</span>;
    }
    return part;
  });
}

export function Wishes() {
  return (
    <section className="section-canvas section-highlight wishes-section section-bg">
      <SectionBackground section="wishes" />
      <div className="section-bg__content">
        <ScrollReveal>
          <p className="wishes-section__eyebrow">Небольшой гайд для гостей</p>
        <h2 className="font-display text-5xl md:text-6xl text-center text-ink mb-4">
          Наши пожелания
        </h2>
        <div className="decorative-line w-24 mx-auto mb-12" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
        <div className="max-w-3xl mx-auto px-2">
          <BorderGlow
            animated
            edgeSensitivity={24}
            glowColor="200 80 68"
            backgroundColor="rgba(255, 255, 255, 0.96)"
            borderRadius={24}
            glowRadius={36}
            glowIntensity={1.35}
            coneSpread={28}
            colors={["#b8dff5", "#7ec8e8", "#4a9fd4"]}
            fillOpacity={0.4}
            className="shadow-[0_16px_48px_rgba(74,159,212,0.18)] ring-1 ring-sky-mid/25"
          >
            <div className="wishes-prose">
              <span className="wishes-prose__quote" aria-hidden>
                ❝
              </span>

              {WISHES_TEXT.map((paragraph, index) => (
                <div key={index}>
                  <p className="wishes-prose__paragraph">
                    {renderWishParagraph(paragraph)}
                  </p>
                  {index < WISHES_TEXT.length - 1 && (
                    <div className="wishes-prose__divider" aria-hidden>
                      <span />
                      <Heart size={14} className="!animate-none opacity-60" />
                      <span />
                    </div>
                  )}
                </div>
              ))}

              <div className="wishes-prose__footer" aria-hidden>
                <span>✦</span>
              </div>
            </div>
          </BorderGlow>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
