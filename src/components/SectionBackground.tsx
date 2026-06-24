import type { CSSProperties } from "react";

import { BACK_IMAGES } from "@/lib/backImages";
import {
  SECTION_BACKGROUNDS,
  type BackgroundDecoration,
  type SectionBackgroundKey,
} from "@/lib/sectionBackgrounds";

interface SectionBackgroundProps {
  section: SectionBackgroundKey;
}

function pos(value?: string) {
  return value ?? "auto";
}

function decorationStyle(decoration: BackgroundDecoration): CSSProperties {
  const transforms = [
    decoration.rotate !== undefined ? `rotate(${decoration.rotate}deg)` : null,
    decoration.flip ? "scaleX(-1)" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    "--bg-top": pos(decoration.top),
    "--bg-right": pos(decoration.right),
    "--bg-bottom": pos(decoration.bottom),
    "--bg-left": pos(decoration.left),
    "--bg-top-mobile": pos(decoration.mobileTop ?? decoration.top),
    "--bg-right-mobile": pos(decoration.mobileRight ?? decoration.right),
    "--bg-bottom-mobile": pos(decoration.mobileBottom ?? decoration.bottom),
    "--bg-left-mobile": pos(decoration.mobileLeft ?? decoration.left),
    "--bg-w": decoration.width,
    "--bg-w-mobile": decoration.mobileWidth ?? decoration.width,
    "--bg-opacity": decoration.opacity ?? 0.22,
    "--bg-opacity-mobile":
      decoration.mobileOpacity ?? decoration.opacity ?? 0.22,
    transform: transforms || undefined,
  } as CSSProperties;
}

export function SectionBackground({ section }: SectionBackgroundProps) {
  const decorations = SECTION_BACKGROUNDS[section];

  return (
    <div className="section-bg__layer" aria-hidden>
      {decorations.map((decoration, index) => (
        <img
          key={index}
          src={BACK_IMAGES[decoration.image]}
          alt=""
          className={
            decoration.desktopOnly
              ? "section-bg__item section-bg__item--desktop-only"
              : "section-bg__item"
          }
          style={decorationStyle(decoration)}
        />
      ))}
    </div>
  );
}
