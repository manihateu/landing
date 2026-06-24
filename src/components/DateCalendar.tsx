"use client";

import { Heart } from "./Heart";
import { SectionBackground } from "./SectionBackground";
import { ScrollReveal } from "./ScrollReveal";

const WEDDING_DAY = 18;
const WEDDING_MONTH = 8; // September (0-indexed)
const WEDDING_YEAR = 2026;

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const days: (number | null)[] = [];

  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);

  return days;
}

export function DateCalendar() {
  const days = getCalendarDays(WEDDING_YEAR, WEDDING_MONTH);

  return (
    <section className="section-canvas section-bg">
      <SectionBackground section="dateCalendar" />
      <div className="section-bg__content">
        <ScrollReveal>
          <h2 className="font-display text-5xl md:text-6xl text-center text-ink mb-4">
            Дата торжества
          </h2>
          <p className="font-body text-2xl md:text-3xl text-center text-ink-muted mb-12">
            18 сентября 2026
          </p>
        </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="glass-card max-w-md mx-auto p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart size={32} />
            <h3 className="font-display text-3xl text-ink">
              {MONTHS[WEDDING_MONTH]} {WEDDING_YEAR}
            </h3>
            <Heart size={32} />
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="font-body text-sm font-semibold text-ink-muted py-2"
              >
                {day}
              </div>
            ))}

            {days.map((day, i) => {
              const isWedding = day === WEDDING_DAY;
              return (
                <div
                  key={i}
                  className={`relative aspect-square flex items-center justify-center rounded-full font-body text-lg ${
                    isWedding
                      ? "text-ink font-bold"
                      : day
                        ? "text-ink-muted"
                        : ""
                  }`}
                >
                  {isWedding ? (
                    <div className="relative flex items-center justify-center w-full h-full">
                      <Heart size={40} className="absolute opacity-40" />
                      <span className="relative z-10">{day}</span>
                    </div>
                  ) : (
                    day
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
      </div>
    </section>
  );
}
