"use client";

import { useState } from "react";

import { ContactSheet } from "./ContactSheet";
import { ScrollReveal } from "./ScrollReveal";
import { SectionBackground } from "./SectionBackground";

export function Questions() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="section-canvas section-bg">
      <SectionBackground section="questions" />
      <div className="section-bg__content">
        <ScrollReveal>
          <h2 className="font-display text-5xl md:text-6xl text-center text-ink mb-6">
            Ваши вопросы
          </h2>
          <p className="font-body text-xl text-center text-ink-muted mb-12 max-w-xl mx-auto">
            Если Вы заблудились, готовите сюрприз или у Вас появились какие-либо
            вопросы в день свадьбы, Вам с радостью поможет - мама невесты (Галина)
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="glass-card px-10 py-5 font-body text-xl text-ink hover:bg-white/90 transition-colors cursor-pointer"
            >
              Написать / позвонить
            </button>
          </div>
        </ScrollReveal>

        <ContactSheet
          open={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </div>
    </section>
  );
}
