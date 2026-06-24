"use client";

import {
  Clock,
  Heart,
  Home,
  MapPin,
  Trees,
  Wine,
  type LucideIcon,
} from "lucide-react";

import { TIMELINE } from "@/lib/constants";
import { ScrollReveal } from "./ScrollReveal";
import { SectionBackground } from "./SectionBackground";
import SpotlightCard from "./SpotlightCard";

type TimelineEvent = Extract<(typeof TIMELINE)[number], { type: "event" }>;

const TIMELINE_ICONS: Record<TimelineEvent["icon"], LucideIcon> = {
  heart: Heart,
  wine: Wine,
  trees: Trees,
  home: Home,
};

export function Timeline() {
  let eventIndex = 0;

  return (
    <section className="section-canvas section-bg">
      <SectionBackground section="timeline" />
      <div className="section-bg__content">
        <ScrollReveal>
          <h2 className="font-display text-5xl md:text-6xl text-center text-ink mb-4">
            Тайминг первого дня
          </h2>
          <p className="font-body text-xl text-center text-ink-muted mb-6">
            Где и когда мы встречаемся
          </p>
          <div className="notice-alert-wrap mb-14">
            <div className="notice-alert">
              <Clock className="h-4 w-4 shrink-0" aria-hidden />
              <span>Время указано по московскому (UTC+3)</span>
            </div>
          </div>
        </ScrollReveal>

      <div className="max-w-2xl mx-auto space-y-6">
        {TIMELINE.map((item) => {
          if (item.type === "section") {
            return (
              <ScrollReveal key={item.title}>
                <div className="pt-6 pb-2 text-center">
                  <h3 className="font-display text-4xl md:text-5xl text-ink">
                    {item.title}
                  </h3>
                  <div className="decorative-line w-32 mx-auto mt-5" />
                </div>
              </ScrollReveal>
            );
          }

          const Icon = TIMELINE_ICONS[item.icon];
          const delay = eventIndex * 0.08;
          eventIndex += 1;

          return (
            <ScrollReveal key={`${item.title}-${item.time}`} delay={delay}>
              <SpotlightCard
                className="p-0"
                spotlightColor="rgba(126, 200, 232, 0.35)"
              >
                <div className="flex items-stretch">
                  <div className="flex shrink-0 items-center justify-center border-r border-black/5 bg-gradient-to-br from-sky-light/90 to-sky-soft/35 px-7 py-8 md:px-9 md:py-10">
                    <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_rgba(74,159,212,0.12)] ring-1 ring-sky-mid/20">
                      <Icon
                        className="h-10 w-10 md:h-12 md:w-12 text-sky-deep"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-center p-5 md:p-7">
                    <p className="mb-3">
                      <span className="inline-flex items-center rounded-full bg-sky-deep px-4 py-1.5 font-body text-base md:text-lg font-semibold tabular-nums tracking-wide text-white shadow-[0_2px_10px_rgba(74,159,212,0.35)]">
                        {item.time}
                      </span>
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl text-ink mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-xl text-ink mb-1">{item.venue}</p>
                    <p className="font-body text-lg text-ink-muted leading-relaxed mb-5">
                      {item.description}
                    </p>
                    <a
                      href={item.yandexUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 btn-primary font-body text-base transition-colors"
                    >
                      <MapPin className="h-4 w-4" aria-hidden />
                      Как добраться
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          );
        })}
      </div>
      </div>
    </section>
  );
}
