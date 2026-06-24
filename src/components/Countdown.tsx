"use client";

import { WEDDING_DATE } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Heart } from "./Heart";
import { SectionBackground } from "./SectionBackground";
import { ScrollReveal } from "./ScrollReveal";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft | null {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBlock({
  value,
  label,
  shortLabel,
}: {
  value: number;
  label: string;
  shortLabel: string;
}) {
  return (
    <div className="flex flex-col items-center min-w-0">
      <div className="glass-card countdown-cell flex items-center justify-center mb-1.5 sm:mb-3">
        <span className="font-display countdown-value text-ink tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-body countdown-label text-ink-muted uppercase tracking-wider text-center whitespace-nowrap">
        <span className="sm:hidden">{shortLabel}</span>
        <span className="hidden sm:inline">{label}</span>
      </span>
    </div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-canvas section-sky section-bg">
      <SectionBackground section="countdown" />
      <div className="section-bg__content">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-4 mb-6">
          <Heart size={36} />
          <h2 className="font-display text-5xl md:text-6xl text-center text-ink">
            До торжества осталось
          </h2>
          <Heart size={36} />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        {!mounted ? (
          <div className="h-40" />
        ) : timeLeft === null ? (
          <p className="font-display text-4xl text-center text-ink">
            Сегодня наш день! 🎉
          </p>
        ) : (
          <div className="countdown-grid">
            <TimeBlock value={timeLeft.days} label="дней" shortLabel="дн" />
            <TimeBlock value={timeLeft.hours} label="часов" shortLabel="ч" />
            <TimeBlock value={timeLeft.minutes} label="минут" shortLabel="м" />
            <TimeBlock value={timeLeft.seconds} label="секунд" shortLabel="с" />
          </div>
        )}
      </ScrollReveal>
      </div>
    </section>
  );
}
