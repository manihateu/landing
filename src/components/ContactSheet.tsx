"use client";

import {
  AnimatePresence,
  motion,
  type PanInfo,
} from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { HOST_CONTACT } from "@/lib/constants";

interface ContactSheetProps {
  open: boolean;
  onClose: () => void;
}

const DISMISS_THRESHOLD = 96;

function ContactActions({ onClose }: { onClose: () => void }) {
  return (
    <>
      <h3
        id="contact-sheet-title"
        className="font-display text-3xl md:text-4xl text-ink text-center mb-1"
      >
        Связаться с ведущей
      </h3>
      <p className="font-body text-lg text-ink-muted text-center mb-8">
        {HOST_CONTACT.name}
      </p>

      <div className="space-y-3">
        <a
          href={`tel:${HOST_CONTACT.phone}`}
          onClick={onClose}
          className="flex items-center gap-4 w-full rounded-2xl glass-card px-5 py-4 text-ink hover:bg-white/90 transition-colors"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-light text-sky-deep">
            <Phone className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-left">
            <span className="font-body text-sm text-ink-muted block">
              Позвонить
            </span>
            <span className="font-body text-lg font-medium">
              {HOST_CONTACT.phoneDisplay}
            </span>
          </span>
        </a>

        <a
          href={HOST_CONTACT.socialUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="flex items-center gap-4 w-full rounded-2xl glass-card px-5 py-4 text-ink hover:bg-white/90 transition-colors"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-light text-sky-deep">
            <MessageCircle className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-left">
            <span className="font-body text-sm text-ink-muted block">
              Написать
            </span>
            <span className="font-body text-lg font-medium">
              {HOST_CONTACT.socialLabel}
            </span>
          </span>
        </a>
      </div>
    </>
  );
}

export function ContactSheet({ open, onClose }: ContactSheetProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > DISMISS_THRESHOLD || info.velocity.y > 450) {
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200]">
          <motion.button
            type="button"
            aria-label="Закрыть"
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {isMobile ? (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-sheet-title"
              className="absolute bottom-0 left-0 right-0 z-10 rounded-t-[1.75rem] bg-white shadow-[0_-12px_40px_rgba(0,0,0,0.12)] touch-none"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 340 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.35 }}
              onDragEnd={handleDragEnd}
            >
              <div className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
                <span className="h-1.5 w-12 rounded-full bg-neutral-300" />
              </div>
              <div className="px-6 pb-8 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
                <ContactActions onClose={onClose} />
              </div>
            </motion.div>
          ) : (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-6 pointer-events-none">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-sheet-title"
                className="pointer-events-auto w-full max-w-md rounded-[1.75rem] bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ type: "spring", damping: 28, stiffness: 360 }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-neutral-100 hover:text-ink transition-colors"
                  aria-label="Закрыть"
                >
                  <X className="h-5 w-5" />
                </button>
                <ContactActions onClose={onClose} />
              </motion.div>
            </div>
          )}
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
