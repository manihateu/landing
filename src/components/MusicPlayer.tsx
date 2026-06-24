"use client";

import { useEffect, useRef, useState } from "react";
import track1 from "@/music/track1.mp3";
import track2 from "@/music/track2.mp3";


const TRACKS = [
  {
    id: "1",
    title: "Спокойно",
    src: track2,
  },
  {
    id: "2",
    title: "Энергично",
    src: track1,
  },
] as const;

function PlayIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5.14v13.72L19 12 8 5.14z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function MusicPlayer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);

  const activeTrack = TRACKS.find((track) => track.id === activeTrackId);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    if (!activeTrackId) {
      setMenuOpen(true);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      // autoplay blocked
    }
  };

  const selectTrack = async (trackId: string) => {
    const track = TRACKS.find((item) => item.id === trackId);
    const audio = audioRef.current;
    if (!track || !audio) return;

    if (activeTrackId !== trackId) {
      audio.src = track.src;
      audio.load();
      setActiveTrackId(trackId);
    }

    try {
      await audio.play();
      setPlaying(true);
      setMenuOpen(false);
    } catch {
      // autoplay blocked
    }
  };

  return (
    <div
      ref={rootRef}
      className={`music-player fixed top-5 right-5 z-50 transition-all duration-500 ${visible
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
    >
      <div className="music-player-promo">
        <button
          type="button"
          onClick={togglePlayback}
          className={`music-player-promo__btn ${playing
            ? "music-player-promo__btn--playing"
            : "music-player-promo__btn--idle"
            }`}
          aria-label={playing ? "Остановить музыку" : "Включить музыку"}
          aria-pressed={playing}
        >
          {playing ? (
            <span
              className="music-eq flex items-end gap-[3px] h-4 [&_.music-eq-bar]:!bg-white"
              aria-hidden
            >
              <span className="music-eq-bar music-eq-bar-1" />
              <span className="music-eq-bar music-eq-bar-2" />
              <span className="music-eq-bar music-eq-bar-3" />
            </span>
          ) : (
            <PlayIcon />
          )}
        </button>

        <button
          type="button"
          className="music-player-promo__toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="music-player-menu"
        >
          <span className="music-player-promo__text">
            {playing && activeTrack ? (
              <>
                Сейчас играет
                <br />
                <span className="music-player-promo__track">{activeTrack.title}</span>
              </>
            ) : (
              <>
                Выберите музыку,
                <br />
                чтобы погрузиться в атмосферу
              </>
            )}
          </span>
          <ChevronIcon open={menuOpen} />
        </button>
      </div>

      <div
        id="music-player-menu"
        className={`music-player-menu ${menuOpen ? "music-player-menu--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <p className="music-player-menu__title">Выберите трек</p>
        <ul className="music-player-menu__list">
          {TRACKS.map((track) => {
            const isSelected = activeTrackId === track.id;
            const isPlaying = isSelected && playing;

            return (
              <li key={track.id}>
                <button
                  type="button"
                  className={`music-player-menu__item ${isSelected ? "music-player-menu__item--active" : ""
                    }`}
                  onClick={() => selectTrack(track.id)}
                >
                  <span className="music-player-menu__item-icon" aria-hidden>
                    {isPlaying ? (
                      <span className="music-eq flex items-end gap-[2px] h-3 [&_.music-eq-bar]:!bg-sky-deep">
                        <span className="music-eq-bar music-eq-bar-1" />
                        <span className="music-eq-bar music-eq-bar-2" />
                        <span className="music-eq-bar music-eq-bar-3" />
                      </span>
                    ) : (
                      <PlayIcon />
                    )}
                  </span>
                  <span className="music-player-menu__item-title">{track.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <audio
        ref={audioRef}
        loop
        preload="none"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
    </div>
  );
}
