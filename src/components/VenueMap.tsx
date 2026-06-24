"use client";

import { ScrollReveal } from "./ScrollReveal";

interface VenueMapProps {
  title: string;
  address: string;
  yandexUrl: string;
  mapEmbed: string;
}

export function VenueMap({ title, address, yandexUrl, mapEmbed }: VenueMapProps) {
  return (
    <ScrollReveal>
      <div className="glass-card overflow-hidden max-w-2xl mx-auto">
        <div className="p-6 md:p-8 text-center">
          <h3 className="font-display text-4xl text-ink mb-2">{title}</h3>
          <p className="font-body text-xl text-ink-muted mb-6">{address}</p>
          <a
            href={yandexUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 btn-primary font-body text-lg rounded-full transition-colors"
          >
            Как доехать
          </a>
        </div>
        <div className="relative w-full h-64 md:h-80">
          <iframe
            src={mapEmbed}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            title={`Карта: ${title}`}
            loading="lazy"
          />
        </div>
      </div>
    </ScrollReveal>
  );
}
